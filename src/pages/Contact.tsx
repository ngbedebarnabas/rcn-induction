import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, CheckCircle, Send } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(data: FormValues) {
    toast({
      title: "Message sent",
      description: "We've received your message and will respond shortly.",
    });
    console.log(data);
    setIsSubmitted(true);
  }

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, title: "Email", details: "info@ordinand.org" },
    { icon: <Phone className="h-5 w-5" />, title: "Phone", details: "+234 807 309 5885 (WhatsApp Only)" },
    { icon: <MapPin className="h-5 w-5" />, title: "Address", details: "RCN Embassy, beside International Market, George Akume Way, Makurdi, Benue State, Nigeria." },
  ];

  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="Have questions about the RCN Ordination Induction Program? Get in touch with our team."
      />

      <div className="container mx-auto py-14 px-4">
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          The RCN Ordination Induction Program is a dedicated ministry designed
          to equip and empower ministers in Christian service. Our programme
          offers comprehensive training, rooted in biblical truth, to prepare
          you for impactful leadership and faithful stewardship.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="h-full border-0 shadow-md">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-6 text-foreground">Contact Information</h2>
                <div className="space-y-5">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-foreground">Message Sent!</h2>
                    <p className="text-muted-foreground mb-6">
                      Thank you for contacting us. We'll respond to your inquiry as soon as possible.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-xl">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold mb-6 text-foreground">Send us a Message</h2>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Your full name" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="Your email address" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                        <FormField control={form.control} name="subject" render={({ field }) => (
                          <FormItem><FormLabel>Subject</FormLabel><FormControl><Input placeholder="Message subject" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="message" render={({ field }) => (
                          <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Write your message here..." className="resize-none min-h-[150px]" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <Button type="submit" className="w-full rounded-xl">
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </Button>
                      </form>
                    </Form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
