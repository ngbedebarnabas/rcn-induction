
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SuccessMessageProps {
  onRegisterAnother: () => void;
}

const SuccessMessage = ({ onRegisterAnother }: SuccessMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for registering for the RCN Induction Training Programme. We've sent a confirmation email with further details.
      </p>
      <Button onClick={onRegisterAnother}>Register Another Person</Button>
    </div>
  );
};

export default SuccessMessage;
