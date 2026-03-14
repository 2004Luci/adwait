import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Drafting, Audit & Assurance",
  description:
    "Comprehensive legal document drafting, due diligence, secretarial audit, and corporate governance advisory by Adwait Artha LLP.",
  keywords: [
    "legal drafting",
    "audit services",
    "due diligence",
    "secretarial audit",
    "corporate governance",
    "CSR advisory",
    "legal consultant India",
  ],
  openGraph: {
    title: "Legal Drafting, Audit & Assurance | Adwait Artha LLP",
    description:
      "Expert legal drafting, audit, and assurance services for comprehensive business compliance.",
    url: "https://adwaitartha.com/services/legal-drafting-audit",
  },
  alternates: {
    canonical: "https://adwaitartha.com/services/legal-drafting-audit",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
