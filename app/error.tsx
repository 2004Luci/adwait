"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "motion/react";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";
import { BackgroundElements } from "./components/ui/BackgroundElements";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sage-900 via-black to-sage-800">
      <BackgroundElements showGrid={true} showFloatingElements={true} showCornerElements={true} />
      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="p-4 rounded-2xl bg-amber-500/20 backdrop-blur-sm border border-amber-500/30">
              <AlertTriangle className="w-16 h-16 text-amber-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-sage-50">Something went wrong</h1>
            <p className="text-sage-300 text-lg leading-relaxed">
              We encountered an error while loading this page. This could be due to a temporary
              service issue or a problem fetching data.
            </p>
            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sage-400 text-sm hover:text-sage-300">
                  Error details
                </summary>
                <pre className="mt-2 p-4 rounded-lg bg-sage-900/80 text-amber-200 text-xs overflow-x-auto max-h-40 overflow-y-auto">
                  {error.message}
                </pre>
              </details>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sage-200 to-sage-300 text-sage-900 font-medium shadow-lg hover:shadow-xl hover:from-sage-300 hover:to-sage-400 transition-all duration-300 cursor-pointer"
            >
              <RefreshCw className="w-5 h-5" />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-sage-200/30 text-sage-200 font-medium hover:bg-sage-200/10 transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
