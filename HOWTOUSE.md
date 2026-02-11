# Template 1: The Blueprint (Technical Services)
**Version:** 2.0 (Premium Lightbox Edition)

## 📌 Overview
"The Blueprint" is a high-precision, technical-themed website template designed for engineering, construction, and specialized service providers. It features a "Project Console" aesthetic with monospaced typography, blueprint grid backgrounds, and a high-tech feel.

## 📁 Key Features
- **Project Console Grid**: A dynamic project gallery (`projects.html`) powered by `js/projects.js`.
- **3D Premium Lightbox**: Click any project to open a 3D inspector view (Main Image + Stack).
- **Service Categories**: Dedicated layout for distinct services (`category-service.html`).
- **Dynamic Contact Form**: Ready-to-use HTML form structure.

## 🚀 Quick Setup

### 1. Branding & Logo
- Replace `images/saqtech_logo.png` with your own logo file.
- Open `index.html` (and all other `.html` files) and find `[BRAND]`. Replace this with your company name.
- **Favicon**: Replace `favicon.svg` with your brand icon.

### 2. Managing Projects
You don't need to edit HTML to add new projects!
1.  Open `js/projects.js`.
2.  Add a new block to the `projects` array:
    ```javascript
    {
        image: "images/my-new-project.jpg",
        title: "Project Name",
        location: "Location or Subtitle",
        // url: "Optional link to case study"
    },
    ```
3.  The **Grid System** and **3D Lightbox** will automatically handle the rest.

### 3. Customizing Colors
Open `assets/css/overrides.css` to change the core theme:
```css
:root {
    --canvas: #071B2A;  /* Main Background */
    --accent: #4DE3C1;  /* Main Highlight (Cyan) */
    --text: #EAF6FF;    /* Primary Text */
}
```

### 4. The 3D Lightbox
The lightbox logic is located in `js/projects.js` (init logic) and `assets/js/experience.js` (core function `initProjectLightbox`).
- **Styles**: `css/lightbox_3d.css`
- **Usage**: Automatically binds to any element with `.project-card` class in the projects grid.

## 🛠️ Advanced Customization
- **Navigation**: Edited in `index.html`.
- **Animations**: Powered by GSAP. Adjust `duration` and `stagger` values in `assets/js/experience.js` to change speeds.

---
---
**Developed by Quartermasters**

## 📋 Client Onboarding Checklist
**To successfully deploy this template, complete this checklist by collecting the following data:**

### 🖼️ Visual Assets
- [ ] **Logo**: High-resolution (SVG preferred) or transparent PNG.
- [ ] **Hero Image**: A high-impact image for the homepage banner (1920x1080).
- [ ] **Project Gallery**: 6-12 high-quality images of their best work.
- [ ] **Service Icons/Images**: Specific imagery for their core services.

### 📝 Business Details
- [ ] **Company Name**: The official legal name.
- [ ] **Nature of Business**: A 1-sentence tagline (e.g., "Aluminum & Glass Fabricators").
- [ ] **Location**: Physical office address and Google Maps link.
- [ ] **Contact Phone**: Primary number for WhatsApp and calls.
- [ ] **Contact Email**: Official enquiry email.
- [ ] **Social Media Links**: Instagram, LinkedIn, Facebook URLs.

### 🎯 Strategic Content
- [ ] **About Us**: A brief company history or mission statement (100-200 words).
- [ ] **Core Services List**: The top 3-6 services they want to highlight.
- [ ] **Call to Action**: What should the user do? (e.g., "Get a Quote", "Call Now").
