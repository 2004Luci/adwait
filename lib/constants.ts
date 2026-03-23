import {
  Users,
  Building2,
  Target,
  Clock,
  Phone,
  MapPin,
  Mail,
  Home,
  Briefcase,
  Award,
  User,
  TrendingUp,
  FileText,
  Scale,
  Building,
  Banknote,
  BarChart3,
  LampDesk,
  Lightbulb,
  Recycle,
  Rocket,
  Microscope,
  Handshake,
  CheckCircle,
  Shield,
} from "lucide-react";

import type {
  ContactInfo,
  NavItem,
  HeroStat,
  Service,
  Partner,
  Achievement,
  ProcessStep,
  ExpertiseArea,
  ProcessStepItem,
  Testimonial,
  CaseStudy,
  FooterLinks,
  MeetingService,
  IPOProcessStep,
  AuditService,
  Tribunal,
  FinanceType,
  AdvisoryArea,
} from "./constants.types";

// ==================== SITE CONFIGURATION ====================

export const SITE_URL = "https://adwaitartha.com";

// ==================== CONTACT INFORMATION ====================
const companyEmails = [
  "contact@adwaitartha.com",
  "sandip@adwaitartha.com",
  "prashant@adwaitartha.com",
];
const contactEmail = "contact@adwaitartha.com";
const contactPhone = "+91 02717406485";
const contactAddress =
  "1030, 10th floor, Shaligram Arcade, Nr Vakil Saheb Bridge Extension, Beside Sharaswati Hospital, Ambli Junction, Nr. Satyamev Elite Ring Road, South Bopal, Ahmedabad-380058";

const contactBusinessHours = "Mon - Fri: 10:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM";

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
      "1030, 10th floor, Shaligram Arcade",
      "Nr Vakil Saheb Bridge Extension, Beside Sharaswati Hospital",
      "Ambli Junction, Nr. Satyamev Elite Ring Road, South Bopal, Ahmedabad-380058",
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

const OFFICE_MAPS_URL =
  "https://www.google.com/maps/place/Shaligram+Arcade/@23.0245345,72.4757491,18z/data=!4m10!1m2!2m1!1sAdwait+Artha+LLP+1030,+10th+floor,+Shaligram+Arcade+Nr+Vakil+Saheb+Bridge+Extension,+Beside+Sharaswati+Hospital+Ambli+Junction,+Nr.+Satyamev+Elite+Ring+Road+South+Bopal,+Ahmedabad-380058!3m6!1s0x395e9bb8d93c7c33:0x32d38f1be63609ea!8m2!3d23.0242437!4d72.4767437!15sCroBQWR3YWl0IEFydGhhIExMUCAxMDMwLCAxMHRoIGZsb29yLCBTaGFsaWdyYW0gQXJjYWRlIE5yIFZha2lsIFNhaGViIEJyaWRnZSBFeHRlbnNpb24sIEJlc2lkZSBTaGFyYXN3YXRpIEhvc3BpdGFsIEFtYmxpIEp1bmN0aW9uLCBOci4gU2F0eWFtZXYgRWxpdGUgUmluZyBSb2FkIFNvdXRoIEJvcGFsLCBBaG1lZGFiYWQtMzgwMDU4WrcBIrQBYWR3YWl0IGFydGhhIGxscCAxMDMwIDEwdGggZmxvb3Igc2hhbGlncmFtIGFyY2FkZSBuciB2YWtpbCBzYWhlYiBicmlkZ2UgZXh0ZW5zaW9uIGJlc2lkZSBzaGFyYXN3YXRpIGhvc3BpdGFsIGFtYmxpIGp1bmN0aW9uIG5yIHNhdHlhbWV2IGVsaXRlIHJpbmcgcm9hZCBzb3V0aCBib3BhbCBhaG1lZGFiYWQgMzgwMDU4kgEPYnVzaW5lc3NfY2VudGVymgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDI1T2FscHFiRmhPUjJoMVZWWlZNVk5xU210Vk0wWjVWa2RTUzJSc1JSQULgAQD6AQQIABAl!16s%2Fg%2F11q2k_84pm?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D";

// ==================== NAVIGATION ====================
const navItems: NavItem[] = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Expertise", href: "#expertise", icon: Award },
  { name: "Blog", href: "/blog", icon: FileText },
  // { name: "Careers", href: "/careers", icon: Users },
  { name: "About", href: "#about", icon: User },
];

// ==================== HERO SECTION ====================
const heroStats: HeroStat[] = [
  { number: 23, suffix: "+", label: "Years of Experience" },
  { number: 22, suffix: "+", label: "Valued Clients" },
  { number: 6, suffix: "", label: "Core Services" },
  { number: 100, suffix: "%", label: "Client Satisfaction" },
];

const heroTypewriterPhrases = [
  "IPO & SME IPO Advisory",
  "Legal Drafting & Audit",
  "Law Tribunal Representation",
  "Corporate Law Services",
  "Loan Syndication & Finance",
  "Financial Statement Advisory",
];

// ==================== SERVICES ====================
const services: Service[] = [
  {
    id: "ipo-sme-ipo-advisory",
    icon: TrendingUp,
    title: "IPO/SME IPO Advisory",
    description:
      "Strategic fund raising, pre-IPO platform, valuation services, and investor relations for successful public offerings.",
    features: [
      "Strategic Fund Raising",
      "Pre-IPO Platform",
      "Valuation Services",
      "Investor Relations",
      "Regulatory Compliance",
    ],
    color: "from-sage-200 to-sage-300",
    slug: "ipo-sme-ipo-advisory",
  },
  {
    id: "legal-drafting-audit",
    icon: FileText,
    title: "Legal Drafting, Audit & Assurance",
    description:
      "Comprehensive legal document drafting, due diligence, secretarial audit, and corporate governance advisory.",
    features: [
      "Legal Document Drafting",
      "Due Diligence",
      "Secretarial Audit",
      "Corporate Governance",
      "CSR Advisory",
    ],
    color: "from-sage-300 to-sage-400",
    slug: "legal-drafting-audit",
  },
  {
    id: "law-tribunals",
    icon: Scale,
    title: "Appearance Before Law Tribunals/Forums",
    description:
      "Expert representation before NCLT, ROC, Regional Directors office, and other statutory forums.",
    features: [
      "NCLT Representation",
      "ROC Compliance",
      "Regional Director Office",
      "Official Liquidator",
      "Legal Advocacy",
    ],
    color: "from-sage-400 to-sage-500",
    slug: "law-tribunals",
  },
  {
    id: "corporate-law",
    icon: Building,
    title: "Corporate Law/Secretarial Services",
    description:
      "Complete corporate law compliance, board meetings, AGMs, and secretarial services for all company types.",
    features: [
      "Board Meetings",
      "Annual General Meetings",
      "E-Voting Services",
      "Postal Ballot",
      "Statutory Compliance",
    ],
    color: "from-sage-500 to-sage-600",
    slug: "corporate-law",
  },
  {
    id: "loan-syndication",
    icon: Banknote,
    title: "Loan Syndication, Restructuring & Project Finance",
    description:
      "Comprehensive financial solutions including term loans, working capital, foreign currency funding, and project finance.",
    features: [
      "Term Loan & Working Capital",
      "Foreign Currency Funding",
      "Project Finance",
      "Financial Structuring",
      "Lender Coordination",
    ],
    color: "from-sage-600 to-sage-700",
    slug: "loan-syndication",
  },
  {
    id: "financial-advisory",
    icon: BarChart3,
    title: "Financial Statement Advisory/Structuring/Restructuring",
    description:
      "Expert financial statement advisory, disclosure requirements, governance compliance, and strategic financial planning.",
    features: [
      "Financial Statement Advisory",
      "Disclosure Requirements",
      "Governance Compliance",
      "Financial Restructuring",
      "Strategic Planning",
    ],
    color: "from-sage-700 to-sage-800",
    slug: "financial-advisory",
  },
];

const serviceList = [
  "IPO Advisory",
  "Legal Drafting & Audit",
  "Corporate Law Services",
  "Loan Syndication",
  "Financial Advisory",
  "Regulatory Compliance",
  "Other",
];

// ==================== ABOUT SECTION ====================
const partners: Partner[] = [
  {
    name: "Sandip Sheth",
    role: "FCS, LLb (Sp) - Founder Promoter",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    tempImage: "/photo1.jpg",
    expertise: ["Fund Raising", "Corporate Laws", "Legal Drafting", "Banking & Finance"],
    experience: "23 years of experience",
    description:
      "He is founder promoter and having 23 years of experience in fund raising, planning, valuation, Corporate Laws, Secretarial, Legal, Drafting, accounts, banking and finance. He has been instrumental in helping many corporate in preparation of MIS, cost reduction & cost control and cost system set up.",
  },
  {
    name: "Prashant Prajapati",
    role: "ACS - Partner",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    tempImage: "/photo2.jpeg",
    expertise: ["Company Law", "FEMA", "SEBI", "Corporate Laws"],
    experience: "14 years of experience",
    description:
      "He is having 14 years of experience in Company Law, FEMA, SEBI and other Corporate Laws. He is having in depth knowledge and expertise in eXtensible Business Reporting Language, drafting and vetting of various agreements, letters, and contracts.",
  },
];

const achievements: Achievement[] = [
  {
    icon: Award,
    title: "Industry Recognition",
    description:
      "23+ years of excellence in financial advisory services with proven track record and multi-disciplinary expertise.",
    color: "from-sage-200 to-sage-300",
  },
  {
    icon: Users,
    title: "Diverse Client Base",
    description:
      "22+ valued clients including listed companies from Pharmaceuticals, IT, Chemical, Infrastructure, and other sectors.",
    color: "from-sage-300 to-sage-400",
  },
  {
    icon: Building2,
    title: "Global Reach",
    description:
      "Serving clients across Gujarat, Maharashtra, and international markets including USA, Netherlands, and Singapore.",
    color: "from-sage-400 to-sage-500",
  },
  {
    icon: Shield,
    title: "Regulatory Expertise",
    description:
      "Expert representation before ROC, Regional Directors, NCLT, SEBI and other regulatory bodies with unique ability to perform within given time frames.",
    color: "from-sage-500 to-sage-600",
  },
];

const clientLogos = [
  "Stovec Industries Limited",
  "Accent Microcell Limited",
  "Bosch Rexroth (India)",
  "Diamines & Chemicals Limited",
  "Silver Touch Technologies",
  "Royal Arc Electrodes",
  "Maahi Milk Producer",
  "Mahavir Inducto-melt",
  "Sheetal Motors",
  "Brand Aid Pvt. Ltd.",
  "Advatech Group",
  "Aneta Pharmaceuticals",
  "JB Group of Hotels",
  "Rajkamal Builders",
  "Polo plus Pipes",
  "Pan-Asia Petroleum",
  "Pellucid Lifesciences",
  "Swarnim Gujarat Fluorspar",
  "Mangalmurti Polymers",
  "DACL Finechem Limited",
];

// ==================== EXPERTISE SECTION ====================
const expertiseProcessSteps: ProcessStep[] = [
  {
    icon: Target,
    title: "Initial Consultation",
    description: "Comprehensive assessment of your financial requirements and business objectives.",
    details: ["Business Analysis", "Goal Setting", "Risk Assessment", "Strategy Planning"],
    color: "from-sage-200 to-sage-300",
  },
  {
    icon: Lightbulb,
    title: "Strategic Planning",
    description: "Development of customized financial strategies aligned with your business goals.",
    details: ["Market Research", "Financial Modeling", "Regulatory Review", "Timeline Planning"],
    color: "from-sage-300 to-sage-400",
  },
  {
    icon: FileText,
    title: "Implementation",
    description:
      "Execution of financial strategies with meticulous attention to regulatory compliance.",
    details: [
      "Documentation",
      "Compliance Check",
      "Stakeholder Coordination",
      "Process Monitoring",
    ],
    color: "from-sage-400 to-sage-500",
  },
  {
    icon: TrendingUp,
    title: "Ongoing Support",
    description: "Continuous monitoring and support to ensure sustained financial success.",
    details: ["Performance Review", "Regular Updates", "Advisory Support", "Strategic Adjustments"],
    color: "from-sage-500 to-sage-600",
  },
];

const expertiseAreas: ExpertiseArea[] = [
  {
    category: "Capital Markets",
    skills: ["IPO Advisory", "SME Listings", "Equity Fund Raising", "Market Strategy"],
    percentage: 95,
    color: "from-sage-200 to-sage-300",
  },
  {
    category: "Corporate Law",
    skills: ["Legal Compliance", "Corporate Governance", "Secretarial Services", "Board Advisory"],
    percentage: 92,
    color: "from-sage-300 to-sage-400",
  },
  {
    category: "Financial Advisory",
    skills: [
      "Strategic Planning",
      "Financial Restructuring",
      "Valuation Services",
      "Risk Management",
    ],
    percentage: 98,
    color: "from-sage-400 to-sage-500",
  },
  {
    category: "Regulatory Affairs",
    skills: ["SEBI Compliance", "ROC Matters", "NCLT Representation", "Regulatory Strategy"],
    percentage: 88,
    color: "from-sage-500 to-sage-600",
  },
];

// ==================== PROCESS SECTION ====================
const processSteps: ProcessStepItem[] = [
  {
    icon: LampDesk,
    number: "01",
    title: "Initial Consultation",
    description:
      "We assess your company's readiness for an IPO and identify key areas for preparation.",
  },
  {
    icon: Microscope,
    number: "02",
    title: "Due Diligence",
    description:
      "Comprehensive analysis of financial statements, operations, and corporate structure.",
  },
  {
    icon: Lightbulb,
    number: "03",
    title: "Strategy Development",
    description: "Creating a customized roadmap for your IPO journey with clear milestones.",
  },
  {
    icon: Recycle,
    number: "04",
    title: "Restructuring",
    description: "Optimizing corporate structure and financials to maximize valuation.",
  },
  {
    icon: Rocket,
    number: "05",
    title: "IPO Execution",
    description: "Managing the IPO process from regulatory filings to investor presentations.",
  },
  {
    icon: Handshake,
    number: "06",
    title: "Post-IPO Support",
    description: "Ongoing advisory to navigate public company requirements and investor relations.",
  },
];

// ==================== TESTIMONIALS SECTION ====================
const testimonials: Testimonial[] = [
  // {
  //   name: "Rajesh Kumar",
  //   position: "CEO, Stovec Industries",
  //   company: "Stovec Industries (MNC)",
  //   rating: 5,
  //   content:
  //     "Adwait Artha LLP guided us through our IPO process with exceptional expertise. Their understanding of regulatory requirements and market dynamics was instrumental in our successful listing.",
  //   image:
  //     "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  //   tempImage: "/photo3.jpg",
  // },
  {
    name: "Ghanshyam Patel",
    position: "CEO, Accent Microcell",
    company: "Accent Microcell (NSE Emerge)",
    rating: 5,
    content:
      "The team at Adwait Artha provided comprehensive support for our SME listing. Their attention to detail and strategic approach made the entire process seamless and efficient.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    tempImage: "/photo3.jpg",
  },
  // {
  //   name: "Arjun Patel",
  //   position: "Managing Director, Diamines & Chemicals",
  //   company: "Diamines & Chemicals (NSE/BSE)",
  //   rating: 5,
  //   content:
  //     "Outstanding corporate law services and regulatory compliance support. Their expertise in SEBI matters and corporate governance has been invaluable for our dual listing.",
  //   image:
  //     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  //   tempImage: "/photo3.jpg",
  // },
];

const caseStudies: CaseStudy[] = [
  {
    title: "Successful IPO Launch",
    company: "Technology Sector Client",
    challenge: "First-time public offering with complex regulatory requirements",
    solution: "End-to-end IPO advisory including due diligence, compliance, and investor relations",
    result: "Successfully raised ₹250 Crores with 150% subscription",
    metrics: ["₹250 Cr Raised", "150% Subscription", "6 Month Timeline"],
    color: "from-sage-200 to-sage-300",
  },
  {
    title: "Corporate Restructuring",
    company: "Manufacturing Conglomerate",
    challenge: "Complex group restructuring for operational efficiency",
    solution: "Strategic restructuring plan with regulatory approvals and tax optimization",
    result: "Achieved 30% cost reduction and improved governance structure",
    metrics: ["30% Cost Reduction", "5 Entity Consolidation", "100% Compliance"],
    color: "from-sage-300 to-sage-400",
  },
  {
    title: "Debt Syndication Success",
    company: "Infrastructure Project",
    challenge: "Large-scale project financing requirements",
    solution: "Multi-tier debt syndication with consortium of lenders",
    result: "Secured ₹500 Crores financing at competitive rates",
    metrics: ["₹500 Cr Financing", "8.5% Interest Rate", "12 Lender Consortium"],
    color: "from-sage-400 to-sage-500",
  },
];

// ==================== FOOTER ====================
const footerLinks: FooterLinks = {
  services: [
    { name: "IPO Advisory", href: "/services/ipo-sme-ipo-advisory" },
    { name: "Legal Drafting & Audit", href: "/services/legal-drafting-audit" },
    { name: "Corporate Law Services", href: "/services/corporate-law" },
    { name: "Loan Syndication", href: "/services/loan-syndication" },
    { name: "Financial Advisory", href: "/services/financial-advisory" },
    { name: "Regulatory Compliance", href: "/services/law-tribunals" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#team" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "#contact" },
    { name: "Sandip Sheth & Associates", href: "https://www.ssacs.in" },
  ],
  resources: ["Blog", "Newsletter", "Whitepapers", "Webinars", "FAQ", "Support"],
  legal: [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "Disclaimer",
    "Compliance",
    "GDPR",
  ],
};

// ==================== CAREERS ====================
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

// ==================== SERVICE PAGES DATA ====================

// Corporate Law Service
const corporateLawServices = [
  "Board Meeting Management",
  "Annual General Meetings",
  "E-Voting Services",
  "Postal Ballot",
  "Statutory Compliance",
  "Corporate Governance",
  "Secretarial Services",
  "Regulatory Filings",
];

const corporateLawMeetingServices: MeetingService[] = [
  {
    title: "Board Meetings",
    description:
      "Comprehensive support for board meetings including agenda preparation, documentation, and compliance.",
    features: [
      "Agenda Preparation",
      "Notice Circulation",
      "Minutes Drafting",
      "Compliance Reporting",
    ],
  },
  {
    title: "Annual General Meetings",
    description: "End-to-end AGM management including physical and virtual meeting arrangements.",
    features: [
      "Meeting Arrangements",
      "Proxy Management",
      "Voting Systems",
      "Regulatory Compliance",
    ],
  },
  {
    title: "E-Voting Services",
    description:
      "Modern electronic voting solutions for shareholder meetings and corporate decisions.",
    features: [
      "Online Voting Platform",
      "Secure Authentication",
      "Real-time Results",
      "Audit Trail",
    ],
  },
];

const corporateLawComplianceAreas = [
  "Companies Act Compliance",
  "SEBI Regulations",
  "Stock Exchange Requirements",
  "Corporate Governance Norms",
  "FEMA Compliance",
  "Tax Regulations",
  "Labour Laws",
  "Environmental Laws",
];

// IPO/SME IPO Advisory Service
const ipoFeatures = [
  "Strategic Fund Raising Planning",
  "Pre-IPO Platform Development",
  "Valuation Services & Analysis",
  "Investor Relations Management",
  "Regulatory Compliance & Filings",
  "Due Diligence & Documentation",
  "Market Research & Analysis",
  "Roadshow & Investor Presentations",
];

const ipoProcessSteps: IPOProcessStep[] = [
  {
    step: "01",
    title: "Initial Assessment",
    description:
      "Comprehensive evaluation of your business model, financials, and growth potential to determine IPO readiness.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Strategic Planning",
    description:
      "Develop a customized IPO strategy including timing, valuation, and optimal capital structure.",
    icon: TrendingUp,
  },
  {
    step: "03",
    title: "Pre-IPO Preparation",
    description:
      "Prepare all necessary documentation, financial statements, and regulatory compliance requirements.",
    icon: CheckCircle,
  },
  {
    step: "04",
    title: "Investor Relations",
    description:
      "Build relationships with potential investors, conduct roadshows, and manage investor communications.",
    icon: Users,
  },
  {
    step: "05",
    title: "Regulatory Filings",
    description:
      "Submit all required filings with SEBI, stock exchanges, and other regulatory bodies.",
    icon: FileText,
  },
  {
    step: "06",
    title: "Listing & Post-IPO",
    description:
      "Successfully list on the stock exchange and provide ongoing support for post-IPO compliance.",
    icon: TrendingUp,
  },
];

const ipoBenefits = [
  "Access to Capital Markets",
  "Enhanced Brand Visibility",
  "Improved Corporate Governance",
  "Liquidity for Shareholders",
  "Employee Stock Options",
  "Merger & Acquisition Currency",
  "Regulatory Compliance",
  "Professional Management",
];

// Legal Drafting & Audit Service
const legalDraftingServices = [
  "Legal Document Drafting",
  "Due Diligence Services",
  "Secretarial Audit",
  "Corporate Governance Advisory",
  "CSR Advisory & Compliance",
  "Regulatory Compliance",
  "Legal Opinion & Vetting",
  "Contract Management",
];

const legalDraftingDocumentTypes = [
  "Shareholders Agreements",
  "Joint Venture Agreements",
  "LLP Agreements",
  "Government Company Documents",
  "JV Company Documents",
  "Merger & Acquisition Documents",
  "Investment Agreements",
  "Commercial Contracts",
];

const legalDraftingAuditServices: AuditService[] = [
  {
    title: "Secretarial Audit",
    description:
      "Comprehensive audit of compliance with Companies Act, SEBI regulations, and other corporate laws.",
    features: [
      "Board Meeting Compliance",
      "AGM Compliance",
      "Filing Requirements",
      "Regulatory Reporting",
    ],
  },
  {
    title: "Legal Due Diligence",
    description:
      "Thorough examination of legal documents, contracts, and compliance status for transactions.",
    features: ["Document Review", "Compliance Assessment", "Risk Identification", "Legal Opinion"],
  },
  {
    title: "Financial Due Diligence",
    description:
      "Analysis of financial statements, accounting practices, and financial health assessment.",
    features: [
      "Financial Analysis",
      "Accounting Review",
      "Tax Compliance",
      "Financial Projections",
    ],
  },
];

// Law Tribunals Service
const lawTribunalsServices = [
  "NCLT Representation",
  "ROC Compliance & Filings",
  "Regional Director Office",
  "Official Liquidator",
  "Legal Advocacy",
  "Regulatory Liaison",
  "Compliance Advisory",
  "Legal Documentation",
];

const lawTribunals: Tribunal[] = [
  {
    name: "National Company Law Tribunal (NCLT)",
    description:
      "Representation in company law matters, mergers, acquisitions, and insolvency proceedings.",
    cases: [
      "Merger & Acquisition",
      "Insolvency Proceedings",
      "Corporate Disputes",
      "Compliance Matters",
    ],
  },
  {
    name: "Registrar of Companies (ROC)",
    description:
      "Liaison and compliance with ROC requirements, filings, and regulatory submissions.",
    cases: ["Annual Filings", "Compliance Reports", "Regulatory Submissions", "Documentation"],
  },
  {
    name: "Regional Director Office",
    description: "Representation before Regional Directors for various corporate law matters.",
    cases: ["Approval Applications", "Compliance Matters", "Regulatory Filings", "Legal Advocacy"],
  },
  {
    name: "Official Liquidator",
    description: "Assistance in liquidation proceedings and related legal matters.",
    cases: [
      "Liquidation Proceedings",
      "Asset Management",
      "Creditor Coordination",
      "Legal Compliance",
    ],
  },
];

const lawTribunalsExpertise = [
  "23+ Years of Experience",
  "Deep Regulatory Knowledge",
  "Proven Track Record",
  "Timely Resolution",
  "Cost-Effective Solutions",
  "Comprehensive Support",
];

// Loan Syndication Service
const loanSyndicationServices = [
  "Term Loan & Working Capital",
  "Foreign Currency Funding",
  "Project Finance",
  "Financial Structuring",
  "Lender Coordination",
  "Debt Restructuring",
  "Syndication Services",
  "Financial Advisory",
];

const loanSyndicationFinanceTypes: FinanceType[] = [
  {
    title: "Term Loans",
    description:
      "Long-term financing solutions for capital expenditure, expansion, and major investments.",
    features: [
      "Capital Expenditure",
      "Business Expansion",
      "Equipment Financing",
      "Infrastructure Projects",
    ],
  },
  {
    title: "Working Capital Finance",
    description:
      "Short-term financing to meet day-to-day operational requirements and cash flow needs.",
    features: [
      "Cash Flow Management",
      "Inventory Financing",
      "Trade Finance",
      "Operational Expenses",
    ],
  },
  {
    title: "Foreign Currency Funding",
    description:
      "International financing solutions including ECBs, trade finance, and cross-border transactions.",
    features: [
      "External Commercial Borrowings",
      "Trade Finance",
      "Cross-border Transactions",
      "Currency Hedging",
    ],
  },
];

const loanSyndicationProjectTypes = [
  "Infrastructure Projects",
  "Manufacturing Units",
  "Real Estate Development",
  "Power Projects",
  "Telecommunications",
  "Healthcare Facilities",
  "Educational Institutions",
  "Technology Projects",
];

// Financial Advisory Service
const financialAdvisoryServices = [
  "Financial Statement Advisory",
  "Disclosure Requirements",
  "Governance Compliance",
  "Financial Restructuring",
  "Strategic Planning",
  "Performance Analysis",
  "Risk Assessment",
  "Compliance Reporting",
];

const financialAdvisoryAreas: AdvisoryArea[] = [
  {
    title: "Financial Statement Advisory",
    description:
      "Expert guidance on presentation and preparation of financial statements in accordance with accounting standards.",
    features: [
      "Accounting Standards Compliance",
      "Financial Presentation",
      "Disclosure Requirements",
      "Audit Support",
    ],
  },
  {
    title: "Financial Restructuring",
    description:
      "Strategic restructuring of financial statements and capital structure to optimize business performance.",
    features: [
      "Capital Structure Optimization",
      "Debt Restructuring",
      "Asset Reorganization",
      "Financial Modeling",
    ],
  },
  {
    title: "Governance Compliance",
    description:
      "Ensuring compliance with corporate governance norms and regulatory requirements for financial reporting.",
    features: [
      "Corporate Governance",
      "Regulatory Compliance",
      "Board Reporting",
      "Stakeholder Communication",
    ],
  },
];

const financialAdvisoryBenefits = [
  "Improved Financial Transparency",
  "Enhanced Investor Confidence",
  "Better Decision Making",
  "Regulatory Compliance",
  "Optimized Capital Structure",
  "Risk Mitigation",
  "Performance Enhancement",
  "Stakeholder Value Creation",
];

// ==================== SCHEDULING ====================
const timeSlots = [
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
];

// ==================== EXPORTS ====================
export {
  // Contact
  companyEmails,
  contactEmail,
  contactPhone,
  contactAddress,
  contactBusinessHours,
  contactInfo,
  OFFICE_MAPS_URL,
  // Navigation
  navItems,
  // Hero
  heroStats,
  heroTypewriterPhrases,
  // Services
  services,
  serviceList,
  // About
  partners,
  achievements,
  clientLogos,
  // Expertise
  expertiseProcessSteps,
  expertiseAreas,
  // Process
  processSteps,
  // Testimonials
  testimonials,
  caseStudies,
  // Footer
  footerLinks,
  // Careers
  openPositions,
  benefits,
  // Service Pages
  corporateLawServices,
  corporateLawMeetingServices,
  corporateLawComplianceAreas,
  ipoFeatures,
  ipoProcessSteps,
  ipoBenefits,
  legalDraftingServices,
  legalDraftingDocumentTypes,
  legalDraftingAuditServices,
  lawTribunalsServices,
  lawTribunals,
  lawTribunalsExpertise,
  loanSyndicationServices,
  loanSyndicationFinanceTypes,
  loanSyndicationProjectTypes,
  financialAdvisoryServices,
  financialAdvisoryAreas,
  financialAdvisoryBenefits,
  // Scheduling
  timeSlots,
};
