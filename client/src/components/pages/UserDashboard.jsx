import React, { useEffect, useState } from 'react';
import { 
  User, 
  Vote, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Calendar, 
  TrendingUp,
  Bell,
  Settings,
  HelpCircle,
  ChevronRight,
  Award,
  Users,
  BarChart3,
  Shield,
  Upload,
  Camera,
  MapPin,
  Phone,
  Mail,
  Edit3
} from 'lucide-react';
import { api } from '@/utils/endpointUrls';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null)

  const getUserDetails = async() => {
    const userinfo = localStorage.getItem("userinfo")
    const userData = JSON.parse(userinfo)
    try{
      const response = await axios.get(`${api.generic_fetch}?data=user&id=${userData.user_id}`)
      if(!response.data) toast.error("No valid response.")

      setUserData(response.data.data)
      toast.success("user record fetched successfully.")
    }catch(error){
      console.log("Error occured while fetching user-data: ", error)
    }
  };

  useEffect(() => {
    getUserDetails()
  },[])

  // User status simulation - change this to test different states
  const [userStatus] = useState({
    isLoggedIn: true,
    isVoterRegistered: true, // false = not registered, 'pending' = waiting approval, true = approved
    hasVoted: false,
    profile: {
      name: "Suraj Yadav",
      email: "suraj@email.com",
      phone: "+91 9876543210",
      address: "Hyderabad, Telangana",
      profileComplete: 85,
      joinDate: "2025-01-15"
    }
  });

  const [activePolls] = useState([
    {
      id: 1,
      title: "Community Budget Allocation 2025",
      description: "Vote on how the community budget should be allocated across different projects",
      endDate: "2025-02-15",
      participated: false,
      category: "Budget",
      totalVotes: 1247
    },
    {
      id: 2, 
      title: "New Park Development Location",
      description: "Choose the location for the new community park development project",
      endDate: "2025-02-20",
      participated: true,
      category: "Development",
      totalVotes: 892
    },
    {
      id: 3,
      title: "School Improvement Initiative",
      description: "Vote on priority areas for school infrastructure improvements",
      endDate: "2025-02-25",
      participated: false,
      category: "Education",
      totalVotes: 634
    }
  ]);

  const [notifications] = useState([
    { id: 1, message: "New poll available: Community Budget Allocation 2025", time: "2 hours ago", type: "poll" },
    { id: 2, message: "Your voter registration has been approved!", time: "1 day ago", type: "approval" },
    { id: 3, message: "Profile completion: Add your profile photo", time: "3 days ago", type: "profile" }
  ]);

  const getStatusCard = () => {
    if (userStatus.isVoterRegistered === false) {
      // Not registered as voter yet
      return (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Complete Your Voter Registration</h3>
              <p className="text-blue-100 mb-4">Register as a voter to participate in community polls and elections</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Register to Vote
              </button>
            </div>
            <Vote className="w-16 h-16 text-blue-200" />
          </div>
        </div>
      );
    } else if (userStatus.isVoterRegistered === 'pending') {
      // Registration pending approval
      return (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Voter Registration Under Review</h3>
              <p className="text-orange-100 mb-4">Your voter registration is being reviewed. You'll receive a notification once approved.</p>
              <div className="flex items-center text-orange-100">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">Typically approved within 2-3 business days</span>
              </div>
            </div>
            <Clock className="w-16 h-16 text-orange-200" />
          </div>
        </div>
      );
    } else {
      // Approved voter - can participate in polls
      return (
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Welcome Back, Verified Voter!</h3>
              <p className="text-green-100 mb-4">You're all set to participate in community polls and elections</p>
              <div className="flex items-center text-green-100">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm">Voter registration approved</span>
              </div>
            </div>
            <Award className="w-16 h-16 text-green-200" />
          </div>
        </div>
      );
    }
  };

  const canVote = userStatus.isVoterRegistered === true;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {userData?.first_name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{userData?.first_name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Card */}
        <div className="mb-8">
          {getStatusCard()}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Profile Complete</p>
                    <p className="text-2xl font-bold text-gray-900">{userStatus.profile.profileComplete}%</p>
                  </div>
                  <User className="w-8 h-8 text-blue-500" />
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${userStatus.profile.profileComplete}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Polls Participated</p>
                    <p className="text-2xl font-bold text-gray-900">{activePolls.filter(p => p.participated).length}</p>
                  </div>
                  <Vote className="w-8 h-8 text-green-500" />
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Out of {activePolls.length} available
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Member Since</p>
                    <p className="text-2xl font-bold text-gray-900">Jan 2025</p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-500" />
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Active member
                </div>
              </div>
            </div>

            {/* Available Polls */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Available Polls</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="space-y-4">
                {activePolls.map((poll) => (
                  <div key={poll.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{poll.title}</h3>
                          {poll.participated && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Voted
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{poll.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>Ends {new Date(poll.endDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{poll.totalVotes.toLocaleString()} votes</span>
                          </div>
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                            {poll.category}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        {canVote ? (
                          poll.participated ? (
                            <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed">
                              Already Voted
                            </button>
                          ) : (
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                              Vote Now
                            </button>
                          )
                        ) : (
                          <button className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed">
                            Registration Required
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
                  <Edit3 className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{userData?.first_name}</h4>
                  <p className="text-sm text-gray-600">Community Member</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-3" />
                    <span className="truncate">{userData?.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-3" />
                    <span>{userData?.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-3" />
                    <span className="text-xs">{userStatus.profile.address}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                  Complete Profile
                </button>
              </div>
            </div>

            {/* Recent Notifications */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                  <Bell className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View All Notifications
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { name: "Update Profile", icon: User, enabled: true },
                    { name: "View Voting History", icon: Vote, enabled: canVote },
                    { name: "Account Settings", icon: Settings, enabled: true },
                    { name: "Help & Support", icon: HelpCircle, enabled: true }
                  ].map((item, index) => (
                    <button
                      key={index}
                      disabled={!item.enabled}
                      className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors ${
                        item.enabled 
                          ? 'hover:bg-gray-50 text-gray-700' 
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      {item.enabled && <ChevronRight className="w-4 h-4 text-gray-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;