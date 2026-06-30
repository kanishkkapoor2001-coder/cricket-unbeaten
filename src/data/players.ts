// All-time cricket player pool.
// Player names are historical fact; the per-format ratings below are this game's
// own design (a 0-100 fantasy scale), not sourced from any external dataset.

export type Format = 'test' | 'odi' | 't20'
export type Role = 'bat' | 'allrounder' | 'keeper' | 'spin' | 'pace'

export interface Triple {
  bat: number
  bowl: number
  field: number
}

export interface Player {
  id: string
  name: string
  team: string
  decades: string[]
  role: Role
  opener?: boolean
  bowlStyle?: 'pace' | 'spin' | null
  test: Triple
  odi: Triple
  t20: Triple
  note: string
}

// compact builder: r = [bat, bowl, field]
type R = [number, number, number]
const t = (a: R): Triple => ({ bat: a[0], bowl: a[1], field: a[2] })

interface Raw {
  id: string
  name: string
  team: string
  dec: string[]
  role: Role
  open?: boolean
  bowl?: 'pace' | 'spin' | null
  test: R
  odi: R
  t20: R
  note: string
}

const p = (r: Raw): Player => ({
  id: r.id,
  name: r.name,
  team: r.team,
  decades: r.dec,
  role: r.role,
  opener: r.open,
  bowlStyle: r.bowl ?? (r.role === 'spin' ? 'spin' : r.role === 'pace' ? 'pace' : null),
  test: t(r.test),
  odi: t(r.odi),
  t20: t(r.t20),
  note: r.note,
})

export const PLAYERS: Player[] = [
  // ===== 1960s =====
  p({ id: 'sobers', name: 'Garfield Sobers', team: 'WI', dec: ['1960s', '1970s'], role: 'allrounder', bowl: 'pace', test: [95, 84, 88], odi: [88, 80, 85], t20: [82, 76, 84], note: 'The greatest all-rounder' }),
  p({ id: 'kanhai', name: 'Rohan Kanhai', team: 'WI', dec: ['1960s', '1970s'], role: 'bat', test: [88, 12, 80], odi: [84, 10, 80], t20: [82, 8, 78], note: 'Wristy genius' }),
  p({ id: 'hall', name: 'Wes Hall', team: 'WI', dec: ['1960s'], role: 'pace', test: [38, 86, 74], odi: [34, 84, 74], t20: [30, 82, 74], note: 'Express terror' }),
  p({ id: 'benaud', name: 'Richie Benaud', team: 'AUS', dec: ['1960s'], role: 'spin', test: [62, 86, 82], odi: [58, 82, 82], t20: [56, 80, 82], note: 'Leg-spin & guile' }),
  p({ id: 'harvey', name: 'Neil Harvey', team: 'AUS', dec: ['1960s'], role: 'bat', test: [87, 14, 86], odi: [82, 12, 84], t20: [78, 10, 82], note: 'Elegant left-hander' }),
  p({ id: 'trueman', name: 'Fred Trueman', team: 'ENG', dec: ['1960s'], role: 'pace', test: [44, 88, 76], odi: [40, 84, 76], t20: [36, 82, 76], note: 'Fiery Fred' }),
  p({ id: 'dexter', name: 'Ted Dexter', team: 'ENG', dec: ['1960s'], role: 'bat', test: [84, 60, 80], odi: [82, 58, 80], t20: [80, 56, 80], note: 'Lord Edward' }),
  p({ id: 'pataudi', name: 'Mansur Ali Khan Pataudi', team: 'IND', dec: ['1960s', '1970s'], role: 'bat', test: [82, 16, 86], odi: [80, 14, 86], t20: [78, 12, 84], note: 'Tiger of Indian cricket' }),
  p({ id: 'dowling', name: 'John Reid', team: 'NZ', dec: ['1960s'], role: 'allrounder', bowl: 'pace', test: [80, 72, 80], odi: [78, 70, 80], t20: [76, 68, 80], note: 'NZ trailblazer' }),
  p({ id: 'barlow', name: 'Eddie Barlow', team: 'SA', dec: ['1960s', '1970s'], role: 'allrounder', bowl: 'pace', test: [83, 74, 84], odi: [80, 72, 84], t20: [78, 70, 84], note: 'Bustling all-rounder' }),

  // ===== 1970s =====
  p({ id: 'viv', name: 'Viv Richards', team: 'WI', dec: ['1970s', '1980s'], role: 'bat', test: [96, 40, 88], odi: [95, 42, 88], t20: [94, 40, 88], note: 'The Master Blaster' }),
  p({ id: 'greenidge', name: 'Gordon Greenidge', team: 'WI', dec: ['1970s', '1980s'], role: 'bat', open: true, test: [90, 12, 82], odi: [89, 10, 82], t20: [88, 8, 82], note: 'Destructive opener' }),
  p({ id: 'lloyd', name: 'Clive Lloyd', team: 'WI', dec: ['1970s', '1980s'], role: 'bat', test: [88, 30, 86], odi: [88, 30, 86], t20: [86, 28, 86], note: 'Supercat & captain' }),
  p({ id: 'holding', name: 'Michael Holding', team: 'WI', dec: ['1970s', '1980s'], role: 'pace', test: [42, 92, 80], odi: [40, 90, 80], t20: [36, 88, 80], note: 'Whispering Death' }),
  p({ id: 'lillee', name: 'Dennis Lillee', team: 'AUS', dec: ['1970s', '1980s'], role: 'pace', test: [44, 95, 80], odi: [40, 90, 80], t20: [36, 88, 80], note: 'The complete fast bowler' }),
  p({ id: 'thomson', name: 'Jeff Thomson', team: 'AUS', dec: ['1970s'], role: 'pace', test: [36, 90, 76], odi: [34, 86, 76], t20: [32, 84, 78], note: 'Raw thunderbolts' }),
  p({ id: 'gchappell', name: 'Greg Chappell', team: 'AUS', dec: ['1970s', '1980s'], role: 'bat', test: [92, 40, 90], odi: [88, 38, 90], t20: [84, 34, 88], note: 'Textbook elegance' }),
  p({ id: 'gavaskar', name: 'Sunil Gavaskar', team: 'IND', dec: ['1970s', '1980s'], role: 'bat', open: true, test: [94, 14, 80], odi: [82, 12, 80], t20: [76, 10, 78], note: 'The Little Master' }),
  p({ id: 'bedi', name: 'Bishan Singh Bedi', team: 'IND', dec: ['1970s'], role: 'spin', test: [30, 88, 70], odi: [28, 82, 70], t20: [26, 78, 70], note: 'Poetry in flight' }),
  p({ id: 'knott', name: 'Alan Knott', team: 'ENG', dec: ['1970s'], role: 'keeper', test: [78, 8, 92], odi: [74, 6, 90], t20: [72, 4, 90], note: 'Master gloveman' }),
  p({ id: 'roberts', name: 'Andy Roberts', team: 'WI', dec: ['1970s', '1980s'], role: 'pace', test: [40, 90, 78], odi: [38, 88, 78], t20: [34, 86, 78], note: 'Two-paced menace' }),
  p({ id: 'underwood', name: 'Derek Underwood', team: 'ENG', dec: ['1970s'], role: 'spin', test: [34, 87, 74], odi: [30, 82, 74], t20: [28, 78, 74], note: 'Deadly on a turner' }),
  p({ id: 'zaheer', name: 'Zaheer Abbas', team: 'PAK', dec: ['1970s', '1980s'], role: 'bat', test: [88, 12, 80], odi: [86, 10, 80], t20: [84, 8, 80], note: 'The Asian Bradman' }),

  // ===== 1980s =====
  p({ id: 'marshall', name: 'Malcolm Marshall', team: 'WI', dec: ['1980s'], role: 'pace', test: [50, 97, 84], odi: [46, 93, 84], t20: [42, 90, 84], note: 'The complete quick' }),
  p({ id: 'imran', name: 'Imran Khan', team: 'PAK', dec: ['1980s'], role: 'allrounder', bowl: 'pace', test: [86, 92, 84], odi: [84, 90, 84], t20: [80, 86, 84], note: 'Lion of Pakistan' }),
  p({ id: 'kapil', name: 'Kapil Dev', team: 'IND', dec: ['1980s'], role: 'allrounder', bowl: 'pace', test: [82, 88, 86], odi: [84, 88, 88], t20: [82, 84, 86], note: 'The Haryana Hurricane' }),
  p({ id: 'hadlee', name: 'Richard Hadlee', team: 'NZ', dec: ['1980s'], role: 'allrounder', bowl: 'pace', test: [78, 95, 82], odi: [76, 90, 82], t20: [72, 88, 82], note: 'Sir Paddles' }),
  p({ id: 'botham', name: 'Ian Botham', team: 'ENG', dec: ['1980s'], role: 'allrounder', bowl: 'pace', test: [86, 86, 90], odi: [84, 82, 90], t20: [84, 80, 90], note: 'Beefy, the matchwinner' }),
  p({ id: 'border', name: 'Allan Border', team: 'AUS', dec: ['1980s', '1990s'], role: 'bat', test: [89, 30, 88], odi: [86, 28, 88], t20: [82, 26, 86], note: 'Captain Grumpy, gritty' }),
  p({ id: 'miandad', name: 'Javed Miandad', team: 'PAK', dec: ['1980s', '1990s'], role: 'bat', test: [90, 20, 84], odi: [89, 18, 86], t20: [86, 16, 84], note: 'Street-smart genius' }),
  p({ id: 'garner', name: 'Joel Garner', team: 'WI', dec: ['1980s'], role: 'pace', test: [38, 92, 78], odi: [36, 92, 78], t20: [34, 90, 80], note: 'Big Bird, deadly yorkers' }),
  p({ id: 'dujon', name: 'Jeff Dujon', team: 'WI', dec: ['1980s'], role: 'keeper', test: [78, 6, 90], odi: [76, 6, 90], t20: [74, 4, 90], note: 'Stylish keeper-bat' }),
  p({ id: 'gower', name: 'David Gower', team: 'ENG', dec: ['1980s'], role: 'bat', test: [86, 10, 82], odi: [84, 8, 82], t20: [82, 6, 82], note: 'Effortless left-hander' }),
  p({ id: 'qadir', name: 'Abdul Qadir', team: 'PAK', dec: ['1980s'], role: 'spin', test: [34, 88, 76], odi: [32, 84, 76], t20: [30, 82, 78], note: 'Leg-spin showman' }),
  p({ id: 'vengsarkar', name: 'Dilip Vengsarkar', team: 'IND', dec: ['1980s'], role: 'bat', test: [85, 8, 80], odi: [80, 6, 80], t20: [76, 4, 78], note: 'Colonel, classy No.3' }),
  p({ id: 'crowe', name: 'Martin Crowe', team: 'NZ', dec: ['1980s', '1990s'], role: 'bat', test: [88, 14, 84], odi: [86, 12, 84], t20: [82, 10, 82], note: 'NZ’s finest bat' }),
  p({ id: 'rice', name: 'Clive Rice', team: 'SA', dec: ['1980s'], role: 'allrounder', bowl: 'pace', test: [82, 82, 84], odi: [82, 82, 84], t20: [80, 80, 84], note: 'The lost great all-rounder' }),

  // ===== 1990s =====
  p({ id: 'sachin', name: 'Sachin Tendulkar', team: 'IND', dec: ['1990s', '2000s'], role: 'bat', test: [96, 30, 84], odi: [96, 36, 84], t20: [90, 32, 84], note: 'The God of cricket' }),
  p({ id: 'lara', name: 'Brian Lara', team: 'WI', dec: ['1990s', '2000s'], role: 'bat', test: [96, 8, 84], odi: [92, 6, 84], t20: [88, 6, 84], note: 'The Prince of Trinidad' }),
  p({ id: 'wasim', name: 'Wasim Akram', team: 'PAK', dec: ['1990s'], role: 'pace', test: [60, 95, 82], odi: [62, 95, 84], t20: [60, 93, 84], note: 'Sultan of Swing' }),
  p({ id: 'waqar', name: 'Waqar Younis', team: 'PAK', dec: ['1990s'], role: 'pace', test: [40, 92, 76], odi: [38, 93, 78], t20: [36, 90, 78], note: 'Toe-crushing yorkers' }),
  p({ id: 'warne', name: 'Shane Warne', team: 'AUS', dec: ['1990s', '2000s'], role: 'spin', test: [52, 97, 86], odi: [48, 92, 86], t20: [46, 92, 88], note: 'The King of Spin' }),
  p({ id: 'mcgrath', name: 'Glenn McGrath', team: 'AUS', dec: ['1990s', '2000s'], role: 'pace', test: [26, 96, 80], odi: [24, 95, 80], t20: [22, 92, 80], note: 'Metronome of menace' }),
  p({ id: 'murali', name: 'Muttiah Muralitharan', team: 'SL', dec: ['1990s', '2000s'], role: 'spin', test: [30, 98, 78], odi: [28, 95, 80], t20: [28, 94, 82], note: '800 Test wickets' }),
  p({ id: 'swaugh', name: 'Steve Waugh', team: 'AUS', dec: ['1990s', '2000s'], role: 'bat', test: [88, 40, 86], odi: [84, 42, 86], t20: [80, 38, 84], note: 'The Iceman' }),
  p({ id: 'jayasuriya', name: 'Sanath Jayasuriya', team: 'SL', dec: ['1990s', '2000s'], role: 'bat', open: true, bowl: 'spin', test: [82, 60, 84], odi: [90, 66, 86], t20: [90, 64, 86], note: 'The Matara Marauder' }),
  p({ id: 'donald', name: 'Allan Donald', team: 'SA', dec: ['1990s'], role: 'pace', test: [34, 93, 80], odi: [32, 92, 82], t20: [30, 90, 82], note: 'White Lightning' }),
  p({ id: 'ambrose', name: 'Curtly Ambrose', team: 'WI', dec: ['1990s'], role: 'pace', test: [36, 94, 78], odi: [34, 93, 78], t20: [32, 90, 78], note: 'Towering, miserly' }),
  p({ id: 'kumble', name: 'Anil Kumble', team: 'IND', dec: ['1990s', '2000s'], role: 'spin', test: [40, 92, 76], odi: [38, 88, 78], t20: [36, 86, 78], note: 'Jumbo, the warrior' }),
  p({ id: 'dravid', name: 'Rahul Dravid', team: 'IND', dec: ['1990s', '2000s'], role: 'bat', test: [93, 16, 88], odi: [85, 14, 88], t20: [80, 12, 86], note: 'The Wall' }),
  p({ id: 'desilva', name: 'Aravinda de Silva', team: 'SL', dec: ['1990s'], role: 'bat', bowl: 'spin', test: [86, 50, 82], odi: [88, 54, 84], t20: [86, 52, 84], note: 'Mad Max, ’96 hero' }),
  p({ id: 'inzamam', name: 'Inzamam-ul-Haq', team: 'PAK', dec: ['1990s', '2000s'], role: 'bat', test: [89, 8, 74], odi: [89, 6, 76], t20: [86, 4, 74], note: 'Serene power' }),
  p({ id: 'jonty', name: 'Jonty Rhodes', team: 'SA', dec: ['1990s'], role: 'bat', test: [78, 8, 98], odi: [82, 6, 99], t20: [82, 4, 99], note: 'The greatest fielder' }),
  p({ id: 'healy', name: 'Ian Healy', team: 'AUS', dec: ['1990s'], role: 'keeper', test: [76, 6, 92], odi: [74, 6, 92], t20: [72, 4, 92], note: 'Chirpy gloveman' }),

  // ===== 2000s =====
  p({ id: 'ponting', name: 'Ricky Ponting', team: 'AUS', dec: ['2000s'], role: 'bat', test: [93, 20, 92], odi: [92, 18, 92], t20: [88, 16, 92], note: 'Punter, ruthless winner' }),
  p({ id: 'kallis', name: 'Jacques Kallis', team: 'SA', dec: ['2000s', '2010s'], role: 'allrounder', bowl: 'pace', test: [93, 84, 90], odi: [90, 82, 90], t20: [86, 78, 88], note: 'The ultimate all-rounder' }),
  p({ id: 'gilchrist', name: 'Adam Gilchrist', team: 'AUS', dec: ['2000s'], role: 'keeper', open: true, test: [88, 6, 90], odi: [92, 6, 92], t20: [92, 4, 92], note: 'Game-changing keeper-bat' }),
  p({ id: 'sehwag', name: 'Virender Sehwag', team: 'IND', dec: ['2000s', '2010s'], role: 'bat', open: true, bowl: 'spin', test: [90, 40, 80], odi: [90, 42, 80], t20: [90, 40, 80], note: 'Fearless Nawab of Najafgarh' }),
  p({ id: 'sanga', name: 'Kumar Sangakkara', team: 'SL', dec: ['2000s', '2010s'], role: 'keeper', test: [93, 4, 88], odi: [91, 4, 90], t20: [88, 2, 90], note: 'Elegant run machine' }),
  p({ id: 'dhoni', name: 'MS Dhoni', team: 'IND', dec: ['2000s', '2010s'], role: 'keeper', test: [82, 4, 94], odi: [88, 4, 96], t20: [88, 2, 96], note: 'Captain Cool, finisher' }),
  p({ id: 'hayden', name: 'Matthew Hayden', team: 'AUS', dec: ['2000s'], role: 'bat', open: true, test: [89, 8, 82], odi: [88, 6, 82], t20: [88, 4, 82], note: 'Bullying left-hander' }),
  p({ id: 'pollock', name: 'Shaun Pollock', team: 'SA', dec: ['2000s'], role: 'allrounder', bowl: 'pace', test: [74, 90, 86], odi: [76, 90, 88], t20: [74, 88, 88], note: 'Accuracy & control' }),
  p({ id: 'flintoff', name: 'Andrew Flintoff', team: 'ENG', dec: ['2000s'], role: 'allrounder', bowl: 'pace', test: [80, 84, 88], odi: [80, 84, 88], t20: [82, 82, 88], note: 'Freddie, ’05 talisman' }),
  p({ id: 'lee', name: 'Brett Lee', team: 'AUS', dec: ['2000s'], role: 'pace', test: [44, 90, 82], odi: [42, 92, 84], t20: [42, 92, 86], note: 'Express pace & smiles' }),
  p({ id: 'steyn', name: 'Dale Steyn', team: 'SA', dec: ['2000s', '2010s'], role: 'pace', test: [40, 97, 84], odi: [36, 92, 84], t20: [34, 92, 86], note: 'Snarling matchwinner' }),
  p({ id: 'yousuf', name: 'Mohammad Yousuf', team: 'PAK', dec: ['2000s'], role: 'bat', test: [89, 6, 78], odi: [87, 4, 78], t20: [84, 2, 78], note: 'Silken stroke-maker' }),
  p({ id: 'vaughan', name: 'Michael Vaughan', team: 'ENG', dec: ['2000s'], role: 'bat', test: [85, 12, 82], odi: [80, 10, 82], t20: [78, 8, 80], note: 'Ashes-winning captain' }),
  p({ id: 'ntini', name: 'Makhaya Ntini', team: 'SA', dec: ['2000s'], role: 'pace', test: [30, 86, 80], odi: [28, 84, 80], t20: [26, 82, 80], note: 'Tireless workhorse' }),

  // ===== 2010s =====
  p({ id: 'kohli', name: 'Virat Kohli', team: 'IND', dec: ['2010s', '2020s'], role: 'bat', test: [92, 20, 92], odi: [97, 18, 94], t20: [95, 16, 94], note: 'The Chase Master' }),
  p({ id: 'smith', name: 'Steve Smith', team: 'AUS', dec: ['2010s', '2020s'], role: 'bat', bowl: 'spin', test: [96, 40, 92], odi: [88, 38, 92], t20: [82, 34, 90], note: 'Unorthodox run glutton' }),
  p({ id: 'williamson', name: 'Kane Williamson', team: 'NZ', dec: ['2010s', '2020s'], role: 'bat', test: [92, 24, 88], odi: [90, 22, 88], t20: [86, 20, 88], note: 'Serene captain' }),
  p({ id: 'root', name: 'Joe Root', team: 'ENG', dec: ['2010s', '2020s'], role: 'bat', bowl: 'spin', test: [94, 40, 88], odi: [88, 38, 88], t20: [84, 34, 88], note: 'Classical accumulator' }),
  p({ id: 'abd', name: 'AB de Villiers', team: 'SA', dec: ['2010s'], role: 'bat', test: [89, 8, 94], odi: [95, 6, 96], t20: [95, 4, 96], note: 'Mr 360' }),
  p({ id: 'amla', name: 'Hashim Amla', team: 'SA', dec: ['2010s'], role: 'bat', open: true, test: [90, 6, 82], odi: [90, 4, 82], t20: [84, 2, 82], note: 'Wristy serenity' }),
  p({ id: 'anderson', name: 'James Anderson', team: 'ENG', dec: ['2010s', '2020s'], role: 'pace', test: [30, 95, 80], odi: [28, 88, 80], t20: [26, 86, 80], note: 'The swing king' }),
  p({ id: 'broad', name: 'Stuart Broad', team: 'ENG', dec: ['2010s', '2020s'], role: 'pace', test: [44, 90, 82], odi: [40, 84, 82], t20: [40, 84, 82], note: 'Spell-casting enforcer' }),
  p({ id: 'ashwin', name: 'Ravichandran Ashwin', team: 'IND', dec: ['2010s', '2020s'], role: 'spin', test: [62, 94, 82], odi: [54, 86, 82], t20: [52, 88, 84], note: 'Cerebral off-spinner' }),
  p({ id: 'stokes', name: 'Ben Stokes', team: 'ENG', dec: ['2010s', '2020s'], role: 'allrounder', bowl: 'pace', test: [86, 80, 90], odi: [86, 80, 92], t20: [86, 80, 92], note: 'The miracle man' }),
  p({ id: 'rohit', name: 'Rohit Sharma', team: 'IND', dec: ['2010s', '2020s'], role: 'bat', open: true, test: [84, 10, 84], odi: [94, 8, 84], t20: [92, 6, 84], note: 'The Hitman' }),
  p({ id: 'warner', name: 'David Warner', team: 'AUS', dec: ['2010s', '2020s'], role: 'bat', open: true, test: [86, 6, 86], odi: [90, 4, 86], t20: [92, 2, 86], note: 'Explosive opener' }),
  p({ id: 'gayle', name: 'Chris Gayle', team: 'WI', dec: ['2010s'], role: 'bat', open: true, bowl: 'spin', test: [82, 40, 78], odi: [88, 42, 78], t20: [96, 40, 80], note: 'The Universe Boss' }),
  p({ id: 'malinga', name: 'Lasith Malinga', team: 'SL', dec: ['2010s'], role: 'pace', test: [36, 82, 76], odi: [34, 90, 78], t20: [34, 95, 80], note: 'Slinga, yorker specialist' }),
  p({ id: 'faf', name: 'Faf du Plessis', team: 'SA', dec: ['2010s', '2020s'], role: 'bat', test: [85, 6, 90], odi: [85, 4, 90], t20: [87, 2, 90], note: 'Gritty, sharp captain' }),

  // ===== 2020s =====
  p({ id: 'bumrah', name: 'Jasprit Bumrah', team: 'IND', dec: ['2010s', '2020s'], role: 'pace', test: [30, 97, 82], odi: [28, 95, 82], t20: [26, 97, 84], note: 'The unplayable yorker' }),
  p({ id: 'cummins', name: 'Pat Cummins', team: 'AUS', dec: ['2020s'], role: 'pace', test: [50, 95, 86], odi: [48, 90, 86], t20: [46, 90, 86], note: 'World-Cup-winning skipper' }),
  p({ id: 'babar', name: 'Babar Azam', team: 'PAK', dec: ['2020s'], role: 'bat', test: [88, 6, 84], odi: [92, 4, 84], t20: [92, 2, 84], note: 'Silken modern great' }),
  p({ id: 'rashid', name: 'Rashid Khan', team: 'AFG', dec: ['2020s'], role: 'spin', test: [50, 88, 84], odi: [54, 92, 86], t20: [60, 97, 88], note: 'T20’s premier spinner' }),
  p({ id: 'head', name: 'Travis Head', team: 'AUS', dec: ['2020s'], role: 'bat', open: true, bowl: 'spin', test: [86, 30, 86], odi: [88, 28, 86], t20: [90, 26, 86], note: 'Big-stage destroyer' }),
  p({ id: 'gill', name: 'Shubman Gill', team: 'IND', dec: ['2020s'], role: 'bat', open: true, test: [84, 4, 84], odi: [90, 2, 84], t20: [86, 2, 84], note: 'Prince, next-gen elegance' }),
  p({ id: 'buttler', name: 'Jos Buttler', team: 'ENG', dec: ['2020s'], role: 'keeper', test: [78, 4, 90], odi: [89, 2, 92], t20: [94, 2, 92], note: 'White-ball innovator' }),
  p({ id: 'sky', name: 'Suryakumar Yadav', team: 'IND', dec: ['2020s'], role: 'bat', test: [74, 4, 90], odi: [82, 2, 90], t20: [96, 2, 92], note: 'T20 fantasy, 360 range' }),
  p({ id: 'marnus', name: 'Marnus Labuschagne', team: 'AUS', dec: ['2020s'], role: 'bat', bowl: 'spin', test: [90, 30, 88], odi: [82, 28, 88], t20: [78, 24, 86], note: 'Test run accumulator' }),
  p({ id: 'starc', name: 'Mitchell Starc', team: 'AUS', dec: ['2010s', '2020s'], role: 'pace', test: [44, 92, 82], odi: [42, 95, 84], t20: [42, 92, 84], note: 'Left-arm thunder' }),
  p({ id: 'rabada', name: 'Kagiso Rabada', team: 'SA', dec: ['2010s', '2020s'], role: 'pace', test: [38, 93, 84], odi: [36, 90, 84], t20: [36, 92, 86], note: 'KG, strike weapon' }),
  p({ id: 'shakib', name: 'Shakib Al Hasan', team: 'BAN', dec: ['2010s', '2020s'], role: 'allrounder', bowl: 'spin', test: [82, 86, 84], odi: [84, 88, 86], t20: [84, 90, 86], note: 'Bangladesh’s greatest' }),
  p({ id: 'jadeja', name: 'Ravindra Jadeja', team: 'IND', dec: ['2010s', '2020s'], role: 'allrounder', bowl: 'spin', test: [78, 90, 96], odi: [80, 86, 96], t20: [80, 88, 96], note: 'Sir Jadeja, all-phase gun' }),
  p({ id: 'maxwell', name: 'Glenn Maxwell', team: 'AUS', dec: ['2010s', '2020s'], role: 'allrounder', bowl: 'spin', test: [78, 70, 92], odi: [86, 76, 92], t20: [92, 80, 92], note: 'The Big Show' }),
]
  // remove placeholder/dropped entries
  .filter((pl) => pl.decades.length > 0)

export const DECADES = ['1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s']

export function playersFor(team: string, decade: string): Player[] {
  return PLAYERS.filter((pl) => pl.team === team && pl.decades.includes(decade))
}
