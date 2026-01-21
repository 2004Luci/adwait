import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getSettingByKey, SETTING_KEYS } from "@/lib/db/settings";
import {
  SITE_URL,
  navItems,
  footerLinks,
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
} from "@/lib/constants";
import { serializeArrayWithIcon } from "@/lib/utils/icon-serialization";
import { MiscellaneousSettingsClient } from "./MiscellaneousSettingsClient";

/**
 * Miscellaneous Settings Page
 */
export default async function MiscellaneousSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  // Fetch current settings or use defaults for all miscellaneous settings
  // If data comes from DB, icons should already be strings
  // If from constants.ts, convert icon components to strings
  const navItemsSetting = await getSettingByKey(SETTING_KEYS.NAV_ITEMS);
  const currentNavItems = navItemsSetting?.value
    ? (navItemsSetting.value as Array<{ icon: string;[key: string]: unknown }>)
    : serializeArrayWithIcon(navItems);

  const benefitsSetting = await getSettingByKey(SETTING_KEYS.BENEFITS);
  const currentBenefits = benefitsSetting?.value
    ? (benefitsSetting.value as Array<{ icon: string;[key: string]: unknown }>)
    : serializeArrayWithIcon(benefits);

  const ipoProcessStepsSetting = await getSettingByKey(SETTING_KEYS.IPO_PROCESS_STEPS);
  const currentIpoProcessSteps = ipoProcessStepsSetting?.value
    ? (ipoProcessStepsSetting.value as Array<{ icon: string;[key: string]: unknown }>)
    : serializeArrayWithIcon(ipoProcessSteps);

  const settings = {
    siteUrl: (await getSettingByKey(SETTING_KEYS.SITE_URL))?.value || SITE_URL,
    navItems: currentNavItems,
    footerLinks: (await getSettingByKey(SETTING_KEYS.FOOTER_LINKS))?.value || footerLinks,
    openPositions: (await getSettingByKey(SETTING_KEYS.OPEN_POSITIONS))?.value || openPositions,
    benefits: currentBenefits,
    timeSlots: (await getSettingByKey(SETTING_KEYS.TIME_SLOTS))?.value || timeSlots,
    corporateLawServices:
      (await getSettingByKey(SETTING_KEYS.CORPORATE_LAW_SERVICES))?.value ||
      corporateLawServices,
    corporateLawMeetingServices:
      (await getSettingByKey(SETTING_KEYS.CORPORATE_LAW_MEETING_SERVICES))?.value ||
      corporateLawMeetingServices,
    corporateLawComplianceAreas:
      (await getSettingByKey(SETTING_KEYS.CORPORATE_LAW_COMPLIANCE_AREAS))?.value ||
      corporateLawComplianceAreas,
    ipoFeatures: (await getSettingByKey(SETTING_KEYS.IPO_FEATURES))?.value || ipoFeatures,
    ipoProcessSteps: currentIpoProcessSteps,
    ipoBenefits: (await getSettingByKey(SETTING_KEYS.IPO_BENEFITS))?.value || ipoBenefits,
    legalDraftingServices:
      (await getSettingByKey(SETTING_KEYS.LEGAL_DRAFTING_SERVICES))?.value ||
      legalDraftingServices,
    legalDraftingDocumentTypes:
      (await getSettingByKey(SETTING_KEYS.LEGAL_DRAFTING_DOCUMENT_TYPES))?.value ||
      legalDraftingDocumentTypes,
    legalDraftingAuditServices:
      (await getSettingByKey(SETTING_KEYS.LEGAL_DRAFTING_AUDIT_SERVICES))?.value ||
      legalDraftingAuditServices,
    lawTribunalsServices:
      (await getSettingByKey(SETTING_KEYS.LAW_TRIBUNALS_SERVICES))?.value || lawTribunalsServices,
    lawTribunals: (await getSettingByKey(SETTING_KEYS.LAW_TRIBUNALS))?.value || lawTribunals,
    lawTribunalsExpertise:
      (await getSettingByKey(SETTING_KEYS.LAW_TRIBUNALS_EXPERTISE))?.value ||
      lawTribunalsExpertise,
    loanSyndicationServices:
      (await getSettingByKey(SETTING_KEYS.LOAN_SYNDICATION_SERVICES))?.value ||
      loanSyndicationServices,
    loanSyndicationFinanceTypes:
      (await getSettingByKey(SETTING_KEYS.LOAN_SYNDICATION_FINANCE_TYPES))?.value ||
      loanSyndicationFinanceTypes,
    loanSyndicationProjectTypes:
      (await getSettingByKey(SETTING_KEYS.LOAN_SYNDICATION_PROJECT_TYPES))?.value ||
      loanSyndicationProjectTypes,
    financialAdvisoryServices:
      (await getSettingByKey(SETTING_KEYS.FINANCIAL_ADVISORY_SERVICES))?.value ||
      financialAdvisoryServices,
    financialAdvisoryAreas:
      (await getSettingByKey(SETTING_KEYS.FINANCIAL_ADVISORY_AREAS))?.value ||
      financialAdvisoryAreas,
    financialAdvisoryBenefits:
      (await getSettingByKey(SETTING_KEYS.FINANCIAL_ADVISORY_BENEFITS))?.value ||
      financialAdvisoryBenefits,
  };

  return (
    <MiscellaneousSettingsClient
      user={session.user}
      initialSettings={settings}
      defaultSettings={{
        siteUrl: SITE_URL,
        navItems: serializeArrayWithIcon(navItems),
        footerLinks,
        openPositions,
        benefits: serializeArrayWithIcon(benefits),
        timeSlots,
        corporateLawServices,
        corporateLawMeetingServices,
        corporateLawComplianceAreas,
        ipoFeatures,
        ipoProcessSteps: serializeArrayWithIcon(ipoProcessSteps),
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
      }}
    />
  );
}
