'use client';

import { motion } from 'motion/react';
import { Award, Users, Globe, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BackgroundElements } from './ui/BackgroundElements';
import { AnimatedText } from './ui/AnimatedText';

export function AboutSection() {
  const partners = [
    {
      name: 'Sandip Sheth',
      role: 'FCS, LLb (Sp) - Founder Promoter',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      expertise: ['Fund Raising', 'Corporate Laws', 'Legal Drafting', 'Banking & Finance'],
      experience: '23 years of experience',
      description: 'He is founder promoter and having 23 years of experience in fund raising, planning, valuation, Corporate Laws, Secretarial, Legal, Drafting, accounts, banking and finance. He has been instrumental in helping many corporate in preparation of MIS, cost reduction & cost control and cost system set up.'
    },
    {
      name: 'Prashant Prajapati',  
      role: 'ACS - Partner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      expertise: ['Company Law', 'FEMA', 'SEBI', 'Corporate Laws'],
      experience: '14 years of experience',
      description: 'He is having 14 years of experience in Company Law, FEMA, SEBI and other Corporate Laws. He is having in depth knowledge and expertise in eXtensible Business Reporting Language, drafting and vetting of various agreements, letters, and contracts.'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Industry Recognition',
      description: '23+ years of excellence in financial advisory services with proven track record and multi-disciplinary expertise.',
      color: 'from-sage-200 to-sage-300'
    },
    {
      icon: Users,
      title: 'Diverse Client Base',
      description: '22+ valued clients including listed companies from Pharmaceuticals, IT, Chemical, Infrastructure, and other sectors.',
      color: 'from-sage-300 to-sage-400'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving clients across Gujarat, Maharashtra, and international markets including USA, Netherlands, and Singapore.',
      color: 'from-sage-400 to-sage-500'
    },
    {
      icon: Shield,
      title: 'Regulatory Expertise',
      description: 'Expert representation before ROC, Regional Directors, NCLT, SEBI and other regulatory bodies with unique ability to perform within given time frames.',
      color: 'from-sage-500 to-sage-600'
    }
  ];

  const clientLogos = [
    'Stovec Industries Limited',
    'Accent Microcell Limited',
    'Bosch Rexroth (India)',
    'Diamines & Chemicals Limited',
    'Silver Touch Technologies',
    'Royal Arc Electrodes',
    'Maahi Milk Producer',
    'Mahavir Inducto-melt',
    'Sheetal Motors',
    'Brand Aid Pvt. Ltd.',
    'Advatech Group',
    'Aneta Pharmaceuticals',
    'JB Group of Hotels',
    'Rajkamal Builders',
    'Polo plus Pipes',
    'Pan-Asia Petroleum',
    'Pellucid Lifesciences',
    'Swarnim Gujarat Fluorspar',
    'Mangalmurti Polymers',
    'DACL Finechem Limited'
  ];

  return (
    <section id="about" className="relative py-24 bg-gradient-to-br from-sage-800 via-sage-900 to-black overflow-hidden">
      {/* Background Elements */}
      <BackgroundElements 
        showGrid={true}
        showFloatingElements={true}
        showCornerElements={false}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-200/10 text-sage-200 text-sm font-medium mb-4">
            <Award className="h-4 w-4 mr-2" />
            Our Story
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-sage-50 mb-6">
            <AnimatedText 
              text="About Adwait Artha LLP"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h2>
          <p className="text-xl text-sage-300 max-w-3xl mx-auto">
            Adwait Artha LLP is a prestigious financial advisory firm headquartered in Ahmedabad, Gujarat, 
            delivering exceptional financial and legal services for over two decades. Our clientele is located all over Gujarat, Maharashtra and overseas at USA, Netherland, Singapore etc.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-sage-100 mb-4">
                <AnimatedText 
                  text="Two Decades of Excellence"
                  className="text-sage-100"
                  delay={400}
                  staggerDelay={0.1}
                />
              </h3>
              <p className="text-sage-300 leading-relaxed">
                The Firm "Adwait Artha LLP" is in the field of fund raising, equity capital market (IPO's) primary market or secondary market, debt syndication, corporate law, finance, management audit, budgeting, legal drafting and other related areas. With 23+ years of experience and a team of dedicated professionals, we provide niche solutions to our valued clients.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-sage-100 mb-4">
                <AnimatedText 
                  text="Our Mission"
                  className="text-sage-100"
                  delay={600}
                  staggerDelay={0.1}
                />
              </h3>
              <p className="text-sage-300 leading-relaxed">
                To provide comprehensive financial advisory services that empower businesses to achieve their growth objectives through strategic planning, regulatory compliance, and innovative solutions. We strive to be the trusted partner for all financial and legal needs.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-sage-100 mb-4">
                <AnimatedText 
                  text="Our Vision"
                  className="text-sage-100"
                  delay={800}
                  staggerDelay={0.1}
                />
              </h3>
              <p className="text-sage-300 leading-relaxed">
                To be the leading financial advisory firm in India, recognized for our expertise, integrity, and commitment to client success. We aim to create lasting value for our clients through innovative solutions and exceptional service delivery.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Glow effect behind the image */}
              <div className="absolute inset-0 bg-gradient-to-br from-sage-200/20 to-sage-300/20 rounded-2xl blur-xl scale-110"></div>
              
              {/* Image container with border and shadow */}
              <div className="relative bg-gradient-to-br from-sage-800/50 to-sage-900/50 backdrop-blur-sm border border-sage-700/30 rounded-2xl p-4 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=800&fit=crop&crop=center"
                  alt="Professional business meeting"
                  className="w-full h-[600px] object-cover rounded-xl"
                />
              </div>
              
              {/* Floating elements around the image */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-sage-200 to-sage-300 rounded-full opacity-60"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full opacity-40"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Partners Section */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-sage-50 text-center mb-12"
          >
            <AnimatedText 
              text="Our Leadership Team"
              className="text-sage-50"
              delay={1000}
              staggerDelay={0.1}
            />
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-8 border border-sage-700/30"
              >
                <div className="flex items-start space-x-6">
                  <ImageWithFallback
                    src={partner.image}
                    alt={partner.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-sage-100 mb-2">{partner.name}</h4>
                    <p className="text-sage-300 mb-4">{partner.role}</p>
                    <p className="text-sage-400 text-sm mb-4">{partner.experience}</p>
                    <p className="text-sage-300 text-sm leading-relaxed">{partner.description}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {partner.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-sage-700/50 text-sage-200 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-sage-50 text-center mb-12"
          >
            <AnimatedText 
              text="Key Achievements"
              className="text-sage-50"
              delay={1200}
              staggerDelay={0.1}
            />
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <achievement.icon className="w-8 h-8 text-sage-900" />
                </div>
                <h4 className="text-lg font-semibold text-sage-100 mb-2">{achievement.title}</h4>
                <p className="text-sage-300 text-sm leading-relaxed">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Client Logos Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-sage-50 text-center mb-12"
          >
            <AnimatedText 
              text="Trusted by Leading Companies"
              className="text-sage-50"
              delay={1400}
              staggerDelay={0.1}
            />
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-sage-800/30 backdrop-blur-sm rounded-lg p-4 border border-sage-700/20 text-center hover:bg-sage-700/40 transition-all duration-300"
              >
                <p className="text-sage-200 text-sm font-medium">{logo}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}