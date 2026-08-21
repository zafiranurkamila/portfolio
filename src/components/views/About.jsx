import { motion } from 'framer-motion'
import Mascot from '../Mascot'
import { profile, stats, skills } from '../../data'

export default function About() {
  return (
    <motion.section
      className="h-screen w-screen overflow-y-auto px-5 pb-36 pt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-center font-display text-[clamp(2.4rem,8vw,4.5rem)] font-bold leading-none">
          About me
        </h1>

        <div className="rounded-[2rem] border-[3px] border-ink bg-card p-6 shadow-pop md:p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="h-40 w-40 shrink-0 rounded-3xl border-[3px] border-ink bg-bg-2">
              <Mascot className="h-full w-full" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">{profile.name}</h2>
              <p className="mt-1 font-semibold text-accent">{profile.role}</p>
              <p className="mt-3 leading-relaxed text-muted">{profile.intro}</p>
            </div>
          </div>

          {/* stats */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border-[3px] border-ink bg-bg-2 p-3 text-center"
              >
                <div className="font-display text-2xl font-bold text-accent md:text-3xl">
                  {s.n}
                  {s.suffix}
                </div>
                <div className="text-[11px] font-semibold text-ink/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* skills */}
        <h3 className="mb-3 mt-8 font-display text-xl font-bold">🛠️ Skills</h3>
        <div className="flex flex-wrap gap-2.5">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-full border-[3px] border-ink bg-card px-4 py-1.5 text-sm font-bold shadow-[0_4px_0_#141414]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
