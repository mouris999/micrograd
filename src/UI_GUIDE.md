# 🎨 UI Design Guide

## Color System

### Background Colors
```css
Main Canvas:     #0a0a0f  (Deep dark blue-black)
Panel Headers:   #0f0f14  (Slightly lighter)
Panel Content:   #1a1a1f  (Content areas)
```

### Text Colors
```css
Primary:    white @ 90% opacity  (Main headings)
Secondary:  white @ 60% opacity  (Body text)
Tertiary:   white @ 40% opacity  (Labels)
Disabled:   white @ 30% opacity  (Inactive)
```

### Accent Colors
```css
Cyan:       #06b6d4  (Primary actions, AI features)
Purple:     #a855f7  (Extra Think mode)
Green:      #10b981  (Success, Android)
Red:        #ef4444  (Errors, destructive)
Amber:      #f59e0b  (Warnings)
```

### Border Colors
```css
Default:    white @ 5% opacity   (Panel separators)
Hover:      white @ 10% opacity  (Interactive elements)
Active:     white @ 20% opacity  (Selected states)
Accent:     [color] @ 50% opacity (Colored borders)
```

---

## Component Patterns

### Header Pattern
```tsx
<div className="px-4 py-3 border-b border-white/5 bg-[#0f0f14]">
  <div className="flex items-center justify-between">
    <h2 className="text-sm text-white/90">Title</h2>
    <div className="flex items-center gap-2">
      {/* Actions */}
    </div>
  </div>
</div>
```

### Button Pattern - Default
```tsx
<button className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 border border-white/10">
  Default Button
</button>
```

### Button Pattern - Active
```tsx
<button className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/50">
  Active Button
</button>
```

### Button Pattern - Primary
```tsx
<button className="px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600">
  Primary Action
</button>
```

### Card Pattern
```tsx
<div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20">
  Card Content
</div>
```

### Input Pattern
```tsx
<input className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500/50" />
```

---

## Spacing System

### Padding Scale
```css
p-1   = 4px   (Tiny)
p-2   = 8px   (Small)
p-3   = 12px  (Medium)
p-4   = 16px  (Default)
p-6   = 24px  (Large)
p-8   = 32px  (Extra large)
```

### Gap Scale
```css
gap-1   = 4px   (Tight)
gap-2   = 8px   (Related items)
gap-3   = 12px  (Section spacing)
gap-4   = 16px  (Major sections)
```

### Border Radius
```css
rounded-md   = 6px   (Small elements)
rounded-lg   = 8px   (Cards, buttons)
rounded-xl   = 12px  (Panels)
rounded-2xl  = 16px  (Major containers)
```

---

## Layout Patterns

### Sidebar Layout
```tsx
<div className="h-full flex flex-col bg-[#0f0f14] border-r border-white/5">
  {/* Header */}
  <div className="p-4 border-b border-white/5">
    <h2>Sidebar Title</h2>
  </div>
  
  {/* Content */}
  <div className="flex-1 overflow-y-auto p-4">
    {/* Scrollable content */}
  </div>
  
  {/* Footer */}
  <div className="p-4 border-t border-white/5">
    {/* Actions */}
  </div>
</div>
```

### Panel Layout
```tsx
<div className="h-full flex flex-col bg-[#1a1a1f]">
  {/* Header */}
  <div className="px-4 py-3 border-b border-white/5 bg-[#0f0f14]">
    {/* Controls */}
  </div>
  
  {/* Content */}
  <div className="flex-1 overflow-auto">
    {/* Main content */}
  </div>
</div>
```

---

## Icon Usage

### Icon Sizes
```tsx
// Small (UI elements)
<Icon className="w-3 h-3" />

// Medium (Buttons, labels)
<Icon className="w-4 h-4" />

// Large (Headers)
<Icon className="w-5 h-5" />

// Extra Large (Empty states)
<Icon className="w-12 h-12" />
```

### Icon Colors
```tsx
// Default
<Icon className="text-white/60" />

// Active
<Icon className="text-cyan-400" />

// Success
<Icon className="text-green-400" />

// Warning
<Icon className="text-amber-400" />

// Error
<Icon className="text-red-400" />
```

---

## Animation Patterns

### Hover Transitions
```tsx
className="transition-all duration-200 hover:bg-white/10"
```

### Fade In
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.2 }}
```

### Slide In
```tsx
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -20 }}
transition={{ duration: 0.2 }}
```

### Scale
```tsx
initial={{ scale: 0.95, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ duration: 0.2 }}
```

---

## Typography Scale

### Headings
```tsx
// H1 - Main titles
<h1 className="text-xl text-white">

// H2 - Section titles
<h2 className="text-sm text-white/90">

// H3 - Subsections
<h3 className="text-xs text-white/60">
```

### Body Text
```tsx
// Primary
<p className="text-sm text-white/90">

// Secondary
<p className="text-xs text-white/60">

// Tertiary
<p className="text-xs text-white/40">
```

---

## Grid Layouts

### 2-Column Grid
```tsx
<div className="grid grid-cols-2 gap-2">
  {/* Items */}
</div>
```

### 4-Column Grid
```tsx
<div className="grid grid-cols-4 gap-2">
  {/* Items */}
</div>
```

### Auto-Fit Grid
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
  {/* Responsive items */}
</div>
```

---

## State Indicators

### Loading
```tsx
<div className="flex items-center gap-2">
  <div className="flex gap-1">
    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
  <span className="text-xs text-white/60">Loading...</span>
</div>
```

### Success Badge
```tsx
<span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 border border-green-500/50 text-green-300">
  Success
</span>
```

### Error Badge
```tsx
<span className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 border border-red-500/50 text-red-300">
  Error
</span>
```

### Status Dot
```tsx
<div className="w-2 h-2 rounded-full bg-green-400" />
```

---

## Best Practices

### 1. Consistency
- Always use the defined color palette
- Stick to the spacing scale
- Use consistent border radius

### 2. Hierarchy
- Primary actions: Solid colored buttons
- Secondary actions: Outlined buttons
- Tertiary actions: Ghost buttons

### 3. Feedback
- Hover states on all interactive elements
- Loading indicators for async actions
- Success/error messages for user actions

### 4. Accessibility
- Minimum contrast ratio: 4.5:1
- All interactive elements keyboard accessible
- Proper ARIA labels

### 5. Performance
- Minimize animations
- Use CSS transitions over JavaScript
- Optimize for 60fps

---

## Quick Reference

### Common Classes
```css
/* Panels */
.panel-header: px-4 py-3 border-b border-white/5 bg-[#0f0f14]
.panel-content: p-4 bg-[#1a1a1f]

/* Buttons */
.btn-default: px-3 py-1.5 rounded-lg bg-white/5 text-white/60 hover:bg-white/10
.btn-primary: px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600
.btn-active: bg-cyan-500/20 text-cyan-400 border-cyan-500/50

/* Text */
.text-primary: text-white/90
.text-secondary: text-white/60
.text-tertiary: text-white/40

/* Borders */
.border-subtle: border-white/5
.border-default: border-white/10
.border-active: border-white/20
```

---

## Example Component

```tsx
export function ExampleCard() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm text-white/90">Card Title</h3>
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`px-3 py-1 text-xs rounded-md transition-all ${
            isActive 
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </button>
      </div>

      {/* Content */}
      <p className="text-xs text-white/60 mb-3">
        This is a sample card component following the design system.
      </p>

      {/* Footer */}
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-white text-xs hover:bg-cyan-600">
          Primary
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-xs hover:bg-white/10">
          Secondary
        </button>
      </div>
    </div>
  );
}
```

---

**Follow these patterns for consistent, professional UI design throughout the application.** 🎨✨
