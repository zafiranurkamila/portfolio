import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Custom cursor: titik kecil yang membesar saat hover elemen interaktif.
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 })
  const [hover, setHover] = useState(false)

  useEffect(() => {
    // Nonaktifkan di perangkat sentuh
    if (window.matchMedia('(hover: none)').matches) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      if (e.target.closest('a, button, .interactive')) setHover(true)
    }
    const out = (e) => {
      if (e.target.closest('a, button, .interactive')) setHover(false)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mouseout', out)
    }
  }, [x, y])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full border-2 border-white bg-grass-dark/80 shadow-md md:block"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: hover ? 56 : 12, height: hover ? 56 : 12 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    />
  )
}
