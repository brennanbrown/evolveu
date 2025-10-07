# 🚀 Netlify Deployment Guide

Deploy your EvolveU documentation to **https://brennan-evolveu.netlify.app**

---

## ⚡ Quick Deploy (Method 1: Drag & Drop)

### **Fastest Way to Deploy**

1. **Go to Netlify**: https://app.netlify.com/drop
2. **Drag and drop** the entire `/docs` folder
3. **Wait** ~30 seconds for deployment
4. **Visit** your site at the temporary URL
5. **Change site name** to `brennan-evolveu`
6. **Done!** Visit: https://brennan-evolveu.netlify.app

---

## 🔗 GitHub Integration (Method 2: Recommended)

### **Automatic Deployments from GitHub**

#### **Step 1: Push to GitHub**
```bash
cd /Users/brennan/Documents/GitHub/evolveu
git add .
git commit -m "Add Netlify configuration"
git push origin main
```

#### **Step 2: Connect to Netlify**

1. Go to: https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub
5. Select repository: **brennanbrown/evolveu**

#### **Step 3: Configure Build Settings**

Netlify will auto-detect from `netlify.toml`, but verify:

```
Branch to deploy:     main
Publish directory:    docs
Build command:        (leave empty)
```

#### **Step 4: Deploy**

1. Click **"Deploy site"**
2. Wait ~1 minute for initial deployment
3. Site will be live at: `random-name-12345.netlify.app`

#### **Step 5: Change Site Name**

1. Go to **Site settings** → **Site details**
2. Click **"Change site name"**
3. Enter: `brennan-evolveu`
4. Confirm

**Your site is now live at:** https://brennan-evolveu.netlify.app

---

## 🎯 What's Configured

### **In `netlify.toml`**

✅ **Publish Directory**: `docs/`  
✅ **Security Headers**: X-Frame-Options, CSP, etc.  
✅ **Cache Control**: Optimized for static assets  
✅ **Pretty URLs**: Removes `.html` extensions  
✅ **404 Handling**: Redirects to homepage  
✅ **Asset Optimization**: CSS/JS minification  
✅ **Image Compression**: Automatic optimization  

### **In `_redirects`**

✅ **Markdown to HTML**: `/00-testing` → `/00-testing.html`  
✅ **Pretty URLs**: Clean URLs without extensions  
✅ **404 Fallback**: Redirect to index.html  

---

## 🔄 Automatic Deployments

Once connected to GitHub, Netlify will automatically:

- ✅ Deploy when you push to `main` branch
- ✅ Generate deploy previews for pull requests
- ✅ Run build optimizations
- ✅ Invalidate CDN cache
- ✅ Send deploy notifications

**Every git push = automatic deployment!** 🎉

---

## 🛠️ Netlify Features You Get

### **Performance**
- 🚀 **Global CDN** - Fast worldwide
- ⚡ **HTTP/2** - Parallel downloads
- 📦 **Asset Optimization** - Automatic minification
- 🖼️ **Image Processing** - Automatic compression
- 💾 **Edge Caching** - Lightning-fast loads

### **Security**
- 🔒 **Free SSL** - HTTPS automatically
- 🛡️ **Security Headers** - XSS protection
- 🔐 **DDoS Protection** - Automatic mitigation

### **Developer Experience**
- 🔄 **Deploy Previews** - Test before merge
- 📊 **Analytics** - Visitor stats (optional)
- 🔔 **Deploy Notifications** - Email/Slack/Discord
- 🎯 **Split Testing** - A/B testing
- 📝 **Forms** - Built-in form handling

---

## 📊 Netlify Dashboard

After deployment, access these features:

### **Deploys Tab**
- View all deployments
- Roll back to previous versions
- See deploy logs
- Trigger manual deploys

### **Site Settings**
- Change site name
- Configure custom domain
- Set environment variables
- Configure notifications

### **Domain Settings**
- Use custom domain (optional)
- Configure DNS
- Enable HTTPS
- Set up redirects

---

## 🌐 Custom Domain (Optional)

If you want to use your own domain:

### **Step 1: Add Domain**
1. Go to **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `evolveu.brennanbrown.ca`)

### **Step 2: Configure DNS**

Add these DNS records to your domain:

```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     brennan-evolveu.netlify.app
```

Or use Netlify DNS for automatic configuration.

### **Step 3: Enable HTTPS**

Netlify will automatically provision an SSL certificate via Let's Encrypt.

---

## 🔧 Local Testing with Netlify Dev

Test your site locally with Netlify's environment:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
ntl login

# Link to your site
ntl link

# Start local dev server
ntl dev
```

Visit: http://localhost:8888

This simulates the exact Netlify environment locally!

---

## 📝 Updating Your Site

### **Quick Updates**

```bash
cd /Users/brennan/Documents/GitHub/evolveu

# Make changes to files in /docs
# Then commit and push

git add docs/
git commit -m "Update documentation"
git push origin main

# Netlify automatically deploys in ~1 minute
```

### **Instant Rollback**

If something breaks:

1. Go to **Deploys** tab
2. Find last working deploy
3. Click **"Publish deploy"**
4. Done! Site rolled back instantly

---

## 🎨 Build Optimizations

Netlify automatically:

- ✅ Minifies CSS and JavaScript
- ✅ Compresses images
- ✅ Bundles assets
- ✅ Generates source maps
- ✅ Enables Brotli compression
- ✅ Sets optimal cache headers

**No configuration needed!** All handled by `netlify.toml`.

---

## 🐛 Troubleshooting

### **Site Not Updating?**

1. Check deploy status in Netlify dashboard
2. Look for errors in deploy log
3. Clear browser cache (Cmd+Shift+R)
4. Wait 2-3 minutes for CDN propagation

### **404 Errors?**

- Verify file names match links
- Check `_redirects` file is in `/docs`
- Ensure `netlify.toml` has correct publish directory

### **CSS Not Loading?**

- Check file paths are relative
- Verify files are in `/docs` folder
- Look at Network tab in browser DevTools

### **Deploy Failed?**

Check Netlify deploy log:
1. Go to **Deploys** tab
2. Click on failed deploy
3. Read error message
4. Fix issue and push again

---

## 📊 Analytics (Optional)

Enable Netlify Analytics:

1. Go to **Analytics** tab
2. Enable **Netlify Analytics** ($9/month)
3. View real-time visitor stats
4. No JavaScript tracking - server-side!

**Alternative:** Use free Google Analytics (already configured in `_config.yml`)

---

## 🔔 Deploy Notifications

Get notified of deployments:

### **Email Notifications**
- Go to **Site settings** → **Build & deploy** → **Deploy notifications**
- Add email for deploy success/failure

### **Slack Integration**
- Add Slack webhook URL
- Get notified in your channel

### **Discord Webhook**
- Add Discord webhook URL
- Deploy notifications in Discord

---

## 🎯 Next Steps After Deploy

1. ✅ Test all links on live site
2. ✅ Share URL on social media
3. ✅ Add to your portfolio
4. ✅ Update resume with link
5. ✅ Submit to showcases

### **Share Your Site**

- 🐦 Twitter: "Check out my bootcamp documentation: https://brennan-evolveu.netlify.app"
- 💼 LinkedIn: Add to Featured section
- 📧 Email signature: Include link
- 📝 Dev.to/Medium: Write about it
- 🎓 Bootcamp alumni: Share with cohort

---

## 💡 Pro Tips

### **Branch Deploys**
Create branch previews automatically:
```bash
git checkout -b feature/new-module
# Make changes
git push origin feature/new-module
# Netlify creates preview at: feature-new-module--brennan-evolveu.netlify.app
```

### **Deploy Contexts**
Configure different settings for:
- Production (main branch)
- Deploy previews (PRs)
- Branch deploys (other branches)

### **Environment Variables**
Store secrets in Netlify:
1. Go to **Site settings** → **Environment variables**
2. Add variables (API keys, etc.)
3. Access in build process

---

## 📚 Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify CLI Reference](https://cli.netlify.com/)
- [Netlify Community Forum](https://answers.netlify.com/)
- [Status Page](https://www.netlifystatus.com/)

---

## 🆘 Support

Need help?

- 📖 [Netlify Docs](https://docs.netlify.com/)
- 💬 [Community Forum](https://answers.netlify.com/)
- 📧 [Support Email](mailto:support@netlify.com)
- 🐦 [Twitter](https://twitter.com/netlify)

---

## ✅ Deployment Checklist

Before going live:

- [ ] Commit all files to GitHub
- [ ] Push to main branch
- [ ] Connect repository to Netlify
- [ ] Configure site name to `brennan-evolveu`
- [ ] Verify all links work
- [ ] Test on mobile devices
- [ ] Check all images load
- [ ] Test navigation
- [ ] Verify BerryHouse links
- [ ] Test external links (portfolio, GitHub, resume)
- [ ] Check syntax highlighting on code blocks
- [ ] Share with friends/colleagues

---

## 🎉 You're All Set!

Your documentation site will be live at:

**https://brennan-evolveu.netlify.app**

With:
- ⚡ Automatic deployments from GitHub
- 🚀 Global CDN for fast loading
- 🔒 Free SSL certificate
- 📊 Deploy previews for PRs
- 🔄 Instant rollback capability
- 💾 Asset optimization
- 🎯 Pretty URLs

**Deploy and share your amazing work! 🌍✨**
