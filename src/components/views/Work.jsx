import { motion } from 'framer-motion'
import Img from '../Img'
import { projects } from '../../data'

export default function Work() {
  return (
    <motion.section
      className="h-screen w-screen overflow-y-auto px-5 pb-36 pt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-center font-display text-[clamp(2.4rem,8vw,4.5rem)] font-bold leading-none">
          My work
        </h1>
        <p className="mb-8 text-center font-semibold text-ink/70">
          Proyek nyata dari GitHub 🚀
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <motion.a
              key={p.idx}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ y: -6 }}
              className="group flex flex-col overflow-hidden rounded-[1.6rem] border-[3px] border-ink bg-card shadow-pop"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b-[3px] border-ink">
                <Img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full border-[3px] border-ink bg-bg px-3 py-0.5 text-xs font-bold">
                  {p.idx}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <span className="text-lg transition-transform group-hover:translate-x-1">↗</span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-accent">
                  {p.tags}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
