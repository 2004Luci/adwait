'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from './utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  showUnderline?: boolean;
}

export function AnimatedText({ 
  text, 
  className = "", 
  delay = 0,
  staggerDelay = 0.15,
  showUnderline = false 
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.word');
    
    words.forEach((word, index) => {
      const element = word as HTMLElement;
      const wordDelay = delay + (index * staggerDelay * 1000);
      
      setTimeout(() => {
        element.style.animation = 'word-appear 0.8s ease-out forwards';
      }, wordDelay);
    });
  }, [text, delay, staggerDelay]);

  return (
    <div 
      ref={containerRef}
      className={cn("text-decoration", showUnderline ? "text-decoration" : "", className)}
    >
      {text.split(' ').map((word, index) => (
        <span 
          key={index} 
          className="word"
          style={{ animationDelay: `${delay + (index * staggerDelay * 1000)}ms` }}
        >
          {word}
          {index < text.split(' ').length - 1 && '\u00A0'}
        </span>
      ))}
    </div>
  );
} 