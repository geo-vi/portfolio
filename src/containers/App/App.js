import React, {useMemo, useRef, useState, Suspense, useLayoutEffect} from "react";
import './App.css';
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaEnvelope, FaMedium } from 'react-icons/fa';
import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import * as THREE from 'three'

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
                    <Suspense fallback={null}>
                        <Box position={[-1.2, 2, 0]} />
                        <Box position={[1.2, 2, 0]} />
                        <Label position={[-1, 0, 0]} />
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
