import { Player } from '../data/players'

export type Format = 'test' | 'odi' | 't20'

export interface FormatMeta {
  key: Format
  name: string
  short: string
  blurb: string
  matches: number
  tagline: string
  accent: string
}

export const FORMATS: Record<Format, FormatMeta> = {
  test: {
    key: 'test',
    name: 'Test Championship',
    short: 'TEST',
    blurb: 'Five days. Technique, stamina and a balanced attack decide everything.',
    matches: 15,
    tagline: 'A full Test championship cycle',
    accent: '#c2410c',
  },
  odi: {
    key: 'odi',
    name: 'ODI World Series',
    short: 'ODI',
    blurb: '50 overs a side. Bat deep, bowl smart, field like demons.',
    matches: 25,
    tagline: 'A 25-match one-day series',
    accent: '#2563eb',
  },
  t20: {
    key: 't20',
    name: 'T20 Blast',
    short: 'T20',
    blurb: '20 overs of carnage. Strike rate and death bowling are king.',
    matches: 35,
    tagline: 'A 35-game T20 campaign',
    accent: '#7c3aed',
  },
}

export interface SlotDef {
  id: number
  label: string
  group: 'top' | 'mid' | 'wk' | 'spin' | 'pace'
  accepts: (p: Player) => boolean
}

const isBatType = (p: Player) => p.role === 'bat' || p.role === 'keeper' || p.role === 'allrounder'

export const SLOTS: SlotDef[] = [
  { id: 0, label: 'Opener', group: 'top', accepts: isBatType },
  { id: 1, label: 'Opener', group: 'top', accepts: isBatType },
  { id: 2, label: 'No. 3', group: 'top', accepts: isBatType },
  { id: 3, label: 'No. 4', group: 'mid', accepts: isBatType },
  { id: 4, label: 'No. 5', group: 'mid', accepts: isBatType },
  { id: 5, label: 'All-rounder', group: 'mid', accepts: (p) => p.role === 'allrounder' },
  { id: 6, label: 'Wicket-keeper', group: 'wk', accepts: (p) => p.role === 'keeper' },
  { id: 7, label: 'Spinner', group: 'spin', accepts: (p) => p.bowlStyle === 'spin' },
  { id: 8, label: 'Pacer', group: 'pace', accepts: (p) => p.bowlStyle === 'pace' },
  { id: 9, label: 'Pacer', group: 'pace', accepts: (p) => p.bowlStyle === 'pace' },
  { id: 10, label: 'Pacer', group: 'pace', accepts: (p) => p.bowlStyle === 'pace' },
]

export type Roster = (Player | null)[]

export const emptyRoster = (): Roster => SLOTS.map(() => null)

// Preference order for auto-placing a freshly picked player into an open slot.
function preferenceOrder(p: Player): number[] {
  switch (p.role) {
    case 'keeper':
      return [6, 2, 3, 4, 0, 1]
    case 'spin':
      return [7]
    case 'pace':
      return [8, 9, 10]
    case 'allrounder': {
      const bowlFirst = p.bowlStyle === 'spin' ? [5, 7, 4, 3] : [5, 8, 9, 10, 4, 3]
      return bowlFirst
    }
    case 'bat':
    default:
      return p.opener ? [0, 1, 2, 3, 4] : [2, 3, 4, 0, 1]
  }
}

// Slots this player could legally occupy that are currently open, best first.
export function eligibleSlots(p: Player, roster: Roster): number[] {
  const order = preferenceOrder(p)
  return order.filter((id) => roster[id] === null && SLOTS[id].accepts(p))
}

export function bestSlot(p: Player, roster: Roster): number | null {
  const e = eligibleSlots(p, roster)
  return e.length ? e[0] : null
}

export function rosterFull(roster: Roster): boolean {
  return roster.every((s) => s !== null)
}

export function distinctDecadesUsed(roster: Roster): string[] {
  const set = new Set<string>()
  roster.forEach((pl) => {
    if (pl) pl.decades.forEach((d) => set.add(d))
  })
  return [...set]
}
