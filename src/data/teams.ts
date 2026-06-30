export interface TeamMeta {
  code: string
  name: string
  short: string
  primary: string
  accent: string
}

export const TEAMS: Record<string, TeamMeta> = {
  IND: { code: 'IND', name: 'India', short: 'IND', primary: '#1f6fd6', accent: '#ff9933' },
  AUS: { code: 'AUS', name: 'Australia', short: 'AUS', primary: '#0b5e3b', accent: '#f4c20d' },
  ENG: { code: 'ENG', name: 'England', short: 'ENG', primary: '#1f3a8a', accent: '#cf1b2b' },
  WI:  { code: 'WI',  name: 'West Indies', short: 'WI',  primary: '#7a0c12', accent: '#f4c20d' },
  PAK: { code: 'PAK', name: 'Pakistan', short: 'PAK', primary: '#01411c', accent: '#e6ffe6' },
  SA:  { code: 'SA',  name: 'South Africa', short: 'RSA', primary: '#0a6b3b', accent: '#f4c20d' },
  SL:  { code: 'SL',  name: 'Sri Lanka', short: 'SL',  primary: '#0b2e6b', accent: '#f4900c' },
  NZ:  { code: 'NZ',  name: 'New Zealand', short: 'NZ',  primary: '#14181c', accent: '#bcbfc4' },
  AFG: { code: 'AFG', name: 'Afghanistan', short: 'AFG', primary: '#0a64b0', accent: '#d32011' },
  BAN: { code: 'BAN', name: 'Bangladesh', short: 'BAN', primary: '#0a5c36', accent: '#cf1b2b' },
}

export const TEAM_CODES = Object.keys(TEAMS)
