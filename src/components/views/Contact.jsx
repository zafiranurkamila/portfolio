import { motion } from 'framer-motion'
import { profile, achievements, certifications } from '../../data'

export default function Contact() {
  return (
    <motion.section
      className="h-screen w-screen overflow-y-auto px-5 pb-36 pt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-[clamp(2.6rem,9vw,5.5rem)] font-bold leading-none">
          Let&apos;s talk! 👋
        </h1>
        <p className="mx-auto mt-4 max-w-md font-semibold text-ink/70">
          Punya proyek atau mau kolaborasi? Yuk ngobrol.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-block rounded-full border-[3px] border-ink bg-accent px-8 py-4 font-display text-lg font-bold text-white shadow-pop transition-transform hover:-translate-y-1"
        >
          {profile.email}
        </a>

        <div className="mt-5 flex justify-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-[3px] border-ink bg-card px-6 py-2.5 font-bold shadow-[0_5px_0_#141414] transition-transform hover:-translate-y-0.5"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-[3px] border-ink bg-card px-6 py-2.5 font-bold shadow-[0_5px_0_#141414] transition-transform hover:-translate-y-0.5"
          >
            LinkedIn
          </a>
        </div>

        {/* Penghargaan & sertifikasi */}
        <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-[1.6rem] border-[3px] border-ink bg-card p-5 shadow-pop">
            <h3 className="mb-3 font-display text-lg font-bold">🏆 Penghargaan</h3>
            <ul className="space-y-2">
              {achievements.map((a) => (
                <li key={a.title} className="text-sm">
                  <span className="font-bold text-accent">{a.place}</span> — {a.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.6rem] border-[3px] border-ink bg-card p-5 shadow-pop">
            <h3 className="mb-3 font-display text-lg font-bold">📜 Sertifikasi</h3>
            <ul className="space-y-2">
              {certifications.map((c) => (
                <li key={c} className="text-sm font-medium">
                  ▹ {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
