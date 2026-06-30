import { Player, Role } from '../data/players'
import { TEAMS } from '../data/teams'

export function initials(name: string): string {
  const parts = name.split(' ').filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function teamColor(code: string): string {
  return TEAMS[code]?.primary ?? '#2b3a30'
}

export function teamAccent(code: string): string {
  return TEAMS[code]?.accent ?? '#9bb3a2'
}

export function teamName(code: string): string {
  return TEAMS[code]?.name ?? code
}

export function teamShort(code: string): string {
  return TEAMS[code]?.short ?? code
}

const ROLE_LABEL: Record<Role, string> = {
  bat: 'Batter',
  allrounder: 'All-rounder',
  keeper: 'Wicket-keeper',
  spin: 'Spinner',
  pace: 'Pace bowler',
}

export function roleLabel(p: Player): string {
  if (p.role === 'bat' && p.opener) return 'Opening batter'
  if (p.role === 'allrounder') return p.bowlStyle === 'spin' ? 'Spin all-rounder' : 'Pace all-rounder'
  return ROLE_LABEL[p.role]
}

export function ratingFor(p: Player, fmt: 'test' | 'odi' | 't20'): number {
  const r = p[fmt]
  if (p.role === 'bat' || p.role === 'keeper') return r.bat
  if (p.role === 'pace' || p.role === 'spin') return r.bowl
  return Math.round((r.bat + r.bowl) / 2)
}
