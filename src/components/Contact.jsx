import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { profile } from '../data'

// Tombol "magnetic" — menempel ke arah kursor
function MagneticButton({ children, href }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.4)
    y.set((e.clientY - r.top - r.height / 2) * 0.4)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="interactive mt-12 inline-block rounded-full border-2 border-grass-dark bg-grass-dark px-12 py-5 text-base font-bold tracking-wide text-white shadow-[0_6px_0_#3a6f2b] transition-transform duration-200 hover:-translate-y-0.5"
    >
      {children}
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-7 py-40 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-6 flex items-center justify-center gap-3 text-[13px] uppercase tracking-[0.28em] text-gold"
      >
        <span className="h-px w-9 bg-gold" /> Get in touch
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[clamp(2.4rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-tighter"
      >
        Mari berkolaborasi
        <br />
        <a href={`mailto:${profile.email}`} className="text-grass-dark">
          Hubungi saya →
        </a>
      </motion.h2>

      <MagneticButton href={`mailto:${profile.email}`}>
        {profile.email}
      </MagneticButton>

      <div className="mt-10 flex justify-center gap-8 text-sm text-muted">
        <a className="interactive transition-colors hover:text-grass-dark" href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="interactive transition-colors hover:text-grass-dark" href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  )
}
