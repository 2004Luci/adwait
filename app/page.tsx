"use client";

import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProcessSection } from "./components/ProcessSection";
import { AboutSection } from "./components/AboutSection";
import { ExpertiseSection } from "./components/ExpertiseSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <ExpertiseSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
}
