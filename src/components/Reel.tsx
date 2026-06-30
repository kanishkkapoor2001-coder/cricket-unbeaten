import { motion } from 'framer-motion'
import { TEAMS } from '../data/teams'

export function TeamReel({ code, spinning }: { code: string; spinning: boolean }) {
  const t = TEAMS[code]
  return (
    <div className={`reel${spinning ? ' spinning' : ''}`}>
      <span className="reel-label">Team</span>
      <div className="scan" />
      <div className="window">
        <motion.div
          key={code + (spinning ? '-s' : '')}
          initial={{ y: spinning ? -8 : 14, opacity: spinning ? 0.5 : 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: spinning ? 0.07 : 0.28, ease: 'easeOut' }}
          className="item"
        >
          <span
            className="flag"
            style={{
              background: `linear-gradient(135deg, ${t?.primary}, ${t?.accent})`,
            }}
          />
          {t?.short ?? code}
          <small>{t?.name ?? code}</small>
        </motion.div>
      </div>
    </div>
  )
}

export function EraReel({ decade, spinning }: { decade: string; spinning: boolean }) {
  return (
    <div className={`reel${spinning ? ' spinning' : ''}`}>
      <span className="reel-label">Era</span>
      <div className="scan" />
      <div className="window">
        <motion.div
          key={decade + (spinning ? '-s' : '')}
          initial={{ y: spinning ? -8 : 14, opacity: spinning ? 0.5 : 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: spinning ? 0.07 : 0.28, ease: 'easeOut' }}
          className="item"
        >
          {decade}
          <small>the {decade.replace('s', '')}’s era</small>
        </motion.div>
      </div>
    </div>
  )
}
