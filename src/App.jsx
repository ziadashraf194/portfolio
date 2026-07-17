import { Suspense } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Awards from './components/Awards';
import Certificates from './components/Certificates';
import CodeSection from './components/CodeSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollAnimationWrapper from './components/ScrollAnimationWrapper';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Suspense fallback={<div className="loading-screen">Loading...</div>}>
      <div className="app-wrapper">
        <div className="bg-pattern"></div>
        <motion.div className="progress-bar" style={{ scaleX }} />
        <Navbar />
        <main>
          <Hero />
          
          <ScrollAnimationWrapper>
            <About />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper>
            <Skills />
          </ScrollAnimationWrapper>
          
          <ScrollAnimationWrapper>
            <Projects />
          </ScrollAnimationWrapper>
          
          {/* <ScrollAnimationWrapper>
            <Awards />
          </ScrollAnimationWrapper> */}
          
          <ScrollAnimationWrapper>
            <Certificates />
          </ScrollAnimationWrapper>
          
          {/* <ScrollAnimationWrapper>
            <CodeSection />
          </ScrollAnimationWrapper> */}
          
          <ScrollAnimationWrapper>
            <Contact />
          </ScrollAnimationWrapper>
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
