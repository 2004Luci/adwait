"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Home, ArrowLeft, FileQuestion } from "lucide-react";
import { BackgroundElements } from "./components/ui/BackgroundElements";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sage-900 via-black to-sage-800">
      <BackgroundElements showGrid={true} showFloatingElements={true} showCornerElements={true} />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="relative">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-8xl sm:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-sage-200 via-sage-300 to-sage-200 bg-clip-text text-transparent select-none"
            >
              404
            </motion.span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-sage-200/30 to-sage-300/30"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="p-4 rounded-2xl bg-sage-800/50 backdrop-blur-sm border border-sage-700/30">
              <FileQuestion className="w-12 h-12 text-sage-300" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-sage-50">Page Not Found</h1>
            <p className="text-sage-300 text-lg max-w-xl mx-auto leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
              you back on track.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 font-medium shadow-lg hover:shadow-xl hover:from-sage-300 hover:to-sage-400 transition-all duration-300 cursor-pointer"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-sage-200/30 text-sage-200 font-medium hover:bg-sage-200/10 transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
