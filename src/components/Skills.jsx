import { motion } from 'framer-motion'
import { skills } from '../data'

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1200px] px-7 py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-5 flex items-center gap-3 text-[13px] uppercase tracking-[0.28em] text-gold"
      >
        <span className="h-px w-9 bg-gold" /> Toolbox
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-none tracking-tight"
      >
        Yang saya pakai
      </motion.h2>

      <div className="mt-8 flex flex-wrap gap-3.5">
        {skills.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            whileHover={{ y: -4 }}
            className="interactive rounded-full border-2 border-ink/10 bg-bg-soft px-5 py-3 text-[15px] font-semibold shadow-sm transition-colors hover:border-grass hover:bg-grass/15 hover:text-grass-dark"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </section>
  )
}
