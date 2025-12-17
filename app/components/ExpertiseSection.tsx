"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, TrendingUp } from "lucide-react";
import { BackgroundElements } from "./ui/BackgroundElements";
import { AnimatedText } from "./ui/AnimatedText";
import { expertiseProcessSteps, expertiseAreas } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseCardProps {
  category: string;
  skills: string[];
  percentage: number;
  color: string;
  index: number;
}

function ExpertiseCard({ category, skills, percentage, color, index }: ExpertiseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative bg-sage-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-sage-700/30 overflow-hidden"
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-5 rounded-full transform translate-x-8 -translate-y-8 transition-all duration-300 group-hover:scale-150`}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-semibold text-sage-100">{category}</h4>
          <span
            className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
          >
            {percentage}%
          </span>
        </div>
        <div className="w-full bg-sage-700/30 rounded-full h-3 mb-6">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`bg-gradient-to-r ${color} h-3 rounded-full shadow-lg`}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {skills.map((skill, skillIndex) => (
            <div key={skillIndex} className="flex items-center text-sage-300">
              <ArrowRight className="w-3 h-3 mr-2 text-sage-200" />
              {skill}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current.querySelectorAll(".char"),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-sage-600 via-sage-700 to-sage-800 overflow-hidden"
    >
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-sage-700 to-transparent opacity-50" />
        <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-sage-200/10 blur-3xl" />
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-sage-300/10 blur-3xl" />
      </motion.div>
      <BackgroundElements showGrid={true} showFloatingElements={true} showCornerElements={false} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-200/10 text-sage-200 text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4 mr-2" />
            Our Expertise
          </div>
          <h2 ref={titleRef} className="text-4xl lg:text-5xl font-bold text-sage-50 mb-6">
            <AnimatedText
              text="Our Expertise"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h2>
          <p className="text-xl text-sage-300 max-w-3xl mx-auto">
            A systematic approach to delivering exceptional financial advisory services with proven
            methodologies and industry expertise.
          </p>
        </motion.div>
        <div>
          <h3 className="text-3xl font-bold text-sage-50 text-center mb-12">
            <AnimatedText
              text="Areas of Expertise"
              className="text-sage-50"
              delay={400}
              staggerDelay={0.1}
            />
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {expertiseAreas.map((area, index) => (
              <ExpertiseCard
                key={index}
                category={area.category}
                skills={area.skills}
                percentage={area.percentage}
                color={area.color}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
