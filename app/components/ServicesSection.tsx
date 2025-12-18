"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { BackgroundElements } from "./ui/BackgroundElements";
import { AnimatedText } from "./ui/AnimatedText";
import { SchedulingModal } from "./SchedulingModal";
import { services } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
  index: number;
  slug: string;
}

function ServiceCard({ icon, title, description, features, color, index, slug }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative bg-sage-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-sage-700/30 h-full overflow-hidden"
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-5 rounded-full transform translate-x-8 -translate-y-8 transition-all duration-300 group-hover:scale-150`}
      />
      <div className="relative z-10">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`w-16 h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold text-sage-100 mb-4">{title}</h3>
        <p className="text-sage-300 mb-6 leading-relaxed">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center text-sage-300">
              <div className={`w-2 h-2 bg-gradient-to-r ${color} rounded-full mr-3`}></div>
              {feature}
            </li>
          ))}
        </ul>
        <Link href={`/services/${slug}`}>
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            className="cursor-pointer mt-6 text-sage-200 hover:text-sage-100 font-medium flex items-center group/btn"
          >
            Learn More
            <motion.span className="ml-2 transition-transform group-hover/btn:translate-x-1">
              →
            </motion.span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Map services to include React icons
  const servicesWithIcons = services.map((service) => ({
    ...service,
    icon: <service.icon className="w-8 h-8 text-sage-900" />,
  }));

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
      id="services"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-sage-700 via-sage-800 to-sage-900 overflow-hidden"
    >
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-sage-800 to-transparent opacity-50" />
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
              text="Our Core Services"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h2>
          <p className="text-xl text-sage-300 max-w-3xl mx-auto">
            Comprehensive financial and legal advisory services designed to accelerate your business
            growth and ensure regulatory compliance.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesWithIcons.map((service, index) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              color={service.color}
              index={index}
              slug={service.slug}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(200, 180, 160, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
            onClick={() => setIsSchedulingModalOpen(true)}
          >
            Discuss Your Requirements
          </motion.button>
        </motion.div>
      </div>
      <SchedulingModal
        isOpen={isSchedulingModalOpen}
        onClose={() => setIsSchedulingModalOpen(false)}
      />
    </section>
  );
};

export default ServicesSection;
