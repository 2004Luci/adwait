import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getSettingByKey, SETTING_KEYS } from "@/lib/db/settings";
import { services, serviceList } from "@/lib/constants";
import { serializeServices } from "@/lib/utils/icon-serialization";
import { ServicesSettingsClient } from "./ServicesSettingsClient";

/**
 * Services Settings Page
 */
export default async function ServicesSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  // Fetch current settings or use defaults
  const servicesSetting = await getSettingByKey(SETTING_KEYS.SERVICES);
  const serviceListSetting = await getSettingByKey(SETTING_KEYS.SERVICE_LIST);

  // If services come from DB, they should already have string icons
  // If from constants.ts, we need to convert icon components to strings
  const currentServices = servicesSetting?.value
    ? (servicesSetting.value as Array<{ icon: string;[key: string]: unknown }>)
    : serializeServices(services);

  const currentServiceList = serviceListSetting?.value || serviceList;

  // Convert default services to have string icons for client component
  const defaultServicesSerialized = serializeServices(services);

  return (
    <ServicesSettingsClient
      user={session.user}
      initialServices={currentServices}
      initialServiceList={currentServiceList as string[]}
      defaultServices={defaultServicesSerialized}
      defaultServiceList={serviceList}
    />
  );
}
