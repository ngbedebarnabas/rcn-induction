
export interface SpiritualHistoryItem {
  id: number;
  text: string;
}

export interface StepOneFormData {
  // Personal Bio-Data
  fullName: string;
  address: string;
  email: string;
  phoneNumbers: string;
  socialMediaHandles: string[];
  recommendedBy: string;
  placeOfBirth: string;
  dateOfBirth: string;
  maritalStatus: string;

  // Optional marital information
  isDivorced?: "Yes" | "No";
  divorceCount?: string;
  lastDivorceDate?: string;
  childrenCount?: string;
  spouseName?: string;
  isSpouseBeliever?: "Yes" | "No" | "Not Married";
  spouseDateOfBirth?: string;
  anniversaryDate?: string;
}

export interface StepTwoFormData {
  // Spiritual background (moved from old step 1)
  dateOfNewBirth: string;
  dateOfWaterBaptism: string;
  dateOfHolyGhostBaptism: string;
  ministryGift: string;
  spiritualGifts: string;

  // Spiritual information
  acceptedChristDate: string;
  waterBaptized: string;
  prayInTongues: string;
  believeInTongues?: string;
  desireTongues?: string;
  spiritualGiftsManifest: string;

  // Education / training
  formalChristianTraining: string;
  trainingInstitution?: string;
  trainingDuration?: string;
  previouslyOrdained: string;
  ordinationType?: string;
  ordinationDate?: string;
  ordinationBy?: string;

  // Ministry
  denominationalBackground: string;
  currentAffiliation: string;
  currentCapacity: string;
  ministryDescription: string;
  ministryDuration: string;
  ministryIncome: string;

  // Employment
  otherEmployment: string;
  employmentDescription?: string;
  employmentAddress?: string;

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
}

export interface StepThreeFormData {
  conversionExperience: string;
  devotionalPattern: string;
  familyDevotional: string;
  godsCallExperience: string;
  ministryConcept: string;
  futureVision: string;
  ministrySuccessDefinition: string;
  ministryStrengths: string;
  ministryWeaknesses: string;
  relationshipEvaluation: string;
  nonOrdinationEffect: string;
  spouseMinistryFeelings: string;
  acceptTerms: boolean;
}
