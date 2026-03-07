'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  offset?: ['start end' | 'start start' | 'end start' | 'end end', 'start end' | 'start start' | 'end start' | 'end end'];
}

export function Parallax({ children, className, speed = 0.3, offset = ['start start', 'end start'] }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', position: 'relative' }}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
