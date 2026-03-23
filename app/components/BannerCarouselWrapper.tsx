import { getActiveBanners } from "@/lib/db/banners";
import { getSettingByKey, SETTING_KEYS } from "@/lib/db/settings";
import { BannerCarousel } from "./BannerCarousel";

/**
 * Server Component wrapper that fetches active banners and carousel settings
 */
export async function BannerCarouselWrapper() {
  try {
    const banners = await getActiveBanners();

    if (banners.length === 0) {
      return null;
    }

    // Fetch carousel settings with defaults
    const widthSetting = await getSettingByKey(SETTING_KEYS.CAROUSEL_WIDTH);
    const heightSetting = await getSettingByKey(SETTING_KEYS.CAROUSEL_HEIGHT);
    const rotationIntervalSetting = await getSettingByKey(
      SETTING_KEYS.CAROUSEL_ROTATION_INTERVAL
    );

    const width = widthSetting?.value as string | number | undefined || "100%";
    const height = heightSetting?.value as string | number | undefined || "auto";
    const rotationInterval =
      (rotationIntervalSetting?.value as number | undefined) || 5000;

    return (
      <BannerCarousel
        banners={banners}
        width={width}
        height={height}
        rotationInterval={rotationInterval}
      />
    );
  } catch (error) {
    // Silently fail - don't break the page if banners can't be fetched
    console.error("[Banners] Failed to fetch:", error);
    return null;
  }
}
