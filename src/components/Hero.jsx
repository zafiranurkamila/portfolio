import { motion } from 'framer-motion'
import { profile } from '../data'

// Animasi reveal per-huruf
function SplitText({ text }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '120%' }}
          animate={{ y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4 + i * 0.04,
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  return (
    <header
      id="top"
      className="relative mx-auto flex min-h-[100svh] max-w-[1200px] flex-col justify-center px-7"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-5 flex w-fit items-center gap-3 rounded-full bg-bg-soft/70 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.24em] text-grass-dark shadow-sm backdrop-blur"
      >
        <span className="text-base">🌱</span> {profile.name}
      </motion.p>

      <h1 className="font-display text-[clamp(2.6rem,12vw,9rem)] font-bold leading-[0.9] tracking-tight text-ink [text-shadow:0_3px_0_rgba(255,255,255,.5)]">
        <span className="block">
          <SplitText text={profile.heroTop} />
        </span>
        <span className="block text-grass-dark">
          <SplitText text={profile.heroBottom} />
        </span>
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="mt-10 flex max-w-2xl flex-wrap justify-between gap-4 rounded-2xl bg-bg-soft/70 p-5 text-base font-medium leading-relaxed text-ink/80 shadow-sm backdrop-blur"
      >
        <p className="max-w-md">{profile.intro}</p>
        <p className="text-right font-semibold text-grass-dark">
          {profile.location.split(',')[0]}
          <br />
          Open for opportunities
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-9 left-7 text-xs uppercase tracking-[0.2em] text-muted"
      >
        Scroll{' '}
        <motion.span
          className="inline-block"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          ↓
        </motion.span>
      </motion.div>
    </header>
  )
}
