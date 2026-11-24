# Hanjra Remove BG — repaired build

## Important: GitHub Pages alone cannot run AI removal
This website uses a server-side remove.bg API key. Do not put the key in HTML or publish it to GitHub.

## Run locally
1. Install Node.js 18 or newer.
2. Extract this folder.
3. In a terminal in this folder, run `npm install`.
4. Copy `.env.example` to `.env` and add your remove.bg API key:
   `REMOVEBG_API_KEY=your_actual_key`
5. Run `npm start`.
6. Open `http://localhost:3000`.

## Deploy
Deploy the Node server (including `server.js`, `package.json`, and `index.html`) to a Node hosting provider such as Render. Set `REMOVEBG_API_KEY` in the provider's environment-variable settings. GitHub Pages is only suitable for the static front-end and cannot run this API server.

## Use
Upload the photo, press **Remove Background (AI)**, choose a color or upload a background image, press **Apply Background**, then click **Download PNG**. Transparent PNG download is available after removal by choosing the transparency checkerboard.
