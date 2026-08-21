import { useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Bukit low-poly bergelombang
function Hills() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(80, 80, 64, 64)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z =
        Math.sin(x * 0.28) * 0.7 +
        Math.cos(y * 0.22) * 0.9 +
        Math.sin((x + y) * 0.14) * 1.3
      pos.setZ(i, z)
    }
    g.computeVertexNormals()
    return g
  }, [])
  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.6, 0]}>
      <meshStandardMaterial color="#6cb83f" flatShading />
    </mesh>
  )
}

// Pohon low-poly
function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.13, 0.6, 6]} />
        <meshStandardMaterial color="#8a5a30" flatShading />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <coneGeometry args={[0.55, 1.1, 7]} />
        <meshStandardMaterial color="#3f8a30" flatShading />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <coneGeometry args={[0.4, 0.85, 7]} />
        <meshStandardMaterial color="#5aa843" flatShading />
      </mesh>
    </group>
  )
}

// Matahari
function Sun() {
  return (
    <mesh position={[7, 6, -14]}>
      <sphereGeometry args={[2.4, 28, 28]} />
      <meshBasicMaterial color="#ffd451" />
    </mesh>
  )
}

// Awan (bola-bola putih)
function Cloud({ position }) {
  return (
    <group position={position}>
      {[
        [0, 0, 0, 1],
        [1.1, 0.2, 0, 0.8],
        [-1.1, 0.1, 0, 0.75],
        [0.4, 0.5, 0.3, 0.7],
      ].map(([x, y, z, s], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[s, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
    </group>
  )
}

// Kamera meluncur saat scroll + parallax mouse
function Rig() {
  useFrame((state) => {
    const p = Math.min(window.scrollY / window.innerHeight, 1)
    const cam = state.camera
    cam.position.z = 8 - p * 4
    cam.position.y = 1.5 + p * 1.4
    cam.position.x += (state.pointer.x * 1.4 - cam.position.x) * 0.03
    cam.lookAt(0, 0.4, -5)
  })
  return null
}

export default function NatureBackground() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const onScroll = () =>
      setOpacity(1 - Math.min(window.scrollY / (window.innerHeight * 1.15), 0.9))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const trees = useMemo(() => {
    const arr = []
    for (let i = 0; i < 14; i++) {
      arr.push({
        pos: [(Math.random() - 0.5) * 46, -1.3, -5 - Math.random() * 22],
        scale: 0.7 + Math.random() * 0.7,
      })
    }
    return arr
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-200"
      style={{ opacity }}
    >
      <Canvas camera={{ position: [0, 1.5, 8], fov: 55 }} dpr={[1, 1.6]}>
        <color attach="background" args={['#bfe8fb']} />
        <fog attach="fog" args={['#d3ecf6', 16, 50]} />
        <ambientLight intensity={0.95} />
        <directionalLight position={[6, 9, 3]} intensity={1.15} color="#fff3d0" />
        <Sun />
        <Hills />
        {trees.map((t, i) => (
          <Tree key={i} position={t.pos} scale={t.scale} />
        ))}
        <Cloud position={[-6, 4.5, -10]} />
        <Cloud position={[7, 5.5, -16]} />
        <Cloud position={[0, 6, -22]} />
        <Rig />
      </Canvas>
    </div>
  )
}
