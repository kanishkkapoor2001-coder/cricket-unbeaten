import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Player } from './data/players'
import { Format, FORMATS, Roster, bestSlot, emptyRoster } from './lib/game'
import { SimResult, simulate } from './lib/sim'
import { LoadingScreen } from './components/LoadingScreen'
import { FormatScreen } from './components/FormatScreen'
import { GameScreen } from './components/GameScreen'
import { RosterBoard } from './components/RosterBoard'
import { ResultScreen } from './components/ResultScreen'

type Phase = 'loading' | 'format' | 'play' | 'result'

export default function App() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [format, setFormat] = useState<Format>('test')
  const [roster, setRoster] = useState<Roster>(emptyRoster())
  const [activeSlot, setActiveSlot] = useState<number | null>(null)
  const [result, setResult] = useState<SimResult | null>(null)
  const [gameKey, setGameKey] = useState(0)

  useEffect(() => {
    const t = window.setTimeout(() => setPhase('format'), 1700)
    return () => window.clearTimeout(t)
  }, [])

  const startFormat = (f: Format) => {
    setFormat(f)
    setRoster(emptyRoster())
    setResult(null)
    setGameKey((k) => k + 1)
    setPhase('play')
  }

  const placePlayer = (p: Player) => {
    let placed: number | null = null
    setRoster((prev) => {
      if (prev.some((x) => x?.id === p.id)) return prev
      const slot = bestSlot(p, prev)
      if (slot === null) return prev
      const next = [...prev]
      next[slot] = p
      placed = slot
      return next
    })
    if (placed !== null) {
      setActiveSlot(placed)
      window.setTimeout(() => setActiveSlot(null), 900)
    }
  }

  const runSimulation = () => {
    setResult(simulate(roster, format))
    setPhase('result')
  }

  const rebuild = () => {
    setRoster(emptyRoster())
    setResult(null)
    setGameKey((k) => k + 1)
    setPhase('play')
  }

  return (
    <>
      <AnimatePresence>{phase === 'loading' && <LoadingScreen key="loading" />}</AnimatePresence>

      {phase !== 'loading' && (
        <div className="app-shell">
          <header className="topbar">
            <div className="brand">
              <img className="ball" src={`${import.meta.env.BASE_URL}ball.svg`} alt="" />
              <div>
                <div className="wordmark">
                  UN<span>BEATEN</span> XI
                </div>
                <div className="sub">all-time cricket selector</div>
              </div>
            </div>
            {phase === 'play' && <div className="pill">{FORMATS[format].name}</div>}
            {phase === 'format' && <div className="pill">a cricket build-a-side game</div>}
          </header>

          {phase === 'format' && <FormatScreen onPick={startFormat} />}

          {phase === 'play' && (
            <div className="game">
              <GameScreen key={gameKey} format={format} roster={roster} onPlace={placePlayer} />
              <RosterBoard
                roster={roster}
                activeSlot={activeSlot}
                onSimulate={runSimulation}
                onReset={() => setPhase('format')}
              />
            </div>
          )}

          <div className="footer">
            Made by <span>Konny</span> · a cricket take on the go-undefeated roster game
          </div>
        </div>
      )}

      {phase === 'result' && result && (
        <ResultScreen
          result={result}
          format={format}
          onRebuild={rebuild}
          onChangeFormat={() => setPhase('format')}
        />
      )}
    </>
  )
}
