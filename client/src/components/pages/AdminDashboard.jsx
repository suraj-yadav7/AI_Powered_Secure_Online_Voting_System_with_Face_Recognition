import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Vote, ClipboardCheck, BarChart3, Bell,
  Calendar, Clock, ArrowRight, Shield} from 'lucide-react';
import { api } from '@/utils/endpointUrls';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 12845,
    totalVoters: 8932,
    pendingApprovals: 23,
    activePolls: 5,
  });

  /** Static Data of Quick-Action cards */
  const quickActions = [
    {
      title: "User Management",
      description: "Manage all registered users, view profiles, and handle user accounts",
      icon: Users,
      color: "bg-blue-500",
      stats: `${stats.totalUsers.toLocaleString()} Users`,
      link: "/user-approval"
    },
    {
      title: "Voter Management",
      description: "Manage voter registrations, verify eligibility, and handle voter data",
      icon: Vote,
      color: "bg-green-500",
      stats: `${stats.totalVoters.toLocaleString()} Voters`,
      link: "/voter-approval"
    },
    {
      title: "Voter Approvals",
      description: "Review and approve pending user signups and voter registrations",
      icon: ClipboardCheck,
      color: "bg-orange-500",
      stats: `${stats.pendingApprovals} Pending`,
      link: "/voter-approval",
      urgent: stats.pendingApprovals > 0
    },
    {
      title: "Analytics & Reports",
      description: "View system analytics, generate reports, and track metrics",
      icon: BarChart3,
      color: "bg-purple-500",
      stats: "View Reports",
      link: ""
    }
  ];

  /** Fetch User, Voter and Pending Approval Counts */
  const getUserCounts = async()=>{
    try{
      const urls = [`${api.generic_count}?data=user`, `${api.generic_count}?data=voter`,
        `${api.generic_count}?data=voter&approved=true`, `${api.generic_count}?data=election&result=false`]
      const response = await Promise.all(
        urls.map((url) =>  axios.get(url)
            .then((res) => res.data.data)
        ));

      console.log("Response: ", response)
      if(!response || response.length <=1){
        console.log("No Valid Reponse From Server.")
        return
      };

      setStats((prev) => ({...prev, totalUsers:response[0], totalVoters:response[1],
        pendingApprovals:response[2], activePolls:response[3]}))
    }catch(error){
      console.log("Error Occured while fetching user count: ", error)
    }
  };

  /** Navigate user to target page */
  const navigateHandle = (link)=>{
    if(!link){
      return false
    }
    window.open(link, "_blank")
  };

  useEffect(() =>{
    getUserCounts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, Administrator</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {1 > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>

          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Voters</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalVoters.toLocaleString()}</p>
              </div>
              <Vote className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-gray-600">{Math.round((stats.totalVoters/stats.totalUsers)*100)}% of users</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingApprovals}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-orange-600">Needs attention</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Polls</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activePolls}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-gray-600">Currently running</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Status</p>
                <p className="text-lg font-bold text-green-600">Healthy</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600">All systems operational</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-20">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => (
                <div key={index} onClick={()=> navigateHandle(action.link)} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer group">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      {action.urgent && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                          Urgent
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{action.stats}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
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

export default AdminDashboard;