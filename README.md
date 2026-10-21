# Career GPS AI 2.0

> An AI-assisted career guidance platform that turns a student resume into a clear, personalised career-preparation journey.

Career GPS AI 2.0 helps students understand what they know, choose a suitable technical career path, identify the skills they need next, build portfolio evidence and practise for interviews. The platform keeps each student's resume analysis and readiness information in their own account history.

## Key Features

- Secure user sign-up, login and password recovery flow
- PDF resume upload and skill extraction
- Resume completeness analysis with recognised skills and profile information
- Suitable career-path recommendations based on resume skills
- Target-career selection with matched and missing skills
- Role-specific ATS compatibility score instead of a fixed generic score
- Job-description comparison with priority skills
- Step-by-step learning roadmap for skill gaps
- Portfolio project brief with build guidance and resume-bullet support
- Interview practice with separate answer evaluation for every question
- Career readiness report, resume history, report history and reset-history controls

## Guided Student Flow

```text
Sign up / Login
      ↓
Upload PDF Resume
      ↓
Extract Skills and Find Career Matches
      ↓
Choose a Target Career
      ↓
Check Role-Specific ATS Compatibility
      ↓
Compare a Job Description
      ↓
Follow Learning Roadmap
      ↓
Build Suggested Portfolio Project
      ↓
Practise Interview Questions
      ↓
Review Career Readiness Report
```

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS3, React Router, Axios, Framer Motion |
| Backend | Python, FastAPI, Uvicorn, Pydantic |
| Resume Processing | pypdf and Python-based skill extraction services |
| Data Storage | MongoDB with a local JSON development fallback |
| Development Tools | VS Code, npm, pip, Git, GitHub, Postman |

## Project Structure

```text
Career-GPS-AI-2.0/
├── frontend/          # React and Vite user interface
├── backend/           # FastAPI routes, services and data layer
├── docs/              # Project features, problem statement and user flow
└── README.md
```

## Run Locally

### 1. Start the backend

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend starts at `http://127.0.0.1:8000`.

### 2. Start the frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

## Environment Variables

Create `backend/.env` locally when MongoDB Atlas is available:

```env
MONGO_URI=your_mongodb_connection_string
```

Never commit this file. If MongoDB is unavailable during local development, the application can use its local development data store.

## Testing Checklist

- Create a new account and log in
- Upload a PDF resume
- Confirm career matches appear after resume analysis
- Select a target career and verify the ATS compatibility score
- Compare a job description and review priority skills
- Complete roadmap, portfolio-project and interview-practice steps
- Confirm reports and resume history are associated with the signed-in user
- Test reset history and log out

## Deployment

The project is prepared for a standard React + FastAPI deployment:

- Frontend: Vercel
- Backend API: Render
- Database: MongoDB Atlas

> Before production deployment, configure the frontend API URL and backend CORS origin with the final hosting URLs. Do not expose database credentials in GitHub.

## Author

**Katramana Mounika**  
Career GPS AI 2.0 — Internship / Academic Project

---

If this project supports your learning or placement preparation, consider starring the repository.
