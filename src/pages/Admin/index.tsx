import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  FileText,
  Image as ImageIcon,
  Loader2,
  LogOut,
  Eye,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import jsPDF from "jspdf";

type Registration = {
  id: string;
  full_name: string | null;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  phone_numbers: string | null;
  address: string;
  social_media: string | null;
  recommended_by: string;
  recommender_phone: string | null;
  place_of_birth: string;
  date_of_birth: string;
  marital_status: string;
  is_divorced: string;
  divorce_count: string | null;
  last_divorce_date: string | null;
  children_count: string | null;
  spouse_name: string;
  is_spouse_believer: string;
  spouse_date_of_birth: string | null;
  anniversary_date: string | null;
  date_of_new_birth: string | null;
  accepted_christ_date: string;
  water_baptized: string;
  date_of_water_baptism: string | null;
  date_of_holy_ghost_baptism: string | null;
  pray_in_tongues: string;
  believe_in_tongues: string | null;
  desire_tongues: string | null;
  spiritual_gifts: string | null;
  spiritual_gifts_manifest: string;
  spiritual_history: string[] | null;
  formal_christian_training: string;
  training_institution: string | null;
  training_duration: string | null;
  previously_ordained: string;
  ordination_type: string | null;
  ordination_date: string | null;
  ordination_by: string | null;
  denominational_background: string;
  current_affiliation: string;
  current_capacity: string;
  ministry_description: string;
  ministry_duration: string;
  ministry_income: string;
  ministry_gift: string | null;
  other_employment: string;
  employment_description: string | null;
  employment_address: string | null;
  pastor_name: string;
  pastor_email: string;
  pastor_phone: string;
  minister_name: string;
  minister_email: string;
  minister_phone: string;
  elder_name: string;
  elder_email: string;
  elder_phone: string;
  conversion_experience: string | null;
  devotional_pattern: string | null;
  family_devotional: string | null;
  gods_call_experience: string | null;
  ministry_concept: string | null;
  future_vision: string | null;
  ministry_strengths: string | null;
  ministry_weaknesses: string | null;
  relationship_evaluation: string | null;
  non_ordination_effect: string | null;
  spouse_ministry_feelings: string | null;
  ministry_success_definition: string | null;
  passport_url: string | null;
  response_document_url: string | null;
  payment_status: string | null;
  created_at: string | null;
};

const getFullName = (r: Registration) =>
  r.full_name?.trim() ||
  [r.first_name, r.middle_name, r.last_name].filter(Boolean).join(" ");

const signedUrl = async (path: string | null) => {
  if (!path) return null;
  const { data, error } = await supabase.storage
    .from("registrations")
    .createSignedUrl(path, 60 * 10);
  if (error) {
    console.error(error);
    return null;
  }
  return data.signedUrl;
};

const formatDate = (d: string | null) => {
  if (!d) return "—";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatValue = (v: string | string[] | null): string => {
  if (v === null || v === undefined || v === "") return "—";
  if (Array.isArray(v)) {
    const filtered = v.filter((item) => item && item.trim() !== "");
    return filtered.length > 0 ? filtered.join(", ") : "—";
  }
  return v;
};

const Field = ({ label, value }: { label: string; value: string | string[] | null }) => (
  <div className="py-1">
    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
      {label}
    </span>
    <p className="text-sm mt-0.5 break-words">{formatValue(value)}</p>
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
      {title}
    </h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
      {children}
    </div>
  </div>
);

const DetailDialog = ({
  open,
  onClose,
  registration,
}: {
  open: boolean;
  onClose: () => void;
  registration: Registration | null;
}) => {
  const [signedPassport, setSignedPassport] = useState<string | null>(null);
  const [signedDoc, setSignedDoc] = useState<string | null>(null);

  useEffect(() => {
    if (!registration) return;
    let mounted = true;
    (async () => {
      const [p, d] = await Promise.all([
        signedUrl(registration.passport_url),
        signedUrl(registration.response_document_url),
      ]);
      if (!mounted) return;
      setSignedPassport(p);
      setSignedDoc(d);
    })();
    return () => {
      mounted = false;
    };
  }, [registration]);

  if (!registration) return null;
  const r = registration;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl">{getFullName(r)}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="px-6 pb-6 max-h-[calc(90vh-80px)]">
          <div className="space-y-2">
            <Section title="Personal Information">
              <Field label="Full Name" value={getFullName(r)} />
              <Field label="Email" value={r.email} />
              <Field label="Phone Number(s)" value={r.phone_numbers} />
              <Field label="Address" value={r.address} />
              <Field label="Social Media" value={r.social_media} />
              <Field label="Place of Birth" value={r.place_of_birth} />
              <Field label="Date of Birth" value={formatDate(r.date_of_birth)} />
              <Field label="Recommended By" value={r.recommended_by} />
              <Field label="Recommender Phone" value={r.recommender_phone} />
            </Section>

            <Separator />

            <Section title="Marital Information">
              <Field label="Marital Status" value={r.marital_status} />
              <Field label="Divorced?" value={r.is_divorced} />
              <Field label="Divorce Count" value={r.divorce_count} />
              <Field label="Last Divorce Date" value={formatDate(r.last_divorce_date)} />
              <Field label="Children Count" value={r.children_count} />
              <Field label="Spouse Name" value={r.spouse_name} />
              <Field label="Spouse Believer?" value={r.is_spouse_believer} />
              <Field label="Spouse Date of Birth" value={formatDate(r.spouse_date_of_birth)} />
              <Field label="Anniversary Date" value={formatDate(r.anniversary_date)} />
            </Section>

            <Separator />

            <Section title="Spiritual Information">
              <Field label="Date of New Birth" value={formatDate(r.date_of_new_birth || r.accepted_christ_date)} />
              <Field label="Water Baptized?" value={r.water_baptized} />
              <Field label="Date of Water Baptism" value={formatDate(r.date_of_water_baptism)} />
              <Field label="Date of Holy Ghost Baptism" value={formatDate(r.date_of_holy_ghost_baptism)} />
              <Field label="Pray in Tongues?" value={r.pray_in_tongues} />
              <Field label="Believe in Tongues?" value={r.believe_in_tongues} />
              <Field label="Desire Tongues?" value={r.desire_tongues} />
              <Field label="Spiritual Gifts" value={r.spiritual_gifts} />
              <Field label="Spiritual Gifts Manifesting" value={r.spiritual_gifts_manifest} />
              <Field label="Spiritual History" value={r.spiritual_history} />
            </Section>

            <Separator />

            <Section title="Training & Ordination">
              <Field label="Formal Christian Training?" value={r.formal_christian_training} />
              <Field label="Training Institution" value={r.training_institution} />
              <Field label="Training Duration" value={r.training_duration} />
              <Field label="Previously Ordained?" value={r.previously_ordained} />
              <Field label="Ordination Type" value={r.ordination_type} />
              <Field label="Ordination Date" value={formatDate(r.ordination_date)} />
              <Field label="Ordained By" value={r.ordination_by} />
              <Field label="Denominational Background" value={r.denominational_background} />
            </Section>

            <Separator />

            <Section title="Ministry & Employment">
              <Field label="Current Affiliation" value={r.current_affiliation} />
              <Field label="Current Capacity" value={r.current_capacity} />
              <Field label="Ministry Description" value={r.ministry_description} />
              <Field label="Ministry Duration" value={r.ministry_duration} />
              <Field label="Ministry Income" value={r.ministry_income} />
              <Field label="Ministry Gift" value={r.ministry_gift} />
              <Field label="Other Employment?" value={r.other_employment} />
              <Field label="Employment Description" value={r.employment_description} />
              <Field label="Employment Address" value={r.employment_address} />
            </Section>

            <Separator />

            <Section title="References">
              <Field label="Pastor Name" value={r.pastor_name} />
              <Field label="Pastor Email" value={r.pastor_email} />
              <Field label="Pastor Phone" value={r.pastor_phone} />
              <Field label="Minister Name" value={r.minister_name} />
              <Field label="Minister Email" value={r.minister_email} />
              <Field label="Minister Phone" value={r.minister_phone} />
              <Field label="Elder Name" value={r.elder_name} />
              <Field label="Elder Email" value={r.elder_email} />
              <Field label="Elder Phone" value={r.elder_phone} />
            </Section>

            <Separator />

            <Section title="Documents & Status">
              <div className="col-span-1 sm:col-span-2 flex flex-wrap gap-3">
                {signedPassport && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(signedPassport, "_blank", "noopener,noreferrer")}
                  >
                    <ImageIcon className="h-4 w-4 mr-1" /> View Passport
                  </Button>
                )}
                {signedDoc && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(signedDoc, "_blank", "noopener,noreferrer")}
                  >
                    <FileText className="h-4 w-4 mr-1" /> View Response Document
                  </Button>
                )}
                <Badge variant="outline" className="h-9 px-3 text-xs capitalize">
                  Payment: {r.payment_status || "pending"}
                </Badge>
              </div>
            </Section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const buildOrdinandPdf = (r: Registration) => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  let y = margin;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Ordinand Profile", margin, y);
  y += 28;

  doc.setDrawColor(180);
  doc.line(margin, y, pageWidth - margin, y);
  y += 24;

  const fullName = getFullName(r);
  const dateOfNewBirth = formatDate(r.date_of_new_birth || r.accepted_christ_date);
  const historyAll = (r.spiritual_history ?? []).filter(Boolean);
  const extractYear = (s: string) => {
    const match = s.match(/\b(19|20)\d{2}\b/);
    return match ? parseInt(match[0], 10) : 0;
  };
  const history = [...historyAll].sort((a, b) => extractYear(b) - extractYear(a));
  const gifts = r.spiritual_gifts_manifest || "—";

  const writeField = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(label, margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(value || "—", contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 14 + 14;
  };

  writeField("Full Name", fullName);
  writeField("Date of New Birth", dateOfNewBirth);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Service History (most recent 5)", margin, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  if (history.length === 0) {
    doc.text("—", margin, y);
    y += 18;
  } else {
    history.forEach((item, idx) => {
      const lines = doc.splitTextToSize(`${idx + 1}. ${item}`, contentWidth);
      if (y + lines.length * 14 > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(lines, margin, y);
      y += lines.length * 14 + 4;
    });
  }
  y += 12;

  writeField("Spiritual Gifts Manifesting", gifts);

  doc.save(`Ordinand Profile - ${fullName}.pdf`);
};

const Admin = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Registration[]>([]);
  const [query, setQuery] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Registration | null>(null);

  useEffect(() => {
    let mounted = true;

    const verifyAndLoad = async (userId: string | undefined) => {
      if (!userId) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const { data: roleData, error: roleErr } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (roleErr || !roleData) {
        toast({
          title: "Not authorized",
          description: "Your account doesn't have admin access.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!mounted) return;
      setCheckingAuth(false);
      setLoading(true);
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        toast({ title: "Failed to load", description: error.message, variant: "destructive" });
      } else {
        setRows((data as Registration[]) ?? []);
      }
      setLoading(false);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });

    supabase.auth.getSession().then(({ data }) => {
      verifyAndLoad(data.session?.user.id);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        getFullName(r).toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const openFile = async (path: string | null) => {
    const url = await signedUrl(path);
    if (!url) {
      toast({ title: "File unavailable", variant: "destructive" });
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  const handleViewDetail = (r: Registration) => {
    setSelectedRow(r);
    setDetailOpen(true);
  };

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center py-32 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin mr-2" /> Verifying access…
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Registration Submissions"
        subtitle="Review submitted registrations, verify uploaded documents, and download ordinand profiles."
      />
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-1" /> Sign out
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
          <Input
            placeholder="Search by name or email…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-sm"
          />
          <div className="text-sm text-muted-foreground">
            {filtered.length} registration{filtered.length === 1 ? "" : "s"}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No registrations found.</div>
        ) : (
          <div className="space-y-4">
            {filtered.map((r) => {
              const name = getFullName(r);
              return (
                <Card key={r.id}>
                  <CardContent className="p-5 flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-lg truncate">{name}</h3>
                        {r.created_at && (
                          <Badge variant="secondary" className="font-normal">
                            {new Date(r.created_at).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{r.email}</p>
                      {r.phone_numbers && (
                        <p className="text-sm text-muted-foreground truncate">{r.phone_numbers}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetail(r)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View Full Detail
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={!r.passport_url}
                        onClick={() => openFile(r.passport_url)}
                      >
                        <ImageIcon className="h-4 w-4 mr-1" /> Passport
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={!r.response_document_url}
                        onClick={() => openFile(r.response_document_url)}
                      >
                        <FileText className="h-4 w-4 mr-1" /> Document
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => buildOrdinandPdf(r)}
                      >
                        <Download className="h-4 w-4 mr-1" /> Ordinand Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <DetailDialog
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        registration={selectedRow}
      />
    </div>
  );
};

export default Admin;
