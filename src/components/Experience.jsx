import { motion } from 'framer-motion'
import { achievements, certifications } from '../data'

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
  }),
}

export default function Experience() {
  return (
    <section id="awards" className="mx-auto max-w-[1200px] px-7 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-5 flex items-center gap-3 text-[13px] uppercase tracking-[0.28em] text-gold"
      >
        <span className="h-px w-9 bg-gold" /> Recognition
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14 font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-none tracking-tight"
      >
        Penghargaan &amp; Sertifikasi
      </motion.h2>

      <div className="grid gap-16 md:grid-cols-2">
        {/* Penghargaan */}
        <div>
          <h3 className="mb-6 text-xs uppercase tracking-[0.2em] text-muted">
            🏆 Penghargaan
          </h3>
          <div className="space-y-4">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl border-2 border-ink/10 bg-bg-soft shadow-sm p-5"
              >
                <div className="font-display text-xl font-extrabold text-gold">
                  {a.place}
                </div>
                <div className="mt-1 text-sm font-medium">{a.title}</div>
                <div className="text-xs text-muted">{a.org}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sertifikasi */}
        <div>
          <h3 className="mb-6 text-xs uppercase tracking-[0.2em] text-muted">
            📜 Sertifikasi
          </h3>
          <div className="space-y-3">
            {certifications.map((c, i) => (
              <motion.div
                key={c}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex items-center gap-3 rounded-2xl border-2 border-ink/10 bg-bg-soft shadow-sm p-4"
              >
                <span className="text-gold">▹</span>
                <span className="text-sm text-ink/90">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
