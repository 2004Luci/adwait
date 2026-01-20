import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://adwaitartha.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Adwait Artha LLP | Financial Advisory & Legal Services",
    template: "%s | Adwait Artha LLP",
  },
  description:
    "Adwait Artha LLP is a premier financial advisory firm in Ahmedabad providing IPO advisory, loan syndication, corporate law, legal drafting, and comprehensive financial services to businesses and individuals.",
  keywords: [
    "Adwait Artha",
    "Adwait Artha LLP",
    "financial advisory",
    "financial advisory firm",
    "IPO advisory",
    "SME IPO",
    "loan syndication",
    "corporate law",
    "legal advisory",
    "financial services Ahmedabad",
    "business advisory India",
    "legal drafting",
    "audit services",
    "financial consultant",
  ],
  authors: [{ name: "Adwait Artha LLP" }],
  creator: "Adwait Artha LLP",
  publisher: "Adwait Artha LLP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Adwait Artha LLP",
    title: "Adwait Artha LLP | Financial Advisory & Legal Services",
    description:
      "Premier financial advisory firm in Ahmedabad providing IPO advisory, loan syndication, corporate law, and comprehensive financial services.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Adwait Artha LLP - Financial Advisory Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adwait Artha LLP | Financial Advisory & Legal Services",
    description:
      "Premier financial advisory firm providing IPO advisory, loan syndication, corporate law, and comprehensive financial services.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // TODO: Add your Google Search Console verification code
    // google: "your-google-verification-code",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// JSON-LD structured data for better search engine understanding
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "Adwait Artha LLP",
  description:
    "Premier financial advisory firm providing IPO advisory, loan syndication, corporate law, legal drafting, and comprehensive financial services.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  image: `${SITE_URL}/logo.jpg`,
  telephone: "+91 02717406485",
  email: "contact@adwaitartha.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1030, 10th floor, Shaligram Arcade, Nr Vakil Saheb Bridge Extension",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380058",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 23.0242437,
    longitude: 72.4767437,
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  serviceType: [
    "Financial Advisory",
    "IPO Advisory",
    "SME IPO Advisory",
    "Loan Syndication",
    "Corporate Law",
    "Legal Drafting",
    "Audit Services",
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    // TODO: Add social media links
    // "https://www.linkedin.com/company/adwait-artha-llp",
  ],
};

// WebSite schema for sitelinks search box
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Adwait Artha LLP",
  description: "Financial Advisory & Legal Services",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

// Navigation schema to help Google understand site structure for sitelinks
const navigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "SiteNavigationElement",
      position: 1,
      name: "Services",
      description: "Comprehensive financial and legal advisory services",
      url: `${SITE_URL}/services`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 2,
      name: "IPO Advisory",
      description: "Strategic IPO and SME IPO advisory services",
      url: `${SITE_URL}/services/ipo-sme-ipo-advisory`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 3,
      name: "Loan Syndication",
      description: "Term loans, working capital, and project finance",
      url: `${SITE_URL}/services/loan-syndication`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 4,
      name: "Corporate Law",
      description: "Corporate law and secretarial services",
      url: `${SITE_URL}/services/corporate-law`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 5,
      name: "Financial Advisory",
      description: "Financial statement advisory and restructuring",
      url: `${SITE_URL}/services/financial-advisory`,
    },
    {
      "@type": "SiteNavigationElement",
      position: 6,
      name: "Careers",
      description: "Join our team of financial experts",
      url: `${SITE_URL}/careers`,
    },
  ],
};

// Combined JSON-LD
const jsonLd = [organizationSchema, websiteSchema, navigationSchema];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a365d" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
