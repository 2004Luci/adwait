'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { BackgroundElements } from './ui/BackgroundElements';
import { AnimatedText } from './ui/AnimatedText';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
  email: z.string().email("Please enter a valid email address"),
  company: z.string().max(100, "Company name must be less than 100 characters").optional(),
  phone: z.string()
    .regex(/^\+?[0-9\s\-\(\)]+$/, "Phone number can only contain numbers, spaces, hyphens, and parentheses")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .optional()
    .or(z.literal('')),
  service: z.string()
    .min(1, "Please select a service"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      message: ''
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Send the form data to the API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          // Rate limiting error
          const remainingTime = errorData.remainingTime || 60;
          throw new Error(`Too many contact form submissions. Please wait ${remainingTime} seconds before trying again.`);
        }
        throw new Error(errorData.message || 'Failed to send message');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Show success toast with more details
      toast.success("Message sent successfully!", {
        description: `Thank you ${data.name}! We'll get back to you at ${data.email} within 24 hours.`,
        duration: 5000,
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      console.error('Form submission error:', error);
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Please check your internet connection and try again. If the problem persists, please contact us directly.",
        duration: 6000,
      });
    }
  };

  const onError = (errors: any) => {
    // Show a toast with the number of errors
    const errorCount = Object.keys(errors).length;
    toast.error(`Please fix ${errorCount} error${errorCount > 1 ? 's' : ''} in the form`, {
      description: "Please review the highlighted fields and correct the errors.",
      duration: 4000,
    });
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      title: 'Email',
              details: ['contact@adwaitartha.com'],
      color: 'from-sage-200 to-sage-300'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 7940305119'],
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
    'Regulatory Compliance',
    'Other'
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sage-200 font-medium data-[error=true]:text-sage-200">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your full name"
                              className="bg-sage-700/50 border-sage-600/30 text-sage-100 placeholder-sage-400 focus:ring-sage-200/50 focus:border-sage-200/50"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sage-200 font-medium data-[error=true]:text-sage-200">
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email"
                              className="bg-sage-700/50 border-sage-600/30 text-sage-100 placeholder-sage-400 focus:ring-sage-200/50 focus:border-sage-200/50"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sage-200 font-medium data-[error=true]:text-sage-200">
                            Company Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter company name"
                              className="bg-sage-700/50 border-sage-600/30 text-sage-100 placeholder-sage-400 focus:ring-sage-200/50 focus:border-sage-200/50"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sage-200 font-medium data-[error=true]:text-sage-200">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="Enter phone number"
                              className="bg-sage-700/50 border-sage-600/30 text-sage-100 placeholder-sage-400 focus:ring-sage-200/50 focus:border-sage-200/50"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sage-200 font-medium data-[error=true]:text-sage-200">
                          Service Required *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-sage-700/50 border-sage-600/30 text-sage-100 focus:ring-sage-200/50 focus:border-sage-200/50">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-sage-700 text-sage-100 border-sage-600">
                            {services.map((service, index) => (
                              <SelectItem key={index} value={service} className="cursor-pointer hover:bg-sage-600">
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sage-200 font-medium data-[error=true]:text-sage-200">
                          Message *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            placeholder="Tell us about your requirements..."
                            className="bg-sage-700/50 border-sage-600/30 text-sage-100 placeholder-sage-400 focus:ring-sage-200/50 focus:border-sage-200/50 resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

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
              </Form>
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