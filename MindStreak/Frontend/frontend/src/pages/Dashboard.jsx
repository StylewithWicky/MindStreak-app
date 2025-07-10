import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Home,
  Flame,
  Music,
  Book,
  PlayCircle
} from "lucide-react";
import "../Css/Dashboard.css";

const Dashboard = () => {
  const [mood, setMood] = useState("😊");
  const [entry, setEntry] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentPrimeview, setCurrentPreview] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/history", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setHistory(res.data);
  };

  const handleSubmit = async () => {
    if (!entry) return alert("Please write a journal entry.");
    try {
      const token = localStorage.getItem("token");
      console.log("Mood:", mood);
      console.log("Entry:", entry);

    const res = await axios.post(
      "http://localhost:5000/api/moodlog",
      { mood, entry },
      {
      headers: {
         "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
             }
      }
      );


      const moodTerm = mood === "😊" ? "happy" : mood === "😢" ? "sad" : mood === "😠" ? "angry" : "calm";
      const songRes = await axios.get(`http://localhost:5000/api/recommend/${moodTerm}`);
      const topTrack = songRes.data[0];
      setRecommendation(topTrack);
      setEntry("");
      fetchHistory();
    } catch (err) {
      console.error(err);
    }
  };

  const playPreview = (previewUrl) => {
    if (currentPreview) {
      currentPreview.pause();
    }
    const audio = new Audio(previewUrl);
    audio.play();
    setCurrentPreview(audio);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <motion.div className="nav-card glass" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
        <Home />
        <Flame />
        <Music />
        <Book />
      </motion.div>

      {/* Featured Song */}
      <motion.div className="glass-card glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <header>
          <h1>MindStreak</h1>
          <p className="subtitle">Music for Your Mood</p>
          <p className="quote">Music expresses that which cannot be said and on which it is impossible to be silent.</p>
          <hr />
        </header>
        <section className="collections">
          <h2>Your Recommendation</h2>
          {recommendation && (
            <div className="song-card">
              <img src={recommendation.cover} alt="cover" />
              <p><strong>{recommendation.name}</strong></p>
              <p>{recommendation.artist}</p>
              {recommendation.preview_url && (
                <PlayCircle className="play-button" onClick={() => playPreview(recommendation.preview_url)} />
              )}
            </div>
          )}
        </section>
      </motion.div>

      {/* Journal + Recommendation */}
      <motion.div className="journal-column" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
        <div className="glass-card glass journal-entry">
          <h2>How are you feeling?</h2>
          <select value={mood} onChange={(e) => setMood(e.target.value)}>
            <option value="😊">😊 Happy</option>
            <option value="😢">😢 Sad</option>
            <option value="😠">😠 Angry</option>
            <option value="😴">😴 Tired</option>
          </select>
          <textarea
            placeholder="Write your thoughts..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          ></textarea>
          <button onClick={handleSubmit}>Submit</button>
        </div>

        <div className="glass-card glass history-card">
          <h2>Mood History</h2>
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item.mood} | "{item.entry}" — {item.date}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
