import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      "nav": {
        "about": "About",
        "skills": "Skills",
        "projects": "Projects",
        "awards": "Awards",
        "certificates": "Certificates",
        "code": "Code",
        "contact": "Contact"
      },
      "hero": {
        "greeting": "Hi, I'm Ziad",
        "subtitle": "Building secure, high-performance full-stack web applications with React, Node.js, and modern security practices.",
        "cta": "View My Work"
      },
      "about": {
        "title": "About Me",
        "description1": "I am a passionate Full-Stack Developer and CS student with 2+ years of hands-on experience building, securing, and deploying web applications. I specialize in crafting robust solutions using the React and Node.js ecosystem, with a sharp focus on clean architecture, backend reliability, and rigorous security standards like OWASP Top 10 mitigation.",
        "description2": "Driven by a strong competitive programming background, I approach software engineering with a meticulous problem-solving mindset. From winning tech competitions to building high-performance systems, I consistently strive to bridge deep computer science fundamentals with modern, scalable web technologies."
      },
      "skills": {
        "title": "My Skills"
      },
      "projects": {
        "title": "My Projects",
        "view_all": "View All",
        "demo": "Live Demo",
        "github": "GitHub",
        "github_frontend": "Frontend",
        "github_backend": "Backend"
      },
      "awards": {
        "title": "Awards"
      },
      "certificates": {
        "title": "Certificates"
      },
      "code": {
        "title": "Code Snippets"
      },
      "contact": {
        "title": "Contact Me",
        "subtitle": "",
        "name": "Name",
        "namePlaceholder": "Mohammed",
        "email": "Email",
        "emailPlaceholder": "mohammed@example.com",
        "message": "Message",
        "messagePlaceholder": "Your message here...",
        "send": "Send Message"
      },
      "footer": {
        "made_with": "Made with ❤️"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
