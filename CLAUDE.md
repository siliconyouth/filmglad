# GLAD / HUNGER - Film Website

## Project Overview

This is a Next.js TypeScript website for the movie "GLAD" (Serbian) / "HUNGER" (English). The site is bilingual (Serbian primary, English secondary) and hosted on Vercel.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Payments**: PayPal React SDK (@paypal/react-paypal-js)
- **i18n**: next-intl for Serbian/English localization
- **Icons**: Lucide React
- **Hosting**: Vercel

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Locale-based routing (sr, en)
│   │   ├── page.tsx        # Homepage
│   │   ├── donate/         # Donation page
│   │   │   └── page.tsx
│   │   └── layout.tsx      # Locale layout with i18n provider
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/
│   ├── Hero.tsx            # Hero section with poster
│   ├── Synopsis.tsx        # Movie synopsis
│   ├── Gallery.tsx         # Photo gallery
│   ├── Trailer.tsx         # Video trailer (YouTube/Vimeo)
│   ├── DonateButton.tsx    # PayPal donation CTA
│   ├── DonorTiers.tsx      # Donation tier selector
│   ├── DonorShowcase.tsx   # Display donors by tier
│   ├── Header.tsx          # Navigation with language switcher
│   └── Footer.tsx          # Footer component
├── i18n/
│   ├── request.ts          # i18n request config
│   └── routing.ts          # Routing config for locales
└── messages/
    ├── sr.json             # Serbian translations
    └── en.json             # English translations
```

## Key Features

1. **Bilingual Support**: Serbian (primary) and English (secondary) with URL-based locale switching (/sr, /en)
2. **PayPal Donations**: Direct donation on homepage and dedicated donate page
3. **Donor Tiers**: Kickstarter-style tiers (Supporter, Patron, Producer, Executive Producer)
4. **Mental Health Awareness**: Part of donations support mental health campaign
5. **Media Showcase**: Hero poster, photo gallery, and trailer video

## Environment Variables

Create a `.env.local` file with:

```env
# PayPal Configuration (Sandbox for dev, Live for production)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id

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

## Donation Tiers

| Tier | Amount | Perks |
|------|--------|-------|
| Supporter | €5+ | Name in credits |
| Patron | €25+ | Digital poster + credits |
| Producer | €100+ | Private screening invite + all above |
| Executive Producer | €500+ | Meet the team + signed poster + all above |

## Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm start` - Start production server
