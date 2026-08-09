# Urimai Kaavalan — Design Tokens

> **Phase:** 2 — UI/UX Design System and User Experience
> **Format:** CSS Variable format for implementation readiness

---

## Colors

```css
/* Base Palette */
--color-primary: #1E3A8A;       /* Deep Indigo (Tailwind blue-900) */
--color-primary-hover: #1E40AF;
--color-secondary: #0D9488;     /* Teal (Tailwind teal-600) */
--color-secondary-hover: #0F766E;

/* Backgrounds & Surfaces */
--color-bg-base: #F8FAFC;       /* Slate 50 */
--color-bg-surface: #FFFFFF;    /* White */
--color-bg-muted: #F1F5F9;      /* Slate 100 */

/* Text */
--color-text-primary: #0F172A;  /* Slate 900 */
--color-text-secondary: #475569;/* Slate 600 */
--color-text-muted: #64748B;    /* Slate 500 */
--color-text-on-primary: #FFFFFF;

/* Semantic / Status */
--color-success-bg: #DCFCE7;    /* Green 100 */
--color-success-text: #166534;  /* Green 800 */
--color-success-border: #4ADE80;

--color-warning-bg: #FEF3C7;    /* Amber 100 */
--color-warning-text: #92400E;  /* Amber 800 */
--color-warning-border: #FBBF24;

--color-error-bg: #FEE2E2;      /* Red 100 */
--color-error-text: #991B1B;    /* Red 800 */
--color-error-border: #F87171;

--color-info-bg: #E0F2FE;       /* Light Blue 100 */
--color-info-text: #075985;     /* Light Blue 800 */
--color-info-border: #38BDF8;

/* AI Specific */
--color-ai-bg: #F3E8FF;         /* Purple 100 */
--color-ai-text: #581C87;       /* Purple 800 */
--color-ai-border: #C084FC;
```

## Typography

```css
/* Font Families */
--font-sans: 'Inter', system-ui, sans-serif;
--font-tamil: 'Noto Sans Tamil', 'Inter', system-ui, sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 2rem;       /* 32px */

/* Line Heights */
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;

/* Font Weights */
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## Spacing

```css
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
--spacing-2xl: 3rem;    /* 48px */
```

## Borders & Radius

```css
/* Border Widths */
--border-thin: 1px;
--border-thick: 2px;
--border-focus: 3px;

/* Border Colors */
--color-border-default: #E2E8F0; /* Slate 200 */
--color-border-hover: #CBD5E1;   /* Slate 300 */
--color-border-focus: var(--color-primary);

/* Border Radius */
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-full: 9999px;  /* Pills, avatars */
```

## Shadows & Elevation

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-focus: 0 0 0 3px rgba(30, 58, 138, 0.5); /* Blue focus ring */
```

## Breakpoints

```css
--screen-sm: 640px;   /* Large mobile / tablet portrait */
--screen-md: 768px;   /* Tablet landscape */
--screen-lg: 1024px;  /* Desktop */
--screen-xl: 1280px;  /* Large Desktop */
```

## Accessibility & Interactive

```css
/* Minimum Touch Target */
--touch-target-min: 44px;

/* Motion Defaults (respected by prefers-reduced-motion) */
--transition-fast: 150ms ease-in-out;
--transition-normal: 250ms ease-in-out;
```
