# Movie Recommendation Web App

This is a full-stack Movie Recommendation web application built as part of an assignment.

Users can enter their movie preferences, and the app returns a list of recommended movies.

---

## Tech Stack

**Frontend:**
- React

**Backend:**
- Node.js
- Fastify
- SQLite

**AI / Recommendations:**
- Intended: OpenAI / Google Gemini API (not currently integrated due to API access/billing limitations)
- Current: Static list of 5 recommended movies per input

---

## Features

- Users can enter movie preferences (genre, mood, etc.)
- Returns a list of 5 movie recommendations
- Backend API using Fastify
- Data stored in SQLite database
- Clean and responsive UI

---

## Instructions to Run the App Locally

### 1. Clone the repository

git clone https://github.com/Shreya-Gupta-SG/Movie_Recommendation_Web_App.git

### 2. Run Backend
cd backend
npm install
node server.js

Backend runs on: http://localhost:3000

### 3. Run Frontend
cd frontend
npm install
npm run dev

Frontend runs on: http://localhost:5173

### Deployed Links

- Frontend: [https://movie-recommendation-web-app-gamma.vercel.app](https://movie-recommendation-web-app-gamma.vercel.app/)
- Backend: h[ttps://movie-recommendation-backend-1dri.onrender.com](https://movie-recommendation-backend-1dri.onrender.com)

### Note on API Integration

- The app was initially designed to fetch recommendations dynamically using OpenAI or Gemini API.
- Gemini: New Google AI Studio accounts currently do not have access to any text generation models via v1beta, which cannot be fixed instantly.
- OpenAI: API usage requires billing, which was not enabled during development.

As a result, the app currently returns a static list of 5 movie recommendations per input.

Author

Shreya Gupta


