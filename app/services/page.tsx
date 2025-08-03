'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { TrendingUp, FileText, Scale, Building, Banknote, BarChart3, ArrowRight, ArrowLeft } from 'lucide-react';
import { BackgroundElements } from '../components/ui/BackgroundElements';
import { AnimatedText } from '../components/ui/AnimatedText';
import { SchedulingModal } from '../components/SchedulingModal';

export default function ServicesPage() {
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false);
  
  const services = [
    {
      id: 'ipo-sme-ipo-advisory',
      icon: <TrendingUp className="w-8 h-8 text-sage-900" />,
      title: 'IPO/SME IPO Advisory',
      description: 'The firm deals with clients as strategic partner in structuring its fund raising requirement, planning, designing, finalising end use of fund raising along with inviting strategic partners, investors, funds in pre IPO platform, valuation and tie up with various agencies involved in IPO and put the company on right platform through IPO listing.',
      features: ['Strategic Fund Raising', 'Pre-IPO Platform', 'Valuation Services', 'Investor Relations', 'Regulatory Compliance'],
      color: 'from-sage-200 to-sage-300',
      slug: 'ipo-sme-ipo-advisory'
    },
    {
      id: 'legal-drafting-audit',
      icon: <FileText className="w-8 h-8 text-sage-900" />,
      title: 'Legal Drafting, Audit & Assurance',
      description: 'The exposure in drafting of legal documents like Shareholders Agreements, Joint Venture Agreements, LLP Agreements and legal documents for government companies, JV Companies, and other aided services gives an added advantage to client. We also carry out legal and financial due diligence, search reports for banks, due diligence report for Corporate in compliance with RBI requirement, Secretarial Audit.',
      features: ['Legal Document Drafting', 'Due Diligence', 'Secretarial Audit', 'Corporate Governance', 'CSR Advisory'],
      color: 'from-sage-300 to-sage-400',
      slug: 'legal-drafting-audit'
    },
    {
      id: 'law-tribunals',
      icon: <Scale className="w-8 h-8 text-sage-900" />,
      title: 'Appearance Before Law Tribunals/Forums',
      description: 'To get the approval from various statutory forums like ROC, Regional Directors office, Office of Official Liquidator and appearance before the National Company Law Tribunal requires appearances, presentation and liasion with such department which the firm possess unique ability to perform at their best within the given time frame.',
      features: ['NCLT Representation', 'ROC Compliance', 'Regional Director Office', 'Official Liquidator', 'Legal Advocacy'],
      color: 'from-sage-400 to-sage-500',
      slug: 'law-tribunals'
    },
    {
      id: 'corporate-law',
      icon: <Building className="w-8 h-8 text-sage-900" />,
      title: 'Corporate Law/Secretarial Services',
      description: 'In the field of Corporate Law, the scope of work would be to assist the companies (Pvt. Ltd./ Public Limited/Section 8 Companies and Listed Companies) in compliance with all provisions of the corporate law and related laws on a best effort basis. The firm provides advisory services in handling Board Meeting, Annual General Meeting whether physically or through e-means live video conference.',
      features: ['Board Meetings', 'Annual General Meetings', 'E-Voting Services', 'Postal Ballot', 'Statutory Compliance'],
      color: 'from-sage-500 to-sage-600',
      slug: 'corporate-law'
    },
    {
      id: 'loan-syndication',
      icon: <Banknote className="w-8 h-8 text-sage-900" />,
      title: 'Loan Syndication, Restructuring & Project Finance',
      description: 'In the field of Finance, the firm\'s scope of work would be to assist various corporates in organizing Term Loan and Working Capital Finance and other structured loan facilities (fund based and non fund based) including funding in Foreign currency from Institution/ Banks for proposed project/ going concern on a best effort basis.',
      features: ['Term Loan & Working Capital', 'Foreign Currency Funding', 'Project Finance', 'Financial Structuring', 'Lender Coordination'],
      color: 'from-sage-600 to-sage-700',
      slug: 'loan-syndication'
    },
    {
      id: 'financial-advisory',
      icon: <BarChart3 className="w-8 h-8 text-sage-900" />,
      title: 'Financial Statement Advisory/Structuring/Restructuring',
      description: 'The Firm\'s strength lies in its partner\'s ability to advise on presentation of financial statement, its advisory on how the financial of the client\'s shall be presented in annual statement, disclosure requirements, Governance compliance, transparency and assist and advising client on structuring and restructuring of financial on need based requirement.',
      features: ['Financial Statement Advisory', 'Disclosure Requirements', 'Governance Compliance', 'Financial Restructuring', 'Strategic Planning'],
      color: 'from-sage-700 to-sage-800',
      slug: 'financial-advisory'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-900 via-black to-sage-800">
      {/* Background Elements */}
      <BackgroundElements 
        showGrid={true}
        showFloatingElements={true}
        showCornerElements={true}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Back Button */}
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

        {/* Header */}
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
            Discover our six core services designed to meet all your financial, legal, and corporate advisory needs. 
            Each service is tailored to provide comprehensive solutions for businesses at every stage of growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative bg-sage-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-sage-700/30 h-full overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-full transform translate-x-8 -translate-y-8 transition-all duration-300 group-hover:scale-150`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  {service.icon}
                </motion.div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-sage-100 mb-4">{service.title}</h3>
                <p className="text-sage-300 mb-6 leading-relaxed">{service.description}</p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sage-300">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-sage-800/30 backdrop-blur-sm rounded-2xl p-12 border border-sage-700/30"
        >
          <h2 className="text-3xl font-bold text-sage-50 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-sage-300 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you navigate the complexities of financial services. 
            Contact us today to discuss your specific needs and discover how we can support your business growth.
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
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="cursor-pointer border border-sage-200/30 text-sage-200 px-8 py-4 rounded-xl hover:bg-sage-200/10 transition-all duration-300"
            >
              Contact Us
            </motion.button>
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