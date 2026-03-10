"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          message: formData.message,
        },
      });
      if (error) throw error;
      setFeedback("Vielen Dank für Ihre Nachricht. Wir melden uns bald bei Ihnen.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => { onOpenChange(false); setFeedback(""); }, 2000);
    } catch {
      setFeedback("Fehler: Die Nachricht konnte nicht gesendet werden.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-center text-foreground">
            Anfrage senden
          </DialogTitle>
        </DialogHeader>
        {feedback && (
          <p className="text-sm text-center py-2 text-muted-foreground">{feedback}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-body text-sm text-muted-foreground">Name *</Label>
            <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ihr Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-body text-sm text-muted-foreground">E-Mail *</Label>
            <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="ihre@email.ch" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-body text-sm text-muted-foreground">Telefon</Label>
            <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+41 XX XXX XX XX" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="font-body text-sm text-muted-foreground">Nachricht *</Label>
            <Textarea id="message" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="min-h-[100px]" placeholder="Ihre Nachricht an uns..." />
          </div>
          <Button type="submit" variant="elegant" size="lg" className="w-full mt-6" disabled={isSubmitting}>
            {isSubmitting ? "Wird gesendet..." : "Absenden"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
