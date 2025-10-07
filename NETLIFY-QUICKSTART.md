# ⚡ Netlify Quick Start

Deploy your EvolveU docs to: **https://brennan-evolveu.netlify.app**

---

## 🚀 **Deploy in 2 Minutes**

### **Method 1: Drag & Drop** (Fastest)

1. Go to: https://app.netlify.com/drop
2. Drag the `/docs` folder into the browser
3. Wait 30 seconds
4. Change site name to `brennan-evolveu`
5. Done! ✨

### **Method 2: GitHub Integration** (Recommended)

```bash
# 1. Push to GitHub
git add .
git commit -m "Add Netlify config"
git push origin main

# 2. Connect on Netlify
# - Go to https://app.netlify.com/
# - Click "Add new site" → "Import project"
# - Choose GitHub → Select "brennanbrown/evolveu"
# - Click "Deploy" (settings auto-detected from netlify.toml)

# 3. Change site name to "brennan-evolveu"
# - Site settings → Change site name

# 4. Visit your site!
# https://brennan-evolveu.netlify.app
```

---

## ✅ **What's Configured**

Your `netlify.toml` includes:

✅ **Publish directory**: `docs/`  
✅ **Pretty URLs**: No `.html` extensions needed  
✅ **Security headers**: XSS protection, CSP, etc.  
✅ **Asset optimization**: Auto-minify CSS/JS  
✅ **Image compression**: Automatic  
✅ **404 handling**: Redirects to homepage  
✅ **Free SSL**: HTTPS automatically  

---

## 🔄 **Auto-Deploy Setup**

Once connected to GitHub:

1. ✅ Every push to `main` = automatic deployment
2. ✅ Pull requests = deploy preview
3. ✅ Deploy time: ~30 seconds
4. ✅ No manual steps needed!

---

## 🎯 **URLs**

**Production**: https://brennan-evolveu.netlify.app  
**Admin**: https://app.netlify.com/sites/brennan-evolveu

**Module URLs** (pretty URLs enabled):
- `/00-testing` → Testing Fundamentals
- `/01-getting-started` → JavaScript Basics
- `/02-dom` → DOM Manipulation
- `/03-objects` → Objects & APIs
- `/04-react` → React Applications
- `/05-api` → Flask API Server
- `/06-python` → Python Fundamentals
- `/07-flask` → Flask Full-Stack

---

## 📚 **Full Documentation**

- **Comprehensive Guide**: [docs/NETLIFY-DEPLOY.md](./docs/NETLIFY-DEPLOY.md)
- **Website Info**: [docs/WEBSITE-README.md](./docs/WEBSITE-README.md)
- **GitHub Pages Alternative**: [docs/DEPLOY.md](./docs/DEPLOY.md)

---

## 🐛 **Troubleshooting**

**Site not updating?**
- Check deploy status at app.netlify.com
- Clear browser cache (Cmd+Shift+R)
- Wait 2-3 minutes for CDN

**404 errors?**
- Ensure `_redirects` file is in `/docs`
- Check `netlify.toml` publish directory

**Need help?**
- [Netlify Docs](https://docs.netlify.com/)
- [Community Forum](https://answers.netlify.com/)

---

**Your site is ready to deploy! 🚀**

Choose Method 1 for instant deploy or Method 2 for automatic deployments.
