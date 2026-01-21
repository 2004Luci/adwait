import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appearance Before Law Tribunals & Forums",
  description:
    "Expert representation before NCLT, ROC, Regional Directors office, and other statutory forums by Adwait Artha LLP.",
  keywords: [
    "NCLT representation",
    "ROC compliance",
    "law tribunals",
    "legal advocacy",
    "statutory forums",
    "official liquidator",
    "tribunal lawyer India",
  ],
  openGraph: {
    title: "Law Tribunals & Forums | Adwait Artha LLP",
    description: "Expert legal representation before NCLT, ROC, and other regulatory bodies.",
    url: "https://adwaitartha.com/services/law-tribunals",
  },
  alternates: {
    canonical: "https://adwaitartha.com/services/law-tribunals",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
