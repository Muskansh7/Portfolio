# Deployment Guide: Render

Muskan, follow these instructions to launch your portfolio website on Render:

## Prerequisites
1. Ensure your codebase is pushed to your GitHub repository (e.g. `https://github.com/Muskansh7/portfolio` or similar).

## Deployment Steps
1. **Log In to Render**:
   - Go to [dashboard.render.com](https://dashboard.render.com/) and sign in with your GitHub account.

2. **Create a New Blueprint Instance**:
   - Click the **"New"** button in the top right and select **"Blueprint"** (this uses the `render.yaml` configuration in your repo to set up everything automatically).
   - Alternatively, you can select **"Web Service"** and configure it manually:
     - **Repository**: Select your portfolio repository.
     - **Name**: `muskan-sharma-portfolio`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `node server.js`

3. **Configure Environment Variables**:
   - On the Blueprint confirmation page, it will prompt you for the `OPENAI_API_KEY`.
   - Enter your real **OpenAI API Key** (starts with `sk-...`).
   - If deploying manually as a Web Service:
     - Navigate to the **Environment** tab on your service dashboard.
     - Add `OPENAI_API_KEY` = `your-actual-api-key`.
     - Add `NODE_ENV` = `production`.
     - Click **"Save Changes"**.

4. **Trigger Deployment**:
   - Render will start the build process automatically: it installs dependencies, compiles Vite static files into `dist/`, and launches the Express server.
   - Once completed, Render will display a live URL (e.g., `https://muskan-sharma-portfolio.onrender.com`).
