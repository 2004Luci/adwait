"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import {
  BarChart3,
  CheckCircle,
  ArrowLeft,
  Phone,
  Mail,
  TrendingUp,
  FileText,
  Shield,
} from "lucide-react";
import { BackgroundElements } from "../../components/ui/BackgroundElements";
import { AnimatedText } from "../../components/ui/AnimatedText";
import { SchedulingModal } from "../../components/SchedulingModal";

export default function FinancialAdvisoryPage() {
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);

  const services = [
    "Financial Statement Advisory",
    "Disclosure Requirements",
    "Governance Compliance",
    "Financial Restructuring",
    "Strategic Planning",
    "Performance Analysis",
    "Risk Assessment",
    "Compliance Reporting",
  ];

  const advisoryAreas = [
    {
      title: "Financial Statement Advisory",
      description:
        "Expert guidance on presentation and preparation of financial statements in accordance with accounting standards.",
      features: [
        "Accounting Standards Compliance",
        "Financial Presentation",
        "Disclosure Requirements",
        "Audit Support",
      ],
    },
    {
      title: "Financial Restructuring",
      description:
        "Strategic restructuring of financial statements and capital structure to optimize business performance.",
      features: [
        "Capital Structure Optimization",
        "Debt Restructuring",
        "Asset Reorganization",
        "Financial Modeling",
      ],
    },
    {
      title: "Governance Compliance",
      description:
        "Ensuring compliance with corporate governance norms and regulatory requirements for financial reporting.",
      features: [
        "Corporate Governance",
        "Regulatory Compliance",
        "Board Reporting",
        "Stakeholder Communication",
      ],
    },
  ];

  const benefits = [
    "Improved Financial Transparency",
    "Enhanced Investor Confidence",
    "Better Decision Making",
    "Regulatory Compliance",
    "Optimized Capital Structure",
    "Risk Mitigation",
    "Performance Enhancement",
    "Stakeholder Value Creation",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-900 via-black to-sage-800">
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
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-700/10 text-sage-700 text-sm font-medium mb-4">
            <BarChart3 className="h-4 w-4 mr-2" />
            Financial Advisory & Restructuring
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-sage-50 mb-6">
            <AnimatedText
              text="Financial Statement Advisory/Structuring/Restructuring"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h1>

          <p className="text-xl text-sage-300 max-w-4xl mx-auto">
            Expert financial statement advisory, disclosure requirements, governance compliance, and
            strategic financial restructuring. We help businesses optimize their financial
            presentation and structure for better performance and compliance.
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
                The Firm's strength lies in its partner's ability to advise on presentation of
                financial statement, its advisory on how the financial of the client's shall be
                presented in annual statement, disclosure requirements, Governance compliance,
                transparency and assist and advising client on structuring and restructuring of
                financial on need based requirement.
              </p>
              <p className="text-sage-300 leading-relaxed">
                Our comprehensive financial advisory services help businesses present their
                financial information effectively, comply with regulatory requirements, and optimize
                their financial structure for sustainable growth.
              </p>
            </motion.div>

            {/* Advisory Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-sage-100">Our Advisory Areas</h2>
              <div className="space-y-6">
                {advisoryAreas.map((area, index) => (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-sage-800/30 backdrop-blur-sm rounded-xl p-6 border border-sage-700/20"
                  >
                    <h3 className="text-lg font-semibold text-sage-100 mb-3">{area.title}</h3>
                    <p className="text-sage-300 text-sm leading-relaxed mb-4">{area.description}</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {area.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sage-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-sage-200 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Services */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-6 border border-sage-700/30"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center text-sage-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-sage-700 to-sage-800 rounded-full mr-3"></div>
                    {service}
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
              <h3 className="text-xl font-bold text-sage-100 mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sage-300">
                    <TrendingUp className="w-4 h-4 text-sage-700 mr-3 flex-shrink-0" />
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
              className="bg-gradient-to-br from-sage-700/10 to-sage-800/10 backdrop-blur-sm rounded-2xl p-6 border border-sage-700/20"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">Need Financial Advisory?</h3>
              <p className="text-sage-300 text-sm mb-6">
                Contact our financial experts for comprehensive advisory and restructuring services.
              </p>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSchedulingModalOpen(true)}
                  className="cursor-pointer w-full bg-gradient-to-r from-sage-700 to-sage-800 text-sage-900 px-6 py-3 rounded-xl font-medium flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.location.href = "/#contact";
                  }}
                  className="cursor-pointer w-full border border-sage-700/30 text-sage-700 px-6 py-3 rounded-xl font-medium flex items-center justify-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Inquiry
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-sage-800/30 backdrop-blur-sm rounded-2xl p-8 border border-sage-700/30"
        >
          <h2 className="text-2xl font-bold text-sage-100 mb-6">
            Why Choose Adwait Artha LLP for Financial Advisory?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Expert Financial Team</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Our team of qualified financial professionals with deep expertise in accounting
                standards, regulatory requirements, and financial restructuring.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Comprehensive Approach</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Holistic financial advisory covering all aspects from statement preparation to
                restructuring and compliance management.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Regulatory Expertise</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Deep understanding of SEBI, RBI, and other regulatory requirements ensures your
                financial statements meet all compliance standards.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Proven Track Record</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Successfully advised numerous companies on financial restructuring and compliance
                matters with measurable improvements in performance.
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
