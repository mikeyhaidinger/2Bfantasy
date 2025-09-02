import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Save, X, Target } from 'lucide-react';
import { supabase, type Matchup } from '../lib/supabase';

interface LocalMatchup {
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
  matchups: LocalMatchup[];
  isComplete: boolean;
}

const PowerRankings = () => {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set());
  const [editingMatchup, setEditingMatchup] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editingTeams, setEditingTeams] = useState<string | null>(null);
  const [editTeam1, setEditTeam1] = useState('');
  const [editTeam2, setEditTeam2] = useState('');
  const [editingPrediction, setEditingPrediction] = useState<string | null>(null);
  const [predictionWinner, setPredictionWinner] = useState('');
  const [predictionMargin, setPredictionMargin] = useState('');

  const [weeksData, setWeeksData] = useState<WeekData[]>([]);
  const [loading, setLoading] = useState(true);

  // Load matchups from Supabase
  React.useEffect(() => {
    loadMatchups();
  }, []);

  // Auto-expand the first incomplete week when data loads
  React.useEffect(() => {
    if (weeksData.length > 0) {
      const firstIncompleteWeek = weeksData.find(week => !week.isComplete);
      if (firstIncompleteWeek) {
        setExpandedWeeks(new Set([firstIncompleteWeek.week]));
      }
    }
  }, [weeksData]);

  const loadMatchups = async () => {
    try {
      const { data, error } = await supabase
        .from('matchups')
        .select('*')
        .order('week', { ascending: true })
        .order('matchup_id', { ascending: true });

      if (error) throw error;

      // Group matchups by week
      const weekGroups: { [key: number]: LocalMatchup[] } = {};
      const weekCompletionStatus: { [key: number]: boolean } = {};
      
      data.forEach((matchup: Matchup) => {
        if (!weekGroups[matchup.week]) {
          weekGroups[matchup.week] = [];
          weekCompletionStatus[matchup.week] = matchup.is_complete;
        }
        
        weekGroups[matchup.week].push({
          id: matchup.matchup_id,
          team1: matchup.team1,
          team2: matchup.team2,
          writeup: matchup.writeup,
          prediction: matchup.prediction_winner && matchup.prediction_margin !== null ? {
            winner: matchup.prediction_winner,
            margin: matchup.prediction_margin
          } : null
        });
      });

      // Convert to WeekData array
      const weeks: WeekData[] = [];
      for (let weekNum = 1; weekNum <= 13; weekNum++) {
        weeks.push({
          week: weekNum,
          matchups: weekGroups[weekNum] || [],
          isComplete: weekCompletionStatus[weekNum] || false
        });
      }
      
      setWeeksData(weeks);
    } catch (error) {
      console.error('Error loading matchups:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWeek = (week: number) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(week)) {
      newExpanded.delete(week);
    } else {
      newExpanded.add(week);
    }
    setExpandedWeeks(newExpanded);
  };

  const toggleWeekComplete = async (weekNumber: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the week from expanding/collapsing
    
    const currentWeek = weeksData.find(w => w.week === weekNumber);
    if (!currentWeek) return;
    
    const newIsComplete = !currentWeek.isComplete;
    
    try {
      // Update all matchups for this week in the database
      const { error } = await supabase
        .from('matchups')
        .update({ 
          is_complete: newIsComplete,
          updated_at: new Date().toISOString()
        })
        .eq('week', weekNumber);

      if (error) throw error;

      // Update local state
      setWeeksData(weeks =>
        weeks.map(week =>
          week.week === weekNumber
            ? { ...week, isComplete: newIsComplete }
            : week
        )
      );

      // If marking as complete, close the week and open the next incomplete week
      if (newIsComplete) {
        // Close the completed week
        const newExpanded = new Set(expandedWeeks);
        newExpanded.delete(weekNumber);
        
        // Find and open the next incomplete week
        const updatedWeeks = weeksData.map(week =>
          week.week === weekNumber
            ? { ...week, isComplete: newIsComplete }
            : week
        );
        
        const nextIncompleteWeek = updatedWeeks.find(w => w.week > weekNumber && !w.isComplete);
        if (nextIncompleteWeek) {
          newExpanded.add(nextIncompleteWeek.week);
        }
        
        setExpandedWeeks(newExpanded);
      }
    } catch (error) {
      console.error('Error updating week completion status:', error);
      alert('Failed to update week completion status. Please try again.');
    }
  };


  // Sort weeks: incomplete weeks first (by week number), then completed weeks at bottom
  const sortedWeeks = [...weeksData].sort((a, b) => {
    if (a.isComplete && !b.isComplete) return 1;
    if (!a.isComplete && b.isComplete) return -1;
    return a.week - b.week;
  });

  const startEditing = (matchupId: string, currentText: string) => {
    setEditingMatchup(matchupId);
    setEditText(currentText);
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
    const textToSave = editText.trim() === '' ? 'Click edit to add commissioner analysis for this matchup...' : editText;
    updateMatchupInDatabase(matchupId, { writeup: textToSave });
  };

  const saveTeamEdit = (weekNumber: number, matchupId: string) => {
    updateMatchupInDatabase(matchupId, { team1: editTeam1, team2: editTeam2 });
  };

  const savePredictionEdit = (weekNumber: number, matchupId: string) => {
    const margin = parseFloat(predictionMargin);
    if (predictionWinner && !isNaN(margin)) {
      updateMatchupInDatabase(matchupId, { 
        prediction_winner: predictionWinner, 
        prediction_margin: margin 
      });
    }
  };

  const updateMatchupInDatabase = async (matchupId: string, updates: any) => {
    try {
      const { error } = await supabase
        .from('matchups')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('matchup_id', matchupId);

      if (error) throw error;

      // Update local state
      setWeeksData(weeks =>
        weeks.map(week => ({
          ...week,
          matchups: week.matchups.map(matchup => {
            if (matchup.id === matchupId) {
              const updatedMatchup = { ...matchup };
              if (updates.writeup !== undefined) updatedMatchup.writeup = updates.writeup;
              if (updates.team1 !== undefined) updatedMatchup.team1 = updates.team1;
              if (updates.team2 !== undefined) updatedMatchup.team2 = updates.team2;
              if (updates.prediction_winner !== undefined && updates.prediction_margin !== undefined) {
                updatedMatchup.prediction = {
                  winner: updates.prediction_winner,
                  margin: updates.prediction_margin
                };
              }
              return updatedMatchup;
            }
            return matchup;
          })
        }))
      );

      // Clear editing states
      setEditingMatchup(null);
      setEditText('');
      setEditingTeams(null);
      setEditTeam1('');
      setEditTeam2('');
      setEditingPrediction(null);
      setPredictionWinner('');
      setPredictionMargin('');
    } catch (error) {
      console.error('Error updating matchup:', error);
    }
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
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-4 text-lg">Loading matchups...</p>
            </div>
          ) : (
          <>
          {sortedWeeks.map((week) => (
            <div key={week.week} className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50 ${week.isComplete ? 'opacity-75' : ''}`}>
              <button
                onClick={() => toggleWeek(week.week)}
                className={`w-full px-6 py-4 ${week.isComplete ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'} text-white flex items-center justify-between transition-all duration-300`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={week.isComplete}
                      onChange={(e) => toggleWeekComplete(week.week, e)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5 text-emerald-600 bg-white border-2 border-white rounded focus:ring-emerald-500 focus:ring-2 mr-3"
                    />
                    <h2 className={`text-2xl font-bold ${week.isComplete ? 'line-through' : ''}`}>
                      Week {week.week} {week.isComplete && '(Complete)'}
                    </h2>
                  </div>
                </div>
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
                              onClick={() => startEditing(matchup.id, matchup.writeup)}
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
          </>
          )}
        </div>

        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8 shadow-lg">
          <h3 className="text-lg font-bold text-indigo-900 mb-3">Commissioner Tools</h3>
          <p className="text-indigo-700 leading-relaxed">
            Click on team names to edit matchups, use the "Predict" button to add your win predictions with point margins, 
            and use "Edit" to add detailed analysis for each matchup. Check the box next to a week to mark it as complete - 
            completed weeks will move to the bottom and the next week will automatically open. ESPN integration coming soon for automatic matchup imports.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PowerRankings;