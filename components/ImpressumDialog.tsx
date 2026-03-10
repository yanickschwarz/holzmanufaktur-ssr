"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ImpressumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImpressumDialog = ({ open, onOpenChange }: ImpressumDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl text-center text-foreground">
            Impressum & Datenschutz
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[70vh] pr-4">
          <div className="space-y-6 text-sm text-muted-foreground">
            <section>
              <h3 className="text-base font-medium text-foreground mb-3">Impressum</h3>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Holzmanufaktur Eichenberger</p>
                <p>Michael Eichenberger</p>
                <p>Neudorfstrasse 61</p>
                <p>5734 Reinach AG</p>
              </div>
              <div className="space-y-1 mt-4">
                <p>
                  <span className="text-foreground">Telefon:</span>{" "}
                  <a href="tel:+41782071771" className="hover:text-primary transition-colors">+41 78 207 17 71</a>
                </p>
                <p>
                  <span className="text-foreground">E-Mail:</span>{" "}
                  <a href="mailto:info@holzmanufaktur-eichenberger.ch" className="hover:text-primary transition-colors">info@holzmanufaktur-eichenberger.ch</a>
                </p>
              </div>
            </section>

            <section className="pt-4 border-t border-border">
              <p className="font-medium text-foreground mb-2">Webdesign</p>
              <div className="space-y-1">
                <p className="font-medium">Vlix GmbH</p>
                <p>Bahnhofstrasse 3C</p>
                <p>5616 Meisterschwanden</p>
              </div>
              <div className="space-y-1 mt-3">
                <p><a href="mailto:info@vlix.ch" className="hover:text-primary transition-colors">info@vlix.ch</a></p>
                <p><a href="https://www.vlix.ch" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">www.vlix.ch</a></p>
                <p><a href="tel:+41774087923" className="hover:text-primary transition-colors">+41 77 408 79 23</a></p>
              </div>
            </section>

            <section className="pt-4 border-t border-border">
              <h3 className="text-base font-medium text-foreground mb-3">Datenschutzerklärung</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">1. Verantwortliche Stelle</h4>
                  <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist Holzmanufaktur Eichenberger, Michael Eichenberger, Neudorfstrasse 61, 5734 Reinach AG.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">2. Erhebung und Verarbeitung von Daten</h4>
                  <p>Diese Website wird auf Vercel gehostet. Bei jedem Zugriff werden automatisch Daten in Server-Logfiles gespeichert: IP-Adresse, Datum und Uhrzeit des Zugriffs, Name und URL der abgerufenen Datei, Referrer URL, verwendeter Browser und Betriebssystem.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">3. Kontaktformular</h4>
                  <p>Wenn Sie unser Kontaktformular nutzen, werden Name, E-Mail-Adresse, Telefonnummer (optional) und Ihre Nachricht erhoben. Diese Daten werden ausschliesslich zur Bearbeitung Ihrer Anfrage verwendet.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">4. Ihre Rechte</h4>
                  <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung.</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">5. Kontakt für Datenschutzanfragen</h4>
                  <p>info@holzmanufaktur-eichenberger.ch</p>
                </div>
                <p className="text-xs text-muted-foreground mt-4">Stand: Dezember 2024</p>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ImpressumDialog;
