import type { Locale } from "./i18n";
import type { Property } from "./seed";

export function propTitle(p: Property, locale: Locale): string {
  return locale === "he" ? p.titleHe : p.title;
}
export function propDistrict(p: Property, locale: Locale): string {
  return locale === "he" ? p.districtHe : p.district;
}
export function propAbout(p: Property, locale: Locale): string {
  return locale === "he" ? p.aboutHe : p.about;
}
export function fundingPct(p: Property): number {
  return Math.round((p.fundingRaised / p.fundingTarget) * 100);
}
