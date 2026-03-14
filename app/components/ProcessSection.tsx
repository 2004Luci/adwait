"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket } from "lucide-react";
import { BackgroundElements } from "./ui/BackgroundElements";
import { AnimatedText } from "./ui/AnimatedText";
import { processSteps } from "@/lib/constants";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const processLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!processLineRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    timeline.fromTo(
      processLineRef.current,
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1, ease: "none" }
    );

    const steps = document.querySelectorAll(".process-step");
    steps.forEach((step) => {
      gsap.fromTo(
        step,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-sage-500 via-sage-600 to-sage-700 overflow-hidden"
    >
      {/* Background Elements */}
      <BackgroundElements showGrid={true} showFloatingElements={true} showCornerElements={false} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-200/10 text-sage-200 text-sm font-medium mb-4">
            <Rocket className="h-4 w-4 mr-2" />
            Our Process
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-sage-50 mb-6">
            <AnimatedText
              text="Our Systematic Approach"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h2>
          <p className="text-xl text-sage-300 max-w-3xl mx-auto">
            A proven methodology that guides companies through every stage of their IPO journey,
            from initial assessment to post-listing success.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Process Line - Hidden on mobile, visible on desktop */}
          <div
            ref={processLineRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-sage-200 to-sage-300 transform -translate-x-1/2"
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`process-step relative ${
                  index % 2 === 0
                    ? "lg:flex lg:items-center lg:flex-row"
                    : "lg:flex lg:items-center lg:flex-row-reverse"
                } lg:gap-12`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Content */}
                <div
                  className={`lg:flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"} text-center lg:text-left mb-8 lg:mb-0`}
                >
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-200/20 text-sage-200 text-sm font-medium mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-sage-50 mb-4">{step.title}</h3>
                  <p className="text-sage-300 leading-relaxed">{step.description}</p>
                </div>

                {/* Icon Container - Centered on mobile, positioned on desktop */}
                <div className="relative z-10 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-sage-200 to-sage-300 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <step.icon className="h-7 w-7 text-sage-900" />
                  </motion.div>
                </div>

                {/* Spacer for odd items on desktop */}
                <div className="hidden lg:block lg:flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(200, 180, 160, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
