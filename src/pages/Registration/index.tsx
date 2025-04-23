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
import SuccessMessage from "./components/SuccessMessage";
import { StepOneFormData, StepTwoFormData } from "./types";
import PageHeader from "@/components/PageHeader";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";

const Registration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [spiritualHistory, setSpiritualHistory] = useState<
    Array<{ id: number; text: string }>
  >([{ id: 1, text: "" }]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [passportImage, setPassportImage] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [stepOneData, setStepOneData] = useState<StepOneFormData | null>(null);
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

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
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

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
  };

  // Remove passport image
  const removePassport = () => {
    setPassportImage(null);
    setPassportPreview(null);
  };

  // Upload file to Supabase storage
  const uploadFile = async (file: File, bucket: string, folder: string) => {
    try {
      console.log(`Uploading file to ${bucket}/${folder}`);
      
      // Check if storage bucket exists, if not create it
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === bucket);
      
      if (!bucketExists) {
        console.log(`Bucket ${bucket} doesn't exist, creating it...`);
        const { error: bucketError } = await supabase.storage.createBucket(bucket, {
          public: true
        });
        
        if (bucketError) {
          console.error('Error creating bucket:', bucketError);
          throw bucketError;
        }
        console.log(`Bucket ${bucket} created successfully`);
      }
      
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${uuidv4()}.${fileExt}`;

      // Upload the file
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error uploading file:', error);
        throw error;
      }

      console.log('File uploaded successfully:', data);

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      console.log('Public URL:', urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  // Handle form submission for step 1
  const onSubmitStepOne = (data: StepOneFormData) => {
    console.log("Step one data:", data);
    setStepOneData(data);
    setCurrentStep(2);
  };

  // Handle form submission for step 2
  const onSubmitStepTwo = async (data: StepTwoFormData) => {
    setIsLoading(true);
    console.log("Starting form submission process");
    
    try {
      if (!stepOneData) {
        throw new Error("Missing step one data");
      }
      
      // Upload passport and document if present
      let passportUrl = null;
      let documentUrl = null;

      if (passportImage) {
        console.log("Uploading passport image");
        passportUrl = await uploadFile(passportImage, 'registrations', 'passports');
        console.log("Passport URL:", passportUrl);
      } else {
        console.log("No passport image to upload");
      }

      if (selectedFile) {
        console.log("Uploading document file");
        documentUrl = await uploadFile(selectedFile, 'registrations', 'documents');
        console.log("Document URL:", documentUrl);
      } else {
        console.log("No document file to upload");
      }

      // Clean date fields to prevent "invalid input syntax for type date" error
      const cleanDateField = (dateValue: string | undefined | null) => {
        return dateValue && dateValue.trim() !== "" ? dateValue : null;
      };

      // Map form data to database column names
      const transformedData = {
        // Step one data
        full_name: stepOneData.fullName,
        date_of_birth: stepOneData.dateOfBirth,
        date_of_new_birth: cleanDateField(stepOneData.dateOfNewBirth),
        date_of_water_baptism: cleanDateField(stepOneData.dateOfWaterBaptism),
        date_of_holy_ghost_baptism: cleanDateField(stepOneData.dateOfHolyGhostBaptism),
        marital_status: stepOneData.maritalStatus,
        ministry_gift: stepOneData.ministryGift,
        spiritual_gifts: stepOneData.spiritualGifts,
        spiritual_history: spiritualHistory
          .map((item) => item.text)
          .filter(Boolean),
        passport_url: passportUrl,
        
        // Step two data
        address: data.address,
        phone_numbers: data.phoneNumbers,
        email: data.email,
        social_media: data.socialMedia,
        recommended_by: data.recommendedBy,
        place_of_birth: data.placeOfBirth,
        is_divorced: data.isDivorced,
        divorce_count: data.divorceCount,
        last_divorce_date: cleanDateField(data.lastDivorceDate),
        children_count: data.childrenCount,
        spouse_name: data.spouseName,
        is_spouse_believer: data.isSpouseBeliever,
        spouse_date_of_birth: cleanDateField(data.spouseDateOfBirth),
        anniversary_date: cleanDateField(data.anniversaryDate),
        accepted_christ_date: cleanDateField(data.acceptedChristDate),
        water_baptized: data.waterBaptized,
        pray_in_tongues: data.prayInTongues,
        believe_in_tongues: data.believeInTongues,
        desire_tongues: data.desireTongues,
        spiritual_gifts_manifest: data.spiritualGiftsManifest,
        formal_christian_training: data.formalChristianTraining,
        training_institution: data.trainingInstitution,
        training_duration: data.trainingDuration,
        previously_ordained: data.previouslyOrdained,
        ordination_type: data.ordinationType,
        ordination_date: cleanDateField(data.ordinationDate),
        ordination_by: data.ordinationBy,
        denominational_background: data.denominationalBackground,
        current_affiliation: data.currentAffiliation,
        current_capacity: data.currentCapacity,
        ministry_description: data.ministryDescription,
        ministry_duration: data.ministryDuration,
        ministry_income: data.ministryIncome,
        other_employment: data.otherEmployment,
        employment_description: data.employmentDescription,
        employment_address: data.employmentAddress,
        pastor_name: data.pastorName,
        pastor_email: data.pastorEmail,
        pastor_phone: data.pastorPhone,
        minister_name: data.ministerName,
        minister_email: data.ministerEmail,
        minister_phone: data.ministerPhone,
        elder_name: data.elderName,
        elder_email: data.elderEmail,
        elder_phone: data.elderPhone,
        document_url: documentUrl,
        payment_status: 'pending'
      };

      console.log("Complete form data:", transformedData);

      // Save to Supabase
      const { data: insertedData, error } = await supabase
        .from('registrations')
        .insert(transformedData)
        .select();

      if (error) {
        console.error('Error submitting to database:', error);
        throw error;
      }

      console.log('Data inserted successfully:', insertedData);
      
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
      console.error('Error submitting form:', error);
      toast({
        title: "Registration failed",
        description: `There was an error submitting your registration: ${error.message || 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setStepOneData(null);
    setSpiritualHistory([{ id: 1, text: "" }]);
    setSelectedFile(null);
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
            You will be required to upload a separate typed document (using font
            type: Times New Roman; font size: 12; and 1.5 line spacing), hence
            you might want to type this before beginning the registration.
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              Share your experience of conversion, baptism, and any subsequent
              significant spiritual experience.
            </li>
            <li>Your personal pattern of devotional prayer and Bible study</li>
            <li>
              Your family devotional pattern related to your wife and family
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
              What particular strengths/weaknesses have you identified so far in
              your ministry?
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
          </ol>
        </div>

        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          The RCN Ordination Induction Program is a dedicated ministry designed
          to equip and empower ministers in Christian service. All fields marked
          with an asterisk (*) are required.
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
                  : "Step 2: MINISTERIAL CREDENTIAL APPLICATION (MCA) FORM"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1
                  ? "Please provide your spiritual background details."
                  : "Please provide your ministerial credential application details."}
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
              ) : (
                <RegistrationStepTwo
                  onSubmit={onSubmitStepTwo}
                  handleFileChange={handleFileChange}
                  selectedFile={selectedFile}
                  removeFile={removeFile}
                  onBack={() => setCurrentStep(1)}
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
