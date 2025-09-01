import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

const History = () => {
  const champions = [
    {
      year: 2024,
      champion: 'Thunder Bolts',
      runnerUp: 'Championship Chasers',
      thirdPlace: 'Victory Vipers',
      record: '12-2'
    },
    {
      year: 2023,
      champion: 'Gridiron Gladiators',
      runnerUp: 'Victory Vipers',
      thirdPlace: 'Dynasty Demons',
      record: '11-3'
    },
    {
      year: 2022,
      champion: 'Dynasty Demons',
      runnerUp: 'Touchdown Titans',
      thirdPlace: 'Fantasy Falcons',
      record: '10-4'
    },
    {
      year: 2021,
      champion: 'Scoreboard Slayers',
      runnerUp: 'Blitz Brigade',
      thirdPlace: 'Thunder Bolts',
      record: '13-1'
    },
    {
      year: 2020,
      champion: 'Fantasy Falcons',
      runnerUp: 'End Zone Eagles',
      thirdPlace: 'Gridiron Gladiators',
      record: '9-5'
    }
  ];

  const getPlaceIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="h-8 w-8 text-yellow-400" />;
      case 1: return <Medal className="h-8 w-8 text-gray-400" />;
      case 2: return <Award className="h-8 w-8 text-orange-400" />;
      default: return <Award className="h-8 w-8 text-blue-400" />;
    }
  };

  const getPlaceGradient = (index: number) => {
    switch (index) {
      case 0: return 'from-yellow-50 to-amber-50 border-yellow-200';
      case 1: return 'from-gray-50 to-slate-50 border-gray-200';
      case 2: return 'from-orange-50 to-red-50 border-orange-200';
      default: return 'from-blue-50 to-indigo-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">League History</h1>
          <p className="text-xl text-gray-600">Celebrating our champions and memorable seasons</p>
        </div>

        {/* Championship Timeline */}
        <div className="space-y-8">
          {champions.map((season, index) => (
            <div key={season.year} className={`bg-gradient-to-r ${getPlaceGradient(index)} rounded-2xl shadow-xl overflow-hidden border-2 hover:shadow-2xl transition-all duration-500 hover:scale-105`}>
              <div className="p-8">
                <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
                  <div className="flex items-center space-x-6">
                    {getPlaceIcon(index)}
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{season.year} Champion</h2>
                      <p className="text-gray-600 text-lg">Season {season.year}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-700">
                      {season.record}
                    </div>
                    <div className="text-sm text-gray-500">Regular Season</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-6 border border-yellow-200 shadow-lg">
                    <h3 className="font-bold text-yellow-800 mb-3 flex items-center text-lg">
                      <Trophy className="h-6 w-6 mr-2" />
                      Champion
                    </h3>
                    <p className="text-yellow-900 text-xl font-bold">{season.champion}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-100 to-slate-100 rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center text-lg">
                      <Medal className="h-6 w-6 mr-2" />
                      Runner-up
                    </h3>
                    <p className="text-gray-900 text-xl font-bold">{season.runnerUp}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 border border-orange-200 shadow-lg">
                    <h3 className="font-bold text-orange-800 mb-3 flex items-center text-lg">
                      <Award className="h-6 w-6 mr-2" />
                      Third Place
                    </h3>
                    <p className="text-orange-900 text-xl font-bold">{season.thirdPlace}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Most Successful Teams */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Most Successful Teams</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { name: 'Thunder Bolts', championships: 1, runnerUps: 1, playoffAppearances: 4 },
                { name: 'Gridiron Gladiators', championships: 1, runnerUps: 0, playoffAppearances: 3 },
                { name: 'Dynasty Demons', championships: 1, runnerUps: 1, playoffAppearances: 4 },
                { name: 'Scoreboard Slayers', championships: 1, runnerUps: 0, playoffAppearances: 2 },
                { name: 'Fantasy Falcons', championships: 1, runnerUps: 1, playoffAppearances: 3 }
              ].map((team, index) => (
                <div key={team.name} className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <span className="font-bold text-gray-900 text-lg">{team.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="space-y-1">
                      <div className="font-bold text-gray-700 text-lg">
                        {team.championships} Championship{team.championships !== 1 ? 's' : ''}
                      </div>
                      <div className="text-sm text-gray-600">
                        {team.runnerUps} Runner-up{team.runnerUps !== 1 ? 's' : ''} • {team.playoffAppearances} Playoff{team.playoffAppearances !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Losingest Teams */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
          <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Losingest Teams</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { name: 'Grid Iron Giants', sackos: 1, sackoAppearances: 2 },
                { name: 'End Zone Eagles', sackos: 1, sackoAppearances: 3 },
                { name: 'Pigskin Pirates', sackos: 1, sackoAppearances: 2 },
                { name: 'Blitz Brigade', sackos: 0, sackoAppearances: 2 },
                { name: 'Championship Chasers', sackos: 0, sackoAppearances: 1 }
              ].map((team, index) => (
                <div key={team.name} className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{team.name}</div>
                      <div className="text-sm text-gray-600">Hall of Shame</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="space-y-1">
                      <div className="font-bold text-red-700 text-lg">
                        {team.sackos} Sacko{team.sackos !== 1 ? 's' : ''}
                      </div>
                      <div className="text-sm text-gray-600">
                        {team.sackoAppearances} Sacko Appearance{team.sackoAppearances !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;