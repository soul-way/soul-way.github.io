# Soul Way — Website Structure and Design Specification

## Purpose

The website presents a distinct spiritual worldview about free will, afterlife imagery, encounters with spiritual guides, contracts, judgment, reincarnation, and a direct relationship with God. The materials are intended for interested readers, with explanatory pages, a declaration, a FAQ, a video library, and links to source creators. Spiritual assertions are presented as the site's viewpoint; the site's interpretations are not established scientific facts.

## Technology

The GitHub Pages edition is a purely static build: HTML5, CSS3, JavaScript and Bootstrap 5.3.8. No PHP, backend, databases, or rewrite directives are needed. The root directs visitors to English. Language pages are stored under their own directories. Deploys via GitHub Actions, supported by `scripts/prepare_pages.py`.

## Language policy

English (default), Spanish, Russian, French, German, Italian, Portuguese, Hindi, Japanese, Bengali, Indonesian, Chinese, Arabic. Keep routes and navigation consistent across all thirteen versions. Arabic pages use right-to-left text direction. Do not use Russian for administrative or deployment instructions; Russian appears only as a normal site translation.

## Visual system

- Dark navy to black cosmic backgrounds with radiant gold, cream and midnight blue accents.
- Cinematic fantasy artwork: portals, celestial halls, aged council members, supernatural figures, galaxies, and detailed architectural environments.
- Expressive gold foil buttons, illuminated frame borders and typography emphasizing article titles.
- A distinctive image on each main page and, where applicable, a separate article/detail illustration.
- Video Library (`stories_read.html`) uses its special layout: left-side topic menu, grid of video cards, gold accents and a right sidebar. The remaining pages retain the original unified design.
- The complete illustration library lives under `assets/img/` and is part of the website build.

## Sitemap and navigation

Every language contains 53 HTML files: 24 main or overview pages, 23 matching article pages (`*_read.html`), and six localized video-transcript summaries (`transcript_*.html`). This yields 742 localized HTML files. Overview pages provide large hero artwork, concise descriptions and topical navigation. Detail pages offer full articles and contextual links. Header navigation, language dropdown and footer links are available across the site.

The site's core themes include:

1. Home / overview
2. Tunnel and light
3. Who meets the soul
4. False judgment
5. Soul contracts
6. Reptilians and archons
7. False spiritual guides
8. Memory and life review
9. Return to Earth
10. Direct path to God
11. Free will
12. Afterlife journey
13. Comparison of accounts
14. Declaration of the Soul
15. Sources
16. Consent and coercion
17. Responsibility
18. Statement of objection
19. Earth / prison planet
20. Questions and answers
21. Story Library / Video Library
22. 2027–2030 forecasts
23. The council after death
24. About the website

## Media and video library

The updated video library contains 14 linked recordings. Six have original-language transcript sources and separate localized editorial-summary pages. Video links appear as individually labeled cards with descriptive context, thumbnails and direct links to external videos. Video thumbnails are part of the visual layout and may be illustrative artwork rather than official YouTube thumbnails. External videos belong to their respective creators.

## Responsive behavior

Desktop: full-width hero, multi-column card grids, visible navigation where space permits. Tablet: fewer card columns and adaptive spacing. Mobile: collapsible menu, single-column card stacks, readable text sizes, no horizontal scrolling. Images should preserve their aspect ratio and never push content wider than the viewport.

## Search engine metadata

Per-page title, meta description, canonical, language alternates/hreflang, Open Graph and Twitter metadata, JSON-LD structured content, XML sitemap and robots.txt. The deployment script resolves the actual root host from the GitHub repository metadata, and uses explicit static `.html` paths for all internal URLs.

## Screenshots and acceptance

The release includes JPG screenshots of all 742 localized HTML files, organized as `Screenshots/<language>/<page>.jpg`. Screenshots are rendered with Chromium using real HTML/CSS assets embedded into the rendering session. All pages should render without blank image placeholders, and the site must be loadable on GitHub Pages without any server-side runtime.

## Maintenance

Edit HTML directly inside the relevant language directory, then update translations of the same page in all other language folders. Edit visual assets in `assets/img/`, then commit and push. Never edit the generated `_site` directory; GitHub Actions creates it on deployment.

## Additional language editorial status

Portuguese, Hindi, Japanese, Bengali, and Indonesian currently include localized navigation, topic summaries, declarations, and video-summary articles. These are editorial drafts, not professionally reviewed full translations of the original longer articles. Review by native speakers is strongly recommended before public promotion.

## Latest release
- Fourteen languages, with Ukrainian immediately after German.
- Footer About link points to the complete About article.
- Language selector receives click priority over other navigation.
- Video positions preserved (Sai Baba: fourth; Is There Life After Death?: thirteenth; Yuri Nikulin: last).
- All domains use root-absolute internal links (not parent-directory paths).
