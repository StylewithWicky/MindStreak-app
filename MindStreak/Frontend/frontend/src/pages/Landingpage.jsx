// src/pages/LandingPage.jsx
import React from "react";
import "../Css/Landingpage.css";
import bgVideo from "../assets/4044012-hd_1920_1080_24fps.mp4";
import { Link } from "react-router-dom";

function LandingPage() {
  const scrollToNext = () => {
    const next = document.getElementById("next-section");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="landing-container">
        <video autoPlay loop muted playsInline className="background-video">
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="overlay"></div>
        <div className="content">
          <h1 className="title fade-in">Welcome to MindStreak</h1>
          <p className="subtitle fade-in-delay">Track your mood. Heal your mind.</p>
          <div className="buttons fade-in-delay-2">
            <Link to="/login" className="btn login-btn">Login</Link>
            <Link to="/register" className="btn register-btn">Register</Link>
          </div>
          <button onClick={scrollToNext} className="scroll-indicator">↓</button>
        </div>
      </div>

      {/* Next section for scroll-down effect */}
      <div id="next-section" className="next-section">
        <h2>Your mental wellness journey begins here.</h2>
        <p>Discover tools, track moods, and vibe better.</p>
      </div>
    </>
  );
}

export default LandingPage;
