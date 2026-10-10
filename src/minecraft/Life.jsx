import { useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { rng } from './noise'
import { typeSound } from '../sound'

// =====================================================================
//  Kehidupan di dunia: hewan, kapal di laut, dan garis angin
//  (semua model dibuat dari kotak, desain sendiri)
// =====================================================================

const box = new THREE.BoxGeometry(1, 1, 1)
const matCache = {}
const mat = (c) => (matCache[c] ||= new THREE.MeshLambertMaterial({ color: c }))

function Part({ p, s, c, ...rest }) {
  return <mesh geometry={box} material={mat(c)} position={p} scale={s} castShadow {...rest} />
}

// ——— model hewan: [badan, kepala, kaki, detail] ———
const SPECIES = {
  sheep: {
    speed: 0.8, legH: 0.42, sound: { id: 'Mbeeek!', en: 'Baaa!' },
    body: { s: [0.75, 0.6, 1.05], c: '#eceeee' },
    head: { s: [0.42, 0.42, 0.42], c: '#d9c3a5', z: 0.62, y: 0.12 },
    leg: '#8a8a8a',
    extra: [{ p: [0, 0.3, 0.62], s: [0.46, 0.18, 0.3], c: '#eceeee' }],
    eyes: '#2b1d14',
  },
  pig: {
    speed: 0.9, legH: 0.3, sound: { id: 'Ngok ngok!', en: 'Oink oink!' },
    body: { s: [0.65, 0.55, 0.95], c: '#f2a8b1' },
    head: { s: [0.48, 0.45, 0.45], c: '#f2a8b1', z: 0.62, y: 0.04 },
    leg: '#e8939e',
    extra: [{ p: [0, -0.02, 0.88], s: [0.24, 0.16, 0.06], c: '#e07f8a' }],
    eyes: '#2b1d14',
  },
  cow: {
    speed: 0.7, legH: 0.5, sound: { id: 'Mooo!', en: 'Mooo!' },
    body: { s: [0.8, 0.7, 1.3], c: '#5a3d27' },
    head: { s: [0.5, 0.5, 0.42], c: '#5a3d27', z: 0.82, y: 0.14 },
    leg: '#3e2a1b',
    extra: [
      { p: [0.18, 0.22, 0.1], s: [0.46, 0.28, 0.5], c: '#f2f2f2' },
      { p: [0, 0.02, 1.06], s: [0.34, 0.2, 0.08], c: '#e8c4a8' },
      { p: [0.3, 0.46, 0.82], s: [0.1, 0.14, 0.1], c: '#e8e2cf' },
      { p: [-0.3, 0.46, 0.82], s: [0.1, 0.14, 0.1], c: '#e8e2cf' },
    ],
    eyes: '#1b1410',
  },
  chicken: {
    speed: 1.1, legH: 0.22, sound: { id: 'Petok petok!', en: 'Cluck cluck!' },
    body: { s: [0.36, 0.34, 0.46], c: '#f4f4f0' },
    head: { s: [0.26, 0.3, 0.24], c: '#f4f4f0', z: 0.24, y: 0.26 },
    leg: '#e8b030',
    extra: [
      { p: [0, 0.48, 0.28], s: [0.08, 0.1, 0.14], c: '#d8312a' },
      { p: [0, 0.3, 0.42], s: [0.12, 0.07, 0.1], c: '#f0a020' },
    ],
    eyes: '#1b1410',
    legW: 0.06,
  },
}

function Animal({ world, kind, home, seed, lang, consumed }) {
  const sp = SPECIES[kind]
  const group = useRef()
  const legs = useRef([])
  const headRef = useRef()
  const r = useMemo(() => rng(seed * 31 + 7), [seed])
  const state = useRef({ target: null, wait: r() * 3, t: r() * 10, graze: 0 })
  const [say, setSay] = useState(null)
  const { gl } = useThree()
  const bodyY = sp.legH + sp.body.s[1] / 2

  const lineClear = (ax, az, bx, bz) => {
    const d = Math.hypot(bx - ax, bz - az)
    const h0 = world.ground(ax, az)
    for (let s = 0.3; s < d; s += 0.3) {
      const x = ax + ((bx - ax) * s) / d
      const z = az + ((bz - az) * s) / d
      if (!world.canWalk(x, z) || Math.abs(world.ground(x, z) - h0) > 1) return false
    }
    return true
  }

  useFrame((_, rawDt) => {
    const g = group.current
    if (!g) return
    const dt = Math.min(rawDt, 0.05)
    const st = state.current
    st.t += dt
    let moving = false
    if (st.target) {
      const dx = st.target[0] - g.position.x
      const dz = st.target[1] - g.position.z
      const d = Math.hypot(dx, dz)
      if (d < 0.1) st.target = null
      else {
        const step = Math.min(d, sp.speed * dt)
        g.position.x += (dx / d) * step
        g.position.z += (dz / d) * step
        let diff = Math.atan2(dx, dz) - g.rotation.y
        diff = Math.atan2(Math.sin(diff), Math.cos(diff))
        g.rotation.y += diff * Math.min(1, dt * 6)
        moving = true
      }
    } else {
      st.wait -= dt
      if (st.wait <= 0) {
        st.wait = 2 + r() * 5
        if (r() < 0.35) st.graze = 2 + r() * 2 // menunduk makan rumput
        else {
          const a = r() * Math.PI * 2
          const dist = 1.5 + r() * 4
          const tx = home[0] + Math.cos(a) * dist
          const tz = home[1] + Math.sin(a) * dist
          if (world.canWalk(tx, tz) && lineClear(g.position.x, g.position.z, tx, tz)) st.target = [tx, tz]
        }
      }
    }
    st.graze = Math.max(0, st.graze - dt)
    // kaki melangkah & kepala menunduk saat makan
    const swing = moving ? Math.sin(st.t * 10) * 0.6 : 0
    legs.current.forEach((l, i) => l && (l.rotation.x = i % 3 === 0 ? swing : -swing))
    if (headRef.current) headRef.current.rotation.x += ((st.graze > 0 ? 0.7 : 0) - headRef.current.rotation.x) * Math.min(1, dt * 5)
    const want = world.ground(g.position.x, g.position.z) + 0.5 + (moving ? Math.abs(Math.sin(st.t * 10)) * 0.03 : 0)
    g.position.y += (want - g.position.y) * Math.min(1, dt * 12)
  })

  const speak = (e) => {
    e.stopPropagation()
    consumed.current = performance.now()
    setSay(sp.sound[lang] || sp.sound.id)
    typeSound()
    state.current.target = null
    state.current.wait = 2
    setTimeout(() => setSay(null), 1800)
  }

  const lw = sp.legW || 0.18
  const lx = sp.body.s[0] / 2 - lw / 2 - 0.02
  const lz = sp.body.s[2] / 2 - lw / 2 - 0.04
  // posisi & arah awal dihitung sekali saja (supaya tidak lompat saat re-render)
  const [start, startRot] = useMemo(() => {
    const rr = rng(seed * 13 + 1)
    return [[home[0] + (rr() - 0.5) * 2, home[1] + (rr() - 0.5) * 2], rr() * Math.PI * 2]
  }, [home, seed])

  return (
    <group
      ref={group}
      position={[start[0], world.ground(start[0], start[1]) + 0.5, start[1]]}
      rotation-y={startRot}
      onClick={speak}
      onPointerOver={() => (gl.domElement.style.cursor = 'pointer')}
      onPointerOut={() => (gl.domElement.style.cursor = 'grab')}
    >
      <Part p={[0, bodyY, 0]} s={sp.body.s} c={sp.body.c} />
      <group ref={headRef} position={[0, bodyY + sp.head.y, sp.head.z - sp.head.s[2] / 2]}>
        <Part p={[0, 0, sp.head.s[2] / 2]} s={sp.head.s} c={sp.head.c} />
        <Part p={[sp.head.s[0] * 0.28, sp.head.s[1] * 0.12, sp.head.s[2] + 0.005]} s={[0.07, 0.07, 0.01]} c={sp.eyes} />
        <Part p={[-sp.head.s[0] * 0.28, sp.head.s[1] * 0.12, sp.head.s[2] + 0.005]} s={[0.07, 0.07, 0.01]} c={sp.eyes} />
      </group>
      {sp.extra.map((x, i) => (
        <Part key={i} p={[x.p[0], bodyY + x.p[1], x.p[2]]} s={x.s} c={x.c} />
      ))}
      {[[lx, lz], [-lx, lz], [lx, -lz], [-lx, -lz]].map(([x, z], i) => (
        <group key={i} ref={(el) => (legs.current[i] = el)} position={[x, sp.legH, z]}>
          <Part p={[0, -sp.legH / 2, 0]} s={[lw, sp.legH, lw]} c={sp.leg} />
        </group>
      ))}
      {say && (
        <Html position={[0, bodyY + 1.1, 0]} zIndexRange={[18, 8]} style={{ pointerEvents: 'none' }}>
          <div className="mc-speech">{say}</div>
        </Html>
      )}
    </group>
  )
}

export function Animals({ world, lang, consumed }) {
  const herd = useMemo(() => {
    const r = rng(404)
    // padang rumput dekat kebun, kolam, dan di antara hutan
    const spots = [
      ['sheep', [-30, 10]], ['sheep', [-31, 13]], ['sheep', [-28, -10]],
      ['pig', [-22, -12]], ['pig', [-20, 14]],
      ['cow', [30, -9]], ['cow', [33, 7]],
      ['chicken', [-24, 6]], ['chicken', [-23, 7]], ['chicken', [20, 6]], ['chicken', [6, -12]],
      ['sheep', [10, 31]], ['cow', [-10, -33]], ['pig', [36, 16]],
    ]
    const ok = []
    for (const [kind, [x, z]] of spots) {
      // geser sedikit sampai ketemu tanah yang bisa dipijak
      for (let tries = 0; tries < 30; tries++) {
        const px = x + (tries ? (r() - 0.5) * 8 : 0)
        const pz = z + (tries ? (r() - 0.5) * 8 : 0)
        if (world.canWalk(px, pz)) {
          ok.push({ kind, home: [px, pz] })
          break
        }
      }
    }
    return ok
  }, [world])
  return herd.map((a, i) => <Animal key={i} world={world} kind={a.kind} home={a.home} seed={i + 1} lang={lang} consumed={consumed} />)
}

// ——— kapal kayu berlayar mengelilingi pulau ———
function Boat({ radius, speed, phase, sail }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const a = phase + t * speed
    const g = ref.current
    g.position.set(Math.cos(a) * radius, 0.25 + Math.sin(t * 1.3 + phase) * 0.08, Math.sin(a) * radius)
    g.rotation.y = -a + (speed > 0 ? Math.PI : 0)
    g.rotation.z = Math.sin(t * 1.1 + phase) * 0.05
    g.rotation.x = Math.cos(t * 0.9 + phase) * 0.03
  })
  return (
    <group ref={ref}>
      {/* lambung kapal */}
      <Part p={[0, 0, 0]} s={[1.6, 0.5, 4]} c="#7a5230" />
      <Part p={[0, 0.3, 0]} s={[1.3, 0.2, 3.6]} c="#a8834f" />
      <Part p={[0, 0.2, 2.1]} s={[1, 0.5, 0.4]} c="#6b4423" />
      <Part p={[0, 0.35, -1.9]} s={[1.4, 0.5, 0.3]} c="#6b4423" />
      {/* tiang & layar */}
      <Part p={[0, 2.1, 0.2]} s={[0.14, 3.6, 0.14]} c="#5a3a20" />
      <Part p={[0, 2.3, 0.35]} s={[1.9, 2.2, 0.06]} c={sail} />
      <Part p={[0.35, 4.05, 0.2]} s={[0.6, 0.3, 0.04]} c="#d8312a" />
    </group>
  )
}

export function Boats() {
  return (
    <>
      <Boat radius={58} speed={0.035} phase={0} sail="#f2ead3" />
      <Boat radius={64} speed={-0.025} phase={2.4} sail="#f2ead3" />
      <Boat radius={61} speed={0.03} phase={4.2} sail="#f08cb4" />
    </>
  )
}

// ——— garis-garis angin tipis yang melintas ———
export function WindStreaks({ center }) {
  // center = ref ke objek yang diikuti (Zafira)
  const COUNT = 14
  const items = useMemo(() => {
    const r = rng(9)
    return Array.from({ length: COUNT }, () => ({ life: r() * 4, r }))
  }, [])
  const refs = useRef([])
  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }),
    [],
  )
  const mats = useMemo(() => items.map(() => material.clone()), [items, material])
  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const c = center.current
    items.forEach((it, i) => {
      const m = refs.current[i]
      if (!m) return
      it.life -= dt
      if (it.life <= 0) {
        // muncul lagi di sekitar kamera
        it.life = 2.5 + it.r() * 2
        it.max = it.life
        const cx = c ? c.position.x : 0
        const cz = c ? c.position.z : 0
        m.position.set(cx - 18 + it.r() * 20, 2 + it.r() * 7, cz - 16 + it.r() * 32)
        m.scale.set(1.5 + it.r() * 2.5, 1, 1)
      }
      m.position.x += dt * 6
      const k = it.max ? it.life / it.max : 0
      mats[i].opacity = Math.sin(k * Math.PI) * 0.35
    })
  })
  return items.map((_, i) => (
    <mesh key={i} ref={(el) => (refs.current[i] = el)} material={mats[i]} rotation-x={-0.7}>
      <planeGeometry args={[1, 0.05]} />
    </mesh>
  ))
}
