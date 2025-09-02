import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

const HighlightedText = ({ text, searchTerm }: { text: string; searchTerm: string }) => {
  if (!searchTerm) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  return (
    <span>
      {parts.map((part, index) => 
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded font-semibold">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

const LeagueRules = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const rules = [
    {
      category: 'Roster & Lineup',
      items: [
        {
          title: 'Starting Lineup',
          content: '1 QB, 2 RB, 2 WR, 1 TE, 1 FLEX (RB/WR/TE), 1 K, 1 DEF'
        },
        {
          title: 'Bench Size',
          content: '6 bench spots for position players'
        },
        {
          title: 'Waiver Claims',
          content: 'FAAB (Free Agent Acquisition Budget) system with $100 budget per season'
        },
        {
          title: 'Trade Deadline',
          content: 'Week 11 - No trades allowed after this point'
        }
      ]
    },
    {
      category: 'Scoring',
      items: [
        {
          title: 'Passing',
          content: '1 point per 25 passing yards, 4 points per passing TD, -2 points per interception'
        },
        {
          title: 'Rushing',
          content: '1 point per 10 rushing yards, 6 points per rushing TD'
        },
        {
          title: 'Receiving',
          content: '1 point per 10 receiving yards, 6 points per receiving TD, 0.5 points per reception (PPR)'
        },
        {
          title: 'Kicking',
          content: '1 point per PAT, 3 points for FG 0-39 yards, 4 points for FG 40-49 yards, 5 points for FG 50+ yards'
        },
        {
          title: 'Defense',
          content: 'Points allowed: 0 pts = 10, 1-6 pts = 7, 7-13 pts = 4, 14-20 pts = 1, 21-27 pts = 0, 28-34 pts = -1, 35+ pts = -4'
        }
      ]
    },
    {
      category: 'Draft Rules',
      items: [
        {
          title: 'Draft Format',
          content: 'Snake draft with randomized order'
        },
        {
          title: 'Draft Time',
          content: 'Annual draft held in late August/early September'
        },
        {
          title: 'Pick Time Limit',
          content: '2 minutes per pick during live draft'
        }
      ]
    },
    {
      category: 'League Fees & Payouts',
      items: [
        {
          title: 'Entry Fee',
          content: '$50 per team due before draft'
        },
        {
          title: 'Champion Payout',
          content: '$400 (66.7% of total pot)'
        },
        {
          title: 'Runner-up Payout',
          content: '$200 (33.3% of total pot)'
        }
      ]
    },
    {
      category: 'Conduct & Fair Play',
      items: [
        {
          title: 'Collusion',
          content: 'Strictly prohibited. Any evidence of collusion results in immediate expulsion'
        },
        {
          title: 'Inactive Teams',
          content: 'Teams must set active lineups. Repeated inactive lineups subject to replacement'
        },
        {
          title: 'Trade Review',
          content: '24-hour review period for all trades. Commissioner may veto obviously unfair trades'
        }
      ]
    }
  ];

  const filteredRules = useMemo(() => {
    if (!searchTerm) return rules;
    
    return rules.map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.items.length > 0);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">League Rules</h1>
        <p className="text-xl text-gray-600">Official rules and regulations for 2B Fantasy Football</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-lg text-lg"
          />
        </div>
      </div>

      {/* Rules Categories */}
      <div className="space-y-8">
        {filteredRules.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">{category.category}</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {category.items.map((rule, ruleIndex) => (
                  <div key={ruleIndex} className="border-l-4 border-indigo-300 pl-6 py-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      <HighlightedText text={rule.title} searchTerm={searchTerm} />
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      <HighlightedText text={rule.content} searchTerm={searchTerm} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRules.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No rules found matching "{searchTerm}"</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default LeagueRules;