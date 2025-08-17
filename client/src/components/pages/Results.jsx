import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Users, 
  BarChart3, 
  Calendar, 
  MapPin,
  ArrowLeft,
  Download,
  Share2,
  CheckCircle,
  Medal,
  User,
  Percent,
  TrendingUp,
  Clock,
  Flag,
  Target
} from 'lucide-react';

const Results = () => {
  // Sample election data with completed results (result: true)
  const [election] = useState({
    _id: "65f1234567890",
    name: "Greater Hyderabad Municipal Corporation Elections 2025",
    type: "Local Government",
    total_votes: 3,
    result: true,
    nominees: [
      {
        _id: "65f1111111111",
        full_name: "Dr. Rajesh Kumar",
        political_party: "Progressive Party",
        constituency: "Ward 12 - Central District",
        votes_count: 7125,
        manifesto: "Focused on infrastructure development, healthcare improvements, and education reforms.",
        experience: "15 years in public service",
        position: 1,
        winner: true
      },
      {
        _id: "65f2222222222", 
        full_name: "Priya Sharma",
        political_party: "Unity Alliance",
        constituency: "Ward 12 - Central District",
        votes_count: 5625,
        manifesto: "Committed to women empowerment, environmental sustainability, and digital governance.",
        experience: "Former teacher, 8 years community work",
        position: 2,
        winner: false
      },
      {
        _id: "65f3333333333",
        full_name: "Mohammad Ali Khan",
        political_party: "Development Front",
        constituency: "Ward 12 - Central District", 
        votes_count: 3750,
        manifesto: "Economic growth, job creation, and improved public transportation systems.",
        experience: "Business leader, 5 years local politics",
        position: 3,
        winner: false
      },
      {
        _id: "65f4444444444",
        full_name: "Sunita Devi",
        political_party: "People's Voice",
        constituency: "Ward 12 - Central District",
        votes_count: 1875,
        manifesto: "Focus on rural development, farmer support, and affordable housing initiatives.",
        experience: "Social worker, 12 years grassroots activism",
        position: 4,
        winner: false
      },
      {
        _id: "65f5555555555",
        full_name: "Vikram Singh",
        political_party: "Independent",
        constituency: "Ward 12 - Central District",
        votes_count: 375,
        manifesto: "Anti-corruption platform, transparency in governance, and citizen participation.",
        experience: "RTI activist, 10 years transparency advocacy",
        position: 5,
        winner: false
      }
    ],
    createdAt: "2025-01-10T00:00:00Z",
    endDate: "2025-02-15T23:59:59Z",
    resultDeclaredAt: "2025-08-25T23:59:59Z"
  });

  const [showDetailedStats, setShowDetailedStats] = useState(false);

  const winner = election.nominees.find(nominee => nominee.winner);
  const runnerUp = election.nominees.find(nominee => nominee.position === 2);
  
  const getVotePercentage = (votes) => {
    return ((votes / election.total_votes) * 100).toFixed(1);
  };

  const getPositionIcon = (position) => {
    switch (position) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-500" />;
      default: return <Target className="w-6 h-6 text-gray-300" />;
    }
  };

  const getPositionColor = (position) => {
    switch (position) {
      case 1: return "bg-yellow-50 border-yellow-200";
      case 2: return "bg-gray-50 border-gray-200";
      case 3: return "bg-orange-50 border-orange-200";
      default: return "bg-white border-gray-200";
    }
  };

  const sortedNominees = [...election.nominees].sort((a, b) => a.position - b.position);

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600  text-white rounded-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">

              <div>
                <h1 className="text-2xl font-bold  text-white">Election Results</h1>
                <div className="flex items-center space-x-6 text-sm text-gray-600 mt-1">
                  <div className="flex items-center text-white">
                    <Flag className="w-4 h-4 mr-1" />
                    <span>{election.name}</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Declared: {new Date(election.resultDeclaredAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{election.total_votes.toLocaleString()} total votes</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Winner Announcement */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-8 mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Trophy className="w-12 h-12 text-black" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">🎉 Election Winner Declared! 🎉</h2>
            <div className="text-xl mb-4">
              <strong>{winner?.full_name}</strong> from <strong>{winner?.political_party}</strong>
            </div>
            <div className="flex justify-center items-center space-x-8 text-green-100">
              <div className="text-center">
                <div className="text-2xl font-bold">{winner?.votes_count.toLocaleString()}</div>
                <div className="text-sm">Votes Received</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{getVotePercentage(winner?.votes_count)}%</div>
                <div className="text-sm">Vote Share</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">+{(winner?.votes_count - runnerUp?.votes_count).toLocaleString()}</div>
                <div className="text-sm">Victory Margin</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Votes Cast</p>
                <p className="text-2xl font-bold text-gray-900">{election.total_votes.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              High turnout
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{election.nominees.length}</p>
              </div>
              <User className="w-8 h-8 text-purple-500" />
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Contested election
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Victory Margin</p>
                <p className="text-2xl font-bold text-gray-900">{getVotePercentage(winner?.votes_count - runnerUp?.votes_count)}%</p>
              </div>
              <Percent className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {winner?.votes_count > (election.total_votes / 2) ? 'Clear mandate' : 'Close contest'}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Result Status</p>
                <p className="text-lg font-bold text-green-600">Declared</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-2 text-sm text-gray-600 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(election.resultDeclaredAt).toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Complete Results</h3>
              <button
                onClick={() => setShowDetailedStats(!showDetailedStats)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {showDetailedStats ? 'Hide' : 'Show'} Detailed Stats
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {sortedNominees.map((nominee, index) => (
              <div key={nominee._id} className={`p-6 ${getPositionColor(nominee.position)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      {getPositionIcon(nominee.position)}
                      <div className="text-2xl font-bold text-gray-700">
                        #{nominee.position}
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <span>{nominee.full_name}</span>
                        {nominee.winner && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">WINNER</span>
                        )}
                      </h4>
                      <p className="text-blue-600 font-medium">{nominee.political_party}</p>
                      <p className="text-sm text-gray-600">{nominee.constituency}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {nominee.votes_count.toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-600 mb-2">
                      {getVotePercentage(nominee.votes_count)}% of votes
                    </div>
                    <div className="w-64 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          nominee.winner ? 'bg-green-500' : 
                          nominee.position === 2 ? 'bg-blue-500' :
                          nominee.position === 3 ? 'bg-orange-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${getVotePercentage(nominee.votes_count)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {showDetailedStats && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Experience: </span>
                        <span className="text-gray-600">{nominee.experience}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Vote Share: </span>
                        <span className="text-gray-600">{getVotePercentage(nominee.votes_count)}%</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Position: </span>
                        <span className="text-gray-600">#{nominee.position} of {election.nominees.length}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="font-medium text-gray-700">Key Manifesto: </span>
                      <span className="text-gray-600">{nominee.manifesto}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Vote Distribution Chart */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Vote Distribution</h3>
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="space-y-4">
            {sortedNominees.map((nominee, index) => (
              <div key={nominee._id} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-gray-700 truncate">
                  {nominee.full_name}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className={`h-6 rounded-full transition-all duration-700 ${
                      index === 0 ? 'bg-green-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-orange-500' :
                      index === 3 ? 'bg-purple-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${getVotePercentage(nominee.votes_count)}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    {nominee.votes_count.toLocaleString()} ({getVotePercentage(nominee.votes_count)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Election Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Election Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Election Details</h4>
              <div className="space-y-1">
                <div><strong>Election Name:</strong> {election.name}</div>
                <div><strong>Type:</strong> {election.type}</div>
                <div><strong>Constituency:</strong> {election.nominees[0]?.constituency}</div>
                <div><strong>Total Candidates:</strong> {election.nominees.length}</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
              <div className="space-y-1">
                <div><strong>Started:</strong> {new Date(election.createdAt).toLocaleDateString()}</div>
                <div><strong>Ended:</strong> {new Date(election.endDate).toLocaleDateString()}</div>
                <div><strong>Result Declared:</strong> {new Date(election.resultDeclaredAt).toLocaleDateString()}</div>
                <div><strong>Status:</strong> <span className="text-green-600">Completed</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;