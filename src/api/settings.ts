/**
 * Settings API Helper
 * Fetches public settings data
 */

import { SiteSettingsRealtimePayload } from '@/src/types/socket';
import { apiClient } from './client';

/**
 * Get current site settings (initial load)
 */
export const fetchSiteSettings = async (): Promise<SiteSettingsRealtimePayload> => {
  try {
    const data = (await apiClient.getSettings()) as Partial<SiteSettingsRealtimePayload> | null;

    // Map API response to payload format
    return {
      maintenanceMode: data?.maintenanceMode ?? false,
      maintenanceMessage: data?.maintenanceMessage ?? null,
      maintenanceEndTime: data?.maintenanceEndTime ?? null,
      whatsappNumber: data?.whatsappNumber ?? null,
      servicesHeroTitle: data?.servicesHeroTitle ?? null,
      servicesHeroGradient: data?.servicesHeroGradient ?? null,
      servicesHeroBadge: data?.servicesHeroBadge ?? null,
      servicesHeroDescription: data?.servicesHeroDescription ?? null,
      servicesHeroBtn1Text: data?.servicesHeroBtn1Text ?? null,
      servicesHeroBtn1Url: data?.servicesHeroBtn1Url ?? null,
      servicesHeroBtn2Text: data?.servicesHeroBtn2Text ?? null,
      servicesHeroBtn2Url: data?.servicesHeroBtn2Url ?? null,
      servicesCapTitle: data?.servicesCapTitle ?? null,
      servicesCapHighlight: data?.servicesCapHighlight ?? null,
      servicesCapBadge: data?.servicesCapBadge ?? null,
      servicesCapDescription: data?.servicesCapDescription ?? null,
      servicesProcessTitle: data?.servicesProcessTitle ?? null,
      servicesProcessBadge: data?.servicesProcessBadge ?? null,
      servicesProcessDescription: data?.servicesProcessDescription ?? null,
      servicesProcessSteps: data?.servicesProcessSteps ?? null,
      servicesWhyTitle: data?.servicesWhyTitle ?? null,
      servicesWhyBadge: data?.servicesWhyBadge ?? null,
      servicesWhyDescription: data?.servicesWhyDescription ?? null,
      servicesWhyItems: data?.servicesWhyItems ?? null,
      servicesWhyPromiseBadge: data?.servicesWhyPromiseBadge ?? null,
      servicesWhyPromiseQuote: data?.servicesWhyPromiseQuote ?? null,
      servicesWhyPromiseAuthor: data?.servicesWhyPromiseAuthor ?? null,
      servicesWhyPromiseSub: data?.servicesWhyPromiseSub ?? null,
      servicesWhyPromiseTags: data?.servicesWhyPromiseTags ?? null,
      servicesCtaTitle: data?.servicesCtaTitle ?? null,
      servicesCtaBadge: data?.servicesCtaBadge ?? null,
      servicesCtaDescription: data?.servicesCtaDescription ?? null,
      servicesCtaBtn1Text: data?.servicesCtaBtn1Text ?? null,
      servicesCtaBtn1Url: data?.servicesCtaBtn1Url ?? null,
      servicesCtaBtn2Text: data?.servicesCtaBtn2Text ?? null,
      servicesCtaBtn2Url: data?.servicesCtaBtn2Url ?? null,

      homeVideoUrl: data?.homeVideoUrl ?? null,
      homeVideoEnabled: data?.homeVideoEnabled ?? false,

      // Contact – Hero & Presence
      contactHeroTitle: data?.contactHeroTitle ?? null,
      contactHeroDescription: data?.contactHeroDescription ?? null,
      contactGlobalPresenceBadge: data?.contactGlobalPresenceBadge ?? null,
      contactGlobalPresenceTitle: data?.contactGlobalPresenceTitle ?? null,

      // Contact – Branch 1
      contactBranch1Title: data?.contactBranch1Title ?? null,
      contactBranch1Address: data?.contactBranch1Address ?? null,
      contactBranch1MapLink: data?.contactBranch1MapLink ?? null,
      contactBranch1LatLong: data?.contactBranch1LatLong ?? null,
      contactBranch1MarkerX: data?.contactBranch1MarkerX ?? null,
      contactBranch1MarkerY: data?.contactBranch1MarkerY ?? null,

      // Contact – Branch 2
      contactBranch2Title: data?.contactBranch2Title ?? null,
      contactBranch2Address: data?.contactBranch2Address ?? null,
      contactBranch2MapLink: data?.contactBranch2MapLink ?? null,
      contactBranch2LatLong: data?.contactBranch2LatLong ?? null,
      contactBranch2MarkerX: data?.contactBranch2MarkerX ?? null,
      contactBranch2MarkerY: data?.contactBranch2MarkerY ?? null,

      // Contact – Branch 3
      contactBranch3Title: data?.contactBranch3Title ?? null,
      contactBranch3Address: data?.contactBranch3Address ?? null,
      contactBranch3MapLink: data?.contactBranch3MapLink ?? null,
      contactBranch3LatLong: data?.contactBranch3LatLong ?? null,
      contactBranch3MarkerX: data?.contactBranch3MarkerX ?? null,
      contactBranch3MarkerY: data?.contactBranch3MarkerY ?? null,

      // Contact – Support Channels
      contactSupportTitle: data?.contactSupportTitle ?? null,
      contactSupportDescription: data?.contactSupportDescription ?? null,
      contactSupportItem1Title: data?.contactSupportItem1Title ?? null,
      contactSupportItem1Desc: data?.contactSupportItem1Desc ?? null,
      contactSupportItem1Link: data?.contactSupportItem1Link ?? null,
      contactSupportItem2Title: data?.contactSupportItem2Title ?? null,
      contactSupportItem2Desc: data?.contactSupportItem2Desc ?? null,
      contactSupportItem2Link: data?.contactSupportItem2Link ?? null,
      contactSupportItem3Title: data?.contactSupportItem3Title ?? null,
      contactSupportItem3Desc: data?.contactSupportItem3Desc ?? null,
      contactSupportItem3Status: data?.contactSupportItem3Status ?? null,

      // Contact – FAQs
      contactFaqTitle: data?.contactFaqTitle ?? null,
      contactFaqDescription: data?.contactFaqDescription ?? null,
      contactFaq1Question: data?.contactFaq1Question ?? null,
      contactFaq1Answer: data?.contactFaq1Answer ?? null,
      contactFaq2Question: data?.contactFaq2Question ?? null,
      contactFaq2Answer: data?.contactFaq2Answer ?? null,
      contactFaq3Question: data?.contactFaq3Question ?? null,
      contactFaq3Answer: data?.contactFaq3Answer ?? null,
      contactBranches: data?.contactBranches ?? null,

      updatedAt: data?.updatedAt ?? new Date().toISOString(),
    };
  } catch (error) {
    console.warn('[Settings API] Error:', error);
    // Return safe defaults if fetch fails
    return {
      maintenanceMode: false,
      maintenanceMessage: null,
      maintenanceEndTime: null,
      whatsappNumber: null,
      servicesHeroTitle: null,
      servicesHeroGradient: null,
      servicesHeroBadge: null,
      servicesHeroDescription: null,
      servicesHeroBtn1Text: null,
      servicesHeroBtn1Url: null,
      servicesHeroBtn2Text: null,
      servicesHeroBtn2Url: null,
      servicesCapTitle: null,
      servicesCapHighlight: null,
      servicesCapBadge: null,
      servicesCapDescription: null,
      servicesProcessTitle: null,
      servicesProcessBadge: null,
      servicesProcessDescription: null,
      servicesProcessSteps: null,
      servicesWhyTitle: null,
      servicesWhyBadge: null,
      servicesWhyDescription: null,
      servicesWhyItems: null,
      servicesWhyPromiseBadge: null,
      servicesWhyPromiseQuote: null,
      servicesWhyPromiseAuthor: null,
      servicesWhyPromiseSub: null,
      servicesWhyPromiseTags: null,
      servicesCtaTitle: null,
      servicesCtaBadge: null,
      servicesCtaDescription: null,
      servicesCtaBtn1Text: null,
      servicesCtaBtn1Url: null,
      servicesCtaBtn2Text: null,
      servicesCtaBtn2Url: null,

      // Contact Defaults
      contactHeroTitle: null,
      contactHeroDescription: null,
      contactGlobalPresenceBadge: null,
      contactGlobalPresenceTitle: null,
      contactBranch1Title: null,
      contactBranch1Address: null,
      contactBranch1MapLink: null,
      contactBranch1LatLong: null,
      contactBranch1MarkerX: null,
      contactBranch1MarkerY: null,
      contactBranch2Title: null,
      contactBranch2Address: null,
      contactBranch2MapLink: null,
      contactBranch2LatLong: null,
      contactBranch2MarkerX: null,
      contactBranch2MarkerY: null,
      contactBranch3Title: null,
      contactBranch3Address: null,
      contactBranch3MapLink: null,
      contactBranch3LatLong: null,
      contactBranch3MarkerX: null,
      contactBranch3MarkerY: null,
      contactSupportTitle: null,
      contactSupportDescription: null,
      contactSupportItem1Title: null,
      contactSupportItem1Desc: null,
      contactSupportItem1Link: null,
      contactSupportItem2Title: null,
      contactSupportItem2Desc: null,
      contactSupportItem2Link: null,
      contactSupportItem3Title: null,
      contactSupportItem3Desc: null,
      contactSupportItem3Status: null,
      contactFaqTitle: null,
      contactFaqDescription: null,
      contactFaq1Question: null,
      contactFaq1Answer: null,
      contactFaq2Question: null,
      contactFaq2Answer: null,
      contactFaq3Question: null,
      contactFaq3Answer: null,
      contactBranches: null,

      updatedAt: new Date().toISOString(),
    };
  }
};
