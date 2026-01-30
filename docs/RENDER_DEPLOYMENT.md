# Render Deployment Documentation - Campus Connect

## Overview

This document details the deployment of Campus Connect on Render.com for free hosting.

**Deployment Date:** 30th January 2026  
**Status:** ✅ Successfully Deployed

---

## Live URLs

| Service | URL |
|---------|-----|
| **Frontend** | https://campusconnect-h2kn.onrender.com |
| **Backend** | https://campus-connect-backend-zdfh.onrender.com |

---

## Architecture

```
GitHub Repository
        │
        ▼
    Render.com
        ├── Static Site (Frontend)
        │       └── React Build → Nginx-like serving
        │
        └── Web Service (Backend)
                └── Node.js Express API
                        │
                        ▼
                MongoDB Atlas (Database)
```

---

## Deployment Steps

### Step 1: Backend Deployment (Web Service)

1. Go to Render Dashboard → "New +" → "Web Service"
2. Connect GitHub repository: `Campus-Connect`
3. Configuration:
   - **Name:** `campus-connect-backend`
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Environment Variables:
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = (MongoDB Atlas connection string)
   - `JWT_SECRET` = (secret string)
5. Select Free plan → Create

---

### Step 2: Frontend Deployment (Static Site)

1. Go to Render Dashboard → "New +" → "Static Site"
2. Connect GitHub repository: `Campus-Connect`
3. Configuration:
   - **Name:** `campus-connect-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. Create Static Site

---

### Step 3: Configure Rewrite Rules (Critical!)

The frontend needs to proxy API calls to the backend.

1. Go to Render Dashboard → `campus-connect-frontend`
2. Click "Redirects/Rewrites" (left sidebar)
3. Add these rules:

| Source | Destination | Action |
|--------|-------------|--------|
| `/api/*` | `https://campus-connect-backend-zdfh.onrender.com/api/*` | Rewrite |
| `/*` | `/index.html` | Rewrite |

4. Save → Wait for redeploy

---

## Free Tier Limitations

| Limitation | Description |
|------------|-------------|
| **Sleep after 15 min** | Free services spin down after 15 minutes of inactivity |
| **Cold start** | First request after sleep takes 30-60 seconds |
| **750 hours/month** | Shared between all free services |

---

## Troubleshooting

### API calls returning 404
- Check rewrite rules are configured correctly
- Ensure backend URL in destination is correct
- Verify backend service is running

### Login not working
- Check MongoDB Atlas IP whitelist (should allow all: `0.0.0.0/0`)
- Verify environment variables are set correctly
- Check backend logs in Render dashboard

### Images not loading
- Images uploaded locally won't persist on Render
- Consider using cloud storage (Cloudinary, S3) for production

---

## Monitoring

- **Backend Logs:** Render Dashboard → campus-connect-backend → Logs
- **Frontend Logs:** Render Dashboard → campus-connect-frontend → Logs
- **Metrics:** Render Dashboard → Service → Metrics tab

---

## Lessons Learned

1. **Rewrite rules are essential** for Static Sites that call APIs
2. **Environment variables** must be set in Render dashboard, not in code
3. **Free tier has cold starts** - first request after inactivity is slow
4. **Render auto-deploys** on every push to main branch
