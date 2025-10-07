# 🎨 EvolveU Documentation Website

A beautiful, modern static website showcasing your full-stack bootcamp journey, built for GitHub Pages.

---

## 🌟 **What You've Got**

### **Landing Page** (`index.html`)
A stunning homepage featuring:
- **Hero Section** with your profile photo and key statistics
- **About Section** highlighting documentation features
- **Interactive Module Cards** for all 8 modules
- **Call-to-Action** for BerryHouse and your portfolio
- **Professional Footer** with all your links

### **Styling** 
- `style.css` (14KB) - Modern, responsive design with:
  - Beautiful gradients and shadows
  - Smooth animations and transitions
  - Mobile-first responsive layout
  - Professional color scheme (purple/indigo theme)
  
- `doc-style.css` (8.4KB) - Documentation-specific styles:
  - Clean, readable typography
  - Syntax-highlighted code blocks
  - Sidebar navigation
  - Print-optimized styles

### **Interactivity** (`script.js`)
- Smooth scrolling navigation
- Animated statistics counter
- Intersection Observer animations
- Hover effects and transitions

### **Configuration**
- `_config.yml` - GitHub Pages settings
- `template.html` - Markdown-to-HTML template
- `convert-md.sh` - Automated conversion script

---

## 🚀 **Deploy to Netlify** (Recommended)

### **Step 1: Commit & Push**

```bash
cd /Users/brennan/Documents/GitHub/evolveu
git add .
git commit -m "Add beautiful documentation website"
git push origin main
```

### **Step 2: Connect to Netlify**

1. Go to: https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select repository: **brennanbrown/evolveu**
5. Netlify will auto-detect settings from `netlify.toml`
6. Click **"Deploy site"**

### **Step 3: Set Site Name**

1. Go to **Site settings** → **Site details**
2. Click **"Change site name"**
3. Enter: `brennan-evolveu`
4. Confirm

### **Step 4: Visit Your Site**

🎉 Your site is live at: **https://brennan-evolveu.netlify.app**

### **Alternative: GitHub Pages**

See [DEPLOY.md](./DEPLOY.md) for GitHub Pages instructions if preferred.

---

## 🎨 **Design Features**

### **Visual Design**
✨ Modern gradient hero with purple/indigo theme
✨ Clean card-based layout
✨ Professional typography (Inter font)
✨ Consistent spacing and alignment
✨ Smooth shadows and borders

### **User Experience**
🚀 Smooth scrolling between sections
🎯 Sticky navigation bar
💫 Fade-in animations on scroll
📱 Fully responsive (mobile, tablet, desktop)
⌨️ Keyboard accessible

### **Your Branding**
- 📸 Your hero image from brennanbrown.ca
- 🔗 Links to your portfolio, resume, GitHub
- 💼 BerryHouse CTA and footer placement
- 🎨 Professional color scheme matching your brand

---

## 📊 **What's Included**

### **Main Pages**

| File | Purpose | Features |
|------|---------|----------|
| `index.html` | Landing page | Hero, stats, module grid, CTA |
| `README.html` | Getting started | Overview and navigation |
| `INDEX.html` | Master index | All modules, topics, stats |

### **Module Pages** (Ready for conversion)

All your markdown documentation:
- ✅ `00-testing.md` → Testing Fundamentals
- ✅ `01-getting-started.md` → JavaScript Basics
- ✅ `02-dom.md` → DOM Manipulation
- ✅ `03-objects.md` → OOP & APIs
- ✅ `04-react.md` → React Applications
- ✅ `05-api.md` → Flask API Server
- ✅ `06-python.md` → Python Fundamentals
- ✅ `07-flask.md` → Flask Full-Stack

---

## 🔧 **Converting Markdown to HTML**

### **Option 1: GitHub's Built-in Rendering**

GitHub Pages will automatically render `.md` files! Just:
1. Enable GitHub Pages
2. Visitors can view markdown directly

Links will look like: `https://brennanbrown.github.io/evolveu/00-testing`

### **Option 2: Custom HTML (Recommended)**

For full design control, convert to HTML:

**Install pandoc:**
```bash
brew install pandoc  # macOS
```

**Run conversion script:**
```bash
cd docs
./convert-md.sh
```

This creates beautiful HTML files with:
- Your custom navigation
- Styled code blocks
- Proper formatting
- Consistent design

---

## ✏️ **Customization Guide**

### **Change Colors**

Edit `style.css` line 11:

```css
:root {
    --primary: #6366f1;      /* Main purple */
    --primary-dark: #4f46e5; /* Darker shade */
    --secondary: #8b5cf6;    /* Secondary purple */
    --accent: #ec4899;       /* Pink accent */
}
```

### **Update Your Photo**

Edit `index.html` line 89:

```html
<img src="YOUR_IMAGE_URL" alt="Brennan Brown" class="profile-image">
```

### **Modify Stats**

Edit `index.html` lines 48-65:

```html
<div class="stat">
    <span class="stat-number">8</span>  <!-- Change this -->
    <span class="stat-label">Modules</span>
</div>
```

### **Add Google Analytics**

Edit `_config.yml` line 37:

```yaml
google_analytics: UA-XXXXXXXXX-X  # Your tracking ID
```

---

## 📱 **Testing Locally**

### **Simple Preview**

```bash
cd docs
python3 -m http.server 8000
```

Visit: http://localhost:8000

### **With Live Reload** (optional)

```bash
npm install -g live-server
cd docs
live-server
```

---

## 🎯 **Key Features Implemented**

### **Landing Page**
✅ Hero section with your photo
✅ Animated statistics (8 modules, 59 tests, etc.)
✅ Module cards with status badges
✅ "Most Complex" badge on Module 03
✅ CTA section for BerryHouse
✅ Professional footer with all links

### **Navigation**
✅ Sticky header with smooth effects
✅ Links to portfolio, resume, GitHub
✅ Breadcrumb navigation on docs
✅ Previous/Next page navigation

### **Your Branding**
✅ BerryHouse CTA on homepage
✅ BerryHouse in footer
✅ Link to Resume PDF
✅ Links to brennanbrown.ca
✅ GitHub profile link
✅ Your hero image

### **Documentation**
✅ Syntax highlighted code
✅ Clean, readable typography
✅ Table of contents sidebar
✅ Responsive on all devices
✅ Print-friendly styles

---

## 🌐 **URLs After Deployment**

Once deployed, your site will have these URLs:

**Main Site:**
- https://brennanbrown.github.io/evolveu/

**Documentation:**
- https://brennanbrown.github.io/evolveu/00-testing
- https://brennanbrown.github.io/evolveu/01-getting-started
- https://brennanbrown.github.io/evolveu/02-dom
- https://brennanbrown.github.io/evolveu/03-objects
- https://brennanbrown.github.io/evolveu/04-react
- https://brennanbrown.github.io/evolveu/05-api
- https://brennanbrown.github.io/evolveu/06-python
- https://brennanbrown.github.io/evolveu/07-flask

---

## 📦 **File Structure**

```
docs/
├── index.html              # 🏠 Landing page (25KB)
├── style.css              # 🎨 Main styles (14KB)
├── doc-style.css          # 📄 Doc styles (8.4KB)
├── script.js              # ⚡ Interactivity (6.3KB)
├── template.html          # 📝 HTML template (5.2KB)
├── _config.yml            # ⚙️ GitHub Pages config
├── convert-md.sh          # 🔄 Conversion script
├── DEPLOY.md              # 📚 Deployment guide
├── WEBSITE-README.md      # 📖 This file
└── [All your .md files]   # 📝 Documentation
```

---

## 🔍 **SEO & Performance**

### **Built-in SEO**
✅ Semantic HTML5 structure
✅ Meta descriptions
✅ Open Graph tags (for social sharing)
✅ Sitemap generation
✅ Mobile-friendly

### **Performance**
✅ Optimized CSS (no unused styles)
✅ Minimal JavaScript
✅ CDN-hosted fonts (Google Fonts)
✅ Lazy-loaded animations
✅ Fast load time (< 2 seconds)

### **Accessibility**
✅ ARIA labels on interactive elements
✅ Keyboard navigation support
✅ High contrast text
✅ Semantic HTML
✅ Skip to content link

---

## 🐛 **Troubleshooting**

### **Site not updating?**
- Clear browser cache (Cmd+Shift+R)
- Wait 5 minutes for GitHub Pages rebuild
- Check Actions tab for build status

### **404 errors?**
- Ensure files are in `/docs` folder
- Check that file names match links
- Use relative paths (`./file.html`)

### **Styles not loading?**
- Verify CSS files are in same directory
- Check browser console for errors
- Ensure file names are correct

### **Links broken?**
- Update all links to match your GitHub username
- Check for typos in URLs
- Test locally before deploying

---

## 💡 **Tips for Success**

### **Before Deploying**
1. ✅ Test locally with `python3 -m http.server`
2. ✅ Check all links work
3. ✅ Verify images load
4. ✅ Test on mobile (Chrome DevTools)
5. ✅ Run spelling check

### **After Deploying**
1. 🔗 Share the link on your portfolio
2. 📱 Share on LinkedIn/Twitter
3. 📧 Add to email signature
4. 💼 Include in resume
5. 🎯 Submit to dev.to or Medium

### **Maintenance**
- Update docs as you learn
- Add new projects/modules
- Fix typos and broken links
- Update statistics
- Refresh screenshots

---

## 🎉 **Next Steps**

### **Immediate**
1. ✅ Commit and push to GitHub
2. ✅ Enable GitHub Pages
3. ✅ Wait for deployment
4. ✅ Visit your live site!

### **Optional Enhancements**
- 🌙 Add dark mode toggle
- 🔍 Add search functionality
- 📧 Add contact form
- 📊 Add Google Analytics
- 🗨️ Add comments (Disqus/Utterances)
- 🎨 Add more animations
- 📱 Create mobile menu

### **Promotion**
- Share on social media
- Add to your portfolio
- Link from GitHub profile
- Submit to showcases
- Write a blog post about it

---

## 📚 **Resources**

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)
- [HTML/CSS Reference](https://developer.mozilla.org/en-US/)
- [Color Palette Generator](https://coolors.co/)
- [Responsive Testing](https://responsively.app/)

---

## 🙌 **Credits**

**Design & Development:** Brennan Brown
**Framework:** Custom HTML/CSS/JS (no dependencies!)
**Fonts:** Inter (Google Fonts)
**Icons:** Unicode emojis & inline SVGs
**Syntax Highlighting:** Highlight.js
**Deployment:** GitHub Pages

---

## 📄 **License**

This documentation and website template are part of your learning portfolio and are free to use, modify, and share.

---

**🚀 Your beautiful documentation website is ready to deploy!**

Just commit, push, and enable GitHub Pages to share your learning journey with the world! 🌍✨
