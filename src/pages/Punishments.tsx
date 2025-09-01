import React, { useState } from 'react';
import { Skull, Trophy, Calendar } from 'lucide-react';

const Punishments = () => {
  const [activeTab, setActiveTab] = useState<'punishments' | 'sackos'>('punishments');

  const punishments = [
    {
      title: 'Full Body Wax',
      description: 'You must get your entire body waxed head to toe from neck down. This includes a Brazilian (booty hole waxed). You must also shave your head (?)'
    },
    {
      title: 'Waffle House Challenge',
      description: 'Enter a Waffle House and remain there for 24 hours. Each pancake/waffle is minus an hour. No silver dollar/bs pancakes - normal sized pancakes. Must check in each hour. If Waffle House closes, time is paused and you must head to another Waffle House. Throwing up doesn\'t impact anything.'
    },
    {
      title: 'Squeegee/Water Boy',
      description: 'Must get a cooler of waters and squeegee tools and stand at an intersection or stoplight. Must be there for 6 hours (or time agreed on by members). If you get paid for squeegee/waters a certain amount (we will vote on amount) your time ends and you can go home.'
    }
  ];

  const currentSacko = {
    name: 'Dave Voitek - Central Saudi Scammers',
    image: '/images/current-sacko.jpg'
  };

  const pastSackos = [
    { year: 2024, team: 'Dave', punishment: 'Beerito 5k' },
    { year: 2023, team: 'Kurt', punishment: 'Sexy Calendar' },
    { year: 2022, team: 'Mac', punishment: 'Belly button ring' },
    { year: 2021, team: 'Shilk', punishment: 'NFL combine' },
    { year: 2020, team: 'Kurt', punishment: 'IG influencer' },
    { year: 2019, team: 'Trung', punishment: 'Oreo mile' },
    { year: 2018, team: 'Corazza', punishment: 'Yeeted from league' },
    { year: 2017, team: 'Stefan', punishment: 'Sacko not a thing yet' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">Punishments & Sackos</h1>
        <p className="text-xl text-gray-600">The price of fantasy football failure</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-white/60 backdrop-blur-sm p-1 rounded-2xl max-w-md mx-auto shadow-lg border border-white/50">
          <button
            onClick={() => setActiveTab('punishments')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'punishments'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Punishments
          </button>
          <button
            onClick={() => setActiveTab('sackos')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'sackos'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sackos
          </button>
        </div>
      </div>

      {activeTab === 'punishments' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
          <div className="bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Skull className="h-6 w-6 mr-2" />
              Available Punishments
            </h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-6">
              The new sacko gets to choose their punishment from the list below. Choose wisely...
            </p>
            <div className="grid gap-6">
              {punishments.map((punishment, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{punishment.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{punishment.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sackos' && (
        <div className="space-y-8">
          {/* Current Sacko */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
            <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Trophy className="h-6 w-6 mr-2" />
                This Year's Sacko
              </h2>
            </div>
            <div className="p-6 text-center">
              <img
                src={currentSacko.image}
                alt={currentSacko.name}
                className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-2xl border-4 border-white"
              />
              <h3 className="text-3xl font-bold text-gray-900 mb-3">{currentSacko.name}</h3>
              <p className="text-gray-600">Current holder of the sacko title</p>
            </div>
          </div>

          {/* Past Sackos */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
            <div className="bg-gradient-to-r from-gray-600 to-slate-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Calendar className="h-6 w-6 mr-2" />
                Sacko History
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {pastSackos.map((sacko, index) => (
                  <div key={index} className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                        {sacko.year}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{sacko.team}</div>
                        <div className="text-sm text-gray-600">Sacko Champion</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-700">{sacko.punishment}</div>
                      <div className="text-sm text-gray-500">Completed punishment</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Punishments;