import React, { useState, useEffect } from 'react';
import { GripVertical, Edit, Save, X, Trophy, TrendingUp, Medal, Award } from 'lucide-react';
import { supabase, type PowerRanking } from '../lib/supabase';

interface TeamRanking {
  id: string;
  name: string;
  rank: number;
  writeup: string;
}

const TeamPowerRankings = () => {
  const [teams, setTeams] = useState<TeamRanking[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingTeam, setEditingTeam] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editingRank, setEditingRank] = useState<string | null>(null);
  const [tempRank, setTempRank] = useState('');
  const [draggedItem, setDraggedItem] = useState<TeamRanking | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Load power rankings from database
  useEffect(() => {
    loadPowerRankings();
  }, []);

  const loadPowerRankings = async () => {
    try {
      const { data, error } = await supabase
        .from('power_rankings')
        .select('*')
        .order('rank_position', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        // Convert database records to local format
        const loadedTeams = data.map((ranking: PowerRanking) => ({
          id: ranking.id,
          name: ranking.team_name,
          rank: ranking.rank_position,
          writeup: ranking.writeup
        }));
        setTeams(loadedTeams);
      } else {
        // Initialize with default teams if no data exists
        await initializeDefaultTeams();
      }
    } catch (error) {
      console.error('Error loading power rankings:', error);
      // Fallback to default teams on error
      await initializeDefaultTeams();
    } finally {
      setLoading(false);
    }
  };

  const initializeDefaultTeams = async () => {
    const defaultTeams = [
      'The Silverbacks', 'Team Gone Jawnson', 'Pink Sock', 'The Pancake Football Team',
      'Zweeg', 'Maui Mooseknuckles', 'NJ Old School', 'Central Saudi Scammers',
      'Jersey Shore Supplements', 'Calamari Ballsrings', 'Sonalika Scorchers', 'Maine Course'
    ];

    try {
      const teamsToInsert = defaultTeams.map((teamName, index) => ({
        team_name: teamName,
        rank_position: index + 1,
        writeup: 'Click edit to add power ranking analysis for this team...'
      }));

      const { data, error } = await supabase
        .from('power_rankings')
        .insert(teamsToInsert)
        .select();

      if (error) throw error;

      if (data) {
        const loadedTeams = data.map((ranking: PowerRanking) => ({
          id: ranking.id,
          name: ranking.team_name,
          rank: ranking.rank_position,
          writeup: ranking.writeup
        }));
        setTeams(loadedTeams);
      }
    } catch (error) {
      console.error('Error initializing default teams:', error);
      // Set local state as fallback
      const fallbackTeams = defaultTeams.map((teamName, index) => ({
        id: (index + 1).toString(),
        name: teamName,
        rank: index + 1,
        writeup: 'Click edit to add power ranking analysis for this team...'
      }));
      setTeams(fallbackTeams);
    }
  };

  // Sort teams by rank whenever teams state changes
  const sortedTeams = [...teams].sort((a, b) => a.rank - b.rank);

  const startEditing = (teamId: string, currentText: string) => {
    setEditingTeam(teamId);
    setEditText(currentText === 'Click edit to add power ranking analysis for this team...' ? '' : currentText);
  };

  const startEditingRank = (teamId: string, currentRank: number) => {
    setEditingRank(teamId);
    setTempRank(currentRank.toString());
  };

  const saveEdit = (teamId: string) => {
    const textToSave = editText.trim() === '' ? 'Click edit to add power ranking analysis for this team...' : editText;
    updateTeamInDatabase(teamId, { writeup: textToSave });
    setEditingTeam(null);
    setEditText('');
  };

  const saveRankEdit = (teamId: string) => {
    const newRank = parseInt(tempRank);
    if (newRank >= 1 && newRank <= 12) {
      updateTeamRankInDatabase(teamId, newRank);
    }
    setEditingRank(null);
    setTempRank('');
  };

  const updateTeamInDatabase = async (teamId: string, updates: { writeup?: string; rank_position?: number }) => {
    try {
      const { error } = await supabase
        .from('power_rankings')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', teamId);

      if (error) throw error;

      // Update local state
      setTeams(teams.map(team => {
        if (team.id === teamId) {
          const updatedTeam = { ...team };
          if (updates.writeup !== undefined) updatedTeam.writeup = updates.writeup;
          if (updates.rank_position !== undefined) updatedTeam.rank = updates.rank_position;
          return updatedTeam;
        }
        return team;
      }));
    } catch (error) {
      console.error('Error updating team:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  const updateTeamRankInDatabase = async (teamId: string, newRank: number) => {
    try {
      // Get the current team and its old rank
      const currentTeam = teams.find(t => t.id === teamId);
      if (!currentTeam) return;
      
      const oldRank = currentTeam.rank;
      if (oldRank === newRank) return; // No change needed
      
      // Create a copy of teams array for manipulation
      let updatedTeams = [...teams];
      
      if (oldRank < newRank) {
        // Moving down (e.g., 1 → 6): shift teams up between old and new position
        updatedTeams = updatedTeams.map(team => {
          if (team.id === teamId) {
            return { ...team, rank: newRank };
          } else if (team.rank > oldRank && team.rank <= newRank) {
            return { ...team, rank: team.rank - 1 };
          }
          return team;
        });
      } else {
        // Moving up (e.g., 6 → 1): shift teams down between new and old position
        updatedTeams = updatedTeams.map(team => {
          if (team.id === teamId) {
            return { ...team, rank: newRank };
          } else if (team.rank >= newRank && team.rank < oldRank) {
            return { ...team, rank: team.rank + 1 };
          }
          return team;
        });
      }
      
      // Update all affected teams in the database
      for (const team of updatedTeams) {
        const { error } = await supabase
          .from('power_rankings')
          .update({
            rank_position: team.rank,
            updated_at: new Date().toISOString()
          })
          .eq('id', team.id);
          
        if (error) throw error;
      }
      
      // Update local state
      setTeams(updatedTeams);
    } catch (error) {
      console.error('Error updating team rank:', error);
      alert('Failed to update ranking. Please try again.');
    }
  };

  const updateAllTeamRanks = async (updatedTeams: TeamRanking[]) => {
    try {
      // Update all teams with their new ranks
      const updates = updatedTeams.map((team, index) => ({
        id: team.id,
        rank_position: index + 1,
        updated_at: new Date().toISOString()
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('power_rankings')
          .update({
            rank_position: update.rank_position,
            updated_at: update.updated_at
          })
          .eq('id', update.id);

        if (error) throw error;
      }

      // Update local state
      const finalTeams = updatedTeams.map((team, index) => ({
        ...team,
        rank: index + 1
      }));
      setTeams(finalTeams);
    } catch (error) {
      console.error('Error updating team ranks:', error);
      alert('Failed to update rankings. Please try again.');
    }
  };

  const cancelEdit = () => {
    setEditingTeam(null);
    setEditText('');
    setEditingRank(null);
    setTempRank('');
  };

  const handleDragStart = (e: React.DragEvent, team: TeamRanking) => {
    setDraggedItem(team);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const dragIndex = sortedTeams.findIndex(team => team.id === draggedItem.id);
    if (dragIndex === dropIndex) return;

    const newTeams = [...sortedTeams];
    const [removed] = newTeams.splice(dragIndex, 1);
    newTeams.splice(dropIndex, 0, removed);

    // Update all team ranks in database
    updateAllTeamRanks(newTeams);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const getRankGradient = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 via-yellow-500 to-amber-500';
    if (rank === 2) return 'from-gray-300 via-gray-400 to-gray-500';
    if (rank === 3) return 'from-orange-400 via-orange-500 to-red-500';
    if (rank <= 6) return 'from-emerald-400 via-emerald-500 to-green-600';
    if (rank <= 9) return 'from-blue-400 via-blue-500 to-indigo-600';
    return 'from-red-400 via-red-500 to-rose-600';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-7 w-7 text-yellow-100 drop-shadow-lg" />;
    if (rank === 2) return <Medal className="h-7 w-7 text-gray-100 drop-shadow-lg" />;
    if (rank === 3) return <Award className="h-7 w-7 text-orange-100 drop-shadow-lg" />;
    return null;
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) return 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-xl';
    if (rank <= 6) return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg';
    if (rank <= 9) return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg';
    return 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-red-600 bg-clip-text text-transparent mb-4">Power Rankings</h1>
          <p className="text-xl text-gray-600">Commissioner's weekly team power rankings and analysis</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 text-lg">Loading power rankings...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedTeams.map((team, index) => (
            <div
              key={team.id}
              draggable
              onDragStart={(e) => handleDragStart(e, team)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className={`group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-white/60 cursor-move transition-all duration-300 hover:scale-[1.02] ${
                dragOverIndex === index ? 'ring-4 ring-indigo-300 ring-opacity-50 scale-[1.02]' : ''
              } ${draggedItem?.id === team.id ? 'opacity-50 scale-95' : ''}`}
            >
              {/* Sleek Header Banner */}
              <div className={`bg-gradient-to-r ${getRankGradient(team.rank)} px-4 py-2 relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-black/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <GripVertical className="h-6 w-6 text-white/70 hover:text-white cursor-grab active:cursor-grabbing transition-colors duration-200" />
                    
                    {/* Editable Rank Number Bubble */}
                    <div className="flex items-center space-x-2">
                      {editingRank === team.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="1"
                            max="12"
                            value={tempRank}
                            onChange={(e) => setTempRank(e.target.value)}
                            className="w-12 h-12 text-center text-lg font-bold bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                            onKeyPress={(e) => e.key === 'Enter' && saveRankEdit(team.id)}
                            autoFocus
                          />
                          <button
                            onClick={() => saveRankEdit(team.id)}
                            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
                          >
                            <Save className="h-4 w-4 text-white" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
                          >
                            <X className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      ) : (
                        <div 
                          onClick={() => startEditingRank(team.id, team.rank)}
                          className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full shadow-lg cursor-pointer hover:bg-white/30 transition-all duration-200 hover:scale-110"
                        >
                          {getRankIcon(team.rank) || (
                            <span className="text-lg font-bold text-white drop-shadow-lg">{team.rank}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Team Name */}
                    <div>
                      <h2 className="text-xl font-bold text-white drop-shadow-lg">{team.name}</h2>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => startEditing(team.id, team.writeup)}
                    className="flex items-center space-x-2 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 shadow-lg backdrop-blur-sm hover:scale-105"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="font-medium text-sm">Edit</span>
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-4">
                {editingTeam === team.id ? (
                  <div className="space-y-4">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none bg-white shadow-inner text-gray-700 placeholder-gray-400"
                      placeholder="Enter your power ranking analysis for this team..."
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={() => saveEdit(team.id)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Analysis</span>
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-100 shadow-inner hover:shadow-lg transition-shadow duration-200">
                    <p 
                      className="text-gray-700 leading-relaxed whitespace-pre-wrap cursor-pointer hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200 min-h-[60px] flex items-center"
                      onClick={() => startEditing(team.id, team.writeup)}
                    >
                      {team.writeup === 'Click edit to add power ranking analysis for this team...' 
                        ? (
                          <span className="text-gray-400 italic">
                            Click here to add power ranking analysis for this team...
                          </span>
                        ) 
                        : team.writeup
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Commissioner Tools */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center">
            <Trophy className="h-6 w-6 mr-2" />
            Commissioner Tools
          </h3>
          <div className="space-y-3 text-indigo-700">
            <p className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span><strong>Click rank numbers</strong> to edit and automatically reorder teams</span>
            </p>
            <p className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span><strong>Drag teams</strong> using the grip handle to manually reorder rankings</span>
            </p>
            <p className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span><strong>Click "Edit Analysis"</strong> to add detailed writeups for each team</span>
            </p>
            <p className="flex items-start">
              <span className="font-semibold mr-2">•</span>
              <span><strong>Color coding:</strong> Gold (1-3), Green (4-6), Blue (7-9), Red (10-12)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPowerRankings;