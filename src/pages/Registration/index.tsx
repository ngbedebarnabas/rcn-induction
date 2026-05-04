import { useState, useEffect } from "react";
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
  const [responseDocument, setResponseDocument] = useState<File | null>(null);
  const [stepOneData, setStepOneData] = useState<StepOneFormData | null>(null);
  const [stepTwoData, setStepTwoData] = useState<StepTwoFormData | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const handleResponseDocumentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setResponseDocument(event.target.files[0]);
    }
  };

  const removeResponseDocument = () => setResponseDocument(null);

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

  // Upload file to Supabase storage - improved function with better error handling
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

      // Upload the file with robust error handling
      const { data, error } = await supabase.storage
        .from("registrations")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Supabase storage upload error:", error);
        throw new Error(`Upload failed: ${error.message}`);
      }

      if (!data) {
        throw new Error("No data returned from upload");
      }

      console.log("File uploaded successfully:", data);

      // Bucket is private; store the storage path so admins can generate
      // signed URLs when viewing registrations.
      return fileName;
    } catch (error) {
      console.error("Error in uploadFile function:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unknown error during file upload";
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw new Error(errorMessage); // Re-throw to be caught in the submission process
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

      // Validate passport image requirement
      if (!passportImage) {
        throw new Error("Passport image is required");
      }

      if (!responseDocument) {
        throw new Error("Response document is required");
      }

      // Upload passport
      let passportUrl: string | null = null;
      try {
        passportUrl = await uploadFile(passportImage, "passports");
        if (!passportUrl) throw new Error("Failed to upload passport image");
      } catch (uploadError) {
        console.error("Passport upload error:", uploadError);
        throw new Error("Failed to upload passport image");
      }

      // Upload response document
      let responseDocumentUrl: string | null = null;
      try {
        responseDocumentUrl = await uploadFile(responseDocument, "documents");
        if (!responseDocumentUrl)
          throw new Error("Failed to upload response document");
      } catch (uploadError) {
        console.error("Document upload error:", uploadError);
        throw new Error("Failed to upload response document");
      }

      // Combine spiritual gifts (multi-select + "Other")
      const spiritualGiftsCombined = [
        ...(stepTwoData.spiritualGiftsList ?? []),
        ...(stepTwoData.spiritualGiftsOther
          ? [`Other: ${stepTwoData.spiritualGiftsOther}`]
          : []),
      ].join(", ");

      // Map form data to database column names
      const transformedData = {
        // Step one data – Personal Bio-Data
        first_name: stepOneData.firstName,
        middle_name: stepOneData.middleName || null,
        last_name: stepOneData.lastName,
        full_name: [stepOneData.firstName, stepOneData.middleName, stepOneData.lastName]
          .filter(Boolean)
          .join(" "),
        address: stepOneData.address,
        email: stepOneData.email,
        phone_numbers: (stepOneData.phoneNumbers ?? []).filter(Boolean).join(", "),
        social_media: (stepOneData.socialMediaHandles ?? []).join(", "),
        recommended_by: stepOneData.recommendedBy,
        recommender_full_name: stepOneData.recommenderFullName,
        recommender_phone: stepOneData.recommenderPhone,
        place_of_birth: stepOneData.placeOfBirth,
        date_of_birth: cleanDateField(stepOneData.dateOfBirth),
        marital_status: stepOneData.maritalStatus,
        is_divorced: stepOneData.isDivorced ?? "No",
        divorce_count: stepOneData.divorceCount,
        last_divorce_date: cleanDateField(stepOneData.lastDivorceDate),
        children_count: stepOneData.childrenCount,
        spouse_name: stepOneData.spouseName ?? "",
        is_spouse_believer: stepOneData.isSpouseBeliever ?? "Not Married",
        spouse_date_of_birth: cleanDateField(stepOneData.spouseDateOfBirth),
        anniversary_date: cleanDateField(stepOneData.anniversaryDate),
        passport_url: passportUrl,

        // Step two – Spiritual / Ministerial
        accepted_christ_date: cleanDateField(stepTwoData.acceptedChristDate),
        date_of_new_birth: cleanDateField(stepTwoData.acceptedChristDate),
        water_baptized: stepTwoData.waterBaptized,
        date_of_water_baptism: cleanDateField(stepTwoData.dateOfWaterBaptism),
        date_of_holy_ghost_baptism: cleanDateField(
          stepTwoData.dateOfHolyGhostBaptism
        ),
        pray_in_tongues: stepTwoData.prayInTongues,
        believe_in_tongues: stepTwoData.believeInTongues,
        desire_tongues: stepTwoData.desireTongues,
        spiritual_gifts: spiritualGiftsCombined,
        spiritual_gifts_manifest: spiritualGiftsCombined,
        spiritual_history: spiritualHistory
          .map((item) => item.text)
          .filter(Boolean),
        formal_christian_training: stepTwoData.formalChristianTraining,
        training_institution: stepTwoData.trainingInstitution,
        training_duration: stepTwoData.trainingDuration
          ? `${
              stepTwoData.highestProgramme
                ? stepTwoData.highestProgramme + " — "
                : ""
            }${stepTwoData.trainingDuration}`
          : stepTwoData.highestProgramme,
        previously_ordained: stepTwoData.previouslyOrdained,
        ordination_type: stepTwoData.ordinationType || null,
        ordination_date: cleanDateField(stepTwoData.ordinationDate),
        ordination_by: stepTwoData.ordinationBy,
        denominational_background: stepTwoData.ordinationDenomination ?? "",
        current_affiliation: stepTwoData.currentAffiliation,
        current_capacity: stepTwoData.currentCapacity,
        ministry_description: stepTwoData.currentCapacity,
        ministry_duration: stepTwoData.ministryDuration,
        ministry_income: stepTwoData.ministryIncome,
        ministry_gift: null,
        other_employment: stepTwoData.otherEmployment,
        employment_description: stepTwoData.employmentDescription,
        employment_address: null,
        response_document_url: responseDocumentUrl,

        // Step three – Referees & Undertaking
        pastor_name: data.pastorName,
        pastor_email: data.pastorEmail,
        pastor_phone: data.pastorPhone,
        minister_name: data.ministerName,
        minister_email: data.ministerEmail,
        minister_phone: data.ministerPhone,
        elder_name: data.elderName,
        elder_email: data.elderEmail,
        elder_phone: data.elderPhone,

        payment_status: "pending",
      };

      console.log("Complete form data:", transformedData);

      // Save to Supabase without requesting the inserted row back.
      // Anonymous registrations have INSERT permission, but not SELECT access.
      const { error } = await supabase
        .from("registrations")
        .insert(transformedData);

      if (error) {
        console.error("Error submitting to database:", error);
        throw error;
      }

      console.log("Data inserted successfully");

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
    setResponseDocument(null);
    setShowPaymentModal(false);
  };

  return (
    <div>
      <PageHeader
        title="Registration Form"
        subtitle="Complete the form below to register for the RCN Ordination Induction Program."
      />

      <div className="container mx-auto py-14 px-4">
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-muted-foreground leading-relaxed">
            The RCN Ordination Induction Program is a dedicated ministry
            training designed to further equip and empower the Ordination
            candidates as they prepare for the Ordination Service.
          </p>
        </div>

        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto mb-8 rounded-xl border border-accent/30 bg-accent/5 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-foreground mb-3">
              Before You Begin
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              On a separate typed document (using font type:{" "}
              <span className="font-medium text-foreground">
                Times New Roman
              </span>
              ; font size:{" "}
              <span className="font-medium text-foreground">12</span>; and{" "}
              <span className="font-medium text-foreground">
                1.5 line spacing
              </span>
              ), you might want to prepare your responses to the following
              before you commence the registration:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed">
              <li>
                Share your experience of conversion, baptism, and any subsequent
                significant spiritual experience.
              </li>
              <li>
                Your personal pattern of devotional prayer and Bible study.
              </li>
              <li>
                Your family devotional pattern related to your wife and family.
              </li>
              <li>
                Relate your experience in determining "God's call" to the
                ministry.
              </li>
              <li>
                What evidence have you seen of God's blessing on your ministry?
              </li>
              <li>What is your concept of ministry?</li>
              <li>What is your vision for future ministry?</li>
              <li>How do you define success in ministry?</li>
              <li>
                What particular strengths/weaknesses have you identified so far
                in your ministry?
              </li>
              <li>
                Do you, as a general rule, find it easy to get along with other
                people?
              </li>
              <li>
                How do you evaluate yourself in relationships with other people?
              </li>
              <li>
                If this council should choose not to ordain you, how will that
                affect your ministry?
              </li>
              <li>How does your spouse feel about you and the ministry?</li>
            </ul>
          </div>
        )}

        <p className="text-muted-foreground mb-8 text-center text-sm max-w-2xl mx-auto">
          All fields marked with an asterisk (*) are required.
        </p>

        {isSubmitted ? (
          <Card className="max-w-2xl mx-auto border-0 shadow-md">
            <CardContent className="pt-6">
              <SuccessMessage onRegisterAnother={resetForm} />
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-2xl mx-auto border-0 shadow-md">
            <CardHeader>
              <CardTitle>
                {currentStep === 1
                  ? "Step 1: Personal Bio-Data"
                  : currentStep === 2
                  ? "Step 2: Spiritual & Ministerial Information"
                  : "Step 3: Referee & Statement of Undertaking"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1
                  ? "Please provide your personal details."
                  : currentStep === 2
                  ? "Please provide your spiritual background and ministerial credential details."
                  : "Please provide detailed responses to the ministry questions."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 1 ? (
                <RegistrationStepOne
                  onSubmit={onSubmitStepOne}
                  passportPreview={passportPreview}
                  handlePassportChange={handlePassportChange}
                  removePassport={removePassport}
                  initialValues={stepOneData}
                />
              ) : currentStep === 2 ? (
                <RegistrationStepTwo
                  onSubmit={onSubmitStepTwo}
                  onBack={() => setCurrentStep(1)}
                  isLoading={isLoading}
                  spiritualHistory={spiritualHistory}
                  addSpiritualHistory={addSpiritualHistory}
                  updateSpiritualHistory={updateSpiritualHistory}
                  removeSpiritualHistory={removeSpiritualHistory}
                  initialValues={stepTwoData}
                  responseDocument={responseDocument}
                  handleResponseDocumentChange={handleResponseDocumentChange}
                  removeResponseDocument={removeResponseDocument}
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

      {/* Success Dialog */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Success</DialogTitle>
            <DialogDescription>
              Further information will be communicated on the WhatsApp Group.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowPaymentModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Registration;
