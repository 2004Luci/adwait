import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getSettingByKey, SETTING_KEYS } from "@/lib/db/settings";
import { CarouselSettingsClient } from "./CarouselSettingsClient";

/**
 * Carousel Settings Page
 */
export default async function CarouselSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  // Fetch current settings or use defaults
  const widthSetting = await getSettingByKey(SETTING_KEYS.CAROUSEL_WIDTH);
  const heightSetting = await getSettingByKey(SETTING_KEYS.CAROUSEL_HEIGHT);
  const rotationIntervalSetting = await getSettingByKey(
    SETTING_KEYS.CAROUSEL_ROTATION_INTERVAL
  );

  const currentWidth = widthSetting?.value || "100%";
  const currentHeight = heightSetting?.value || "auto";
  const currentRotationInterval = rotationIntervalSetting?.value || 5000;

  return (
    <CarouselSettingsClient
      user={session.user}
      initialWidth={currentWidth as string | number}
      initialHeight={currentHeight as string | number}
      initialRotationInterval={currentRotationInterval as number}
      defaultWidth="100%"
      defaultHeight="auto"
      defaultRotationInterval={5000}
    />
  );
}
