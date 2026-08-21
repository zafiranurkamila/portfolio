import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import Img from './Img'
import { profile, stats } from '../data'

// Angka menghitung naik saat masuk viewport
function CountUp({ to, suffix = '+' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

const fade = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1200px] px-7 py-32">
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-10 flex items-center gap-3 text-[13px] uppercase tracking-[0.28em] text-gold"
      >
        <span className="h-px w-9 bg-gold" /> About
      </motion.div>

      <div className="grid items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
        {/* Foto profil */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] bg-sun/30 blur-2xl" />
          <Img
            src={profile.photo}
            alt={profile.name}
            className="aspect-[4/5] w-full rounded-[2rem] border-4 border-white bg-bg-soft object-cover shadow-lg"
          />
        </motion.div>

        {/* Teks */}
        <div>
          <motion.p
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="text-[clamp(1.1rem,2.4vw,1.6rem)] leading-snug"
          >
            {profile.summary}
          </motion.p>

          <motion.p
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-6 text-base leading-relaxed text-muted"
          >
            {profile.intro}
          </motion.p>

          <div className="mt-10 flex flex-wrap gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl font-extrabold text-gold">
                  <CountUp to={s.n} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-[13px] text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
