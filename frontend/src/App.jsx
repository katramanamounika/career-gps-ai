import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CareerSelection from "./pages/CareerSelection";
import CareerGuidance from "./pages/CareerGuidance";
import CareerOverview from "./pages/CareerOverview";

import ResumeUpload from "./pages/ResumeUpload";
import ResumeAnalysis from "./pages/ResumeAnalysis";

import Roadmap from "./pages/Roadmap";
import ProjectRecommendations from "./pages/ProjectRecommendations";
import CareerReadiness from "./pages/CareerReadiness";
import ForgotPassword from "./pages/ForgotPassword";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/profile"
          element={<Profile/>}
        />

        <Route
          path="/career-selection"
          element={<CareerSelection />}
        />

        <Route
          path="/career-guidance"
          element={<CareerGuidance />}
        />

        <Route
          path="/career-overview"
          element={<CareerOverview />}
        />

        <Route
          path="/resume-upload"
          element={<ResumeUpload />}
        />

        <Route
          path="/resume-analysis"
          element={<ResumeAnalysis />}
        />

        <Route
          path="/roadmap"
          element={<Roadmap />}
        />

        <Route
          path="/project-recommendations"
          element={
            <ProjectRecommendations />
          }
        />

        <Route
          path="/career-readiness"
          element={<CareerReadiness />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;