import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
      <h1 className="font-display text-6xl font-bold text-foreground">404</h1>
      <p className="text-muted-foreground">Diese Seite existiert nicht.</p>
      <Link
        href="/"
        className="text-sm border-b border-foreground hover:opacity-60 transition-opacity"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
