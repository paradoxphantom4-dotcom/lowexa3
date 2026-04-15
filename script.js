/* ═══════════════════════════════════════════════════
   LØWEXA — script.js
   PRD v1.0 · April 2026
═══════════════════════════════════════════════════ */

// ── SHOPIFY CHECKOUT CONFIG ──────────────────────────────────────────────────
// ⚠️  Replace these placeholder values with your real Shopify details before launch.
const CONFIG = {
  shopifyDomain: 'footyarchive.myshopify.com',
  variantId:     '63850645094749',
  utmSource:     'lowexa-website',
  utmMedium:     'landing-page',
  utmCampaign:   'bundle-v1'
};

// ── CHECKOUT HANDLER ─────────────────────────────────────────────────────────
function goToCheckout() {
  const url =
    `https://${CONFIG.shopifyDomain}/cart/${CONFIG.variantId}:1` +
    `?utm_source=${CONFIG.utmSource}` +
    `&utm_medium=${CONFIG.utmMedium}` +
    `&utm_campaign=${CONFIG.utmCampaign}`;
  window.location.href = url;
}

document.querySelectorAll('[data-checkout]').forEach(btn => {
  btn.addEventListener('click', goToCheckout);
});

// ── SCROLL-TRIGGERED FADE-UP ANIMATIONS ─────────────────────────────────────
const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// ── NAV SHADOW ON SCROLL ─────────────────────────────────────────────────────
const siteNav = document.querySelector('.site-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    siteNav.style.boxShadow = '0 1px 20px rgba(26, 77, 62, 0.08)';
  } else {
    siteNav.style.boxShadow = 'none';
  }
}, { passive: true });
