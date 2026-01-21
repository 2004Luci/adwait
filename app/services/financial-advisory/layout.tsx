import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Advisory & Restructuring",
  description:
    "Expert financial statement advisory and restructuring services by Adwait Artha LLP. Disclosure requirements, governance compliance, and strategic financial planning.",
  keywords: [
    "financial advisory",
    "financial restructuring",
    "financial planning",
    "governance compliance",
    "financial consultant",
    "business advisory India",
  ],
  openGraph: {
    title: "Financial Advisory & Restructuring | Adwait Artha LLP",
    description: "Strategic financial advisory and restructuring services for business growth.",
    url: "https://adwaitartha.com/services/financial-advisory",
  },
  alternates: {
    canonical: "https://adwaitartha.com/services/financial-advisory",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
