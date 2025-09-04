import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PowerRankings from './pages/PowerRankings';
import TeamPowerRankings from './pages/TeamPowerRankings';
import LeagueRules from './pages/LeagueRules';
import Draft from './pages/Draft';
import Punishments from './pages/Punishments';
import History from './pages/History';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/power-rankings" element={<PowerRankings />} />
            <Route path="/team-power-rankings" element={<TeamPowerRankings />} />
            <Route path="/rules" element={<LeagueRules />} />
            <Route path="/draft" element={<Draft />} />
            <Route path="/punishments" element={<Punishments />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;