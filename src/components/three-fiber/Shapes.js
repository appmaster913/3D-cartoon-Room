import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, useGLTF, } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

export function Level() {
  const { nodes } = useGLTF('/level-react-draco.glb')
  return <mesh geometry={nodes.Level.geometry} material={nodes.Level.material} position={[-0.38, 0.69, 0.62]} rotation={[Math.PI / 2, -Math.PI / 9, 0]} />
}

export function Sudo() {
  const { nodes } = useGLTF('/level-react-draco.glb')
  const [spring, api] = useSpring(() => ({ rotation: [Math.PI / 2, 0, 0.29], config: { friction: 40 } }), [])
  useEffect(() => {
    let timeout
    const wander = () => {
      api.start({ rotation: [Math.PI / 2 + THREE.MathUtils.randFloatSpread(2) * 0.3, 0, 0.29 + THREE.MathUtils.randFloatSpread(2) * 0.2] })
      timeout = setTimeout(wander, (1 + Math.random() * 2) * 800)
    }
    wander()
    return () => clearTimeout(timeout)
  }, [])
  return (
    <>
      <mesh geometry={nodes.Sudo.geometry} material={nodes.Sudo.material} position={[0.68, 0.33, -0.67]} rotation={[Math.PI / 2, 0, 0.29]} />
      <a.mesh geometry={nodes.SudoHead.geometry} material={nodes.SudoHead.material} position={[0.68, 0.33, -0.67]} {...spring} />
    </>
  )
}

export function Camera() {
  const { nodes, materials } = useGLTF('/level-react-draco.glb')
  const [spring, api] = useSpring(() => ({ 'rotation-z': 0, config: { friction: 40 } }), [])
  useEffect(() => {
    let timeout
    const wander = () => {
      api.start({ 'rotation-z': Math.random() })
      timeout = setTimeout(wander, (1 + Math.random() * 2) * 800)
    }
    wander()
    return () => clearTimeout(timeout)
  }, [])
  return (
    <a.group position={[-0.58, 0.83, -0.03]} rotation={[Math.PI / 2, 0, 0.47]} {...spring}>
      <mesh geometry={nodes.Camera.geometry} material={nodes.Camera.material} />
      <mesh geometry={nodes.Camera_1.geometry} material={materials.Lens} />
    </a.group>
  )
}

export function Cactus() {
  const { nodes, materials } = useGLTF('/level-react-draco.glb')
  return (
    <mesh geometry={nodes.Cactus.geometry} position={[-0.42, 0.51, -0.62]} rotation={[Math.PI / 2, 0, 0]}>
      <MeshWobbleMaterial factor={0.4} map={materials.Cactus.map} />
    </mesh>
  )
}

export function Yeah() {
  const { nodes } = useGLTF('/Yeah!.glb');

  const newColor = '#ff0000'

  return (
    <mesh
      geometry={nodes.Yeah0061.geometry}
      material={nodes.Yeah0061.material}
      position={[0.4, 2, -0.5]}
      scale={0.25}
      rotation={[Math.PI / 2, Math.PI, Math.PI]}
    >
      <MeshWobbleMaterial factor={0.4} map={nodes.Yeah0061.map} color={newColor} />
    </mesh>
  );
}

export function Box({ scale = 1, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x = ref.current.rotation.y += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={(clicked ? 1.5 : 1) * scale}
      onClick={() => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
// model from: https://sketchfab.com/3d-models/matilda-7ddedfb652bd4ea091bc3de27f98fc02
export function Matilda() {
  const { nodes } = useGLTF('/matilda.glb');

  const renderMeshComponents = () => {
    const meshComponents = [];

    for (const [nodeName, node] of Object.entries(nodes)) {
      if (node.geometry && node.material) {
        meshComponents.push(
          <mesh
            key={nodeName} // Ensure each component has a unique key
            geometry={node.geometry}
            material={node.material}
            position={[0.4, -2, -6]}
            scale={0.1}
            rotation={[Math.PI, Math.PI, Math.PI]}
          />
        );
      }
    }

    return meshComponents;
  };

  return <>{renderMeshComponents()}</>;
}

export function WobbleMatilda() {
  const { nodes } = useGLTF('/matilda.glb');

  const renderMeshComponents = () => {
    const meshComponents = [];

    for (const [nodeName, node] of Object.entries(nodes)) {
      if (node.geometry && node.material) {
        meshComponents.push(
          <mesh
            key={nodeName} // Ensure each component has a unique key
            geometry={node.geometry}
            position={[10, -2, -6]}
            scale={0.1}
            rotation={[Math.PI, Math.PI, Math.PI]}
          >
            <MeshWobbleMaterial
              attach="material"
              factor={0.2} // Adjust the wobble factor as needed
              speed={4} // Adjust the wobble speed as needed
              map={node.material.map} // Use the texture map from the original material
              color={node.material.color} // Use the color from the original material
            />
          </mesh>
        );
      }
    }

    return meshComponents;
  };

  return <>{renderMeshComponents()}</>;
}

export function BrilliantMatilda() {
  const { nodes } = useGLTF('/matilda.glb');

  const renderMeshComponents = () => {
    const meshComponents = [];

    for (const [nodeName, node] of Object.entries(nodes)) {
      if (node.geometry && node.material) {
        meshComponents.push(
          <mesh
            key={nodeName} // Ensure each component has a unique key
            geometry={node.geometry}
            position={[-9, -2, -6]}
            scale={0.1}
            rotation={[Math.PI, Math.PI, Math.PI]}
          >
            <meshPhysicalMaterial
              attach="material"
              metalness={1} // Adjust the metalness to control how metallic the material appears
              roughness={0.1} // Adjust the roughness to control how smooth or shiny the material appears
              map={node.material.map} // Use the texture map from the original material
              color={node.material.color} // Use the color from the original material
            />
          </mesh>
        );
      }
    }

    return meshComponents;
  };

  return <>{renderMeshComponents()}</>;
}