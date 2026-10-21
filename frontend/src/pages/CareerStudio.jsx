import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../theme.css";

const API = "http://127.0.0.1:8000";
const steps = ["Career matches", "Choose target", "Job comparison", "Learning roadmap", "Portfolio project", "Interview practice"];

function CareerStudio() {
  const navigate = useNavigate();
  const currentUser = useMemo(
    () => JSON.parse(localStorage.getItem("user") || "{}"),
    []
  );

  const email = currentUser.email || "guest";

  const userResumeHistory = useMemo(
    () =>
      JSON.parse(
        localStorage.getItem(
          `resumeHistory_${email}`
        ) || "[]"
      ),
    [email]
  );

  const latestResume = userResumeHistory[0];

  const skills = latestResume?.skills || [];
  const profile = useMemo(() => JSON.parse(localStorage.getItem("resumeProfileAnalysis") || "{}"), []);
  const [step, setStep] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [career, setCareer] = useState(localStorage.getItem("selectedCareer") || "");
  const [match, setMatch] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobResult, setJobResult] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [brief, setBrief] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [loading, setLoading] = useState("");

  const request = async (name, action) => {
    setLoading(name);
    try { return await action(); }
    catch { alert("This step could not be completed. Check that the backend is running, then try again."); return null; }
    finally { setLoading(""); }
  };

  useEffect(() => {
    if (!latestResume || !skills.length) return;
    request("recommendations", () => axios.post(`${API}/api/career-recommendations`, { skills }))
      .then(response => response && setRecommendations(response.data.recommendations));
  }, [skills]);

  if (!latestResume || !skills.length) return <div className="page"><div className="page-content center"><h1 className="hero-title">Start with your resume</h1><p className="subtitle">Career matches are based on skills extracted from your resume.</p><button className="primary-btn" onClick={() => navigate("/resume-upload")}>Upload resume first</button></div></div>;

  const chooseCareer = async (path) => {
    const response = await request("career", () => axios.post(`${API}/career-match`, { career: path, skills }));
    if (!response) return;
    const result = response.data;
    setCareer(path); setMatch(result); setStep(2);
    localStorage.setItem("selectedCareer", path);
    localStorage.setItem("missingSkills", JSON.stringify(result.missing_skills));
    localStorage.setItem("matchedSkills", JSON.stringify(result.matched_skills));
    localStorage.setItem("matchScore", result.score);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const email = user.email || "guest";
    const resumeId = Number(
      localStorage.getItem(
        `currentResumeId_${email}`
      )
    );
    const uploadedResume = localStorage.getItem("uploadedResume") || "Resume.pdf";
    const now = new Date().toLocaleString();
    const resumeHistory = JSON.parse(localStorage.getItem(`resumeHistory_${email}`) || "[]");
    const updatedResumeHistory = resumeHistory.map(item =>
      item.id === resumeId
        ? {
            ...item,
            career: path,
            score: result.score,
            atsScore: result.ats_score,
            matchedSkills: result.matched_skills,
            missingSkills: result.missing_skills
          }
        : item
    );
    localStorage.setItem(`resumeHistory_${email}`, JSON.stringify(updatedResumeHistory));
    const report = {
      id: resumeId || Date.now(),
      resume: uploadedResume,
      career: path,
      score: result.score,
      matched: result.matched_skills,
      missing: result.missing_skills,
      atsScore: result.ats_score,
      totalRequiredSkills: result.total_required_skills,
      totalMatchedSkills: result.total_matched_skills,
      date: now
    };
    const reports = JSON.parse(localStorage.getItem(`reportHistory_${email}`) || "[]");
    const reportIndex = reports.findIndex(item => item.id === report.id);
    if (reportIndex >= 0) reports[reportIndex] = report; else reports.unshift(report);
    localStorage.setItem(`reportHistory_${email}`, JSON.stringify(reports));
    localStorage.setItem("analysisReport", JSON.stringify(report));
  };
  const analyzeJob = async () => {
    const response = await request("job", () => axios.post(`${API}/api/job-analysis`, { description: jobDescription, skills }));
    if (response) setJobResult(response.data);
  };
  const buildRoadmap = async () => {
    const response = await request("roadmap", () => axios.post(`${API}/roadmap`, { missing_skills: match?.missing_skills || [] }));
    if (response) { setRoadmap(response.data.roadmap || []); setStep(4); }
  };
  const createProject = async () => {
    const response = await request("project", () => axios.post(`${API}/api/project-brief`, { career, level: "Intermediate" }));
    if (response) setBrief(response.data);
  };
  const getQuestions = async () => {
    const response = await request("questions", () => axios.post(`${API}/api/interview/questions`, { career, skills }));
    if (response) { setQuestions(response.data.questions); setAnswers({}); setEvaluations({}); }
  };
  const evaluate = async (question) => {
    const answer = answers[question.id]?.trim();
    if (!answer) return alert("Write an answer for this question first.");
    const response = await request(`evaluation-${question.id}`, () => axios.post(`${API}/api/interview/evaluate`, { question: question.question, answer }));
    if (response) setEvaluations(current => ({ ...current, [question.id]: response.data }));
  };

  return <div className="page"><div className="glow1" /><div className="glow2" /><main className="page-content studio">
    <span className="eyebrow">YOUR GUIDED CAREER JOURNEY</span><h1 className="hero-title">Career Journey</h1>
    <p className="subtitle">Complete one clear step at a time. Your resume is the starting point.</p>
    <div className="journey-steps">{steps.map((label, index) => <div key={label} className={`journey-step ${step === index + 1 ? "current" : ""} ${step > index + 1 ? "complete" : ""}`}><span>{index + 1}</span><small>{label}</small></div>)}</div>
    <div className="studio-skillbar"><strong>Resume skills ({skills.length}):</strong> {skills.map(skill => <span className="skill-chip" key={skill}>{skill}</span>)}</div>

    {step === 1 && <section className="glass-card studio-section"><span className="section-kicker">STEP 1 · RESUME ANALYSIS AND CAREER MATCHES</span><h2>Your resume has been analysed</h2><div className="analysis-summary"><div><b>Resume completeness score</b><strong>{profile.ats_score || 0}%</strong></div><div><b>Recognised skills</b><p>{skills.join(" · ")}</p></div></div><p className="subtitle">Below are suitable career paths. Each card shows the skills matched from your resume and the next skills to learn.</p>{loading === "recommendations" ? <p>Finding suitable careers…</p> : <div className="match-grid">{recommendations.map(item => <article className="match-card" key={item.career}><strong>{item.match_score}%</strong><h3>{item.career}</h3><p><b>Matched skills:</b> {item.matched_skills.join(", ") || "No recognised match yet"}</p><small><b>Learn next:</b> {item.next_skills.join(" · ")}</small><button className="primary-btn compact-btn" onClick={() => chooseCareer(item.career)}>Choose this path</button></article>)}</div>}</section>}

    {step === 2 && <section className="glass-card studio-section"><span className="section-kicker">STEP 2 · CHOOSE A TARGET CAREER</span><h2>{career}</h2><p className="subtitle">This is your selected target. The next steps are personalised for it.</p><div className="result-row"><div><b>{match?.ats_score || 0}% ATS compatibility score</b><p>Skills you have: {match?.matched_skills?.join(", ") || "Keep building your profile."}</p></div><div><b>Skills to develop</b><p>{match?.missing_skills?.join(" · ") || "You meet the recognised skills for this path."}</p></div></div><button className="primary-btn" onClick={() => setStep(3)}>Continue to job comparison</button><button className="secondary-btn journey-back" onClick={() => setStep(1)}>Choose a different path</button></section>}
    <p>
      {match?.total_matched_skills || 0} matched skills out of{" "}
      {match?.total_required_skills || 0} required skills
    </p>
    {step === 3 && <section className="glass-card studio-section"><span className="section-kicker">STEP 3 · CHECK A JOB DESCRIPTION</span><h2>Compare a real internship or job</h2><p className="subtitle">Paste a complete job description from a job site. This shows what to prioritise before applying.</p><textarea className="input-box studio-textarea" value={jobDescription} onChange={e => setJobDescription(e.target.value)} placeholder="Paste a job description here…" /><button className="primary-btn" disabled={jobDescription.trim().length < 20} onClick={analyzeJob}>{loading === "job" ? "Comparing…" : "Compare with my resume"}</button>{jobResult && <div className="result-row"><div><b>{jobResult.match_score}% role match</b><p>Matched: {jobResult.matched_skills.join(", ") || "No recognised skills"}</p></div><div><b>Priority skills</b><p>{jobResult.priority.join(" · ") || "No priority skills detected."}</p></div></div>}<div className="journey-actions"><button className="secondary-btn" onClick={() => setStep(2)}>Back</button><button className="primary-btn" onClick={buildRoadmap}>Continue to learning roadmap</button></div></section>}

    {step === 4 && <section className="glass-card studio-section"><span className="section-kicker">STEP 4 · LEARN MISSING SKILLS</span><h2>Your {career} roadmap</h2><p className="subtitle">Follow these in order, then continue to a portfolio project.</p><div className="timeline">{roadmap.map(item => <div className="timeline-item" key={item.week}><h4>Week {item.week}: {item.skill}</h4><p>{item.task}</p></div>)}</div><button className="primary-btn" onClick={() => setStep(5)}>Continue to project</button></section>}

    {step === 5 && <section className="glass-card studio-section"><span className="section-kicker">STEP 5 · BUILD PROOF OF SKILLS</span><h2>Portfolio project</h2><p className="subtitle">Generate one structured project you can complete and add to your portfolio.</p><button className="primary-btn" onClick={createProject}>{loading === "project" ? "Creating…" : "Generate project brief"}</button>{brief && <div className="project-brief"><h3>{brief.project} <span className="badge badge-yellow">{brief.difficulty}</span></h3><p><b>Skills:</b> {brief.skills.join(" · ")}</p><ol>{brief.build_steps.map(item => <li key={item}>{item}</li>)}</ol><p className="resume-bullet">Resume bullet: “{brief.resume_bullet}”</p></div>}<div className="journey-actions"><button className="secondary-btn" onClick={() => setStep(4)}>Back</button><button className="primary-btn" disabled={!brief} onClick={() => setStep(6)}>Continue to interview practice</button></div></section>}

    {step === 6 && <section className="glass-card studio-section"><span className="section-kicker">STEP 6 · PRACTISE INTERVIEWS</span><h2>{career} interview practice</h2><p className="subtitle">Each question has its own answer and feedback. Answer one at a time.</p><button className="primary-btn" onClick={getQuestions}>{loading === "questions" ? "Preparing…" : "Get interview questions"}</button>{questions.map(question => <article className="question-card" key={question.id}><b>Question {question.id}</b><h3>{question.question}</h3><textarea className="input-box studio-textarea" placeholder="Write your answer for this question…" value={answers[question.id] || ""} onChange={e => setAnswers(current => ({ ...current, [question.id]: e.target.value }))} /><button className="secondary-btn" onClick={() => evaluate(question)}>{loading === `evaluation-${question.id}` ? "Evaluating…" : "Evaluate this answer"}</button>{evaluations[question.id] && <div className="evaluation"><b>{evaluations[question.id].score}/100 answer score</b><p>{evaluations[question.id].feedback.join(" ")}</p><p><b>Better structure:</b> {evaluations[question.id].improved_answer}</p></div>}</article>)}<div className="journey-actions"><button className="secondary-btn" onClick={() => setStep(5)}>Back</button><button className="primary-btn" onClick={() => navigate("/career-readiness")}>Finish journey and view readiness</button></div></section>}
  </main></div>;
}

export default CareerStudio;
