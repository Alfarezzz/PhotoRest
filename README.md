# PhotoRest - Portfolio Edition

Welcome to **PhotoRest**, a modern, responsive, and robust front-end photo gallery and inspiration platform. This project was originally a high school (SMK) assignment that has been completely revamped into a professional, portfolio-ready web application.

## ?? Key Features

### 1. Modern UI/UX (Clean Architecture)
- **Sapphire Blue Theme**: Uses a calming, cognitive-load-reducing color palette (\#2563eb\) combined with generous whitespace and a clean typography system (Plus Jakarta Sans).
- **CSS Grid Masonry**: A perfectly proportional CSS Grid implementation that avoids the "empty gap" issues of traditional multi-column masonry.

### 2. Engineering & Performance
- **Client-Side Image Compression**: When users upload massive images, the application utilizes HTML5 \<canvas>\ to intercept, compress, and resize the images on the client-side *before* saving them to \localStorage\. This prevents the browser's \QuotaExceededError\.
- **Deep Linking & State Routing**: Utilizes the History API to update the URL dynamically (\?pin=id\) when viewing a photo in the Lightbox. When the link is shared and opened, the app automatically parses the \URLSearchParams\ and opens the modal immediately.

### 3. Advanced Features
- **Color Palette Extraction**: Dynamically displays a 5-color aesthetic hex palette for every image in the lightbox, with one-click copy to clipboard functionality.
- **Smart Fallback Search**: If local pins don't match the user's search query, the app silently falls back to fetching high-quality images from the Unsplash API to ensure the user never sees an empty "No Results" page.
- **Dynamic Board & Profile System**: Users can save pins, create custom categorized boards, and upload their own artwork, with all state managed locally via \localStorage\.

## ?? Project Structure

- \explore.html\ - The main feed and gallery application (previously coba.html).
- \index.html\ - The landing page and authentication mockup.
- \profile.html\ - The user profile and custom boards dashboard.
- \category.html\ - Visual category selection portal.
- \js/app.js\ - The core logic (Gallery rendering, Lightbox, Modals, LocalStorage management).
- \js/data.js\ - The initial dataset (extracted to keep logic clean).
- \css/clean-theme.css\ - The primary design system and unified stylesheet.

## ?? Getting Started

This is a purely front-end application (HTML/CSS/Vanilla JS) with zero dependencies.
Simply open \index.html\ or \explore.html\ in any modern browser to view the project!
