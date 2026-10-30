# BREAK FORD — website prototype

Responsive storefront prototype built to the BREAK FORD brand brief:
deep black and charcoal surfaces, champagne gold for highlights and calls to action,
white typography, the official logo, minimal borders and restrained motion.

## Run
Open `index.html` in a browser, or serve the folder locally:

    npx serve .        # or
    python3 -m http.server

## Files
- `index.html`: intro, header, mobile menu, footer, cart drawer
- `css/style.css`: brand tokens (colours, fonts) in `:root`, layout, intro timeline, responsive rules
- `js/app.js`: catalogue, routing, navigation, filters, product page, enquiry form, cart
- `assets/logo-2x.webp`: official logo on a transparent background (from `logo-original.png`, proportions unchanged)
- `assets/favicon.png`: browser tab icon, cropped from the logo's emblem

## Brand
- Tagline: BREAK BARRIERS. CROSS BOUNDARIES.
- Principles: Precision, Purpose, Progress.
- Colours: black `#0a0a0a`, charcoal `#131313`, white `#f4f3ef`, champagne gold `#cbb27c`.
- Font: Archivo (Google Fonts), wide cut for headings to sit with the logo lettering.

## Categories
Cues, Cases & Bags, Tables, Accessories. Chalk sits inside Accessories.
Edit `CATS` in `js/app.js` to change sub-categories.

## Photos and opening film
All imagery is free-licence placeholder material, to be replaced with BREAK FORD's own photography:
- **Product and category photos** (Unsplash): representative photos per sub-category, set in `SUBIMG` and `CATIMG`
  in `js/app.js`. To use a real product photo, give the product an `img` path, e.g. `img:'assets/products/obsidian.jpg'`.
  Product pages label these "Representative image" until real photos are added.
- **Homepage photos** (Unsplash): hero, photo band and About section, set in `PHOTO` in `js/app.js`.
- **Opening film** (Pexels): a player breaking the rack, set in `INTRO_VIDEO` in `js/app.js`
  (`start`, `brand` and `end` are times in the clip). If the video cannot load, a logo-only opening plays instead.

Photos and the film load from the internet; offline, those areas fall back to plain charcoal.

## Navigation
Pages use addresses such as `#/c/cues`, `#/c/cues/Snooker%20Cues` and `#/p/p12`,
so Back and Forward work and any page can be linked to directly.

## Still to connect
- Enquiry form: shows a confirmation but is not connected to an inbox yet.
- Checkout: prototype only, no payment is taken.
- Product names, prices and stock are sample data.
