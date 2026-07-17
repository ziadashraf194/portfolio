import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Award } from 'lucide-react';
import ParticleNetwork from './ParticleNetwork';
import './Certificates.css';

const certificatesData = [
  {
    id: 1,
    title: { 
      en: "2nd Place Academic Ranking - Faculty of Computers & AI", 
      ar: "المركز الثاني على مستوى الكلية - حاسبات وذكاء اصطناعي" 
    },
    issuer: { en: "South Valley National University", ar: "جامعة جنوب الوادي الأهلية" },
    date: "2026",
    link: "https://www.linkedin.com/posts/ziadd-ashraf_grateful-always-im-very-happy-to-have-share-7454901109220990976-YrhM/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF557M4B2Fwd4XiuCgo-ewNrcmkTbOtxLJQ",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQEbR2q2PAUFGA/feedshare-shrink_800/B4DZ3UhDY_KAAc-/0/1777386928955?e=1785974400&v=beta&t=0Hfsofs0OpChMbsnCT2hTWZ4e2hTWe99jODfGbbWTps" 
  },
  {
    id: 2,
    title: { 
      en: "Mathematics for Programmers Certification", 
      ar: "شهادة الرياضيات للمبرمجين" 
    },
    issuer: { en: "IT LEGEND"},
    date: "2026",
    link: "https://www.linkedin.com/posts/ziadd-ashraf_grateful-always-im-very-happy-to-have-share-7454901109220990976-YrhM/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF557M4B2Fwd4XiuCgo-ewNrcmkTbOtxLJQ",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQFqAGMSgvUCoQ/feedshare-shrink_480/B4DZ5Z9jbPKsAg-/0/1779625768899?e=1785974400&v=beta&t=aODJFSl4FVrwcvI1fRgf8WBX7LnkkeSHkPV1bXq8gGQ"
  },
  {
    id: 4,
    title: { 
      en: "Odoo Community Hero Award", 
      ar: "جائزة بطل مجتمع أودو (Community Hero)" 
    },
    issuer: { en: "Odoo", ar: "أودو" },
    date: "2024",
    link: "https://www.linkedin.com/in/ziadd-ashraf/",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
  }
];

const Certificates = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="certificates-section" id="certificates" style={{ position: 'relative', overflow: 'hidden' }}>
      <ParticleNetwork />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-gradient">{t('certificates.title')}</h2>
        </motion.div>

        <motion.div
          className="certificates-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {certificatesData.map((cert) => (
            <motion.a
              href={cert.link}
              key={cert.id}
              className="cert-card glass"
              variants={itemVariants}
              whileHover={{ scale: 1.05, translateY: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cert.image && (
                <div className="cert-image-wrapper">
                  <img src={cert.image} alt={cert.title[lang]} className="cert-image" />
                </div>
              )}
              <div className="cert-content">
                {!cert.image && (
                  <div className="cert-icon">
                    <Award size={32} />
                  </div>
                )}
                <div className="cert-info">
                  <h3>{cert.title[lang]}</h3>
                  <p className="cert-issuer">{cert.issuer[lang]}</p>
                  <span className="cert-date">{cert.date}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;