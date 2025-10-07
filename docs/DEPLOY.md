# GitHub Pages Deployment Guide

This documentation site is designed to be deployed on GitHub Pages.

## Quick Start

### 1. Enable GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to **Pages** (in the left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/docs** folder
5. Click **Save**

Your site will be live at: `https://brennanbrown.github.io/evolveu/`

### 2. Wait for Deployment

GitHub Pages will automatically build and deploy your site. This usually takes 1-2 minutes.

You can check the deployment status in the **Actions** tab of your repository.

## What's Included

### Static Site Files

- ✅ `index.html` - Beautiful landing page
- ✅ `style.css` - Modern, responsive styling
- ✅ `doc-style.css` - Documentation-specific styles
- ✅ `script.js` - Interactive features
- ✅ `_config.yml` - GitHub Pages configuration

### Documentation Files

All your markdown files are ready:
- `README.md`
- `INDEX.md`
- `00-testing.md`
- `01-getting-started.md`
- `02-dom.md`
- `03-objects.md`
- `04-react.md`
- `05-api.md`
- `06-python.md`
- `07-flask.md`

### Converting Markdown to HTML

GitHub Pages can automatically render markdown files, **OR** you can create HTML versions for more control.

#### Option 1: Let GitHub Handle It (Easiest)

Just enable GitHub Pages and it will render the `.md` files automatically with a basic theme.

#### Option 2: Custom HTML (Full Control)

Use the provided `template.html` to create HTML versions of each markdown file.

**Quick conversion script:**

```bash
# Install pandoc (if not already installed)
brew install pandoc  # macOS
# or
sudo apt-get install pandoc  # Linux

# Convert markdown to HTML
for file in *.md; do
    pandoc "$file" -o "${file%.md}.html" --template=template.html
done
```

**Or manually:**

```bash
# Example for one file
pandoc 00-testing.md -o 00-testing.html --standalone --css=style.css --css=doc-style.css
```

## Customization

### Update Your Information

Edit `index.html` and update:

- Your hero image URL (line ~89)
- Your GitHub username (throughout)
- Your website URLs (throughout)
- Your social media links

### Change Colors

Edit `style.css` and modify the CSS variables:

```css
:root {
    --primary: #6366f1;  /* Change this to your brand color */
    --secondary: #8b5cf6;
    --accent: #ec4899;
}
```

### Add Google Analytics

Edit `_config.yml` and uncomment:

```yaml
google_analytics: UA-XXXXXXXXX-X
```

## Features

### ✨ What's Built In

- 🎨 **Modern Design** - Clean, professional look
- 📱 **Fully Responsive** - Works on all devices
- 🚀 **Fast Loading** - Optimized performance
- 🔍 **SEO Optimized** - Meta tags, semantic HTML
- ♿ **Accessible** - ARIA labels, keyboard navigation
- 🎯 **Smooth Scrolling** - Enhanced UX
- 💫 **Animations** - Subtle, professional effects
- 🌙 **Print Friendly** - Optimized for printing

### Navigation Features

- Sticky navbar with scroll effects
- Breadcrumb navigation
- Sidebar module navigation
- Previous/Next page links
- Smooth anchor scrolling

### Interactive Elements

- Hover effects on cards
- Animated statistics counter
- Intersection Observer animations
- Syntax highlighted code blocks

## Troubleshooting

### Site Not Updating?

1. **Clear browser cache** (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. **Wait a few minutes** - GitHub Pages can take 2-5 minutes to update
3. **Check Actions tab** - See if the build succeeded

### 404 Errors?

Make sure your file paths are correct:
- All links should be relative (e.g., `00-testing.html` not `/00-testing.html`)
- CSS/JS files should be in the same directory as `index.html`

### Markdown Not Rendering?

If using Jekyll (GitHub's default):
1. Make sure `_config.yml` is in the `/docs` folder
2. Add front matter to markdown files:
```yaml
---
layout: default
title: Your Title
---
```

### Custom Domain?

To use a custom domain:
1. Go to repository **Settings** > **Pages**
2. Enter your domain in **Custom domain**
3. Add a `CNAME` file to `/docs` with your domain:
```
yourdomain.com
```

## Testing Locally

### Option 1: Simple HTTP Server

```bash
cd docs
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Option 2: With Jekyll (if using markdown)

```bash
cd docs
gem install bundler jekyll
bundle install
bundle exec jekyll serve
# Visit http://localhost:4000
```

## Performance Tips

### Optimize Images

Before adding images:
1. Resize to appropriate dimensions
2. Compress with tools like TinyPNG
3. Use modern formats (WebP) when possible

### Minify Assets

For production, consider minifying:
- CSS: `cssnano` or `clean-css`
- JavaScript: `terser` or `uglify-js`
- HTML: `html-minifier`

### Use CDNs

The template already uses CDNs for:
- Google Fonts
- Highlight.js (syntax highlighting)

## Maintenance

### Regular Updates

- Update documentation as you learn new things
- Fix broken links
- Update dependency versions
- Add new modules/sections

### Monitor Performance

Use tools like:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Pandoc Manual](https://pandoc.org/MANUAL.html)

## Support

If you encounter issues:
1. Check the [GitHub Pages status](https://www.githubstatus.com/)
2. Review the [GitHub Pages troubleshooting guide](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-custom-domains-and-github-pages)
3. Open an issue in your repository

---

**Your documentation site is ready to go live! 🚀**

Just commit and push to GitHub, then enable GitHub Pages in your repository settings.
