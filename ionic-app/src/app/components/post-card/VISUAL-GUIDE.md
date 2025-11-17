# ds-mobile-post-card - Component Visual Guide

## Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  ds-mobile-post-card                                    │
│  ┌───────────────────────────────────────────────────┐  │
│  │ post-header                                       │  │
│  │  ┌────┐  ┌──────────────────┐         ┌─────┐   │  │
│  │  │ 👤 │  │ John Doe         │         │ ⋮   │   │  │
│  │  │    │  │ @johndoe · 2h    │         │     │   │  │
│  │  └────┘  └──────────────────┘         └─────┘   │  │
│  │  avatar  author (name+meta)            menu     │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ post-content                                      │  │
│  │                                                   │  │
│  │  post-text:                                       │  │
│  │  Just moved into my new apartment! The           │  │
│  │  landlord was super helpful...                   │  │
│  │                                                   │  │
│  │  post-media (optional):                          │  │
│  │  ┌───────────────────────────────────────────┐   │  │
│  │  │                                           │   │  │
│  │  │        📸 Image / Video                   │   │  │
│  │  │                                           │   │  │
│  │  └───────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ post-actions                                      │  │
│  │                                                   │  │
│  │  ♡ 42     💬 12     ↗                             │  │
│  │  like   comment  share                           │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Spacing & Sizing

```
Card Padding: 16px
Border Radius: 12px
Gap between sections: 12px

Avatar: 40x40px
Author Name: 15px bold
Author Meta: 13px light
Post Text: 15px regular, line-height: 22px

Action Buttons:
- Size: 20px icons
- Touch Target: 44x44px min
- Gap: 16px between actions
- Font: 14px medium for counts
```

## Color Scheme

```
┌─────────────────────────────────────────┐
│ Card Background: #ffffff (white)        │
│ Border: #e5e5e5 (subtle gray)           │
│                                         │
│ Author Name: #1a1a1a (primary text)     │
│ Post Text: #1a1a1a (primary text)       │
│ Author Meta: #737373 (tertiary text)    │
│                                         │
│ Action Default: #737373 (secondary)     │
│ Action Active: #5d5fef (primary/brand)  │
│ Action Hover: #1a1a1a (primary)         │
└─────────────────────────────────────────┘
```

## Interaction States

### Default State
```
┌─────────────────────────┐
│ White background        │
│ Gray border             │
│ Gray action buttons     │
└─────────────────────────┘
```

### Active/Pressed State (clickable)
```
┌─────────────────────────┐
│ Light gray background   │
│ Slightly smaller        │
│ transform: scale(0.98)  │
└─────────────────────────┘
```

### Like Active State
```
♡ → ❤️
Gray → Brand Purple (#5d5fef)
```

## Responsive Behavior

### Mobile (< 768px)
```
┌──────────────────────┐
│ Full width card      │
│ No left padding for  │
│ content and actions  │
│ Stacks naturally     │
└──────────────────────┘
```

### Desktop (≥ 768px)
```
┌────────────────────────────┐
│ Max-width container        │
│ 52px left padding for      │
│ content and actions        │
│ Hover effects enabled      │
└────────────────────────────┘
```

## Feed Layout Example

```
┌─────────────────────────────────┐
│ ds-mobile-page-main             │
│ ┌─────────────────────────────┐ │
│ │ Header: "Community"         │ │
│ └─────────────────────────────┘ │
│                                 │
│ ds-mobile-content               │
│   ┌─────────────────────────┐   │
│   │ Post Card 1             │   │
│   └─────────────────────────┘   │
│   ↓ 16px gap                    │
│   ┌─────────────────────────┐   │
│   │ Post Card 2             │   │
│   └─────────────────────────┘   │
│   ↓ 16px gap                    │
│   ┌─────────────────────────┐   │
│   │ Post Card 3             │   │
│   └─────────────────────────┘   │
│   ↓ 16px gap                    │
│   │ ...more posts...        │   │
└─────────────────────────────────┘
```

## Variant Comparison

### Feed Variant (default)
```
┌────────────────────┐
│ Padding: 16px      │
│ Border: visible    │
│ Border-radius: 12px│
└────────────────────┘
```

### Detail Variant
```
┌────────────────────┐
│ Padding: 0         │
│ Border: none       │
│ Full width         │
└────────────────────┘
```

### Compact Variant
```
┌────────────────────┐
│ Padding: 12px      │
│ Gap: 8px           │
│ Smaller overall    │
└────────────────────┘
```

## Real Example from Community Feed

```
┌────────────────────────────────────────────────┐
│  ┌──┐  Emma Brown                          ⋮   │
│  │EB│  @emmab · 3d ago                          │
│  └──┘                                            │
│                                                  │
│  Organizing a community BBQ next weekend!       │
│  Everyone's invited. Bring your favorite        │
│  dish to share. Let's get to know each          │
│  other better! 🍔🌭                             │
│                                                  │
│  ❤️ 124     💬 89     ↗                         │
│  (active)                                        │
└────────────────────────────────────────────────┘
```

## Implementation Notes

✅ All measurements follow your design system tokens  
✅ Touch targets meet 44x44px minimum for accessibility  
✅ Smooth transitions (0.2s ease) for all interactions  
✅ Stop propagation on action buttons prevents card click  
✅ Pre-wrap on text content preserves formatting  
✅ Flexbox for responsive, maintainable layout  
✅ No hardcoded colors - all use CSS variables  

---

## Comparison with Threads App

### ✅ Similar Features
- Clean white cards with subtle borders
- Avatar + author layout on left
- Action buttons at bottom
- Like/comment/share pattern
- Tap-friendly design
- Active states for engagement

### 🎨 Adapted for Your System
- Uses Brockmann font family
- Follows your design token system
- Integrates with ds-avatar and ds-icon
- Semantic slot composition pattern
- Matches your mobile component architecture
- Angular standalone components with signals

---

This visual guide helps understand the component structure and ensures consistent implementation across your design system!

