"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { navItems } from "@/lib/constants";

const THROTTLE_MS = 100;

const Navigation = () => {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  const lastScrollYRef = useRef(0);
  const throttleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRunRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastRunRef.current < THROTTLE_MS) {
        if (!throttleTimeoutRef.current) {
          throttleTimeoutRef.current = setTimeout(() => {
            throttleTimeoutRef.current = null;
            lastRunRef.current = Date.now();
            runScrollLogic();
          }, THROTTLE_MS);
        }
        return;
      }
      lastRunRef.current = now;
      runScrollLogic();
    };

    const runScrollLogic = () => {
      const currentScrollY = window.scrollY;
      console.log("currentScrollY", currentScrollY);
      const lastScrollY = lastScrollYRef.current;

      // Check if at top of page
      setIsAtTop(currentScrollY <= 50);

      // Determine if scrolled past threshold for static navbar
      setIsScrolled(currentScrollY > 50);

      // Show/hide floating navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide floating navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY && currentScrollY > 100) {
        // Scrolling up and not at top - show floating navbar
        setIsVisible(true);
      }

      // Always hide floating navbar at the very top
      if (currentScrollY <= 50) {
        setIsVisible(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Static navbar at top - always visible when at top */}
      <AnimatePresence>
        {isAtTop && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-transparent"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
                  <div className="rounded-lg flex items-center justify-center shadow-lg overflow-hidden bg-sage-800/50 backdrop-blur-sm border border-sage-700/30">
                    <Image
                      src="/logo.jpg"
                      alt="Adwait Artha LLP Logo"
                      className="w-auto object-contain cursor-pointer"
                      width={250}
                      height={100}
                      onClick={() => router.push("/")}
                      priority
                    />
                  </div>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8 min-w-0 flex-1 justify-end overflow-x-auto">
                  {navItems.map((item) => {
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        whileHover={{ y: -2 }}
                        className="text-sage-100 hover:text-sage-200 px-2 py-2 font-medium transition-colors relative group whitespace-nowrap flex-shrink-0"
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sage-200 to-sage-300 group-hover:w-full transition-all duration-300" />
                      </motion.a>
                    );
                  })}
                  <div className="overflow-hidden rounded-xl flex-shrink-0 py-0.5">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(200, 180, 160, 0.3)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        window.location.href = "/#contact";
                      }}
                      className="cursor-pointer bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium whitespace-nowrap"
                    >
                      Get Started
                    </motion.button>
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-sage-100 hover:text-sage-200 transition-colors p-2 rounded-lg hover:bg-sage-800/50"
                  >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <motion.div
                initial={false}
                animate={
                  isMobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
                }
                className="md:hidden overflow-hidden bg-sage-900/95 backdrop-blur-md rounded-xl mt-2 border border-sage-700/30 shadow-lg"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 text-sage-100 hover:text-sage-200 hover:bg-sage-800/50 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent className="w-4 h-4" />
                        {item.name}
                      </a>
                    );
                  })}
                  <div className="pt-2 border-t border-sage-700/30 mt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        window.location.href = "/#contact";
                      }}
                      className="w-full bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Floating navbar - only when scrolled and scrolling up */}
      <AnimatePresence>
        {isScrolled && isVisible && !isAtTop && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-sage-900/95 backdrop-blur-md shadow-2xl border-2 border-sage-200/30 rounded-2xl overflow-hidden min-w-[320px] w-max max-w-[95vw]"
          >
            <div className="px-4 pt-3 pb-3">
              <div className="flex items-center justify-between gap-3 h-14 min-w-0">
                {/* Logo - smaller version for floating navbar */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-shrink-0 items-center h-full"
                >
                  <div className="rounded-lg flex items-center justify-center shadow-lg overflow-hidden bg-sage-800/50 backdrop-blur-sm border border-sage-700/30 h-11 w-auto">
                    <Image
                      src="/logo.jpg"
                      alt="Adwait Artha LLP Logo"
                      className="block w-auto h-full object-contain cursor-pointer object-center"
                      width={120}
                      height={44}
                      onClick={() => router.push("/")}
                    />
                  </div>
                </motion.div>

                {/* Desktop Navigation - compact spacing, scrolls when needed */}
                <div className="hidden lg:flex items-center gap-3 ml-2 min-w-0 overflow-x-auto flex-1 justify-end">
                  {navItems.map((item) => {
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        whileHover={{ y: -1 }}
                        className="text-sage-100 hover:text-sage-200 px-2 py-1 text-sm font-medium transition-colors relative group whitespace-nowrap flex-shrink-0"
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-sage-200 to-sage-300 group-hover:w-full transition-all duration-300" />
                      </motion.a>
                    );
                  })}
                  <div className="overflow-hidden rounded-lg flex-shrink-0 py-0.5">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(200, 180, 160, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        window.location.href = "/#contact";
                      }}
                      className="cursor-pointer bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 px-4 py-1.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-sm whitespace-nowrap"
                    >
                      Get Started
                    </motion.button>
                  </div>
                </div>

                {/* Mobile menu button - smaller for floating navbar */}
                <div className="lg:hidden ml-4 flex flex-shrink-0 items-center h-14 justify-center">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-sage-100 hover:text-sage-200 transition-colors p-1.5 rounded-lg hover:bg-sage-800/50 flex items-center justify-center"
                  >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </div>
              </div>

              {/* Mobile Navigation for floating navbar */}
              <motion.div
                initial={false}
                animate={
                  isMobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
                }
                className={`lg:hidden overflow-hidden bg-sage-800/50 backdrop-blur-md rounded-xl border border-sage-700/30 shadow-lg ${isMobileMenuOpen ? "mt-2" : ""}`}
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 text-sage-100 hover:text-sage-200 hover:bg-sage-700/50 rounded-lg transition-colors text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent className="w-4 h-4" />
                        {item.name}
                      </a>
                    );
                  })}
                  <div className="pt-2 border-t border-sage-700/30 mt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => (window.location.href = "/#contact")}
                      className="w-full bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm flex items-center justify-center gap-2"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
