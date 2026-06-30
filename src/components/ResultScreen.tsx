import { motion } from 'framer-motion'
import { SimResult } from '../lib/sim'
import { Format, FORMATS } from '../lib/game'

function Confetti() {
  const pieces = Array.from({ length: 64 })
  const colors = ['#2fbf5b', '#f6c945', '#e6473a', '#5ed3ff', '#ffffff']
  return (
    <div className="conf">
      {pieces.map((_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 0.6
        const dur = 1.6 + Math.random() * 1.4
        const color = colors[i % colors.length]
        const size = 5 + Math.random() * 7
        return (
          <motion.span
            key={i}
            initial={{ y: -40, x: 0, opacity: 1, rotate: 0 }}
            animate={{ y: 620, rotate: 360 + Math.random() * 360, opacity: [1, 1, 0] }}
            transition={{ duration: dur, delay, ease: 'easeIn', repeat: Infinity }}
            style={{
              position: 'absolute',
              top: 0,
              left: `${left}%`,
              width: size,
              height: size * 0.5,
              background: color,
              borderRadius: 1,
            }}
          />
        )
      })}
    </div>
  )
}

export function ResultScreen({
  result,
  format,
  onRebuild,
  onChangeFormat,
}: {
  result: SimResult
  format: Format
  onRebuild: () => void
  onChangeFormat: () => void
}) {
  const f = FORMATS[format]
  return (
    <div className="result">
      <motion.div
        className="result-card"
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      >
        {result.perfect && <Confetti />}

        <div className="rk">{f.name} · final standings</div>

        <div className="result-top">
          <span className="grade-chip" style={result.perfect ? { color: 'var(--gold)' } : undefined}>
            {result.grade === 'IMMORTAL' ? '★' : result.grade}
          </span>
        </div>

        <div className={`score${result.perfect ? ' perfect' : ''}`}>
          <div className="big display">
            <span className="w">{result.wins}</span>
            <span className="sep">–</span>
            <span className="l">{result.losses}</span>
          </div>
        </div>

        <div className={`recordword${result.perfect ? ' perfect' : ''}`}>
          {result.perfect
            ? 'UNBEATEN. IMMORTAL.'
            : `${result.wins} ${result.wins === 1 ? 'win' : 'wins'}, ${result.losses} ${
                result.losses === 1 ? 'defeat' : 'defeats'
              }`}
        </div>

        <p className="verdict">{result.verdict}</p>

        <div className="pillars">
          {result.pillars.map((p, i) => (
            <div className="pbar" key={p.key}>
              <span className="pl">{p.label}</span>
              <span className="track">
                <motion.span
                  className={`fill${p.weak ? ' weak' : ''}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${p.value}%` }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                />
              </span>
              <span className={`pv${p.weak ? ' weak' : ''}`}>{p.value}</span>
            </div>
          ))}
        </div>

        <div className="result-meta">
          <span>
            Team rating <b>{result.teamScore}</b>
          </span>
          <span>
            Win rate <b>{Math.round(result.winPct * 100)}%</b>
          </span>
          <span>
            Eras spanned <b>{result.decades}</b>
          </span>
        </div>

        <div className="result-actions">
          <button className="btn btn-primary" onClick={onRebuild}>
            Build a new XI
          </button>
          <button className="btn btn-ghost" onClick={onChangeFormat} style={{ flex: 1 }}>
            Change format
          </button>
        </div>
      </motion.div>
    </div>
  )
}
