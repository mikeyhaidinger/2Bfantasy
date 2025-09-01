import React, { useState } from 'react';
import { Users, ChevronDown, ChevronUp } from 'lucide-react';

interface DraftPick {
  round: number;
  pick: number;
  team: string;
  player: string;
  position: string;
}

interface TeamRoster {
  teamName: string;
  picks: DraftPick[];
}

const Draft = () => {
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());
  const [selectedRound, setSelectedRound] = useState(1);

  const teams = [
    'Thunder Bolts', 'Grid Iron Giants', 'Touchdown Titans', 'End Zone Eagles',
    'Blitz Brigade', 'Pigskin Pirates', 'Gridiron Gladiators', 'Fantasy Falcons',
    'Scoreboard Slayers', 'Championship Chasers', 'Victory Vipers', 'Dynasty Demons'
  ];

  // Mock draft data - replace with actual draft results
  const [draftPicks] = useState<DraftPick[]>([
    { round: 1, pick: 1, team: 'Thunder Bolts', player: 'Christian McCaffrey', position: 'RB' },
    { round: 1, pick: 2, team: 'Grid Iron Giants', player: 'Austin Ekeler', position: 'RB' },
    { round: 1, pick: 3, team: 'Touchdown Titans', player: 'Cooper Kupp', position: 'WR' },
    { round: 1, pick: 4, team: 'End Zone Eagles', player: 'Josh Allen', position: 'QB' },
    { round: 1, pick: 5, team: 'Blitz Brigade', player: 'Stefon Diggs', position: 'WR' },
    { round: 1, pick: 6, team: 'Pigskin Pirates', player: 'Davante Adams', position: 'WR' },
    { round: 1, pick: 7, team: 'Gridiron Gladiators', player: 'Derrick Henry', position: 'RB' },
    { round: 1, pick: 8, team: 'Fantasy Falcons', player: 'Travis Kelce', position: 'TE' },
    { round: 1, pick: 9, team: 'Scoreboard Slayers', player: 'Patrick Mahomes', position: 'QB' },
    { round: 1, pick: 10, team: 'Championship Chasers', player: 'Tyreek Hill', position: 'WR' },
    { round: 1, pick: 11, team: 'Victory Vipers', player: 'Jonathan Taylor', position: 'RB' },
    { round: 1, pick: 12, team: 'Dynasty Demons', player: 'Nick Chubb', position: 'RB' },
    // Add more rounds with mock data
    { round: 2, pick: 13, team: 'Dynasty Demons', player: 'Ja\'Marr Chase', position: 'WR' },
    { round: 2, pick: 14, team: 'Victory Vipers', player: 'Saquon Barkley', position: 'RB' },
    { round: 2, pick: 15, team: 'Championship Chasers', player: 'CeeDee Lamb', position: 'WR' },
  ]);

  const rounds = Array.from({ length: 16 }, (_, i) => i + 1);

  const getRoundPicks = (round: number) => {
    return draftPicks.filter(pick => pick.round === round);
  };

  const getTeamPicks = (teamName: string) => {
    return draftPicks.filter(pick => pick.team === teamName).sort((a, b) => a.round - b.round);
  };

  const toggleTeam = (teamName: string) => {
    const newExpanded = new Set(expandedTeams);
    if (newExpanded.has(teamName)) {
      newExpanded.delete(teamName);
    } else {
      newExpanded.add(teamName);
    }
    setExpandedTeams(newExpanded);
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'QB': return 'bg-gradient-to-r from-red-500 to-rose-500 text-white';
      case 'RB': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'WR': return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white';
      case 'TE': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      case 'K': return 'bg-gradient-to-r from-purple-500 to-violet-500 text-white';
      case 'DEF': return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">2025 Draft Board</h1>
          <p className="text-xl text-gray-600">Complete draft results for all 12 teams</p>
        </div>

        {/* Round Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {rounds.map((round) => (
              <button
                key={round}
                onClick={() => setSelectedRound(round)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedRound === round
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md hover:scale-105'
                }`}
              >
                Round {round}
              </button>
            ))}
          </div>
        </div>

        {/* Draft Picks for Selected Round */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50 mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Users className="h-6 w-6 mr-2" />
              Round {selectedRound}
            </h2>
          </div>
          <div className="p-6">
            {getRoundPicks(selectedRound).length > 0 ? (
              <div className="grid gap-4">
                {getRoundPicks(selectedRound).map((pick) => (
                  <div key={`${pick.round}-${pick.pick}`} className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="flex items-center space-x-6">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
                        {pick.pick}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">{pick.team}</div>
                        <div className="text-sm text-gray-500">Pick {pick.pick}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-lg">{pick.player}</div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold shadow-md ${getPositionColor(pick.position)}`}>
                        {pick.position}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No picks available for Round {selectedRound}</p>
                <p className="text-gray-400 mt-2">Draft picks will appear here once the draft is completed</p>
              </div>
            )}
          </div>
        </div>

        {/* Team Rosters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Team Rosters</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {teams.map((team, index) => {
                const teamPicks = getTeamPicks(team);
                const isExpanded = expandedTeams.has(team);
                
                return (
                  <div key={team} className="bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                    <button
                      onClick={() => toggleTeam(team)}
                      className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <span className="font-bold text-gray-900 text-lg">{team}</span>
                          <div className="text-sm text-gray-500">{teamPicks.length} picks</div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 pb-6">
                        <div className="space-y-3">
                          {teamPicks.length > 0 ? (
                            teamPicks.map((pick) => (
                              <div key={`${pick.round}-${pick.pick}`} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center space-x-3">
                                  <div className="bg-gray-100 text-gray-700 rounded-lg w-8 h-8 flex items-center justify-center font-bold text-sm">
                                    {pick.round}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">{pick.player}</div>
                                    <div className="text-xs text-gray-500">Round {pick.round}, Pick {pick.pick}</div>
                                  </div>
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-xs font-bold shadow-sm ${getPositionColor(pick.position)}`}>
                                  {pick.position}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              No picks yet for this team
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;