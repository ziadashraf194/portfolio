import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import ParticleNetwork from './ParticleNetwork';
import './CodeSection.css';

const codeSnippet = `const developer = {
  name: "Ziad Ashraf",
  role: "Security-Minded Developer",
  focus: ["Clean Architecture", "Data Structures", "OWASP Top 10"],
  academicRank: 2 // 2nd place at Faculty Level
};

async function deploySecureSystem(dev) {
  const isSecure = dev.focus.includes("OWASP Top 10");
  const hasStrongFundamentals = dev.academicRank <= 5;

  if (isSecure && hasStrongFundamentals) {
    return {
      status: "Success",
      performance: "100%",
      message: "Scalable application deployed safely."
    };
  }
  throw new Error("Security audit failed or logic optimization needed.");
}

// Result: Scalable application deployed safely.
deploySecureSystem(developer).then(console.log);`;

const CodeSection = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="code-section" id="code" style={{ position: 'relative', overflow: 'hidden' }}>
      <ParticleNetwork />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-gradient">{t('code.title')}</h2>
        </motion.div>

        <motion.div 
          className="code-editor-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="code-header">
            <div className="window-controls">
              <span className="control close"></span>
              <span className="control minimize"></span>
              <span className="control maximize"></span>
            </div>
            <div className="file-name">developer.js</div>
            <button className="copy-btn" onClick={handleCopy} aria-label="Copy Code">
              {copied ? <Check size={16} style={{ color: '#22c55e' }} /> : <Copy size={16} />}
            </button>
          </div>
          <div className="code-content">
            <pre>
              <code>{codeSnippet}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeSection;