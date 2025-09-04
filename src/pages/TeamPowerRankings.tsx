import React, { useState, useRef } from 'react';
import { GripVertical, Edit, Save, X, Trophy, TrendingUp } from 'lucide-react';

interface TeamRanking {
  id: string;
  name: string;
  rank: number;
  writeup: string;
}

const TeamPowerRankings = () => {
  const [teams, setTeams] = useState<TeamRanking[]>([
    { id: '1', name: 'The Silverbacks', rank: 1, writeup: 'Click edit to add power ranking analysis for this team...' },
    { id: '2', name: 'Team Gone Jawnson', rank: 2, writeup: 'Click edit to add power ranking analysis for this team...' },
    { id: '3', name: 'Pink Sock', rank: 3, writeup: 'Click edit to add power ranking analysis for this team...' },
    { id: '4', name: 'The Pancake Football Team', rank: 4, writeup: 'Click edit to add power ranking analysis for this team...' },
    { id: '5', name: 'Zweeg', rank: 5, writeup: 'Click edit to add power ranking analysis for this team...' },
    { id: '6', name: 'Maui Mooseknuckles', rank: 6, writeup: 'Click edit to add power ranking analysis for this team...' },
    { id: '7', name: 'NJ Old School', rank: 7, writeup: 'Click edit to add power ranking analysis for this team...' },
    { id: '8', name: 'Central Saudi Scammers', rank: 8, writeup: 'Click edit to add power ranking analysis for this team...' },
    { id: '9', name: 'Jersey Shore Supplements', rank: 9, writeup: 'Click edit to add power ranking analysis for this team...' },
    { id: '10', name: 'Calamari Ballsrings', rank: 10, writeup: 'Click edit to add power ranking analysis for this team...' },
    { id: '11', name: 'Sonalika Scorchers', rank: 11, writeup: 'Click edit to add power ranking analysis for this team...' },
    { id: '12', name: 'Maine Course', rank: 12, writeup: 'Click edit to add power ranking analysis for this team...' }
  ]);

  const [editingTeam, setEditingTeam] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [draggedItem, setDraggedItem] = useState<TeamRanking | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const startEditing = (teamId: string, currentText: string) => {
    setEditingTeam(teamId);
    setEditText(currentText === 'Click edit to add power ranking analysis for this team...' ? '' : currentText);
  };

  const saveEdit = (teamId: string) => {
    const textToSave = editText.trim() === '' ? 'Click edit to add power ranking analysis for this team...' : editText;
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, writeup: textToSave } : team
    ));
    setEditingTeam(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingTeam(null);
    setEditText('');
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

    const dragIndex = teams.findIndex(team => team.id === draggedItem.id);
    if (dragIndex === dropIndex) return;

    const newTeams = [...teams];
    const [removed] = newTeams.splice(dragIndex, 1);
    newTeams.splice(dropIndex, 0, removed);

    // Update ranks based on new positions
    const updatedTeams = newTeams.map((team, index) => ({
      ...team,
      rank: index + 1
    }));

    setTeams(updatedTeams);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const getRankColor = (rank: number) => {
    if (rank <= 3) return 'from-yellow-500 to-amber-500';
    if (rank <= 6) return 'from-emerald-500 to-green-500';
    if (rank <= 9) return 'from-blue-500 to-cyan-500';
    return 'from-red-500 to-rose-500';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-300" />;
    if (rank <= 3) return <TrendingUp className="h-6 w-6 text-white" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-red-600 bg-clip-text text-transparent mb-4">Power Rankings</h1>
          <p className="text-xl text-gray-600">Commissioner's weekly team power rankings and analysis</p>
        </div>

        <div className="space-y-4">
          {teams.map((team, index) => (
            <div
              key={team.id}
              draggable
              onDragStart={(e) => handleDragStart(e, team)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50 cursor-move transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                dragOverIndex === index ? 'ring-4 ring-indigo-300 ring-opacity-50' : ''
              } ${draggedItem?.id === team.id ? 'opacity-50' : ''}`}
            >
              <div className={`bg-gradient-to-r ${getRankColor(team.rank)} px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center space-x-4">
                  <GripVertical className="h-6 w-6 text-white/80 hover:text-white cursor-grab active:cursor-grabbing" />
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg">
                    {getRankIcon(team.rank) || (
                      <span className="text-2xl font-bold text-white">{team.rank}</span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{team.name}</h2>
                    <p className="text-white/80">Rank #{team.rank}</p>
                  </div>
                </div>
                <button
                  onClick={() => startEditing(team.id, team.writeup)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 shadow-md backdrop-blur-sm"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="p-6">
                {editingTeam === team.id ? (
                  <div className="space-y-4">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white shadow-inner"
                      placeholder="Enter your power ranking analysis for this team..."
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => saveEdit(team.id)}
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

        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8 shadow-lg">
          <h3 className="text-lg font-bold text-indigo-900 mb-3">Commissioner Tools</h3>
          <p className="text-indigo-700 leading-relaxed">
            Drag and drop teams using the grip handle to reorder the power rankings. The rank numbers will automatically update based on position. 
            Click "Edit" to add detailed analysis for each team's current performance, roster moves, and outlook.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamPowerRankings;