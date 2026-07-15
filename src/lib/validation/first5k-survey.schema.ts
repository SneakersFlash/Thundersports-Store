import { z } from "zod";

// ─── Option lists (mirrors the FIRST 5K CLUB Post Event Survey) ──────────────

export const PACE_GROUP_OPTIONS = ["Pace 7", "Pace 8"] as const;

export const FIRST_EXPERIENCE_OPTIONS = [
  "Yes, this was my first 5K event",
  "No, I've joined other running events before",
] as const;

export const LIKED_PARTS_OPTIONS = [
  "Route 5K",
  "Pacer",
  "Community vibes",
  "Venue",
  "Jersey",
  "Coffee & meals",
  "Sponsor products",
  "Post-run games",
  "Sneakers giveaway",
  "Documentation",
  "Other",
] as const;

export const PACER_HELPFUL_OPTIONS = [
  "Yes, very helpful",
  "Helpful enough",
  "Neutral",
  "Not really",
] as const;

export const ROUTE_COMFORT_OPTIONS = ["Yes", "Quite okay", "Not really", "No"] as const;

export const POST_RUN_GAMES_OPTIONS = [
  "Fun and engaging",
  "Good but can be improved",
  "Neutral",
  "Not interesting",
] as const;

export const DURATION_OPTIONS = ["Yes, just right", "Too short", "Too long"] as const;

export const BENEFIT_INTEREST_OPTIONS = ["Yes", "Quite okay", "Not really"] as const;

export const FAVORITE_BENEFIT_OPTIONS = [
  "Jersey",
  "Chance to win sneakers",
  "Coffee & meals",
  "Sponsor products",
  "Running with pacer",
  "Meeting new people",
  "Post-run games",
  "Documentation",
] as const;

export const NEXT_ACTIVITY_INTEREST_OPTIONS = [
  "Yes, definitely",
  "Maybe",
  "Not sure yet",
  "No",
] as const;

export const COMMUNITY_INTEREST_OPTIONS = [
  "Yes, I'm interested",
  "Maybe, depends on the schedule",
  "Not yet",
] as const;

export const DESIRED_ACTIVITIES_OPTIONS = [
  "Weekly easy run",
  "Beginner 5K training",
  "Long run session",
  "Strength training for runners",
  "Running workshop",
  "Race preparation",
  "Social run + coffee",
  "Product trial run",
  "Community challenge",
  "Other",
] as const;

export const PREFERRED_DAYS_OPTIONS = [
  "Weekday morning",
  "Weekday evening",
  "Saturday morning",
  "Sunday morning",
] as const;

export const PREFERRED_AREAS_OPTIONS = [
  "Jakarta Selatan",
  "GBK / Senayan",
  "Blok M / Melawai",
  "SCBD",
  "Kemang",
  "Bintaro",
  "BSD",
  "Other",
] as const;

export const NEXT_FORMAT_OPTIONS = [
  "Fun run",
  "Training session",
  "Community run",
  "Race preparation",
  "Running workshop",
  "Social run with coffee",
  "Product trial run",
] as const;

export const TESTIMONIAL_PERMISSION_OPTIONS = ["Yes, boleh", "No, jangan digunakan"] as const;

export const CONTACT_PERMISSION_OPTIONS = ["Yes", "No"] as const;

// A linear scale answer: 0 = belum dipilih, 1–5 = jawaban.
const scale = z.number().int().min(0).max(5).default(0);

// ─── Section schemas ─────────────────────────────────────────────────────────

export const section1Schema = z.object({
  namaLengkap: z.string().trim().min(1, "Nama lengkap wajib diisi"),
  instagram: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length > 0 && !v.startsWith("@") ? `@${v}` : v ?? "")),
  whatsapp: z
    .string()
    .trim()
    .min(9, "Nomor WhatsApp minimal 9 digit")
    .regex(/^[0-9+\s-]+$/, "Format nomor WhatsApp tidak valid"),
  paceGroup: z.enum(PACE_GROUP_OPTIONS).optional().or(z.literal("")),
  firstExperience: z.enum(FIRST_EXPERIENCE_OPTIONS).optional().or(z.literal("")),
});

export const section2Schema = z.object({
  overallExperience: scale,
  likedParts: z.array(z.string()).default([]),
  likedPartsOther: z.string().trim().optional(),
  pacerExperience: scale,
  pacerHelpful: z.enum(PACER_HELPFUL_OPTIONS).optional().or(z.literal("")),
  routeComfort: z.enum(ROUTE_COMFORT_OPTIONS).optional().or(z.literal("")),
  improvement: z.string().trim().optional(),
});

export const section3Schema = z.object({
  postRunGames: z.enum(POST_RUN_GAMES_OPTIONS).optional().or(z.literal("")),
  duration: z.enum(DURATION_OPTIONS).optional().or(z.literal("")),
  benefitInterest: z.enum(BENEFIT_INTEREST_OPTIONS).optional().or(z.literal("")),
  favoriteBenefit: z.array(z.string()).default([]),
  memorableBenefit: z.string().trim().optional(),
});

export const section4Schema = z.object({
  nextActivityInterest: z.enum(NEXT_ACTIVITY_INTEREST_OPTIONS).optional().or(z.literal("")),
  communityInterest: z.enum(COMMUNITY_INTEREST_OPTIONS).optional().or(z.literal("")),
  desiredActivities: z.array(z.string()).default([]),
  desiredActivitiesOther: z.string().trim().optional(),
  preferredDays: z.array(z.string()).default([]),
  preferredAreas: z.array(z.string()).default([]),
  preferredAreasOther: z.string().trim().optional(),
  nextFormat: z.enum(NEXT_FORMAT_OPTIONS).optional().or(z.literal("")),
});

export const section5Schema = z.object({
  testimonialOneLine: z.string().trim().optional(),
  testimonialPermission: z.enum(TESTIMONIAL_PERMISSION_OPTIONS).optional().or(z.literal("")),
  contactPermission: z.enum(CONTACT_PERMISSION_OPTIONS).optional().or(z.literal("")),
  additionalMessage: z.string().trim().optional(),
});

// ─── Full schema ─────────────────────────────────────────────────────────────

export const first5kSurveySchema = section1Schema
  .merge(section2Schema)
  .merge(section3Schema)
  .merge(section4Schema)
  .merge(section5Schema);

export type First5kSurveyFormValues = z.infer<typeof first5kSurveySchema>;

export const STEP_FIELDS: Record<number, (keyof First5kSurveyFormValues)[]> = {
  1: ["namaLengkap", "instagram", "whatsapp", "paceGroup", "firstExperience"],
  2: ["overallExperience", "likedParts", "likedPartsOther", "pacerExperience", "pacerHelpful", "routeComfort", "improvement"],
  3: ["postRunGames", "duration", "benefitInterest", "favoriteBenefit", "memorableBenefit"],
  4: ["nextActivityInterest", "communityInterest", "desiredActivities", "desiredActivitiesOther", "preferredDays", "preferredAreas", "preferredAreasOther", "nextFormat"],
  5: ["testimonialOneLine", "testimonialPermission", "contactPermission", "additionalMessage"],
};

export const TOTAL_STEPS = 5;

export const defaultFirst5kSurveyValues: First5kSurveyFormValues = {
  namaLengkap: "",
  instagram: "",
  whatsapp: "",
  paceGroup: "",
  firstExperience: "",
  overallExperience: 0,
  likedParts: [],
  likedPartsOther: "",
  pacerExperience: 0,
  pacerHelpful: "",
  routeComfort: "",
  improvement: "",
  postRunGames: "",
  duration: "",
  benefitInterest: "",
  favoriteBenefit: [],
  memorableBenefit: "",
  nextActivityInterest: "",
  communityInterest: "",
  desiredActivities: [],
  desiredActivitiesOther: "",
  preferredDays: [],
  preferredAreas: [],
  preferredAreasOther: "",
  nextFormat: "",
  testimonialOneLine: "",
  testimonialPermission: "",
  contactPermission: "",
  additionalMessage: "",
};
