import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'

// Model Fox (CC0, Khronos glTF Sample Assets) — punya animasi Survey/Walk/Run
function Fox({ walking }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/models/Fox.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const name = walking ? 'Walk' : 'Survey'
    const action = actions[name] || Object.values(actions)[0]
    if (!action) return
    action.reset().fadeIn(0.25).play()
    return () => action.fadeOut(0.25)
  }, [walking, actions])

  return (
    <group ref={group} rotation={[0, 0.9, 0]} position={[0, -0.8, 0]} scale={0.016}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/Fox.glb')

export default function Farmer3D({ walking }) {
  return (
    <div style={{ width: 170, height: 150 }}>
      <Canvas
        camera={{ position: [0.4, 0.7, 3.2], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.6]}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[2, 4, 3]} intensity={1.2} />
        <directionalLight position={[-3, 2, 1]} intensity={0.4} color="#bfe8fb" />
        <Suspense fallback={null}>
          <Fox walking={walking} />
        </Suspense>
      </Canvas>
    </div>
  )
}
