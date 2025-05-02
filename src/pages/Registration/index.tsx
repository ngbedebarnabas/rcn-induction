import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RegistrationStepOne from "./components/RegistrationStepOne";
import RegistrationStepTwo from "./components/RegistrationStepTwo";
import RegistrationStepThree from "./components/RegistrationStepThree";
import SuccessMessage from "./components/SuccessMessage";
import { StepOneFormData, StepTwoFormData, StepThreeFormData } from "./types";
import PageHeader from "@/components/PageHeader";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";

const Registration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [spiritualHistory, setSpiritualHistory] = useState<
    Array<{ id: number; text: string }>
  >([{ id: 1, text: "" }]);
  const [passportImage, setPassportImage] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [stepOneData, setStepOneData] = useState<StepOneFormData | null>(null);
  const [stepTwoData, setStepTwoData] = useState<StepTwoFormData | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Add another spiritual history entry
  const addSpiritualHistory = () => {
    setSpiritualHistory([
      ...spiritualHistory,
      { id: spiritualHistory.length + 1, text: "" },
    ]);
  };

  // Update a spiritual history entry
  const updateSpiritualHistory = (id: number, value: string) => {
    setSpiritualHistory(
      spiritualHistory.map((item) =>
        item.id === id ? { ...item, text: value } : item
      )
    );
  };

  // Remove a spiritual history entry
  const removeSpiritualHistory = (id: number) => {
    if (spiritualHistory.length > 1) {
      setSpiritualHistory(spiritualHistory.filter((item) => item.id !== id));
    }
  };

  // Handle passport image upload
  const handlePassportChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPassportImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPassportPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove passport image
  const removePassport = () => {
    setPassportImage(null);
    setPassportPreview(null);
  };

  // Upload file to Supabase storage - updated function with better error handling
  const uploadFile = async (file: File, folder: string) => {
    try {
      console.log(`Uploading file to registrations/${folder}`);

      // Create a unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${uuidv4()}.${fileExt}`;
      
      console.log(`Generated filename: ${fileName}`);

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size exceeds 5MB limit");
      }

      // Upload the file with better error handling
      const { data, error } = await supabase.storage
        .from("registrations")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true, // Changed to true to allow overwriting
        });

      if (error) {
        console.error("Error uploading file:", error);
        throw error;
      }

      console.log("File uploaded successfully:", data);

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from("registrations")
        .getPublicUrl(fileName);

      if (!urlData || !urlData.publicUrl) {
        throw new Error("Failed to get public URL for uploaded file");
      }

      console.log("Public URL:", urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error("Error in uploadFile function:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Unknown error during file upload",
        variant: "destructive",
      });
      return null;
    }
  };

  // Clean date fields to prevent "invalid input syntax for type date" error
  const cleanDateField = (dateValue: string | undefined | null) => {
    if (!dateValue || dateValue.trim() === "") {
      return null;
    }
    return dateValue;
  };

  // Handle form submission for step 1
  const onSubmitStepOne = (data: StepOneFormData) => {
    console.log("Step one data:", data);
    setStepOneData(data);
    setCurrentStep(2);
  };

  // Handle form submission for step 2
  const onSubmitStepTwo = (data: StepTwoFormData) => {
    console.log("Step two data:", data);
    setStepTwoData(data);
    setCurrentStep(3);
  };

  // Handle form submission for step 3
  const onSubmitStepThree = async (data: StepThreeFormData) => {
    setIsLoading(true);
    console.log("Starting form submission process");

    try {
      if (!stepOneData || !stepTwoData) {
        throw new Error("Missing previous step data");
      }

      // Upload passport if present
      let passportUrl = null;
      if (passportImage) {
        console.log("Uploading passport image");
        passportUrl = await uploadFile(passportImage, "passports");
        console.log("Passport URL:", passportUrl);
        
        if (!passportUrl) {
          throw new Error("Failed to upload passport image");
        }
      } else {
        console.log("No passport image to upload");
      }

      // Map form data to database column names
      const transformedData = {
        // Step one data
        full_name: stepOneData.fullName,
        date_of_birth: cleanDateField(stepOneData.dateOfBirth),
        date_of_new_birth: cleanDateField(stepOneData.dateOfNewBirth),
        date_of_water_baptism: cleanDateField(stepOneData.dateOfWaterBaptism),
        date_of_holy_ghost_baptism: cleanDateField(
          stepOneData.dateOfHolyGhostBaptism
        ),
        marital_status: stepOneData.maritalStatus,
        ministry_gift: stepOneData.ministryGift,
        spiritual_gifts: stepOneData.spiritualGifts,
        spiritual_history: spiritualHistory
          .map((item) => item.text)
          .filter(Boolean),
        passport_url: passportUrl,

        // Step two data
        address: stepTwoData.address,
        phone_numbers: stepTwoData.phoneNumbers,
        email: stepTwoData.email,
        social_media: stepTwoData.socialMedia,
        recommended_by: stepTwoData.recommendedBy,
        place_of_birth: stepTwoData.placeOfBirth,
        is_divorced: stepTwoData.isDivorced,
        divorce_count: stepTwoData.divorceCount,
        last_divorce_date: cleanDateField(stepTwoData.lastDivorceDate),
        children_count: stepTwoData.childrenCount,
        spouse_name: stepTwoData.spouseName,
        is_spouse_believer: stepTwoData.isSpouseBeliever,
        spouse_date_of_birth: cleanDateField(stepTwoData.spouseDateOfBirth),
        anniversary_date: cleanDateField(stepTwoData.anniversaryDate),
        accepted_christ_date: cleanDateField(stepTwoData.acceptedChristDate),
        water_baptized: stepTwoData.waterBaptized,
        pray_in_tongues: stepTwoData.prayInTongues,
        believe_in_tongues: stepTwoData.believeInTongues,
        desire_tongues: stepTwoData.desireTongues,
        spiritual_gifts_manifest: stepTwoData.spiritualGiftsManifest,
        formal_christian_training: stepTwoData.formalChristianTraining,
        training_institution: stepTwoData.trainingInstitution,
        training_duration: stepTwoData.trainingDuration,
        previously_ordained: stepTwoData.previouslyOrdained,
        ordination_type: stepTwoData.ordinationType,
        ordination_date: cleanDateField(stepTwoData.ordinationDate),
        ordination_by: stepTwoData.ordinationBy,
        denominational_background: stepTwoData.denominationalBackground,
        current_affiliation: stepTwoData.currentAffiliation,
        current_capacity: stepTwoData.currentCapacity,
        ministry_description: stepTwoData.ministryDescription,
        ministry_duration: stepTwoData.ministryDuration,
        ministry_income: stepTwoData.ministryIncome,
        other_employment: stepTwoData.otherEmployment,
        employment_description: stepTwoData.employmentDescription,
        employment_address: stepTwoData.employmentAddress,
        pastor_name: stepTwoData.pastorName,
        pastor_email: stepTwoData.pastorEmail,
        pastor_phone: stepTwoData.pastorPhone,
        minister_name: stepTwoData.ministerName,
        minister_email: stepTwoData.ministerEmail,
        minister_phone: stepTwoData.ministerPhone,
        elder_name: stepTwoData.elderName,
        elder_email: stepTwoData.elderEmail,
        elder_phone: stepTwoData.elderPhone,
        
        // Step three data
        conversion_experience: data.conversionExperience,
        devotional_pattern: data.devotionalPattern,
        family_devotional: data.familyDevotional,
        gods_call_experience: data.godsCallExperience,
        ministry_concept: data.ministryConcept,
        future_vision: data.futureVision,
        ministry_success_definition: data.ministrySuccessDefinition,
        ministry_strengths: data.ministryStrengths,
        ministry_weaknesses: data.ministryWeaknesses,
        relationship_evaluation: data.relationshipEvaluation,
        non_ordination_effect: data.nonOrdinationEffect,
        spouse_ministry_feelings: data.spouseMinistryFeelings,
        
        payment_status: "pending",
      };

      console.log("Complete form data:", transformedData);

      // Save to Supabase
      const { data: insertedData, error } = await supabase
        .from("registrations")
        .insert(transformedData)
        .select();

      if (error) {
        console.error("Error submitting to database:", error);
        throw error;
      }

      console.log("Data inserted successfully:", insertedData);

      toast({
        title: "Registration submitted",
        description:
          "Thank you for registering for the RCN Induction Training Programme.",
      });

      setIsSubmitted(true);
      // Show payment modal after successful registration
      setTimeout(() => {
        setShowPaymentModal(true);
      }, 1500);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Registration failed",
        description: `There was an error submitting your registration: ${
          error.message || "Unknown error"
        }`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setStepOneData(null);
    setStepTwoData(null);
    setSpiritualHistory([{ id: 1, text: "" }]);
    setPassportImage(null);
    setPassportPreview(null);
    setShowPaymentModal(false);
  };

  const proceedToPayment = () => {
    window.location.href = "https://paystack.com/pay/rcnordinands";
  };

  return (
    <div>
      <PageHeader
        title="Registration Form"
        subtitle="Complete the form below to register for the RCN Ordination Induction Program."
      />

      <div className="container mx-auto py-10 px-4">
        <div className="prose prose-sm max-w-2xl mx-auto mb-8 text-gray-600">
          <p>
            The RCN Ordination Induction Program is a dedicated ministry
            training designed to further equip and empower the Ordination
            candidates as they prepare for the Ordination Service.
          </p>
        </div>

        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          All fields marked with an asterisk (*) are required.
        </p>

        {isSubmitted ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <SuccessMessage onRegisterAnother={resetForm} />
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>
                {currentStep === 1
                  ? "Step 1: Spiritual Information"
                  : currentStep === 2
                  ? "Step 2: Ministerial Credential Application"
                  : "Step 3: Ministry Reflection Questions"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1
                  ? "Please provide your spiritual background details."
                  : currentStep === 2
                  ? "Please provide your ministerial credential application details."
                  : "Please provide detailed responses to the ministry questions."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 1 ? (
                <RegistrationStepOne
                  onSubmit={onSubmitStepOne}
                  spiritualHistory={spiritualHistory}
                  addSpiritualHistory={addSpiritualHistory}
                  updateSpiritualHistory={updateSpiritualHistory}
                  removeSpiritualHistory={removeSpiritualHistory}
                  passportPreview={passportPreview}
                  handlePassportChange={handlePassportChange}
                  removePassport={removePassport}
                />
              ) : currentStep === 2 ? (
                <RegistrationStepTwo
                  onSubmit={onSubmitStepTwo}
                  onBack={() => setCurrentStep(1)}
                  isLoading={isLoading}
                />
              ) : (
                <RegistrationStepThree
                  onSubmit={onSubmitStepThree}
                  onBack={() => setCurrentStep(2)}
                  isLoading={isLoading}
                />
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Registration</DialogTitle>
            <DialogDescription>
              Thank you for registering for RCN Ordination Induction Program. To
              complete your registration, please proceed to make a payment.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentModal(false)}
            >
              Later
            </Button>
            <Button onClick={proceedToPayment}>Proceed to Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Registration;
