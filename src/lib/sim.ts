import { Player } from '../data/players'
import { Format, FORMATS, Roster, SLOTS, distinctDecadesUsed } from './game'

export interface Pillar {
  key: string
  label: string
  value: number // 0-100
  weak: boolean
}

export interface SimResult {
  matches: number
  wins: number
  losses: number
  perfect: boolean
  teamScore: number // 0-100
  winPct: number // 0-1
  pillars: Pillar[]
  strengths: string[]
  weaknesses: string[]
  verdict: string
  grade: string
  decades: number
}

// per-format weighting of the five pillars
const WEIGHTS: Record<Format, Record<string, number>> = {
  test: { bat: 0.3, pace: 0.26, spin: 0.2, bal: 0.14, field: 0.1 },
  odi: { bat: 0.3, pace: 0.22, spin: 0.16, bal: 0.2, field: 0.12 },
  t20: { bat: 0.33, pace: 0.19, spin: 0.18, bal: 0.18, field: 0.12 },
}

// below this, a pillar is a liability that caps the ceiling
const THRESHOLDS: Record<string, number> = { bat: 72, pace: 60, spin: 50, bal: 55, field: 70 }

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0)

function ratingsFor(p: Player, fmt: Format) {
  return p[fmt]
}

export function computePillars(roster: Roster, fmt: Format): Pillar[] {
  const players = roster.filter(Boolean) as Player[]
  const r = (p: Player) => ratingsFor(p, fmt)

  // Batting: weight the top order higher than the tail.
  const battingSlots = [0, 1, 2, 3, 4, 5, 6]
  const battingWeights = [1, 1, 1.05, 1, 0.95, 0.8, 0.7]
  let bnum = 0
  let bden = 0
  battingSlots.forEach((sid, i) => {
    const pl = roster[sid]
    if (pl) {
      bnum += r(pl).bat * battingWeights[i]
      bden += battingWeights[i]
    }
  })
  const bat = bden ? bnum / bden : 0

  // Pace attack: the three pace slots + any pace all-rounder.
  const paceVals: number[] = []
  ;[8, 9, 10, 5].forEach((sid) => {
    const pl = roster[sid]
    if (pl && pl.bowlStyle === 'pace') paceVals.push(r(pl).bowl)
  })
  const pace = avg(paceVals)

  // Spin attack: the spinner + spin-bowling all-rounders / part-timers.
  const spinVals: number[] = []
  roster.forEach((pl) => {
    if (pl && pl.bowlStyle === 'spin') spinVals.push(r(pl).bowl)
  })
  const spin = spinVals.length ? Math.max(...spinVals) * 0.7 + avg(spinVals) * 0.3 : 0

  // Balance: bowling depth + lower-order runs + the genuine all-rounder.
  const ar = roster[5]
  const bowlers = players.filter((p) => p.bowlStyle).map((p) => r(p).bowl)
  const bowlDepth = bowlers.sort((a, b) => b - a).slice(0, 5)
  const lowerOrder = avg([6, 7, 8].map((s) => (roster[s] ? r(roster[s]!).bat : 0)))
  const arScore = ar ? (r(ar).bat + r(ar).bowl) / 2 : 40
  const bal = avg(bowlDepth) * 0.5 + lowerOrder * 0.25 + arScore * 0.25

  // Fielding & keeping.
  const fieldAvg = avg(players.map((p) => r(p).field))
  const wk = roster[6] ? r(roster[6]!).field : 60
  const field = fieldAvg * 0.7 + wk * 0.3

  const make = (key: string, label: string, value: number): Pillar => ({
    key,
    label,
    value: Math.round(value),
    weak: value < THRESHOLDS[key],
  })

  return [
    make('bat', 'Batting', bat),
    make('pace', 'Pace', pace),
    make('spin', 'Spin', spin),
    make('bal', 'Balance', bal),
    make('field', 'Fielding', field),
  ]
}

// non-linear win curve: getting from great to perfect is exponentially harder
function winCurve(score: number): number {
  // logistic centred so ~78 ≈ strong side, ~97 needed to flirt with perfection
  const k = 0.16
  const mid = 76
  const base = 1 / (1 + Math.exp(-k * (score - mid)))
  // squeeze the very top so an unbeaten run demands a near-flawless score
  return Math.pow(base, 1.08)
}

export function simulate(roster: Roster, fmt: Format): SimResult {
  const meta = FORMATS[fmt]
  const pillars = computePillars(roster, fmt)
  const w = WEIGHTS[fmt]
  const byKey: Record<string, Pillar> = {}
  pillars.forEach((p) => (byKey[p.key] = p))

  let teamScore = 0
  pillars.forEach((p) => (teamScore += p.value * w[p.key]))

  // era diversity: spanning eras is rewarded, a narrow side is punished
  const decades = distinctDecadesUsed(roster).length
  const diversityMod = Math.max(-4, Math.min(4, (decades - 4) * 1.4))
  teamScore += diversityMod

  let winPct = winCurve(teamScore)

  // deficiency caps — one glaring hole kills the perfect dream
  pillars.forEach((p) => {
    if (p.weak) {
      const deficit = (THRESHOLDS[p.key] - p.value) / THRESHOLDS[p.key]
      winPct *= 1 - Math.min(0.22, 0.1 + deficit * 0.45)
    }
  })

  winPct = Math.max(0.12, Math.min(0.999, winPct))

  const matches = meta.matches
  let losses = Math.round(matches * (1 - winPct))
  // perfection is only granted to a truly flawless, deep, diverse side
  const flawless = pillars.every((p) => !p.weak) && teamScore >= 95.5 && decades >= 5
  if (losses === 0 && !flawless) losses = 1
  if (winPct >= 0.999 && flawless) losses = 0
  losses = Math.max(0, Math.min(matches, losses))
  const wins = matches - losses
  const perfect = losses === 0

  const strengths = pillars
    .filter((p) => p.value >= 85)
    .sort((a, b) => b.value - a.value)
    .map((p) => p.label)
  const weaknesses = pillars
    .filter((p) => p.weak)
    .sort((a, b) => a.value - b.value)
    .map((p) => p.label)

  return {
    matches,
    wins,
    losses,
    perfect,
    teamScore: Math.round(teamScore * 10) / 10,
    winPct,
    pillars,
    strengths,
    weaknesses,
    verdict: verdictText(fmt, wins, losses, perfect, weaknesses, strengths),
    grade: gradeFor(winPct, perfect),
    decades,
  }
}

function gradeFor(winPct: number, perfect: boolean): string {
  if (perfect) return 'IMMORTAL'
  if (winPct >= 0.92) return 'S'
  if (winPct >= 0.85) return 'A'
  if (winPct >= 0.75) return 'B'
  if (winPct >= 0.6) return 'C'
  if (winPct >= 0.45) return 'D'
  return 'E'
}

function verdictText(
  fmt: Format,
  wins: number,
  losses: number,
  perfect: boolean,
  weaknesses: string[],
  strengths: string[],
): string {
  const f = FORMATS[fmt].name
  if (perfect) {
    return `Immortal. This XI sweeps the entire ${f} unbeaten — a perfect season the game has never seen.`
  }
  if (losses <= 2) {
    return `Devastating. Your side dropped only ${losses} ${losses === 1 ? 'match' : 'matches'} all ${f}. A whisker from perfection.`
  }
  if (weaknesses.length) {
    return `A serious side, but ${weaknesses.join(' and ').toLowerCase()} let them down when it mattered. ${losses} losses ended the dream.`
  }
  if (strengths.length) {
    return `Well-rounded and dangerous — ${strengths[0].toLowerCase()} carried them, but ${losses} off-days cost the unbeaten run.`
  }
  return `A competitive outfit that found the going tough across a full ${f}.`
}
