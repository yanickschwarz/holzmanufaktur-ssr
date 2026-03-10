# Holzmanufaktur Eichenberger — Next.js SSR

Next.js SSR version of holzmanufaktur-eichenberger.ch

## Setup

1. Copy `.env.example` to `.env.local` and fill in your Supabase credentials:
```bash
cp .env.example .env.local
```

2. Add your Supabase keys to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Development
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Deploy to Vercel
1. Push to GitHub
2. Import in Vercel
3. Add environment variables in Vercel settings
