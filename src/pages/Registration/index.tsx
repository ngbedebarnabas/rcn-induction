
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegistrationStepOne from "./components/RegistrationStepOne";
import RegistrationStepTwo from "./components/RegistrationStepTwo";
import SuccessMessage from "./components/SuccessMessage";
import { StepOneFormData, StepTwoFormData } from "./types";

const Registration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [spiritualHistory, setSpiritualHistory] = useState<Array<{id: number; text: string}>>([
    { id: 1, text: "" }
  ]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [passportImage, setPassportImage] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [stepOneData, setStepOneData] = useState<StepOneFormData | null>(null);

  // Add another spiritual history entry
  const addSpiritualHistory = () => {
    setSpiritualHistory([
      ...spiritualHistory,
      { id: spiritualHistory.length + 1, text: "" }
    ]);
  };

  // Update a spiritual history entry
  const updateSpiritualHistory = (id: number, value: string) => {
    setSpiritualHistory(spiritualHistory.map(item => 
      item.id === id ? { ...item, text: value } : item
    ));
  };

  // Remove a spiritual history entry
  const removeSpiritualHistory = (id: number) => {
    if (spiritualHistory.length > 1) {
      setSpiritualHistory(spiritualHistory.filter(item => item.id !== id));
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
      spiritualHistory: spiritualHistory.map(item => item.text).filter(Boolean),
      uploadedFile: selectedFile ? selectedFile.name : null,
      passport: passportImage ? passportImage.name : null,
    };
    
    console.log("Complete form data:", completeFormData);
    
    toast({
      title: "Registration submitted",
      description: "You have successfully registered for the induction programme.",
    });

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setStepOneData(null);
    setSpiritualHistory([{ id: 1, text: "" }]);
    setSelectedFile(null);
    setPassportImage(null);
    setPassportPreview(null);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Registration Form</h1>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Complete the form below to register for the RCN Induction Training Programme. All fields marked with an asterisk (*) are required.
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
  );
};

export default Registration;
