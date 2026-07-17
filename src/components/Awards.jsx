import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Award, Medal, Star } from 'lucide-react';
import './Awards.css';

const awardsData = [
  {
    id: 1,
    title: { en: "Best Innovative App", ar: "أفضل تطبيق مبتكر" },
    organization: { en: "Tech Innovators Summit 2025", ar: "قمة المبتكرين التقنيين 2025" },
    icon: <Star size={24} className="award-icon-svg" />
  },
  {
    id: 2,
    title: { en: "First Place - Hackathon", ar: "المركز الأول - هاكاثون" },
    organization: { en: "Global Codefest", ar: "مهرجان الكود العالمي" },
    icon: <Medal size={24} className="award-icon-svg" />
  },
  {
    id: 3,
    title: { en: "Outstanding UI/UX", ar: "تميز في تصميم واجهة المستخدم" },
    organization: { en: "Design Excellence Awards", ar: "جوائز التميز في التصميم" },
    icon: <Award size={24} className="award-icon-svg" />
  }
];

const Awards = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  return (
    <section className="awards-section" id="awards">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-gradient">{t('awards.title')}</h2>
        </motion.div>

        <div className="awards-grid">
          {awardsData.map((award, index) => (
            <motion.div 
              key={award.id} 
              className="award-card glass"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="award-icon-container">
                {award.icon}
              </div>
              <div className="award-content">
                <h3>{award.title[lang]}</h3>
                <p>{award.organization[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
