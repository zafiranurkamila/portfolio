import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import Mascot from './Mascot'
import Img from './Img'
import { startAmbient, stopAmbient, speak, playVoiceClip, preloadVoice } from '../sound'
import {
  profile, projects, tech, journey, achievements, certifications, education, UI,
} from '../data'

const MARK = { edu: 'EDU', work: 'JOB', award: 'WIN', cert: 'CERT', project: 'APP' }

// Pohon (batang panjang, nancep di tanah)
function Tree() {
  return (
    <motion.div
      style={{ transformOrigin: 'bottom center' }}
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="90" height="150" viewBox="0 0 90 150">
        <rect x="39" y="70" width="14" height="80" fill="#8a5a30" stroke="#141414" strokeWidth="4" />
        <circle cx="46" cy="48" r="38" fill="#5aa843" stroke="#141414" strokeWidth="4" />
      </svg>
    </motion.div>
  )
}

// Semak rumput bergoyang
function GrassTuft({ className = '' }) {
  return (
    <motion.svg
      className={className}
      width="56" height="34" viewBox="0 0 56 34"
      style={{ transformOrigin: 'bottom center' }}
      animate={{ rotate: [-6, 6, -6] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <g stroke="#3f7f2e" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M16 34 Q10 16 5 8" />
        <path d="M24 34 Q23 12 19 3" />
        <path d="M30 34 Q30 10 32 2" />
        <path d="M36 34 Q40 14 46 8" />
        <path d="M42 34 Q47 18 52 12" />
      </g>
    </motion.svg>
  )
}

// Palang: papan + TIANG KAYU
function PlantedSign({ text, sub, tone = 'brown' }) {
  const bg = tone === 'green' ? '#4f9a3a' : '#c88a4e'
  return (
    <div className="flex flex-col items-center">
      <div
        style={{ backgroundColor: bg }}
        className="-rotate-2 whitespace-nowrap rounded-xl border-[3px] border-ink px-4 py-2 text-center font-display font-bold text-white shadow-pop"
      >
        {sub ? <span className="block text-[10px] opacity-90 md:text-xs">{text}</span> : null}
        <span className="block text-sm md:text-xl">{sub || text}</span>
      </div>
      <div className="h-[11vh] w-4 border-x-2 border-ink bg-[#7d5230]" />
    </div>
  )
}

// Gerbang antar area (palang nancep + pohon)
function Gate({ t, label, showFarewell = true, showWelcome = true }) {
  return (
    <div className="relative h-full w-[70vw] shrink-0">
      {showFarewell && (
        <div className="absolute bottom-[14vh] left-[10%]"><PlantedSign text={t.farewell} /></div>
      )}
      <div className="absolute bottom-[14vh] left-1/2 -translate-x-1/2"><Tree /></div>
      {showWelcome && (
        <div className="absolute bottom-[14vh] right-[10%]"><PlantedSign text={t.welcome} sub={label} /></div>
      )}
      <GrassTuft className="absolute bottom-[15vh] left-[24%]" />
      <GrassTuft className="absolute bottom-[15vh] left-[40%]" />
      <GrassTuft className="absolute bottom-[15vh] left-[66%]" />
      <GrassTuft className="absolute bottom-[15vh] left-[84%]" />
    </div>
  )
}

function TypeBubble({ text, trigger }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    setN(0)
    const id = setInterval(() => {
      setN((v) => { if (v >= text.length) { clearInterval(id); return v } return v + 1 })
    }, 65)
    return () => clearInterval(id)
  }, [text, trigger])
  return (
    <div className="relative w-max max-w-[70vw] rounded-2xl border-[3px] border-ink bg-white px-4 py-2 font-display text-base font-bold text-ink shadow-pop md:text-lg">
      {text.slice(0, n)}<span className="animate-pulse">|</span>
      <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-[3px] border-r-[3px] border-ink bg-white" />
    </div>
  )
}

// Kucing tampak samping (default hadap KIRI)
function CatSide() {
  return (
    <svg width="88" height="72" viewBox="0 0 88 72">
      <g stroke="#141414" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M68 46 q22 -2 12 -28" fill="none" />
        <ellipse cx="44" cy="48" rx="26" ry="17" fill="#f0a25a" />
        <rect x="30" y="57" width="8" height="12" rx="4" fill="#f0a25a" />
        <rect x="50" y="57" width="8" height="12" rx="4" fill="#f0a25a" />
        <circle cx="26" cy="36" r="16" fill="#f0a25a" />
        <path d="M14 28 L11 10 L27 22 Z" fill="#f0a25a" />
        <path d="M38 28 L41 10 L25 22 Z" fill="#f0a25a" />
      </g>
      <circle cx="20" cy="36" r="2.4" fill="#141414" />
      <circle cx="31" cy="36" r="2.4" fill="#141414" />
      <path d="M23 41 q3 3 6 0" stroke="#141414" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M16 45 q10 5 20 0" stroke="#ff3b6b" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// Kucing tampak DEPAN (pas diam)
function CatFront() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 84">
      <g stroke="#141414" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M60 58 q22 8 10 -18" fill="none" />
        <path d="M20 52 q20 -14 40 0 l-3 24 q-17 9 -34 0 z" fill="#f0a25a" />
        <circle cx="40" cy="34" r="20" fill="#f0a25a" />
        <path d="M24 22 L20 5 L37 16 Z" fill="#f0a25a" />
        <path d="M56 22 L60 5 L43 16 Z" fill="#f0a25a" />
      </g>
      <circle cx="33" cy="34" r="3" fill="#141414" />
      <circle cx="47" cy="34" r="3" fill="#141414" />
      <circle cx="40" cy="41" r="2.2" fill="#ff6b8a" />
      <path d="M40 43 q-4 4 -8 2 M40 43 q4 4 8 2" stroke="#141414" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M28 50 q12 6 24 0" stroke="#ff3b6b" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// Kucing: hadap depan saat diam, nengok kiri/kanan saat jalan
function Cat({ walking, facing }) {
  return (
    <motion.div
      animate={walking ? { y: [0, -4, 0] } : { y: [0, -1.5, 0] }}
      transition={{ duration: walking ? 0.45 : 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ scaleX: facing === 'right' ? -1 : 1 }}
    >
      {facing === 'front' ? <CatFront /> : <CatSide />}
    </motion.div>
  )
}

function Bird({ top, duration, delay, flip }) {
  return (
    <motion.div className="pointer-events-none absolute z-10" style={{ top }}
      initial={{ x: flip ? '110vw' : '-10vw' }} animate={{ x: flip ? '-10vw' : '110vw' }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}>
      <motion.svg width="40" height="24" viewBox="0 0 40 24" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
        animate={{ scaleY: [1, 0.6, 1] }} transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M2 12 Q12 2 20 12 Q28 2 38 12" stroke="#3a3a4a" strokeWidth="3" fill="none" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  )
}

export default function World() {
  const worldRef = useRef(null)
  const segRefs = useRef([])
  const camRef = useRef(0)
  const dirRef = useRef(0)
  const targetRef = useRef(null)
  const centersRef = useRef([])
  const minCamRef = useRef(0)
  const [walking, setWalking] = useState(false)
  const [active, setActive] = useState(0)
  const [hint, setHint] = useState(true)
  const [bubbleKey, setBubbleKey] = useState(0)
  const [facing, setFacing] = useState('front')
  const [lang, setLang] = useState('en')
  const [soundOn, setSoundOn] = useState(false)
  const jump = useAnimationControls()
  const startedRef = useRef(false)
  const t = UI[lang]

  // Suara "Hai I'm Zafira" HANYA di Home & About; section lain tanpa suara
  const sayHi = () => {
    if (active > 1) return // section lain: diam
    if (lang === 'en') playVoiceClip('/audio/hi-en.mp3')
    else speak(t.voice, lang)
  }

  const ensureSound = () => {
    if (startedRef.current) return
    startedRef.current = true
    startAmbient()
    setSoundOn(true)
    setBubbleKey((k) => k + 1)
    sayHi()
  }

  const doJump = () => { ensureSound(); jump.start({ y: [0, -150, 0], transition: { duration: 0.6, ease: 'easeOut' } }) }
  const doSpeak = () => { setBubbleKey((k) => k + 1); sayHi() }
  const toggleSound = () => {
    startedRef.current = true
    if (soundOn) { stopAmbient(); setSoundOn(false) } else { startAmbient(); setSoundOn(true) }
  }

  // maskot drop-in dari atas saat load
  useEffect(() => {
    preloadVoice('/audio/hi-en.mp3')
    jump.start({ y: [-window.innerHeight, 0], transition: { type: 'spring', stiffness: 90, damping: 9, delay: 0.2 } })
    // greeting otomatis saat interaksi PERTAMA (klik/tekan apa saja) — browser wajib 1 gesture
    const onFirst = () => ensureSound()
    window.addEventListener('pointerdown', onFirst, { once: true })
    window.addEventListener('keydown', onFirst, { once: true })
    return () => {
      window.removeEventListener('pointerdown', onFirst)
      window.removeEventListener('keydown', onFirst)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth
      if (worldRef.current) minCamRef.current = -(worldRef.current.scrollWidth - vw)
      centersRef.current = segRefs.current.map((el) => (el ? el.offsetLeft + el.offsetWidth / 2 : 0))
    }
    measure()
    const tms = [200, 600, 1200, 2000].map((d) => setTimeout(measure, d))
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure)
    return () => {
      tms.forEach(clearTimeout)
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
    }
  }, [lang])

  useEffect(() => {
    let raf, wasWalking = false, curActive = 0, prevCam = 0, curFacing = 'front'
    const SPEED = 9
    const loop = () => {
      let cam = camRef.current, moving = false
      if (targetRef.current != null) {
        const target = targetRef.current
        cam += (target - cam) * 0.1
        if (Math.abs(target - cam) < 1.5) { cam = target; targetRef.current = null } else moving = true
      } else if (dirRef.current !== 0) { cam -= dirRef.current * SPEED; moving = true }
      const vw = window.innerWidth
      cam = Math.max(minCamRef.current, Math.min(0, cam))
      camRef.current = cam
      if (worldRef.current) worldRef.current.style.transform = `translate3d(${cam}px,0,0)`
      // arah hadap kucing: kanan saat maju, kiri saat mundur, depan saat diam
      const delta = cam - prevCam
      prevCam = cam
      const f = delta < -0.4 ? 'right' : delta > 0.4 ? 'left' : 'front'
      if (f !== curFacing) { curFacing = f; setFacing(f) }
      const charX = vw / 2 - cam
      let nearest = 0, best = Infinity
      centersRef.current.forEach((c, i) => { const d = Math.abs(c - charX); if (d < best) { best = d; nearest = i } })
      if (nearest !== curActive) { curActive = nearest; setActive(nearest) }
      if (moving !== wasWalking) { wasWalking = moving; setWalking(moving) }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'd') { dirRef.current = 1; setHint(false); ensureSound() }
      if (e.key === 'ArrowLeft' || e.key === 'a') { dirRef.current = -1; setHint(false); ensureSound() }
      if (e.key === ' ') { e.preventDefault(); doJump() }
    }
    const up = (e) => { if (['ArrowRight', 'd', 'ArrowLeft', 'a'].includes(e.key)) dirRef.current = 0 }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  const goTo = (i) => {
    setHint(false); ensureSound()
    const vw = window.innerWidth
    // re-measure biar posisi selalu akurat
    if (worldRef.current) minCamRef.current = -(worldRef.current.scrollWidth - vw)
    centersRef.current = segRefs.current.map((el) => (el ? el.offsetLeft + el.offsetWidth / 2 : 0))
    targetRef.current = Math.max(minCamRef.current, Math.min(0, vw / 2 - centersRef.current[i]))
  }
  const hold = (d) => () => { dirRef.current = d; setHint(false); ensureSound() }
  const release = () => (dirRef.current = 0)
  const setSeg = (i) => (el) => (segRefs.current[i] = el)

  return (
    <div
      className="relative h-[100svh] w-screen overflow-hidden bg-gradient-to-b from-[#9ad8f5] to-bg"
      onPointerDown={() => {
        const wasStarted = startedRef.current
        ensureSound()
        if (wasStarted) doSpeak()
      }}
    >
      {/* Nama pojok kiri atas */}
      <div className="absolute left-3 top-3 z-40">
        <div className="w-fit rounded-full border-[3px] border-ink bg-card px-3 py-1.5 font-display text-sm font-bold shadow-pop md:px-4 md:py-2 md:text-lg">{profile.name}</div>
      </div>

      {/* Awan */}
      {[['6%', 60, 0, 1.1], ['16%', 90, 6, 0.7], ['9%', 75, 14, 0.9], ['22%', 110, 3, 0.6]].map(([top, dur, delay, sc], i) => (
        <motion.div key={i} className="pointer-events-none absolute" style={{ top, scale: sc }}
          initial={{ x: '-15vw' }} animate={{ x: '115vw' }} transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}>
          <svg width="150" height="60" viewBox="0 0 150 60" fill="#ffffff" opacity="0.9">
            <ellipse cx="50" cy="38" rx="38" ry="22" /><ellipse cx="80" cy="30" rx="34" ry="26" /><ellipse cx="105" cy="40" rx="30" ry="20" />
          </svg>
        </motion.div>
      ))}
      <Bird top="18%" duration={18} delay={0} />
      <Bird top="28%" duration={24} delay={5} />
      <Bird top="12%" duration={30} delay={12} flip />

      {/* Rumput (full-width, tetap) */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[20vh] w-full border-t-[6px] border-ink bg-[#8bd08b]" />

      {/* DUNIA */}
      <div ref={worldRef} className="absolute left-0 top-0 z-[1] h-full will-change-transform">
        <div className="flex h-full items-stretch">
          {/* HOME */}
          <section ref={setSeg(0)} className="relative flex h-full w-screen shrink-0 flex-col items-center justify-center px-6">
            <div className="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center pb-[16vh] font-display font-bold leading-[0.82] text-white/45">
              <span className="text-[clamp(2.4rem,13vw,11rem)]">WEB &amp; AI</span>
              <span className="text-[clamp(2.4rem,13vw,11rem)]">DEVELOPER</span>
            </div>
            <GrassTuft className="absolute bottom-[15vh] left-[12%]" />
            <GrassTuft className="absolute bottom-[15vh] left-[30%]" />
            <GrassTuft className="absolute bottom-[15vh] right-[14%]" />
          </section>

          <Gate t={t} label={t.signAbout} showFarewell={false} />

          {/* ABOUT */}
          <section ref={setSeg(1)} className="relative flex h-full shrink-0 flex-col items-center justify-start px-[8vw] pt-[13vh] pb-[24vh]">
            <div className="flex max-w-2xl flex-col gap-5 rounded-[1.6rem] border-[3px] border-ink bg-card p-5 shadow-pop md:flex-row md:p-6">
              <div className="h-44 w-36 shrink-0 overflow-hidden rounded-2xl border-[3px] border-ink bg-bg-2">
                <Img src={profile.photo} alt={profile.name} className="h-full w-full object-cover object-center" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">{profile.name}</h2>
                <p className="mt-2 text-sm font-medium leading-relaxed text-muted md:text-base">{lang === 'en' ? profile.summaryEn : profile.summary}</p>
              </div>
            </div>
          </section>

          <Gate t={t} label={t.signEducation} />

          {/* EDUCATION */}
          <section ref={setSeg(2)} className="relative flex h-full shrink-0 flex-col items-center justify-start px-[8vw] pt-[13vh] pb-[24vh]">
            <div className="flex flex-col gap-4">
              {education.map((e) => (
                <div key={e.school} className="flex w-[300px] items-center gap-4 rounded-[1.4rem] border-[3px] border-ink bg-card p-4 shadow-pop md:w-[440px]">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border-[3px] border-ink bg-bg-2 text-3xl">{e.emoji}</div>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-tight">{e.school}</h3>
                    <p className="text-sm font-semibold text-accent">{lang === 'en' ? e.degreeEn : e.degree}</p>
                    <p className="text-xs font-bold text-muted">{lang === 'en' ? e.periodEn : e.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Gate t={t} label={t.signTech} />

          {/* TECH */}
          <section ref={setSeg(3)} className="relative flex h-full shrink-0 flex-col items-center justify-start px-[8vw] pt-[13vh] pb-[24vh]">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4">
              {tech.map((it) => (
                <div key={it.name} className="flex w-[100px] flex-col items-center gap-2 rounded-2xl border-[3px] border-ink bg-card p-3 shadow-[0_5px_0_#141414] md:w-[120px]">
                  <div className="grid h-12 w-12 place-items-center md:h-14 md:w-14">
                    {it.logo ? <img src={`/images/tech/${it.logo}.svg`} alt={it.name} className="h-full w-full object-contain" /> : <span className="text-3xl">{it.emoji}</span>}
                  </div>
                  <span className="text-center text-[11px] font-bold leading-tight md:text-xs">{it.name}</span>
                </div>
              ))}
            </div>
          </section>

          <Gate t={t} label={t.signWork} />

          {/* WORK */}
          <section ref={setSeg(4)} className="relative flex h-full shrink-0 flex-col items-center justify-start px-[8vw] pt-[13vh] pb-[24vh]">
            <div className="flex gap-5">
              {projects.map((p) => (
                <a key={p.idx} href={p.link} target="_blank" rel="noreferrer" className="flex w-[240px] shrink-0 flex-col overflow-hidden rounded-[1.4rem] border-[3px] border-ink bg-card shadow-pop md:w-[280px]">
                  <div className="h-44 overflow-hidden border-b-[3px] border-ink bg-bg-2"><Img src={p.image} alt={p.name} className="h-full w-full object-cover object-top" /></div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-bold">{p.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted">{lang === 'en' ? p.descEn : p.desc}</p>
                    <p className="mt-2 text-[10px] font-bold uppercase text-accent">{p.tags}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <Gate t={t} label={t.signJourney} />

          {/* JOURNEY */}
          <section ref={setSeg(5)} className="relative flex h-full shrink-0 flex-col items-center justify-start px-[8vw] pt-[13vh] pb-[24vh]">
            <div className="flex items-stretch gap-5">
              {journey.map((y) => (
                <div key={y.year} className="flex w-[230px] shrink-0 flex-col">
                  <div className="mb-2 w-fit rounded-xl border-[3px] border-ink bg-accent px-3 py-1 font-display text-lg font-bold text-white shadow-[0_4px_0_#141414]">{y.year}</div>
                  <div className="space-y-2">
                    {y.items.map((it, j) => (
                      <div key={j} className="rounded-xl border-[3px] border-ink bg-card p-2.5 shadow-[0_4px_0_#141414]">
                        <span className="mr-1 rounded bg-bg-2 px-1 text-[9px] font-bold">{MARK[it.type]}</span>
                        <span className="text-xs font-semibold leading-snug">{lang === 'en' ? it.textEn : it.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Gate t={t} label={t.signContact} />

          {/* CONTACT */}
          <section ref={setSeg(6)} className="relative flex h-full shrink-0 flex-col items-center justify-start px-[8vw] pt-[13vh] pb-[24vh]">
            <a href={`mailto:${profile.email}`} className="w-fit rounded-full border-[3px] border-ink bg-accent px-6 py-3 font-display text-base font-bold text-white shadow-pop md:text-lg">{profile.email}</a>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-full border-[3px] border-ink bg-card px-5 py-2 font-bold shadow-[0_4px_0_#141414]">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-full border-[3px] border-ink bg-card px-5 py-2 font-bold shadow-[0_4px_0_#141414]">LinkedIn</a>
            </div>
            <div className="mt-5 max-w-lg rounded-2xl border-[3px] border-ink bg-card p-4 shadow-pop">
              <p className="text-sm font-bold">{lang === 'en' ? achievements[0].placeEn : achievements[0].place} — {achievements[0].title}</p>
              <p className="mt-1 text-xs text-muted">{certifications.length} {t.certsLabel} · {achievements.length} {t.awardsLabel}</p>
            </div>
          </section>

          {/* Gerbang akhir */}
          <div className="relative h-full w-[55vw] shrink-0">
            <div className="absolute bottom-[14vh] left-[22%]"><PlantedSign text={t.farewell} /></div>
            <div className="absolute bottom-[14vh] left-[58%]"><Tree /></div>
          </div>
        </div>
      </div>

      {/* KARAKTER + bubble (drop-in & ikut lompat) */}
      <div className="absolute bottom-[18vh] left-1/2 z-20 -translate-x-1/2">
        {/* bayangan maskot & kucing (tetap di tanah) */}
        <div className="absolute bottom-0 left-1/2 h-3 w-20 -translate-x-1/2 rounded-full bg-black/25 blur-[3px]" />
        <div className="absolute bottom-0 left-[-58px] h-2.5 w-14 rounded-full bg-black/20 blur-[3px]" />

        <motion.div animate={jump} className="relative flex flex-col items-center">
          {/* Kucing ikut lompat + nengok arah jalan */}
          <div className="absolute bottom-0 left-[-80px] z-10"><Cat walking={walking} facing={facing} /></div>

          <div className="mb-2"><TypeBubble text={(t.bubbles && t.bubbles[active]) || t.bubble} trigger={`${lang}-${active}-${bubbleKey}`} /></div>
          <motion.div className="relative h-[24vh] cursor-pointer md:h-[26vh]" onClick={() => { doJump(); doSpeak() }}
            animate={walking ? { y: [0, -6, 0], rotate: [-2, 2, -2] } : { y: [0, -2, 0] }}
            transition={{ duration: walking ? 0.4 : 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <Mascot walking={walking} className="h-full w-auto" />
          </motion.div>
        </motion.div>
      </div>

      {hint && (
        <div className="pointer-events-none absolute left-1/2 top-6 z-40 hidden -translate-x-1/2 whitespace-nowrap rounded-full border-[3px] border-ink bg-card px-4 py-1.5 text-xs font-bold shadow-pop md:block md:text-sm">{t.hint}</div>
      )}

      {/* Kontrol kanan atas */}
      <div className="absolute right-3 top-3 z-40 flex gap-2">
        <button onClick={() => setLang((l) => (l === 'id' ? 'en' : 'id'))} aria-label="Bahasa" className="grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-full border-[3px] border-ink bg-card font-display text-sm font-bold shadow-pop active:translate-y-0.5">{lang === 'id' ? 'EN' : 'ID'}</button>
        <button onClick={toggleSound} aria-label="Musik" className={`grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-full border-[3px] border-ink text-lg shadow-pop active:translate-y-0.5 ${soundOn ? 'bg-accent2' : 'bg-card'}`}>{soundOn ? '🎵' : '🔇'}</button>
        <button onClick={doSpeak} aria-label="Suara" className="grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-full border-[3px] border-ink bg-card text-lg shadow-pop active:translate-y-0.5">🔊</button>
      </div>

      {/* Tombol jalan */}
      <button onMouseDown={hold(-1)} onMouseUp={release} onMouseLeave={release} onTouchStart={(e) => { e.preventDefault(); hold(-1)() }} onTouchEnd={release} aria-label="kiri"
        className="absolute bottom-4 left-3 z-40 grid h-14 w-14 select-none place-items-center rounded-full border-[3px] border-ink bg-card text-2xl shadow-pop active:translate-y-1 md:h-16 md:w-16">◀</button>
      <button onMouseDown={hold(1)} onMouseUp={release} onMouseLeave={release} onTouchStart={(e) => { e.preventDefault(); hold(1)() }} onTouchEnd={release} aria-label="kanan"
        className="absolute bottom-4 right-3 z-40 grid h-14 w-14 select-none place-items-center rounded-full border-[3px] border-ink bg-card text-2xl shadow-pop active:translate-y-1 md:h-16 md:w-16">▶</button>

      {/* Menu tempat */}
      <div className="absolute inset-x-0 bottom-5 z-30 flex justify-center px-20">
        <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border-[3px] border-ink bg-card p-1.5 shadow-pop">
          {t.stations.map((s, i) => (
            <button key={i} onClick={() => goTo(i)} className={`shrink-0 rounded-full px-2.5 py-1.5 text-[11px] font-bold transition-colors md:px-4 md:text-sm ${active === i ? 'bg-bg text-ink' : 'text-ink hover:bg-ink/5'}`}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
