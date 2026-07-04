# IISPPR Official Website

A modern, responsive, and interactive landing website developed for the **International Institute of SDGs & Public Policy Research (IISPPR)** using **React** and **Vite**.

The project follows a modular component-based architecture, making it easy to maintain, extend, and collaborate on.

---

# Tech Stack

- React.js
- Vite
- JavaScript (ES6+)
- CSS3
- React Hooks
- Responsive Design

---

# Features

- Responsive Landing Page
- Interactive Hero Section
- Smooth Navigation
- Course Information Section
- Book Showcase
- Testimonials Section
- FAQ Section
- Scroll Progress Indicator
- Interactive Background Animation
- Component-Based Architecture

---

# Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── hero/
│   │   ├── HeroText.jsx
│   │   └── Slider.jsx
│   │
│   ├── courseDifferent/
│   │   ├── data/
│   │   ├── styles/
│   │   ├── FloatIcon.jsx
│   │   └── PillarCard.jsx
│   │
│   ├── Navbar.jsx
│   ├── HeroSection.jsx
│   ├── LandingSections.jsx
│   ├── Book.jsx
│   ├── Book.css
│   ├── Faq.jsx
│   ├── Testimonials.jsx
│   ├── InteractiveBackground.jsx
│   ├── IISPPRLogo.jsx
│   ├── Page.jsx
│   └── ScrollProgress.jsx
│
├── data/
│   └── bookContent.js
│
├── hooks/
│   └── useBookScroll.js
│
├── pages/
│   └── HomePage.jsx
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

# Folder Explanation

## `assets/`

Contains all static assets used throughout the application.

Examples:

- Images
- Icons
- SVG files
- Other static resources

---

## `components/`

Contains all reusable UI components used across the application.

### `hero/`

Contains components related to the Hero section.

- **HeroText.jsx** – Hero title and content
- **Slider.jsx** – Hero slider component

---

### `courseDifferent/`

Contains all files related to the **Course Different** section.

Includes:

- Section-specific UI components
- Local data
- Styles

---

### Other Components

The remaining reusable components are stored directly inside the `components` directory.

| Component | Description |
|------------|-------------|
| Navbar.jsx | Website navigation bar |
| HeroSection.jsx | Main Hero section |
| LandingSections.jsx | Landing page content sections |
| Book.jsx | Book showcase section |
| Faq.jsx | Frequently Asked Questions |
| Testimonials.jsx | Testimonials section |
| InteractiveBackground.jsx | Interactive background animation |
| ScrollProgress.jsx | Scroll progress indicator |
| IISPPRLogo.jsx | IISPPR logo component |
| Page.jsx | Shared page layout/component |

---

## `data/`

Stores static application data.

Example:

- `bookContent.js`

---

## `hooks/`

Contains reusable custom React Hooks.

Example:

- `useBookScroll.js`

---

## `pages/`

Contains complete application pages.

Example:

- `HomePage.jsx`

The page combines multiple reusable components to build the complete landing page.

---

## `App.jsx`

The root component of the application.

Responsible for rendering the application's main layout.

---

## `main.jsx`

Application entry point.

Initializes React and mounts the application into the DOM.

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate into the project

```bash
cd iisppr
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

# Build for Production

```bash
npm run build
```

Preview the production build

```bash
npm run preview
```

---

# Project Architecture

This project follows a **Component-Based Architecture** with partial **Feature-Based Organization**.

Benefits include:

- Better code organization
- Improved maintainability
- Reusable components
- Easier collaboration
- Scalable project structure

---

# Future Improvements

- Add React Router for multiple pages
- Improve accessibility (WCAG)
- Add unit and integration testing
- Optimize images and assets
- Introduce global state management if required

---

# Project Status

✅ Completed

The project is production-ready and can be further extended with additional features as needed.

---

# Developed For

**International Institute of SDGs & Public Policy Research (IISPPR)**

---

