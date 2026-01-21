import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IPO & SME IPO Advisory",
  description:
    "Expert IPO and SME IPO advisory services by Adwait Artha LLP. Strategic fund raising, pre-IPO platform, valuation services, and investor relations for successful public offerings.",
  keywords: [
    "IPO advisory",
    "SME IPO",
    "public offering",
    "fund raising",
    "valuation services",
    "investor relations",
    "IPO consultant India",
  ],
  openGraph: {
    title: "IPO & SME IPO Advisory | Adwait Artha LLP",
    description:
      "Strategic IPO advisory services for successful public offerings with 23+ years of experience.",
    url: "https://adwaitartha.com/services/ipo-sme-ipo-advisory",
  },
  alternates: {
    canonical: "https://adwaitartha.com/services/ipo-sme-ipo-advisory",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
