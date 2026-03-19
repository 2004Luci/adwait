import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getSettingByKey, SETTING_KEYS } from "@/lib/db/settings";
import { heroStats, heroTypewriterPhrases } from "@/lib/constants";
import { HeroSettingsClient } from "./HeroSettingsClient";

/**
 * Hero Section Settings Page
 */
export default async function HeroSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  // Fetch current settings or use defaults
  const statsSetting = await getSettingByKey(SETTING_KEYS.HERO_STATS);
  const phrasesSetting = await getSettingByKey(SETTING_KEYS.HERO_TYPEWRITER_PHRASES);

  const currentStats = statsSetting?.value || heroStats;
  const currentPhrases = phrasesSetting?.value || heroTypewriterPhrases;

  return (
    <HeroSettingsClient
      user={session.user}
      initialStats={currentStats as typeof heroStats}
      initialPhrases={currentPhrases as string[]}
      defaultStats={heroStats}
      defaultPhrases={heroTypewriterPhrases}
    />
  );
}
