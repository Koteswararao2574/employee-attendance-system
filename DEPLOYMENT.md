# Deployment Guide: Employee Attendance System

This guide will walk you through deploying your Employee Attendance System to **Render** (Backend) and **Vercel** (Frontend).

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
4. **MongoDB Atlas Account** - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) (for database)

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and sign in
3. Create a new cluster (choose the FREE tier)
4. Create a database user:
   - Go to **Database Access** → **Add New Database User**
   - Choose **Password** authentication
   - Create a username and password (save these!)
   - Set user privileges to **Read and write to any database**
5. Whitelist IP addresses:
   - Go to **Network Access** → **Add IP Address**
   - Click **Allow Access from Anywhere** (or add specific IPs)
6. Get your connection string:
   - Go to **Database** → **Connect** → **Connect your application**
   - Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`)
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `attendance-system`)

**Save this connection string - you'll need it for Render!**

---

## 🚀 Step 2: Deploy Backend to Render

### 2.1 Prepare Backend for Deployment

1. **Add start script to backend/package.json** (already done if you see it)
   - Make sure you have: `"start": "node src/server.js"`

2. **Create render.yaml** (already created - see below)

### 2.2 Deploy on Render

#### Option A: Using Render Dashboard (Recommended)

1. Go to [render.com](https://render.com) and sign in
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `employee-attendance-backend` (or any name you prefer)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or `master`)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - Click **Environment** tab
   - Add these variables:
     ```
     MONGODB_URI = your_mongodb_connection_string_from_atlas
     PORT = 10000 (or leave empty, Render will set it automatically)
     JWT_SECRET = your_super_secret_jwt_key_here (generate a random string)
     NODE_ENV = production
     ```
6. Click **Create Web Service**
7. Wait for deployment to complete (usually 2-5 minutes)
8. **Copy your backend URL** (e.g., `https://employee-attendance-backend.onrender.com`)

#### Option B: Using render.yaml (Infrastructure as Code)

1. Push your code to GitHub (make sure `render.yaml` is in the root)
2. Go to Render Dashboard → **New +** → **Blueprint**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and create the service
5. Add environment variables in the Render dashboard (same as above)

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Prepare Frontend for Deployment

1. **Update vite.config.js** (already done - see below)
2. **Create vercel.json** (already created - see below)

### 3.2 Deploy on Vercel

#### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New...** → **Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   - Click **Environment Variables**
   - Add:
     ```
     VITE_API_URL = https://your-backend-url.onrender.com/api
     ```
   - Replace `your-backend-url.onrender.com` with your actual Render backend URL
6. Click **Deploy**
7. Wait for deployment (usually 1-2 minutes)
8. **Copy your frontend URL** (e.g., `https://your-project.vercel.app`)

#### Option B: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy:
   ```bash
   vercel
   ```

5. Follow the prompts and add environment variables when asked

---

## ✅ Step 4: Verify Deployment

1. **Test Backend Health Check**:
   - Visit: `https://your-backend-url.onrender.com/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend**:
   - Visit your Vercel URL
   - Try logging in or registering
   - Check browser console for any errors

3. **Check CORS**:
   - If you see CORS errors, make sure your backend URL in frontend environment variables is correct
   - Backend should allow requests from your Vercel domain

---

## 🔧 Step 5: Update CORS in Backend (If Needed)

If you encounter CORS errors, update `backend/src/server.js` to allow your Vercel domain:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:3000' // for local development
  ],
  credentials: true
}));
```

Or for production, you can use:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

Then add `FRONTEND_URL` to your Render environment variables.

---

## 🔄 Step 6: Continuous Deployment

Both Render and Vercel automatically deploy when you push to your main branch:

- **Render**: Auto-deploys on push to the branch you configured
- **Vercel**: Auto-deploys on push to main/master branch

To deploy updates:
1. Make your changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. Both platforms will automatically rebuild and deploy

---

## 🐛 Troubleshooting

### Backend Issues

1. **Build fails on Render**:
   - Check that `package.json` has a `start` script
   - Verify Node.js version compatibility
   - Check build logs in Render dashboard

2. **Database connection fails**:
   - Verify MongoDB URI is correct
   - Check MongoDB Atlas IP whitelist includes Render IPs
   - Ensure database user has correct permissions

3. **Port issues**:
   - Render sets `PORT` automatically, don't hardcode it
   - Use `process.env.PORT || 5000` in your code

### Frontend Issues

1. **API calls fail**:
   - Verify `VITE_API_URL` environment variable is set correctly
   - Check that backend URL doesn't have trailing slash
   - Ensure CORS is configured correctly

2. **Build fails on Vercel**:
   - Check that `vite.config.js` is correct
   - Verify all dependencies are in `package.json`
   - Check build logs in Vercel dashboard

3. **Environment variables not working**:
   - Vite requires `VITE_` prefix for environment variables
   - Rebuild after adding new environment variables

---

## 📝 Environment Variables Summary

### Backend (Render)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
PORT=10000 (optional, Render sets automatically)
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app (optional, for CORS)
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🎉 You're Done!

Your application should now be live:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

Share these URLs with your team and start using your deployed application!

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

