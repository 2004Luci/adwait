"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { TrendingUp, CheckCircle, ArrowLeft, Phone, Mail } from "lucide-react";
import { BackgroundElements } from "../../components/ui/BackgroundElements";
import { AnimatedText } from "../../components/ui/AnimatedText";
import { SchedulingModal } from "../../components/SchedulingModal";
import { ipoFeatures, ipoProcessSteps, ipoBenefits } from "@/lib/constants";

export default function IPOSMEIPOAdvisoryPage() {
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-900 via-black to-sage-800">
      {/* Background Elements */}
      <BackgroundElements showGrid={true} showFloatingElements={true} showCornerElements={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/services"
            className="inline-flex items-center text-sage-300 hover:text-sage-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-200/10 text-sage-200 text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4 mr-2" />
            IPO & SME IPO Advisory
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-sage-50 mb-6">
            <AnimatedText
              text="IPO/SME IPO Advisory Services"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h1>

          <p className="text-xl text-sage-300 max-w-4xl mx-auto">
            Comprehensive IPO advisory services to help your company successfully navigate the
            complex process of going public. From initial planning to post-listing support, we
            provide end-to-end guidance for both main board and SME IPOs.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-8 border border-sage-700/30"
            >
              <h2 className="text-2xl font-bold text-sage-100 mb-6">Service Overview</h2>
              <p className="text-sage-300 leading-relaxed mb-6">
                The firm deals with clients as strategic partner in structuring its fund raising
                requirement, planning, designing, finalising end use of fund raising along with
                inviting strategic partners, investors, funds in pre IPO platform, valuation and tie
                up with various agencies involved in IPO and put the company on right platform
                through IPO listing.
              </p>
              <p className="text-sage-300 leading-relaxed">
                Our expertise spans both main board IPOs and SME IPOs, providing tailored solutions
                based on your company&apos;s size, growth stage, and market positioning. We work closely
                with SEBI, stock exchanges, and other regulatory bodies to ensure smooth and
                compliant listing processes.
              </p>
            </motion.div>

            {/* Process Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-sage-100">Our 6-Step IPO Process</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {ipoProcessSteps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-sage-800/30 backdrop-blur-sm rounded-xl p-6 border border-sage-700/20"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-sage-200 to-sage-300 rounded-lg flex items-center justify-center text-sage-900 font-bold text-sm">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-sage-100 mb-2">{step.title}</h3>
                          <p className="text-sage-300 text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-6 border border-sage-700/30"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {ipoFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sage-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-sage-200 to-sage-300 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-6 border border-sage-700/30"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">Benefits of Going Public</h3>
              <ul className="space-y-3">
                {ipoBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sage-300">
                    <CheckCircle className="w-4 h-4 text-sage-200 mr-3 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-sage-200/10 to-sage-300/10 backdrop-blur-sm rounded-2xl p-6 border border-sage-200/20"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">
                Ready to Start Your IPO Journey?
              </h3>
              <p className="text-sage-300 text-sm mb-6">
                Contact our experts to discuss your IPO strategy and get personalized guidance.
              </p>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSchedulingModalOpen(true)}
                  className="cursor-pointer w-full bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 px-6 py-3 rounded-xl font-medium flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.location.href = `/?service=${encodeURIComponent("IPO Advisory")}#contact`;
                  }}
                  className="cursor-pointer w-full border border-sage-200/30 text-sage-200 px-6 py-3 rounded-xl font-medium flex items-center justify-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Inquiry
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-sage-800/30 backdrop-blur-sm rounded-2xl p-8 border border-sage-700/30"
        >
          <h2 className="text-2xl font-bold text-sage-100 mb-6">
            Why Choose Adwait Artha LLP for Your IPO?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">23+ Years of Experience</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Our extensive experience in the Indian capital markets and deep understanding of
                regulatory requirements ensures a smooth and successful IPO process for your
                company.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Proven Track Record</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                We have successfully guided numerous companies through their IPO journey, from small
                SMEs to large corporations, with a high success rate and satisfied clients.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Comprehensive Support</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                From initial planning to post-listing compliance, we provide end-to-end support
                ensuring your company is well-prepared for the public markets.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Regulatory Expertise</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Our strong relationships with SEBI, stock exchanges, and other regulatory bodies
                help expedite the approval process and ensure compliance at every step.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scheduling Modal */}
      <SchedulingModal
        isOpen={isSchedulingModalOpen}
        onClose={() => setIsSchedulingModalOpen(false)}
      />
    </div>
  );
}
