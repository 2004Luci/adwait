"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface BackgroundElementsProps {
  showGrid?: boolean;
  showFloatingElements?: boolean;
  showCornerElements?: boolean;
  className?: string;
}

export function BackgroundElements({
  showGrid = true,
  showFloatingElements = true,
  showCornerElements = true,
  className = "",
}: BackgroundElementsProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Animate grid lines with delays
    const gridLines = svgRef.current.querySelectorAll(".grid-line");
    gridLines.forEach((line, index) => {
      const element = line as SVGElement;
      element.style.animationDelay = `${0.5 + index * 0.5}s`;
    });

    // Animate detail dots with delays
    const detailDots = svgRef.current.querySelectorAll(".detail-dot");
    detailDots.forEach((dot, index) => {
      const element = dot as SVGElement;
      element.style.animationDelay = `${3 + index * 0.2}s`;
    });
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Grid Background */}
      {showGrid && (
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(200,180,160,0.08)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Main grid lines */}
          <line
            x1="0"
            y1="20%"
            x2="100%"
            y2="20%"
            className="grid-line"
            style={{ animationDelay: "0.5s" }}
          />
          <line
            x1="0"
            y1="80%"
            x2="100%"
            y2="80%"
            className="grid-line"
            style={{ animationDelay: "1s" }}
          />
          <line
            x1="20%"
            y1="0"
            x2="20%"
            y2="100%"
            className="grid-line"
            style={{ animationDelay: "1.5s" }}
          />
          <line
            x1="80%"
            y1="0"
            x2="80%"
            y2="100%"
            className="grid-line"
            style={{ animationDelay: "2s" }}
          />

          {/* Accent lines */}
          <line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            className="grid-line"
            style={{ animationDelay: "2.5s", opacity: 0.05 }}
          />
          <line
            x1="0"
            y1="50%"
            x2="100%"
            y2="50%"
            className="grid-line"
            style={{ animationDelay: "3s", opacity: 0.05 }}
          />

          {/* Detail dots */}
          <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3s" }} />
          <circle
            cx="80%"
            cy="20%"
            r="2"
            className="detail-dot"
            style={{ animationDelay: "3.2s" }}
          />
          <circle
            cx="20%"
            cy="80%"
            r="2"
            className="detail-dot"
            style={{ animationDelay: "3.4s" }}
          />
          <circle
            cx="80%"
            cy="80%"
            r="2"
            className="detail-dot"
            style={{ animationDelay: "3.6s" }}
          />
          <circle
            cx="50%"
            cy="50%"
            r="1.5"
            className="detail-dot"
            style={{ animationDelay: "4s" }}
          />
        </svg>
      )}

      {/* Corner Elements */}
      {showCornerElements && (
        <>
          <motion.div
            className="corner-element top-8 left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            <div className="absolute top-0 left-0 w-2 h-2 bg-sage-200 opacity-30"></div>
          </motion.div>
          <motion.div
            className="corner-element top-8 right-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.2, duration: 1 }}
          >
            <div className="absolute top-0 right-0 w-2 h-2 bg-sage-200 opacity-30"></div>
          </motion.div>
          <motion.div
            className="corner-element bottom-8 left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.4, duration: 1 }}
          >
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-sage-200 opacity-30"></div>
          </motion.div>
          <motion.div
            className="corner-element bottom-8 right-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.6, duration: 1 }}
          >
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-sage-200 opacity-30"></div>
          </motion.div>
        </>
      )}

      {/* Floating Elements */}
      {showFloatingElements && (
        <>
          <motion.div
            className="floating-element"
            style={{ top: "25%", left: "15%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 0.5 }}
          />
          <motion.div
            className="floating-element"
            style={{ top: "60%", left: "85%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.5, duration: 0.5 }}
          />
          <motion.div
            className="floating-element"
            style={{ top: "40%", left: "10%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6, duration: 0.5 }}
          />
          <motion.div
            className="floating-element"
            style={{ top: "75%", left: "90%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6.5, duration: 0.5 }}
          />
        </>
      )}
    </div>
  );
}
