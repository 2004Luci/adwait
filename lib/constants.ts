import { Users, Building2, Target, Clock, Phone, MapPin, Mail } from "lucide-react";

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  details: string[];
  color: string;
  clickable?: boolean;
}

const companyEmails = [
  "contact@adwaitartha.com",
  "sandip@adwaitartha.com",
  "prashant@adwaitartha.com",
];
const contactEmail = "contact@adwaitartha.com";
const contactPhone = "+91 7940305119";
const contactAddress =
  "518, Anand Mangal - III, Opp. Core House, Rajnagar Club Lane, Ambawadi, Ahmedabad - 380006";
const contactBusinessHours = "Mon - Fri: 10:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM";

const openPositions = [
  {
    id: 1,
    title: "Senior Legal Associate",
    department: "Legal",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    experience: "3-5 years",
    salary: "₹8-12 LPA",
    description:
      "Join our dynamic legal team to handle complex corporate law matters, M&A transactions, and regulatory compliance.",
    requirements: [
      "LLB from a recognized university",
      "3-5 years of experience in corporate law",
      "Strong analytical and research skills",
      "Excellent communication abilities",
    ],
  },
  {
    id: 2,
    title: "Financial Advisory Consultant",
    department: "Financial Advisory",
    location: "Delhi, NCR",
    type: "Full-time",
    experience: "2-4 years",
    salary: "₹6-10 LPA",
    description:
      "Provide strategic financial advisory services to clients, including investment planning and portfolio management.",
    requirements: [
      "MBA Finance or CA qualification",
      "2-4 years in financial advisory",
      "Strong client relationship skills",
      "Knowledge of financial markets",
    ],
  },
  {
    id: 3,
    title: "IPO Advisory Specialist",
    department: "IPO Advisory",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    experience: "4-6 years",
    salary: "₹10-15 LPA",
    description:
      "Lead IPO advisory projects, manage client relationships, and ensure successful public offerings.",
    requirements: [
      "CA/CS/MBA with specialization",
      "4-6 years in IPO advisory",
      "Strong project management skills",
      "Regulatory knowledge",
    ],
  },
];

const benefits = [
  {
    icon: Building2,
    title: "Professional Growth",
    description: "Continuous learning opportunities and career advancement paths",
  },
  {
    icon: Target,
    title: "Impactful Work",
    description: "Work on high-profile cases that shape the business landscape",
  },
  {
    icon: Users,
    title: "Team Culture",
    description: "Collaborative environment with experienced professionals",
  },
];

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    title: "Email",
    details: [contactEmail],
    color: "from-sage-200 to-sage-300",
  },
  {
    icon: Phone,
    title: "Phone",
    details: [contactPhone],
    color: "from-sage-300 to-sage-400",
  },
  {
    icon: MapPin,
    title: "Office",
    details: [
      "518, Anand Mangal - III, Opp. Core House",
      "Rajnagar Club Lane, Ambawadi, Ahmedabad - 380006",
    ],
    color: "from-sage-400 to-sage-500",
    clickable: true,
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: contactBusinessHours.split(", "),
    color: "from-sage-500 to-sage-600",
  },
];

const services = [
  "IPO Advisory",
  "Legal Drafting & Audit",
  "Corporate Law Services",
  "Loan Syndication",
  "Financial Advisory",
  "Regulatory Compliance",
  "Other",
];

export {
  companyEmails,
  contactEmail,
  contactPhone,
  contactAddress,
  contactBusinessHours,
  openPositions,
  benefits,
  contactInfo,
  services,
};
