import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getSettingByKey, SETTING_KEYS } from "@/lib/db/settings";
import { expertiseAreas, expertiseProcessSteps, processSteps } from "@/lib/constants";
import { serializeArrayWithIcon } from "@/lib/utils/icon-serialization";
import { ExpertiseSettingsClient } from "./ExpertiseSettingsClient";

/**
 * Expertise Settings Page
 */
export default async function ExpertiseSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  // Fetch current settings or use defaults
  const expertiseAreasSetting = await getSettingByKey(SETTING_KEYS.EXPERTISE_AREAS);
  const expertiseProcessStepsSetting = await getSettingByKey(
    SETTING_KEYS.EXPERTISE_PROCESS_STEPS
  );
  const processStepsSetting = await getSettingByKey(SETTING_KEYS.PROCESS_STEPS);

  const currentExpertiseAreas = expertiseAreasSetting?.value || expertiseAreas;
  // If data comes from DB, icons should already be strings
  // If from constants.ts, convert icon components to strings
  const currentExpertiseProcessSteps = expertiseProcessStepsSetting?.value
    ? (expertiseProcessStepsSetting.value as Array<{ icon: string;[key: string]: unknown }>)
    : serializeArrayWithIcon(expertiseProcessSteps);
  const currentProcessSteps = processStepsSetting?.value
    ? (processStepsSetting.value as Array<{ icon: string;[key: string]: unknown }>)
    : serializeArrayWithIcon(processSteps);

  // Serialize defaults for client component
  const defaultExpertiseProcessStepsSerialized = serializeArrayWithIcon(expertiseProcessSteps);
  const defaultProcessStepsSerialized = serializeArrayWithIcon(processSteps);

  return (
    <ExpertiseSettingsClient
      user={session.user}
      initialExpertiseAreas={currentExpertiseAreas as typeof expertiseAreas}
      initialExpertiseProcessSteps={currentExpertiseProcessSteps}
      initialProcessSteps={currentProcessSteps}
      defaultExpertiseAreas={expertiseAreas}
      defaultExpertiseProcessSteps={defaultExpertiseProcessStepsSerialized}
      defaultProcessSteps={defaultProcessStepsSerialized}
    />
  );
}
