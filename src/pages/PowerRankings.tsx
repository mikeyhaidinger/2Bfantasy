import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Save, X, Target } from 'lucide-react';

interface Matchup {
  id: string;
  team1: string;
  team2: string;
  writeup: string;
  prediction: {
    winner: string;
    margin: number;
  } | null;
}

interface WeekData {
  week: number;
  matchups: Matchup[];
}

const PowerRankings = () => {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1]));
  const [editingMatchup, setEditingMatchup] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editingTeams, setEditingTeams] = useState<string | null>(null);
  const [editTeam1, setEditTeam1] = useState('');
  const [editTeam2, setEditTeam2] = useState('');
  const [editingPrediction, setEditingPrediction] = useState<string | null>(null);
  const [predictionWinner, setPredictionWinner] = useState('');
  const [predictionMargin, setPredictionMargin] = useState('');

  // Initialize all weeks 1-13 at once
  const [weeksData, setWeeksData] = useState<WeekData[]>(() => {
    const weeks: WeekData[] = [];
    for (let weekNum = 1; weekNum <= 13; weekNum++) {
      let matchups: Matchup[] = [];
      
      if (weekNum === 1) {
        matchups = [
          { id: '1-1', team1: 'Team Gone Jawnson', team2: 'Jersey Shore Supplements', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '1-2', team1: 'Maui Mooseknuckles', team2: 'NJ Old School', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '1-3', team1: 'The Silverbacks', team2: 'Calamari Ballsrings', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '1-4', team1: 'The Pancake Football Team', team2: 'Zweeg', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '1-5', team1: 'Pink Sock', team2: 'Sonalika Scorchers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '1-6', team1: 'Maine Course', team2: 'Central Saudi Scammers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else if (weekNum === 2) {
        matchups = [
          { id: '2-1', team1: 'Team Gone Jawnson', team2: 'NJ Old School', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '2-2', team1: 'Jersey Shore Supplements', team2: 'Calamari Ballsrings', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '2-3', team1: 'Maui Mooseknuckles', team2: 'Zweeg', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '2-4', team1: 'The Silverbacks', team2: 'Sonalika Scorchers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '2-5', team1: 'The Pancake Football Team', team2: 'Pink Sock', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '2-6', team1: 'Central Saudi Scammers', team2: 'Maine Course', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else if (weekNum === 3) {
        matchups = [
          { id: '3-1', team1: 'The Silverbacks', team2: 'Jersey Shore Supplements', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '3-2', team1: 'Central Saudi Scammers', team2: 'Sonalika Scorchers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '3-3', team1: 'Zweeg', team2: 'Maine Course', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '3-4', team1: 'Pink Sock', team2: 'Calamari Ballsrings', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '3-5', team1: 'Team Gone Jawnson', team2: 'Maui Mooseknuckles', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '3-6', team1: 'The Pancake Football Team', team2: 'NJ Old School', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else if (weekNum === 4) {
        matchups = [
          { id: '4-1', team1: 'Pink Sock', team2: 'Maui Mooseknuckles', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '4-2', team1: 'Jersey Shore Supplements', team2: 'Maine Course', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '4-3', team1: 'The Silverbacks', team2: 'The Pancake Football Team', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '4-4', team1: 'Calamari Ballsrings', team2: 'Sonalika Scorchers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '4-5', team1: 'NJ Old School', team2: 'Central Saudi Scammers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '4-6', team1: 'Zweeg', team2: 'Team Gone Jawnson', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else if (weekNum === 5) {
        matchups = [
          { id: '5-1', team1: 'Calamari Ballsrings', team2: 'Maine Course', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '5-2', team1: 'Pink Sock', team2: 'NJ Old School', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '5-3', team1: 'The Silverbacks', team2: 'Maui Mooseknuckles', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '5-4', team1: 'The Pancake Football Team', team2: 'Jersey Shore Supplements', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '5-5', team1: 'Sonalika Scorchers', team2: 'Team Gone Jawnson', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '5-6', team1: 'Central Saudi Scammers', team2: 'Zweeg', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else if (weekNum === 6) {
        matchups = [
          { id: '6-1', team1: 'Calamari Ballsrings', team2: 'The Pancake Football Team', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '6-2', team1: 'Team Gone Jawnson', team2: 'Central Saudi Scammers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '6-3', team1: 'Maine Course', team2: 'Sonalika Scorchers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '6-4', team1: 'Pink Sock', team2: 'Zweeg', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '6-5', team1: 'NJ Old School', team2: 'The Silverbacks', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '6-6', team1: 'Maui Mooseknuckles', team2: 'Jersey Shore Supplements', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else if (weekNum === 7) {
        matchups = [
          { id: '7-1', team1: 'The Silverbacks', team2: 'Zweeg', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '7-2', team1: 'Calamari Ballsrings', team2: 'Maui Mooseknuckles', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '7-3', team1: 'The Pancake Football Team', team2: 'Sonalika Scorchers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '7-4', team1: 'Team Gone Jawnson', team2: 'Maine Course', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '7-5', team1: 'Central Saudi Scammers', team2: 'Pink Sock', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '7-6', team1: 'NJ Old School', team2: 'Jersey Shore Supplements', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else if (weekNum === 8) {
        matchups = [
          { id: '8-1', team1: 'The Silverbacks', team2: 'Central Saudi Scammers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '8-2', team1: 'Maine Course', team2: 'The Pancake Football Team', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '8-3', team1: 'NJ Old School', team2: 'Calamari Ballsrings', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '8-4', team1: 'Pink Sock', team2: 'Team Gone Jawnson', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '8-5', team1: 'Sonalika Scorchers', team2: 'Maui Mooseknuckles', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '8-6', team1: 'Zweeg', team2: 'Jersey Shore Supplements', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else if (weekNum === 9) {
        matchups = [
          { id: '9-1', team1: 'Jersey Shore Supplements', team2: 'Central Saudi Scammers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '9-2', team1: 'Team Gone Jawnson', team2: 'The Pancake Football Team', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '9-3', team1: 'Maui Mooseknuckles', team2: 'Maine Course', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '9-4', team1: 'Calamari Ballsrings', team2: 'Zweeg', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '9-5', team1: 'NJ Old School', team2: 'Sonalika Scorchers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '9-6', team1: 'Pink Sock', team2: 'The Silverbacks', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else if (weekNum === 10) {
        matchups = [
          { id: '10-1', team1: 'Team Gone Jawnson', team2: 'The Silverbacks', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '10-2', team1: 'Jersey Shore Supplements', team2: 'Pink Sock', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '10-3', team1: 'Central Saudi Scammers', team2: 'Calamari Ballsrings', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '10-4', team1: 'Maine Course', team2: 'NJ Old School', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '10-5', team1: 'Zweeg', team2: 'Sonalika Scorchers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '10-6', team1: 'Maui Mooseknuckles', team2: 'The Pancake Football Team', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else if (weekNum === 11) {
        matchups = [
          { id: '11-1', team1: 'Jersey Shore Supplements', team2: 'Sonalika Scorchers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '11-2', team1: 'Calamari Ballsrings', team2: 'Team Gone Jawnson', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '11-3', team1: 'NJ Old School', team2: 'Zweeg', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '11-4', team1: 'Pink Sock', team2: 'The Pancake Football Team', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '11-5', team1: 'Central Saudi Scammers', team2: 'Maui Mooseknuckles', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '11-6', team1: 'The Silverbacks', team2: 'Maine Course', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else if (weekNum === 12) {
        matchups = [
          { id: '12-1', team1: 'Team Gone Jawnson', team2: 'Jersey Shore Supplements', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '12-2', team1: 'Maui Mooseknuckles', team2: 'NJ Old School', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '12-3', team1: 'The Silverbacks', team2: 'Calamari Ballsrings', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '12-4', team1: 'The Pancake Football Team', team2: 'Zweeg', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '12-5', team1: 'Pink Sock', team2: 'Sonalika Scorchers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '12-6', team1: 'Maine Course', team2: 'Central Saudi Scammers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else if (weekNum === 13) {
        matchups = [
          { id: '13-1', team1: 'Team Gone Jawnson', team2: 'NJ Old School', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '13-2', team1: 'Jersey Shore Supplements', team2: 'Calamari Ballsrings', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '13-3', team1: 'Maui Mooseknuckles', team2: 'Zweeg', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '13-4', team1: 'The Silverbacks', team2: 'Sonalika Scorchers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '13-5', team1: 'The Pancake Football Team', team2: 'Central Saudi Scammers', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: '13-6', team1: 'Pink Sock', team2: 'Maine Course', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      } else {
        // Default matchups for other weeks
        matchups = [
          { id: `${weekNum}-1`, team1: 'Team 1', team2: 'Team 2', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: `${weekNum}-2`, team1: 'Team 3', team2: 'Team 4', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: `${weekNum}-3`, team1: 'Team 5', team2: 'Team 6', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: `${weekNum}-4`, team1: 'Team 7', team2: 'Team 8', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: `${weekNum}-5`, team1: 'Team 9', team2: 'Team 10', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null },
          { id: `${weekNum}-6`, team1: 'Team 11', team2: 'Team 12', writeup: 'Click edit to add commissioner analysis for this matchup...', prediction: null }
        ];
      }
      
      weeks.push({
        week: weekNum,
        matchups
      });
    }
    return weeks;
  });

  const toggleWeek = (week: number) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(week)) {
      newExpanded.delete(week);
    } else {
      newExpanded.add(week);
    }
    setExpandedWeeks(newExpanded);
  };

  const startEditing = (matchupId: string, currentText: string) => {
    setEditingMatchup(matchupId);
    setEditText(currentText === 'Click edit to add commissioner analysis for this matchup...' ? '' : currentText);
  };

  const startEditingTeams = (matchupId: string, team1: string, team2: string) => {
    setEditingTeams(matchupId);
    setEditTeam1(team1);
    setEditTeam2(team2);
  };

  const startEditingPrediction = (matchupId: string, prediction: any) => {
    setEditingPrediction(matchupId);
    setPredictionWinner(prediction?.winner || '');
    setPredictionMargin(prediction?.margin?.toString() || '');
  };

  const saveEdit = (weekNumber: number, matchupId: string) => {
    setWeeksData(weeks =>
      weeks.map(week => {
        if (week.week === weekNumber) {
          return {
            ...week,
            matchups: week.matchups.map(matchup => 
              matchup.id === matchupId 
                ? { ...matchup, writeup: editText }
                : matchup
            )
          };
        }
        return week;
      })
    );
    setEditingMatchup(null);
    setEditText('');
  };

  const saveTeamEdit = (weekNumber: number, matchupId: string) => {
    setWeeksData(weeks =>
      weeks.map(week => {
        if (week.week === weekNumber) {
          return {
            ...week,
            matchups: week.matchups.map(matchup => 
              matchup.id === matchupId 
                ? { ...matchup, team1: editTeam1, team2: editTeam2 }
                : matchup
            )
          };
        }
        return week;
      })
    );
    setEditingTeams(null);
    setEditTeam1('');
    setEditTeam2('');
  };

  const savePredictionEdit = (weekNumber: number, matchupId: string) => {
    const margin = parseFloat(predictionMargin);
    if (predictionWinner && !isNaN(margin)) {
      setWeeksData(weeks =>
        weeks.map(week => {
          if (week.week === weekNumber) {
            return {
              ...week,
              matchups: week.matchups.map(matchup => 
                matchup.id === matchupId 
                  ? { ...matchup, prediction: { winner: predictionWinner, margin } }
                  : matchup
              )
            };
          }
          return week;
        })
      );
    }
    setEditingPrediction(null);
    setPredictionWinner('');
    setPredictionMargin('');
  };

  const cancelEdit = () => {
    setEditingMatchup(null);
    setEditText('');
    setEditingTeams(null);
    setEditTeam1('');
    setEditTeam2('');
    setEditingPrediction(null);
    setPredictionWinner('');
    setPredictionMargin('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Power Rankings</h1>
          <p className="text-xl text-gray-600">Commissioner's weekly matchup analysis and predictions</p>
        </div>

        <div className="space-y-6">
          {weeksData.map((week) => (
            <div key={week.week} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
              <button
                onClick={() => toggleWeek(week.week)}
                className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white flex items-center justify-between transition-all duration-300"
              >
                <h2 className="text-2xl font-bold">Week {week.week}</h2>
                {expandedWeeks.has(week.week) ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </button>

              {expandedWeeks.has(week.week) && (
                <div className="p-6">
                  <div className="grid gap-6">
                    {week.matchups.map((matchup) => (
                      <div key={matchup.id} className="border border-gray-200 rounded-2xl p-6 bg-gradient-to-r from-white to-gray-50 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                          {editingTeams === matchup.id ? (
                            <div className="flex items-center space-x-4 flex-1">
                              <input
                                value={editTeam1}
                                onChange={(e) => setEditTeam1(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Team 1"
                              />
                              <span className="text-gray-500 font-bold">vs</span>
                              <input
                                value={editTeam2}
                                onChange={(e) => setEditTeam2(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Team 2"
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => saveTeamEdit(week.week, matchup.id)}
                                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200"
                                >
                                  <Save className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <h3 className="text-xl font-bold text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors duration-200"
                                  onClick={() => startEditingTeams(matchup.id, matchup.team1, matchup.team2)}>
                                {matchup.team1} <span className="text-gray-500">vs</span> {matchup.team2}
                              </h3>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => startEditingPrediction(matchup.id, matchup.prediction)}
                                  className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg transition-all duration-200 shadow-md"
                                >
                                  <Target className="h-4 w-4" />
                                  <span>Predict</span>
                                </button>
                                <button
                                  onClick={() => startEditing(matchup.id, matchup.writeup)}
                                  className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 shadow-md"
                                >
                                  <Edit className="h-4 w-4" />
                                  <span>Edit</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Prediction Section */}
                        {editingPrediction === matchup.id ? (
                          <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                            <h4 className="font-semibold text-emerald-800 mb-3">Commissioner's Prediction</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-emerald-700 mb-2">Predicted Winner</label>
                                <select
                                  value={predictionWinner}
                                  onChange={(e) => setPredictionWinner(e.target.value)}
                                  className="w-full p-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                >
                                  <option value="">Select winner</option>
                                  <option value={matchup.team1}>{matchup.team1}</option>
                                  <option value={matchup.team2}>{matchup.team2}</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-emerald-700 mb-2">Win Margin (points)</label>
                                <input
                                  type="number"
                                  value={predictionMargin}
                                  onChange={(e) => setPredictionMargin(e.target.value)}
                                  className="w-full p-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                  placeholder="e.g., 14.5"
                                  step="0.1"
                                />
                              </div>
                            </div>
                            <div className="flex space-x-2 mt-4">
                              <button
                                onClick={() => savePredictionEdit(week.week, matchup.id)}
                                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200"
                              >
                                <Save className="h-4 w-4" />
                                <span>Save Prediction</span>
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                              >
                                <X className="h-4 w-4" />
                                <span>Cancel</span>
                              </button>
                            </div>
                          </div>
                        ) : matchup.prediction && (
                          <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-emerald-800 mb-1">Commissioner's Prediction</h4>
                                <p className="text-emerald-700">
                                  <span className="font-bold">{matchup.prediction.winner}</span> wins by {matchup.prediction.margin} points
                                </p>
                              </div>
                              <button
                                onClick={() => startEditingPrediction(matchup.id, matchup.prediction)}
                                className="text-emerald-600 hover:text-emerald-800 transition-colors duration-200"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}

                        {editingMatchup === matchup.id ? (
                          <div className="space-y-4">
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white shadow-inner"
                              placeholder="Enter your matchup analysis..."
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={() => saveEdit(week.week, matchup.id)}
                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all duration-200 shadow-md"
                              >
                                <Save className="h-4 w-4" />
                                <span>Save</span>
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg transition-all duration-200 shadow-md"
                              >
                                <X className="h-4 w-4" />
                                <span>Cancel</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-100 shadow-inner">
                            <p 
                              className="text-gray-700 leading-relaxed whitespace-pre-wrap cursor-pointer hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200 min-h-[60px] flex items-center"
                              onClick={() => startEditing(matchup.id, '')}
                            >
                              {matchup.writeup === 'Click edit to add commissioner analysis for this matchup...' 
                                ? (
                                  <span className="text-gray-400 italic">
                                    Click here to add commissioner analysis for this matchup...
                                  </span>
                                ) 
                                : matchup.writeup
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8 shadow-lg">
          <h3 className="text-lg font-bold text-indigo-900 mb-3">Commissioner Tools</h3>
          <p className="text-indigo-700 leading-relaxed">
            Click on team names to edit matchups, use the "Predict" button to add your win predictions with point margins, 
            and use "Edit" to add detailed analysis for each matchup. ESPN integration coming soon for automatic matchup imports.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PowerRankings;