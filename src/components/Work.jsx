import { motion, useMotionValue, useSpring } from 'framer-motion'
import Img from './Img'
import { projects } from '../data'

const fade = {
  hidden: { opacity: 0, y: 50 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.1 },
  }),
}

// Kartu dengan tilt 3D mengikuti kursor
function ProjectCard({ p, i }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 15 })
  const sry = useSpring(ry, { stiffness: 150, damping: 15 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 12)
    rx.set(-py * 12)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.a
      href={p.link}
      target="_blank"
      rel="noreferrer"
      custom={i}
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="interactive group flex flex-col overflow-hidden rounded-[1.6rem] border-2 border-ink/10 bg-bg-soft shadow-[0_14px_30px_-12px_rgba(125,82,48,.5)] transition-colors hover:border-grass"
    >
      {/* Gambar proyek */}
      <div className="relative aspect-[16/10] overflow-hidden" style={{ transform: 'translateZ(30px)' }}>
        <Img
          src={p.image}
          alt={p.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-grass-dark shadow-sm">
          {p.idx}
        </span>
      </div>

      {/* Teks */}
      <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-grass-dark">
            {p.name}
          </h3>
          <span className="text-xl text-grass-dark opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            ↗
          </span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>
        <p className="mt-4 text-[12px] font-semibold uppercase tracking-wide text-gold">
          {p.tags}
        </p>
      </div>
    </motion.a>
  )
}

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1200px] px-7 py-32">
      <div className="mb-16 flex flex-wrap items-end justify-between gap-5">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-5 flex w-fit items-center gap-2 rounded-full bg-bg-soft px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.2em] text-grass-dark shadow-sm"
          >
            🚜 Selected Work
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(2rem,5vw,3.6rem)] font-bold leading-none tracking-tight text-ink"
          >
            Proyek pilihan
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[300px] font-medium text-muted"
        >
          Karya nyata dari GitHub — dari aplikasi AI kesehatan sampai computer
          vision dan web full-stack.
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-2" style={{ perspective: 1200 }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.idx} p={p} i={i} />
        ))}
      </div>
    </section>
  )
}
