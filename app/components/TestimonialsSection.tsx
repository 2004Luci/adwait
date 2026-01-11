"use client";

import { motion } from "motion/react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { BackgroundElements } from "./ui/BackgroundElements";
import { AnimatedText } from "./ui/AnimatedText";
import { testimonials, caseStudies } from "@/lib/constants";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 bg-gradient-to-br from-sage-400 via-sage-500 to-sage-600 overflow-hidden"
    >
      <BackgroundElements showGrid={true} showFloatingElements={true} showCornerElements={false} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-200/10 text-sage-200 text-sm font-medium mb-4">
            <Quote className="h-4 w-4 mr-2" />
            Client Stories
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-sage-50 mb-6">
            <AnimatedText
              text="Client Success Stories"
              className="text-sage-50"
              delay={200}
              staggerDelay={0.1}
            />
          </h2>
          <p className="text-xl text-sage-300 max-w-3xl mx-auto">
            Hear from our valued clients about their experience working with our expert team and the
            results we've achieved together.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="mb-24">
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-sage-700/30"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <ImageWithFallback
                    src={testimonials[currentTestimonial].tempImage}
                    alt={testimonials[currentTestimonial].name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-sage-200/30"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-sage-200 text-sage-200" />
                    ))}
                  </div>
                  <blockquote className="text-sage-200 text-lg leading-relaxed mb-6">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-sage-100">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-sage-300">{testimonials[currentTestimonial].position}</div>
                    <div className="text-sage-400 text-sm">
                      {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="cursor-pointer w-12 h-12 bg-sage-700/50 backdrop-blur-sm rounded-full flex items-center justify-center text-sage-200 hover:bg-sage-600/50 transition-colors border border-sage-600/30"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="cursor-pointer w-12 h-12 bg-sage-700/50 backdrop-blur-sm rounded-full flex items-center justify-center text-sage-200 hover:bg-sage-600/50 transition-colors border border-sage-600/30"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-sage-200" : "bg-sage-600/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div id="case-studies">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-sage-50 text-center mb-12"
          >
            <AnimatedText
              text="Case Studies"
              className="text-sage-50"
              delay={400}
              staggerDelay={0.1}
            />
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-sage-800/50 backdrop-blur-sm rounded-2xl p-8 border border-sage-700/30 hover:bg-sage-700/50 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${study.color} rounded-xl flex items-center justify-center mb-6`}
                >
                  <Quote className="w-6 h-6 text-sage-900" />
                </div>

                <h4 className="text-xl font-bold text-sage-100 mb-2">{study.title}</h4>
                <p className="text-sage-300 text-sm mb-4">{study.company}</p>

                <div className="space-y-3 mb-6">
                  <div>
                    <h5 className="text-sage-200 font-semibold text-sm">Challenge</h5>
                    <p className="text-sage-400 text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <h5 className="text-sage-200 font-semibold text-sm">Solution</h5>
                    <p className="text-sage-400 text-sm">{study.solution}</p>
                  </div>
                  <div>
                    <h5 className="text-sage-200 font-semibold text-sm">Result</h5>
                    <p className="text-sage-400 text-sm">{study.result}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {study.metrics.map((metric, metricIndex) => (
                    <span
                      key={metricIndex}
                      className="px-3 py-1 bg-sage-700/50 text-sage-200 text-xs rounded-full"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
