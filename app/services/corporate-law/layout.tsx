import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Law & Secretarial Services",
  description:
    "Complete corporate law compliance and secretarial services by Adwait Artha LLP. Board meetings, AGMs, e-voting, statutory compliance for all company types.",
  keywords: [
    "corporate law",
    "secretarial services",
    "board meetings",
    "AGM",
    "statutory compliance",
    "corporate governance",
    "company secretary India",
  ],
  openGraph: {
    title: "Corporate Law & Secretarial Services | Adwait Artha LLP",
    description:
      "Expert corporate law compliance and secretarial services for businesses of all sizes.",
    url: "https://adwaitartha.com/services/corporate-law",
  },
  alternates: {
    canonical: "https://adwaitartha.com/services/corporate-law",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
