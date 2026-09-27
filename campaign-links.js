// Preserve only non-personal, operator-defined campaign labels. No cookies, IDs or pixels.
(() => {
  const incoming = new URLSearchParams(window.location.search);
  const campaign = new URLSearchParams();
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = incoming.get(key);
    if (value && /^[a-zA-Z0-9_-]{1,80}$/.test(value)) campaign.set(key, value);
  }
  if (!campaign.size) return;
  document.querySelectorAll('[data-store="google"]').forEach(link => {
    const url = new URL(link.href);
    url.searchParams.set('referrer', campaign.toString());
    link.href = url.toString();
  });
  // Apple campaign links need the real provider token from App Store Connect.
  // Leave Apple's canonical URL intact until that token is configured and verified.
})();
