"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Global error boundary - catches errors in the root layout.
 * Must define its own <html> and <body> tags.
 * Used when the root layout itself fails or for critical unrecoverable errors.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error Boundary]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "2rem",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "linear-gradient(135deg, #1a2f1a 0%, #0a0a0a 50%, #1a2f1a 100%)",
          color: "#c9b896",
        }}
      >
        <div style={{ maxWidth: "32rem", textAlign: "center" }}>
          <div
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              color: "#d4a574",
            }}
          >
            ⚠️
          </div>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Critical Error</h1>
          <p style={{ opacity: 0.8, marginBottom: "1.5rem", lineHeight: 1.6 }}>
            A critical error occurred. Please try refreshing the page or return to the homepage.
          </p>
          {process.env.NODE_ENV === "development" && (
            <details style={{ marginBottom: "1.5rem", textAlign: "left" }}>
              <summary style={{ cursor: "pointer", opacity: 0.8 }}>Error details</summary>
              <pre
                style={{
                  marginTop: "0.5rem",
                  padding: "1rem",
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "0.5rem",
                  fontSize: "0.75rem",
                  overflow: "auto",
                  maxHeight: "10rem",
                }}
              >
                {error.message}
              </pre>
            </details>
          )}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: "none",
                background: "linear-gradient(to right, #c9b896, #d4a574)",
                color: "#1a2f1a",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                border: "1px solid rgba(201, 184, 150, 0.3)",
                color: "#c9b896",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
