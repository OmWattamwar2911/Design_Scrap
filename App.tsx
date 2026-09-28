/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Server,
  Zap,
  Layers,
  Award,
  BookOpen,
  Briefcase,
  Terminal,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  FileText,
  Copy,
  Check,
  ArrowUpRight,
  Code2,
  Database,
  Cloud,
  Brain,
  ShieldAlert,
} from 'lucide-react';

import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ProjectCard from './components/ProjectCard';
import { SystemSimulator } from './components/SystemSimulator';
import { ResumeModal } from './components/ResumeModal';
import AIChat from './components/AIChat';
import { Project, Experience, Achievement } from './types';

// Om Suhas Wattamwar's Featured Projects with high-fidelity visual cards
const PROJECTS: Project[] = [
  {
    id: 'task-scheduler',
    title: 'Distributed Task Scheduler with Fault Tolerance',
    tagline: 'Go · gRPC · etcd · Docker · High Concurrency',
    period: 'Jan 2026 – Feb 2026',
    image: '/src/assets/images/project_scheduler_1790610741682.jpg',
    category: 'distributed-systems',
    interactiveType: 'scheduler',
    techStack: ['Go', 'gRPC', 'etcd', 'Docker', 'Raft Consensus', 'Concurrency'],
    metrics: [
      { label: 'Concurrent Tasks', value: '500+' },
      { label: 'Uptime SLA', value: '99.5%' },
      { label: 'Throughput', value: '+40%' },
    ],
    summary:
      'Architected a production-grade distributed task scheduling cluster in Go with etcd-based distributed leader election, sustaining 500+ concurrent task executions across multiple worker nodes at 99.5% completion under simulated node crashes.',
    bulletPoints: [
      'Architected a fault-tolerant task scheduling system in Go with etcd-based leader election, sustaining 500+ concurrent task executions across multiple worker nodes at a 99.5% completion rate under simulated node failures.',
      'Engineered thread-safe task queues using mutex-based synchronization and atomic operations, eliminating race conditions and improving task throughput by 40% under high-concurrency load.',
      'Integrated distributed lease renewal mechanisms to detect node heartbeats and trigger sub-100ms failover re-elections.',
    ],
    architectureHighlights: [
      {
        title: 'etcd Distributed Leader Election',
        desc: 'Utilizes etcd v3 transactional key-value leases to maintain cluster leadership with automatic failover in ~80ms upon node disconnection.',
      },
      {
        title: 'Lock-Free & Mutex-Synchronized Task Queues',
        desc: 'Engineered safe high-throughput task queues handling thousands of operations without goroutine leaks or thread deadlocks.',
      },
    ],
  },
  {
    id: 'semantic-search',
    title: 'AI-Integrated Semantic Search Engine',
    tagline: 'Python (FastAPI) · Kafka · Elasticsearch · GCP · Vector Embeddings',
    period: 'Nov 2025 – Dec 2025',
    image: '/src/assets/images/project_search_engine_1790610755119.jpg',
    category: 'ai-search',
    interactiveType: 'search',
    techStack: ['Python', 'FastAPI', 'Kafka', 'Elasticsearch', 'GCP', 'Vector Search', 'ML Reranker'],
    metrics: [
      { label: 'Query Latency', value: '120ms' },
      { label: 'Documents', value: '1M+' },
      { label: 'Ingestion', value: '10k/sec' },
    ],
    summary:
      'Built a vector embedding-based semantic search pipeline on GCP processing 1M+ documents, reducing query latency from 800ms to 120ms (85% improvement) with real-time Kafka stream ingestion sustaining 10,000+ events/sec.',
    bulletPoints: [
      'Built a vector embedding-based semantic search pipeline on GCP processing 1M+ documents, reducing query latency from 800ms to 120ms (85% improvement) via an optimized inverted index architecture.',
      'Developed a real-time data ingestion pipeline with Kafka sustaining 10,000+ events/sec, integrating an ML reranking model that improved top-5 search result accuracy by 25%.',
      'Modeled and deployed a scalable, AI-driven, end-to-end system spanning ingestion, indexing, and retrieval, applying multi-node systems and data structures principles to handle production-scale data and traffic.',
    ],
    architectureHighlights: [
      {
        title: 'Optimized Inverted Index + Vectors',
        desc: 'Combines dense vector dot-product similarity with high-speed sparse inverted indexing to accelerate document retrieval from 800ms down to 120ms.',
      },
      {
        title: 'Kafka Stream Processing',
        desc: 'Partitioned Kafka message queues buffering high-volume real-time feeds at 10,000+ events per second without dropping messages.',
      },
    ],
  },
  {
    id: 'decentralized-systems',
    title: 'Decentralized System Architectures',
    tagline: 'AlgoUniversity ATF · Go · Redis · Consistent Hashing · Scalability',
    period: 'Jan 2026 – Jun 2026',
    image: '/src/assets/images/experience_algouniversity_1790610768648.jpg',
    category: 'distributed-systems',
    techStack: ['Go', 'Redis', 'Consistent Hashing', 'gRPC', 'Distributed Caching', 'System Design'],
    metrics: [
      { label: 'Fellowship', value: 'Top 0.2%' },
      { label: 'Systems', value: '3 Scaled' },
      { label: 'Traffic', value: 'Millions/day' },
    ],
    summary:
      'Engineered comprehensive architectural blueprints and prototypes for 3 decentralized systems (URL shortener, decentralized cache cluster, and real-time messaging service) built to handle millions of daily requests.',
    bulletPoints: [
      'Designed system architecture documents for 3 decentralized systems (URL shortener, decentralized cache cluster, real-time messaging service) engineered to handle millions of daily requests.',
      'Addressed core scalability, fault tolerance, replication, and synchronization tradeoffs with consistent hashing and distributed key-value rings.',
      'Solved 300+ rigorous data structure and algorithm problems across arrays, graphs, dynamic programming, and concurrency, ranking in the top tier of timed assessments benchmarked against IIT/NIT peers.',
    ],
    architectureHighlights: [
      {
        title: 'Decentralized Cache Cluster',
        desc: 'Implemented consistent hashing ring with virtual nodes to minimize re-hashing overhead and distribute memory evenly across cache shards.',
      },
      {
        title: 'Real-Time Messaging Sync',
        desc: 'Designed ordered packet synchronization with operational transformation principles and low-latency WebSocket / gRPC multiplexing.',
      },
    ],
  },
  {
    id: 'kanishka-platform',
    title: 'Scalable Real Estate Full-Stack Platform',
    tagline: 'React.js · Node.js · Express.js · MongoDB · CI/CD Automation',
    period: 'May 2025 – Jul 2025',
    image: '/src/assets/images/experience_kanishka_1790610785471.jpg',
    category: 'full-stack',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'GitHub Actions', 'CI/CD'],
    metrics: [
      { label: 'Latency Cut', value: '40%' },
      { label: 'Query Speed', value: '3× Faster' },
      { label: 'Release Time', value: '-60%' },
    ],
    summary:
      'Built and deployed a full-stack real estate platform with 15+ secured REST API routes using JWT authentication and role-based access control, supporting 200+ active users across 500+ property listings.',
    bulletPoints: [
      'Built and deployed a full-stack real estate platform (React.js, Node.js, Express.js, MongoDB) with 15+ secured REST API routes using JWT authentication and role-based access control, supporting 200+ active users across 500+ property listings.',
      'Reduced search latency by 40% and increased query throughput 3× by designing indexed MongoDB queries for high-traffic endpoints.',
      'Automated deployment workflows by implementing a CI/CD pipeline with GitHub Actions, cutting manual release time by 60% and improving engineering velocity.',
    ],
    architectureHighlights: [
      {
        title: 'Compound Indexing & Query Caching',
        desc: 'Restructured multi-criteria property search queries with compound B-tree indexing in MongoDB, achieving a 40% latency reduction under traffic spikes.',
      },
      {
        title: 'Continuous Delivery Workflow',
        desc: 'Set up GitHub Actions pipelines for automated test execution, linting, and zero-downtime production deployment.',
      },
    ],
  },
];

// Experiences
const EXPERIENCES: Experience[] = [
  {
    id: 'atf',
    company: 'AlgoUniversity Tech Fellowship (ATF)',
    role: 'Software Engineering Fellow',
    track: 'Elite Mentorship Track · Top 0.2% Globally',
    period: 'Jan 2026 – Jun 2026',
    location: 'Remote',
    image: '/src/assets/images/experience_algouniversity_1790610768648.jpg',
    highlightMetric: 'Top 0.2% of 100,000+ applicants (1 of 200 fellows)',
    technologies: ['Distributed Systems', 'Go', 'Consistent Hashing', 'System Design', 'Concurrency', 'Algorithms'],
    bullets: [
      'Solved 300+ data structure and algorithm problems across arrays, graphs, DP, and concurrency, ranking in the top tier of timed assessments benchmarked against IIT/NIT peers.',
      'Designed system architecture documents for 3 decentralized systems (URL shortener, decentralized cache cluster, real-time messaging service) engineered to handle millions of daily requests, addressing scalability, fault tolerance, and synchronization tradeoffs.',
      'Engaged in deep-dive mentorship on low-level distributed primitives, network partition tolerance (CAP theorem), and consensus mechanisms.',
    ],
  },
  {
    id: 'kanishka',
    company: 'Kanishka Properties',
    role: 'Software Engineering Intern',
    track: 'Full-Stack Web Development',
    period: 'May 2025 – Jul 2025',
    location: 'Aurangabad, India',
    image: '/src/assets/images/experience_kanishka_1790610785471.jpg',
    highlightMetric: '3× Query Throughput & -60% Release Time',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'GitHub Actions', 'REST APIs'],
    bullets: [
      'Built and deployed a full-stack real estate platform (React.js, Node.js, Express.js, MongoDB) with 15+ secured REST API routes using JWT authentication and role-based access control, supporting 200+ active users across 500+ property listings.',
      'Reduced search latency by 40% and increased query throughput 3× by designing indexed MongoDB queries for high-traffic endpoints.',
      'Automated deployment workflows by implementing a CI/CD pipeline with GitHub Actions, cutting manual release time by 60% and improving engineering velocity.',
    ],
  },
];

// Achievements
const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'atf-fellowship',
    title: 'AlgoUniversity Tech Fellowship (ATF)',
    highlight: 'Top 0.2% Worldwide',
    organization: 'AlgoUniversity',
    description: 'Selected in top 0.2% of 100,000+ global applicants; 1 of 200 fellows selected worldwide for elite software engineering mentorship in systems & algorithms.',
    iconType: 'award',
  },
  {
    id: 'deans-list',
    title: 'Dean’s List for Academic Excellence',
    highlight: 'SGPA 9.0+ Both Semesters',
    organization: 'Manipal University Jaipur',
    description: 'Recognized for academic excellence with SGPA 9.0+ each semester, placing in the top percentile of the Computer Science & Engineering cohort.',
    iconType: 'trophy',
  },
  {
    id: 'dsa-competitive',
    title: '300+ Advanced Problems Solved',
    highlight: 'Top Tier in Timed Benchmarks',
    organization: 'Competitive Programming & Systems',
    description: 'Mastered 300+ rigorous problems across arrays, graphs, dynamic programming, and concurrency, benchmarked against top-tier national peers.',
    iconType: 'star',
  },
];

// Skills Data
const SKILL_CATEGORIES = [
  {
    category: 'Languages',
    skills: ['Go', 'Python', 'C/C++', 'Java', 'JavaScript/TypeScript', 'Rust', 'HTML5/CSS3'],
    icon: Code2,
  },
  {
    category: 'Backend & Systems Architecture',
    skills: ['gRPC', 'Kafka', 'Redis', 'Node.js', 'Express.js', 'REST APIs', 'Socket.io', 'JWT', 'LLVM', 'Compiler Design', 'HDL'],
    icon: Server,
  },
  {
    category: 'Frontend & Full-Stack',
    skills: ['React.js', 'Redux Toolkit', 'Next.js', 'WebSockets', 'Operational Transformation', 'Tailwind CSS'],
    icon: Layers,
  },
  {
    category: 'Databases & Storage',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Consistent Hashing', 'Indexing & Query Optimization'],
    icon: Database,
  },
  {
    category: 'AI / ML & Cloud',
    skills: ['PyTorch', 'scikit-learn', 'NumPy', 'Pandas', 'LLM APIs & Agents', 'Generative AI', 'TF-IDF', 'GCP', 'AWS (EC2, S3)', 'Docker', 'Kubernetes'],
    icon: Brain,
  },
  {
    category: 'CS Fundamentals & Concurrency',
    skills: ['System Design', 'Microservices', 'Data Structures & Algorithms', 'Concurrency / Multi-threading', 'Mutex Synchronization', 'OOP', 'Debugging'],
    icon: Cpu,
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('All');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Keyboard navigation for project modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'ArrowLeft') navigateProject('prev');
      if (e.key === 'ArrowRight') navigateProject('next');
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % PROJECTS.length;
    } else {
      nextIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    }
    setSelectedProject(PROJECTS[nextIndex]);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('omwattamwar123@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactMessage.trim()) return;

    setMessageStatus('sending');
    setTimeout(() => {
      setMessageStatus('sent');
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 1200);
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />

      {/* Navigation - Lumina 3-Zone Contract */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 bg-[#17183e]/80 backdrop-blur-xl border-b border-white/10">
        {/* Zone 1: Wordmark */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-heading text-lg md:text-xl font-bold tracking-tighter text-white cursor-pointer select-none flex items-center gap-2"
          data-hover="true"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#a8fbd3] animate-pulse" />
          <span>OM WATTAMWAR</span>
        </div>

        {/* Zone 2: Clean Text Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-mono font-medium uppercase tracking-widest text-gray-300">
          {[
            { label: 'Projects', id: 'projects' },
            { label: 'Systems Lab', id: 'systems-lab' },
            { label: 'Experience', id: 'experience' },
            { label: 'Skills', id: 'skills' },
            { label: 'Education', id: 'education' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-[#a8fbd3] transition-colors cursor-pointer bg-transparent border-none text-gray-300"
              data-hover="true"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Zone 3: Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setResumeModalOpen(true)}
            className="flex items-center gap-2 border border-white/30 px-5 py-2.5 text-xs font-mono font-bold tracking-wider uppercase text-white hover:bg-white hover:text-black transition-all duration-300 rounded cursor-pointer bg-transparent"
            data-hover="true"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-[#4fb7b3] to-[#637ab9] px-5 py-2.5 text-xs font-mono font-bold tracking-wider uppercase text-white hover:opacity-90 transition-all rounded cursor-pointer shadow-lg shadow-[#4fb7b3]/20"
            data-hover="true"
          >
            Get In Touch
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white z-50 p-2 rounded-lg bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#16173a]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 lg:hidden px-6"
          >
            {[
              { label: 'Projects', id: 'projects' },
              { label: 'Systems Lab', id: 'systems-lab' },
              { label: 'Experience', id: 'experience' },
              { label: 'Skills', id: 'skills' },
              { label: 'Education', id: 'education' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none"
              >
                {item.label}
              </button>
            ))}

            <div className="flex flex-col gap-3 w-full max-w-xs mt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setResumeModalOpen(true);
                }}
                className="w-full border border-white py-3 text-xs font-mono font-bold uppercase tracking-widest text-center bg-white text-black"
              >
                View Resume
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-[#4fb7b3] py-3 text-xs font-mono font-bold uppercase tracking-widest text-center text-black"
              >
                Get In Touch
              </button>
            </div>

            <div className="absolute bottom-8 flex gap-6 text-sm text-gray-400 font-mono">
              <a href="https://github.com/OmWattamwar2911" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                GitHub
              </a>
              <span>·</span>
              <a href="https://www.linkedin.com/in/om-wattamwar-430537314/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-20">
        <motion.div style={{ y, opacity }} className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-16">
          {/* Status Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2.5 text-xs md:text-sm font-mono text-[#a8fbd3] tracking-[0.2em] uppercase mb-6 bg-black/40 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#a8fbd3] animate-pulse" />
            <span>Distributed Systems & Concurrency Engineer</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline text-gray-300">Pune, India</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center">
            <GradientText
              text="OM SUHAS WATTAMWAR"
              as="h1"
              className="text-[9vw] sm:text-[8vw] lg:text-[6.5vw] leading-[0.95] font-black tracking-tighter text-center uppercase"
            />
            {/* Ambient Glow */}
            <motion.div
              className="absolute -z-20 w-[45vw] h-[45vw] bg-[#4fb7b3]/15 blur-[50px] rounded-full pointer-events-none will-change-transform"
              animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 7, repeat: Infinity }}
              style={{ transform: 'translateZ(0)' }}
            />
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'circOut' }}
            className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-[#a8fbd3]/60 to-transparent mt-5 mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl font-light max-w-3xl mx-auto text-gray-200 leading-relaxed px-4"
          >
            Penultimate-year CS undergraduate at{' '}
            <span className="text-white font-medium">Manipal University Jaipur</span> (CGPA 9.0/10.0) &{' '}
            <span className="text-[#a8fbd3] font-medium">AlgoUniversity Tech Fellow</span> (Top 0.2%). Architecting fault-tolerant
            task schedulers, low-latency Kafka retrieval pipelines, and high-concurrency systems in Go, Python, and C/C++.
          </motion.p>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="px-7 py-3 rounded bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#a8fbd3] transition-all cursor-pointer shadow-xl"
              data-hover="true"
            >
              Explore Featured Projects
            </button>
            <button
              onClick={() => scrollToSection('systems-lab')}
              className="px-7 py-3 rounded border border-[#4fb7b3] text-[#a8fbd3] font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#4fb7b3]/20 transition-all cursor-pointer backdrop-blur-sm"
              data-hover="true"
            >
              Interactive Systems Lab
            </button>
            <button
              onClick={() => setResumeModalOpen(true)}
              className="px-6 py-3 rounded border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2"
              data-hover="true"
            >
              <FileText className="w-3.5 h-3.5 text-[#a8fbd3]" />
              Resume View
            </button>
          </motion.div>

          {/* Proof Metrics Strip - Tabular Numerals, Unboxed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-12 pt-8 border-t border-white/10 w-full max-w-4xl"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-white tabular-nums">9.0 / 10</div>
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mt-1">B.Tech CSE (MUJ)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-[#a8fbd3] tabular-nums">Top 0.2%</div>
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mt-1">AlgoUniversity Fellow</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-white tabular-nums">500+</div>
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mt-1">Concurrent Task Workers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-[#4fb7b3] tabular-nums">10,000+</div>
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mt-1">Events/Sec Kafka Pipeline</div>
            </div>
          </motion.div>
        </motion.div>

        {/* MARQUEE RIBBON - Lumina's signature aesthetic */}
        <div className="w-full py-4 bg-white text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(255,255,255,0.4)] mt-auto">
          <motion.div
            className="flex w-fit will-change-transform"
            animate={{ x: '-50%' }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="text-2xl md:text-5xl font-heading font-black px-6 flex items-center gap-4">
                    OM SUHAS WATTAMWAR <span className="text-black text-xl md:text-3xl">●</span>
                    DISTRIBUTED SYSTEMS <span className="text-black text-xl md:text-3xl">●</span>
                    CONCURRENCY IN GO <span className="text-black text-xl md:text-3xl">●</span>
                    TOP 0.2% ATF FELLOW <span className="text-black text-xl md:text-3xl">●</span>
                    KAFKA & ETCD <span className="text-black text-xl md:text-3xl">●</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* FEATURED PROJECTS SECTION */}
      <section id="projects" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 px-4 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a8fbd3] block mb-2">
                Engineering Showcase
              </span>
              <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase leading-[0.95]">
                Featured <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">
                  Systems & Projects
                </span>
              </h2>
            </div>
            <p className="text-sm font-mono text-gray-400 max-w-md">
              High-concurrency schedulers, vector embedding retrieval pipelines, and decentralized systems. Click any card to inspect
              architecture diagrams and implementation details.
            </p>
          </div>

          {/* Lumina Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 border-t border-l border-white/10 bg-black/30 backdrop-blur-md">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE SYSTEMS LAB */}
      <section id="systems-lab" className="relative z-10 py-20 md:py-32 bg-black/30 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a8fbd3] block mb-2">
              Interactive Execution Sandbox
            </span>
            <h2 className="text-3xl md:text-6xl font-heading font-bold uppercase text-white mb-4">
              Architecture <GradientText text="LAB" className="text-3xl md:text-6xl" />
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-light">
              Experience Om's code in action. Trigger a node failure in the Go etcd cluster to test fault-tolerant Raft re-election,
              or benchmark the sub-120ms AI semantic search engine on 1M documents.
            </p>
          </div>

          <SystemSimulator />
        </div>
      </section>

      {/* EXPERIENCE & MENTORSHIP TIMELINE */}
      <section id="experience" className="relative z-10 py-20 md:py-32 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a8fbd3] block mb-2">
              Career Trajectory
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase text-white">
              Professional <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">
                Experience
              </span>
            </h2>
          </div>

          <div className="space-y-8">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="relative p-8 md:p-10 rounded-2xl bg-[#141535]/80 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-[#4fb7b3]/40 shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-lg bg-[#4fb7b3]/20 text-[#a8fbd3] border border-[#4fb7b3]/30">
                        <Briefcase className="w-5 h-5" />
                      </span>
                      <div>
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-white uppercase">{exp.company}</h3>
                        <p className="text-xs font-mono text-[#a8fbd3] uppercase tracking-wider mt-0.5">
                          {exp.role} {exp.track && `· ${exp.track}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:items-end text-xs font-mono text-gray-400">
                    <span className="text-white font-bold">{exp.period}</span>
                    <span className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#4fb7b3]" /> {exp.location}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-8 space-y-3">
                    {exp.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-gray-200 leading-relaxed">
                        <span className="text-[#a8fbd3] font-bold mt-1 select-none">›</span>
                        <p>{bullet}</p>
                      </div>
                    ))}
                  </div>

                  <div className="lg:col-span-4 bg-black/40 p-4 rounded-xl border border-white/5 space-y-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
                        Key Metric
                      </span>
                      <span className="text-xs font-mono font-bold text-[#a8fbd3] block">
                        {exp.highlightMetric}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-2">
                        Technologies
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono bg-white/5 text-gray-300 px-2 py-0.5 rounded border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL SKILLS MATRIX */}
      <section id="skills" className="relative z-10 py-20 md:py-32 bg-black/30 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a8fbd3] block mb-2">
                Technical Stack & Domains
              </span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase text-white">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3]">
                  Arsenal
                </span>
              </h2>
            </div>
            <p className="text-xs md:text-sm font-mono text-gray-400 max-w-sm">
              Proficiencies spanned across low-level distributed primitives, high-concurrency runtimes, and full-stack delivery.
            </p>
          </div>

          {/* Skill Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, i) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#141537]/80 border border-white/10 hover:border-[#4fb7b3]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#4fb7b3]/40 group-hover:text-[#a8fbd3] transition-colors">
                        <IconComp className="w-5 h-5 text-gray-300 group-hover:text-[#a8fbd3]" />
                      </div>
                      <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                        {cat.category}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono px-2.5 py-1 rounded bg-black/40 text-gray-300 border border-white/5 group-hover:border-white/10 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EDUCATION & ACHIEVEMENTS */}
      <section id="education" className="relative z-10 py-20 md:py-32 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Education Card */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a8fbd3] block mb-2">
                  Academic Foundation
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-white mb-6">
                  Education
                </h2>
              </div>

              <div className="p-8 rounded-2xl bg-[#141538]/90 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <BookOpen className="w-32 h-32 text-white" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#a8fbd3]/20 text-[#a8fbd3] border border-[#a8fbd3]/40 font-bold">
                      CGPA: 9.0 / 10.0
                    </span>
                    <span className="text-xs font-mono text-gray-400">Jun 2024 – May 2028</span>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-white uppercase">Manipal University Jaipur</h3>
                  <p className="text-sm font-mono text-[#4fb7b3] uppercase tracking-wider">
                    Bachelor of Technology — Computer Science and Engineering
                  </p>
                  <p className="text-xs font-mono text-gray-400">Jaipur, Rajasthan, India</p>

                  <div className="pt-4 border-t border-white/10">
                    <span className="text-xs font-mono text-gray-400 block mb-2 uppercase tracking-wider">
                      Relevant Coursework:
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-gray-300">
                      {[
                        'Data Structures & Algorithms',
                        'Distributed Systems',
                        'Operating Systems',
                        'Computer Networks',
                        'DBMS',
                        'Compiler Design',
                        'Cloud Computing',
                        'AI & Machine Learning',
                      ].map((course, idx) => (
                        <span key={idx} className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Honors & Achievements */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a8fbd3] block mb-2">
                  Recognitions
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-white mb-6">
                  Honors & Awards
                </h2>
              </div>

              <div className="space-y-4">
                {ACHIEVEMENTS.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a8fbd3]/40 transition-all flex items-start gap-4"
                  >
                    <div className="p-3 rounded-xl bg-gradient-to-tr from-[#4fb7b3]/20 to-[#637ab9]/20 border border-[#4fb7b3]/40 text-[#a8fbd3] shrink-0 mt-1">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4 className="font-heading font-bold text-white text-base uppercase">{ach.title}</h4>
                        <span className="text-xs font-mono text-[#a8fbd3] font-bold">{ach.highlight}</span>
                      </div>
                      <span className="text-xs font-mono text-gray-400 block mb-2">{ach.organization}</span>
                      <p className="text-xs text-gray-300 leading-relaxed">{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CONNECT SECTION */}
      <section id="contact" className="relative z-10 py-20 md:py-32 px-4 md:px-8 bg-black/40 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#a8fbd3] block mb-2">
              Start a Conversation
            </span>
            <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase text-white mb-4">
              Get In <GradientText text="TOUCH" className="text-4xl md:text-7xl" />
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-light max-w-xl mx-auto">
              Currently open to Software Engineering opportunities in Distributed Systems, Backend Architecture, and High-Concurrency
              Engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Direct Connect Details */}
            <div className="lg:col-span-5 p-8 rounded-2xl bg-[#141535]/80 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-white uppercase mb-6">Contact Coordinates</h3>

                <div className="space-y-5 text-xs font-mono">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-[#a8fbd3]" />
                      <span className="text-white truncate max-w-[190px]">omwattamwar123@gmail.com</span>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy Email"
                      data-hover="true"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-[#a8fbd3]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Phone className="w-4 h-4 text-[#4fb7b3]" />
                    <span className="text-white">+91-8308606083</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <MapPin className="w-4 h-4 text-[#637ab9]" />
                    <span className="text-white">Pune, Maharashtra, India</span>
                  </div>
                </div>
              </div>

              {/* Profiles */}
              <div className="pt-8 border-t border-white/10 mt-8">
                <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-3">
                  External Profiles
                </span>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.linkedin.com/in/om-wattamwar-430537314/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-mono text-white transition-all"
                    data-hover="true"
                  >
                    <span className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-[#0077b5]" /> linkedin.com/in/om-wattamwar-430537314
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                  </a>

                  <a
                    href="https://github.com/OmWattamwar2911"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-mono text-white transition-all"
                    data-hover="true"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-4 h-4" /> github.com/OmWattamwar2911
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="lg:col-span-7 p-8 rounded-2xl bg-[#141535]/80 border border-white/10">
              <h3 className="font-heading font-bold text-lg text-white uppercase mb-2">Send Direct Message</h3>
              <p className="text-xs text-gray-400 font-mono mb-6">
                Have an inquiry or project? Drop your message below.
              </p>

              {messageStatus === 'sent' ? (
                <div className="p-8 text-center bg-[#4fb7b3]/10 border border-[#4fb7b3]/40 rounded-xl space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#a8fbd3] text-black flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-white text-base uppercase">Message Dispatched!</h4>
                  <p className="text-xs text-gray-300 font-mono max-w-sm mx-auto">
                    Thank you for reaching out. You can also write directly to{' '}
                    <span className="text-[#a8fbd3]">omwattamwar123@gmail.com</span>.
                  </p>
                  <button
                    onClick={() => setMessageStatus('idle')}
                    className="mt-3 px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[11px]">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full bg-[#0a0b1d] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4fb7b3]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[11px]">Your Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="elena@company.com"
                      className="w-full bg-[#0a0b1d] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4fb7b3]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase tracking-wider text-[11px]">Message / Opportunity</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Discussing distributed systems role or interview invitation..."
                      className="w-full bg-[#0a0b1d] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4fb7b3] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={messageStatus === 'sending'}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4fb7b3] to-[#637ab9] hover:opacity-90 transition-all text-white font-bold uppercase tracking-widest text-xs cursor-pointer shadow-lg shadow-[#4fb7b3]/20 disabled:opacity-50"
                    data-hover="true"
                  >
                    {messageStatus === 'sending' ? 'Transmitting Message...' : 'Transmit Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-[#080918]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="font-heading text-2xl md:text-3xl font-bold tracking-tighter mb-2 text-white">
              OM SUHAS WATTAMWAR
            </div>
            <p className="text-xs font-mono text-gray-400">
              Distributed Systems · High Concurrency in Go · Top 0.2% ATF Fellow
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-gray-400">
            <a
              href="https://github.com/OmWattamwar2911"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              data-hover="true"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="https://www.linkedin.com/in/om-wattamwar-430537314/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              data-hover="true"
            >
              LinkedIn
            </a>
            <span>·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#a8fbd3] transition-colors cursor-pointer bg-transparent border-none text-gray-400"
              data-hover="true"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAIL MODAL - Lumina's signature presentation */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#121330] border border-white/20 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#4fb7b3]/20 max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors border border-white/20 cursor-pointer"
                data-hover="true"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev/Next Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateProject('prev');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors border border-white/20 cursor-pointer hidden md:flex items-center justify-center"
                data-hover="true"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateProject('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors border border-white/20 cursor-pointer hidden md:flex items-center justify-center"
                data-hover="true"
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Left Image / Visual Side */}
              <div className="w-full md:w-5/12 h-56 md:h-auto relative overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedProject.id}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 0.85, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#121330] via-[#121330]/40 to-transparent md:bg-gradient-to-r" />

                {/* Left side metrics overlay */}
                <div className="absolute bottom-6 left-6 right-6 hidden md:block">
                  <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider block mb-2">
                    Verified Performance
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.metrics.map((m, idx) => (
                      <div key={idx} className="bg-black/60 p-2.5 rounded border border-white/10 backdrop-blur-md">
                        <span className="text-sm font-bold font-mono text-[#a8fbd3] block">{m.value}</span>
                        <span className="text-[10px] font-mono text-gray-400">{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content Side */}
              <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-[#a8fbd3] border border-[#a8fbd3]/40 px-2.5 py-1 rounded-full bg-[#a8fbd3]/10 mb-3 inline-block">
                      {selectedProject.period}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase text-white leading-tight mt-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs font-mono text-[#4fb7b3] uppercase tracking-wider mt-1">
                      {selectedProject.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-gray-200 leading-relaxed font-light">
                    {selectedProject.summary}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    <span className="text-xs font-mono uppercase text-gray-400 tracking-wider block">
                      Core Implementation & Highlights:
                    </span>
                    {selectedProject.bulletPoints.map((bp, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed">
                        <span className="text-[#a8fbd3] font-bold mt-0.5">›</span>
                        <p>{bp}</p>
                      </div>
                    ))}
                  </div>

                  {/* Architecture Callout */}
                  {selectedProject.architectureHighlights && (
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <span className="text-xs font-mono uppercase text-gray-400 tracking-wider block">
                        Architecture Blueprint:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedProject.architectureHighlights.map((arch, i) => (
                          <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
                            <span className="font-mono font-bold text-[#a8fbd3] block mb-1">{arch.title}</span>
                            <span className="text-gray-400 text-[11px] leading-relaxed block">{arch.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-xs font-mono uppercase text-gray-400 tracking-wider block mb-2">
                      Technologies Utilized:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono px-2.5 py-1 rounded bg-black/40 text-gray-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action in Modal */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        scrollToSection('systems-lab');
                      }}
                      className="px-4 py-2 rounded bg-[#4fb7b3]/20 border border-[#4fb7b3]/40 text-[#a8fbd3] font-mono text-xs uppercase hover:bg-[#4fb7b3]/30 transition-colors cursor-pointer"
                    >
                      Open in Systems Lab →
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 md:hidden">
                    <button onClick={() => navigateProject('prev')} className="p-2 border rounded border-white/20">
                      Prev
                    </button>
                    <button onClick={() => navigateProject('next')} className="p-2 border rounded border-white/20">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
