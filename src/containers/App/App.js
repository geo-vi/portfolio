import React from "react";
import './App.css';
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function App() {
    const buttonVariants = {
        inactive: {scale: 0.75, rotate: 0},
        hovered: {scale: 1.0, rotate: 90},
    };

    return (
        <div className="App">
            <motion.div className={"App-main-container"}
                        initial="hidden"
                        animate="show">
                <motion.h1 className={"App-logo"}
                           initial={{y: -100, opacity: 0}}
                           animate={{y: 0, opacity: 1}}
                           transition={{
                               type: "spring",
                               stiffness: 260,
                               damping: 20
                           }}>George Ivanov
                </motion.h1>
                <motion.p className={"App-sub-header"}>geovi.dev</motion.p>
                <motion.p className={"App-construction-msg"}>Portfolio is under construction & coming soon, stay tuned! 👷 🏗️</motion.p>
            </motion.div>
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
                          href={"mailto:me@geovi.dev"}
                >
                    <FaEnvelope className={"App-footer-icon"}/>
                </motion.a>
            </motion.div>
        </div>
    );
}

export default App;
