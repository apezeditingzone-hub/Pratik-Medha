import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Sparkles,
  ExternalLink,
  Github,
  Mail,
  Linkedin,
  Terminal,
  Cpu,
  Layers,
  ArrowUpRight,
  RotateCcw,
  Smartphone,
  ChevronDown,
} from 'lucide-react';

interface PortfolioProps {
  onReplayBoot?: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onReplayBoot }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'flutter' | 'web' | 'ai'>('all');
  const [contactStatus, setContactStatus] = useState<string | null>(null);

  const projects = [
    {
      id: 1,
      title: 'Nivora — Smart Lifestyle & Productivity',
      category: 'flutter',
      desc: 'An AI-enhanced productivity and lifestyle companion built with Flutter, featuring sleek dynamic theming, offline-first architecture, and local ML models.',
      tags: ['Flutter', 'Dart', 'Provider', 'Local ML', 'Hive DB'],
      link: '#',
      github: 'https://github.com',
      stats: '4.9 ★ Rating'
    },
    {
      id: 2,
      title: 'Lekamp Mobile Ecosystem',
      category: 'flutter',
      desc: 'Production-grade enterprise Flutter mobile applications built during internship at Lekamp, optimizing rendering pipelines and state synchronization.',
      tags: ['Flutter', 'Bloc', 'REST API', 'WebSockets', 'CI/CD'],
      link: '#',
      github: 'https://github.com',
      stats: 'Enterprise Production'
    },
    {
      id: 3,
      title: 'Nexus AI Holographic Dashboard',
      category: 'ai',
      desc: 'Real-time telemetry and 3D neural network visualizer using Three.js, React, and WebGL with responsive cyber HUD aesthetic.',
      tags: ['React', 'TypeScript', 'Three.js', 'Tailwind', 'WebGL'],
      link: '#',
      github: 'https://github.com',
      stats: '60 FPS 3D Engine'
    },
    {
      id: 4,
      title: 'Aura Creative Studio Suite',
      category: 'web',
      desc: 'High-performance interactive web experience with fluid particle simulations, GSAP kinematics, and customizable audio synthesis.',
      tags: ['Web Audio API', 'React', 'Framer Motion', 'Tailwind'],
      link: '#',
      github: 'https://github.com',
      stats: 'Awwwards Nominee'
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  const skills = [
    { name: 'Flutter & Dart', level: '95%', category: 'Mobile', icon: Smartphone },
    { name: 'React & TypeScript', level: '90%', category: 'Frontend', icon: Code2 },
    { name: 'Three.js & WebGL', level: '85%', category: '3D Graphics', icon: Cpu },
    { name: 'State Management (Bloc/Provider)', level: '92%', category: 'Architecture', icon: Layers },
    { name: 'Node.js & REST APIs', level: '88%', category: 'Backend', icon: Terminal },
    { name: 'UI/UX & Creative Tech', level: '94%', category: 'Design', icon: Sparkles }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('TRANSMISSION SENT // MESSAGE RECEIVED');
    setTimeout(() => setContactStatus(null), 4000);
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-white font-sans selection:bg-cyber-cyan selection:text-black relative">
      {/* Background Cyber Blueprint Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      {/* ============ NAVIGATION ============ */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-cyber-dark/80 backdrop-blur-lg border-b border-cyber-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded border border-cyber-cyan/50 bg-cyber-cyan/10 flex items-center justify-center font-display font-black text-cyber-cyan text-sm group-hover:shadow-[0_0_12px_#00f0ff] transition-all">
              PM
            </span>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider">PRATIK MEDHA</span>
              <span className="font-mono text-[9px] text-cyber-cyan tracking-widest">NEURAL.OS // ONLINE</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
            <a href="#about" className="text-gray-300 hover:text-cyber-cyan transition-colors">01. ABOUT</a>
            <a href="#work" className="text-gray-300 hover:text-cyber-cyan transition-colors">02. WORK</a>
            <a href="#skills" className="text-gray-300 hover:text-cyber-cyan transition-colors">03. SKILLS</a>
            <a href="#experience" className="text-gray-300 hover:text-cyber-cyan transition-colors">04. EXPERIENCE</a>
            <a href="#contact" className="text-gray-300 hover:text-cyber-cyan transition-colors">05. CONTACT</a>
          </nav>

          <div className="flex items-center gap-3">
            {onReplayBoot && (
              <button
                onClick={onReplayBoot}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyber-panel/80 border border-cyber-border text-xs font-mono text-cyber-cyan hover:bg-cyber-cyan/15 hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all"
                title="Replay AI Boot Sequence"
              >
                <RotateCcw size={13} />
                <span className="hidden sm:inline">REPLAY AI BOOT</span>
              </button>
            )}

            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded bg-cyber-cyan text-black font-mono font-bold text-xs hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              INITIALIZE CONTACT
            </a>
          </div>
        </div>
      </header>

      {/* ============ HERO SECTION ============ */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-24 pb-16 text-center relative max-w-5xl mx-auto">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-cyan/40 bg-cyber-panel/60 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
          <span className="font-mono text-xs tracking-widest text-cyber-cyan">
            SYSTEM BOOT COMPLETE // READY FOR COLLABORATION
          </span>
        </motion.div>

        {/* Intro Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-sm sm:text-base tracking-[0.3em] text-gray-400 mb-2"
        >
          HELLO, I'M
        </motion.div>

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white drop-shadow-[0_0_35px_rgba(0,240,255,0.3)] mb-4"
        >
          PRATIK MEDHA
        </motion.h1>

        {/* Role Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-sm sm:text-lg text-cyber-cyan mb-8"
        >
          <span className="bg-cyber-cyan/10 px-3 py-1 rounded border border-cyber-cyan/30">CREATIVE DEVELOPER</span>
          <span className="text-gray-500">•</span>
          <span className="bg-cyber-cyan/10 px-3 py-1 rounded border border-cyber-cyan/30">DESIGNER</span>
          <span className="text-gray-500">•</span>
          <span className="bg-cyber-cyan/10 px-3 py-1 rounded border border-cyber-cyan/30">BUILDER</span>
        </motion.div>

        {/* Brief Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl text-gray-300 text-sm sm:text-base leading-relaxed mb-10"
        >
          BSC-IT Technologist &amp; Flutter Developer Intern at <strong className="text-white">Lekamp</strong>. Architect of <strong className="text-cyber-cyan">Nivora</strong> and high-performance interactive digital experiences merging engineering precision with futuristic aesthetics.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#work"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyber-cyan text-black font-mono font-bold text-sm hover:bg-white hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] transition-all"
          >
            <span>VIEW MY WORK</span>
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#about"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyber-panel/80 border border-cyber-border text-white font-mono text-sm hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
          >
            <span>ABOUT ME</span>
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-transparent border border-gray-700 text-gray-300 font-mono text-sm hover:border-gray-400 hover:text-white transition-all"
          >
            <span>CONTACT</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] text-gray-400">
          <span>SCROLL FOR TELEMETRY</span>
          <ChevronDown size={14} className="animate-bounce text-cyber-cyan" />
        </div>
      </section>

      {/* ============ ABOUT SECTION ============ */}
      <section id="about" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto border-t border-cyber-border/30">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-cyber-cyan tracking-widest">01 //</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
            BIOMETRIC PROFILE &amp; PHILOSOPHY
          </h2>
          <div className="h-[1px] flex-1 bg-cyber-border/40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-cyber-panel/40 border border-cyber-border/50 rounded-xl p-6 sm:p-8 backdrop-blur-md">
            <h3 className="font-display font-semibold text-lg text-cyber-cyan mb-4 flex items-center gap-2">
              <Terminal size={18} />
              <span>CRAFTING THE NEXT GENERATION OF DIGITAL REALITY</span>
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
              I am a creative technologist focused on mobile applications, high-performance web systems, and interactive 3D interfaces. Currently pursuing BSC-IT while delivering production code as a Flutter Developer Intern at Lekamp.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              My engineering philosophy revolves around pixel-perfect design, zero-latency interactions, clean modular architecture (Bloc, Provider, Clean Architecture), and bringing futuristic sci-fi user experiences into everyday products.
            </p>
          </div>

          <div className="bg-cyber-panel/40 border border-cyber-border/50 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md font-mono text-xs">
            <div className="space-y-4">
              <div className="border-b border-cyber-border/30 pb-2">
                <span className="text-gray-400 block text-[10px]">CURRENT FOCUS</span>
                <span className="text-white font-bold">Cross-Platform Flutter &amp; 3D Web</span>
              </div>
              <div className="border-b border-cyber-border/30 pb-2">
                <span className="text-gray-400 block text-[10px]">LOCATION</span>
                <span className="text-white font-bold">Mumbai, India</span>
              </div>
              <div className="border-b border-cyber-border/30 pb-2">
                <span className="text-gray-400 block text-[10px]">STATUS</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Open for Opportunities
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-cyber-border/30 flex justify-between text-gray-400 text-[10px]">
              <span>ID: PM-2026-DEV</span>
              <span>CLEARANCE: LVL 9</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WORK / PROJECTS SECTION ============ */}
      <section id="work" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto border-t border-cyber-border/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cyber-cyan tracking-widest">02 //</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
              FEATURED TRANSMISSIONS &amp; PROJECTS
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 font-mono text-xs">
            {(['all', 'flutter', 'web', 'ai'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? 'bg-cyber-cyan text-black font-bold shadow-[0_0_10px_#00f0ff]'
                    : 'bg-cyber-panel/60 border border-cyber-border/50 text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="group bg-cyber-panel/50 border border-cyber-border/50 hover:border-cyber-cyan rounded-xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.18)] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-cyber-cyan uppercase tracking-widest px-2.5 py-1 rounded bg-cyber-cyan/10 border border-cyber-cyan/30">
                    {p.stats}
                  </span>
                  <div className="flex items-center gap-2 text-gray-400">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors"
                      title="Source Code"
                    >
                      <Github size={16} />
                    </a>
                    <a
                      href={p.link}
                      className="p-1.5 rounded hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors"
                      title="Live Deployment"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-cyber-cyan transition-colors mb-2.5">
                  {p.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {p.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-cyber-border/30">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-gray-300 bg-cyber-dark/80 px-2 py-0.5 rounded border border-cyber-border/40"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ SKILLS MATRIX ============ */}
      <section id="skills" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto border-t border-cyber-border/30">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-cyber-cyan tracking-widest">03 //</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
            TECHNICAL MATRIX &amp; CAPABILITIES
          </h2>
          <div className="h-[1px] flex-1 bg-cyber-border/40" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-cyber-panel/40 border border-cyber-border/50 rounded-lg p-5 backdrop-blur-md hover:border-cyber-cyan/80 transition-all hover:shadow-[0_0_18px_rgba(0,240,255,0.12)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan">
                      <Icon size={16} />
                    </div>
                    <span className="font-display font-semibold text-sm text-white">{s.name}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-cyber-cyan">{s.level}</span>
                </div>

                <div className="w-full bg-cyber-dark h-1.5 rounded-full overflow-hidden border border-cyber-border/40 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded-full shadow-[0_0_8px_#00f0ff]"
                    style={{ width: s.level }}
                  />
                </div>
                <span className="block font-mono text-[9px] text-gray-400 mt-2 tracking-widest uppercase">
                  CLASSIFICATION: {s.category}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ EXPERIENCE SECTION ============ */}
      <section id="experience" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto border-t border-cyber-border/30">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-cyber-cyan tracking-widest">04 //</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
            CHRONOLOGICAL LOGS &amp; EXPERIENCE
          </h2>
          <div className="h-[1px] flex-1 bg-cyber-border/40" />
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-cyber-border/40">
          <div className="relative pl-10">
            <span className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-cyber-cyan border-4 border-cyber-dark shadow-[0_0_10px_#00f0ff]" />
            <div className="bg-cyber-panel/40 border border-cyber-border/50 rounded-xl p-6 backdrop-blur-md">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-2 font-mono">
                <h3 className="font-display font-bold text-lg text-white">Flutter Developer Intern</h3>
                <span className="text-xs text-cyber-cyan">LEKAMP // 2024 — PRESENT</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Building scalable production mobile architectures, optimizing state management with Bloc, enhancing rendering smoothness, and integrating resilient WebSocket and REST API endpoints.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-gray-400">
                <span className="bg-cyber-dark px-2 py-0.5 rounded border border-cyber-border/40">Flutter 3.x</span>
                <span className="bg-cyber-dark px-2 py-0.5 rounded border border-cyber-border/40">Dart</span>
                <span className="bg-cyber-dark px-2 py-0.5 rounded border border-cyber-border/40">Bloc Architecture</span>
              </div>
            </div>
          </div>

          <div className="relative pl-10">
            <span className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-cyber-blue border-4 border-cyber-dark" />
            <div className="bg-cyber-panel/40 border border-cyber-border/50 rounded-xl p-6 backdrop-blur-md">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-2 font-mono">
                <h3 className="font-display font-bold text-lg text-white">Creator &amp; Lead Architect</h3>
                <span className="text-xs text-purple-400">NIVORA PROJECT // 2024 — 2026</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Engineered an end-to-end intelligent lifestyle assistant with modern UI components, custom reactive animation engines, and offline-first database synchronization.
              </p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-gray-400">
                <span className="bg-cyber-dark px-2 py-0.5 rounded border border-cyber-border/40">Product Design</span>
                <span className="bg-cyber-dark px-2 py-0.5 rounded border border-cyber-border/40">Provider</span>
                <span className="bg-cyber-dark px-2 py-0.5 rounded border border-cyber-border/40">Machine Learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <section id="contact" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto border-t border-cyber-border/30">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-cyber-cyan tracking-widest">05 //</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white">
            INITIALIZE QUANTUM LINK // CONTACT
          </h2>
          <div className="h-[1px] flex-1 bg-cyber-border/40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display font-bold text-2xl text-white mb-3">
              LET'S ENGINEER SOMETHING EXTRAORDINARY
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Whether you have a breakthrough project, a mobile app in need of architecture, or simply want to connect on creative technology, my inbox is always open.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <a
                href="mailto:contact@pratikmedha.dev"
                className="flex items-center gap-3 p-3 rounded-lg bg-cyber-panel/40 border border-cyber-border/40 hover:border-cyber-cyan text-gray-300 hover:text-white transition-all"
              >
                <Mail size={16} className="text-cyber-cyan" />
                <span>contact@pratikmedha.dev</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-cyber-panel/40 border border-cyber-border/40 hover:border-cyber-cyan text-gray-300 hover:text-white transition-all"
              >
                <Github size={16} className="text-cyber-cyan" />
                <span>github.com/pratikmedha</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-cyber-panel/40 border border-cyber-border/40 hover:border-cyber-cyan text-gray-300 hover:text-white transition-all"
              >
                <Linkedin size={16} className="text-cyber-cyan" />
                <span>linkedin.com/in/pratikmedha</span>
              </a>
            </div>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="bg-cyber-panel/40 border border-cyber-border/50 rounded-xl p-6 sm:p-7 backdrop-blur-md space-y-4"
          >
            <div>
              <label className="block font-mono text-[10px] text-gray-400 mb-1 tracking-wider uppercase">
                IDENTIFIER / YOUR NAME
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tony Stark / Sarah Connor"
                className="w-full bg-cyber-dark/90 border border-cyber-border/50 focus:border-cyber-cyan rounded-md px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-gray-400 mb-1 tracking-wider uppercase">
                COMM LINK / EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                placeholder="e.g. name@domain.com"
                className="w-full bg-cyber-dark/90 border border-cyber-border/50 focus:border-cyber-cyan rounded-md px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyber-cyan"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] text-gray-400 mb-1 tracking-wider uppercase">
                PAYLOAD / MESSAGE
              </label>
              <textarea
                rows={4}
                required
                placeholder="State project specifications, timeline, or inquiries..."
                className="w-full bg-cyber-dark/90 border border-cyber-border/50 focus:border-cyber-cyan rounded-md px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyber-cyan resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-cyber-cyan text-black font-mono font-bold text-xs hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] tracking-wider uppercase"
            >
              DISPATCH TRANSMISSION ↵
            </button>

            {contactStatus && (
              <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-center font-mono text-xs animate-fadeIn">
                {contactStatus}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-cyber-border/40 py-8 px-4 text-center font-mono text-xs text-gray-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} PRATIK MEDHA // ALL RIGHTS RESERVED</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-gray-400">NEURAL.OS v2.4 // 100% OPERATIONAL</span>
          </div>
          <a
            href="#hero"
            className="text-cyber-cyan hover:text-white transition-colors"
          >
            RETURN TO TOP ↑
          </a>
        </div>
      </footer>
    </div>
  );
};
