import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, FileText, Calendar, Zap, Trophy as TrophyIcon, Clock, Save } from 'lucide-react';

const Home = () => {
  const [tradeDeadline, setTradeDeadline] = React.useState('2025-11-15T23:59');
  const [keeperDeadline, setKeeperDeadline] = React.useState('2025-08-15T23:59');
  const [isEditing, setIsEditing] = React.useState(false);

  const quickLinks = [
    {
      title: 'Power Rankings',
      description: 'Check out this week\'s matchup analysis and team rankings',
      icon: TrendingUp,
      path: '/power-rankings',
      color: 'bg-blue-500'
    },
    {
      title: 'League Rules',
      description: 'Review league rules and regulations',
      icon: FileText,
      path: '/rules',
      color: 'bg-emerald-500'
    },
    {
      title: '2025 Draft',
      description: 'View draft results and team rosters',
      icon: Calendar,
      path: '/draft',
      color: 'bg-violet-500'
    },
    {
      title: 'Punishments',
      description: 'Check out punishments and current sacko',
      icon: Zap,
      path: '/punishments',
      color: 'bg-rose-500'
    },
    {
      title: 'History',
      description: 'League champions and past results',
      icon: TrophyIcon,
      path: '/history',
      color: 'bg-amber-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              2B Fantasy Football
            </h1>
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-4xl mx-auto border border-white/20 shadow-2xl">
              <img
                src="/images/barn-draft.jpg"
                alt="2B Fantasy Football League Members"
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
              />
              <p className="text-lg mt-4 text-white/80">2025 Barn Draft</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Deadlines Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Deadlines
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Important Dates
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200"
                >
                  {isEditing ? <Save className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                  <span>{isEditing ? 'Save' : 'Edit'}</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">Trade Deadline</h4>
                  {isEditing ? (
                    <input
                      type="datetime-local"
                      value={tradeDeadline}
                      onChange={(e) => setTradeDeadline(e.target.value)}
                      className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-blue-800 text-lg font-semibold">
                      {new Date(tradeDeadline).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
                  <h4 className="text-lg font-bold text-emerald-900 mb-3">Keeper Deadline</h4>
                  {isEditing ? (
                    <input
                      type="datetime-local"
                      value={keeperDeadline}
                      onChange={(e) => setKeeperDeadline(e.target.value)}
                      className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-emerald-800 text-lg font-semibold">
                      {new Date(keeperDeadline).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          League Central
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 overflow-hidden border border-gray-100"
              >
                <div className="p-8">
                  <div className={`${link.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {link.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;