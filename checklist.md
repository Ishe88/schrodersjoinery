# SEO Migration Master Checklist: Schröder's Joinery

This document is a step-by-step master checklist and migration report for deploying the new static HTML, CSS, and JS website for **Schröder's Joinery** to **Afrihost**, replacing the legacy WordPress site.

---

## 1. Migration Mapping Report

| Legacy WordPress URL | Old SEO Title (Yoast) | Old Meta Description (Yoast) | Recommended Static Path | Recommended SEO Title | Recommended Meta Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | `Hand-Crafted Projects \| Custom Made \| Schroders Joinery` | `Discover our premium hand-crafted projects. Our custom woodwork and joinery solutions is delivered with exceptional craftsmanship` | `/` | `Hand-Crafted Projects \| Custom Made \| Schröder's Joinery` | `Discover our premium hand-crafted projects. Our custom woodwork and joinery solutions are delivered with exceptional craftsmanship in Johannesburg.` |
| `/services/` | `Designs and Manufacturing \| Services \| Schroders Joinery` | `We offer expert designs and manufacturing services for all your woodwork projects, offering high-quality craftsmanship` | `/services.html` | `Designs and Manufacturing \| Services \| Schröder's Joinery` | `We offer expert designs and manufacturing services for all your custom woodwork projects, offering high-quality craftsmanship in Johannesburg.` |
| `/materials/` | `Durable Hardwood \| Furniture \| Schroders Joinery` | `Explore our wide range of durable hardwood materials. The premium selection ensures long-lasting quality for all custom woodwork projects` | `/services.html#materialsSection` | N/A (Merged) | N/A (Merged - Redirect to Services Materials Section) |
| `/our-story/` | `Woodworking \| Handcrafted \| Schroders Joinery` | `Learn about our rich woodworking heritage. The journey, passion, and dedication to our crafting brings exceptional quality` | `/#storySection` | N/A (Merged) | N/A (Merged - Redirect to Homepage Story Section) |
| `/portfolio/` | `Custom Wood Furniture \| Skilled Craftsmanship \| Schroders Joinery` | `Our portfolio of custom wood furniture has expertly crafted bespoke pieces that blend functionality with aesthetic appeal` | `/portfolio.html` | `Custom Wood Furniture \| Skilled Craftsmanship \| Schröder's Joinery` | `Explore Schröder's Joinery's portfolio of bespoke kitchens, custom cabinetry, handcrafted furniture, bathrooms, interiors, and office joinery in Johannesburg.` |
| `/kitchens/` | `Kitchen Designs \| Custom-Built \| Schroders Joinery` | `Our kitchen designs blend functionality and style, featuring custom cabinets and handcrafted details for all your needs` | `/portfolio.html#kitchens` | N/A (Consolidated) | N/A (Consolidated - Hash Redirect to Kitchens Tab) |
| `/bedrooms/` | `Designer Bedroom \| Unique Interiors \| Schroders Joinery` | `Transform your space with our designer bedroom solutions. our custom, handcrafted bedroom furniture, combines luxury and functionality` | `/portfolio.html#cabinetry` | N/A (Consolidated) | N/A (Consolidated - Hash Redirect to Cabinetry Tab) |
| `/bespoke-furniture/` | `Handmade Furniture \| High-End Woodwork \| Schroders Joinery` | `Discover our exquisite handmade furniture. Crafted with precision and care, offering unique designs and quality` | `/portfolio.html#furniture` | N/A (Consolidated) | N/A (Consolidated - Hash Redirect to Furniture Tab) |
| `/bathrooms/` | `Custom Bathroom \| Custom Vanity Units \| Schroders Joinery` | `Transform your space with our custom bathroom solutions. Discover bespoke cabinetry, vanities, and woodwork made for your every need` | `/portfolio.html#bathrooms` | N/A (Consolidated) | N/A (Consolidated - Hash Redirect to Bathrooms Tab) |
| `/interiors/` | `Custom Interiors \| Wood Paneling \| Schroders Joinery` | `Transform your space with our custom interiors. Our interior woodwork solutions offer exceptional craftsmanship and tailored designs` | `/portfolio.html#interiors` | N/A (Consolidated) | N/A (Consolidated - Hash Redirect to Interiors Tab) |
| `/offices/` | `Woodwork Office \| Office Furniture \| Schroders Joinery` | `We specialize in crafting office furniture, custom cabinetry, and tailored woodwork designs to enhance your workspace` | `/portfolio.html#offices` | N/A (Consolidated) | N/A (Consolidated - Hash Redirect to Offices Tab) |
| `/contact-us/` | `Custom Woodwork Contact \| Schroders Joinery` | `Get in touch with us for all your custom woodwork needs. Contact us for inquiries, quotes, and consultations on projects` | `/contact.html` | `Contact Schröder's Joinery \| Custom Woodwork & Kitchens` | `Get in touch with us for all your custom woodwork needs. Contact our Honeydew, Johannesburg workshop for quotes, inquiries, and consultations.` |
| `/privacy-policy/` | `Privacy Policy \| Hand-Crafted \| Schroders Joinery` | `In our Privacy Policy, we outline that when visitors leave comments on the site, we collect the data provided in the comments form` | `/privacy-policy.html` | `Privacy Policy \| Schröder's Joinery \| Johannesburg` | `Schröder's Joinery's Privacy Policy. Learn how we safeguard your personal information in compliance with South Africa's POPI Act (POPIA).` |

---

## 2. Server-Side 301 Redirect Rules (Afrihost cPanel / Apache)

Afrihost uses Apache web servers. Create a file named **`.htaccess`** in the root directory of your website (`public_html/` or workspace root) and paste the following configuration. 

> [!IMPORTANT]
> The `NE` (No Escape) flag is critical for the redirect rules below. It ensures Apache does not convert the `#` (hash) character into `%23`, allowing browser JS to auto-switch tabs on page load.

```apache
# ----------------------------------------------------------------------
# Schröder's Joinery - Apache Rewrite & Redirect Rules
# ----------------------------------------------------------------------
RewriteEngine On
RewriteBase /

# 1. Force Canonical Domain (redirect non-www to www)
RewriteCond %{HTTP_HOST} ^schrodersjoinery\.co\.za [NC]
RewriteRule ^(.*)$ https://www.schrodersjoinery.co.za/$1 [R=301,L]

# 2. Redirect index.html requests to root / (keeps URL bar clean)
RewriteCond %{THE_REQUEST} ^[A-Z]{3,9}\ /index\.html\ HTTP/
RewriteRule ^index\.html$ https://www.schrodersjoinery.co.za/ [R=301,L]

# 3. Mappings for Consolidated WordPress Pages to Tab Anchors (R=301,NE,L)
RewriteRule ^kitchens/?$ https://www.schrodersjoinery.co.za/portfolio.html#kitchens [R=301,NE,L]
RewriteRule ^bedrooms/?$ https://www.schrodersjoinery.co.za/portfolio.html#cabinetry [R=301,NE,L]
RewriteRule ^bespoke-furniture/?$ https://www.schrodersjoinery.co.za/portfolio.html#furniture [R=301,NE,L]
RewriteRule ^bathrooms/?$ https://www.schrodersjoinery.co.za/portfolio.html#bathrooms [R=301,NE,L]
RewriteRule ^interiors/?$ https://www.schrodersjoinery.co.za/portfolio.html#interiors [R=301,NE,L]
RewriteRule ^offices/?$ https://www.schrodersjoinery.co.za/portfolio.html#offices [R=301,NE,L]

# 4. Redirects for Core WordPress Pages to Static HTML Pages
RewriteRule ^services/?$ https://www.schrodersjoinery.co.za/services.html [R=301,L]
RewriteRule ^contact-us/?$ https://www.schrodersjoinery.co.za/contact.html [R=301,L]
RewriteRule ^portfolio/?$ https://www.schrodersjoinery.co.za/portfolio.html [R=301,L]
RewriteRule ^privacy-policy/?$ https://www.schrodersjoinery.co.za/privacy-policy.html [R=301,L]

# 5. Redirects for WordPress Sections Merged to Homepage sections
RewriteRule ^our-story/?$ https://www.schrodersjoinery.co.za/#storySection [R=301,NE,L]
RewriteRule ^materials/?$ https://www.schrodersjoinery.co.za/services.html#materialsSection [R=301,NE,L]

# 6. Redirect old WordPress Sitemap Indexes to Static Sitemap
Redirect 301 /sitemap_index.xml /sitemap.xml
Redirect 301 /page-sitemap.xml /sitemap.xml
Redirect 301 /post-sitemap.xml /sitemap.xml
```

---

## 3. Internal Code Adjustment: index.html Reference Cleaning

To completely satisfy the requirement of not displaying `index.html` in the URL bar, update all references inside your HTML files (navigation menus, footer links, sticky logo links) from `index.html` to `/`.

### Change Locations:
1. **Logo Link** (Sticky Logo & Header Logo):
   * Old: `<a class="sticky-logo-btn" id="stickyLogo" href="index.html"...>`
   * New: `<a class="sticky-logo-btn" id="stickyLogo" href="/"...>`
2. **Navigation Drawer Links**:
   * Old: `<a class="hero-mobile-link" href="index.html#svcSection">...`
   * New: `<a class="hero-mobile-link" href="/#svcSection">...`
3. **Mini Footer Links**:
   * Old: `<a href="index.html">Home</a>`
   * New: `<a href="/">Home</a>`

---

## 4. Technical SEO Files

Create these files directly in the root folder of your website.

### robots.txt
Create a file named **`robots.txt`**:
```text
User-agent: *
Disallow:

Sitemap: https://www.schrodersjoinery.co.za/sitemap.xml
```

### sitemap.xml
Create a file named **`sitemap.xml`**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.schrodersjoinery.co.za/</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.schrodersjoinery.co.za/services.html</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.schrodersjoinery.co.za/portfolio.html</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.schrodersjoinery.co.za/contact.html</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.schrodersjoinery.co.za/privacy-policy.html</loc>
    <lastmod>2026-06-11</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

---

## 5. Ready-To-Use SEO Head Sections

Replace the `<head>` sections in your static files with these fully optimized fragments.

### A. Homepage (`index.html`) SEO Head Section
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- //Primary SEO// -->
    <title>Hand-Crafted Projects | Custom Made | Schröder's Joinery</title>
    <meta name="description" content="Discover our premium hand-crafted projects. Our custom woodwork and joinery solutions are delivered with exceptional craftsmanship in Johannesburg. Est. 2005.">
    <meta name="keywords" content="custom joinery Johannesburg, bespoke kitchens Johannesburg, custom cabinetry, handcrafted furniture South Africa, bathroom joinery, office joinery, Schröder's Joinery, bespoke woodwork">
    <meta name="author" content="Schröder's Joinery">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="https://www.schrodersjoinery.co.za/">

    <!-- //Open Graph (Social Cards)// -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Hand-Crafted Projects | Custom Made | Schröder's Joinery">
    <meta property="og:description" content="Discover our premium hand-crafted woodwork projects. Standard of craft: custom kitchens, cabinetry, and furniture in Johannesburg.">
    <meta property="og:url" content="https://www.schrodersjoinery.co.za/">
    <meta property="og:site_name" content="Schröder's Joinery">
    <meta property="og:locale" content="en_ZA">
    <meta property="og:image" content="https://www.schrodersjoinery.co.za/portfolio-kitchens.jpg">

    <!-- //Twitter Card// -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Hand-Crafted Projects | Schröder's Joinery">
    <meta name="twitter:description" content="Bespoke kitchens, cabinetry, furniture, bathrooms, interiors and offices — crafted with intent in Johannesburg.">
    <meta name="twitter:image" content="https://www.schrodersjoinery.co.za/portfolio-kitchens.jpg">

    <!-- //Schema.org Structured Data// -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Schröder's Joinery",
        "description": "Owner-operated custom joinery: kitchens, cabinetry, furniture, bathrooms, interiors and offices handcrafted in Johannesburg.",
        "url": "https://www.schrodersjoinery.co.za",
        "telephone": "+27117944136",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "5-Star Business Park, Juice Street",
            "addressLocality": "Honeydew, Roodepoort",
            "postalCode": "2169",
            "addressRegion": "Gauteng",
            "addressCountry": "ZA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -26.0734,
            "longitude": 27.9216
        },
        "sameAs": [
            "https://www.facebook.com/schrodersjoinery/",
            "https://www.instagram.com/schroders_joinery/",
            "https://za.linkedin.com/company/schr%C3%B6ders-joinery"
        ],
        "image": "https://www.schrodersjoinery.co.za/portfolio-kitchens.jpg"
    }
    </script>

    <!-- //Fonts// -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Jost:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/home.css">
</head>
```

### B. Service Page (`services.html`) SEO Head Section
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- //Primary SEO// -->
    <title>Designs and Manufacturing | Services | Schröder's Joinery</title>
    <meta name="description" content="We offer expert designs, manufacturing, and installation services for all your woodwork projects, offering high-quality craftsmanship in Johannesburg.">
    <meta name="keywords" content="joinery design services, custom woodwork installation, woodwork 3D rendering Johannesburg, bespoke wood manufacturing, Schröder's Joinery">
    <meta name="author" content="Schröder's Joinery">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="https://www.schrodersjoinery.co.za/services.html">

    <!-- //Open Graph (Social Cards)// -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Designs and Manufacturing | Services | Schröder's Joinery">
    <meta property="og:description" content="We offer expert designs, manufacturing, and installation services for all your woodwork projects. Quality craftsmanship.">
    <meta property="og:url" content="https://www.schrodersjoinery.co.za/services.html">
    <meta property="og:site_name" content="Schröder's Joinery">
    <meta property="og:locale" content="en_ZA">
    <meta property="og:image" content="https://www.schrodersjoinery.co.za/portfolio-furniture.jpg">

    <!-- //Twitter Card// -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Joinery Services | Schröder's Joinery">
    <meta name="twitter:description" content="Design, manufacture and installation. Full CAD drawings and 3D visual renders in Johannesburg.">
    <meta name="twitter:image" content="https://www.schrodersjoinery.co.za/portfolio-furniture.jpg">

    <!-- //Fonts// -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Jost:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/services.css">
</head>
```

### C. Portfolio Page (`portfolio.html`) SEO Head Section
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- //Primary SEO// -->
    <title>Custom Wood Furniture | Skilled Craftsmanship | Schröder's Joinery</title>
    <meta name="description" content="Our portfolio of custom wood furniture features expertly crafted bespoke pieces that blend functionality with aesthetic appeal. Hand-built in Johannesburg.">
    <meta name="keywords" content="custom joinery portfolio, custom kitchen portfolio Johannesburg, bespoke cabinetry showcase, handcrafted furniture South Africa, Schröder's Joinery">
    <meta name="author" content="Schröder's Joinery">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="https://www.schrodersjoinery.co.za/portfolio.html">

    <!-- //Open Graph (Social Cards)// -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Custom Wood Furniture | Skilled Craftsmanship | Schröder's Joinery">
    <meta property="og:description" content="Our portfolio of custom wood furniture features expertly crafted bespoke pieces that blend functionality with aesthetic appeal.">
    <meta property="og:url" content="https://www.schrodersjoinery.co.za/portfolio.html">
    <meta property="og:site_name" content="Schröder's Joinery">
    <meta property="og:locale" content="en_ZA">
    <meta property="og:image" content="https://www.schrodersjoinery.co.za/portfolio-kitchens.jpg">

    <!-- //Twitter Card// -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Bespoke Portfolio | Schröder's Joinery">
    <meta name="twitter:description" content="Browse custom kitchens, bedrooms, furniture, bathrooms, interiors and offices handcrafted in Johannesburg.">
    <meta name="twitter:image" content="https://www.schrodersjoinery.co.za/portfolio-kitchens.jpg">

    <!-- //Fonts// -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Jost:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/portfolio.css">
</head>
```

### D. Contact Page (`contact.html`) SEO Head Section
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- //Primary SEO// -->
    <title>Contact Schröder's Joinery | Bespoke Custom Woodwork & Kitchens</title>
    <meta name="description" content="Get in touch with Schröder's Joinery. Contact our Honeydew, Johannesburg workshop for custom kitchens, bespoke cabinetry, fitted office workspaces, luxury bathrooms, and architectural woodwork.">
    <meta name="keywords" content="contact joinery Johannesburg, custom cabinets Midrand, bespoke furniture Kyalami, fitted kitchens Honeydew, Schroder's Joinery">
    <meta name="author" content="Schröder's Joinery">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="https://www.schrodersjoinery.co.za/contact.html">

    <!-- //Open Graph (Social Cards)// -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Contact Schröder's Joinery | Bespoke Woodwork">
    <meta property="og:description" content="Discuss your spatial concepts or architectural plans with our master craftsmen. Contact our Johannesburg workshop directly.">
    <meta property="og:url" content="https://www.schrodersjoinery.co.za/contact.html">
    <meta property="og:site_name" content="Schröder's Joinery">
    <meta property="og:locale" content="en_ZA">
    <meta property="og:image" content="https://www.schrodersjoinery.co.za/portfolio-furniture.jpg">

    <!-- //Twitter Card// -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Contact Schröder's Joinery | Bespoke Custom Woodwork">
    <meta name="twitter:description" content="Get in touch with us for all your custom woodwork needs. Custom kitchens, cabinetry, and furniture.">
    <meta name="twitter:image" content="https://www.schrodersjoinery.co.za/portfolio-furniture.jpg">

    <!-- //Fonts// -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Jost:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/contact.css">
</head>
```

---

## 6. Technical SEO Audit & Weaknesses Identified

During our crawl and analysis of the existing WordPress website, the following SEO weaknesses and code issues were identified:

1. **Consolidated Portfolio Architecture Ranking Risk:**
   On the live site, separate URLs ranked for specific searches (e.g. `schrodersjoinery.co.za/kitchens/`). On the new site, these subpages are integrated into tabs in `/portfolio.html`. Since the tab contents are dynamically loaded via `js/portfolio.js` into empty markup containers on load, **search engine crawlers cannot crawl or index the individual project images or texts.**
   * *Mitigation:* While server-side 301 redirects to `/portfolio.html#kitchens` are clean, search engines do not index different page contents based on hash anchors. If maintaining rankings for "Kitchens" or "Offices" separately is critical, you should eventually compile separate, static HTML pages (`kitchens.html`, `offices.html`, etc.) rather than purely using dynamic tab triggers.

2. **Missing Image Alt Attributes:**
   Several images on the live site lacked descriptive alt text, which weakens image SEO search equity. Key examples from the home sitemap include:
   * `/wp-content/uploads/2020/05/New-Logo.png` (Missing Alt)
   * `/wp-content/uploads/2020/05/Home-pg.-portfolio-bespoke-furniture-option-3-e1589790913950.png` (Missing Alt)
   * `/wp-content/uploads/2020/05/IMG_7355-scaled-e1589795644381.jpg` (Missing Alt)
   * *Recommendation:* On the new static website, ensure that all gallery images inside `/portfolio/` and brand icons have descriptive alt tags (e.g., `alt="Contemporary Mahogany Kitchen with Brass Handles - Schröder's Joinery"`).

3. **Schema.org Graph bloat:**
   The live WordPress site had fragmented structured data generated by Yoast SEO. We have simplified this into a clean, unified **`LocalBusiness`** schema on the homepage and contact page.

4. **Missing Privacy Policy Page:**
   The live site index contains `/privacy-policy/` for legal disclosures, but the new codebase was missing it. We have generated a custom POPIA-compliant `privacy-policy.html` to resolve this.

---

## 7. Migration Verification Steps

To ensure the deployment has zero indexation errors:
1. **Redirect Testing:** Visit `https://www.schrodersjoinery.co.za/kitchens/` after deployment. Ensure it redirects cleanly to `https://www.schrodersjoinery.co.za/portfolio.html#kitchens` and displays the kitchens tab.
2. **index.html Redirect Check:** Go directly to `https://www.schrodersjoinery.co.za/index.html`. Ensure it redirects to the root `/` and clean URL is displayed in the browser bar.
3. **Sitemap Submission:** Go to Google Search Console (GSC) and submit the new static `https://www.schrodersjoinery.co.za/sitemap.xml`.
