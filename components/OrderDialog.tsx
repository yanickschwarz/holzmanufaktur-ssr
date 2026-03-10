"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
    price_from: number;
    extras?: Array<{ name: string; price: number }>;
    main_image?: string;
  } | null;
}

const OrderDialog = ({ open, onOpenChange, product }: OrderDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", city: "", zip: "", payment: "", notes: "",
  });

  if (!product) return null;

  const extras = product.extras || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.payment) { setFeedback("Bitte Zahlungsart wählen"); return; }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("orders").insert({
        product_id: product.id,
        product_name: product.name,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone || null,
        customer_address: formData.address || null,
        customer_city: formData.city || null,
        customer_zip: formData.zip || null,
        payment_method: formData.payment,
        notes: formData.notes || null,
        total_price: product.price_from,
      });
      if (error) throw error;

      supabase.functions.invoke("send-order-confirmation", {
        body: {
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone || undefined,
          customer_address: formData.address || undefined,
          customer_city: formData.city || undefined,
          customer_zip: formData.zip || undefined,
          product_name: product.name,
          product_image: product.main_image || "",
          price: product.price_from,
          payment_method: formData.payment,
          notes: formData.notes || undefined,
        },
      }).catch(console.error);

      setFeedback("Vielen Dank! Sie erhalten eine Bestätigung per E-Mail.");
      setFormData({ name: "", email: "", phone: "", address: "", city: "", zip: "", payment: "", notes: "" });
      setTimeout(() => { onOpenChange(false); setFeedback(""); }, 2000);
    } catch {
      setFeedback("Fehler. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-center">Bestellung: {product.name}</DialogTitle>
          <p className="text-center text-muted-foreground text-sm">Ab CHF {product.price_from.toFixed(2)}</p>
        </DialogHeader>
        {feedback && <p className="text-sm text-center py-2 text-muted-foreground">{feedback}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm text-muted-foreground">Name *</Label>
              <Input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Ihr Name" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-muted-foreground">E-Mail *</Label>
              <Input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="ihre@email.ch" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm text-muted-foreground">Telefon</Label>
              <Input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+41 XX XXX XX XX" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-muted-foreground">PLZ</Label>
              <Input value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} placeholder="5734" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm text-muted-foreground">Adresse</Label>
              <Input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} placeholder="Strasse Nr." />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-muted-foreground">Ort</Label>
              <Input value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} placeholder="Reinach AG" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Zahlungsart *</Label>
            <div className="grid grid-cols-3 gap-2">
              {["bar", "twint", "rechnung"].map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setFormData({ ...formData, payment: method })}
                  className={`py-2 px-3 rounded-md border text-sm capitalize transition-all ${
                    formData.payment === method
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/50"
                  }`}
                >
                  {method === "bar" ? "Bar" : method === "twint" ? "Twint" : "Rechnung"}
                </button>
              ))}
            </div>
          </div>

          {extras.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Optionen</Label>
              <div className="space-y-1 text-sm">
                {extras.map((extra, i) => (
                  <div key={i} className="flex justify-between text-muted-foreground">
                    <span>{extra.name}</span>
                    <span>+ CHF {extra.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">Bemerkungen</Label>
            <Textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} placeholder="Gewünschte Optionen, Gravur, etc." className="min-h-[80px]" />
          </div>

          <p className="text-xs text-muted-foreground">* Porto und Verpackung: ab CHF 6.90</p>
          <Button type="submit" variant="elegant" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Wird gesendet..." : "Bestellung absenden"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
