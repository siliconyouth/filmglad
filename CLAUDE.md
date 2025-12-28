# GLAD / HUNGER - Film Website

## Project Overview

This is a Next.js TypeScript website for the movie "GLAD" (Serbian) / "HUNGER" (English). The site is bilingual (Serbian primary, English secondary) and hosted on Vercel.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Payments**: Stripe (@stripe/stripe-js, stripe)
- **i18n**: next-intl for Serbian/English localization
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Hosting**: Vercel

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Locale-based routing (sr, en)
│   │   ├── page.tsx        # Homepage
│   │   ├── donate/         # Donation page with tier perks
│   │   ├── news/           # News/media coverage page
│   │   ├── crew/           # Cast & crew page
│   │   └── layout.tsx      # Locale layout with i18n provider
│   ├── globals.css         # Global styles, gradients, buttons
│   └── layout.tsx          # Root layout
├── components/
│   ├── Hero.tsx            # Hero section with film title
│   ├── Synopsis.tsx        # Movie synopsis/about section
│   ├── Trailer.tsx         # Video trailer embed
│   ├── DonateButton.tsx    # PayPal Card/Debit + PayPal buttons
│   ├── DonorTiers.tsx      # Donation tier cards with perks
│   ├── HomeDonateSection.tsx # Simplified donate section for homepage
│   ├── DonorShowcase.tsx   # Display donors by tier
│   ├── NewsSection.tsx     # Media coverage preview (homepage)
│   ├── CrewCastSection.tsx # Cast & crew preview (homepage)
│   ├── Header.tsx          # Navigation with language switcher
│   └── Footer.tsx          # Footer component
├── data/
│   └── crew.ts             # IMDB-sourced crew/cast data
├── i18n/
│   ├── request.ts          # i18n request config
│   └── routing.ts          # Routing config for locales
└── messages/
    ├── sr.json             # Serbian translations
    └── en.json             # English translations
```

## Key Features

1. **Bilingual Support**: Serbian (primary) and English with URL-based locale switching (/sr, /en)
2. **PayPal Donations**: Separate Card/Debit and PayPal buttons with selectable amounts
3. **Donor Tiers**: Kickstarter-style tiers with perks:
   - €100+ Supporter
   - €250+ Patron
   - €500+ Associate Producer
   - €1000+ Executive Producer
   - €2500+ Producer
4. **Mental Health Awareness**: Part of donations support mental health campaigns
5. **News Section**: Media coverage with links to external articles
6. **Cast & Crew**: IMDB-sourced data with links to profiles
7. **Responsive Design**: Mobile-first with viewport-based title sizing
8. **Red-Blue Gradient Theme**: Consistent gradient styling across buttons and titles

## Environment Variables

Create a `.env.local` file with:

```env
# Stripe Configuration
# Get these from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_live_... (or sk_test_... for development)

# Optional: Database for storing donors (if implemented)
DATABASE_URL=your_database_url
```

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run production build locally
pnpm start
```

## Deployment

The site is configured for Vercel deployment. Push to main branch to auto-deploy.

## IMDB Integration

Cast & crew data is sourced from IMDB (tt39061476) and stored in `src/data/crew.ts`. To update:
1. Visit https://www.imdb.com/title/tt39061476/fullcredits
2. Update the data in `src/data/crew.ts`

## News Articles

External news links are stored in:
- `src/components/NewsSection.tsx` (homepage preview)
- `src/app/[locale]/news/page.tsx` (full page)

Article metadata (titles, descriptions) are in translation files.

## Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm start` - Start production server
