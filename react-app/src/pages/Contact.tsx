import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, SendHorizontal } from "lucide-react";
import PageHeader from "~/components/PegeHeader";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { AlertManager } from "../lib/alert-manager";
import { Textarea } from "../components/ui/textarea";

export default function Contact() {
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  // ---------------------------------------------------------
  // VALIDATION
  // ---------------------------------------------------------
  function validate() {
    const e: { [k: string]: string } = {};
    if (!form.name) e.name = t("contact.form.errors.name");
    if (!form.email) e.email = t("contact.form.errors.email");
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = t("contact.form.errors.emailFormat");
    if (!form.message) e.message = t("contact.form.errors.message");
    return e;
  }

  // ---------------------------------------------------------
  // SEND (Fake API)
  // ---------------------------------------------------------
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      AlertManager.showSuccess(t("contact.form.success"));
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  }

  return (
    <div className="w-full">
      <PageHeader
        title={t("home.cards.contact.title")}
        imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=60"
      />

      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ------------------------------------------------------ */}
        {/* LEFT SIDE — COMPANY INFO */}
        {/* ------------------------------------------------------ */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">{t("contact.info.title")}</h2>
          <p className="text-muted-foreground">{t("contact.info.description")}</p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-primary" />
              <span>support@techpro.dev</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-primary" />
              <span>+34 600 123 456</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" />
              <span>Madrid, Spain</span>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            alt="Office"
            className="rounded-xl shadow-md"
          />
        </div>

        {/* ------------------------------------------------------ */}
        {/* RIGHT SIDE — CONTACT FORM */}
        {/* ------------------------------------------------------ */}
        <form
          className="space-y-4 bg-muted/40 p-6 rounded-xl shadow-sm border"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="font-medium">{t("contact.form.name")}</label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="font-medium">{t("contact.form.email")}</label>
            <Input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="font-medium">{t("contact.form.message")}</label>
            <Textarea
              rows={8}              
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full flex items-center gap-2"
            disabled={isSending}
          >
            {isSending ? t("contact.form.sending") : t("contact.form.send")}
            <SendHorizontal size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}
