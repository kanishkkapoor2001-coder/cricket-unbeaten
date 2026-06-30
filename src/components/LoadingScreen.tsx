import { motion } from 'framer-motion'

export function LoadingScreen() {
  return (
    <div className="loading">
      <div className="loading-inner">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="big display"
        >
          UN<em>BEATEN</em>
        </motion.div>
        <div className="tag">all-time cricket XI</div>
        <div className="bar">
          <motion.i
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.15, ease: 'easeInOut' }}
          />
        </div>
        <div className="credit">Made by Konny</div>
      </div>
    </div>
  )
}
