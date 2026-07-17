import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import FloatingShapes from './FloatingShapes';
import './Skills.css';

const skills = [
  "React", "JavaScript", "TypeScript", 
  "Node.js", "Express", "MongoDB", "PostgreSQL", 
  "HTML5", "CSS3", "Framer Motion", "Git", "Figma",
  "Tailwind CSS", "Next.js", "GraphQL", "Docker",
  "C++", "Data Structures", "Algorithms", "OWASP Top 10"
];

const Skills = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="skills-section" id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
      <FloatingShapes />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-gradient">{t('skills.title')}</h2>
        </motion.div>

        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="skill-tag glass"
              whileHover={{ 
                scale: 1.1, 
                backgroundColor: 'var(--accent-blue)', 
                color: '#fff',
                y: -5,
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="skill-dot"></span>
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
