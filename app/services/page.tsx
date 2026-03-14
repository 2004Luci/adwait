"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowLeft, TrendingUp } from "lucide-react";
import { BackgroundElements } from "../components/ui/BackgroundElements";
import { AnimatedText } from "../components/ui/AnimatedText";
import { SchedulingModal } from "../components/SchedulingModal";
import { services } from "@/lib/constants";

export default function ServicesPage() {
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState<boolean>(false);

  const servicesWithIcons = services.map((service) => ({
    ...service,
    icon: <service.icon className="w-8 h-8 text-sage-900" />,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-900 via-black to-sage-800">
      <BackgroundElements showGrid={true} showFloatingElements={true} showCornerElements={true} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer flex items-center text-sage-200 hover:text-sage-100 font-medium bg-sage-800/50 hover:bg-sage-800/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-sage-700/30 transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-200/10 text-sage-200 text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4 mr-2" />
            Our Services
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-sage-50 mb-6">
            <AnimatedText
              text="Comprehensive Financial Solutions"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h1>
          <p className="text-xl text-sage-300 max-w-3xl mx-auto">
            Discover our six core services designed to meet all your financial, legal, and corporate
            advisory needs. Each service is tailored to provide comprehensive solutions for
            businesses at every stage of growth.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {servicesWithIcons.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative bg-sage-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-sage-700/30 h-full overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-full transform translate-x-8 -translate-y-8 transition-all duration-300 group-hover:scale-150`}
              />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-sage-100 mb-4">{service.title}</h3>
                <p className="text-sage-300 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sage-300">
                      <div
                        className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/services/${service.slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="cursor-pointer w-full text-sage-200 hover:text-sage-100 font-medium flex items-center justify-center group/btn bg-sage-700/30 hover:bg-sage-700/50 py-3 px-4 rounded-xl transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-sage-800/30 backdrop-blur-sm rounded-2xl p-12 border border-sage-700/30"
        >
          <h2 className="text-3xl font-bold text-sage-50 mb-4">Ready to Get Started?</h2>
          <p className="text-sage-300 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you navigate the complexities of financial
            services. Contact us today to discuss your specific needs and discover how we can
            support your business growth.
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
                window.location.href = "/#contact";
              }}
              className="cursor-pointer border border-sage-200/30 text-sage-200 px-8 py-4 rounded-xl hover:bg-sage-200/10 transition-all duration-300"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
      <SchedulingModal
        isOpen={isSchedulingModalOpen}
        onClose={() => setIsSchedulingModalOpen(false)}
      />
    </div>
  );
}
