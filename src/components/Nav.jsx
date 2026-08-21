import { motion } from 'framer-motion'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Journey', href: '#journey' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 }}
      className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-7 py-5"
    >
      <a
        href="#top"
        className="rounded-full bg-bg-soft/80 px-4 py-1.5 font-display text-xl font-bold tracking-tight text-ink shadow-sm backdrop-blur"
      >
        ZAFIRA<span className="text-grass-dark">.</span>
      </a>
      <div className="hidden items-center gap-2 rounded-full bg-bg-soft/80 px-3 py-1.5 text-sm font-semibold text-ink shadow-sm backdrop-blur md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-grass/25 hover:text-grass-dark"
          >
            {l.label}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}
