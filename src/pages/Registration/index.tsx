import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
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

const Registration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  // Handle form submission for step 1
  const onSubmitStepOne = (data: StepOneFormData) => {
    console.log(data);
    setStepOneData(data);
    setCurrentStep(2);
  };

  // Handle form submission for step 2
  const onSubmitStepTwo = (data: StepTwoFormData) => {
    // Combine both form data
    const completeFormData = {
      ...stepOneData,
      ...data,
      spiritualHistory: spiritualHistory
        .map((item) => item.text)
        .filter(Boolean),
      uploadedFile: selectedFile ? selectedFile.name : null,
      passport: passportImage ? passportImage.name : null,
    };

    console.log("Complete form data:", completeFormData);

    toast({
      title: "Registration submitted",
      description:
        "You have successfully registered for the induction programme.",
    });

    setIsSubmitted(true);
    // Show payment modal after successful registration
    setShowPaymentModal(true);
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
