import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Eye, User, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import axios from 'axios';
import { api } from '@/utils/endpointUrls';
import toast from 'react-hot-toast';

const UserApproval = () => {
  // Sample data for pending requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Naveen Kumar",
      email: "naveen@email.com",
      phone: "+91 9876543210",
      type: "Voter Registration",
      address: "123 Main St, New Delhi",
      dateSubmitted: "2025-01-10",
      status: "pending",
      documents: ["Aadhaar Card", "Address Proof"]
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.w@email.com",
      phone: "+91 8765432109",
      type: "User Signup",
      address: "456 Park Ave, Mumbai",
      dateSubmitted: "2025-01-12",
      status: "pending",
      documents: ["ID Proof"]
    },
    {
      id: 3,
      name: "Raj Kumar",
      email: "raj.kumar@email.com",
      phone: "+91 7654321098",
      type: "Voter Registration",
      address: "789 Civil Lines, Bangalore",
      dateSubmitted: "2025-01-14",
      status: "pending",
      documents: ["Aadhaar Card", "Passport", "Utility Bill"]
    },
    {
      id: 4,
      name: "Priya Sharma",
      email: "priya.s@email.com",
      phone: "+91 6543210987",
      type: "User Signup",
      address: "321 MG Road, Chennai",
      dateSubmitted: "2025-01-13",
      status: "pending",
      documents: ["Driver's License"]
    }
  ]);
  const [userData, setUserData] = useState(null)
  const [totalUsers, setTotalUsers] = useState(0)

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleApprove = async(id) => {
    setRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: 'approved' } : req
    ));
    try{
      console.log("idsd: ", id)
      const response = await axios.put(api.update_user, {id:id, isActive:true})
      console.log("Response approve: ", response.data)
    }catch(error){
      console.log("Error occured while approving user: ", error)
    }
  };

  const handleReject = async(id) => {
    setRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
    try{
      console.log("idsd: ", id)
      const response = await axios.put(api.update_user, {id:id, rejected:true})
      console.log("Response approve: ", response.data)
    }catch(error){
      console.log("Error occured while approving user: ", error)
    }
  };

  const viewDetails = (request) => {
    console.log("dd: ", request)
    setSelectedRequest(request);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case true: return 'text-green-600 bg-green-100';
      case false: return 'text-red-600 bg-red-100';
      default: return 'text-yellow-900 bg-yellow-100';
    }
  };

  const getTypeColor = (type) => {
    return type === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  /** Fetch User-Data */
  const fetchUsers = async(page=1, limit=15)=>{
    try{
      const response = await axios.get(`${api.generic_fetch}?data=user&page=${page}&limit=${limit}`)
      if(!response.data){
        toast.error("No Valid Response From Server.")
        return
      };
      console.log("Response userData: ", response)
      const {data, message} = response.data
      if(data.data.length===0){
        toast.error("No Record Found.")
        return
      };

      toast.success(message)
      // const userData = data.data.filter((elem) => !elem.rejected)
      setUserData(data.data)
      setTotalUsers(data.totalRecords)
    }catch(error){
      console.log("Error Occured While Fetching User: ", error)
    }
  };


  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Registration Approvals</h1>
          <p className="text-gray-600">Review and approve pending user registration requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-gray-900">{totalUsers}</div>
            <div className="text-sm text-gray-600">Total User</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-green-600">{userData && userData.filter(r => r.isActive).length}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-yellow-400">{userData && userData.filter(r => !r.isActive).length}</div>
            <div className="text-sm text-gray-600">UnActive</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-red-300">{userData && userData.filter(r => r.rejected).length}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-red-600">{userData && userData.filter(r => r.isDeleted).length}</div>
            <div className="text-sm text-gray-600">Deleted</div>
          </div>
        </div>

        {/* Request Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData&&userData.map((data) => (
            <div key={data.id} className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow`} >              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{data.first_name} {data.last_name}</h3>
                    </div>
                  </div>
                </div>

                {/* Request Type */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mr-2 ${getTypeColor(data.profile_type)}`}>
                    {data.profile_type}
                  </span>
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${data?.rejected?"bg-red-100 text-red-600": data.isActive?"bg-green-100 text-green-600":data.isDeleted?"bg-red-200 text-red-800":"bg-yellow-100 text-yellow-600"} `}>
                    {data?.rejected?"Rejected": data.isActive?"Active":data.isDeleted?"Deleted":"Not Active"}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="truncate">{data.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{data.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(data.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => viewDetails(data)}
                    className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  
                  {data.isActive === false && data?.rejected === false &&(
                    <>
                      <button
                        onClick={() => handleApprove(data._id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(data._id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {showModal && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Request Details</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedRequest.first_name}</h3>
                      <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(selectedRequest.profile_type)}`}>
                        {selectedRequest.profile_type}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{selectedRequest.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <p className="text-gray-900">{selectedRequest.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Submitted</label>
                      <p className="text-gray-900">{new Date(selectedRequest.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <span className={`inline-block px-3 py-1 text-sm font-bold  rounded-full ${getStatusColor(selectedRequest.isActive)}`}>
                        {selectedRequest?.rejected? "Rejected": selectedRequest.isActive ? "active":"Not Active"}
                      </span>
                    </div>
                  </div>

                  {selectedRequest.isActive === false && selectedRequest?.rejected === false && (
                    <div className="flex space-x-3 pt-4 border-t">
                      <button
                        onClick={() => {
                          handleApprove(selectedRequest.id);
                          setShowModal(false);
                        }}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Approve Request
                      </button>
                      <button
                        onClick={() => {
                          handleReject(selectedRequest.id);
                          setShowModal(false);
                        }}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="w-5 h-5 mr-2" />
                        Reject Request
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserApproval;