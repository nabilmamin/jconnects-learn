# Tailwind CSS Cheat Sheet

Quick reference for common Tailwind utility classes.

---

## Spacing (Margin & Padding)

Format: `{property}{side}-{size}`

### Properties
| Prefix | CSS Property |
|--------|--------------|
| `m` | margin |
| `p` | padding |

### Sides
| Suffix | Meaning |
|--------|---------|
| `t` | top |
| `b` | bottom |
| `l` | left |
| `r` | right |
| `x` | left + right |
| `y` | top + bottom |
| (none) | all sides |

### Sizes
| Size | Pixels | Example |
|------|--------|---------|
| `0` | 0px | `p-0` |
| `1` | 4px | `m-1` |
| `2` | 8px | `p-2` |
| `3` | 12px | `mt-3` |
| `4` | 16px | `px-4` |
| `5` | 20px | `py-5` |
| `6` | 24px | `m-6` |
| `8` | 32px | `p-8` |
| `10` | 40px | `mt-10` |
| `12` | 48px | `mb-12` |
| `16` | 64px | `p-16` |
| `20` | 80px | `m-20` |

### Examples
```
mt-4    → margin-top: 16px
px-2    → padding-left: 8px; padding-right: 8px
p-6     → padding: 24px (all sides)
mb-1    → margin-bottom: 4px
mx-auto → margin-left: auto; margin-right: auto (centers element)
```

---

## Width & Height

### Width
| Class | CSS |
|-------|-----|
| `w-full` | width: 100% |
| `w-screen` | width: 100vw |
| `w-1/2` | width: 50% |
| `w-1/3` | width: 33.333% |
| `w-2/3` | width: 66.667% |
| `w-1/4` | width: 25% |
| `w-10` | width: 40px |
| `w-32` | width: 128px |
| `w-64` | width: 256px |

### Max Width
| Class | Approximate Size |
|-------|------------------|
| `max-w-xs` | 320px |
| `max-w-sm` | 384px |
| `max-w-md` | 448px |
| `max-w-lg` | 512px |
| `max-w-xl` | 576px |
| `max-w-2xl` | 672px |

### Height
| Class | CSS |
|-------|-----|
| `h-full` | height: 100% |
| `h-screen` | height: 100vh |
| `h-10` | height: 40px |
| `h-32` | height: 128px |
| `min-h-screen` | min-height: 100vh |

---

## Colors

Format: `{property}-{color}-{shade}`

### Properties
| Prefix | CSS Property |
|--------|--------------|
| `bg` | background-color |
| `text` | color |
| `border` | border-color |

### Color Palette
Colors: `slate`, `gray`, `red`, `orange`, `yellow`, `green`, `blue`, `indigo`, `purple`, `pink`

Special: `white`, `black`, `transparent`

### Shades (50 = lightest, 950 = darkest)
| Shade | Usage |
|-------|-------|
| `50` | Very light backgrounds |
| `100` | Light backgrounds |
| `200` | Light borders |
| `300` | Borders |
| `400` | Placeholder text |
| `500` | Medium (default) |
| `600` | Primary buttons |
| `700` | Hover states |
| `800` | Dark text |
| `900` | Very dark text |
| `950` | Near black |

### Examples
```
bg-blue-600     → background: blue, medium-dark
bg-white        → background: white
text-white      → text: white
text-gray-800   → text: dark gray
text-red-500    → text: red (for errors)
border-gray-300 → border: light gray
```

---

## Typography

### Font Size
| Class | Size |
|-------|------|
| `text-xs` | 12px |
| `text-sm` | 14px |
| `text-base` | 16px |
| `text-lg` | 18px |
| `text-xl` | 20px |
| `text-2xl` | 24px |
| `text-3xl` | 30px |
| `text-4xl` | 36px |

### Font Weight
| Class | Weight |
|-------|--------|
| `font-normal` | 400 |
| `font-medium` | 500 |
| `font-semibold` | 600 |
| `font-bold` | 700 |

### Text Alignment
| Class | CSS |
|-------|-----|
| `text-left` | text-align: left |
| `text-center` | text-align: center |
| `text-right` | text-align: right |

---

## Borders & Rounded Corners

### Border Width
| Class | CSS |
|-------|-----|
| `border` | border-width: 1px |
| `border-2` | border-width: 2px |
| `border-t` | border-top-width: 1px |
| `border-b` | border-bottom-width: 1px |

### Border Radius
| Class | Radius |
|-------|--------|
| `rounded-none` | 0 |
| `rounded-sm` | 2px |
| `rounded` | 4px |
| `rounded-md` | 6px |
| `rounded-lg` | 8px |
| `rounded-xl` | 12px |
| `rounded-full` | 9999px (pill/circle) |

---

## Flexbox

### Container
| Class | CSS |
|-------|-----|
| `flex` | display: flex |
| `flex-col` | flex-direction: column |
| `flex-row` | flex-direction: row |
| `flex-wrap` | flex-wrap: wrap |

### Alignment
| Class | CSS |
|-------|-----|
| `items-start` | align-items: flex-start |
| `items-center` | align-items: center |
| `items-end` | align-items: flex-end |
| `justify-start` | justify-content: flex-start |
| `justify-center` | justify-content: center |
| `justify-end` | justify-content: flex-end |
| `justify-between` | justify-content: space-between |

### Gap (spacing between flex items)
| Class | CSS |
|-------|-----|
| `gap-2` | gap: 8px |
| `gap-4` | gap: 16px |
| `gap-6` | gap: 24px |

---

## Display & Visibility

| Class | CSS |
|-------|-----|
| `block` | display: block |
| `inline` | display: inline |
| `inline-block` | display: inline-block |
| `hidden` | display: none |
| `flex` | display: flex |
| `grid` | display: grid |

---

## States (Hover, Focus, Disabled)

Add prefix before any class:

| Prefix | When Applied |
|--------|--------------|
| `hover:` | Mouse over |
| `focus:` | Element focused |
| `active:` | Being clicked |
| `disabled:` | Disabled attribute |

### Examples
```
hover:bg-blue-700     → darker blue on hover
focus:outline-none    → remove outline on focus
focus:ring-2          → add focus ring
disabled:opacity-50   → 50% opacity when disabled
disabled:cursor-not-allowed → change cursor when disabled
```

---

## Common Patterns

### Centered Container
```tsx
<div className="max-w-md mx-auto mt-10">
```

### Form Input
```tsx
<input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
```

### Primary Button
```tsx
<button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
```

### Error Text
```tsx
<p className="text-red-500 text-sm">Error message here</p>
```

### Card
```tsx
<div className="bg-white p-6 rounded-lg shadow-md">
```

### Label
```tsx
<label className="block text-sm font-medium mb-1">
```

### Flex Row with Space Between
```tsx
<div className="flex items-center justify-between">
```

### Vertical Stack with Gap
```tsx
<div className="flex flex-col gap-4">
```
Or use the shorthand:
```tsx
<div className="space-y-4">
```

---

## Resources

- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
