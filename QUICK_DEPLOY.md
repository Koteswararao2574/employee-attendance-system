# Quick Deployment Checklist

## 🚀 Fast Track Deployment

### Prerequisites Checklist
- [ ] GitHub repository with your code
- [ ] MongoDB Atlas account (free tier)
- [ ] Render account (free tier available)
- [ ] Vercel account (free tier available)

---

## Step 1: MongoDB Atlas Setup (5 minutes)

1. **Create Cluster**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → Create Free Cluster
2. **Create Database User**: Database Access → Add User → Save credentials
3. **Whitelist IPs**: Network Access → Allow Access from Anywhere
4. **Get Connection String**: 
   - Database → Connect → Connect your application
   - Copy string and replace `<password>` and `<dbname>`
   - Example: `mongodb+srv://user:pass@cluster.mongodb.net/attendance?retryWrites=true&w=majority`

---

## Step 2: Deploy Backend to Render (10 minutes)

### Via Dashboard:
1. Go to [render.com](https://render.com) → **New +** → **Web Service**
2. Connect GitHub repo
3. Settings:
   - **Name**: `employee-attendance-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
4. **Environment Variables** (Add these):
   ```
   MONGODB_URI = [your MongoDB connection string]
   JWT_SECRET = [generate random string]
   NODE_ENV = production
   FRONTEND_URL = [will add after Vercel deployment]
   ```
5. Click **Create Web Service**
6. **Wait for deployment** → Copy backend URL (e.g., `https://xxx.onrender.com`)

---

## Step 3: Deploy Frontend to Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import GitHub repo
3. Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
4. **Environment Variables**:
   ```
   VITE_API_URL = https://[your-render-backend-url].onrender.com/api
   ```
5. Click **Deploy**
6. **Copy frontend URL** (e.g., `https://xxx.vercel.app`)

---

## Step 4: Update Backend CORS (2 minutes)

1. Go back to Render dashboard
2. Open your backend service → **Environment** tab
3. Add/Update:
   ```
   FRONTEND_URL = https://[your-vercel-frontend-url].vercel.app
   ```
4. **Manual Deploy** → **Clear build cache & deploy**

---

## Step 5: Test (2 minutes)

1. **Backend Health**: Visit `https://[backend-url].onrender.com/health`
   - Should show: `{"status":"OK","message":"Server is running"}`

2. **Frontend**: Visit your Vercel URL
   - Try registering a new user
   - Try logging in
   - Check browser console for errors

---

## ✅ Done!

**Your URLs:**
- Frontend: `https://[your-project].vercel.app`
- Backend: `https://[your-backend].onrender.com`

---

## 🔄 Future Updates

Just push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Both Render and Vercel will auto-deploy!

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| CORS errors | Update `FRONTEND_URL` in Render env vars |
| Database connection fails | Check MongoDB URI and IP whitelist |
| Build fails | Check logs in Render/Vercel dashboard |
| API calls fail | Verify `VITE_API_URL` in Vercel env vars |

---

## 📞 Need Help?

- Check full guide: `DEPLOYMENT.md`
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs

