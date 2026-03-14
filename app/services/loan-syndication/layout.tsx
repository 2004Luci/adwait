import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Syndication & Project Finance",
  description:
    "Comprehensive loan syndication and project finance services by Adwait Artha LLP. Term loans, working capital, foreign currency funding, and financial restructuring.",
  keywords: [
    "loan syndication",
    "project finance",
    "term loan",
    "working capital",
    "debt financing",
    "financial restructuring",
    "loan consultant India",
  ],
  openGraph: {
    title: "Loan Syndication & Project Finance | Adwait Artha LLP",
    description:
      "Expert loan syndication services including term loans, working capital, and project finance solutions.",
    url: "https://adwaitartha.com/services/loan-syndication",
  },
  alternates: {
    canonical: "https://adwaitartha.com/services/loan-syndication",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
