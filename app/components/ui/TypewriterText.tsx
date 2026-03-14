"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function TypewriterText({
  phrases,
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 2000,
}: TypewriterTextProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;
    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause then start deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next phrase - defer setState to avoid cascading renders
        let cancelled = false;
        queueMicrotask(() => {
          if (!cancelled) {
            setIsDeleting(false);
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        });
        return () => {
          cancelled = true;
        };
      }
    }
  }, [currentText, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <div className={className}>
      <span>{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-sage-200 ml-1"
      />
    </div>
  );
}
