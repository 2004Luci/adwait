'use client';

import { motion } from 'motion/react';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { BackgroundElements } from '../components/ui/BackgroundElements';
import { AnimatedText } from '../components/ui/AnimatedText';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { openPositions, benefits } from '../../lib/constants';

export default function CareersPage() {
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-900 via-black to-sage-800">
      <BackgroundElements
        showGrid={true}
        showFloatingElements={true}
        showCornerElements={true}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-200/10 text-sage-200 text-sm font-medium mb-4">
            <Briefcase className="h-4 w-4 mr-2" />
            Career Opportunities
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-sage-50 mb-6">
            <AnimatedText 
              text="Join Our Team"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h1>
          <p className="text-xl text-sage-300 max-w-3xl mx-auto">
            Build your career with Adwait Artha LLP and be part of a team that's shaping the future of legal and financial services in India.
          </p>
        </motion.div>
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sage-50 mb-4">
              Why Join Adwait Artha LLP?
            </h2>
            <p className="text-lg text-sage-300 max-w-2xl mx-auto">
              We offer more than just a job - we provide a platform for growth, learning, and making a real impact in the legal and financial world.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="h-full bg-sage-800/50 backdrop-blur-sm border-sage-700/30 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sage-200/20 to-sage-300/20 opacity-5 rounded-full transform translate-x-8 -translate-y-8 transition-all duration-300 group-hover:scale-150" />
                  <CardHeader className="text-center relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mx-auto w-16 h-16 bg-gradient-to-br from-sage-200 to-sage-300 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                    >
                      <benefit.icon className="w-8 h-8 text-sage-900" />
                    </motion.div>
                    <CardTitle className="text-sage-100">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-sage-300 text-center">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sage-50 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-sage-300 max-w-2xl mx-auto">
              Explore our current openings and find the perfect role for your skills and aspirations.
            </p>
          </motion.div>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <Card className="bg-sage-800/50 backdrop-blur-sm border-sage-700/30 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sage-200/20 to-sage-300/20 opacity-5 rounded-full transform translate-x-8 -translate-y-8 transition-all duration-300 group-hover:scale-150" />
                  <CardHeader className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl text-sage-100 mb-2">
                          {position.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className="bg-sage-200/20 text-sage-200 border-sage-300/30">
                            {position.department}
                          </Badge>
                          <Badge variant="outline" className="border-sage-300/50 text-sage-300">
                            {position.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-start lg:items-end gap-2">
                        <div className="flex items-center gap-2 text-sage-400">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{position.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sage-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{position.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sage-400">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-sm">{position.salary}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sage-300 mb-4">{position.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-sage-100 mb-2">Requirements:</h4>
                      <ul className="space-y-1 text-sage-300">
                        {position.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-sage-200 to-sage-300 rounded-full mr-3"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full lg:w-auto bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 hover:from-sage-300 hover:to-sage-400">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center bg-sage-800/30 backdrop-blur-sm rounded-2xl p-12 border border-sage-700/30"
          >
            <h2 className="text-3xl font-bold text-sage-50 mb-4">
              Don't See the Right Fit?
            </h2>
            <p className="text-lg text-sage-300 mb-8">
              We're always looking for talented professionals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 hover:from-sage-300 hover:to-sage-400 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                Send Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
