import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Download, FileText, Image as ImageIcon, Loader2, Lock } from "lucide-react";
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
  date_of_new_birth: string | null;
  accepted_christ_date: string | null;
  spiritual_gifts_manifest: string | null;
  spiritual_history: string[] | null;
  passport_url: string | null;
  response_document_url: string | null;
  created_at: string | null;
};

const ADMIN_KEY = "rcn_admin_authed";
// Simple shared password gate. Change as needed.
const ADMIN_PASSWORD = "rcn-admin-2026";

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
  const dateOfNewBirth = r.date_of_new_birth || r.accepted_christ_date || "—";
  const historyAll = (r.spiritual_history ?? []).filter(Boolean);
  const history = historyAll.slice(-5).reverse(); // most recent first
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
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(ADMIN_KEY) === "1");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Registration[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!authed) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("registrations")
        .select(
          "id, full_name, first_name, middle_name, last_name, email, phone_numbers, date_of_new_birth, accepted_christ_date, spiritual_gifts_manifest, spiritual_history, passport_url, response_document_url, created_at"
        )
        .order("created_at", { ascending: false });
      if (error) {
        toast({ title: "Failed to load", description: error.message, variant: "destructive" });
      } else {
        setRows((data as Registration[]) ?? []);
      }
      setLoading(false);
    })();
  }, [authed]);

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

  if (!authed) {
    return (
      <div className="container mx-auto py-20 px-4 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" /> Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (password === ADMIN_PASSWORD) {
                  sessionStorage.setItem(ADMIN_KEY, "1");
                  setAuthed(true);
                } else {
                  toast({ title: "Incorrect password", variant: "destructive" });
                }
              }}
              className="space-y-4"
            >
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">Sign in</Button>
            </form>
          </CardContent>
        </Card>
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
    </div>
  );
};

export default Admin;
