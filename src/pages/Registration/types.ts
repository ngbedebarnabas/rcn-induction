
export interface SpiritualHistoryItem {
  id: number;
  text: string;
}

export interface StepOneFormData {
  // Personal Bio-Data
  firstName: string;
  middleName?: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumbers: string[];
  socialMediaHandles: string[];
  recommendedBy: string;
  recommenderFullName: string;
  recommenderPhone: string;
  placeOfBirth: string;
  dateOfBirth: string;
  maritalStatus: string;

  // Optional marital information
  isDivorced?: "Yes" | "No";
  divorceCount?: string;
  lastDivorceDate?: string;
  childrenCount?: string;
  spouseName?: string;
  isSpouseBeliever?: "Yes" | "No";
  spouseDateOfBirth?: string;
  anniversaryDate?: string;
}

export const SPIRITUAL_GIFT_OPTIONS = [
  "Word of Knowledge",
  "Word of Wisdom",
  "Gift of Faith",
  "Gifts of Healing",
  "Discernment of Spirits",
  "Prophecy",
  "Working of Miracles",
  "Gift of Diverse Kinds of Tongues",
  "Gift of Interpretation of Tongues",
  "Gift of Helps",
  "Gift of Administration",
] as const;

export interface StepTwoFormData {
  // Spiritual information
  acceptedChristDate: string; // Date of New Birth
  waterBaptized: "Yes" | "No";
  dateOfWaterBaptism?: string;
  dateOfHolyGhostBaptism?: string;
  prayInTongues: "Yes" | "No";
  believeInTongues?: "Yes" | "No";
  desireTongues?: "Yes" | "No";

  // Spiritual gifts (multi-select via checkboxes)
  spiritualGiftsList: string[];
  spiritualGiftsOther?: string;

  // Theological education
  formalChristianTraining: "Yes" | "No";
  trainingInstitution?: string;
  highestProgramme?: string;
  trainingDuration?: string;

  // Ordination
  previouslyOrdained: "Yes" | "No";
  ordinationType?: "Licensed" | "Ordained" | "";
  ordinationDate?: string;
  ordinationBy?: string;
  ordinationDenomination?: string;

  // Ministry affiliation
  currentAffiliation: string;
  currentCapacity: string;
  ministryDuration: string;
  ministryIncome: string;

  // Employment
  otherEmployment: "Yes" | "No";
  employmentDescription?: string;
}

export interface StepThreeFormData {
  // References
  pastorName: string;
  pastorEmail: string;
  pastorPhone: string;
  ministerName: string;
  ministerEmail: string;
  ministerPhone: string;
  elderName: string;
  elderEmail: string;
  elderPhone: string;
  // Undertaking
  acceptTerms: boolean;
}
