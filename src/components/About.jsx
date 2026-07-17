import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User, Code2, Sparkles, MapPin } from 'lucide-react';
import './About.css';

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`spotlight-card ${className}`}
    >
      <div
        className="spotlight-gradient"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="about-section" id="about">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-gradient">{t('about.title')}</h2>
        </motion.div>

        <div className="about-bento-grid">
          {/* Main Content Card */}
          <motion.div 
            className="bento-main"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SpotlightCard className="glass h-full p-8 flex-col">
              <div className="bento-icon-wrapper mb-6">
                <Sparkles size={28} className="text-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('about.description1').split('.')[0]}.</h3>
              <p className="text-secondary leading-relaxed mb-4">
                {t('about.description1').split('.').slice(1).join('.')}
              </p>
              <p className="text-secondary leading-relaxed">
                {t('about.description2')}
              </p>
            </SpotlightCard>
          </motion.div>

          {/* Location/Info Card */}
          <motion.div 
            className="bento-info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SpotlightCard className="glass h-full p-6 flex-center text-center relative overflow-hidden">
              <MapPin size={40} className="mb-3 text-purple opacity-80" />
              <h4 className="font-bold text-lg mb-1">Based in</h4>
              <p className="text-secondary text-sm">Planet Earth</p>
              <div className="glow-orb"></div>
            </SpotlightCard>
          </motion.div>

          {/* Stats Card */}
          <motion.div 
            className="bento-stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SpotlightCard className="glass h-full p-6 flex-center text-center">
              <Code2 size={40} className="mb-3 text-blue opacity-80" />
              <h4 className="font-bold text-3xl mb-1">2+</h4>
              <p className="text-secondary text-sm">Years Experience</p>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
