import React, {useMemo, useRef, useState, Suspense, useLayoutEffect} from "react";
import './App.css';
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaEnvelope, FaMedium } from 'react-icons/fa';
import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import * as THREE from 'three'
import {useGLTF, OrbitControls, PositionalAudio} from "@react-three/drei";

function Soundtrack(props) {
    return (<PositionalAudio autoplay url={process.env.PUBLIC_URL + "/mixkit-small-waves-harbor-rocks-1208.wav"} />)
}

function Island(props) {
    const { nodes, materials, animations } = useGLTF(process.env.PUBLIC_URL + "/beacon_FOR_scatchfab.glb", true);
    console.log(nodes, materials)
    return (
        <group scale={[0.4, 0.4, 0.4]} position={[0,-1,0]}>
            <group
                scale={nodes.Circle001.scale}
                position={nodes.Circle001.position}
            >
                <mesh
                    material={materials.red_mayak}
                    geometry={nodes.Circle002_1.geometry}
                />
                <mesh
                    material={materials.base_mayak}
                    geometry={nodes.Circle002.geometry}
                />
            </group>
            <group
                scale={nodes.Grid001.scale}
                position={nodes.Grid001.position}
            >
                <mesh
                    material={nodes.Grid001_1.material}
                    geometry={nodes.Grid001_1.geometry}
                />
                <mesh
                    material={nodes.Grid001_2.material}
                    geometry={nodes.Grid001_2.geometry}
                />
            </group>
            <mesh
                material={nodes.Grid.material}
                geometry={nodes.Grid.geometry}
                scale={nodes.Grid.scale}
                position={nodes.Grid.position}
            />
            <mesh
                material={nodes.Cube.material}
                geometry={nodes.Cube.geometry}
                scale={nodes.Cube.scale}
                position={nodes.Cube.position}
            />
            <mesh
                material={nodes.Cube001.material}
                geometry={nodes.Cube001.geometry}
                scale={nodes.Cube001.scale}
                position={nodes.Cube001.position}
            />
            <mesh
                material={nodes.Cube002.material}
                geometry={nodes.Cube002.geometry}
                scale={nodes.Cube002.scale}
                position={nodes.Cube002.position}
            />
            <mesh
                material={nodes.Cube003.material}
                geometry={nodes.Cube003.geometry}
                scale={nodes.Cube003.scale}
                position={nodes.Cube003.position}
            />
            <mesh
                material={nodes.Cube004.material}
                geometry={nodes.Cube004.geometry}
                scale={nodes.Cube004.scale}
                position={nodes.Cube004.position}
            />
            <mesh
                material={nodes.Cube005.material}
                geometry={nodes.Cube005.geometry}
                scale={nodes.Cube005.scale}
                position={nodes.Cube005.position}
            />
            <mesh
                material={nodes.Cube006.material}
                geometry={nodes.Cube006.geometry}
                scale={nodes.Cube006.scale}
                position={nodes.Cube006.position}
            />
            <mesh
                material={nodes.Cube007.material}
                geometry={nodes.Cube007.geometry}
                scale={nodes.Cube007.scale}
                position={nodes.Cube007.position}
            />
            <mesh
                material={nodes.Cube008.material}
                geometry={nodes.Cube008.geometry}
                scale={nodes.Cube008.scale}
                position={nodes.Cube008.position}
            />
            <mesh
                material={nodes.Cube009.material}
                geometry={nodes.Cube009.geometry}
                scale={nodes.Cube009.scale}
                position={nodes.Cube009.position}
            />
            <mesh
                material={nodes.Cube010.material}
                geometry={nodes.Cube010.geometry}
                scale={nodes.Cube010.scale}
                position={nodes.Cube010.position}
            />
            <mesh
                material={nodes.Cube011.material}
                geometry={nodes.Cube011.geometry}
                scale={nodes.Cube011.scale}
                position={nodes.Cube011.position}
            />
            <mesh
                material={nodes.Cube012.material}
                geometry={nodes.Cube012.geometry}
                scale={nodes.Cube012.scale}
                position={nodes.Cube012.position}
            />
            <mesh
                material={nodes.Cube012.material}
                geometry={nodes.Cube012.geometry}
                scale={nodes.Cube013.scale}
                position={nodes.Cube013.position}
            />
        </group>
    )
}

function Label(props) {
    const font = useLoader(THREE.FontLoader, process.env.PUBLIC_URL + '/droid_sans_regular.typeface.json')

    const mesh = useRef();

    useLayoutEffect(() => {
        const size = new THREE.Vector3()
        mesh.current.geometry.computeBoundingBox()
        mesh.current.geometry.boundingBox.getSize(size)
        mesh.current.position.x = -size.x / 2
        mesh.current.position.y = -size.y / 2
    }, [])

    const config = useMemo(
        () => ({ font, size: 2, height: 1 }),
        [font]
    )

    useFrame(({ clock }) => (mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.1))

    return (
            <mesh
                {...props}
                ref={mesh}
            >
                <textGeometry args={["Geovi's", config]} />
                <meshNormalMaterial attach="material" color="red"/>
            </mesh>
    )
}

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={(e) => setActive(!active)}
            onPointerOver={(e) => setHover(true)}
            onPointerOut={(e) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

function App() {
    const buttonVariants = {
        inactive: {scale: 0.75, rotate: 0},
        hovered: {scale: 1.0, rotate: 90},
    };

    return (
        <div className="App">
            <div className={"App-main-container"}>
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <OrbitControls />
                    <Suspense fallback={null}>
                        {/*<Box position={[-1.2, 2, 0]} />*/}
                        {/*<Box position={[1.2, 2, 0]} />*/}
                        {/*<Label position={[-1, 0, 0]} />*/}
                        <Island />
                        <Soundtrack />
                    </Suspense>
                </Canvas>
            </div>
            <motion.div className={"App-main-footer"}>
                <motion.a initial={"inactive"}
                          whileHover={"hovered"}
                          variants={buttonVariants}
                          href={"https://github.com/geo-vi"}
                >
                    <FaGithub className={"App-footer-icon"}/>
                </motion.a>
                <motion.a initial={"inactive"}
                          whileHover={"hovered"}
                          variants={buttonVariants}
                          href={"https://www.linkedin.com/in/g-ivanov/"}
                >
                    <FaLinkedin className={"App-footer-icon"}/>
                </motion.a>
                <motion.a initial={"inactive"}
                          whileHover={"hovered"}
                          variants={buttonVariants}
                          href={"https://geovi.medium.com"}
                >
                    <FaMedium className={"App-footer-icon"}/>
                </motion.a>
                <motion.a initial={"inactive"}
                          whileHover={"hovered"}
                          variants={buttonVariants}
                          href={"mailto:me@geovi.dev"}
                >
                    <FaEnvelope className={"App-footer-icon"}/>
                </motion.a>
            </motion.div>
        </div>
    );
}

export default App;
