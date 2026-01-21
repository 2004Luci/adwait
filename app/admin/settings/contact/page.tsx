import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getSettingByKey, SETTING_KEYS } from "@/lib/db/settings";
import {
  contactEmail,
  contactPhone,
  contactAddress,
  contactBusinessHours,
  companyEmails,
  OFFICE_MAPS_URL,
  contactInfo,
} from "@/lib/constants";
import { serializeArrayWithIcon } from "@/lib/utils/icon-serialization";
import { ContactSettingsClient } from "./ContactSettingsClient";

/**
 * Contact Info Settings Page
 */
export default async function ContactSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  // Fetch current settings or use defaults
  const contactEmailSetting = await getSettingByKey(SETTING_KEYS.CONTACT_EMAIL);
  const contactPhoneSetting = await getSettingByKey(SETTING_KEYS.CONTACT_PHONE);
  const contactAddressSetting = await getSettingByKey(SETTING_KEYS.CONTACT_ADDRESS);
  const businessHoursSetting = await getSettingByKey(SETTING_KEYS.BUSINESS_HOURS);
  const companyEmailsSetting = await getSettingByKey(SETTING_KEYS.COMPANY_EMAILS);
  const officeMapsUrlSetting = await getSettingByKey(SETTING_KEYS.OFFICE_MAPS_URL);
  const contactInfoSetting = await getSettingByKey(SETTING_KEYS.CONTACT_INFO);

  const currentContactEmail = contactEmailSetting?.value || contactEmail;
  const currentContactPhone = contactPhoneSetting?.value || contactPhone;
  const currentContactAddress = contactAddressSetting?.value || contactAddress;
  const currentBusinessHours = businessHoursSetting?.value || contactBusinessHours;
  const currentCompanyEmails = companyEmailsSetting?.value || companyEmails;
  const currentOfficeMapsUrl = officeMapsUrlSetting?.value || OFFICE_MAPS_URL;
  // If contactInfo comes from DB, icons should already be strings
  // If from constants.ts, convert icon components to strings
  const currentContactInfo = contactInfoSetting?.value
    ? (contactInfoSetting.value as Array<{ icon: string; title: string; details: string[]; color: string; clickable?: boolean }>)
    : serializeArrayWithIcon(contactInfo);

  // Serialize default contactInfo for client component
  const defaultContactInfoSerialized = serializeArrayWithIcon(contactInfo);

  return (
    <ContactSettingsClient
      user={session.user}
      initialContactEmail={currentContactEmail as string}
      initialContactPhone={currentContactPhone as string}
      initialContactAddress={currentContactAddress as string}
      initialBusinessHours={currentBusinessHours as string}
      initialCompanyEmails={currentCompanyEmails as string[]}
      initialOfficeMapsUrl={currentOfficeMapsUrl as string}
      initialContactInfo={currentContactInfo as Array<{ icon: string; title: string; details: string[]; color: string; clickable?: boolean }>}
      defaultContactEmail={contactEmail}
      defaultContactPhone={contactPhone}
      defaultContactAddress={contactAddress}
      defaultBusinessHours={contactBusinessHours}
      defaultCompanyEmails={companyEmails}
      defaultOfficeMapsUrl={OFFICE_MAPS_URL}
      defaultContactInfo={defaultContactInfoSerialized}
    />
  );
}
