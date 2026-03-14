import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Adwait Artha LLP's comprehensive financial services including IPO advisory, loan syndication, corporate law, legal drafting, audit services, and financial advisory.",
  keywords: [
    "financial services",
    "IPO advisory",
    "loan syndication",
    "corporate law",
    "legal drafting",
    "audit services",
    "financial advisory Ahmedabad",
  ],
  openGraph: {
    title: "Our Services | Adwait Artha LLP",
    description:
      "Comprehensive financial and legal advisory services designed to accelerate your business growth.",
    url: "https://adwaitartha.com/services",
  },
  alternates: {
    canonical: "https://adwaitartha.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
