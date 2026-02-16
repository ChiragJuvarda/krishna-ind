# 🎨 Modern Product Grid - Setup Guide

## ✅ What Was Created

Your enhanced product card system is ready with:
- ✅ **Modern Product Grid Section** - Fully customizable product display
- ✅ **Multiple Card Styles** - Standard, Modern, Minimal, Elevated, Bordered
- ✅ **Hover Effects** - Lift, Zoom, Shadow, Overlay effects
- ✅ **Quick Actions** - Quick Add & Quick View buttons
- ✅ **Full Theme Editor Support** - All settings configurable in Shopify admin
- ✅ **Responsive Design** - Perfect on mobile, tablet, and desktop
- ✅ **Color Swatches** - Show product color variants
- ✅ **Product Ratings** - Display customer reviews (requires review app)
- ✅ **Sale Badges** - Auto-calculate and show sale percentages
- ✅ **New Badge** - Highlight recently added products

## 📁 Files Created

### Sections
1. **sections/modern-product-grid.liquid** - Main section with full theme editor controls

### Assets - CSS
1. **assets/modern-product-cards.css** - Modern card designs and layouts
2. **assets/component-product-card.css** - Enhanced component styles

### Assets - JavaScript
1. **assets/modern-product-cards.js** - Interactive features (quick add, quick view, ratings)

### Snippets
1. **snippets/product-rating.liquid** - Product rating display component

## 🚀 How to Use

### Option 1: Add to Homepage

1. Go to **Shopify Admin** → **Online Store** → **Themes**
2. Click **Customize** on your active theme
3. Navigate to the page where you want to add products
4. Click **Add section**
5. Select **Modern Product Grid**
6. Configure in the left sidebar

### Option 2: Add to Any Page Template

1. Go to **Online Store** → **Themes** → **Customize**
2. Navigate to any page (template)
3. Click **Add section**
4. Choose **Modern Product Grid**
5. Customize and save

## ⚙️ Theme Editor Settings

### Section Header
- **Heading** - Section title text
- **Heading Size** - Small, Medium, or Large
- **Description** - Optional description text
- **Header Alignment** - Left, Center, or Right

### Product Collection
- **Collection** - Choose which collection to display
- **Products to Show** - Display 2-24 products (default: 8)

### Layout Options
- **Layout Style** - Grid, Masonry, or List view
- **Columns on Desktop** - 2-5 columns
- **Columns on Mobile** - 1 or 2 columns

### Card Style Settings
- **Card Style** - Choose from:
  - **Standard** - Classic bordered cards
  - **Modern** - Rounded corners with shadow
  - **Minimal** - Clean, no borders
  - **Elevated** - Floating card effect
  - **Bordered** - Prominent borders

- **Hover Effect** - Choose from:
  - **None** - No hover effect
  - **Lift** - Card lifts up
  - **Zoom** - Image zooms in
  - **Shadow** - Enhanced shadow
  - **Overlay** - Gradient overlay

- **Image Ratio** - Adapt, Square (1:1), Portrait (2:3), Landscape (3:2)
- **Show Second Image on Hover** - Toggle secondary image display

### Product Information
- **Show Vendor** - Display brand/vendor name
- **Show Rating** - Display product reviews (requires review app)
- **Show Price** - Display product price
- **Show Description** - Show truncated description
- **Description Word Count** - 5-30 words (default: 15)
- **Text Alignment** - Left, Center, or Right

### Badge Settings
- **Show Badges** - Enable/disable badges
- **Badge Position** - Top-left, Top-right, Bottom-left, Bottom-right
- **Show Sale Percentage** - Display discount % (e.g., "-25%")
- **Show 'New' Badge** - Highlight new products
- **'New' Badge Duration** - Days to show badge (7-90 days)
- **'New' Badge Text** - Customize badge text (default: "New")

### Quick Actions
- **Show Quick Add Button** - Enable quick add to cart
- **Show Quick View Button** - Enable product quick view
- **Show Color Swatches** - Display color options (if available)

### View All Button
- **Show 'View All' Button** - Display button when more products exist
- **Button Label** - Customize button text
- **Button Style** - Primary, Secondary, or Tertiary

### Colors & Spacing
- **Color Scheme** - Choose theme color scheme
- **Background Color** - Custom background color
- **Padding Top** - 0-100px (default: 36px)
- **Padding Bottom** - 0-100px (default: 36px)

## 💡 Pro Tips

### 1. Best Card Style Combinations
```
Modern Card + Lift Hover = Professional look
Elevated Card + Shadow Hover = Premium feel
Minimal Card + Zoom Hover = Clean, modern
Bordered Card + Overlay Hover = Bold statement
```

### 2. Recommended Layouts
- **4 columns** - Best for desktop with detailed info
- **3 columns** - Great for larger product images
- **5 columns** - Perfect for compact product grids
- **2 columns mobile** - Better product visibility on phones

### 3. Image Ratio Tips
- **Square (1:1)** - Best for consistency across products
- **Portrait (2:3)** - Great for fashion/apparel
- **Landscape (3:2)** - Good for tech products/electronics
- **Adapt** - Use original image ratios (creates varied heights)

### 4. Performance Optimization
- Limit products to 8-12 for faster loading
- Use Square or Portrait ratios for consistent layout
- Enable "Show secondary image" only if you have quality hover images

### 5. Quick Add Best Practices
- Works best with simple products (no variants)
- For complex products, use Quick View instead
- Can show both for maximum flexibility

## 🎨 Customization Examples

### Example 1: Elegant Fashion Store
```
Card Style: Modern
Hover Effect: Zoom
Image Ratio: Portrait
Show Vendor: Yes
Show Color Swatches: Yes
Text Alignment: Center
```

### Example 2: Tech/Electronics Store
```
Card Style: Elevated
Hover Effect: Shadow
Image Ratio: Square
Show Rating: Yes
Show Description: Yes
Badge Position: Top-right
```

### Example 3: Minimal Design
```
Card Style: Minimal
Hover Effect: None
Image Ratio: Adapt
Show Price: Yes
Text Alignment: Left
Background: White
```

### Example 4: Premium/Luxury Brand
```
Card Style: Bordered
Hover Effect: Overlay
Image Ratio: Portrait
Columns: 3
Show Secondary Image: Yes
Large Heading Size
```

## 🔧 Advanced Customization

### Custom CSS (Optional)
Add to your theme's custom CSS section:

```css
/* Adjust card spacing */
.modern-product-grid__grid {
  gap: 3rem; /* Increase gap between cards */
}

/* Custom badge colors */
.modern-badge--sale {
  background: #ff6b6b !important;
}

/* Adjust card border radius */
.style-modern .modern-product-card {
  border-radius: 20px;
}

/* Custom hover effect */
.modern-product-card:hover {
  transform: translateY(-5px) scale(1.02);
}
```

### Custom JavaScript (Optional)
Add custom behavior:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Track quick view clicks
  document.querySelectorAll('.modern-quick-btn--view').forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('Quick view clicked');
      // Add analytics tracking here
    });
  });
});
```

## 📱 Mobile Optimization

The section automatically optimizes for mobile:
- Responsive grid (1-2 columns)
- Touch-friendly buttons
- Optimized image sizes
- Reduced spacing for readability

## 🛠️ Troubleshooting

### Products Not Showing?
- Make sure you selected a collection in settings
- Check that the collection has products
- Verify products are published and available

### Quick Add Not Working?
- Works with simple products (single variant)
- Check JavaScript console for errors
- Ensure cart drawer/notification is set up

### Images Not Loading?
- Verify products have images uploaded
- Check image permissions in Shopify
- Clear browser cache

### Hover Effects Not Working?
- Ensure "Hover Effect" is not set to "None"
- Test in different browsers
- Check if animations are disabled in theme settings

## 🎯 Best Use Cases

1. **Homepage Featured Products** - Showcase bestsellers
2. **Collection Pages** - Enhanced product browsing
3. **Landing Pages** - Curated product selections
4. **Promotional Pages** - Sale/new arrivals sections
5. **Category Pages** - Organized product displays

## 📊 Performance Notes

- Lazy loading enabled for images
- Optimized animations (CSS-based)
- Minimal JavaScript for core features
- Responsive image loading
- Theme editor live preview supported

## 🔄 Updates & Maintenance

The section includes:
- Shopify 2.0 section standards
- Theme editor real-time preview
- Compatible with all standard themes
- No third-party dependencies
- Regular browser compatibility

## 💬 Support

For issues or customization help:
1. Check theme documentation
2. Review Shopify theme settings
3. Test in different browsers
4. Check browser console for errors

---

**Created:** February 2026
**Version:** 1.0
**Compatible:** Shopify 2.0 themes
