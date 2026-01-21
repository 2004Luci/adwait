import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getSettingByKey, SETTING_KEYS } from "@/lib/db/settings";
import { partners, achievements, clientLogos } from "@/lib/constants";
import { serializeArrayWithIcon } from "@/lib/utils/icon-serialization";
import { AboutSettingsClient } from "./AboutSettingsClient";

/**
 * About & Team Settings Page
 */
export default async function AboutSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  // Fetch current settings or use defaults
  const partnersSetting = await getSettingByKey(SETTING_KEYS.PARTNERS);
  const achievementsSetting = await getSettingByKey(SETTING_KEYS.ACHIEVEMENTS);
  const clientLogosSetting = await getSettingByKey(SETTING_KEYS.CLIENT_LOGOS);

  // If data comes from DB, icons should already be strings
  // If from constants.ts, convert icon components to strings
  const currentPartners = partnersSetting?.value
    ? (partnersSetting.value as typeof partners)
    : partners;
  const currentAchievements = achievementsSetting?.value
    ? (achievementsSetting.value as Array<{ icon: string;[key: string]: unknown }>)
    : serializeArrayWithIcon(achievements);
  const currentClientLogos = clientLogosSetting?.value || clientLogos;

  // Serialize default achievements for client component
  const defaultAchievementsSerialized = serializeArrayWithIcon(achievements);

  return (
    <AboutSettingsClient
      user={session.user}
      initialPartners={currentPartners as typeof partners}
      initialAchievements={currentAchievements}
      initialClientLogos={currentClientLogos as string[]}
      defaultPartners={partners}
      defaultAchievements={defaultAchievementsSerialized}
      defaultClientLogos={clientLogos}
    />
  );
}
