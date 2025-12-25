# GLAD / HUNGER - Film Website

A bilingual (Serbian/English) website for the documentary film **GLAD** (Serbian) / **HUNGER** (English) about mental health awareness.

## Features

- **Bilingual Support**: Serbian (primary) and English with URL-based locale switching (`/sr`, `/en`)
- **PayPal Donations**: Direct donation integration with tier-based rewards
- **Donor Showcase**: Display donors by contribution tier (Kickstarter/Patreon style)
- **Mental Health Awareness**: Part of donations support mental health campaigns
- **Responsive Design**: Dark theme optimized for all devices

## Donation Tiers

| Tier | Amount | Perks |
|------|--------|-------|
| Supporter | €5+ | Name in credits |
| Patron | €25+ | Digital poster + credits |
| Producer | €100+ | Private screening invite + all above |
| Executive Producer | €500+ | Meet the team + signed poster + all above |

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Payments**: PayPal React SDK (@paypal/react-paypal-js)
- **i18n**: next-intl for Serbian/English localization
- **Icons**: Lucide React
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/siliconyouth/filmglad.git
cd filmglad

# Install dependencies
pnpm install

# Copy environment variables
cp .env.local.example .env.local
# Edit .env.local with your PayPal client ID
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build

```bash
pnpm build
pnpm start
```

## Environment Variables

Create a `.env.local` file with:

```env
# PayPal Configuration
# Get your client ID from: https://developer.paypal.com/dashboard/applications/sandbox
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Locale-based routing (sr, en)
│   │   ├── page.tsx        # Homepage
│   │   ├── donate/         # Donation page
│   │   └── layout.tsx      # Locale layout
├── components/             # React components
├── i18n/                   # Internationalization config
└── messages/               # Translation files (sr.json, en.json)
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variable: `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
4. Deploy

## License

All rights reserved. This project is for the GLAD/HUNGER film production.
