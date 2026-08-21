import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

// Kamera "menembus" horizon saat scroll + parallax mouse
function Rig() {
  useFrame((state) => {
    const max = window.innerHeight
    const p = Math.min(window.scrollY / max, 1) // 0..1 di layar pertama
    const cam = state.camera
    // dolly maju + naik sedikit
    cam.position.z = 6 - p * 4.5
    cam.position.y = 1.1 + p * 0.8
    // parallax halus mengikuti mouse
    cam.position.x += (state.pointer.x * 0.6 - cam.position.x) * 0.03
    cam.rotation.x = -0.12 - p * 0.06
  })
  return null
}

// Matahari/horizon glow
function Sun() {
  return (
    <group position={[0, 0.6, -16]}>
      <mesh>
        <circleGeometry args={[5, 64]} />
        <meshBasicMaterial color="#e0a86a" transparent opacity={0.14} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <circleGeometry args={[2.6, 64]} />
        <meshBasicMaterial color="#f2d29b" transparent opacity={0.22} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#0a0a0c']} />
      <fog attach="fog" args={['#0a0a0c', 5, 20]} />
      <Stars radius={70} depth={45} count={2200} factor={3.2} saturation={0} fade speed={0.5} />
      <Sun />
      {/* Grid emas menuju horizon */}
      <gridHelper
        args={[80, 80, '#e0a86a', '#2a2118']}
        position={[0, -1.4, 0]}
      />
      <Rig />
    </>
  )
}

export default function HorizonBackground() {
  const [opacity, setOpacity] = useState(1)
  const ref = useRef(null)

  // Pudar setelah melewati hero, biar section bawah tetap bersih & teks terbaca
  useEffect(() => {
    const onScroll = () => {
      const fade = 1 - Math.min(window.scrollY / (window.innerHeight * 1.3), 0.82)
      setOpacity(fade)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-200"
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 1.1, 6], fov: 60 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Scene />
      </Canvas>
      {/* vignette biar teks tetap kontras */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_35%,rgba(10,10,12,.7)_100%)]" />
    </div>
  )
}
