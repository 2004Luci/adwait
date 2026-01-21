/**
 * Settings Helper Functions
 *
 * These functions fetch site settings from the database with fallback to
 * default values from constants.ts. Use these in Server Components and
 * API routes to get the current site configuration.
 */

import { getSettingByKey, SETTING_KEYS } from "./db/settings";
import {
  heroStats,
  heroTypewriterPhrases,
  services,
  serviceList,
  partners,
  achievements,
  clientLogos,
  testimonials,
  caseStudies,
  contactInfo,
  contactEmail,
  contactPhone,
  contactAddress,
  contactBusinessHours,
  companyEmails,
  OFFICE_MAPS_URL,
  expertiseAreas,
  expertiseProcessSteps,
  processSteps,
  footerLinks,
  navItems,
  SITE_URL,
  openPositions,
  benefits,
  timeSlots,
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
} from "./constants";

/**
 * Get a setting value with a fallback default
 */
async function getSettingOrDefault<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const setting = await getSettingByKey(key);
    if (setting && setting.value !== null) {
      return setting.value as T;
    }
    return defaultValue;
  } catch (error) {
    console.warn(`[Settings] Failed to fetch "${key}", using default:`, error);
    return defaultValue;
  }
}

// ==================== HERO SETTINGS ====================

export async function getHeroStats() {
  return getSettingOrDefault(SETTING_KEYS.HERO_STATS, heroStats);
}

export async function getHeroTypewriterPhrases() {
  return getSettingOrDefault(SETTING_KEYS.HERO_TYPEWRITER_PHRASES, heroTypewriterPhrases);
}

// ==================== SERVICES SETTINGS ====================

export async function getServices() {
  return getSettingOrDefault(SETTING_KEYS.SERVICES, services);
}

export async function getServiceList() {
  return getSettingOrDefault(SETTING_KEYS.SERVICE_LIST, serviceList);
}

// ==================== ABOUT SETTINGS ====================

export async function getPartners() {
  return getSettingOrDefault(SETTING_KEYS.PARTNERS, partners);
}

export async function getAchievements() {
  return getSettingOrDefault(SETTING_KEYS.ACHIEVEMENTS, achievements);
}

export async function getClientLogos() {
  return getSettingOrDefault(SETTING_KEYS.CLIENT_LOGOS, clientLogos);
}

// ==================== TESTIMONIALS SETTINGS ====================

export async function getTestimonials() {
  return getSettingOrDefault(SETTING_KEYS.TESTIMONIALS, testimonials);
}

export async function getCaseStudies() {
  return getSettingOrDefault(SETTING_KEYS.CASE_STUDIES, caseStudies);
}

// ==================== CONTACT SETTINGS ====================

export async function getContactInfo() {
  return getSettingOrDefault(SETTING_KEYS.CONTACT_INFO, contactInfo);
}

export async function getContactEmail() {
  return getSettingOrDefault(SETTING_KEYS.CONTACT_EMAIL, contactEmail);
}

export async function getContactPhone() {
  return getSettingOrDefault(SETTING_KEYS.CONTACT_PHONE, contactPhone);
}

export async function getContactAddress() {
  return getSettingOrDefault(SETTING_KEYS.CONTACT_ADDRESS, contactAddress);
}

export async function getBusinessHours() {
  return getSettingOrDefault(SETTING_KEYS.BUSINESS_HOURS, contactBusinessHours);
}

export async function getCompanyEmails() {
  return getSettingOrDefault(SETTING_KEYS.COMPANY_EMAILS, companyEmails);
}

export async function getOfficeMapsUrl() {
  return getSettingOrDefault(SETTING_KEYS.OFFICE_MAPS_URL, OFFICE_MAPS_URL);
}

// ==================== EXPERTISE SETTINGS ====================

export async function getExpertiseAreas() {
  return getSettingOrDefault(SETTING_KEYS.EXPERTISE_AREAS, expertiseAreas);
}

export async function getExpertiseProcessSteps() {
  return getSettingOrDefault(SETTING_KEYS.EXPERTISE_PROCESS_STEPS, expertiseProcessSteps);
}

export async function getProcessSteps() {
  return getSettingOrDefault(SETTING_KEYS.PROCESS_STEPS, processSteps);
}

// ==================== FOOTER SETTINGS ====================

export async function getFooterLinks() {
  return getSettingOrDefault(SETTING_KEYS.FOOTER_LINKS, footerLinks);
}

// ==================== MISCELLANEOUS SETTINGS ====================

export async function getSiteUrl() {
  return getSettingOrDefault(SETTING_KEYS.SITE_URL, SITE_URL);
}

export async function getNavItems() {
  return getSettingOrDefault(SETTING_KEYS.NAV_ITEMS, navItems);
}

export async function getOpenPositions() {
  return getSettingOrDefault(SETTING_KEYS.OPEN_POSITIONS, openPositions);
}

export async function getBenefits() {
  return getSettingOrDefault(SETTING_KEYS.BENEFITS, benefits);
}

export async function getTimeSlots() {
  return getSettingOrDefault(SETTING_KEYS.TIME_SLOTS, timeSlots);
}

// Service Page Specific Settings
export async function getCorporateLawServices() {
  return getSettingOrDefault(SETTING_KEYS.CORPORATE_LAW_SERVICES, corporateLawServices);
}

export async function getCorporateLawMeetingServices() {
  return getSettingOrDefault(SETTING_KEYS.CORPORATE_LAW_MEETING_SERVICES, corporateLawMeetingServices);
}

export async function getCorporateLawComplianceAreas() {
  return getSettingOrDefault(SETTING_KEYS.CORPORATE_LAW_COMPLIANCE_AREAS, corporateLawComplianceAreas);
}

export async function getIpoFeatures() {
  return getSettingOrDefault(SETTING_KEYS.IPO_FEATURES, ipoFeatures);
}

export async function getIpoProcessSteps() {
  return getSettingOrDefault(SETTING_KEYS.IPO_PROCESS_STEPS, ipoProcessSteps);
}

export async function getIpoBenefits() {
  return getSettingOrDefault(SETTING_KEYS.IPO_BENEFITS, ipoBenefits);
}

export async function getLegalDraftingServices() {
  return getSettingOrDefault(SETTING_KEYS.LEGAL_DRAFTING_SERVICES, legalDraftingServices);
}

export async function getLegalDraftingDocumentTypes() {
  return getSettingOrDefault(SETTING_KEYS.LEGAL_DRAFTING_DOCUMENT_TYPES, legalDraftingDocumentTypes);
}

export async function getLegalDraftingAuditServices() {
  return getSettingOrDefault(SETTING_KEYS.LEGAL_DRAFTING_AUDIT_SERVICES, legalDraftingAuditServices);
}

export async function getLawTribunalsServices() {
  return getSettingOrDefault(SETTING_KEYS.LAW_TRIBUNALS_SERVICES, lawTribunalsServices);
}

export async function getLawTribunals() {
  return getSettingOrDefault(SETTING_KEYS.LAW_TRIBUNALS, lawTribunals);
}

export async function getLawTribunalsExpertise() {
  return getSettingOrDefault(SETTING_KEYS.LAW_TRIBUNALS_EXPERTISE, lawTribunalsExpertise);
}

export async function getLoanSyndicationServices() {
  return getSettingOrDefault(SETTING_KEYS.LOAN_SYNDICATION_SERVICES, loanSyndicationServices);
}

export async function getLoanSyndicationFinanceTypes() {
  return getSettingOrDefault(SETTING_KEYS.LOAN_SYNDICATION_FINANCE_TYPES, loanSyndicationFinanceTypes);
}

export async function getLoanSyndicationProjectTypes() {
  return getSettingOrDefault(SETTING_KEYS.LOAN_SYNDICATION_PROJECT_TYPES, loanSyndicationProjectTypes);
}

export async function getFinancialAdvisoryServices() {
  return getSettingOrDefault(SETTING_KEYS.FINANCIAL_ADVISORY_SERVICES, financialAdvisoryServices);
}

export async function getFinancialAdvisoryAreas() {
  return getSettingOrDefault(SETTING_KEYS.FINANCIAL_ADVISORY_AREAS, financialAdvisoryAreas);
}

export async function getFinancialAdvisoryBenefits() {
  return getSettingOrDefault(SETTING_KEYS.FINANCIAL_ADVISORY_BENEFITS, financialAdvisoryBenefits);
}

// ==================== BULK FETCH ====================

/**
 * Fetch all settings needed for the homepage in one call
 * This is more efficient than making multiple individual calls
 */
export async function getHomepageSettings() {
  const [
    heroStatsData,
    heroPhrasesData,
    servicesData,
    partnersData,
    achievementsData,
    clientLogosData,
    testimonialsData,
    caseStudiesData,
    expertiseAreasData,
    expertiseProcessStepsData,
    processStepsData,
  ] = await Promise.all([
    getHeroStats(),
    getHeroTypewriterPhrases(),
    getServices(),
    getPartners(),
    getAchievements(),
    getClientLogos(),
    getTestimonials(),
    getCaseStudies(),
    getExpertiseAreas(),
    getExpertiseProcessSteps(),
    getProcessSteps(),
  ]);

  return {
    heroStats: heroStatsData,
    heroTypewriterPhrases: heroPhrasesData,
    services: servicesData,
    partners: partnersData,
    achievements: achievementsData,
    clientLogos: clientLogosData,
    testimonials: testimonialsData,
    caseStudies: caseStudiesData,
    expertiseAreas: expertiseAreasData,
    expertiseProcessSteps: expertiseProcessStepsData,
    processSteps: processStepsData,
  };
}
