import { motion } from 'framer-motion'

const items = [
  ['FRONTEND', false],
  ['WEBGL', true],
  ['UI ENGINEERING', false],
  ['FRAMER MOTION', true],
  ['CREATIVE CODE', false],
  ['REACT', true],
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y-2 border-dashed border-grass-dark/30 bg-bg-soft/50 py-6">
      <motion.div
        className="flex whitespace-nowrap font-display text-[clamp(1.5rem,5vw,2.8rem)] font-bold"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {row.map(([label, fill], i) => (
          <span key={i} className={`mx-6 flex items-center gap-6 ${fill ? 'text-grass-dark' : 'text-gold'}`}>
            {label}
            <span className="text-lg">🌾</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
