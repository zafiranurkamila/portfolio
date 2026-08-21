import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import Farmer3D from './Farmer3D'
import { journey } from '../data'

const ICON = { edu: '🎓', work: '💼', award: '🏆', cert: '📜', project: '🚀' }
const ACCENT = {
  edu: 'border-blue-400',
  work: 'border-gold',
  award: 'border-amber-400',
  cert: 'border-grass',
  project: 'border-fuchsia-400',
}
const COL = 360 // lebar tiap kolom tahun (px)
const ROAD_Y = 322 // posisi jalan tanah dari atas (px)
const CHAR_LEFT = 0.15 // posisi karakter (fraksi lebar)

// Karakter petani Zafira
function Farmer({ walking, greeted }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Balon sapaan */}
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.9 }}
        animate={greeted ? { opacity: 0, y: 8, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="absolute -top-[70px] w-max"
      >
        <div className="relative rounded-2xl border-2 border-ink/10 bg-white px-4 py-2 text-sm font-bold text-ink shadow-md">
          Halo, aku Zafira! 👋
          <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-ink/10 bg-white" />
        </div>
      </motion.div>

      {/* Petani model 3D low-poly */}
      <Farmer3D walking={walking} />
      {/* bayangan */}
      <div className="-mt-2 h-2 w-12 rounded-full bg-black/25 blur-[3px]" />
      {/* debu langkah */}
      {walking && (
        <motion.div
          className="absolute bottom-0 left-0 text-sm"
          animate={{ opacity: [0, 0.7, 0], x: [-2, -16], y: [0, 2] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        >
          💨
        </motion.div>
      )}
    </div>
  )
}

export default function JourneyTimeline() {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const x = useMotionValue(0)
  const [leftBound, setLeftBound] = useState(0)
  const [progress, setProgress] = useState(0)
  const [walking, setWalking] = useState(false)
  const [greeted, setGreeted] = useState(false)

  useEffect(() => {
    const calc = () => {
      if (!viewportRef.current || !trackRef.current) return
      const vw = viewportRef.current.offsetWidth
      const tw = trackRef.current.scrollWidth
      setLeftBound(Math.min(0, vw - tw))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  useEffect(() => {
    const unsub = x.on('change', (v) => {
      setProgress(leftBound < 0 ? Math.min(1, Math.max(0, v / leftBound)) : 0)
    })
    return () => unsub()
  }, [x, leftBound])

  const walk = (dir) => {
    setGreeted(true)
    const target = Math.min(0, Math.max(leftBound, x.get() - dir * COL))
    setWalking(true)
    animate(x, target, {
      type: 'spring',
      stiffness: 80,
      damping: 18,
      onComplete: () => setWalking(false),
    })
  }

  return (
    <section id="journey" className="py-28">
      <div className="mx-auto mb-8 max-w-[1200px] px-7">
        <div className="mb-4 flex w-fit items-center gap-2 rounded-full bg-bg-soft px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.2em] text-grass-dark shadow-sm">
          🌻 The Road So Far
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-bold leading-none tracking-tight text-ink">
            Perjalanan saya
          </h2>
          <p className="max-w-[340px] text-sm font-semibold text-muted">
            Ajak Zafira jalan-jalan 👉 (geser / tombol ← →) dari SMK 2020 sampai
            sekarang — studi, kerja, prestasi, dan proyek.
          </p>
        </div>
      </div>

      {/* Panggung ladang */}
      <div
        ref={viewportRef}
        className="relative h-[470px] w-full overflow-hidden border-y-4 border-grass-dark/20"
      >
        {/* Langit */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-soft to-sky" />
        {/* Rumput */}
        <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-grass to-grass-dark"
          style={{ top: ROAD_Y - 4 }}
        />
        {/* Jalan tanah */}
        <div
          className="absolute inset-x-0 border-y-4 border-soil-dark/40 bg-soil"
          style={{ top: ROAD_Y, height: 52 }}
        />

        {/* Track yang bisa digeser */}
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: leftBound, right: 0 }}
          dragElastic={0.05}
          style={{ x }}
          onDragStart={() => {
            setGreeted(true)
            setWalking(true)
          }}
          onDragEnd={() => setWalking(false)}
          className="absolute left-0 top-0 flex h-full cursor-grab active:cursor-grabbing"
        >
          {/* Ruang awal: biar kartu pertama tidak ketutup tombol & karakter
              bisa "menghampiri" tahun 2020 */}
          <div className="shrink-0" style={{ width: '13vw' }} />

          {/* Marka jalan putus-putus (ikut geser) */}
          <div
            className="pointer-events-none absolute left-0 right-0 h-[4px]"
            style={{
              top: ROAD_Y + 24,
              backgroundImage:
                'repeating-linear-gradient(90deg,#f3d9a6 0 26px,transparent 26px 60px)',
            }}
          />

          {journey.map((y) => (
            <div key={y.year} className="relative shrink-0" style={{ width: COL }}>
              {/* Kartu di langit */}
              <div
                className="absolute left-9 right-9 flex flex-col justify-end gap-2.5"
                style={{ top: 22, height: ROAD_Y - 54 }}
              >
                {y.items.map((it, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: i * 0.08 }}
                    className={`rounded-2xl border-l-4 ${ACCENT[it.type]} border-y border-r border-ink/10 bg-white/95 p-3 shadow-md`}
                  >
                    <div className="flex gap-2">
                      <span className="text-lg leading-none">{ICON[it.type]}</span>
                      <span className="text-[13px] font-semibold leading-snug text-ink">
                        {it.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Papan kayu tahun */}
              <div
                className="absolute font-pixel text-sm text-white"
                style={{ left: 26, top: ROAD_Y + 60 }}
              >
                <span className="inline-block rounded-md border-2 border-soil-dark bg-soil-dark px-3 py-2 shadow-[0_4px_0_#5a3a1e]">
                  {y.year}
                </span>
              </div>

              {/* Dekorasi tanaman */}
              <div className="absolute text-xl" style={{ left: 150, top: ROAD_Y + 58 }}>
                🌾
              </div>
              <div className="absolute text-lg" style={{ left: 250, top: ROAD_Y + 62 }}>
                🌷
              </div>
            </div>
          ))}

          {/* Ruang ekstra di ujung: biar tahun terakhir bisa "dihampiri"
              karakter tanpa numpuk saat mentok */}
          <div className="shrink-0" style={{ width: '55vw' }} />
        </motion.div>

        {/* Karakter Zafira — menempel di layar, ladang bergerak di bawahnya */}
        <div
          className="pointer-events-none absolute z-10"
          style={{ left: `${CHAR_LEFT * 100}%`, top: ROAD_Y - 92, transform: 'translateX(-50%)' }}
        >
          <Farmer walking={walking} greeted={greeted} />
        </div>

        {/* Tombol navigasi */}
        <button
          onClick={() => walk(-1)}
          className="interactive absolute left-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border-2 border-ink/10 bg-white text-xl text-grass-dark shadow-md transition-transform hover:-translate-y-[54%]"
          aria-label="Mundur"
        >
          ←
        </button>
        <button
          onClick={() => walk(1)}
          className="interactive absolute right-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border-2 border-ink/10 bg-white text-xl text-grass-dark shadow-md transition-transform hover:-translate-y-[54%]"
          aria-label="Maju"
        >
          →
        </button>
      </div>

      {/* Progress bar */}
      <div className="mx-auto mt-6 max-w-[1200px] px-7">
        <div className="h-2.5 w-full overflow-hidden rounded-full border border-ink/10 bg-white">
          <div
            className="h-full rounded-full bg-gradient-to-r from-grass to-grass-dark transition-[width] duration-150"
            style={{ width: `${6 + progress * 94}%` }}
          />
        </div>
      </div>
    </section>
  )
}
