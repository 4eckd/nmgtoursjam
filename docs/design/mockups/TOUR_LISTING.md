# Tour Listing Page Mockup

Browse and filter all available tours in Jamaica

## Design Overview

**Purpose**: Help users discover and filter tours based on preferences
**Key Elements**: Filter sidebar, search, grid/list toggle, sorting, pagination
**Container Max Width**: 1400px
**Layout**: Sidebar (300px) + Main content area

---

## Desktop Layout (1024px+)

```
╔════════════════════════════════════════════════════════════════════════════════╗
║                              NAVIGATION BAR                                     ║
╚════════════════════════════════════════════════════════════════════════════════╝

╔════════════════════════════════════════════════════════════════════════════════╗
║                              PAGE HEADER                                        ║
║  ┌─────────────────────────────────────────────────────────────────────────┐  ║
║  │                                                                          │  ║
║  │                       Explore Jamaica Tours                              │  ║
║  │                  Discover authentic island experiences                  │  ║
║  │                                                                          │  ║
║  │  Home > Tours                                              127 tours found │  ║
║  │                                                                          │  ║
║  └─────────────────────────────────────────────────────────────────────────┘  ║
╚════════════════════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════╦═════════════════════════════════════╗
║            FILTER SIDEBAR                ║        MAIN CONTENT AREA            ║
║            (300px width)                 ║                                     ║
║  ┌────────────────────────────────────┐ ║  ┌─────────────────────────────┐   ║
║  │                                     │ ║  │                              │   ║
║  │  ┌──────────────────────────────┐  │ ║  │  ┌────────────────────────┐ │   ║
║  │  │  🔍 Search tours...     [→] │  │ ║  │  │  🔍 Search...    [→]   │ │   ║
║  │  └──────────────────────────────┘  │ ║  │  └────────────────────────┘ │   ║
║  │                                     │ ║  │                              │   ║
║  │  PRICE RANGE                       │ ║  │  ┌────────────────────────┐ │   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ║  │  │  Sort by: [Price ▼]    │ │   ║
║  │  [$0 ═══●═══════●══ $500]         │ ║  │  │  View: [⊞ Grid] [≡]   │ │   ║
║  │  $0 - $200                         │ ║  │  └────────────────────────┘ │   ║
║  │                                     │ ║  │                              │   ║
║  │  DURATION                          │ ║  └─────────────────────────────┘   ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ║                                     ║
║  │  ☐ Half Day (< 4 hours)           │ ║  ┌──────────┐ ┌──────────┐ ┌────┐ ║
║  │  ☑ Full Day (4-8 hours)           │ ║  │ [IMAGE]  │ │ [IMAGE]  │ │ [...│ ║
║  │  ☐ Multi-Day (8+ hours)           │ ║  │          │ │          │ │    │ ║
║  │                                     │ ║  │ Martha   │ │ Dunn's   │ │ Bl.│ ║
║  │  DIFFICULTY                        │ ║  │ Brae     │ │ River    │ │ Ho.│ ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ║  │ Rafting  │ │ Falls    │ │ Ad.│ ║
║  │  ☐ Easy                            │ ║  │          │ │          │ │    │ ║
║  │  ☑ Moderate                        │ ║  │ ★★★★★   │ │ ★★★★★   │ │ ★★│ ║
║  │  ☐ Challenging                     │ ║  │ 4.9      │ │ 4.8      │ │ 5.│ ║
║  │  ☐ Extreme                         │ ║  │ 127 rev. │ │ 234 rev. │ │ 89│ ║
║  │                                     │ ║  │          │ │          │ │   │ ║
║  │  CATEGORY                          │ ║  │ 3 hours  │ │ 4 hours  │ │ 5 │ ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ║  │ $85 USD  │ │ $95 USD  │ │$11│ ║
║  │  ☑ Water Activities                │ ║  │          │ │          │ │   │ ║
║  │  ☐ Cultural Tours                  │ ║  │ [Book]   │ │ [Book]   │ │ [B│ ║
║  │  ☐ Adventure                       │ ║  └──────────┘ └──────────┘ └────┘ ║
║  │  ☐ Food & Drink                    │ ║                                     ║
║  │  ☐ Nature & Wildlife               │ ║  ┌──────────┐ ┌──────────┐ ┌────┐ ║
║  │  ☐ Historical                      │ ║  │ Negril   │ │ Bob      │ │ Ri.│ ║
║  │                                     │ ║  │ Sunset   │ │ Marley   │ │ Ka.│ ║
║  │  LOCATION                          │ ║  │ Cruise   │ │ Museum   │ │ Ra.│ ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ║  │          │ │          │ │   │ ║
║  │  ☐ Montego Bay                     │ ║  │ ★★★★☆   │ │ ★★★★★   │ │ ★★│ ║
║  │  ☑ Ocho Rios                       │ ║  │ 4.7      │ │ 4.9      │ │ 4.│ ║
║  │  ☐ Negril                          │ ║  │ $75 USD  │ │ $60 USD  │ │$12│ ║
║  │  ☐ Kingston                        │ ║  │ [Book]   │ │ [Book]   │ │ [B│ ║
║  │  ☐ Port Antonio                    │ ║  └──────────┘ └──────────┘ └────┘ ║
║  │                                     │ ║                                     ║
║  │  RATING                            │ ║  ┌──────────┐ ┌──────────┐ ┌────┐ ║
║  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ ║  │ Seven    │ │ Mystic   │ │ Gr.│ ║
║  │  ☐ 5 stars                         │ ║  │ Mile     │ │ Mountain │ │ Ri.│ ║
║  │  ☑ 4+ stars                        │ ║  │ Beach    │ │ Tour     │ │ Tu.│ ║
║  │  ☐ 3+ stars                        │ ║  │          │ │          │ │   │ ║
║  │  ☐ All ratings                     │ ║  │ ★★★★★   │ │ ★★★★☆   │ │ ★★│ ║
║  │                                     │ ║  │ 4.8      │ │ 4.6      │ │ 5.│ ║
║  │  [Clear All Filters]               │ ║  │ $50 USD  │ │ $80 USD  │ │$95│ ║
║  │                                     │ ║  │ [Book]   │ │ [Book]   │ │ [B│ ║
║  │                                     │ ║  └──────────┘ └──────────┘ └────┘ ║
║  │                                     │ ║                                     ║
║  │                                     │ ║  ┌─────────────────────────────┐   ║
║  │                                     │ ║  │  Pagination                 │   ║
║  │                                     │ ║  │  ◀  1  2  3  4  5  ▶        │   ║
║  │                                     │ ║  │  Showing 1-9 of 127 tours   │   ║
║  │                                     │ ║  └─────────────────────────────┘   ║
║  └────────────────────────────────────┘ ║                                     ║
╚══════════════════════════════════════════╩═════════════════════════════════════╝
```

---

## List View (Alternative)

When user clicks list view toggle:

```
╔═════════════════════════════════════════════════════════════════════════════════╗
║  ┌───────────────────────────────────────────────────────────────────────────┐ ║
║  │  ┌────────┐  Martha Brae Rafting Tour                    ★★★★★ 4.9      │ ║
║  │  │        │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     127 reviews    │ ║
║  │  │[IMAGE] │                                                               │ ║
║  │  │        │  Experience the tranquil beauty of Martha Brae River on a   │ ║
║  │  │ 300x   │  traditional bamboo raft. Your expert guide will pole you   │ ║
║  │  │ 200px  │  down the river while sharing local stories and culture.    │ ║
║  │  │        │                                                               │ ║
║  │  │        │  📍 Ocho Rios  ⏱️ 3 hours  👥 Max 2 per raft  💰 $85 USD   │ ║
║  │  │        │                                                               │ ║
║  │  └────────┘  [View Details]                             [Book Now →]    │ ║
║  └───────────────────────────────────────────────────────────────────────────┘ ║
║                                                                                 ║
║  ┌───────────────────────────────────────────────────────────────────────────┐ ║
║  │  ┌────────┐  Dunn's River Falls Adventure                ★★★★★ 4.8      │ ║
║  │  │        │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     234 reviews    │ ║
║  │  │[IMAGE] │                                                               │ ║
║  │  │        │  Climb the iconic 600-foot terraced waterfall with an       │ ║
║  │  │        │  experienced guide. Cool off in natural pools and enjoy     │ ║
║  │  │        │  stunning tropical scenery.                                  │ ║
║  │  │        │                                                               │ ║
║  │  │        │  📍 Ocho Rios  ⏱️ 4 hours  👥 Max 15  💰 $95 USD           │ ║
║  │  │        │                                                               │ ║
║  │  └────────┘  [View Details]                             [Book Now →]    │ ║
║  └───────────────────────────────────────────────────────────────────────────┘ ║
╚═════════════════════════════════════════════════════════════════════════════════╝
```

---

## Tablet Layout (768px - 1023px)

```
╔══════════════════════════════════════════════════════════════════╗
║                        NAVIGATION BAR                             ║
╚══════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════╗
║  Explore Jamaica Tours                          127 tours found  ║
║  Home > Tours                                                     ║
╚══════════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════════╗
║  ┌──────────────────────────────────────────────────────────┐   ║
║  │  [≡ Filters]      Search...  [→]     Sort: [Price ▼]    │   ║
║  └──────────────────────────────────────────────────────────┘   ║
╚══════════════════════════════════════════════════════════════════╝

(Filters in collapsible drawer that slides in from left)

╔══════════════════════════════════════════════════════════════════╗
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          ║
║  │  Martha Brae │  │  Dunn's River│  │  Blue Hole   │          ║
║  │  Rafting     │  │  Falls       │  │  Adventure   │          ║
║  │  ★★★★★ 4.9  │  │  ★★★★★ 4.8  │  │  ★★★★★ 5.0  │          ║
║  │  $85 USD     │  │  $95 USD     │  │  $110 USD    │          ║
║  │  [Book Now]  │  │  [Book Now]  │  │  [Book Now]  │          ║
║  └──────────────┘  └──────────────┘  └──────────────┘          ║
║                                                                   ║
║  (2 columns, scrollable)                                         ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Mobile Layout (< 640px)

```
╔═══════════════════════════════════════════╗
║          NAVIGATION BAR                    ║
╚═══════════════════════════════════════════╝

╔═══════════════════════════════════════════╗
║  Explore Tours                             ║
║  127 tours found                           ║
╚═══════════════════════════════════════════╝

╔═══════════════════════════════════════════╗
║  ┌────────────────────────────────────┐   ║
║  │  🔍 Search...            [→]       │   ║
║  └────────────────────────────────────┘   ║
║                                            ║
║  ┌────────────────────────────────────┐   ║
║  │  [≡ Filters (3)]  Sort: [Price ▼] │   ║
║  └────────────────────────────────────┘   ║
╚═══════════════════════════════════════════╝

(Filters in bottom sheet/modal when tapped)

╔═══════════════════════════════════════════╗
║  ┌────────────────────────────────────┐   ║
║  │  [IMAGE]                           │   ║
║  │  Martha Brae Rafting               │   ║
║  │  ★★★★★ 4.9 (127 reviews)          │   ║
║  │  3 hours • $85 USD                 │   ║
║  │  [Book Now]                        │   ║
║  └────────────────────────────────────┘   ║
║                                            ║
║  ┌────────────────────────────────────┐   ║
║  │  [IMAGE]                           │   ║
║  │  Dunn's River Falls                │   ║
║  │  ★★★★★ 4.8 (234 reviews)          │   ║
║  │  4 hours • $95 USD                 │   ║
║  │  [Book Now]                        │   ║
║  └────────────────────────────────────┘   ║
║                                            ║
║  (1 column, vertical scroll)              ║
║                                            ║
║  ┌────────────────────────────────────┐   ║
║  │  ◀  1  2  3  4  5  ▶               │   ║
║  │  Showing 1-9 of 127                │   ║
║  └────────────────────────────────────┘   ║
╚═══════════════════════════════════════════╝
```

---

## Filter Panel (Mobile - Bottom Sheet)

```
╔═══════════════════════════════════════════╗
║  Filters                        [✕ Close] ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ║
║                                            ║
║  PRICE RANGE                              ║
║  [$0 ═══●═══════●══ $500]                ║
║  $0 - $200                                ║
║                                            ║
║  DURATION                                 ║
║  ☐ Half Day (< 4 hours)                  ║
║  ☑ Full Day (4-8 hours)                  ║
║  ☐ Multi-Day (8+ hours)                  ║
║                                            ║
║  DIFFICULTY                               ║
║  ☐ Easy  ☑ Moderate                      ║
║  ☐ Challenging  ☐ Extreme                ║
║                                            ║
║  CATEGORY                                 ║
║  ☑ Water Activities                      ║
║  ☐ Cultural Tours                        ║
║  ☐ Adventure                             ║
║  ☐ Food & Drink                          ║
║                                            ║
║  LOCATION                                 ║
║  ☐ Montego Bay                           ║
║  ☑ Ocho Rios                             ║
║  ☐ Negril                                ║
║                                            ║
║  [Clear All]      [Apply Filters →]     ║
╚═══════════════════════════════════════════╝
```

---

## Component Specifications

### Filter Sidebar (Desktop)
- **Width**: 300px fixed
- **Background**: White
- **Border**: Right border, 1px, zinc-200
- **Sticky**: Top position when scrolling
- **Spacing**: 1.5rem padding

### Tour Grid
- **Desktop**: 3 columns (gap: 1.5rem)
- **Tablet**: 2 columns (gap: 1.25rem)
- **Mobile**: 1 column (gap: 1rem)

### Tour Card (Grid View)
- **Aspect Ratio**: 4:3 for image
- **Border Radius**: 0.75rem
- **Shadow**: 0 2px 8px rgba(0,0,0,0.1)
- **Hover**: Scale(1.02) + shadow increase

### Tour Card (List View)
- **Image Size**: 300x200px
- **Layout**: Flex row (image left, content right)
- **Spacing**: 1.5rem gap between image and content

### Price Range Slider
- **Track**: bg-zinc-200
- **Thumb**: bg-emerald-400, size 20px
- **Active Track**: bg-emerald-400

### Checkbox Styling
- **Unchecked**: border-zinc-300
- **Checked**: bg-emerald-400, white checkmark
- **Size**: 20x20px

### Sort Dropdown
- **Background**: White
- **Border**: 1px zinc-300
- **Hover**: bg-zinc-50
- **Active**: Emerald accent

### Pagination
- **Button Size**: 40x40px min
- **Active Page**: bg-emerald-400, text-white
- **Hover**: bg-zinc-100
- **Spacing**: 0.5rem gap

## Interaction Patterns

### Filter Changes
1. User checks/unchecks filter
2. Update URL query params
3. Show loading state on grid
4. Fetch filtered results
5. Update tour count in header
6. Scroll to top of results

### Search
1. User types in search box
2. Debounce input (300ms)
3. Update results in real-time
4. Show "No results" if empty
5. Clear button appears when has value

### View Toggle
1. User clicks grid/list icon
2. Animate transition between views
3. Save preference to localStorage
4. Maintain scroll position

### Sort Change
1. User selects sort option
2. Show loading spinner
3. Re-order results with animation
4. Update URL params

## Empty States

### No Results Found
```
┌────────────────────────────────┐
│          🔍                    │
│                                 │
│   No tours match your filters  │
│                                 │
│   Try adjusting your search    │
│   or clearing some filters     │
│                                 │
│   [Clear All Filters]          │
└────────────────────────────────┘
```

### Loading State
```
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  ▒▒▒▒▒▒▒▒▒▒▒  │  │  ▒▒▒▒▒▒▒▒▒▒▒  │  │  ▒▒▒▒▒▒▒▒▒▒▒  │
│  ▒▒▒▒▒▒▒▒▒▒▒  │  │  ▒▒▒▒▒▒▒▒▒▒▒  │  │  ▒▒▒▒▒▒▒▒▒▒▒  │
│  ▒▒▒▒  ▒▒▒▒▒  │  │  ▒▒▒▒  ▒▒▒▒▒  │  │  ▒▒▒▒  ▒▒▒▒▒  │
│  ▒▒▒▒▒▒▒▒▒▒▒  │  │  ▒▒▒▒▒▒▒▒▒▒▒  │  │  ▒▒▒▒▒▒▒▒▒▒▒  │
└────────────────┘  └────────────────┘  └────────────────┘
(Skeleton loading cards with shimmer animation)
```

## Accessibility Notes

- Filter checkboxes have proper labels
- Price slider has ARIA attributes
- Sort dropdown keyboard navigable
- Tour cards have semantic structure
- "Skip to results" link for screen readers
- Active filters announced to screen readers
- Loading states communicated via ARIA live regions

## Implementation Notes

1. Use URL query params for all filters (enables sharing/bookmarking)
2. Implement debounced search (300ms delay)
3. Lazy load images as user scrolls
4. Infinite scroll option instead of pagination
5. Save view preference (grid/list) to localStorage
6. Track filter usage in analytics
7. Prefetch next page of results for faster navigation
