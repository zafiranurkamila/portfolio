import { motion } from 'framer-motion'

const ICONS = {
  home: <path d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" />
    </>
  ),
  work: <path d="M3 7h6l2 2h10v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />,
  journey: (
    <>
      <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2z" />
      <path d="M9 3v16M15 5v16" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
}

const items = [
  { icon: 'home', label: 'Home' },
  { icon: 'user', label: 'About' },
  { icon: 'work', label: 'Work' },
  { icon: 'journey', label: 'Journey' },
  { icon: 'mail', label: 'Contact' },
]

export default function Dock({ page, go }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.2 }}
        className="pointer-events-auto flex items-center gap-1.5 rounded-full border-[3px] border-ink bg-card p-2 shadow-pop"
      >
        {items.map((it, i) => (
          <div key={it.label} className="flex items-center">
            {i === items.length - 1 && <span className="mx-1 h-7 w-[3px] rounded bg-ink/15" />}
            <button
              onClick={() => go(i)}
              aria-label={it.label}
              className={`grid h-12 w-12 place-items-center rounded-full transition-colors md:h-14 md:w-14 ${
                page === i ? 'bg-bg text-ink' : 'text-ink hover:bg-ink/5'
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[it.icon]}
              </svg>
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
