import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Player, playersFor } from '../data/players'
import { TEAM_CODES } from '../data/teams'
import { DECADES } from '../data/players'
import { Format, FORMATS, Roster, SLOTS, bestSlot, rosterFull } from '../lib/game'
import { initials, ratingFor, roleLabel, teamColor, teamName } from '../lib/display'
import { TeamReel, EraReel } from './Reel'

interface Combo {
  team: string
  decade: string
}

const TEAM_SKIPS = 3
const ERA_SKIPS = 3

export function GameScreen({
  format,
  roster,
  onPlace,
}: {
  format: Format
  roster: Roster
  onPlace: (p: Player) => void
}) {
  const validCombos = useMemo<Combo[]>(() => {
    const out: Combo[] = []
    for (const team of TEAM_CODES) {
      for (const decade of DECADES) {
        if (playersFor(team, decade).length > 0) out.push({ team, decade })
      }
    }
    return out
  }, [])

  const [spinningTeam, setSpinningTeam] = useState(false)
  const [spinningEra, setSpinningEra] = useState(false)
  const [display, setDisplay] = useState<Combo>(validCombos[0])
  const [landed, setLanded] = useState<Combo | null>(null)
  const [teamSkips, setTeamSkips] = useState(TEAM_SKIPS)
  const [eraSkips, setEraSkips] = useState(ERA_SKIPS)

  const timers = useRef<number[]>([])
  const spinning = spinningTeam || spinningEra
  const full = rosterFull(roster)

  const clearTimers = () => {
    timers.current.forEach((t) => {
      window.clearTimeout(t)
      window.clearInterval(t)
    })
    timers.current = []
  }

  const pick = useCallback(
    (exclude?: Combo): Combo => {
      const pool = validCombos.filter(
        (c) => !exclude || c.team !== exclude.team || c.decade !== exclude.decade,
      )
      return pool[Math.floor(Math.random() * pool.length)]
    },
    [validCombos],
  )

  const runSpin = useCallback(
    (final: Combo) => {
      if (spinning) return
      clearTimers()
      setLanded(null)
      setSpinningTeam(true)
      setSpinningEra(true)

      const flick = window.setInterval(() => {
        setDisplay((d) => ({
          team: TEAM_CODES[Math.floor(Math.random() * TEAM_CODES.length)],
          decade: DECADES[Math.floor(Math.random() * DECADES.length)],
        }))
      }, 70)
      timers.current.push(flick)

      timers.current.push(
        window.setTimeout(() => {
          setSpinningTeam(false)
          setDisplay((d) => ({ ...d, team: final.team }))
        }, 720),
      )
      timers.current.push(
        window.setTimeout(() => {
          window.clearInterval(flick)
          setSpinningEra(false)
          setDisplay(final)
          setLanded(final)
        }, 1040),
      )
    },
    [spinning],
  )

  const spin = useCallback(() => {
    if (spinning || full) return
    runSpin(pick(landed ?? undefined))
  }, [spinning, full, runSpin, pick, landed])

  // first spin on mount
  useEffect(() => {
    runSpin(pick())
    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pickedIds = useMemo(
    () => new Set((roster.filter(Boolean) as Player[]).map((p) => p.id)),
    [roster],
  )

  const candidates = useMemo(() => {
    if (!landed) return []
    return playersFor(landed.team, landed.decade)
      .filter((p) => !pickedIds.has(p.id))
      .map((p) => ({ p, slot: bestSlot(p, roster) }))
      .sort((a, b) => {
        const af = a.slot === null ? 1 : 0
        const bf = b.slot === null ? 1 : 0
        if (af !== bf) return af - bf
        return ratingFor(b.p, format) - ratingFor(a.p, format)
      })
  }, [landed, roster, format])

  const anyEligible = candidates.some((c) => c.slot !== null)
  const deadCombo = !!landed && !spinning && !anyEligible
  const canSpin = !spinning && !full && (landed === null || deadCombo)

  const handlePick = (p: Player) => {
    if (bestSlot(p, roster) === null) return
    onPlace(p)
    setLanded(null)
  }

  const skipTeam = () => {
    if (!landed || teamSkips <= 0 || spinning) return
    const pool = validCombos.filter((c) => c.decade === landed.decade && c.team !== landed.team)
    if (!pool.length) return
    setTeamSkips((n) => n - 1)
    runSpin(pool[Math.floor(Math.random() * pool.length)])
  }

  const skipEra = () => {
    if (!landed || eraSkips <= 0 || spinning) return
    const pool = validCombos.filter((c) => c.team === landed.team && c.decade !== landed.decade)
    if (!pool.length) return
    setEraSkips((n) => n - 1)
    runSpin(pool[Math.floor(Math.random() * pool.length)])
  }

  // spacebar to spin
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.code === 'Space' && canSpin) {
        e.preventDefault()
        spin()
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [canSpin, spin])

  const filledCount = roster.filter(Boolean).length

  return (
    <div className="stage">
      <div className="stage-head">
        <span className="lbl">{FORMATS[format].name} · the spin</span>
        <span className="count">
          PICK <b>{Math.min(filledCount + 1, 11)}</b>/11
        </span>
      </div>

      <div className="reels">
        <TeamReel code={display.team} spinning={spinningTeam} />
        <EraReel decade={display.decade} spinning={spinningEra} />
      </div>

      <div className="spin-row">
        <button className="btn btn-primary" onClick={spin} disabled={!canSpin}>
          {spinning ? 'Spinning…' : full ? 'XI Complete' : landed && !deadCombo ? 'Make a pick' : 'Spin'}
        </button>
        <button className="btn btn-ghost" onClick={skipTeam} disabled={!landed || spinning || teamSkips <= 0}>
          ⟳ Team
        </button>
        <button className="btn btn-ghost" onClick={skipEra} disabled={!landed || spinning || eraSkips <= 0}>
          ⟳ Era
        </button>
      </div>

      <div className="skip-tags">
        <span>
          Team skips left <b>{teamSkips}</b>
        </span>
        <span>·</span>
        <span>
          Era skips left <b>{eraSkips}</b>
        </span>
        <span style={{ marginLeft: 'auto' }}>
          <span className="kbd">Space</span> to spin
        </span>
      </div>

      <AnimatePresence mode="wait">
        {landed && !spinning && (
          <motion.div
            key={landed.team + landed.decade}
            className="picker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <div className="phead">
              {deadCombo ? 'No fit from' : 'Choose your legend from'} {teamName(landed.team)} ·{' '}
              {landed.decade}
            </div>

            {deadCombo ? (
              <div className="empty-pick">
                Nobody here fits an open slot in your XI. Spin again — it’s free.
              </div>
            ) : (
              <div className="pick-grid">
                {candidates.map(({ p, slot }) => (
                  <motion.button
                    key={p.id}
                    className="pick"
                    disabled={slot === null}
                    onClick={() => handlePick(p)}
                    whileHover={slot !== null ? { x: 2 } : undefined}
                  >
                    <span className="av" style={{ background: teamColor(p.team) }}>
                      {initials(p.name)}
                    </span>
                    <span className="pmain">
                      <span className="pn">{p.name}</span>
                      <span className="pmeta">
                        {roleLabel(p)} · {FORMATS[format].short} rating {ratingFor(p, format)}
                      </span>
                    </span>
                    {slot !== null ? (
                      <span className="ptag">{SLOTS[slot].label}</span>
                    ) : (
                      <span className="ptag full">XI full</span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
