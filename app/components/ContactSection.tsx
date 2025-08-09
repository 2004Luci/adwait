'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { BackgroundElements } from './ui/BackgroundElements';
import { AnimatedText } from './ui/AnimatedText';
import { z } from 'zod';
import { toast } from 'sonner';

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  details: string[];
  color: string;
  clickable?: boolean;
}

// Zod validation schema for contact form
const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.email("Please enter a valid email address"),
  company: z.optional(z.string().max(100, "Company name must be less than 100 characters")),
  phone: z.optional(z.string().regex(/^\+?[0-9\s\-\(\)]+$/, "Phone number can only contain numbers, spaces, hyphens, and parentheses")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")),
  service: z.string()
    .min(1, "Please select a service"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data using Zod
    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Partial<ContactFormData> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as keyof ContactFormData] = issue.message;
        }
      });
      setErrors(newErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: ''
        });
        setErrors({});
      }, 3000);

      toast.success("Message sent successfully! We'll get back to you soon.");
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      title: 'Email',
      details: ['info@adwaitartha.com', 'support@adwaitartha.com'],
      color: 'from-sage-200 to-sage-300'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91-79-40305119'],
      color: 'from-sage-300 to-sage-400'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['518, Anand Mangal - III, Opp. Core House', 'Rajnagar Club Lane, Ambawadi, Ahmedabad - 380006'],
      color: 'from-sage-400 to-sage-500',
      clickable: true
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 10:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      color: 'from-sage-500 to-sage-600'
    }
  ];

  const services = [
    'IPO Advisory',
    'Legal Drafting & Audit',
    'Corporate Law Services',
    'Loan Syndication',
    'Financial Advisory',
    'Regulatory Compliance'
  ];

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-sage-300 via-sage-400 to-sage-500 overflow-hidden">
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
            <Mail className="h-4 w-4 mr-2" />
            Get In Touch
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-sage-50 mb-6">
            <AnimatedText
              text="Let's Start a Conversation"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h2>
          <p className="text-xl text-sage-300 max-w-3xl mx-auto">
            Ready to take your business to the next level? Contact our expert team
            for personalized financial advisory services tailored to your needs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-8 border border-sage-700/30"
          >
            <h3 className="text-2xl font-bold text-sage-100 mb-6">Send us a Message</h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-sage-200 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-sage-100 mb-2">Message Sent!</h4>
                <p className="text-sage-300">Thank you for contacting us. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sage-200 font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-sage-700/50 border rounded-lg text-sage-100 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200/50 focus:border-sage-200/50 transition-all ${errors.name ? 'border-red-500' : 'border-sage-600/30'
                        }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sage-200 font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-sage-700/50 border rounded-lg text-sage-100 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200/50 focus:border-sage-200/50 transition-all ${errors.email ? 'border-red-500' : 'border-sage-600/30'
                        }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sage-200 font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-sage-700/50 border rounded-lg text-sage-100 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200/50 focus:border-sage-200/50 transition-all ${errors.company ? 'border-red-500' : 'border-sage-600/30'
                        }`}
                      placeholder="Enter company name"
                    />
                    {errors.company && (
                      <p className="text-red-400 text-xs mt-1">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sage-200 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-sage-700/50 border rounded-lg text-sage-100 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200/50 focus:border-sage-200/50 transition-all ${errors.phone ? 'border-red-500' : 'border-sage-600/30'
                        }`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sage-200 font-medium mb-2">
                    Service Required *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`cursor-pointer w-full px-4 py-3 bg-sage-700/50 border rounded-lg text-sage-100 focus:outline-none focus:ring-2 focus:ring-sage-200/50 focus:border-sage-200/50 transition-all ${errors.service ? 'border-red-500' : 'border-sage-600/30'
                      }`}
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service} className="cursor-pointer bg-sage-700 text-sage-100">
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-xs mt-1">{errors.service}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sage-200 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-sage-700/50 border rounded-lg text-sage-100 placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200/50 focus:border-sage-200/50 transition-all resize-none ${errors.message ? 'border-red-500' : 'border-sage-600/30'
                      }`}
                    placeholder="Tell us about your requirements..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 py-4 rounded-lg font-semibold hover:from-sage-100 hover:to-sage-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-sage-900 border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-sage-100 mb-6">Contact Information</h3>
              <p className="text-sage-300 leading-relaxed mb-8">
                Get in touch with our expert team for personalized financial advisory services.
                We're here to help you navigate complex financial landscapes with confidence.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <info.icon className="w-6 h-6 text-sage-900" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-sage-100 mb-2">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p
                        key={detailIndex}
                        className={`text-sage-300 ${info.clickable ? 'cursor-pointer hover:text-sage-200 transition-colors duration-300' : ''}`}
                        onClick={info.clickable ? () => {
                          const footer = document.querySelector('footer');
                          if (footer) {
                            footer.scrollIntoView({ behavior: 'smooth' });
                          }
                        } : undefined}
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map or Additional Info */}
            <div className="bg-sage-800/30 backdrop-blur-sm rounded-2xl p-6 border border-sage-700/20">
              <h4 className="text-lg font-semibold text-sage-100 mb-4">Why Choose Us?</h4>
              <ul className="space-y-2 text-sage-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sage-200 rounded-full"></div>
                  23+ years of industry experience
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sage-200 rounded-full"></div>
                  Expert regulatory compliance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sage-200 rounded-full"></div>
                  Personalized service approach
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-sage-200 rounded-full"></div>
                  Proven track record of success
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}