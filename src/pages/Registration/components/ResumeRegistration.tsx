import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ResumeRegistrationProps {
  onResume: (draft: {
    email: string;
    current_step: number;
    step_one_data: any;
    step_two_data: any;
    spiritual_history: any;
  }) => void;
}

const ResumeRegistration = ({ onResume }: ResumeRegistrationProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      toast({
        title: "Email required",
        description: "Please enter the email you used to start registration.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("registration_drafts")
        .select("*")
        .ilike("email", trimmed)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast({
          title: "No saved registration found",
          description: "We couldn't find any saved progress for that email.",
          variant: "destructive",
        });
        return;
      }

      onResume({
        email: data.email,
        current_step: data.current_step,
        step_one_data: data.step_one_data,
        step_two_data: data.step_two_data,
        spiritual_history: data.spiritual_history,
      });
      setOpen(false);
      toast({
        title: "Welcome back",
        description: "Your saved progress has been restored.",
      });
    } catch (err: any) {
      toast({
        title: "Lookup failed",
        description: err.message ?? "Could not retrieve your saved progress.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto mb-6 flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen(true)}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Resume a saved registration
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resume your registration</DialogTitle>
            <DialogDescription>
              Enter the email address you used when you started, and we'll
              restore your progress.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="resume-email">Email address</Label>
            <Input
              id="resume-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLookup();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleLookup} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Looking up...
                </>
              ) : (
                "Resume"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResumeRegistration;
