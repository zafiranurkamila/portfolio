import { motion } from 'framer-motion'
import { journey } from '../../data'

const ICON = { edu: '🎓', work: '💼', award: '🏆', cert: '📜', project: '🚀' }

export default function Journey() {
  return (
    <motion.section
      className="h-screen w-screen overflow-y-auto px-5 pb-36 pt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-center font-display text-[clamp(2.4rem,8vw,4.5rem)] font-bold leading-none">
          My journey
        </h1>
        <p className="mb-10 text-center font-semibold text-ink/70">
          Dari SMK 2020 sampai sekarang 🌱
        </p>

        <div className="relative ml-4 border-l-[4px] border-dashed border-ink/40 pl-8">
          {journey.map((y, i) => (
            <motion.div
              key={y.year}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * i }}
              className="relative mb-8"
            >
              {/* badge tahun */}
              <div className="absolute -left-[54px] top-0 grid h-12 w-12 place-items-center rounded-full border-[3px] border-ink bg-bg font-display text-[13px] font-bold shadow-pop">
                {y.year.slice(2)}
              </div>
              <div className="font-display text-2xl font-bold text-accent">{y.year}</div>
              <div className="mt-2 space-y-2">
                {y.items.map((it, j) => (
                  <div
                    key={j}
                    className="flex gap-2 rounded-2xl border-[3px] border-ink bg-card p-3 shadow-[0_5px_0_#141414]"
                  >
                    <span className="text-lg leading-none">{ICON[it.type]}</span>
                    <span className="text-sm font-semibold leading-snug">{it.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
