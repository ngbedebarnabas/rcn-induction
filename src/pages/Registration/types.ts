
export interface SpiritualHistoryItem {
  id: number;
  text: string;
}

export interface StepOneFormData {
  fullName: string;
  dateOfBirth: string;
  dateOfNewBirth: string;
  dateOfWaterBaptism: string;
  dateOfHolyGhostBaptism: string;
  maritalStatus: string;
  ministryGift: string;
  spiritualGifts: string;
}

export interface StepTwoFormData {
  address: string;
  phoneNumbers: string;
  email: string;
  socialMedia?: string;
  recommendedBy: string;
  placeOfBirth: string;
  isDivorced: string;
  divorceCount?: string;
  lastDivorceDate?: string;
  childrenCount: string;
  spouseName: string;
  isSpouseBeliever: string;
  spouseDateOfBirth: string;
  anniversaryDate: string;
  acceptedChristDate: string;
  waterBaptized: string;
  prayInTongues: string;
  believeInTongues?: string;
  desireTongues?: string;
  spiritualGiftsManifest: string;
  formalChristianTraining: string;
  trainingInstitution?: string;
  trainingDuration?: string;
  previouslyOrdained: string;
  ordinationType?: string;
  ordinationDate?: string;
  ordinationBy?: string;
  denominationalBackground: string;
  currentAffiliation: string;
  currentCapacity: string;
  ministryDescription: string;
  ministryDuration: string;
  ministryIncome: string;
  otherEmployment: string;
  employmentDescription?: string;
  employmentAddress?: string;
  pastorName: string;
  pastorEmail: string;
  pastorPhone: string;
  ministerName: string;
  ministerEmail: string;
  ministerPhone: string;
  elderName: string;
  elderEmail: string;
  elderPhone: string;
  acceptTerms: boolean;
}
