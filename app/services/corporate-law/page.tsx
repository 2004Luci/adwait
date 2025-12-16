"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import {
  Building,
  CheckCircle,
  ArrowLeft,
  Phone,
  Mail,
  Users,
  FileText,
  Calendar,
  Shield,
} from "lucide-react";
import { BackgroundElements } from "../../components/ui/BackgroundElements";
import { AnimatedText } from "../../components/ui/AnimatedText";
import { SchedulingModal } from "../../components/SchedulingModal";

export default function CorporateLawPage() {
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);

  const services = [
    "Board Meeting Management",
    "Annual General Meetings",
    "E-Voting Services",
    "Postal Ballot",
    "Statutory Compliance",
    "Corporate Governance",
    "Secretarial Services",
    "Regulatory Filings",
  ];

  const meetingServices = [
    {
      title: "Board Meetings",
      description:
        "Comprehensive support for board meetings including agenda preparation, documentation, and compliance.",
      features: [
        "Agenda Preparation",
        "Notice Circulation",
        "Minutes Drafting",
        "Compliance Reporting",
      ],
    },
    {
      title: "Annual General Meetings",
      description: "End-to-end AGM management including physical and virtual meeting arrangements.",
      features: [
        "Meeting Arrangements",
        "Proxy Management",
        "Voting Systems",
        "Regulatory Compliance",
      ],
    },
    {
      title: "E-Voting Services",
      description:
        "Modern electronic voting solutions for shareholder meetings and corporate decisions.",
      features: [
        "Online Voting Platform",
        "Secure Authentication",
        "Real-time Results",
        "Audit Trail",
      ],
    },
  ];

  const complianceAreas = [
    "Companies Act Compliance",
    "SEBI Regulations",
    "Stock Exchange Requirements",
    "Corporate Governance Norms",
    "FEMA Compliance",
    "Tax Regulations",
    "Labour Laws",
    "Environmental Laws",
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
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-500/10 text-sage-500 text-sm font-medium mb-4">
            <Building className="h-4 w-4 mr-2" />
            Corporate Law & Secretarial Services
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-sage-50 mb-6">
            <AnimatedText
              text="Corporate Law/Secretarial Services"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h1>

          <p className="text-xl text-sage-300 max-w-4xl mx-auto">
            Complete corporate law compliance and secretarial services for all types of companies.
            From board meetings to AGMs, we ensure your business operates in full compliance with
            regulatory requirements.
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
                In the field of Corporate Law, the scope of work would be to assist the companies
                (Pvt. Ltd./ Public Limited/Section 8 Companies and Listed Companies) in compliance
                with all provisions of the corporate law and related laws on a best effort basis.
                The firm provides advisory services in handling Board Meeting, Annual General
                Meeting whether physically or through e-means live video conference.
              </p>
              <p className="text-sage-300 leading-relaxed">
                Our comprehensive secretarial services ensure that your company maintains the
                highest standards of corporate governance and regulatory compliance, allowing you to
                focus on your core business operations.
              </p>
            </motion.div>

            {/* Meeting Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-sage-100">Meeting Management Services</h2>
              <div className="space-y-6">
                {meetingServices.map((service, index) => (
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
                {services.map((service, index) => (
                  <li key={index} className="flex items-center text-sage-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-sage-500 to-sage-600 rounded-full mr-3"></div>
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Compliance Areas */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-6 border border-sage-700/30"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">Compliance Areas</h3>
              <ul className="space-y-3">
                {complianceAreas.map((area, index) => (
                  <li key={index} className="flex items-center text-sage-300">
                    <Shield className="w-4 h-4 text-sage-500 mr-3 flex-shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-sage-500/10 to-sage-600/10 backdrop-blur-sm rounded-2xl p-6 border border-sage-500/20"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">Need Corporate Support?</h3>
              <p className="text-sage-300 text-sm mb-6">
                Contact our experts for comprehensive corporate law and secretarial services.
              </p>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSchedulingModalOpen(true)}
                  className="cursor-pointer w-full bg-gradient-to-r from-sage-500 to-sage-600 text-sage-900 px-6 py-3 rounded-xl font-medium flex items-center justify-center"
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
                  className="cursor-pointer w-full border border-sage-500/30 text-sage-500 px-6 py-3 rounded-xl font-medium flex items-center justify-center"
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
            Why Choose Adwait Artha LLP for Corporate Services?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Expert Team</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Our team of qualified company secretaries and legal experts ensures accurate and
                timely compliance with all corporate law requirements.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Comprehensive Coverage</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                From basic compliance to complex corporate governance matters, we provide end-to-end
                support for all your corporate law needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Technology Integration</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Modern e-voting and virtual meeting solutions ensure efficient and secure corporate
                governance processes for your organization.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Proven Track Record</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Successfully managed corporate compliance for numerous companies across various
                sectors with high client satisfaction rates.
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
