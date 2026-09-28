/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  period: string;
  image: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  summary: string;
  bulletPoints: string[];
  architectureHighlights: { title: string; desc: string }[];
  category: 'distributed-systems' | 'ai-search' | 'full-stack';
  interactiveType?: 'scheduler' | 'search';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  track?: string;
  period: string;
  location: string;
  image: string;
  bullets: string[];
  technologies: string[];
  highlightMetric: string;
}

export interface Achievement {
  id: string;
  title: string;
  highlight: string;
  organization: string;
  description: string;
  iconType: 'trophy' | 'award' | 'star';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  ABOUT = 'about',
  PROJECTS = 'projects',
  EXPERIENCE = 'experience',
  SKILLS = 'skills',
  ACHIEVEMENTS = 'achievements',
  CONTACT = 'contact',
}
