import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Code, Server } from 'lucide-react';
import FloatingShapes from './FloatingShapes';
import './Projects.css';

const projectsData = [
  {
    id: 1,
    title: { en: "Dreksion - Driving School Platform", ar: "دركسيون - منصة مدرسة القيادة" },
    description: {
      en: "An award-winning platform (IEEE competition winner) that digitizes driving school operations, combining smooth user schedules with high-performance administrative controls.",
    },
    tech: [ "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://ms.hsoubcdn.com/uploads/thumbnails/4775858/6a370a2717d3b/Screenshot-from-2026-06-21-00-39-16.png?s=small",
    demoLink: "", 
    githubBackend: "https://github.com/Rana-A-Badawy/DreksionBackend"
  },
  {
    id: 2,
    title: { en: "EduBridge Educational Platform"},
    description: {
      en: "A secure and scalable educational platform featuring dynamic course management, role-based access control (RBAC), and interactive teacher-student workflows.",
    },
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://ms.hsoubcdn.com/uploads/thumbnails/4775858/6a370bd03cd2d/Screenshot-from-2026-06-21-00-48-13.png?s=medium",
    demoLink: "",
    githubLink: "https://github.com/ziadashraf194/edubridge" 
  },
  {
    id: 3,
    title: { en: "Qena University Portal" },
    description: {
      en: "A robust registration portal designed to handle university admissions, optimized with strong server-side validation, rate limiting, and protection against web vulnerabilities.",
    },
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/nNSmFZVg/Screenshot-from-2026-07-17-13-35-23.png",
    demoLink: "",
    githubFrontend: "https://github.com/ziadashraf194/Qena_Frontend", 
    githubBackend: "https://github.com/ziadashraf194/Qena_Backend"
  },
  {
    id: 4,
    title: { en: "Secure E-Commerce Web App", ar: "متجر إلكتروني متكامل وآمن" },
    description: {
      en: "A production-ready e-commerce application featuring an optimized database model, advanced server-side search and pagination, secure authentication, and active API protection.",
      ar: "تطبيق متجر إلكتروني متكامل يتميز بنموذج قاعدة بيانات محسن، ونظام بحث وتصفح متقدم (Pagination) على السيرفر، مع حماية كاملة للمسارات والـ APIs ومكافحة الاختراقات."
    },
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "https://ms.hsoubcdn.com/uploads/portfolios/4775858/6a37078e3f2e3/1781027268560.jpg?response-content-disposition=inline%3B%20filename%3D&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJKI5LNJQTE2Z777Q%2F20260717%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20260717T102637Z&X-Amz-SignedHeaders=host&X-Amz-Expires=10&X-Amz-Signature=11972ed9aaf8752e351ee90d35a97413460c466358d69483bb9e06acd6189953",
    demoLink: "",
    githubFrontend: "https://github.com/ziadashraf194/ecommerce-frontend", 
    githubBackend: "https://github.com/ziadashraf194/ecommerce-backend"
  }
];

const Projects = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="projects-section" id="projects" style={{ position: 'relative', overflow: 'hidden' }}>
      <FloatingShapes />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-gradient">{t('projects.title')}</h2>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projectsData.map((project) => (
            <motion.div key={project.id} className="project-card glass" variants={itemVariants}>
              <div className="project-image-container">
                <img src={project.image} alt={project.title[lang]} className="project-image" />
                <div className="project-overlay">
                  {project.demoLink && project.demoLink !== "#" && (
                    <a href={project.demoLink} className="icon-link" aria-label={t('projects.demo')} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={20} />
                    </a>
                  )}
                  {project.githubFrontend && (
                    <a href={project.githubFrontend} className="source-link-pill" aria-label={t('projects.github_frontend')} title={t('projects.github_frontend')} target="_blank" rel="noopener noreferrer">
                      <Code size={18} />
                      <span>Frontend</span>
                    </a>
                  )}
                  {project.githubBackend && (
                    <a href={project.githubBackend} className="source-link-pill" aria-label={t('projects.github_backend')} title={t('projects.github_backend')} target="_blank" rel="noopener noreferrer">
                      <Server size={18} />
                      <span>Backend</span>
                    </a>
                  )}
                  {project.githubLink && !project.githubFrontend && !project.githubBackend && (
                    <a href={project.githubLink} className="icon-link" aria-label={t('projects.github')} title={t('projects.github')} target="_blank" rel="noopener noreferrer">
                      <Code size={20} />
                    </a>
                  )}
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title[lang]}</h3>
                <p>{project.description[lang]}</p>
                <div className="project-tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;