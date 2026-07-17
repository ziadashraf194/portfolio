import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './FloatingShapes.css';

const FloatingShapes = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const x1 = useTransform(smoothX, [-1, 1], [-60, 60]);
  const y1 = useTransform(smoothY, [-1, 1], [-60, 60]);
  
  const x2 = useTransform(smoothX, [-1, 1], [90, -90]);
  const y2 = useTransform(smoothY, [-1, 1], [90, -90]);
  
  const x3 = useTransform(smoothX, [-1, 1], [-120, 120]);
  const y3 = useTransform(smoothY, [-1, 1], [120, -120]);

  const x4 = useTransform(smoothX, [-1, 1], [+150, -50]);
  const y4 = useTransform(smoothY, [-1, 1], [-50, 50]);

  return (
    <div className="floating-shapes-container">
      {/* Curly Braces */}
      <motion.div style={{ x: x1, y: y1 }} className="floating-shape shape-pos-1">
        <div className="shape-inner shape-brackets">{'{ }'}</div>
      </motion.div>
      {/* Code Tags */}
      <motion.div style={{ x: x2, y: y2 }} className="floating-shape shape-pos-2">
        <div className="shape-inner shape-tags">{'</>'}</div>
      </motion.div>
      {/* Parentheses */}
      <motion.div style={{ x: x3, y: y3 }} className="floating-shape shape-pos-3">
        <div className="shape-inner shape-parentheses">{'cout << "Clean Code";'}</div>
      </motion.div>
      {/* Hash */}
      <motion.div style={{ x: x4, y: y4 }} className="floating-shape shape-pos-4">
        <div className="shape-inner shape-hash">{'console.log("hello world");'}</div>
      </motion.div>
      {/* Extra floating blur orb */}
      <motion.div style={{ x: x2, y: y1 }} className="floating-shape shape-pos-5">
        <div className="shape-orb" />
      </motion.div>
    </div>
  );
};

export default FloatingShapes;
