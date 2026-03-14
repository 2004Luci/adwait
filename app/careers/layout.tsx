import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Adwait Artha LLP's team of financial experts. Explore career opportunities in financial advisory, corporate law, and legal services in Ahmedabad.",
  keywords: [
    "careers",
    "jobs",
    "financial advisory jobs",
    "corporate law careers",
    "Ahmedabad jobs",
    "finance careers India",
  ],
  openGraph: {
    title: "Careers | Adwait Artha LLP",
    description:
      "Join our team of dedicated professionals. Explore exciting career opportunities at Adwait Artha LLP.",
    url: "https://adwaitartha.com/careers",
  },
  alternates: {
    canonical: "https://adwaitartha.com/careers",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
