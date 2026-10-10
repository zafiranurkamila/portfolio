import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { rng } from './noise'
import { Person } from './Person'
import { typeSound } from '../sound'

// ——— jalan mengikuti antrean titik (hasil A*), tinggi mengikuti tanah ———
function stepAlong(group, queue, speed, dt) {
  if (!queue.length) return false
  const [tx, tz] = queue[0]
  const p = group.position
  const dx = tx - p.x
  const dz = tz - p.z
  const d = Math.hypot(dx, dz)
  if (d < 0.1) {
    queue.shift()
    return queue.length > 0
  }
  const step = Math.min(d, speed * dt)
  p.x += (dx / d) * step
  p.z += (dz / d) * step
  turnTo(group, Math.atan2(dx, dz), dt * 12)
  return true
}

function turnTo(group, want, k) {
  let diff = want - group.rotation.y
  diff = Math.atan2(Math.sin(diff), Math.cos(diff))
  group.rotation.y += diff * Math.min(1, k)
}

function followGround(group, world, dt) {
  const want = world.ground(group.position.x, group.position.z) + 0.5
  group.position.y += (want - group.position.y) * Math.min(1, dt * 14)
}

const ZAFIRA = {
  skin: '#e7b48f',
  hair: '#2e1f17',
  shirt: '#ff7a59',
  pants: '#3c4fa0',
  longHair: true,
  cheeks: '#e89a86',
}

const KEYS = {
  KeyW: [0, 1], ArrowUp: [0, 1], KeyS: [0, -1], ArrowDown: [0, -1],
  KeyA: [-1, 0], ArrowLeft: [-1, 0], KeyD: [1, 0], ArrowRight: [1, 0],
}

// Zafira = karakter yang kamu kendalikan
export function Player({ world, command, bubble, playerRef, onEnter, onNearDoor, onManualMove, onClick, wake, onWakeDone, wakeText, exploreText, onDialog }) {
  const group = playerRef
  const moving = useRef(false)
  const queue = useRef([])
  const speed = useRef(5)
  const pendingEnter = useRef(null)
  const insideId = useRef(null)
  const near = useRef(null)
  const nearTimer = useRef(0)
  const pressed = useRef(new Set())
  const { camera } = useThree()
  const [say, setSay] = useState(null)
  const fwd = useMemo(() => new THREE.Vector3(), [])
  const bodyRef = useRef()
  const pose = useRef({ legs: null })
  const wakeT = useRef(0)
  const wakeQueue = useRef(null)
  const wakeDone = useRef(false)
  const saidMorning = useRef(false)

  // adegan dilewati → langsung berdiri di depan rumah
  useEffect(() => {
    if (wake || !world.home || wakeDone.current) return
    if (wakeT.current > 0 || !saidMorning.current) {
      wakeDone.current = true
      pose.current.legs = null
      if (bodyRef.current) {
        bodyRef.current.rotation.x = 0
        bodyRef.current.position.y = 0
      }
      const [x, z] = world.home.outside
      group.current.position.set(x, world.ground(x, z) + 0.5, z)
      group.current.rotation.y = world.home.rot + Math.PI
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wake])

  // ——— adegan bangun tidur: berbaring → duduk → berdiri → jalan keluar ———
  const runWake = (g, dt) => {
    const H = world.home
    const ss = (a, b, t) => {
      const x = Math.min(1, Math.max(0, (t - a) / (b - a)))
      return x * x * (3 - 2 * x)
    }
    const BED = 1.05
    const lie = { p: [-2, BED, 0.55], rx: -Math.PI / 2, lift: 0.25, legs: 0 }
    const sit = { p: [-2, BED - 0.62, 1.0], rx: 0, lift: 0, legs: -Math.PI / 2 }
    const stand = { p: [-1, 0.5, 0.2], rx: 0, lift: 0, legs: 0 }
    const mix = (a, b, k) => ({
      p: a.p.map((v, i) => v + (b.p[i] - v) * k),
      rx: a.rx + (b.rx - a.rx) * k,
      lift: a.lift + (b.lift - a.lift) * k,
      legs: a.legs + (b.legs - a.legs) * k,
    })
    const t = wakeT.current
    const apply = (s) => {
      const [wx, wz] = H.tf(s.p[0], s.p[2])
      g.position.set(wx, s.p[1], wz)
      g.rotation.y = H.rot + Math.PI
      bodyRef.current.rotation.x = s.rx
      bodyRef.current.position.y = s.lift
      pose.current.legs = s.legs
    }
    if (wake === 'asleep') {
      apply(lie)
      moving.current = false
      return
    }
    wakeT.current += dt
    if (t < 4.5) {
      let s = lie
      if (t > 1.6) s = mix(lie, sit, ss(1.6, 2.7, t))
      if (t > 3.8) s = mix(sit, stand, ss(3.8, 4.5, t))
      apply(s)
      moving.current = false
      if (t > 3.8 && !saidMorning.current) {
        saidMorning.current = true
        onDialog(wakeText)
      }
      return
    }
    // jalan keluar rumah
    pose.current.legs = null
    bodyRef.current.rotation.x = 0
    bodyRef.current.position.y = 0
    if (!wakeQueue.current) wakeQueue.current = [H.tf(0, -1.5), H.door, H.outside, [H.outside[0], H.outside[1] - 1.5]]
    moving.current = stepAlong(g, wakeQueue.current, 2.6, dt)
    followGround(g, world, dt)
    if (!moving.current && !wakeDone.current) {
      wakeDone.current = true
      g.rotation.y = H.rot + Math.PI // menghadap ke desa
      onDialog(exploreText)
      onWakeDone()
    }
  }

  const station = (id) => world.stations.find((s) => s.id === id)

  useEffect(() => {
    const down = (e) => {
      if (!KEYS[e.code] || e.target.closest?.('input, textarea')) return
      pressed.current.add(e.code)
      if (e.code.startsWith('Arrow')) e.preventDefault()
    }
    const up = (e) => pressed.current.delete(e.code)
    const blur = () => pressed.current.clear()
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('blur', blur)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('blur', blur)
    }
  }, [])

  useEffect(() => {
    if (!command) return
    const g = group.current
    const from = [g.position.x, g.position.z]
    const go = (to, extra = []) => {
      const path = world.findPath(from, to)
      if (!path) {
        g.position.set(to[0], world.ground(to[0], to[1]) + 0.5, to[1])
        queue.current = [...extra]
      } else queue.current = [...path, ...extra]
    }
    if (command.type === 'enter') {
      const s = station(command.id)
      if (insideId.current === command.id) {
        onEnter(command.id)
        return
      }
      insideId.current = null
      pendingEnter.current = command.id
      speed.current = 7.5
      go(s.outside, [s.door, s.inside])
    } else if (command.type === 'exit') {
      const s = insideId.current && station(insideId.current)
      insideId.current = null
      pendingEnter.current = null
      speed.current = 5
      if (s) queue.current = [s.door, s.outside]
    } else if (command.type === 'move') {
      insideId.current = null
      pendingEnter.current = null
      speed.current = command.run ? 7.5 : 5.5
      const path = world.findPath(from, command.to)
      if (path) queue.current = path
      g.userData.faceAfter = command.face || null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command])

  useEffect(() => {
    if (!bubble) return
    setSay(bubble.text)
    const id = setTimeout(() => setSay(null), 3200)
    return () => clearTimeout(id)
  }, [bubble])

  useFrame((_, rawDt) => {
    const g = group.current
    const dt = Math.min(rawDt, 0.05)
    if (wake && world.home) {
      runWake(g, dt)
      return
    }

    // kontrol keyboard (relatif terhadap arah kamera)
    let ix = 0
    let iz = 0
    for (const k of pressed.current) {
      ix += KEYS[k][0]
      iz += KEYS[k][1]
    }
    if (ix || iz) {
      queue.current = []
      pendingEnter.current = null
      if (insideId.current) {
        insideId.current = null
        onManualMove()
      }
      camera.getWorldDirection(fwd)
      fwd.y = 0
      fwd.normalize()
      const rx = -fwd.z
      const rz = fwd.x
      let mx = fwd.x * iz + rx * ix
      let mz = fwd.z * iz + rz * ix
      const len = Math.hypot(mx, mz) || 1
      mx /= len
      mz /= len
      const step = 5.5 * dt
      const p = g.position
      const h0 = world.ground(p.x, p.z)
      const free = (x, z) =>
        [[0, 0], [0.28, 0], [-0.28, 0], [0, 0.28], [0, -0.28]].every(
          ([ox, oz]) => world.canWalk(x + ox, z + oz) && Math.abs(world.ground(x + ox, z + oz) - h0) <= 1,
        )
      if (free(p.x + mx * step, p.z + mz * step)) {
        p.x += mx * step
        p.z += mz * step
      } else if (free(p.x + mx * step, p.z)) p.x += mx * step
      else if (free(p.x, p.z + mz * step)) p.z += mz * step
      turnTo(g, Math.atan2(mx, mz), dt * 14)
      moving.current = true
      g.userData.face = undefined
    } else {
      moving.current = stepAlong(g, queue.current, speed.current, dt)
      if (!moving.current && pendingEnter.current) {
        const id = pendingEnter.current
        pendingEnter.current = null
        insideId.current = id
        const s = station(id)
        g.userData.face = Math.atan2(s.inside[0] - s.outside[0], s.inside[1] - s.outside[1])
        onEnter(id)
      }
      if (!moving.current && g.userData.faceAfter) {
        const [fx, fz] = g.userData.faceAfter
        g.userData.face = Math.atan2(fx - g.position.x, fz - g.position.z)
        g.userData.faceAfter = null
      }
      if (moving.current) g.userData.face = undefined
      else if (g.userData.face !== undefined) turnTo(g, g.userData.face, dt * 6)
    }
    followGround(g, world, dt)

    // dekat pintu? munculkan tombol "Masuk"
    nearTimer.current -= dt
    if (nearTimer.current <= 0) {
      nearTimer.current = 0.15
      let found = null
      if (!insideId.current && !pendingEnter.current)
        for (const s of world.stations.filter((x) => x.desk || x.game))
          if (Math.hypot(g.position.x - s.outside[0], g.position.z - s.outside[1]) < 2.6) found = s.id
      if (found !== near.current) {
        near.current = found
        onNearDoor(found)
      }
    }
  })

  return (
    <group ref={group} position={[0, 0.5, 2]}>
      <group ref={bodyRef}>
        <Person
          look={ZAFIRA}
          moving={moving}
          pose={pose}
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        />
      </group>
      {say && (
        <Html position={[0, 2.35, 0]} zIndexRange={[20, 10]} style={{ pointerEvents: 'none' }}>
          <div className="mc-speech">
            <div className="mc-speech-name">Zafira</div>
            {say}
          </div>
        </Html>
      )}
    </group>
  )
}

const VILLAGERS = [
  { skin: '#c98f6b', hair: '#5b3a22', shirt: '#6f4e37', pants: '#3b3b3b', apron: '#e0d6b8' },
  { skin: '#f0c7a1', hair: '#d8b45a', shirt: '#4f9a3a', pants: '#5a4327', longHair: true },
  { skin: '#8d5a3b', hair: '#1b1410', shirt: '#2b7a7a', pants: '#2f2f4f', sleeve: '#e9ecec' },
  { skin: '#e7b48f', hair: '#7a3b1e', shirt: '#7a4fa0', pants: '#3c4fa0', longHair: true, cheeks: '#e89a86' },
  { skin: '#d9a07a', hair: '#9a9a9a', shirt: '#b02e26', pants: '#5a4327', apron: '#8a6d40' },
  { skin: '#f0c7a1', hair: '#2e1f17', shirt: '#c8961e', pants: '#3b3b3b' },
  { skin: '#a8724f', hair: '#1b1410', shirt: '#e9ecec', pants: '#3c4fa0', longHair: true },
]

function Villager({ world, look, seed, playerRef, lines, name, consumed, sound, onTalk, onApproach }) {
  const group = useRef()
  const moving = useRef(false)
  const queue = useRef([])
  const wait = useRef(0.5 + seed * 0.7)
  const talkTime = useRef(0)
  const waiting = useRef(0) // menunggu Zafira datang
  const lineIdx = useRef(0)
  const [say, setSay] = useState(null)
  const [hover, setHover] = useState(false)
  const hoverRef = useRef(false)
  const hoverOn = (v) => {
    hoverRef.current = v
    setHover(v)
  }
  const r = useMemo(() => rng(seed * 97 + 13), [seed])
  const start = world.pois[(seed * 3) % world.pois.length]
  const { gl } = useThree()

  const startTalk = () => {
    waiting.current = 0
    talkTime.current = 5
    setSay(lines[lineIdx.current % lines.length])
    lineIdx.current += 1
    if (sound) typeSound()
    onTalk()
  }

  // diklik → warga berhenti & menunggu, Zafira jalan menghampiri, lalu ngobrol
  const talk = (e) => {
    e?.stopPropagation?.()
    consumed.current = performance.now()
    queue.current = []
    moving.current = false
    const g = group.current
    const p = playerRef.current
    if (p && Math.hypot(p.position.x - g.position.x, p.position.z - g.position.z) < 2.4) {
      startTalk()
      return
    }
    waiting.current = 10
    // titik di samping warga, di sisi yang menghadap Zafira
    const dx = p ? p.position.x - g.position.x : 1
    const dz = p ? p.position.z - g.position.z : 0
    const d = Math.hypot(dx, dz) || 1
    onApproach([g.position.x + (dx / d) * 1.5, g.position.z + (dz / d) * 1.5], [g.position.x, g.position.z])
  }

  useFrame((_, rawDt) => {
    const g = group.current
    const dt = Math.min(rawDt, 0.05)
    const p = playerRef.current
    if (waiting.current > 0) {
      waiting.current -= dt
      moving.current = false
      if (p) {
        turnTo(g, Math.atan2(p.position.x - g.position.x, p.position.z - g.position.z), dt * 6)
        if (Math.hypot(p.position.x - g.position.x, p.position.z - g.position.z) < 2.2) startTalk()
      }
      followGround(g, world, dt)
      return
    }
    if (talkTime.current > 0) {
      talkTime.current -= dt
      if (p) turnTo(g, Math.atan2(p.position.x - g.position.x, p.position.z - g.position.z), dt * 8)
      if (talkTime.current <= 0) {
        setSay(null)
        wait.current = 1
      }
      followGround(g, world, dt)
      return
    }
    if (hoverRef.current) {
      moving.current = false
      if (p) turnTo(g, Math.atan2(p.position.x - g.position.x, p.position.z - g.position.z), dt * 4)
    } else if (queue.current.length) {
      moving.current = stepAlong(g, queue.current, 1.8, dt)
    } else {
      moving.current = false
      wait.current -= dt
      if (wait.current <= 0) {
        wait.current = 2 + r() * 5
        const t = world.pois[Math.floor(r() * world.pois.length)]
        const path = world.findPath([g.position.x, g.position.z], [t[0] + (r() - 0.5) * 2, t[1] + (r() - 0.5) * 2])
        if (path) queue.current = path
      }
    }
    followGround(g, world, dt)
  })

  return (
    <group ref={group} position={[start[0], 0.5, start[1]]} scale={0.92}>
      <Person
        look={look}
        moving={moving}
        onClick={talk}
      />
      {/* kotak klik yang lebih besar dari badan supaya gampang diketuk di HP */}
      <mesh
        position={[0, 1, 0]}
        onClick={talk}
        onPointerOver={(e) => {
          e.stopPropagation()
          hoverOn(true)
          gl.domElement.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          hoverOn(false)
          gl.domElement.style.cursor = 'grab'
        }}
      >
        <boxGeometry args={[1.8, 2.8, 1.8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <Html position={[0, 2.35, 0]} zIndexRange={[18, 8]}>
        {say ? (
          <div className="mc-speech pointer-events-none">
            <div className="mc-speech-name">{name}</div>
            {say}
          </div>
        ) : (
          // tombol 💬 selalu tampil di atas kepala → gampang diketuk
          <button
            className={`mc-talkbtn ${hover ? 'is-hot' : ''}`}
            onClick={talk}
            onPointerEnter={() => hoverOn(true)}
            onPointerLeave={() => hoverOn(false)}
            aria-label={name}
          >
            💬{hover && <span className="ml-1">{name}</span>}
          </button>
        )}
      </Html>
    </group>
  )
}

export function Villagers({ world, playerRef, consumed, villagers, sound, onTalk, onApproach }) {
  return VILLAGERS.map((look, i) => (
    <Villager
      key={i}
      world={world}
      look={look}
      seed={i + 1}
      playerRef={playerRef}
      consumed={consumed}
      name={villagers[i].name}
      lines={villagers[i].lines}
      sound={sound}
      onTalk={onTalk}
      onApproach={onApproach}
    />
  ))
}
