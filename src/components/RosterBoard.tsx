import { AnimatePresence, motion } from 'framer-motion'
import { Player } from '../data/players'
import { Roster, SLOTS, distinctDecadesUsed, rosterFull } from '../lib/game'
import { initials, teamColor, teamShort } from '../lib/display'

export function RosterBoard({
  roster,
  activeSlot,
  onSimulate,
  onReset,
}: {
  roster: Roster
  activeSlot: number | null
  onSimulate: () => void
  onReset: () => void
}) {
  const filled = roster.filter(Boolean).length
  const full = rosterFull(roster)
  const decades = distinctDecadesUsed(roster).length

  return (
    <aside className="board">
      <h3>Your XI</h3>
      <div className="bsub">
        {filled}/11 picked · {decades} {decades === 1 ? 'era' : 'eras'}
      </div>

      <div className="xi">
        {SLOTS.map((slot) => {
          const pl = roster[slot.id] as Player | null
          return (
            <div
              key={slot.id}
              className={`xi-row${pl ? ' filled' : ''}${activeSlot === slot.id ? ' active' : ''}`}
            >
              <span className="num">{slot.id + 1}</span>
              <AnimatePresence mode="wait">
                {pl ? (
                  <motion.span
                    key={pl.id}
                    className="slot-av"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ background: teamColor(pl.team) }}
                  >
                    {initials(pl.name)}
                  </motion.span>
                ) : (
                  <span key="empty" className="slot-empty" />
                )}
              </AnimatePresence>
              <div className="smain">
                {pl ? (
                  <>
                    <div className="sn">{pl.name}</div>
                    <div className="sd">
                      {teamShort(pl.team)} · {pl.decades[0]} · {slot.label}
                    </div>
                  </>
                ) : (
                  <div className="sr">{slot.label}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <button className="sim-btn" disabled={!full} onClick={onSimulate}>
        {full ? 'Simulate Season' : `Fill ${11 - filled} more`}
      </button>
      <button className="reset" onClick={onReset}>
        Start over
      </button>
    </aside>
  )
}
