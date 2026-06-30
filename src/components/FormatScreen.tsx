import { motion } from 'framer-motion'
import { FORMATS, Format } from '../lib/game'

const order: Format[] = ['test', 'odi', 't20']

export function FormatScreen({ onPick }: { onPick: (f: Format) => void }) {
  return (
    <div>
      <div className="hero">
        <div className="kicker">Can your all-time XI go</div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          UN<em>BEATEN</em>?
        </motion.h1>
        <p>
          Spin for a country and an era, pick a legend, and build an XI across the decades.
          Then a non-linear win curve grades whether your dream side could go a whole season
          without a single defeat.
        </p>
      </div>

      <div className="format-q">First — pick your format</div>
      <div className="format-grid">
        {order.map((key, i) => {
          const f = FORMATS[key]
          return (
            <motion.button
              key={key}
              className="fmt-card"
              onClick={() => onPick(key)}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              style={
                {
                  ['--accent' as any]: f.accent,
                  ['--accent-ink' as any]: f.accent,
                } as React.CSSProperties
              }
            >
              <div className="glow" />
              <div className="ft display">{f.short}</div>
              <div className="fn">{f.name}</div>
              <div className="fb">{f.blurb}</div>
              <div className="fm">{f.tagline} · {f.matches} matches</div>
              <div className="go" style={{ color: f.accent }}>
                Build this XI →
              </div>
            </motion.button>
          )
        })}
      </div>

      <div className="rules">
        <div className="rule">
          <b>1</b>
          <span>Spin lands on a country + decade. Pick any eligible legend from that pool.</span>
        </div>
        <div className="rule">
          <b>2</b>
          <span>Fill all 11 positions — openers, middle order, keeper, spin and pace.</span>
        </div>
        <div className="rule">
          <b>3</b>
          <span>Span the eras. A side stuck in one decade gets punished by the curve.</span>
        </div>
        <div className="rule">
          <b>4</b>
          <span>One weak link — no spinner, thin pace — caps your ceiling. Balance wins.</span>
        </div>
      </div>
    </div>
  )
}
