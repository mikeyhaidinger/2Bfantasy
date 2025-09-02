import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, FileText, Calendar, Zap, Trophy as TrophyIcon, Clock, Save, X } from 'lucide-react';
import { supabase, type Deadline } from '../lib/supabase';

const Home = () => {
  const [tradeDeadline, setTradeDeadline] = React.useState('');
  const [keeperDeadline, setKeeperDeadline] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // Load deadlines from Supabase
  React.useEffect(() => {
    loadDeadlines();
  }, []);

  const loadDeadlines = async () => {
    try {
      const { data, error } = await supabase
        .from('deadlines')
        .select('*');

      if (error) throw error;

      const tradeDeadlineData = data.find((d: Deadline) => d.type === 'trade');
      const keeperDeadlineData = data.find((d: Deadline) => d.type === 'keeper');

      if (tradeDeadlineData?.deadline) {
        setTradeDeadline(new Date(tradeDeadlineData.deadline).toISOString().slice(0, 16));
      }
      if (keeperDeadlineData?.deadline) {
        setKeeperDeadline(new Date(keeperDeadlineData.deadline).toISOString().slice(0, 16));
      }
    } catch (error) {
      console.error('Error loading deadlines:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveDeadlines = async () => {
    try {
      setLoading(true);
      
      // Handle trade deadline
      const tradeDeadlineValue = tradeDeadline ? new Date(tradeDeadline).toISOString() : null;
      
      const { error: tradeError } = await supabase
        .from('deadlines')
        .upsert({
          type: 'trade',
          deadline: tradeDeadlineValue,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'type'
        });
      
      if (tradeError) throw tradeError;

      // Handle keeper deadline
      const keeperDeadlineValue = keeperDeadline ? new Date(keeperDeadline).toISOString() : null;
      
      const { error: keeperError } = await supabase
        .from('deadlines')
        .upsert({
          type: 'keeper',
          deadline: keeperDeadlineValue,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'type'
        });
      
      if (keeperError) throw keeperError;

      setIsEditing(false);
    } catch (error) {
      console.error('Error saving deadlines:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    {
      title: 'Standings',
      description: 'View current league standings and team records',
      icon: TrendingUp,
      path: '/standings',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      title: 'Draft Results',
      description: 'Review draft picks and team rosters',
      icon: FileText,
      path: '/draft',
      color: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      title: 'Schedule',
      description: 'Check upcoming games and matchups',
      icon: Calendar,
      path: '/schedule',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      title: 'Trades',
      description: 'View trade history and proposals',
      icon: Zap,
      path: '/trades',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600'
    },
    {
      title: 'Trophy Room',
      description: 'League champions and awards',
      icon: TrophyIcon,
      path: '/trophies',
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
    },
    {
      title: 'Keepers',
      description: 'Manage keeper selections',
      icon: Clock,
      path: '/keepers',
      color: 'bg-gradient-to-br from-red-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="relative h-64 overflow-hidden">
        <img
          src="/images/barn-draft.jpg"
          alt="Barn Draft - 2B Fantasy Football League"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/158826/structure-light-ceiling-architecture-158826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Deadlines Section */}
        <div className="bg-white rounded-2xl shadow-xl mb-12 overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Clock className="h-6 w-6 mr-2" />
                Important Deadlines
              </h3>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={saveDeadlines}
                      disabled={loading}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-50"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        loadDeadlines();
                      }}
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading deadlines...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-bold text-blue-900 mb-3">Trade Deadline</h4>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="datetime-local"
                        value={tradeDeadline}
                        onChange={(e) => setTradeDeadline(e.target.value)}
                        className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {tradeDeadline && (
                        <button
                          onClick={() => setTradeDeadline('')}
                          className="flex items-center space-x-1 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm transition-colors duration-200"
                        >
                          <X className="h-3 w-3" />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      {tradeDeadline ? (
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
                      ) : (
                        <p className="text-blue-600 italic">No deadline set</p>
                      )}
                    </div>
                  )}
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
                  <h4 className="text-lg font-bold text-emerald-900 mb-3">Keeper Deadline</h4>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="datetime-local"
                        value={keeperDeadline}
                        onChange={(e) => setKeeperDeadline(e.target.value)}
                        className="w-full p-3 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      {keeperDeadline && (
                        <button
                          onClick={() => setKeeperDeadline('')}
                          className="flex items-center space-x-1 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm transition-colors duration-200"
                        >
                          <X className="h-3 w-3" />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      {keeperDeadline ? (
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
                      ) : (
                        <p className="text-emerald-600 italic">No deadline set</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-red-600 group-hover:bg-clip-text transition-all duration-300">
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