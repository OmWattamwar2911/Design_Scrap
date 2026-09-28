/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, Check, Copy, ExternalLink, Mail, Phone, MapPin, Award, BookOpen, Briefcase, Code, Layers } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0d21] border border-white/20 rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-[#4fb7b3]/20"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#a8fbd3] animate-pulse" />
              <span className="font-heading font-bold text-sm tracking-wider uppercase text-white">
                Om Suhas Wattamwar — Resume
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all cursor-pointer"
                title="Print Resume"
                data-hover="true"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={() => copyToClipboard('omwattamwar123@gmail.com', 'email')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4fb7b3]/20 border border-[#4fb7b3]/40 hover:bg-[#4fb7b3]/30 text-xs font-mono text-[#a8fbd3] transition-all cursor-pointer"
                data-hover="true"
              >
                {copied === 'email' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied === 'email' ? 'Copied Email' : 'Copy Email'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer ml-2"
                data-hover="true"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Document Body */}
          <div className="p-6 md:p-10 overflow-y-auto space-y-8 font-sans text-gray-200">
            {/* Top Identity Block */}
            <div className="text-center pb-6 border-b border-white/10">
              <h1 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-tight text-white mb-2">
                Om Suhas Wattamwar
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-gray-400 mt-2">
                <span className="flex items-center gap-1 text-white">
                  <Phone className="w-3 h-3 text-[#4fb7b3]" /> +91-8308606083
                </span>
                <span>·</span>
                <a href="mailto:omwattamwar123@gmail.com" className="flex items-center gap-1 hover:text-[#a8fbd3] transition-colors">
                  <Mail className="w-3 h-3 text-[#4fb7b3]" /> omwattamwar123@gmail.com
                </a>
                <span>·</span>
                <a href="https://www.linkedin.com/in/om-wattamwar-430537314/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#a8fbd3] transition-colors">
                  linkedin.com/in/om-wattamwar-430537314 <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <span>·</span>
                <a href="https://github.com/OmWattamwar2911" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#a8fbd3] transition-colors">
                  github.com/OmWattamwar2911 <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#4fb7b3]" /> Pune, Maharashtra, India
                </span>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#a8fbd3] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a8fbd3]" />
                Summary
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Penultimate-year CS undergraduate (B.Tech, CGPA 9.0/10.0) with experience in decentralized systems, concurrency, and multi-threading via Go, gRPC, and fault-tolerant scheduling systems. Proficient in Python, Java, C/C++, JavaScript, and Go with strong foundations in data structures, algorithms, and software design. Top 0.2% selectee, AlgoUniversity Software Engineering Fellowship.
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#a8fbd3] mb-3 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                Education
              </h2>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="font-heading font-bold text-white text-base">Manipal University Jaipur</h3>
                  <span className="text-xs font-mono text-gray-400">Jun 2024 – May 2028 · Jaipur, India</span>
                </div>
                <div className="text-xs font-mono text-[#a8fbd3] mb-2">
                  Bachelor of Technology, Computer Science and Engineering | CGPA: 9.0 / 10.0
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  <strong className="text-gray-300">Relevant Coursework:</strong> Data Structures & Algorithms, Design and Analysis of Algorithms, Object-Oriented Programming, Operating Systems, Computer Networks & Security, Distributed Systems, Software Engineering / Software Design, Computer Architecture, Database Management Systems (DBMS), Artificial Intelligence & Machine Learning, Compiler Design, Cloud Computing.
                </p>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#a8fbd3] mb-3 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                Experience
              </h2>
              <div className="space-y-4">
                <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="font-heading font-bold text-white text-sm">AlgoUniversity Tech Fellowship (ATF)</h3>
                    <span className="text-xs font-mono text-gray-400">Jan 2026 – Jun 2026 · Remote</span>
                  </div>
                  <div className="text-xs font-mono text-[#4fb7b3] mb-3">
                    Software Engineering Fellow — Elite Mentorship Track
                  </div>
                  <ul className="space-y-2 text-xs text-gray-300 list-disc pl-4 leading-relaxed">
                    <li>Solved 300+ data structure and algorithm problems across arrays, graphs, DP, and concurrency, ranking in the top tier of timed assessments benchmarked against IIT/NIT peers.</li>
                    <li>Designed system architecture documents for 3 decentralized systems (URL shortener, decentralized cache cluster, real-time messaging service) engineered to handle millions of daily requests, addressing scalability, fault tolerance, and synchronization tradeoffs.</li>
                  </ul>
                </div>

                <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="font-heading font-bold text-white text-sm">Kanishka Properties</h3>
                    <span className="text-xs font-mono text-gray-400">May 2025 – Jul 2025 · Aurangabad, India</span>
                  </div>
                  <div className="text-xs font-mono text-[#4fb7b3] mb-3">
                    Software Engineering Intern — Full-Stack Web Development
                  </div>
                  <ul className="space-y-2 text-xs text-gray-300 list-disc pl-4 leading-relaxed">
                    <li>Built and deployed a full-stack real estate platform (React.js, Node.js, Express.js, MongoDB) with 15+ secured REST API routes using JWT authentication and role-based access control, supporting 200+ active users across 500+ property listings.</li>
                    <li>Reduced search latency by 40% and increased query throughput 3× by designing indexed MongoDB queries for high-traffic endpoints.</li>
                    <li>Automated deployment workflows by implementing a CI/CD pipeline with GitHub Actions, cutting manual release time by 60% and improving engineering velocity.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#a8fbd3] mb-3 flex items-center gap-2">
                <Code className="w-3.5 h-3.5" />
                Featured Projects
              </h2>
              <div className="space-y-4">
                <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="font-heading font-bold text-white text-sm">Distributed Task Scheduler with Fault Tolerance</h3>
                    <span className="text-xs font-mono text-gray-400">Jan 2026 – Feb 2026</span>
                  </div>
                  <div className="text-xs font-mono text-[#a8fbd3] mb-3">
                    Go, gRPC, etcd, Docker
                  </div>
                  <ul className="space-y-2 text-xs text-gray-300 list-disc pl-4 leading-relaxed">
                    <li>Architected a fault-tolerant task scheduling system in Go with etcd-based leader election, sustaining 500+ concurrent task executions across multiple worker nodes at a 99.5% completion rate under simulated node failures.</li>
                    <li>Engineered thread-safe task queues using mutex-based synchronization and atomic operations, eliminating race conditions and improving task throughput by 40% under high-concurrency load.</li>
                  </ul>
                </div>

                <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="font-heading font-bold text-white text-sm">AI-Integrated Semantic Search Engine</h3>
                    <span className="text-xs font-mono text-gray-400">Nov 2025 – Dec 2025</span>
                  </div>
                  <div className="text-xs font-mono text-[#a8fbd3] mb-3">
                    Python (FastAPI), Kafka, Elasticsearch, GCP
                  </div>
                  <ul className="space-y-2 text-xs text-gray-300 list-disc pl-4 leading-relaxed">
                    <li>Built a vector embedding-based semantic search pipeline on GCP processing 1M+ documents, reducing query latency from 800ms to 120ms (85% improvement) via an optimized inverted index architecture.</li>
                    <li>Developed a real-time data ingestion pipeline with Kafka sustaining 10,000+ events/sec, integrating an ML reranking model that improved top-5 search result accuracy by 25%.</li>
                    <li>Modeled and deployed a scalable, AI-driven, end-to-end system spanning ingestion, indexing, and retrieval, applying multi-node systems and data structures principles to handle production-scale data and traffic.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#a8fbd3] mb-3 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="font-bold text-white block mb-1">Languages:</span>
                  <span className="text-gray-300">C/C++, Java, Python, HTML5/CSS3, JavaScript/TypeScript, Go, Rust</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="font-bold text-white block mb-1">Backend & Systems:</span>
                  <span className="text-gray-300">Node.js, Express.js, REST APIs, Socket.io, gRPC, Kafka, Redis, JWT, Mongoose, LLVM, Compiler design, HDL</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="font-bold text-white block mb-1">Frontend & Full-Stack:</span>
                  <span className="text-gray-300">React.js, Redux Toolkit, Next.js, WebSockets, Operational Transformation</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="font-bold text-white block mb-1">Databases:</span>
                  <span className="text-gray-300">MySQL, PostgreSQL, MongoDB, Redis, consistent hashing, indexing & query optimization</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="font-bold text-white block mb-1">AI / ML:</span>
                  <span className="text-gray-300">Supervised Learning, Anomaly Detection, TF-IDF, scikit-learn, NumPy, PyTorch, Pandas, LLM APIs, Data analysis, LLM agents, Generative AI, Graph Neural Networks, Model fine-tuning</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="font-bold text-white block mb-1">Cloud & DevOps:</span>
                  <span className="text-gray-300">AWS (EC2, S3), Docker, Kubernetes, GitHub Actions, Nginx, Cloudinary</span>
                </div>
              </div>
            </div>

            {/* Achievements & Honors */}
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#a8fbd3] mb-3 flex items-center gap-2">
                <Award className="w-3.5 h-3.5" />
                Achievements & Certifications
              </h2>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex gap-3">
                  <Award className="w-5 h-5 text-[#a8fbd3] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">AlgoUniversity Tech Fellowship (ATF)</h4>
                    <p className="text-gray-300 mt-0.5">
                      Top 0.2% of 100,000+ global applicants; 1 of 200 fellows selected worldwide for elite software engineering mentorship.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex gap-3">
                  <Award className="w-5 h-5 text-[#4fb7b3] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white">Dean’s List — Semester I & II</h4>
                    <p className="text-gray-300 mt-0.5">
                      Recognized for academic excellence with SGPA 9.0+ each semester, top percentile of CSE cohort at Manipal University Jaipur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
