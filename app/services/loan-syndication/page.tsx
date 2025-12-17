"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import {
  Banknote,
  CheckCircle,
  ArrowLeft,
  Phone,
  Mail,
  TrendingUp,
  Building,
  Globe,
} from "lucide-react";
import { SchedulingModal } from "../../components/SchedulingModal";
import { BackgroundElements } from "../../components/ui/BackgroundElements";
import { AnimatedText } from "../../components/ui/AnimatedText";
import {
  loanSyndicationServices,
  loanSyndicationFinanceTypes,
  loanSyndicationProjectTypes,
} from "@/lib/constants";

export default function LoanSyndicationPage() {
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);

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
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-600/10 text-sage-600 text-sm font-medium mb-4">
            <Banknote className="h-4 w-4 mr-2" />
            Loan Syndication & Project Finance
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-sage-50 mb-6">
            <AnimatedText
              text="Loan Syndication, Restructuring & Project Finance"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h1>

          <p className="text-xl text-sage-300 max-w-4xl mx-auto">
            Comprehensive financial solutions including term loans, working capital, foreign
            currency funding, and project finance. We help businesses secure optimal financing
            structures for growth and expansion.
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
                In the field of Finance, the firm's scope of work would be to assist various
                corporates in organizing Term Loan and Working Capital Finance and other structured
                loan facilities (fund based and non fund based) including funding in Foreign
                currency from Institution/ Banks for proposed project/ going concern on a best
                effort basis.
              </p>
              <p className="text-sage-300 leading-relaxed">
                Our expertise in loan syndication and project finance helps businesses secure the
                right financing mix, optimize capital structure, and achieve their growth objectives
                through strategic financial planning.
              </p>
            </motion.div>

            {/* Finance Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-sage-100">Types of Financing We Arrange</h2>
              <div className="space-y-6">
                {loanSyndicationFinanceTypes.map((type, index) => (
                  <motion.div
                    key={type.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-sage-800/30 backdrop-blur-sm rounded-xl p-6 border border-sage-700/20"
                  >
                    <h3 className="text-lg font-semibold text-sage-100 mb-3">{type.title}</h3>
                    <p className="text-sage-300 text-sm leading-relaxed mb-4">{type.description}</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {type.features.map((feature, featureIndex) => (
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
                {loanSyndicationServices.map((service, index) => (
                  <li key={index} className="flex items-center text-sage-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-sage-600 to-sage-700 rounded-full mr-3"></div>
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Project Types */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-6 border border-sage-700/30"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">Project Types We Finance</h3>
              <ul className="space-y-3">
                {loanSyndicationProjectTypes.map((project, index) => (
                  <li key={index} className="flex items-center text-sage-300">
                    <Building className="w-4 h-4 text-sage-600 mr-3 flex-shrink-0" />
                    {project}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-sage-600/10 to-sage-700/10 backdrop-blur-sm rounded-2xl p-6 border border-sage-600/20"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">Need Financing Support?</h3>
              <p className="text-sage-300 text-sm mb-6">
                Contact our financial experts for comprehensive loan syndication and project finance
                services.
              </p>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer w-full bg-gradient-to-r from-sage-600 to-sage-700 text-sage-900 px-6 py-3 rounded-xl font-medium flex items-center justify-center"
                  onClick={() => setIsSchedulingModalOpen(true)}
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
                  className="cursor-pointer w-full border border-sage-600/30 text-sage-600 px-6 py-3 rounded-xl font-medium flex items-center justify-center"
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
            Why Choose Adwait Artha LLP for Financial Services?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Extensive Network</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Strong relationships with banks, financial institutions, and lenders across India
                and internationally, ensuring access to the best financing options.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Expert Financial Team</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Our team of financial experts with deep understanding of various financing
                structures, regulatory requirements, and market conditions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Customized Solutions</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Tailored financial solutions based on your business requirements, risk profile, and
                growth objectives, ensuring optimal capital structure.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">End-to-End Support</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Complete support from initial assessment to loan disbursement and ongoing
                relationship management with lenders and financial institutions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scheduling Modal */}
        <SchedulingModal
          isOpen={isSchedulingModalOpen}
          onClose={() => setIsSchedulingModalOpen(false)}
        />
      </div>
    </div>
  );
}
