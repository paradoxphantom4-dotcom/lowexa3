# LØWEXA — Product Requirements Document (PRD)
# Website: Single-Page Sales Landing for Microplastic-Free Bundle
# Version: 1.0 | April 2026

---

## 1. PROJECT OVERVIEW

**Product:** LØWEXA Microplastic-Free Life Bundle (ebook + grocery guide)
**Type:** Single-page marketing/sales landing page
**Stack:** HTML / CSS / JavaScript (vanilla)
**Deployment:** Vercel (static)
**Checkout:** Shopify Storefront API / Buy Button (external checkout via Shopify)
**Price:** €15–20 for the bundle
**Goal:** Educate visitor → build urgency → convert to Shopify checkout

---

## 2. DESIGN LANGUAGE

### Reference: seed.com
Study the attached `seed_com.html` for the exact design feel. The LØWEXA site should capture this aesthetic:

### 2.1 Design Principles
- **Clean, scientific, premium** — not salesy, not cluttered
- **Generous whitespace** — let content breathe, Seed-style spacing
- **Dark brand color on light background** — text-forward, minimal decoration
- **Smooth scroll** — sections flow into each other
- **Mobile-first** — majority of traffic will be mobile (Instagram/TikTok)
- **No stock-photo overload** — use 2-3 hero images max, let typography do the work
- **Rounded corners** on cards/buttons (border-radius: 1rem like Seed)

### 2.2 Color Tokens (CSS Custom Properties)
```css
:root {
  --color-brand: #1A4D3E;           /* Deep green — primary brand */
  --color-brand-hover: #2D7A62;     /* Mid green — hover states */
  --color-brand-light: #E8F2EE;     /* Light green — card backgrounds */
  --color-bg-primary: #EDEDE8;      /* Warm off-white — page background */
  --color-bg-secondary: #F6F7EF;    /* Yellowish white — section alternation */
  --color-bg-white: #FCFCF7;        /* Snow white — cards */
  --color-text-primary: #1A4D3E;    /* Same as brand — headings */
  --color-text-body: #1A1A1A;       /* Near black — body copy */
  --color-text-muted: #5A6E65;      /* Muted green-grey — secondary text */
  --color-text-light: #8A9E95;      /* Light — captions, footnotes */
  --color-accent-red: #C0392B;      /* Red — warning/stop items */
  --color-border: #C5D8D0;          /* Subtle green border */
  --color-cta: #1A4D3E;             /* CTA button background */
  --color-cta-text: #FCFCF7;        /* CTA button text */
}
```

### 2.3 Typography
```css
:root {
  --ff-sans: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  /* Use Inter from Google Fonts — clean, modern, similar weight to Seed Sans */
  
  --fs-display: clamp(2.5rem, 5vw, 4rem);    /* Hero headline */
  --fs-h1: clamp(2rem, 4vw, 3rem);            /* Section headings */
  --fs-h2: clamp(1.5rem, 3vw, 2rem);          /* Subsection headings */
  --fs-h3: clamp(1.125rem, 2vw, 1.5rem);      /* Card titles */
  --fs-body: clamp(0.9375rem, 1.5vw, 1.125rem); /* Body text */
  --fs-small: clamp(0.8125rem, 1.2vw, 0.9375rem); /* Captions */
  --fs-micro: 0.75rem;                         /* Labels, footnotes */
  
  --fw-light: 300;
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-bold: 600;
  
  --lh-tight: 1.1;    /* Headlines */
  --lh-normal: 1.5;   /* Body */
  --lh-loose: 1.7;    /* Long-form */
  
  --ls-tight: -0.02em; /* Headlines */
  --ls-normal: 0;      /* Body */
  --ls-wide: 0.05em;   /* Labels, ALL CAPS */
}
```

### 2.4 Spacing System (matches Seed)
```css
:root {
  --space-xs: 0.5rem;    /* 8px */
  --space-s: 1rem;       /* 16px */
  --space-m: 1.5rem;     /* 24px */
  --space-l: 2.5rem;     /* 40px */
  --space-xl: 4rem;      /* 64px */
  --space-2xl: 6rem;     /* 96px */
  --space-3xl: 8rem;     /* 128px */
  
  --space-outer: var(--space-s);       /* Page margin mobile */
  --space-section: var(--space-2xl);   /* Between sections */
  
  --max-width: 1200px;    /* Content max width */
  --max-width-narrow: 720px; /* Text content max width */
  --max-width-xnarrow: 560px; /* Single column text */
  
  --border-radius-s: 0.5rem;
  --border-radius-m: 1rem;
  --border-radius-l: 2rem;
  --border-radius-pill: 99em;
}

@media (min-width: 768px) {
  :root {
    --space-outer: 2rem;
    --space-section: var(--space-3xl);
  }
}
```

### 2.5 Buttons (Seed-style)
```
Primary CTA:
  - Background: var(--color-cta)
  - Text: var(--color-cta-text)
  - Padding: 1rem 2rem
  - Border-radius: var(--border-radius-pill)
  - Font: var(--fw-medium), var(--fs-body)
  - Hover: background shifts to var(--color-brand-hover), slight scale(1.02)
  - Transition: all 0.3s ease-in-out

Secondary/Ghost:
  - Background: transparent
  - Border: 1.5px solid var(--color-brand)
  - Text: var(--color-brand)
  - Same radius and padding
  - Hover: background fills to var(--color-brand-light)

Text link with arrow (Seed pattern):
  - Underline on hover
  - Small arrow SVG appears on hover with translateX animation
```

### 2.6 Animations
- **Scroll-triggered fade-in** — elements fade up (translateY: 20px → 0, opacity: 0 → 1) as they enter viewport
- Use `IntersectionObserver` — no heavy libraries
- Transition timing: `0.6s cubic-bezier(0.25, 0.1, 0.25, 1)`
- Stagger child elements by 100ms delay
- **No parallax, no heavy JS** — keep it fast

---

## 3. PAGE STRUCTURE

The site is ONE single page with smooth-scroll sections. No routing, no multi-page. Sticky nav at top.

### 3.0 Sticky Nav Bar
```
Layout: [LØWEXA logo (left)] ———— [Get the Bundle (CTA button, right)]
Height: 3rem (48px)
Background: var(--color-bg-primary) with backdrop-filter: blur(20px) at 85% opacity
Position: fixed, top: 0, z-index: 100
Border-bottom: 1px solid var(--color-border) at 10% opacity
Behavior: always visible, CTA scrolls to checkout section
```

### 3.1 SECTION: Hero
```
Purpose: Hook the visitor immediately. Create authority.
Background: var(--color-bg-primary)
Layout: Full-width, centered content, max-width: var(--max-width-narrow)
Padding: var(--space-3xl) top, var(--space-2xl) bottom

Content:
  - Pill badge: "BACKED BY 30+ PEER-REVIEWED STUDIES" 
    (small, uppercase, letter-spacing wide, border pill, var(--color-brand))
  
  - Headline (var(--fs-display), var(--fw-light), var(--lh-tight)):
    "There are microplastics inside your body right now."
  
  - Subheadline (var(--fs-body), var(--color-text-muted), max-width: 480px):
    "The science is clear. The average person ingests 5 grams of plastic every week — 
     the weight of a credit card. This guide shows you exactly how to stop it."
  
  - CTA button: "Get the Bundle — €15" → scrolls to checkout section
  
  - Below CTA, small muted text: "Instant PDF download · 50+ pages · Peer-reviewed sources"

Scroll indicator: subtle down-arrow animation at bottom of hero
```

### 3.2 SECTION: The Problem (Stats Bar)
```
Purpose: Shock with data. Make the problem visceral.
Background: var(--color-brand) (DARK section — white text)
Border-radius: var(--border-radius-l) var(--border-radius-l) 0 0 (like Seed)
Padding: var(--space-2xl) vertical

Layout: 4-column grid on desktop, 2x2 on tablet, stack on mobile

Stat cards (each):
  - Large number: var(--fs-h1), var(--fw-bold), color: white
  - Label below: var(--fs-small), color: rgba(255,255,255,0.7)

Stats to display:
  1. "77%" / "of adults have microplastics in their blood"
  2. "4.53×" / "higher cardiovascular risk with plastic in arteries"
  3. "52%" / "decline in sperm count since 1973"
  4. "5g/week" / "of plastic you consume — the weight of a credit card"

Source line at bottom: "Sources: NEJM 2024, Environment International 2022, Human Reproduction Update 2017"
  var(--fs-micro), rgba(255,255,255,0.4)
```

### 3.3 SECTION: What's Inside
```
Purpose: Show what they get. Make the bundle feel tangible and premium.
Background: var(--color-bg-secondary)
Padding: var(--space-2xl) vertical

Section label: "THE BUNDLE" (pill badge, uppercase)
Section heading: "Everything you need to go plastic-free."

Layout: 2-column card grid (stack on mobile)
Each card has a 3D BOOK MOCKUP IMAGE — not a flat PDF cover.

IMPORTANT — PRODUCT MOCKUP IMAGES:
  The developer must use the provided 3D book mockup images.
  These are placed in /images/ and show the products as physical hardcover books
  (even though the actual product is a PDF — the mockups make it feel premium).
  
  File references:
    /images/ebook-mockup.png    ← 3D hardcover mockup, white cover, 
                                   "MICROPLASTICS ARE THREATENING HUMAN EXISTENCE" 
                                   with human silhouette made of plastic particles,
                                   "By LØWEXA" at bottom
    /images/grocery-mockup.png  ← 3D hardcover mockup, cream/white cover,
                                   "The Microplastic-Free Grocery Guide" in dark green serif,
                                   cotton mesh bag with vegetables on cover,
                                   green spine, "By LOWEXA · 2025" at bottom
  
  Display: Both mockup images should be shown at similar size, with subtle 
  drop shadow, on a clean white or light card background. No background removal
  needed — the mockups already have clean studio backgrounds.
  
  The mockups should be the visual HERO of this section. Big, prominent, 
  side-by-side on desktop, stacked on mobile. They sell the product visually.

Card 1 — The Ebook:
  Background: var(--color-bg-white)
  Border-radius: var(--border-radius-m)
  Padding: var(--space-l)
  
  Image: /images/ebook-mockup.png (3D book mockup — LARGE, prominent)
  Title: "The Microplastic-Free Life"
  Subtitle: "41-page evidence-based guide"
  Bullet points (with small green dots, not checkmarks):
    · 9 chapters backed by 30+ peer-reviewed studies
    · Where microplastics are found: blood, brain, lungs, placenta
    · The NEJM cardiovascular study (4.53× risk increase)
    · Room-by-room home detox protocol
    · Complete supplement & diet framework
    · STOP and START permanent lifestyle standards

Card 2 — The Grocery Guide:
  Same card style
  Image: /images/grocery-mockup.png (3D book mockup — LARGE, prominent)
  Title: "The Microplastic-Free Grocery Guide"
  Subtitle: "10-page practical shopping companion"
  Bullet points:
    · Aisle-by-aisle clean swap lists
    · Visual STOP → START product replacements
    · Label red flags: 7 ingredients to never buy
    · Cookware safety comparison chart
    · Baby & family priority swaps
    · Printable master shopping checklist
```

### 3.4 SECTION: Key Findings Preview
```
Purpose: Give a taste of the content. Build credibility through specifics.
Background: var(--color-bg-primary)
Padding: var(--space-2xl) vertical

Section label: "FROM THE RESEARCH" (pill)
Section heading: "What the science says."

Layout: 3 content blocks, stacked vertically, max-width: var(--max-width-narrow)
Each block:
  - Bold stat or finding as headline
  - 2-3 sentence explanation
  - Source citation in var(--fs-micro), var(--color-text-light)

Block 1:
  Headline: "Microplastics found in 100% of placenta samples tested."
  Body: "A 2021 study found plastic particles on both the maternal and fetal sides 
         of every placenta examined. Developing fetuses are exposed before birth."
  Source: "Ragusa et al. (2021). Environment International."

Block 2:
  Headline: "A single plastic tea bag releases 11.6 billion particles."
  Body: "Steeping a plastic mesh tea bag at 95°C for 5 minutes floods your cup 
         with billions of micro- and nanoplastic particles. Loose leaf in steel: zero."
  Source: "Hernandez et al. (2019). Environmental Science and Technology."

Block 3:
  Headline: "Men in the highest phthalate group had 30% lower testosterone."
  Body: "NHANES data from 2,208 men showed a direct dose-dependent relationship 
         between phthalate exposure from everyday plastic products and testosterone levels."
  Source: "Trasande et al. (2015). Environmental Health Perspectives."

After blocks: CTA button "Get the Bundle — €15"
```

### 3.5 SECTION: Who This Is For
```
Purpose: Let the visitor self-identify.
Background: var(--color-brand) (DARK section)
Border-radius: var(--border-radius-l) var(--border-radius-l) 0 0
Padding: var(--space-2xl) vertical

Heading (white): "This guide is for you if..."

Grid: 2x3 on desktop, stack on mobile
Each item: icon (simple SVG or emoji) + short text, white

Items:
  🔬 "You've seen the headlines about microplastics and want facts, not fear"
  🍼 "You're a parent and want to protect your family"
  🏋️ "You care about hormones, testosterone, or fertility"
  🧴 "You want to know which products are actually safe"
  🏠 "You want a room-by-room action plan for your home"
  🛒 "You want a printable grocery list to take shopping"
```

### 3.6 SECTION: Checkout / CTA
```
Purpose: Convert. This is where the money is.
Background: var(--color-bg-primary)
Padding: var(--space-3xl) vertical
ID: #get-bundle (nav CTA scrolls here)

Layout: Centered, max-width: 500px

Content:
  - Heading: "Get the complete bundle."
  - Price: "€15" (large) with optional strikethrough "€25" next to it
  - What's included (compact list):
    ✓ The Microplastic-Free Life (41-page ebook)
    ✓ The Microplastic-Free Grocery Guide (10-page printable)
    ✓ Instant PDF download
    ✓ Lifetime access

  - CTA Button (large, full-width on mobile):
    "Download Now — €15"
    onClick → redirect to Shopify checkout URL with UTM params
    
  - Below button: 
    "Secure checkout via Shopify · Instant delivery · PDF format"
    Small lock icon + text in var(--color-text-light)
  
  - Money-back guarantee badge (optional):
    "30-day money-back guarantee. No questions asked."
```

### 3.7 SECTION: Footer
```
Background: var(--color-brand)
Padding: var(--space-xl) vertical
Color: white / rgba(255,255,255,0.6) for muted

Content:
  - LØWEXA logo (white)
  - Tagline: "Science-based guidance for a plastic-free life."
  - Links: Privacy Policy | Terms | Contact
  - Disclaimer: "This guide is for educational purposes only and does not constitute 
    medical advice. © 2025 LØWEXA. All rights reserved."
```

---

## 4. SHOPIFY CHECKOUT INTEGRATION

### 4.1 Architecture
```
[LØWEXA site on Vercel] → click CTA → [Shopify Checkout] → [Digital delivery email]

The website is a HEADLESS storefront. It does NOT use Shopify's theme system.
The site is static HTML on Vercel. Shopify only handles checkout + payment + delivery.
```

### 4.2 Option A: Direct Checkout URL (Simplest — recommended to start)
```
No API needed. Just link directly to Shopify's cart URL.

URL format:
https://YOUR-STORE.myshopify.com/cart/VARIANT_ID:1

How to find VARIANT_ID:
1. Go to Shopify Admin → Products → your bundle product
2. Click the product → scroll to Variants
3. The variant ID is in the URL when you click on it, 
   or use: Admin API → GET /products/{id}/variants

Example:
https://lowexa-store.myshopify.com/cart/43210987654321:1
```

```javascript
// script.js — Checkout handler

const CONFIG = {
  // ⚠️ REPLACE THESE WITH YOUR ACTUAL VALUES
  shopifyDomain: 'your-store.myshopify.com',
  variantId: '43210987654321',  // Your bundle product variant ID
  utmSource: 'lowexa-website',
  utmMedium: 'landing-page',
  utmCampaign: 'bundle-v1'
};

function goToCheckout() {
  const url = `https://${CONFIG.shopifyDomain}/cart/${CONFIG.variantId}:1`
    + `?utm_source=${CONFIG.utmSource}`
    + `&utm_medium=${CONFIG.utmMedium}`
    + `&utm_campaign=${CONFIG.utmCampaign}`;
  window.location.href = url;
}

// Attach to all CTA buttons
document.querySelectorAll('[data-checkout]').forEach(btn => {
  btn.addEventListener('click', goToCheckout);
});
```

```html
<!-- In index.html — every CTA button uses data-checkout attribute -->
<button data-checkout class="btn-primary">Download Now — €15</button>
```

### 4.3 Option B: Shopify Storefront API (Advanced — for custom cart)
```
Use this if you want to build a cart experience on your site,
or if you want to create checkout sessions programmatically.

1. In Shopify Admin → Settings → Apps → Develop apps
2. Create a new app → configure Storefront API scopes:
   - unauthenticated_read_product_listings
   - unauthenticated_write_checkouts
   - unauthenticated_read_checkouts
3. Get your Storefront Access Token (public, safe for frontend)
```

```javascript
// Storefront API — Create checkout and redirect

const STOREFRONT_TOKEN = 'your-storefront-access-token'; // public token, safe in frontend
const SHOP_DOMAIN = 'your-store.myshopify.com';

async function createCheckout() {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{
          variantId: "gid://shopify/ProductVariant/YOUR_VARIANT_ID",
          quantity: 1
        }]
      }) {
        checkout {
          webUrl
        }
        checkoutUserErrors {
          message
        }
      }
    }
  `;

  const response = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  const checkoutUrl = data.data.checkoutCreate.checkout.webUrl;
  
  // Append UTM params and redirect
  const separator = checkoutUrl.includes('?') ? '&' : '?';
  window.location.href = checkoutUrl 
    + separator 
    + 'utm_source=lowexa-website&utm_medium=landing-page&utm_campaign=bundle-v1';
}
```

### 4.4 Digital Delivery Setup
```
In Shopify:
1. Install "Digital Downloads" app (free, by Shopify) 
   OR "Sky Pilot" OR "SendOwl"
2. Upload both PDFs to the product:
   - Lowexa_The_Microplastic_Free_Life_Redesigned.pdf
   - Lowexa_Microplastic_Free_Grocery_Guide.pdf
3. After purchase → customer gets automatic email with download links
4. Set download limit (e.g., 5 downloads) and expiry (e.g., 30 days)
```

### 4.5 UTM Tracking for Multiple Sites
```
If you run multiple Vercel sites pointing to the same Shopify checkout:

Site 1 (lowexa.com):
  utm_source=lowexa-website

Site 2 (andere niche site):  
  utm_source=site2-name

Then in Shopify Analytics → Marketing → you see conversions per source.
Also set up Google Analytics 4 on each site separately for visitor data.
```

---

## 5. TECHNICAL REQUIREMENTS

### 5.1 Performance
- Lighthouse score target: 95+ on all metrics
- No JS frameworks — vanilla HTML/CSS/JS only
- Images: WebP format, lazy-loaded, srcset for responsive
- CSS: single file, no external frameworks (no Bootstrap, no Tailwind CDN)
- JS: single file, <5KB, no dependencies
- Total page weight target: <500KB (excluding images)

### 5.2 SEO
```html
<title>LØWEXA · The Microplastic-Free Life Bundle</title>
<meta name="description" content="41-page evidence-based guide backed by 30+ 
peer-reviewed studies. Learn what microplastics are doing inside your body and 
exactly how to reduce exposure. Includes printable grocery guide.">
<meta property="og:title" content="LØWEXA · The Microplastic-Free Life Bundle">
<meta property="og:description" content="5 grams of plastic per week. That's what 
you're consuming. This guide changes that.">
<meta property="og:image" content="/images/og-image.png"> <!-- 1200x630 -->
<meta property="og:type" content="website">
<link rel="canonical" href="https://lowexa.com">
```

### 5.3 Responsive Breakpoints
```css
/* Mobile first */
/* Tablet: min-width: 768px */
/* Desktop: min-width: 1024px */
/* Wide: min-width: 1440px */
```

### 5.4 Accessibility
- All images have alt text
- Buttons have aria-labels
- Color contrast ratio: minimum 4.5:1 for body text
- Keyboard navigable
- Semantic HTML (header, main, section, footer)
- Focus-visible styles on interactive elements

### 5.5 Analytics
```html
<!-- Add Google Analytics 4 or Plausible -->
<!-- Track: page views, scroll depth, CTA clicks, outbound checkout clicks -->
```

---

## 6. FILE STRUCTURE (for Vercel deployment)

```
lowexa-website/
├── index.html              ← Single page, all content
├── styles.css              ← All styles, CSS custom properties
├── script.js               ← Scroll animations, checkout handler, nav behavior
├── images/
│   ├── og-image.png        ← Open Graph image (1200x630) for social sharing
│   ├── ebook-mockup.png    ← 3D hardcover book mockup of the ebook
│   │                          (white cover, microplastic human silhouette,
│   │                          "MICROPLASTICS ARE THREATENING HUMAN EXISTENCE",
│   │                          "By LØWEXA")
│   ├── grocery-mockup.png  ← 3D hardcover book mockup of the grocery guide
│   │                          (cream cover, cotton mesh bag with vegetables,
│   │                          dark green text, green spine,
│   │                          "The Microplastic-Free Grocery Guide")
│   └── favicon.png         ← Site favicon
├── vercel.json             ← Vercel config
└── README.md
```

IMPORTANT FOR DEVELOPER:
- The two mockup images (ebook-mockup.png, grocery-mockup.png) are the 
  PRIMARY visual assets of the site. They should be displayed prominently
  in the "What's Inside" section and optionally in the hero section.
- Both images show 3D physical hardcover book renders on clean backgrounds.
  They should be displayed as-is — no background removal, no cropping.
  The clean studio background is part of the premium feel.
- Optimize images: convert to WebP, serve responsive sizes with srcset.
- Both mockup images should appear at EQUAL visual weight — same size,
  same card treatment, side-by-side on desktop.

### vercel.json
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## 7. COPY REFERENCE

All copy is derived from the ebook content. Key selling points to use throughout:

### Headlines to use/rotate:
- "There are microplastics inside your body right now."
- "5 grams of plastic. Every week. Inside you."
- "The evidence crossed a threshold."
- "77% of adults tested have plastic in their blood."
- "What if the biggest threat to your health is invisible?"

### Credibility anchors (use throughout):
- "Backed by 30+ peer-reviewed studies"
- "Sources include the New England Journal of Medicine, Nature Medicine, and Environment International"
- "41 pages of evidence-based guidance"
- "Every claim referenced to original research"

### Urgency/scarcity (subtle, not pushy):
- "Exposure is cumulative. Every day you wait adds to your body's burden."
- "The earlier you act, the lower your lifetime accumulation."

---

## 8. WHAT NOT TO DO

- ❌ No pop-ups, no email capture modals, no exit-intent overlays
- ❌ No countdown timers or fake scarcity
- ❌ No testimonial carousels (you don't have them yet)
- ❌ No stock photos of random people
- ❌ No "BUY NOW" in all caps
- ❌ No background music or auto-playing video
- ❌ No chatbots
- ❌ No multi-page navigation — everything on one page
- ❌ No heavy JS libraries (React, jQuery, GSAP, etc.)

---

## 9. LAUNCH CHECKLIST

- [ ] Domain configured (lowexa.com or similar)
- [ ] Vercel project linked to Git repo
- [ ] Shopify product created with digital download app
- [ ] Checkout URL tested (UTMs working)
- [ ] OG image uploaded and tested (use opengraph.xyz)
- [ ] Favicon set
- [ ] Mobile tested on real device (not just DevTools)
- [ ] Lighthouse audit: 95+ scores
- [ ] Analytics installed and tracking
- [ ] Legal pages: Privacy Policy, Terms (can be minimal for digital products)

---

END OF PRD
