"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { FileText, CheckCircle, Shield, ArrowLeft, Phone, Mail, Search, Users } from "lucide-react";
import { SchedulingModal } from "../../components/SchedulingModal";
import { BackgroundElements } from "../../components/ui/BackgroundElements";
import { AnimatedText } from "../../components/ui/AnimatedText";
import {
  legalDraftingServices,
  legalDraftingDocumentTypes,
  legalDraftingAuditServices,
} from "@/lib/constants";

export default function LegalDraftingAuditPage() {
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState<boolean>(false);

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
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-300/10 text-sage-300 text-sm font-medium mb-4">
            <FileText className="h-4 w-4 mr-2" />
            Legal Drafting, Audit & Assurance
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-sage-50 mb-6">
            <AnimatedText
              text="Legal Drafting, Audit & Assurance Services"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h1>

          <p className="text-xl text-sage-300 max-w-4xl mx-auto">
            Comprehensive legal services including document drafting, due diligence, secretarial
            audit, and corporate governance advisory. Our expertise ensures your business operates
            in full compliance with all regulatory requirements.
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
                The exposure in drafting of legal documents like Shareholders Agreements, Joint
                Venture Agreements, LLP Agreements and legal documents for government companies, JV
                Companies, and other aided services gives an added advantage to client. We also
                carry out legal and financial due diligence, search reports for banks, due diligence
                report for Corporate in compliance with RBI requirement, Secretarial Audit.
              </p>
              <p className="text-sage-300 leading-relaxed">
                Our team of legal experts provides comprehensive support in all aspects of corporate
                legal requirements, ensuring your business maintains the highest standards of
                compliance and governance.
              </p>
            </motion.div>

            {/* Audit Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-sage-100">Our Audit & Assurance Services</h2>
              <div className="space-y-6">
                {legalDraftingAuditServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-sage-800/30 backdrop-blur-sm rounded-xl p-6 border border-sage-700/20"
                  >
                    <h3 className="text-lg font-semibold text-sage-100 mb-3">{service.title}</h3>
                    <p className="text-sage-300 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
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
                {legalDraftingServices.map((service, index) => (
                  <li key={index} className="flex items-center text-sage-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full mr-3"></div>
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Document Types */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-6 border border-sage-700/30"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">Document Types We Draft</h3>
              <ul className="space-y-3">
                {legalDraftingDocumentTypes.map((docType, index) => (
                  <li key={index} className="flex items-center text-sage-300">
                    <FileText className="w-4 h-4 text-sage-300 mr-3 flex-shrink-0" />
                    {docType}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-sage-300/10 to-sage-400/10 backdrop-blur-sm rounded-2xl p-6 border border-sage-300/20"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">Need Legal Support?</h3>
              <p className="text-sage-300 text-sm mb-6">
                Contact our legal experts for comprehensive drafting and audit services.
              </p>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer w-full bg-gradient-to-r from-sage-300 to-sage-400 text-sage-900 px-6 py-3 rounded-xl font-medium flex items-center justify-center"
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
                  className="cursor-pointer w-full border border-sage-300/30 text-sage-300 px-6 py-3 rounded-xl font-medium flex items-center justify-center"
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
            Why Choose Adwait Artha LLP for Legal Services?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Expert Legal Team</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Our team comprises experienced legal professionals with deep expertise in corporate
                law, regulatory compliance, and document drafting.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Comprehensive Coverage</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                From basic document drafting to complex due diligence and audit services, we provide
                end-to-end legal support for all your business needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Regulatory Expertise</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Deep understanding of SEBI, RBI, and other regulatory requirements ensures your
                business stays compliant with all legal obligations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Proven Track Record</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Successfully handled numerous legal matters for clients across various sectors, with
                a focus on quality and timely delivery.
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
