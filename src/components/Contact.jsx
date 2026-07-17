import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import ParticleNetwork from './ParticleNetwork';
import './Contact.css';
import { Phone } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const sendToTelegram = async (e) => {
  e.preventDefault();
  setIsSending(true);
  setSubmitStatus(null);

  const BOT_TOKEN = '8432497906:AAEJ1HeP_oKQ-8uaCFbHJcZBRZQQnicOBfA';
  const CHAT_ID = '7651215883';
  
  const telegramMessage = `
📩 *New Portfolio Message!*
👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
💬 *Message:* ${formData.message}
  `;

  const encodedText = encodeURIComponent(telegramMessage.trim());

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodedText}&parse_mode=Markdown`
    );

    if (response.ok) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setSubmitStatus('error');
    }
  } catch (error) {
    console.error('Telegram API Error:', error);
    setSubmitStatus('error');
  } finally {
    setIsSending(false);
  }
};

  return (
    <section className="contact-section" id="contact" style={{ position: 'relative', overflow: 'hidden' }}>
      <ParticleNetwork />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-gradient">{t('contact.title', 'Contact Me')}</h2>
          <p className="section-subtitle">{t('contact.subtitle', "Let's build something together")}</p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="info-card glass">
              <Mail className="info-icon" />
              <div>
                <h3>Email</h3>
                <p>ziad1942007@gmail.com</p> 
              </div>
            </div>
             <div className="info-card glass">
              <Phone className="info-icon" />
              <div>
                <h3>Phone</h3>
                <p>+2 01044332508</p> 
              </div>
            </div>

            <div className="info-card glass">
              <MapPin className="info-icon" />
              <div>
                <h3>Location</h3>
                <p>Qena, Egypt</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-container glass"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={sendToTelegram} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">{t('contact.name', 'Name')}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  placeholder={t('contact.namePlaceholder', 'John Doe')} 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">{t('contact.email', 'Email')}</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder={t('contact.emailPlaceholder', 'john@example.com')} 
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact.message', 'Message')}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  placeholder={t('contact.messagePlaceholder', 'Your message here...')}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary submit-btn" disabled={isSending}>
                {isSending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" style={{ marginRight: '8px' }} />
                    {t('contact.sending', 'Sending...')}
                  </>
                ) : (
                  <>
                    <Send size={18} style={{ marginRight: '8px' }} />
                    {t('contact.send', 'Send Message')}
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <p className="status-success" style={{ color: '#22c55e', marginTop: '15px', fontSize: '14px' }}>
                  ⚡ Message sent instantly to me!
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="status-error" style={{ color: '#ef4444', marginTop: '15px', fontSize: '14px' }}>
                  ✗ Failed to send message. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;