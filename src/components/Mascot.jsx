import { motion } from 'framer-motion'

// Maskot doodle berhijab — kaki bisa melangkah (walking)
export default function Mascot({ className = '', walking = false }) {
  const step = (keys) =>
    walking
      ? { animate: { y: keys }, transition: { repeat: Infinity, duration: 0.5, ease: 'easeInOut' } }
      : { animate: { y: 0 } }

  return (
    <svg viewBox="0 0 220 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="#141414" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" fill="#ffffff">
        {/* kaki kiri (melangkah) */}
        <motion.g {...step([0, -7, 0])}>
          <rect x="88" y="206" width="20" height="62" rx="10" />
          <rect x="82" y="258" width="30" height="20" rx="9" fill="#ff7a59" />
        </motion.g>
        {/* kaki kanan (melangkah, berlawanan) */}
        <motion.g {...step([-7, 0, -7])}>
          <rect x="114" y="206" width="20" height="62" rx="10" />
          <rect x="110" y="258" width="30" height="20" rx="9" fill="#ff7a59" />
        </motion.g>

        {/* badan / baju */}
        <rect x="66" y="158" width="90" height="78" rx="26" fill="#ffffff" />
        {/* lengan */}
        <path d="M74 168 L50 204 L84 212 Z" fill="#ffffff" />
        <path d="M148 168 L172 204 L138 212 Z" fill="#ffffff" />

        {/* hijab */}
        <path
          d="M52 112 C52 40 111 32 111 32 C111 32 170 40 170 112 L178 184 C178 184 111 206 44 184 Z"
          fill="#ff7a59"
        />
      </g>

      {/* wajah */}
      <ellipse cx="111" cy="104" rx="40" ry="42" fill="#f2c9a0" stroke="#141414" strokeWidth="7" />
      <path d="M64 172 Q111 190 158 172" stroke="#d65c3f" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="96" cy="104" r="7.5" fill="#141414" />
      <circle cx="126" cy="104" r="7.5" fill="#141414" />
      <ellipse cx="83" cy="120" rx="9" ry="5.5" fill="#ff9db8" />
      <ellipse cx="139" cy="120" rx="9" ry="5.5" fill="#ff9db8" />
      <path d="M101 122 Q111 134 121 122" stroke="#141414" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
