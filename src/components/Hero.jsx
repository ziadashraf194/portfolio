import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Terminal, Layers, Download, Code2, Coffee, ShieldAlert } from 'lucide-react';
import './Hero.css';

import { useState, useEffect } from 'react';

const TypewriterText = ({ texts, text, typingSpeed = 100, deletingSpeed = 50, delayBetween = 2000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const textArray = texts || (text ? [text] : []);
  const loop = !!texts;
  const textsString = JSON.stringify(textArray);

  useEffect(() => {
    setDisplayedText("");
    setIsDeleting(false);
    setLoopNum(0);
  }, [textsString]);

  useEffect(() => {
    if (textArray.length === 0) return;

    let timer;
    const currentText = textArray[loopNum % textArray.length];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText(currentText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(currentText.substring(0, displayedText.length + 1));
        if (displayedText.length === currentText.length) {
          if (loop) {
            timer = setTimeout(() => setIsDeleting(true), delayBetween);
          }
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, textsString, typingSpeed, deletingSpeed, delayBetween, loop, textArray]);

  const longestText = textArray.length > 0 
    ? textArray.reduce((a, b) => a.length > b.length ? a : b) 
    : "";

  return (
    <span style={{ display: 'inline-block', position: 'relative', verticalAlign: 'top' }}>
      <span style={{ visibility: 'hidden', whiteSpace: 'pre-wrap' }}>
        {longestText} <span style={{ marginLeft: '4px' }}>|</span>
      </span>
      <span style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, textAlign: 'inherit' }}>
        {displayedText}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="typing-cursor"
          style={{ color: 'var(--accent-blue)', marginLeft: '4px' }}
        >
          |
        </motion.span>
      </span>
    </span>
  );
};

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  // نصوص الـ Typewriter مخصصة لمهاراتك الحقيقية
  const titles = isArabic ? [
    "أنا زياد أشرف",
    "مطور ويب Full-Stack",
    "مهتم بحل المشكلات البرمجية"
  ] : [
    "Hi, I'm Ziad Ashraf",
    "Full-Stack Developer",
    "Security-Minded Developer",
    "Problem Solver"
  ];

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="badge glass"
          >
            <span className="badge-dot"></span>
            Available for work
          </motion.div>
          
          <h1 className="hero-title" style={{ minHeight: '1.2em' }}>
            <TypewriterText texts={titles} typingSpeed={120} deletingSpeed={60} delayBetween={2500} />
          </h1>
          <p className="hero-subtitle" style={{ minHeight: '1.5em' }}>
            <TypewriterText text={t('hero.subtitle')} typingSpeed={40} />
          </p>
          
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">{t('hero.cta')}</a>
            <a href="/public/cv.pdf" className="btn btn-outline" download>
              <Download size={18} />
              Download CV
            </a>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/ziadashraf194" className="social-icon" aria-label="Github" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/ziadd-ashraf/" className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            {/* <a href="https://leetcode.com/yourusername" className="social-icon text-icon" aria-label="LeetCode" target="_blank" rel="noopener noreferrer">
              <Code2 size={20} /> <span className="social-text">LeetCode</span>
            </a>
            <a href="https://codeforces.com/profile/yourusername" className="social-icon text-icon" aria-label="Codeforces" target="_blank" rel="noopener noreferrer">
              <Coffee size={20} /> <span className="social-text">Codeforces</span>
            </a> */}
          </div>
        </motion.div>

        <motion.div 
          className="hero-graphics"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="graphics-container">
            <div className="glow-circle"></div>
            
            {/* كود الـ Mockup هنا أصبح أكثر تعبيراً عن الـ Backend والـ Security */}
            <motion.div 
              className="ui-mockup main-mockup glass"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <div className="mockup-header">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="mockup-body">
                <div className="code-line"><span className="keyword">const</span> <span className="variable">user</span> = <span className="keyword">await</span> <span className="variable">db</span>.<span className="function">findUser</span>(<span className="string">'ziad'</span>);</div>
                <div className="code-line"><span className="keyword">if</span> (<span className="variable">user</span>.<span className="function">isSecured</span>() && <span className="variable">user</span>.<span className="function">isOptimized</span>()) &#123;</div>
                <div className="code-line indent"><span className="keyword">await</span> <span className="variable">app</span>.<span className="function">deploy</span>(&#123; <span className="property">safe</span>: <span className="boolean">true</span> &#125;);</div>
                <div className="code-line">&#125;</div>
                <div className="code-line empty"></div>
                <div className="code-line comment">// App deployed securely...</div>
              </div>
            </motion.div>

            {/* Widget 1: الـ Performance والـ Terminal */}
            <motion.div 
              className="ui-mockup widget-1 glass"
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <div className="widget-icon-box">
                <Terminal size={20} className="text-purple" />
              </div>
              <div className="widget-info">
                <div className="widget-title">Performance</div>
                <div className="widget-bar">
                  <div className="widget-progress" style={{width: '98%'}}></div>
                </div>
              </div>
            </motion.div>

            {/* Widget 2: الـ Security والـ Shield */}
            <motion.div 
              className="ui-mockup widget-2 glass"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="widget-icon-box blue-bg">
                {/* تم تعديله ليحمل أيقونة الـ Shield ليرمز للـ Security والـ Optimization */}
                <Layers size={20} className="text-blue" />
              </div>
              <div className="widget-info">
                <div className="widget-title">Security & Audit</div>
                <div className="widget-bar">
                  <div className="widget-progress blue-progress" style={{width: '100%'}}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Hero;