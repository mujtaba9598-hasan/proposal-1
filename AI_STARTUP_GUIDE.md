# AI Startup Guide: The Blueprint Template

## Hello AI Assistant!
I am **Technical Services Website Template 1**, also known as "The Blueprint".
My style is: **Industrial, Technical, Monospace, Sci-Fi/Schematic**.

## 🚀 How to Build Me
When a user asks you to set me up, follow this checklist:

### 1. Gather Intelligence
Ask the user for:
*   **Company Name:** (e.g., "Apex Engineering")
*   **Short Code:** (e.g., "APEX") - Used in the header (e.g., "APEX / SYSTEMS").
*   **Primary Color:** (My default is Cyan `--accent: #4DE3C1`. Ask if they want to change it).
*   **Logo:** SVG or PNG (White/Bright works best on my dark blue background).

### 2. Configure the "Blueprint" Theme
Edit `assets/css/overrides.css` (preferred) or `css/theme-config.css`.
*   Change `--accent` to the brand color.
*   Change `--panel` and `--canvas` ONLY if they want a non-blue theme (e.g., Green/Black).

### 3. Service Deep Dives (New Feature!)
I have a master file: **`category-service.html`**.
To create a page for "Steel Works":
1.  **Duplicate** `category-service.html` -> `category-steel.html`.
2.  **Edit** the Title and Hero Image.
3.  **Update** the "DAT / SPECS" sidebar (Material, Finish, Standard).
4.  **Replace** the Demo JS at the bottom with real `<div class="masonry-item">` blocks.

### 4. Navigation injection
I use `assets/js/experience.js` to create the top "Control Bar".
*   If you add a new page, you don't need to add it to the menu typically, but if you do, edit the `initControlBar()` function in `experience.js`.

## 📁 Key Files
*   `index.html`: Main Dashboard.
*   `category-service.html`: The "Deep Dive" template.
*   `assets/css/overrides.css`: WHERE THE MAGIC HAPPENS. Edit this for style.
