<div align="center">
  <a href="https://free-qr-code-generator-online.github.io/">
    <img src="./public/favicon.svg" alt="QR Creator Logo" width="80" height="80" />
  </a>

  <h1>Free Online QR Code Generator</h1>

  <p>
    <strong>High-resolution, privacy-first QR code creator with custom colors, dot styling, brand logo embedding, UTM tracking, and "Scan Me" promotional frames — 100% free, static, and client-side.</strong>
  </p>

  <p>
    <a href="https://free-qr-code-generator-online.github.io/">
      <img src="https://img.shields.io/badge/Launch_App-free--qr--code--generator--online.github.io-4F46E5?style=for-the-badge&logo=qrcode&logoColor=white" alt="Launch App" />
    </a>
    <a href="https://kisharadilshan.gumroad.com/coffee">
      <img src="https://img.shields.io/badge/Support_Developer-Buy_a_Coffee-FF813F?style=for-the-badge&logo=buymeacoffee&logoColor=white" alt="Support the Developer" />
    </a>
  </p>

  <p>
    <a href="https://github.com/free-qr-code-generator-online/free-qr-code-generator-online.github.io/actions/workflows/deploy.yml">
      <img src="https://github.com/free-qr-code-generator-online/free-qr-code-generator-online.github.io/actions/workflows/deploy.yml/badge.svg" alt="Deploy to GitHub Pages" />
    </a>
    <img src="https://img.shields.io/badge/Astro-4.14-FF5D01?logo=astro&logoColor=white" alt="Astro 4" />
    <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=11151C" alt="React 18" />
    <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3" />
    <img src="https://img.shields.io/badge/Privacy-100%25_Client--Side-10B981?logo=shield&logoColor=white" alt="100% Client-Side Privacy" />
    <a href="./LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-blue" alt="MIT License" />
    </a>
  </p>

  <br />

  <a href="https://free-qr-code-generator-online.github.io/">
    <img src="https://res.cloudinary.com/dpx6w78bt/image/upload/f_auto/q_auto/v1786342039/Online_Tool_rc1ybr.png" alt="Free Online QR Code Generator Interface Preview" width="850" />
  </a>
</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Supported QR Code Templates](#supported-qr-code-templates)
- [Design & Customization Options](#design--customization-options)
- [Tech Stack & Architecture](#tech-stack--architecture)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [GitHub Pages Deployment (CI/CD)](#github-pages-deployment-cicd)
- [Privacy & Security Guarantee](#privacy--security-guarantee)
- [Technical SEO & Performance](#technical-seo--performance)
- [Author & Support](#author--support)
- [License](#license)

---

## Overview

**Free Online QR Code Generator** is a fast, responsive, zero-backend web utility engineered to create production-grade, permanent QR codes in seconds. Built on **Astro** and **React**, it processes every data type—from complex vCards and Wi-Fi credentials to campaign URLs and cryptocurrency addresses—strictly within the user's web browser using client-side HTML5 Canvas.

Unlike commercial QR platforms that gate features behind recurring paywalls, enforce scan limits, or reroute scans through insecure tracking redirects, this tool generates **pure static QR codes** that:
- Never expire or degrade over time.
- Carry zero scan limits or subscription fees.
- Contain no third-party redirect middleman.
- Do not collect, transmit, or log user data.

---

## Key Features

### 🎯 7 Standardized QR Templates
Quick-fill form presets with instant live validation for URLs, Plain Text, Wi-Fi Networks, vCards, WhatsApp direct chats, pre-filled Emails, and Crypto Wallets.

### 🎨 Visual Studio & Brand Customization
- **Custom Color Palettes**: Independent foreground (code) and background hex color controls.
- **Modern Dot Patterns**: Switch between traditional sharp squares and rounded contemporary circular modules.
- **Adjustable Eye Radius**: Smooth, rounded outer and inner corner positioning markers (0px to 10px).
- **Logo Integration**: Upload any PNG, SVG, or JPG brand icon. Features automatic background clearing behind the logo and maintains high scanning reliability with **Level-H Error Correction (30% recovery)**.

### 🖼️ "Scan Me" Promotional CTA Frames
Toggleable high-impact border frames with editable call-to-action text (e.g. `SCAN ME`, `CONNECT WI-FI`, `VIEW MENU`) rendered directly into the exported image for print banners, retail stickers, and flyers.

### 📊 Built-In UTM Campaign Tagging
Optional UTM campaign builder (`utm_source`, `utm_medium`, `utm_campaign`) dynamically appended to URL codes for marketing attribution in Google Analytics, Mixpanel, and Matomo.

### ⚡ Ultra-High Resolution PNG Export
One-click download generates an uncompressed, razor-sharp **1024×1024px PNG** canvas suitable for high-DPI digital displays and physical print media.

### 📱 Responsive & Touch-Optimized
Horizontal scrollable tab bar equipped with smooth left/right gradient fades and navigation arrow triggers, delivering an intuitive experience across mobile devices, tablets, and desktop displays.

---

## Supported QR Code Templates

| Template | Protocol / Standard | Configurable Parameters | Typical Use Case |
| :--- | :--- | :--- | :--- |
| **URL / Link** | `https://` | Destination URL, UTM Source, Medium, Campaign | Websites, landing pages, digital menus, portfolios |
| **Plain Text** | Raw string | Multi-line arbitrary text | Serial numbers, Wi-Fi codes, quotes, secret messages |
| **Wi-Fi Network** | `WIFI:T:..;S:..;P:..;;` | SSID, Password, Encryption (`WPA/WPA2`, `WEP`, `None`) | Cafes, offices, Airbnb check-ins, guest networks |
| **vCard (Contact)** | `BEGIN:VCARD ... v3.0` | Full Name, Phone, Email Address, Company/Organization | Business cards, conferences, networking |
| **WhatsApp** | `wa.me/<phone>?text=...` | Country Code + Phone Number, Pre-filled message | Customer support, direct sales, event RSVPs |
| **Email** | `mailto:<to>?subject=...` | Recipient Address, Subject line, Message body | Feedback forms, inquiries, RSVP subscriptions |
| **Crypto Wallet** | `<coin>:<address>` | Coin type (`Bitcoin`, `Ethereum`, `Litecoin`), Wallet Address | Seamless peer-to-peer crypto payments |

---

## Design & Customization Options

```
┌────────────────────────────────────────────────────────┐
│                   Customization Studio                 │
├──────────────────────────┬─────────────────────────────┤
│ Module Style             │ Squares (Classic) / Dots    │
│ Eye Radius               │ 0px (Square) to 10px (Round)│
│ Foreground Color         │ Any Hex code (Default #000) │
│ Background Color         │ Any Hex code (Default #FFF) │
│ Logo Integration         │ PNG/SVG/JPG with auto-clear │
│ Error Correction Level   │ Level H (up to 30% damage)  │
│ Promotional Frame        │ Customizable CTA text       │
│ Output Canvas            │ 1024 × 1024 px PNG          │
└──────────────────────────┴─────────────────────────────┘
```

---

## Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Static Site Generator** | [Astro](https://astro.build/) `v4.14` | Zero-JS static HTML shell, optimal SEO metadata & sub-second loading |
| **Interactive UI Island** | [React](https://react.dev/) `v18.3` | Dynamic state management, real-time input binding & Canvas rendering |
| **QR Code Engine** | [react-qrcode-logo](https://github.com/gcoro/react-qrcode-logo) `v4.1` | HTML5 Canvas QR matrix generation, custom eyes, and logo support |
| **Styling & Design** | [Tailwind CSS](https://tailwindcss.com/) `v3.4` | Responsive layout, modern color palette, and utility-first typography |
| **Iconography** | [Lucide React](https://lucide.dev/) | High-clarity vector UI icons |
| **CI/CD & Hosting** | [GitHub Pages](https://pages.github.com/) via GitHub Actions | Automated builds on push to `main` via `withastro/action@v3` |

---

## Project Structure

```text
free-qr-code-generator-online.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── favicon.svg                 # Custom vector app icon
│   ├── robots.txt                  # Search engine crawl directives
│   └── sitemap-index.xml           # XML sitemap for SEO discovery
├── src/
│   ├── components/
│   │   └── QrGenerator.jsx         # React interactive QR generator workspace
│   ├── layouts/
│   │   └── Layout.astro            # Base layout, Open Graph, Twitter cards, Analytics
│   ├── pages/
│   │   └── index.astro             # Main landing page with FAQ & Schema.org JSON-LD
│   ├── styles/
│   │   └── global.css              # Tailwind base, utilities & scrollbar suppression
│   └── env.d.ts                    # TypeScript Astro client definitions
├── astro.config.mjs                # Astro configuration & integrations
├── package.json                    # Project metadata & npm dependencies
├── tailwind.config.mjs             # Tailwind CSS design system configuration
├── .gitignore                      # Git ignored files (dist, node_modules, etc.)
├── LICENSE                         # MIT License
└── README.md                       # Comprehensive documentation
```

---

## Local Development

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/free-qr-code-generator-online/free-qr-code-generator-online.github.io.git
   cd free-qr-code-generator-online.github.io
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:4321`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Static output files will be compiled to the `dist/` directory.

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## GitHub Pages Deployment (CI/CD)

The project includes an automated deployment pipeline configured via GitHub Actions in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Every commit pushed to the `main` branch automatically:
1. Checks out the repository.
2. Installs dependencies and runs `astro build`.
3. Packages the static artifacts from `dist/`.
4. Deploys the build output directly to **GitHub Pages**.

### Setting Up on a Fork:
1. Navigate to **Settings → Pages** in your GitHub repository.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or run the workflow manually under the **Actions** tab).

---

## Privacy & Security Guarantee

- **🔒 Zero Data Collection**: No user inputs, generated codes, uploaded logos, or passwords ever leave your machine.
- **⚡ Client-Side Only**: The entire generation pipeline is executed directly inside your browser using JavaScript and HTML5 Canvas.
- **🛡️ Direct Scans**: The resulting QR codes contain raw, direct data (e.g. `https://yourdomain.com` or `WIFI:...`) without routing through tracking intermediaries or shorteners.

---

## Technical SEO & Performance

- **Structured Data (JSON-LD)**: Rich `SoftwareApplication` schema embedded on the home page with author attribution, zero-dollar pricing, and application categories.
- **Social Graph Optimization**: Complete Open Graph (`og:image`, `og:title`, `og:description`, `og:url`) and Twitter Summary Cards for high-converting social shares.
- **Crawler Optimization**: Valid `robots.txt` and static `sitemap-index.xml` referencing canonical URLs.
- **Accessible HTML**: Semantic landmark elements (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`), explicit input labels (`htmlFor` / `id`), and high-contrast color pairings.

---

## Author & Support

Crafted with care by **Kishara Dilshan**.

- ☕ **Support the Project**: If this free tool saved you time or money, consider supporting development at [https://kisharadilshan.gumroad.com/coffee](https://kisharadilshan.gumroad.com/coffee).
- 📧 **Inquiries & Feedback**: Reach out directly at [kisharadilshan007@gmail.com](mailto:kisharadilshan007@gmail.com).

---

## License

This project is open-source and released under the **[MIT License](./LICENSE)**. You are free to use, modify, and distribute this software for personal and commercial purposes.
