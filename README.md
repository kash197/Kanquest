# Kanquest

Kanquest helps people practice useful, conversational Kannada through short missions based on everyday situations. Learners type Kannada phrases using English letters.

## Try the app

**Live app:** (https://kanquest.onrender.com)

## Features

- **Beginner:** Three missions with three multiple-choice turns each. English translations appear with dialogue and answer choices.
- **Intermediate:** The same three missions and questions, with translations available through hints.
- **Advanced:** Three typed-response turns for the Restaurant mission, evaluated by Gemini through the backend.
- A shared glossary of useful words and phrases.
- Hints, answer feedback, retries, and mission completion.
- No accounts or saved learner progress.

## Technology

- Frontend: React, Vite, and Tailwind CSS
- Backend: Node.js and Express
- AI evaluation: Google Gemini
- Hosting: Render

## Run locally

Install [Node.js 20 or newer](https://nodejs.org/) and npm.

From the Kanquest project folder, install the dependencies:

```powershell
cd backend
npm install
cd ..\frontend
npm install
cd ..
```

Create the backend environment file:

```powershell
Copy-Item backend\.env.example backend\.env
```

Open `backend\.env` and replace the placeholder with your Gemini API key. Keep this key private. Never put it in source code, this README, or a public repository. The `.env` file is ignored by Git.

Open one PowerShell window in the Kanquest project folder and start the backend:

```powershell
cd backend
npm run dev
```

Open a second PowerShell window in the Kanquest project folder and start the frontend:

```powershell
cd frontend
npm run dev
```

Open the local address Vite prints, usually <http://localhost:5173>. During development, Vite forwards `/api` requests to the backend on port 3001.

## Checks

Run the backend tests:

```powershell
cd backend
npm test
```

Build and lint the frontend:

```powershell
cd frontend
npm run build
npm run lint
```

The backend tests use mocked Gemini responses. Gemini evaluation was also checked through the deployed app with expected and unrelated answers. This confirms the connection works, but does not guarantee perfect evaluations or unlimited usage.

## Deployment

The root [`render.yaml`](render.yaml) configures Render to install the backend and frontend dependencies, build the frontend, and run Express to serve the app and API.

The Gemini API key is configured as a Render secret and is not stored in this repository. Render free services may spin down after inactivity, and Gemini usage is subject to the account's current quota and provider terms.