/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight, Cpu } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      className="group relative h-[440px] md:h-[520px] w-full overflow-hidden border-b md:border-r border-white/10 bg-[#0d0e24] cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image Background with Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={project.image} 
          alt={project.title} 
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover grayscale will-change-transform opacity-40 group-hover:opacity-75 transition-opacity duration-500"
          variants={{
            rest: { scale: 1, filter: 'grayscale(100%)' },
            hover: { scale: 1.06, filter: 'grayscale(10%)' }
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        {/* Tint overlay matching Lumina's indigo & periwinkle palette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f29] via-[#1a1b3b]/70 to-transparent group-hover:bg-[#4fb7b3]/10 transition-colors duration-500" />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none z-10">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-mono tracking-wider text-[#a8fbd3] border border-[#a8fbd3]/30 px-2.5 py-1 rounded-full backdrop-blur-md bg-black/40">
              {project.period}
            </span>
          </div>
          <motion.div
            variants={{
              rest: { opacity: 0, x: 15, y: -15 },
              hover: { opacity: 1, x: 0, y: 0 }
            }}
            className="bg-white text-black rounded-full p-2.5 will-change-transform shadow-lg shadow-[#4fb7b3]/20"
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.div>
        </div>

        <div>
          {/* Metrics bar */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.metrics.map((metric, i) => (
              <span key={i} className="text-xs font-mono text-white/90 bg-white/10 px-2 py-0.5 rounded backdrop-blur-md">
                <span className="text-[#a8fbd3] font-bold">{metric.value}</span> {metric.label}
              </span>
            ))}
          </div>

          <div className="overflow-hidden">
            <motion.h3 
              className="font-heading text-2xl md:text-3xl font-bold uppercase text-white leading-tight will-change-transform"
              variants={{
                rest: { y: 0 },
                hover: { y: -4 }
              }}
              transition={{ duration: 0.4 }}
            >
              {project.title}
            </motion.h3>
          </div>

          <motion.p 
            className="text-xs font-medium uppercase tracking-widest text-[#4fb7b3] mt-2 line-clamp-1 will-change-transform"
            variants={{
              rest: { opacity: 0.8, y: 5 },
              hover: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {project.tagline}
          </motion.p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
            {project.techStack.map((tech, idx) => (
              <span key={idx} className="text-[10px] font-mono uppercase text-white/70 tracking-wider">
                {tech}{idx < project.techStack.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
