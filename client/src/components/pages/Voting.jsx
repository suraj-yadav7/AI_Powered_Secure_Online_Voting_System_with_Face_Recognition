import React, { useEffect, useState } from 'react';
import { 
  Vote, 
  CheckCircle, 
  Clock, 
  Users, 
  Award, 
  MapPin,
  Calendar,
  BarChart3,
  ArrowLeft,
  AlertCircle,
  Shield,
  Eye,
  EyeOff,
  User
} from 'lucide-react';
import axios from 'axios';
import { api } from '@/utils/endpointUrls';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';

const Voting = () => {
  /** staticData */
  const nomineesStaticData= [
      {
        _id: "65f1111111111",
        full_name: "Dr. Rajesh Kumar",
        political_party: "Progressive Party",
        constituency: "Ward 12 - Central District",
        votes_count: 4521,
        manifesto: "Focused on infrastructure development, healthcare improvements, and education reforms.",
        experience: "15 years in public service",
        image: null
        },
      {
        _id: "65f2222222222", 
        full_name: "Priya Sharma",
        political_party: "Unity Alliance",
        constituency: "Ward 12 - Central District",
        votes_count: 3892,
        manifesto: "Committed to women empowerment, environmental sustainability, and digital governance.",
        experience: "Former teacher, 8 years community work",
        image: null
      },
      {
        _id: "65f3333333333",
        full_name: "Mohammad Ali Khan",
        political_party: "Development Front",
        constituency: "Ward 12 - Central District", 
        votes_count: 3456,
        manifesto: "Economic growth, job creation, and improved public transportation systems.",
        experience: "Business leader, 5 years local politics",
        image: null
      },
      {
        _id: "65f4444444444",
        full_name: "Sunita Devi",
        political_party: "People's Voice",
        constituency: "Ward 12 - Central District",
        votes_count: 2891,
        manifesto: "Focus on rural development, farmer support, and affordable housing initiatives.",
        experience: "Social worker, 12 years grassroots activism",
        image: null
      },
      {
        _id: "65f5555555555",
        full_name: "Vikram Singh",
        political_party: "Independent",
        constituency: "Ward 12 - Central District",
        votes_count: 663,
        manifesto: "Anti-corruption platform, transparency in governance, and citizen participation.",
        experience: "RTI activist, 10 years transparency advocacy",
        image: null
      }
    ]

  const electionStaticData={
    _id: "65f1234567890",
    name: "Greater Hyderabad Municipal Corporation Elections 2025",
    type: "Local Government",
    total_votes: 3,
    result: false,
    createdAt: "2025-01-10T00:00:00Z",
    deadline: "2025-08-11T23:59:59Z"
  }

  // Sample election data based on your schema
  const [election, setElection] = useState("");
  const [selectedNominee, setSelectedNominee] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedFor, setVotedFor] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [nomineesData, setNomineesData] = useState([])

  const {id} = useParams()
  const electionId =  id || "68b1e396f7fc4323e668e61a"
  const getElection = async()=> {
    try{
      const response = await axios.get(`${api.generic_fetch}?data=election&id=${electionId}`)
      console.log("electiion: ", response.data.data)
      if(!response.data){
        toast.error("failed to fetch election details")
      }
      toast.success("election details fetched successfully.")
      setElection(response.data?.data)
      return response.data?.data?.nominees
    }catch(error){
      console.log("Error occured while fetching election details: ", error)
    }
  };

  const getNominees = async(nomineesList)=> {
    console.log("nominees: ", election)
    try{
      const response = await Promise.all(
        nomineesList && nomineesList.map( async(id) => {
          const res = await axios.get(`${api.generic_fetch}?data=nominee&id=${id}`)
          return res.data.data
        }))
      console.log("promise nominees: ", response)
      toast.success("nominees details fetched successfully.")
      setNomineesData(response)
    }catch(error){
      console.log("Error occured while fetching nominees details: ", error)
    }
  };
  const navigate = useNavigate()
  const handleVoteClick = (nominee) => {
    if (hasVoted) return;
    setSelectedNominee(nominee);
    setShowConfirmation(true);
    navigate(`/face-capturing/${electionId}`)
  };

  const confirmVote = () => {
    // In real implementation, this would call your API
    setHasVoted(true);
    setVotedFor(selectedNominee);
    setShowConfirmation(false);
    // Update vote count locally for demo
    const updatedNominees = election.nominees.map(nominee => 
      nominee._id === selectedNominee._id 
        ? { ...nominee, votes_count: nominee.votes_count + 1 }
        : nominee
    );
    election.nominees = updatedNominees;
    election.total_votes += 1;
  };

  const getVotePercentage = (votes) => {
    return election.total_votes > 0 ? ((votes / election.total_votes) * 100).toFixed(1) : 0;
  };

  const isElectionActive = () => {
    return new Date() < new Date(election.deadline) && !election.result;
  };

  const sortedNominees = nomineesData.sort((a, b) => b.votes_count - a.votes_count);
  const getElectionAndNominees = async() => {
    const resNomineesList = await getElection()

    await getNominees(resNomineesList)
  }
  useEffect(() => {
    getElectionAndNominees()
  },[])

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-1 ">
      {/* Header */}
      <div className="border-md bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600  text-white rounded-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white py-1">{election.name}</h1>
              <div className="flex items-center space-x-6 text-sm text-gray-600 mt-1">
                <div className="flex items-center text-white">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Ends: {new Date(election && election.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-white">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{ election && election.total_votes.toLocaleString()} votes cast</span>
                </div>
                <div className="flex items-center text-white">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{ election && election.type}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* <button
                onClick={() => setShowResults(!showResults)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {showResults ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="text-sm font-medium">
                  {showResults ? 'Hide Results' : 'Show Results'}
                </span>
              </button> */}
              {hasVoted && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Vote Submitted</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 ">
        {/* Election Status */}
        <div className="mb-8">
          {isElectionActive() ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium text-blue-900">Election in Progress</h3>
                  <p className="text-blue-700 text-sm">
                    Cast your vote before {new Date(election.deadline).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            //   <div className="flex items-center">
            //     <AlertCircle className="w-5 h-5 text-gray-600 mr-3" />
            //     <div>
            //       <h3 className="font-medium text-gray-900">Election Closed</h3>
            //       <p className="text-gray-700 text-sm">
            //         This election has ended. Results are {election.result ? 'available' : 'being processed'}.
            //       </p>
            //     </div>
            //   </div>
            // </div>
            ""
          )}
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedNominees.map((nominee, index) => (
            <div 
              key={nominee._id} 
              className={`bg-white rounded-lg shadow-sm border transition-all duration-200 ${
                hasVoted && votedFor?._id === nominee._id 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:shadow-md'
              }`}
            >
              <div className="p-6">
                {/* Candidate Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{nominee.full_name}</h3>
                      <p className="text-blue-600 font-medium">{nominee.political_party}</p>
                      <p className="text-sm text-gray-600">{nominee.constituency}</p>
                    </div>
                  </div>
                  {index === 0 && showResults && (
                    <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                      <Award className="w-4 h-4" />
                      <span>Leading</span>
                    </div>
                  )}
                  {hasVoted && votedFor?._id === nominee._id && (
                    <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Your Vote</span>
                    </div>
                  )}
                </div>

                {/* Candidate Details */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Experience:</strong> {nominee.experience}
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>Manifesto:</strong> {nominee.manifesto}
                  </div>
                </div>

                {/* Vote Results (if showing) */}
                {showResults && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Votes Received</span>
                      <span className="text-lg font-bold text-gray-900">
                        {nominee.votes_count.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getVotePercentage(nominee.votes_count)}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-600 mt-1">
                      {getVotePercentage(nominee.votes_count)}%
                    </div>
                  </div>
                )}

                {/* Vote Button */}
                <div className="flex space-x-3">
                  {isElectionActive() && (
                    <button
                      onClick={() => handleVoteClick(nominee)}
                      disabled={hasVoted}
                      className={`cursor-pointer flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
                        hasVoted 
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <Vote className="w-4 h-4 mr-2 " />
                      {hasVoted ? 'Vote Cast' : 'Vote for ' + nominee.full_name.split(' ')[0]}
                    </button>
                  )}
                  {/* <button className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                    View Profile
                  </button>
                  <button className="px-4 py-3 border bg-blue-500 border-gray-300 rounded-lg text-white hover:bg-blue-300 transition-colors cursor-pointer">
                    Vote
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Election Stats */}
        {showResults && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Election Statistics</h3>
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{election.total_votes.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Votes</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{election.nominees.length}</div>
                <div className="text-sm text-gray-600">Candidates</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{Math.max(...election.nominees.map(n => n.votes_count)).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Highest Votes</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {getVotePercentage(Math.max(...election.nominees.map(n => n.votes_count)))}%
                </div>
                <div className="text-sm text-gray-600">Leading Margin</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vote Confirmation Modal */}
      {showConfirmation && selectedNominee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Vote className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Your Vote</h3>
              <p className="text-gray-600 mb-6">
                You are about to vote for <strong>{selectedNominee.full_name}</strong> from <strong>{selectedNominee.political_party}</strong>.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>Important:</strong> Once submitted, your vote cannot be changed. Please ensure this is your final choice.
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmVote}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm Vote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Voting;