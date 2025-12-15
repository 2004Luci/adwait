'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import Link from 'next/link';
import { Scale, CheckCircle, ArrowLeft, Phone, Mail, Shield } from 'lucide-react';
import { SchedulingModal } from '../../components/SchedulingModal';
import { BackgroundElements } from '../../components/ui/BackgroundElements';
import { AnimatedText } from '../../components/ui/AnimatedText';

export default function LawTribunalsPage() {
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState<boolean>(false);
  const services = [
    'NCLT Representation',
    'ROC Compliance & Filings',
    'Regional Director Office',
    'Official Liquidator',
    'Legal Advocacy',
    'Regulatory Liaison',
    'Compliance Advisory',
    'Legal Documentation'
  ];

  const tribunals = [
    {
      name: 'National Company Law Tribunal (NCLT)',
      description: 'Representation in company law matters, mergers, acquisitions, and insolvency proceedings.',
      cases: ['Merger & Acquisition', 'Insolvency Proceedings', 'Corporate Disputes', 'Compliance Matters']
    },
    {
      name: 'Registrar of Companies (ROC)',
      description: 'Liaison and compliance with ROC requirements, filings, and regulatory submissions.',
      cases: ['Annual Filings', 'Compliance Reports', 'Regulatory Submissions', 'Documentation']
    },
    {
      name: 'Regional Director Office',
      description: 'Representation before Regional Directors for various corporate law matters.',
      cases: ['Approval Applications', 'Compliance Matters', 'Regulatory Filings', 'Legal Advocacy']
    },
    {
      name: 'Official Liquidator',
      description: 'Assistance in liquidation proceedings and related legal matters.',
      cases: ['Liquidation Proceedings', 'Asset Management', 'Creditor Coordination', 'Legal Compliance']
    }
  ];

  const expertise = [
    '23+ Years of Experience',
    'Deep Regulatory Knowledge',
    'Proven Track Record',
    'Timely Resolution',
    'Cost-Effective Solutions',
    'Comprehensive Support'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-900 via-black to-sage-800">
      <BackgroundElements 
        showGrid={true}
        showFloatingElements={true}
        showCornerElements={true}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/services" className="inline-flex items-center text-sage-300 hover:text-sage-200 transition-colors">
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
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-400/10 text-sage-400 text-sm font-medium mb-4">
            <Scale className="h-4 w-4 mr-2" />
            Law Tribunals & Forums
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-sage-50 mb-6">
            <AnimatedText 
              text="Appearance Before Law Tribunals/Forums"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h1>
          
          <p className="text-xl text-sage-300 max-w-4xl mx-auto">
            Expert representation before NCLT, ROC, Regional Directors office, and other statutory forums. 
            Our unique ability to perform within given time frames ensures successful outcomes for your legal matters.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-8 border border-sage-700/30"
            >
              <h2 className="text-2xl font-bold text-sage-100 mb-6">Service Overview</h2>
              <p className="text-sage-300 leading-relaxed mb-6">
                To get the approval from various statutory forums like ROC, Regional Directors office, Office of Official Liquidator 
                and appearance before the National Company Law Tribunal requires appearances, presentation and liasion with such 
                department which the firm possess unique ability to perform at their best within the given time frame.
              </p>
              <p className="text-sage-300 leading-relaxed">
                Our team of legal experts specializes in representing clients before various regulatory bodies and tribunals, 
                ensuring your interests are protected and matters are resolved efficiently and effectively.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-sage-100">Tribunals & Forums We Represent</h2>
              <div className="space-y-6">
                {tribunals.map((tribunal, index) => (
                  <motion.div
                    key={tribunal.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-sage-800/30 backdrop-blur-sm rounded-xl p-6 border border-sage-700/20"
                  >
                    <h3 className="text-lg font-semibold text-sage-100 mb-3">{tribunal.name}</h3>
                    <p className="text-sage-300 text-sm leading-relaxed mb-4">{tribunal.description}</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {tribunal.cases.map((caseType, caseIndex) => (
                        <div key={caseIndex} className="flex items-center text-sage-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-sage-200 mr-2 flex-shrink-0" />
                          {caseType}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="space-y-8">
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
                    <div className="w-2 h-2 bg-gradient-to-r from-sage-400 to-sage-500 rounded-full mr-3"></div>
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-6 border border-sage-700/30"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">Our Expertise</h3>
              <ul className="space-y-3">
                {expertise.map((item, index) => (
                  <li key={index} className="flex items-center text-sage-300">
                    <Shield className="w-4 h-4 text-sage-400 mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-sage-400/10 to-sage-500/10 backdrop-blur-sm rounded-2xl p-6 border border-sage-400/20"
            >
              <h3 className="text-xl font-bold text-sage-100 mb-4">Need Legal Representation?</h3>
              <p className="text-sage-300 text-sm mb-6">
                Contact our legal experts for professional tribunal representation.
              </p>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer w-full bg-gradient-to-r from-sage-400 to-sage-500 text-sage-900 px-6 py-3 rounded-xl font-medium flex items-center justify-center"
                 onClick={() => setIsSchedulingModalOpen(true)}>
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.location.href = '/#contact';
                  }}
                  className="cursor-pointer w-full border border-sage-400/30 text-sage-400 px-6 py-3 rounded-xl font-medium flex items-center justify-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Inquiry
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-sage-800/30 backdrop-blur-sm rounded-2xl p-8 border border-sage-700/30"
        >
          <h2 className="text-2xl font-bold text-sage-100 mb-6">Why Choose Adwait Artha LLP for Tribunal Representation?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Expert Legal Team</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Our team has extensive experience in representing clients before various tribunals and regulatory bodies, 
                with deep understanding of procedural requirements.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Timely Resolution</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                We understand the importance of time in legal matters and work efficiently to ensure 
                your cases are resolved within the stipulated time frames.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Regulatory Expertise</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Deep knowledge of regulatory requirements and procedures ensures smooth navigation 
                through complex legal processes and better outcomes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-sage-100 mb-3">Proven Track Record</h3>
              <p className="text-sage-300 text-sm leading-relaxed">
                Successfully represented numerous clients before various tribunals with high success rates 
                and satisfied clients across different sectors.
              </p>
            </div>
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