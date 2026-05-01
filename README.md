# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.










PROJECT: React Vite Frontend (Dockerized)

Repository:
https://github.com/SUSOBHANLAL/kec-dashboard-forntend.git

--------------------------------------------------
📁 PROJECT OVERVIEW
--------------------------------------------------

This is the frontend dashboard built using:

- React (JavaScript)
- Vite (Fast build tool)
- Axios (API calls)
- Chart libraries (for stock visualization)

It connects to the Flask Backend API to display:
- Stock forecasts
- Predictions
- Charts and analytics


--------------------------------------------------
🚀 FEATURES
--------------------------------------------------

- Interactive stock dashboard
- API integration with Flask backend
- Fast development using Vite
- Docker support for easy setup


--------------------------------------------------
⚙️ LOCAL SETUP (WITHOUT DOCKER)
--------------------------------------------------

STEP 1: Clone Repository
git clone https://github.com/SUSOBHANLAL/kec-dashboard-forntend.git
cd kec-dashboard-forntend

STEP 2: Install Dependencies
npm install

STEP 3: Run Development Server
npm run dev

STEP 4: Open in Browser
http://localhost:5173


--------------------------------------------------
🔗 BACKEND CONNECTION (IMPORTANT) make sure this is running
--------------------------------------------------

Make sure your backend is running on:
http://localhost:5000

If API URL is hardcoded, check and update in your code:
Example (Axios):

const API_URL = "http://localhost:5000/api/v1"

If backend runs on a different port or server,
update the API URL accordingly.


--------------------------------------------------
🐳 DOCKER SETUP ⭐ what i did 
--------------------------------------------------

STEP 1: Create Dockerfile

---------------------------------
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
---------------------------------

👉 IMPORTANT:
--host is REQUIRED
Otherwise Vite will not be accessible outside the container


--------------------------------------------------
🚫 STEP 2: Create .dockerignore   ⭐ what i did 
--------------------------------------------------

node_modules
dist
.git


--------------------------------------------------
📦 STEP 3: Build Docker Image 👇 important to run
--------------------------------------------------

docker build -t react-frontend .


--------------------------------------------------
▶️ STEP 4: Run Docker Container   👇 important to run
--------------------------------------------------

docker run -p 3000:5173 react-frontend


--------------------------------------------------
🌐 STEP 5: Open Application
--------------------------------------------------

http://localhost:3000


--------------------------------------------------
⚠️ COMMON ISSUES & FIXES
--------------------------------------------------

1. App not loading in browser

- Ensure container is running
- Check correct port mapping:
  docker run -p 3000:5173 react-frontend


2. API not working / No data showing

- Ensure backend is running on port 5000
- Check API URL in frontend code
- Fix CORS in backend if needed


3. Vite not accessible from Docker

Make sure Dockerfile uses:
npm run dev -- --host


4. Changes not reflecting

Rebuild image:
docker build -t react-frontend .


--------------------------------------------------
💡 OPTIONAL (LIVE DEVELOPMENT WITH DOCKER)
--------------------------------------------------

Run with volume mount (no rebuild needed):

Windows:
docker run -p 3000:5173 -v %cd%:/app react-frontend

Linux/Mac:
docker run -p 3000:5173 -v $(pwd):/app react-frontend


--------------------------------------------------
📌 FUTURE IMPROVEMENTS
--------------------------------------------------

- Add production build (Nginx)
- Add authentication (Login system)
- Improve UI/UX
- Deploy to cloud (Vercel / Netlify / AWS)


--------------------------------------------------
👨‍💻 AUTHOR
--------------------------------------------------

Susobhan Lal

GitHub:
https://github.com/SUSOBHANLAL

--------------------------------------------------