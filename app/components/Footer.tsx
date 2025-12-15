'use client';

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, ArrowUp } from 'lucide-react';
import { BackgroundElements } from './ui/BackgroundElements';
import { AnimatedText } from './ui/AnimatedText';
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from './ui/social-icons';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      { name: 'IPO Advisory', href: '/services/ipo-sme-ipo-advisory' },
      { name: 'Legal Drafting & Audit', href: '/services/legal-drafting-audit' },
      { name: 'Corporate Law Services', href: '/services/corporate-law' },
      { name: 'Loan Syndication', href: '/services/loan-syndication' },
      { name: 'Financial Advisory', href: '/services/financial-advisory' },
      { name: 'Regulatory Compliance', href: '/services/law-tribunals' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' }
    ],
    resources: [
      'Blog',
      'Newsletter',
      'Whitepapers',
      'Webinars',
      'FAQ',
      'Support'
    ],
    legal: [
      'Privacy Policy',
      'Terms of Service',
      'Cookie Policy',
      'Disclaimer',
      'Compliance',
      'GDPR'
    ]
  };

  const socialLinks = [
    { icon: FacebookIcon, href: '#', label: 'Facebook' },
    { icon: XIcon, href: '#', label: 'Twitter' },
    { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
    { icon: InstagramIcon, href: '#', label: 'Instagram' }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: '518, Anand Mangal - III, Opp. Core House, Rajnagar Club Lane, Ambawadi, Ahmedabad - 380006'
    },
    {
      icon: Phone,
      text: '+91-79-40305119'
    },
    {
      icon: Mail,
      text: 'contact@adwaitartha.com'
    },
    {
      icon: Clock,
      text: 'Mon - Fri: 9:00 AM - 6:00 PM'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-sage-200 via-sage-300 to-sage-400 overflow-hidden">
      <BackgroundElements
        showGrid={true}
        showFloatingElements={false}
        showCornerElements={false}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="col-span-2 lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-sage-900 mb-4 md:mb-6">
                  <AnimatedText
                    text="Adwait Artha LLP"
                    className="text-sage-900"
                    delay={200}
                    staggerDelay={0.1}
                  />
                </h3>
                <p className="text-xs md:text-sm text-sage-800 leading-relaxed mb-4 md:mb-6">
                  Leading financial advisory firm with over 23 years of experience in IPO advisory,
                  corporate law, and regulatory compliance. We help businesses navigate complex
                  financial landscapes with confidence and precision.
                </p>

                {/* Contact Info */}
                <div className="space-y-2 md:space-y-3">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-2 md:gap-3 text-sage-800">
                      <info.icon className="w-3 h-3 md:w-4 md:h-4 text-sage-700 mt-0.5 flex-shrink-0" />
                      <span
                        className={`text-xs md:text-sm ${info.icon === MapPin ? 'cursor-pointer hover:text-sage-900 transition-colors duration-300' : ''}`}
                        onClick={info.icon === MapPin ? () => {
                          const mapSection = document.querySelector('footer .py-12.border-t');
                          if (mapSection) {
                            mapSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        } : undefined}
                      >
                        {info.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm md:text-lg font-semibold text-sage-900 mb-3 md:mb-6">Our Services</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-sage-800 hover:text-sage-900 transition-colors duration-300 text-xs md:text-sm"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm md:text-lg font-semibold text-sage-900 mb-3 md:mb-6">Company</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.company.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-sage-800 hover:text-sage-900 transition-colors duration-300 text-xs md:text-sm"
                      onClick={(e) => {
                        if (item.href.startsWith('#')) {
                          e.preventDefault();
                          const element = document.querySelector(item.href);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources - Mobile only */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="block lg:hidden"
            >
              <h4 className="text-sm font-semibold text-sage-900 mb-3">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-sage-800 hover:text-sage-900 transition-colors duration-300 text-xs"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal - Mobile only */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="block lg:hidden"
            >
              <h4 className="text-sm font-semibold text-sage-900 mb-3">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-sage-800 hover:text-sage-900 transition-colors duration-300 text-xs"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources & Legal - Desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <h4 className="text-lg font-semibold text-sage-900 mb-6">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-sage-800 hover:text-sage-900 transition-colors duration-300 text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-sage-900 mb-6">Legal</h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-sage-800 hover:text-sage-900 transition-colors duration-300 text-sm"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Google Maps Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="py-12 border-t border-sage-300/50"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-sage-900 mb-4">Visit Our Office</h3>
            <p className="text-sage-800 max-w-2xl mx-auto">
              Located in the heart of Ahmedabad, our office is easily accessible and provides a professional environment for all your financial advisory needs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-sage-200/50">
              <iframe
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=518+Anand+Mangal+III+Opp+Core+House+Rajnagar+Club+Lane+Ambawadi+Ahmedabad+380006+India"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Adwait Artha LLP Office Location"
                className="absolute inset-0"
              />

              {/* Map Overlay with Office Info */}
              <div className="absolute top-4 left-4 bg-sage-900/90 backdrop-blur-sm rounded-xl p-4 text-sage-100 shadow-lg border border-sage-200/20">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-sage-200" />
                  <h4 className="font-semibold text-sage-100">Adwait Artha LLP</h4>
                </div>
                <p className="text-sm text-sage-200 leading-relaxed">
                  518, Anand Mangal - III<br />
                  Opp. Core House, Rajnagar Club Lane<br />
                  Ambawadi, Ahmedabad - 380006
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="border-t border-sage-300/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-sage-800 text-sm"
            >
              © {new Date().getFullYear()} Adwait Artha LLP. All rights reserved.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-sage-700/20 backdrop-blur-sm rounded-full flex items-center justify-center text-sage-800 hover:bg-sage-700/30 hover:text-sage-900 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer w-10 h-10 bg-sage-700/20 backdrop-blur-sm rounded-full flex items-center justify-center text-sage-800 hover:bg-sage-700/30 hover:text-sage-900 transition-all duration-300"
              aria-label="Back to top"
              title='Back to Top'
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}