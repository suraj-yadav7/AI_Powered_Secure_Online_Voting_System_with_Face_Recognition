import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCheck, UserX, Users, CheckCircle, XCircle, Search, Edit, Trash2, Eye, MapPin, Phone, Mail, Calendar, Award, AlertTriangle, Shield } from "lucide-react";

const Voter = () => {
  const [voters, setVoters] = useState([
    {
      _id: "1",
      first_name: "Raj",
      last_name: "Kumar",
      date_of_birth: "1985-06-15",
      gender: "male",
      phone: 9876543210,
      aadhar_number: 123456789012,
      email: "raj.kumar@email.com",
      address: {
        house_no: "12-3-45",
        locality: "MG Road",
        landmark: "Near City Mall",
        mandal: "Secunderabad",
        district: "Hyderabad",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500003"
      },
      constituency: "Secunderabad",
      occupation: "Software Engineer",
      highest_qualification: "B.Tech",
      face_recognition: "face_raj_001.jpg",
      isDeleted: false,
      approved: true,
      casted_vote: false,
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T14:30:00Z"
    },
    {
      _id: "2",
      first_name: "Sakshi",
      last_name: "Mishra",
      date_of_birth: "1990-03-22",
      gender: "female",
      phone: 9123456789,
      aadhar_number: 123456789013,
      email: "sakshi@gmail.com",
      address: {
        house_no: "45-2-78",
        locality: "Jubilee Hills",
        landmark: "Opposite Park",
        mandal: "Hyderabad",
        district: "Hyderabad",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500033"
      },
      constituency: "Jubilee Hills",
      occupation: "Teacher",
      highest_qualification: "M.Ed",
      face_recognition: "",
      isDeleted: false,
      approved: false,
      casted_vote: false,
      createdAt: "2024-01-16T11:20:00Z",
      updatedAt: "2024-01-18T09:15:00Z"
    },
    {
      _id: "3",
      first_name: "Satvik",
      last_name: "Reddy",
      date_of_birth: "1978-12-08",
      gender: "male",
      phone: 9876543212,
      aadhar_number: 123456789014,
      email: "Satvik@email.com",
      address: {
        house_no: "78-9-12",
        locality: "Banjara Hills",
        landmark: "Near Hospital",
        mandal: "Hyderabad",
        district: "Hyderabad",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500034"
      },
      constituency: "Banjara Hills",
      occupation: "Business Owner",
      highest_qualification: "MCA",
      face_recognition: "face_arjun_003.jpg",
      isDeleted: false,
      approved: true,
      casted_vote: true,
      createdAt: "2024-01-17T09:15:00Z",
      updatedAt: "2024-01-22T16:45:00Z"
    },
    {
      _id: "4",
      first_name: "Navya",
      last_name: "Goud",
      date_of_birth: "1995-09-30",
      gender: "female",
      phone: 9113456799,
      aadhar_number: 123456789015,
      email: "navya@email.com",
      address: {
        house_no: "23-5-67",
        locality: "Kukatpally",
        landmark: "Bus Stop",
        mandal: "Kukatpally",
        district: "Hyderabad",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500072"
      },
      constituency: "Kukatpally",
      occupation: "Nurse",
      highest_qualification: "BSc Electronics",
      face_recognition: "",
      isDeleted: true,
      approved: false,
      casted_vote: false,
      createdAt: "2024-01-18T13:45:00Z",
      updatedAt: "2024-01-21T11:30:00Z"
    },
    {
      _id: "5",
      first_name: "Amjad",
      last_name: "Pasha",
      date_of_birth: "1998-09-30",
      gender: "male",
      phone: 9213456799,
      aadhar_number: 123456789015,
      email: "amjad@email.com",
      address: {
        house_no: "23-5-67",
        locality: "Kukatpally",
        landmark: "Bus Stop",
        mandal: "Kukatpally",
        district: "Hyderabad",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500072"
      },
      constituency: "Kukatpally",
      occupation: "Nurse",
      highest_qualification: "B.TECH (ECE)",
      face_recognition: "",
      isDeleted: true,
      approved: false,
      casted_vote: false,
      createdAt: "2024-01-18T13:45:00Z",
      updatedAt: "2024-01-21T11:30:00Z"
    },
    {
      _id: "6",
      first_name: "Joseph",
      last_name: "Jude",
      date_of_birth: "1998-09-30",
      gender: "male",
      phone: 9113456799,
      aadhar_number: 123456789015,
      email: "joseph@email.com",
      address: {
        house_no: "23-5-67",
        locality: "Nampally",
        landmark: "Bus Stop",
        mandal: "Nampally",
        district: "Hyderabad",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500072"
      },
      constituency: "Nampally",
      occupation: "Doctor",
      highest_qualification: "MBBS",
      face_recognition: "joseph.jpg",
      isDeleted: false,
      approved: true,
      casted_vote: true,
      createdAt: "2024-01-18T13:45:00Z",
      updatedAt: "2024-01-21T11:30:00Z"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterConstituency, setFilterConstituency] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedVoter, setSelectedVoter] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const constituencies = ["Secunderabad", "Jubilee Hills", "Banjara Hills", "Kukatpally", "Gachibowli", "Madhapur"];
  const genders = ["male", "female", "others"];

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const handleApproval = (id, currentStatus) => {
    setVoters(prev => prev.map(voter => 
      voter._id === id ? { ...voter, approved: !currentStatus } : voter
    ));
    showAlert(`Voter ${!currentStatus ? 'approved' : 'disapproved'} successfully`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete voter "${name}"?`)) {
      setVoters(prev => prev.map(voter => 
        voter._id === id ? { ...voter, isDeleted: true } : voter
      ));
      showAlert("Voter deleted successfully");
    }
  };

  const restoreVoter = (id) => {
    setVoters(prev => prev.map(voter => 
      voter._id === id ? { ...voter, isDeleted: false } : voter
    ));
    showAlert("Voter restored successfully");
  };

  const filteredVoters = voters.filter(voter => {
    const fullName = `${voter.first_name} ${voter.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         voter.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voter.aadhar_number.toString().includes(searchTerm) ||
                         voter.phone.toString().includes(searchTerm);
    
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "approved" && voter.approved && !voter.isDeleted) ||
                         (filterStatus === "pending" && !voter.approved && !voter.isDeleted) ||
                         (filterStatus === "voted" && voter.casted_vote && !voter.isDeleted) ||
                         (filterStatus === "not_voted" && !voter.casted_vote && !voter.isDeleted);
    
    const matchesConstituency = filterConstituency === "all" || voter.constituency === filterConstituency;
    const matchesGender = filterGender === "all" || voter.gender === filterGender;
    const matchesDeletedFilter = showDeleted || !voter.isDeleted;
    
    return matchesSearch && matchesStatus && matchesConstituency && matchesGender && matchesDeletedFilter;
  });

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getStatusColor = (voter) => {
    if (voter.isDeleted) return "bg-red-100 text-red-700";
    if (voter.casted_vote) return "bg-green-100 text-green-700";
    if (voter.approved) return "bg-blue-100 text-blue-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const getStatusText = (voter) => {
    if (voter.isDeleted) return "Deleted";
    if (voter.casted_vote) return "Voted";
    if (voter.approved) return "Approved";
    return "Pending";
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };


    const getVoters = async()=>{
    try{
      const response = await axios.get(`${api.generic_fetch}?data=voter`)
      if(!response.data){
        toast.error("No Valid Response.")
        return
      };

      const {data, message} = response.data
      if(data?.length<1){
        toast.error("No User Record Found.")
        return
      }
      toast.success(message)
      setVoters(data)
    }catch(error){
      console.log("Error occured while fetching user: ", error)
    }
  };

  useEffect(() => {
    getVoters()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Shield className="w-6 h-6 mr-3" />
              Voter Management
            </CardTitle>
            <p className="text-white/80">Manage voter registrations and approvals</p>
          </CardHeader>
        </Card>

        {/* Alert */}
        {alert.show && (
          <Alert className={`${alert.type === 'error' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}>
            <AlertDescription className={alert.type === 'error' ? 'text-red-700' : 'text-green-700'}>
              {alert.message}
            </AlertDescription>
          </Alert>
        )}

                {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Voters</p>
                  <p className="text-2xl font-bold">{voters.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Approved</p>
                  <p className="text-2xl font-bold">{voters.filter(v => v.approved && !v.isDeleted).length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Pending</p>
                  <p className="text-2xl font-bold">{voters.filter(v => !v.approved && !v.isDeleted).length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Voted</p>
                  <p className="text-2xl font-bold">{voters.filter(v => v.casted_vote && !v.isDeleted).length}</p>
                </div>
                <Award className="w-8 h-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Face Recognition</p>
                  <p className="text-2xl font-bold">{voters.filter(v => v.face_recognition && !v.isDeleted).length}</p>
                </div>
                <Shield className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Deleted</p>
                  <p className="text-2xl font-bold">{voters.filter(v => v.isDeleted).length}</p>
                </div>
                <Trash2 className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-blue-700 flex items-center justify-between">
              <span>Search & Filters</span>
              <div className="flex items-center space-x-2">
                <Label className="text-sm">Show Deleted</Label>
                <input
                  type="checkbox"
                  checked={showDeleted}
                  onChange={(e) => setShowDeleted(e.target.checked)}
                  className="rounded"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label>Search Voters</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Name, email, phone, Aadhar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="voted">Voted</SelectItem>
                    <SelectItem value="not_voted">Not Voted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Constituency</Label>
                <Select value={filterConstituency} onValueChange={setFilterConstituency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Constituencies</SelectItem>
                    {constituencies.map(constituency => (
                      <SelectItem key={constituency} value={constituency}>{constituency}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Gender</Label>
                <Select value={filterGender} onValueChange={setFilterGender}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    {genders.map(gender => (
                      <SelectItem key={gender} value={gender}>
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                    setFilterConstituency("all");
                    setFilterGender("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voters List */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
            <CardTitle className="text-green-700">
              Voters List ({filteredVoters.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {filteredVoters.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No voters found</p>
                </div>
              ) : (
                filteredVoters.map((voter) => (
                  <Card key={voter._id} className={`hover:shadow-md transition-shadow ${voter.isDeleted ? 'opacity-60' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg">
                              {getInitials(voter.first_name, voter.last_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900">
                              {voter.first_name} {voter.last_name}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                              <div className="space-y-1">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Mail className="w-3 h-3 mr-1" />
                                  {voter.email}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Phone className="w-3 h-3 mr-1" />
                                  {voter.phone}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Age: {calculateAge(voter.date_of_birth)} years
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Award className="w-3 h-3 mr-1" />
                                  {voter.highest_qualification}
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {voter.constituency}
                                </div>
                                <p className="text-sm text-gray-600">
                                  📍 {voter.address.house_no}, {voter.address.locality}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {voter.address.city}, {voter.address.state} - {voter.address.pincode}
                                </p>
                                <p className="text-sm text-gray-600">
                                  💼 {voter.occupation}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <Badge className={getStatusColor(voter)}>
                                {getStatusText(voter)}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {voter.gender.charAt(0).toUpperCase() + voter.gender.slice(1)}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Aadhar: ****{voter.aadhar_number.toString().slice(-4)}
                              </Badge>
                              {voter.face_recognition && (
                                <Badge className="bg-purple-100 text-purple-700 text-xs">
                                  Face Recognition ✓
                                </Badge>
                              )}
                              {!voter.face_recognition && (
                                <Badge className="bg-orange-100 text-orange-700 text-xs">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  No Face Data
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 ml-4">
                          {!voter.isDeleted ? (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => setSelectedVoter(voter)}
                              >
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-3 h-3" />
                              </Button>
                              {!voter.casted_vote && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className={voter.approved ? "text-orange-600" : "text-green-600"}
                                  onClick={() => handleApproval(voter._id, voter.approved)}
                                >
                                  {voter.approved ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700 hover:border-red-300"
                                onClick={() => handleDelete(voter._id, `${voter.first_name} ${voter.last_name}`)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                              onClick={() => restoreVoter(voter._id)}
                            >
                              Restore
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Registered: {new Date(voter.createdAt).toLocaleDateString()}</span>
                          <span>Updated: {new Date(voter.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>


        {/* Voter Details Modal (placeholder) */}
        {selectedVoter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Voter Details</span>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedVoter(null)}>
                    <XCircle className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <p className="font-medium">{selectedVoter.first_name} {selectedVoter.last_name}</p>
                    </div>
                    <div>
                      <Label>Date of Birth</Label>
                      <p className="font-medium">{selectedVoter.date_of_birth}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Aadhar Number</Label>
                      <p className="font-medium">{selectedVoter.aadhar_number}</p>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <p className="font-medium">{selectedVoter.phone}</p>
                    </div>
                  </div>
                  <div>
                    <Label>Complete Address</Label>
                    <p className="font-medium">
                      {selectedVoter.address.house_no}, {selectedVoter.address.locality}, 
                      {selectedVoter.address.landmark}, {selectedVoter.address.mandal}, 
                      {selectedVoter.address.district}, {selectedVoter.address.city}, 
                      {selectedVoter.address.state} - {selectedVoter.address.pincode}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Occupation</Label>
                      <p className="font-medium">{selectedVoter.occupation}</p>
                    </div>
                    <div>
                      <Label>Qualification</Label>
                      <p className="font-medium">{selectedVoter.highest_qualification}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Voter;