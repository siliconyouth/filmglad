# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Cast & Crew section on homepage and dedicated `/crew` page
  - IMDB-sourced data (tt39061476) with links to profiles
  - Producers, Cast, Director, Cinematographer, Writers sections
  - Order: Producers → Cast → Director → Cinematographer → Writers
- "In The News" section on homepage and dedicated `/news` page
  - 4 media articles from Serbian news outlets (Blic, K1 Info, Telegraf, Glas Srpske)
  - Bilingual article metadata
- Navigation links for News and Cast & Crew pages

### Changed
- Header z-index increased to 9999 to stay above PayPal buttons
- Jelica Kovacevic listed as Producer (not Executive Producer)

### Fixed
- IMDb text display (was showing "IMD" due to broken SVG)

## [0.2.0] - 2025-12-25

### Added
- PayPal donation integration with Card/Debit and PayPal buttons
- Donation tier system:
  - €100+ Supporter
  - €250+ Patron
  - €500+ Associate Producer
  - €1000+ Executive Producer
  - €2500+ Producer
- Custom amount input for donations
- Donor showcase section
- Red-to-blue gradient color scheme
- Viewport-based title sizing (42vw on mobile)
- Vercel Analytics integration
- Dynamic OpenGraph images for both locales

### Changed
- Accent color from cyan to red
- Button styling to gradient (`.btn-gradient`)
- Donate section moved after hero on homepage

### Removed
- Photo gallery (temporarily, until photos available)
- Placeholder donors and crew sections

## [0.1.0] - 2025-12-24

### Added
- Initial Next.js 16 project setup
- Bilingual support (Serbian/English) with next-intl
- Homepage with Hero, Synopsis, Trailer sections
- Basic donate page structure
- Tailwind CSS 4 styling
- Vercel deployment configuration
