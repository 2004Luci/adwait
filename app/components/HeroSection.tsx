"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { BackgroundElements } from "./ui/BackgroundElements";
import { AnimatedText } from "./ui/AnimatedText";
import { TypewriterText } from "./ui/TypewriterText";
import { SchedulingModal } from "./SchedulingModal";
import { heroStats, heroTypewriterPhrases } from "@/lib/constants";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const AnimatedCounter = ({
    number,
    suffix,
    label,
  }: {
    number: number;
    suffix: string;
    label: string;
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          const increment = number / 50;
          const interval = setInterval(() => {
            setCount((prev) => {
              if (prev >= number) {
                clearInterval(interval);
                return number;
              }
              return Math.min(prev + increment, number);
            });
          }, 30);
          return () => clearInterval(interval);
        }, 500);
        return () => clearTimeout(timer);
      }
    }, [isVisible, number]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center"
      >
        <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sage-200 to-sage-300 bg-clip-text text-transparent mb-2">
          {Math.floor(count)}
          {suffix}
        </div>
        <div className="text-sage-300">{label}</div>
      </motion.div>
    );
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sage-900 via-black to-sage-800"
    >
      {/* Background Elements */}
      <BackgroundElements showGrid={true} showFloatingElements={true} showCornerElements={true} />

      {/* Additional floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-sage-200/20 to-sage-300/20 rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-sage-100/20 to-sage-200/20 rotate-45"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Mobile Layout - Title and Typewriter First */}
        <div className="lg:hidden space-y-8">
          {/* Title and Typewriter - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className="mb-4 flex flex-col items-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-sage-50">
                Expert Financial Solutions in:{" "}
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-sage-200 to-sage-300 bg-clip-text text-transparent">
                <TypewriterText
                  phrases={heroTypewriterPhrases}
                  typingSpeed={120}
                  deletingSpeed={60}
                  pauseTime={3000}
                />
              </span>
            </div>
          </motion.div>

          {/* Hero Image - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Glow effect behind the image */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage-200/20 to-sage-300/20 rounded-2xl blur-xl scale-110"></div>

                {/* Image container with border and shadow */}
                <div className="relative bg-gradient-to-br from-sage-800/50 to-sage-900/50 backdrop-blur-sm border border-sage-700/30 rounded-2xl p-4 shadow-2xl">
                  <Image
                    src="/hero.png"
                    alt="Adwait Artha LLP - Financial Solutions"
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain rounded-xl"
                    priority
                  />
                </div>

                {/* Floating elements around the image */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-sage-200 to-sage-300 rounded-full opacity-60"
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full opacity-40"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Description and Buttons - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 text-center"
          >
            <p className="text-lg text-sage-300 max-w-2xl mx-auto">
              The Firm "Adwait Artha LLP" is in the field of fund raising, equity capital market
              (IPO's) primary market or secondary market, debt syndication, corporate law, finance,
              management audit, budgeting, legal drafting and other related areas. With 23+ years of
              experience and a team of dedicated professionals, we provide niche solutions to our
              valued clients.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(200, 180, 160, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSchedulingModalOpen(true)}
                className="cursor-pointer bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                Schedule Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const servicesSection = document.getElementById("services");
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="cursor-pointer border border-sage-200/30 text-sage-200 px-8 py-4 rounded-xl hover:bg-sage-200/10 transition-all duration-300"
              >
                Services Offered
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout - Two Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Main Title */}
              <div className="text-left">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-5xl lg:text-7xl font-bold text-sage-50 leading-tight"
                >
                  <div className="mb-4 flex flex-col items-start">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-sage-50">
                      Expert Financial Solutions in:{" "}
                    </span>
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-sage-200 to-sage-300 bg-clip-text text-transparent">
                      <TypewriterText
                        phrases={heroTypewriterPhrases}
                        typingSpeed={120}
                        deletingSpeed={60}
                        pauseTime={3000}
                      />
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-sage-300 max-w-2xl"
              >
                The Firm "Adwait Artha LLP" is in the field of fund raising, equity capital market
                (IPO's) primary market or secondary market, debt syndication, corporate law,
                finance, management audit, budgeting, legal drafting and other related areas. With
                23+ years of experience and a team of dedicated professionals, we provide niche
                solutions to our valued clients.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(200, 180, 160, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSchedulingModalOpen(true)}
                  className="cursor-pointer bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                >
                  Schedule Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const servicesSection = document.getElementById("services");
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="cursor-pointer border border-sage-200/30 text-sage-200 px-8 py-4 rounded-xl hover:bg-sage-200/10 transition-all duration-300"
                >
                  Services Offered
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-end"
          >
            <div className="relative w-full max-w-lg xl:max-w-xl">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Glow effect behind the image */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage-200/20 to-sage-300/20 rounded-2xl blur-xl scale-110"></div>

                {/* Image container with border and shadow */}
                <div className="relative bg-gradient-to-br from-sage-800/50 to-sage-900/50 backdrop-blur-sm border border-sage-700/30 rounded-2xl p-4 shadow-2xl">
                  <Image
                    src="/hero.png"
                    alt="Adwait Artha LLP - Financial Solutions"
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain rounded-xl"
                    priority
                  />
                </div>

                {/* Floating elements around the image */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-sage-200 to-sage-300 rounded-full opacity-60"
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full opacity-40"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {heroStats.map((stat, index) => (
            <AnimatedCounter key={index} {...stat} />
          ))}
        </motion.div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-16"
        >
          <div className="mb-4 w-16 h-px bg-gradient-to-r from-transparent via-sage-200 to-transparent opacity-30" />
          <h2 className="text-xs md:text-sm font-mono font-light text-sage-200 uppercase tracking-[0.2em] opacity-80">
            <AnimatedText
              text="Building financial futures with integrity and expertise"
              className="text-sage-200"
              delay={3500}
              staggerDelay={0.15}
            />
          </h2>

          {/* Additional details */}
          <div
            className="mt-6 flex justify-center space-x-4 opacity-0"
            style={{ animation: "word-appear 1s ease-out forwards", animationDelay: "4.5s" }}
          >
            <div className="w-1 h-1 bg-sage-200 rounded-full opacity-40" />
            <div className="w-1 h-1 bg-sage-200 rounded-full opacity-60" />
            <div className="w-1 h-1 bg-sage-200 rounded-full opacity-40" />
          </div>
        </motion.div>
      </div>

      {/* Scheduling Modal */}
      <SchedulingModal
        isOpen={isSchedulingModalOpen}
        onClose={() => setIsSchedulingModalOpen(false)}
      />
    </section>
  );
}
