interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  details: string[];
  color: string;
  clickable?: boolean;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface HeroStat {
  number: number;
  suffix: string;
  label: string;
}

interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  color: string;
  slug: string;
}

interface Partner {
  name: string;
  role: string;
  image: string;
  expertise: string[];
  experience: string;
  description: string;
}

interface Achievement {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

interface ProcessStep {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  details: string[];
  color: string;
}

interface ExpertiseArea {
  category: string;
  skills: string[];
  percentage: number;
  color: string;
}

interface ProcessStepItem {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  position: string;
  company: string;
  rating: number;
  content: string;
  image: string;
}

interface CaseStudy {
  title: string;
  company: string;
  challenge: string;
  solution: string;
  result: string;
  metrics: string[];
  color: string;
}

interface FooterLink {
  name: string;
  href: string;
}

interface FooterLinks {
  services: FooterLink[];
  company: FooterLink[];
  resources: string[];
  legal: string[];
}

interface MeetingService {
  title: string;
  description: string;
  features: string[];
}

interface IPOProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AuditService {
  title: string;
  description: string;
  features: string[];
}

interface Tribunal {
  name: string;
  description: string;
  cases: string[];
}

interface FinanceType {
  title: string;
  description: string;
  features: string[];
}

interface AdvisoryArea {
  title: string;
  description: string;
  features: string[];
}

export type {
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
  FooterLink,
  FooterLinks,
  MeetingService,
  IPOProcessStep,
  AuditService,
  Tribunal,
  FinanceType,
  AdvisoryArea,
};
