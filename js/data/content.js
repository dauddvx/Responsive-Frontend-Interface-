/**
 * content.js — Static Data: Projects & Testimonials
 * Responsive Frontend Interface
 */

'use strict';

export const projects = [
  {
    id: 1,
    title: 'Finance Dashboard UI',
    category: 'ui',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    emoji: '📊',
    desc: 'A responsive admin dashboard for tracking financial KPIs with real-time chart animations and dark mode.',
    longDesc: 'Built a full finance dashboard with animated data cards, line charts drawn using the Canvas API, and a responsive sidebar navigation. Implemented real-time number roll-up animations and a customizable theme system using CSS custom properties.',
    year: '2026',
    role: 'Frontend Developer',
    duration: '3 weeks',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 2,
    title: 'E-Commerce Product Page',
    category: 'web',
    tags: ['HTML5', 'CSS Grid', 'Vanilla JS'],
    emoji: '🛍️',
    desc: 'A pixel-perfect product detail page with an image gallery, variant selector, and cart interaction.',
    longDesc: 'Designed and implemented a fully interactive product page featuring a touch-enabled image carousel, color/size variant selectors with stock tracking, and a smooth cart drawer animation — all without any frameworks.',
    year: '2026',
    role: 'UI Engineer',
    duration: '2 weeks',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 3,
    title: 'Portfolio & Blog Site',
    category: 'web',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    emoji: '✍️',
    desc: 'A personal portfolio and blog with MDX-like rendering, tag filtering, and scroll-based animations.',
    longDesc: 'Built a lightweight static blog engine in pure JavaScript that renders Markdown-like content, supports tag-based filtering, and features a reading progress indicator. Optimized for Lighthouse 100 performance score.',
    year: '2025',
    role: 'Full-Stack Frontend',
    duration: '4 weeks',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 4,
    title: 'Task Management App',
    category: 'app',
    tags: ['JavaScript', 'LocalStorage', 'CSS3'],
    emoji: '✅',
    desc: 'A Kanban-style task board with drag-and-drop, local persistence, and keyboard shortcuts.',
    longDesc: 'Implemented a full Kanban board using the Drag and Drop API with multi-column support, task priority coloring, due date tracking, and offline persistence via localStorage. Fully keyboard accessible.',
    year: '2025',
    role: 'Frontend Developer',
    duration: '2 weeks',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 5,
    title: 'Weather App',
    category: 'app',
    tags: ['Fetch API', 'CSS Grid', 'Geolocation'],
    emoji: '🌤️',
    desc: 'A clean weather application using the Open-Meteo API with location detection and 7-day forecast.',
    longDesc: 'Consumed the Open-Meteo free weather API with async/await, implemented browser Geolocation for auto-detection, displayed animated weather icons based on WMO code, and built a 7-day forecast strip with temperature sparklines.',
    year: '2025',
    role: 'JavaScript Developer',
    duration: '1 week',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 6,
    title: 'CSS Art & Animation Gallery',
    category: 'ui',
    tags: ['CSS3', 'Animations', 'Keyframes'],
    emoji: '🎨',
    desc: 'A gallery of complex CSS-only animations, 3D card flips, morphing shapes, and SVG strokes.',
    longDesc: 'A creative showcase of advanced CSS capabilities: SVG stroke animations, 3D perspective card flips, morphing blob shapes using CSS clip-path, and a CSS-only modal system using the :target pseudo-class.',
    year: '2025',
    role: 'Creative Frontend',
    duration: '3 weeks',
    liveUrl: '#',
    codeUrl: '#',
  },
];

export const testimonials = [
  {
    id: 1,
    quote: 'Outstanding attention to detail and a natural talent for translating designs into pixel-perfect, performant code. One of the best interns I have mentored in five years.',
    name: 'Sarah Mitchell',
    role: 'Senior Frontend Engineer',
    company: 'TechVerse Ltd.',
    initials: 'SM',
    stars: 5,
  },
  {
    id: 2,
    quote: 'Delivered a fully responsive, accessible interface that scored 98 on Lighthouse — and did it using zero dependencies. Remarkable discipline and craft.',
    name: 'James Carter',
    role: 'CTO',
    company: 'Nexus Digital',
    initials: 'JC',
    stars: 5,
  },
  {
    id: 3,
    quote: 'The code quality was professional-grade. Clean architecture, thoughtful naming, and comprehensive comments. I would hire this developer full-time without hesitation.',
    name: 'Aisha Rahman',
    role: 'Lead UI/UX Designer',
    company: 'Pixel Studio',
    initials: 'AR',
    stars: 5,
  },
  {
    id: 4,
    quote: 'I was impressed by how the interface handled accessibility out of the box — ARIA roles, focus management, keyboard navigation all worked perfectly on first review.',
    name: 'Daniel Okonkwo',
    role: 'Accessibility Consultant',
    company: 'A11y Works',
    initials: 'DO',
    stars: 5,
  },
];

export const services = [
  {
    icon: '⚡',
    title: 'Performance Optimization',
    desc: 'Crafting interfaces that load in under 2 seconds with perfect Core Web Vitals scores using lazy loading, critical CSS, and efficient rendering.',
  },
  {
    icon: '📱',
    title: 'Responsive Design',
    desc: 'Mobile-first layouts that adapt beautifully across every device using fluid grids, clamp() typography, and modern CSS techniques.',
  },
  {
    icon: '♿',
    title: 'Accessibility (A11y)',
    desc: 'WCAG 2.1 AA compliant interfaces with proper ARIA roles, keyboard navigation, focus management, and screen reader support.',
  },
  {
    icon: '🎨',
    title: 'UI/UX Engineering',
    desc: 'Turning design mockups into living, breathing interfaces with micro-animations, smooth transitions, and delightful interactions.',
  },
  {
    icon: '🔧',
    title: 'Vanilla JavaScript',
    desc: 'Zero-dependency, modular JavaScript that is lightweight, maintainable, and framework-agnostic — built to last.',
  },
  {
    icon: '🌙',
    title: 'Design Systems',
    desc: 'Building scalable token-based design systems with CSS custom properties, enabling instant theming and consistent visual language.',
  },
];

export const stats = [
  { value: 12, suffix: '+', label: 'Projects Delivered' },
  { value: 98,  suffix: '',  label: 'Avg Lighthouse Score' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 0,   suffix: '',  label: 'Runtime Dependencies' },
];

export const skills = [
  'HTML5', 'CSS3', 'JavaScript (ES2023)',
  'CSS Grid', 'Flexbox', 'CSS Custom Properties',
  'Intersection Observer', 'Fetch API',
  'Web Animations API', 'localStorage',
  'ARIA & A11y', 'Performance',
  'Git & GitHub', 'Figma',
];
