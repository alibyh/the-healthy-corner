# Custom Domain Setup Guide
## Domain: healthycornermauritanie.me

This guide explains how to configure and deploy your website to the custom domain `healthycornermauritanie.me`.

## Changes Made

### 1. Next.js Configuration (`next.config.ts`)
- ✅ Removed `basePath: '/the-healthy-corner'`
- ✅ Removed `assetPrefix: '/the-healthy-corner'`
- These were needed for GitHub Pages subdirectory deployment but are not needed for a custom domain

### 2. Constants (`src/lib/constants.ts`)
- ✅ Updated `BASE_PATH` from `'/the-healthy-corner'` to `''` (empty string)
- All image paths will now resolve correctly at the root level

### 3. Metadata (`src/app/layout.tsx`)
- ✅ Added `metadataBase` with your custom domain
- ✅ Added `openGraph.url` for proper social media sharing

## Deployment Options

### Option 1: Vercel (Recommended)
Vercel is the easiest option for Next.js static exports:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd healthy-corner
   vercel
   ```

4. **Add Custom Domain**:
   - Go to your project settings on Vercel dashboard
   - Navigate to "Domains"
   - Add `healthycornermauritanie.me`
   - Add `www.healthycornermauritanie.me` (optional)
   - Follow DNS configuration instructions

5. **DNS Configuration**:
   - Add an A record pointing to Vercel's IP (provided in dashboard)
   - Or add a CNAME record pointing to your Vercel deployment URL
   - Wait for DNS propagation (can take up to 48 hours)

### Option 2: Netlify
Netlify also supports static Next.js sites:

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Build your site**:
   ```bash
   cd healthy-corner
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=out
   ```

4. **Add Custom Domain**:
   - In Netlify dashboard, go to Site settings → Domain management
   - Add your custom domain
   - Configure DNS as instructed

### Option 3: GitHub Pages (with Custom Domain)
If you want to keep using GitHub Pages:

1. **Build the site**:
   ```bash
   cd healthy-corner
   npm run build
   ```

2. **Push to GitHub** (if using GitHub Actions or manual deployment)

3. **Configure Custom Domain in GitHub**:
   - Go to your repository settings
   - Navigate to "Pages"
   - Under "Custom domain", enter `healthycornermauritanie.me`
   - GitHub will create a CNAME file automatically

4. **DNS Configuration**:
   - Add a CNAME record in your domain registrar:
     - Name: `@` (or root domain)
     - Value: `your-username.github.io`
   - Or use A records (IPs provided by GitHub)

### Option 4: Traditional Web Hosting
If you have a traditional web hosting service:

1. **Build the site**:
   ```bash
   cd healthy-corner
   npm run build
   ```

2. **Upload the `out` folder**:
   - Upload all contents of the `out` directory to your web root (usually `public_html` or `www`)
   - Ensure `.htaccess` or server config handles Next.js routing

3. **Configure DNS**:
   - Point your domain's A record to your hosting server's IP
   - Or use CNAME if your host provides one

## DNS Configuration

### Required DNS Records

**For Vercel/Netlify:**
- **CNAME Record** (recommended):
  - Name: `@` (or leave blank for root)
  - Value: `cname.vercel-dns.com` (or your provider's CNAME)
  
- **A Record** (alternative):
  - Name: `@`
  - Value: Provider's IP address (check their documentation)

**For www subdomain:**
- **CNAME Record**:
  - Name: `www`
  - Value: `healthycornermauritanie.me` (or provider's CNAME)

### SSL Certificate
Most modern hosting providers (Vercel, Netlify, GitHub Pages) automatically provide SSL certificates via Let's Encrypt. Your site will be accessible via `https://healthycornermauritanie.me`.

## Testing Locally

After making these changes, test locally:

```bash
cd healthy-corner
npm run build
npm run start
```

Visit `http://localhost:3000` and verify:
- ✅ All images load correctly
- ✅ Navigation links work
- ✅ No 404 errors
- ✅ Routes work properly

## Environment Variables

Make sure your `.env.local` file has the correct Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Post-Deployment Checklist

After deploying to your custom domain:

- [ ] Visit `https://healthycornermauritanie.me` and verify the site loads
- [ ] Test all navigation links
- [ ] Verify images load correctly
- [ ] Test on mobile devices
- [ ] Check that social media sharing works (Open Graph tags)
- [ ] Verify SSL certificate is active (https://)
- [ ] Test search functionality
- [ ] Test language switching (English/Arabic)
- [ ] Verify Supabase connection works
- [ ] Check Google Analytics (if configured)
- [ ] Test form submissions (if any)

## Troubleshooting

### Images Not Loading
- Check that image paths don't have double slashes (`//`)
- Verify images exist in `public/images/` directory
- Check browser console for 404 errors

### 404 Errors on Routes
- Ensure your hosting provider supports client-side routing
- For static hosting, you may need to configure redirects
- Check that `output: 'export'` is set in `next.config.ts`

### DNS Not Resolving
- DNS changes can take 24-48 hours to propagate
- Use `nslookup healthycornermauritanie.me` to check DNS
- Verify DNS records are correct in your domain registrar

### SSL Certificate Issues
- Most providers auto-configure SSL
- If not, contact your hosting provider
- Ensure your DNS is pointing correctly before SSL can be issued

## Next Steps

1. **SEO Optimization**:
   - Submit sitemap to Google Search Console
   - Verify domain ownership
   - Set up Google Analytics (if needed)

2. **Performance**:
   - Test site speed with PageSpeed Insights
   - Optimize images if needed
   - Consider CDN for static assets

3. **Monitoring**:
   - Set up uptime monitoring
   - Configure error tracking (Sentry, etc.)
   - Monitor analytics

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify DNS configuration
3. Test locally first
4. Check hosting provider documentation
5. Review Next.js deployment documentation

---

**Domain**: healthycornermauritanie.me  
**Last Updated**: After domain purchase  
**Status**: Ready for deployment
