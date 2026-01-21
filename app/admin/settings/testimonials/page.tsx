import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getSettingByKey, SETTING_KEYS } from "@/lib/db/settings";
import { testimonials, caseStudies } from "@/lib/constants";
import { TestimonialsSettingsClient } from "./TestimonialsSettingsClient";

/**
 * Testimonials Settings Page
 */
export default async function TestimonialsSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  // Fetch current settings or use defaults
  const testimonialsSetting = await getSettingByKey(SETTING_KEYS.TESTIMONIALS);
  const caseStudiesSetting = await getSettingByKey(SETTING_KEYS.CASE_STUDIES);

  const currentTestimonials = testimonialsSetting?.value || testimonials;
  const currentCaseStudies = caseStudiesSetting?.value || caseStudies;

  return (
    <TestimonialsSettingsClient
      user={session.user}
      initialTestimonials={currentTestimonials as typeof testimonials}
      initialCaseStudies={currentCaseStudies as typeof caseStudies}
      defaultTestimonials={testimonials}
      defaultCaseStudies={caseStudies}
    />
  );
}
