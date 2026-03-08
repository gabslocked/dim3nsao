'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface FloatingProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}

export function Floating({ children, className, amplitude = 6, duration = 3 }: FloatingProps) {
  return (
    <motion.div
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PulseGlowProps {
  children: ReactNode;
  className?: string;
}

export function PulseGlow({ children, className }: PulseGlowProps) {
  return (
    <motion.div
      animate={{
        boxShadow: [
          '0 0 16px hsl(180 80% 60% / 0.3), 0 0 32px hsl(180 80% 60% / 0.1)',
          '0 0 24px hsl(180 80% 60% / 0.5), 0 0 48px hsl(180 80% 60% / 0.2)',
          '0 0 16px hsl(180 80% 60% / 0.3), 0 0 32px hsl(180 80% 60% / 0.1)',
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
