import React, { use, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, UserCheck, UserX, Shield, ShieldCheck, Search, Edit, Trash2, Eye, EyeOff, Phone, Mail, Calendar } from "lucide-react";
import axios from 'axios';
import { api } from '@/utils/endpointUrls';
import toast from 'react-hot-toast';

const User = () => {
  const [users, setUsers] = useState(null);

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    profile_type: "user"
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showDeleted, setShowDeleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });


  const genderOptions = ["male", "female", "others"];
  const profileTypes = ["user", "admin"];

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const handleInputChange = (field, value) => {
    setNewUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validation
    if(!newUser.first_name.trim() || !newUser.last_name.trim()){
      showAlert("First name and last name are required", "error");
      setIsSubmitting(false);
      return;
    };

    if(!validateEmail(newUser.email)){
      showAlert("Please enter a valid email address", "error");
      setIsSubmitting(false);
      return;
    };

    if(newUser.password.length < 6){
      showAlert("Password must be at least 6 characters long", "error");
      setIsSubmitting(false);
      return;
    };

    if(!validatePhone(newUser.phone)){
      showAlert("Please enter a valid phone number", "error");
      setIsSubmitting(false);
      return;
    };

    if(!newUser.gender){
      showAlert("Gender is required", "error");
      setIsSubmitting(false);
      return;
    };

    // Check for duplicate email
    const existingUser = users.find(
      user => user.email.toLowerCase() === newUser.email.toLowerCase() && !user.isDeleted
    );

    if(existingUser){
      showAlert("A user with this email already exists", "error");
      setIsSubmitting(false);
      return;
    };

    // Simulate API call
    setTimeout(() => {
      const user = {
        _id: Date.now().toString(),
        ...newUser,
        isDeleted: false,
        isActive: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setUsers(prev => [user, ...prev]);
      setNewUser({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        profile_type: "user"
      });
      showAlert("User created successfully!", "success");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete user "${name}"?`)) {
      setUsers(prev => prev.map(user => 
        user._id === id ? { ...user, isDeleted: true, isActive: false } : user
      ));
      showAlert("User deleted successfully", "success");
    }
  };

  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(user => 
      user._id === id ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const restoreUser = (id) => {
    setUsers(prev => prev.map(user => 
      user._id === id ? { ...user, isDeleted: false } : user
    ));
    showAlert("User restored successfully", "success");
  };

  const filteredUsers = Array.isArray(users) && users?.filter(user => {
    const matchesSearch = user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" ||
                        (filterStatus === "active" && user.isActive && !user.isDeleted) ||
                        (filterStatus === "inactive" && !user.isActive && !user.isDeleted) ||
                        (filterStatus === "deleted" && user.isDeleted);

    const matchesType = filterType === "all" || user.profile_type === filterType;
    const matchesDeletedFilter = showDeleted || !user.isDeleted;

    return matchesSearch && matchesStatus && matchesType && matchesDeletedFilter;
  });

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getStatusColor = (user) => {
    if (user.isDeleted) return "bg-red-100 text-red-700";
    if (user.isActive) return "bg-green-100 text-green-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const getStatusText = (user) => {
    if (user.isDeleted) return "Deleted";
    if (user.isActive) return "Active";
    return "Inactive";
  };


  /** Fetch User Data */
  const getUsers = async()=>{
    try{
      const response = await axios.get(`${api.generic_fetch}?data=user`)
      console.log("response: ", response)
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
      setUsers(data.data)
    }catch(error){
      console.log("Error occured while fetching user: ", error)
    }
  };

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Users className="w-6 h-6 mr-3" />
              User Management
            </CardTitle>
            <p className="text-white/80">Create and manage system users</p>
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Users</p>
                  <p className="text-2xl font-bold">{Array.isArray(users) && users.filter(u => !u.isDeleted).length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Active Users</p>
                  <p className="text-2xl font-bold">{Array.isArray(users) && users.filter(u => u.isActive && !u.isDeleted).length}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Inactive Users</p>
                  <p className="text-2xl font-bold">{Array.isArray(users)&&  users.filter(u => !u.isActive && !u.isDeleted).length}</p>
                </div>
                <UserX className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Admins</p>
                  <p className="text-2xl font-bold">{Array.isArray(users) && users.filter(u => u.profile_type === 'admin' && !u.isDeleted).length}</p>
                </div>
                <ShieldCheck className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100">Deleted Users</p>
                  <p className="text-2xl font-bold">{Array.isArray(users) && users.filter(u => u.isDeleted).length}</p>
                </div>
                <Trash2 className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Create User Form */}
          <Card className="lg:col-span-2 border-l-4 border-l-green-500 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="flex items-center text-green-700">
                <Plus className="w-5 h-5 mr-2" />
                Add New User
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={newUser.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={newUser.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@email.com"
                    value={newUser.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password (min 6 characters)"
                      value={newUser.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="mt-1 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1-555-0123"
                    value={newUser.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={newUser.gender}
                      onValueChange={(value) => handleInputChange('gender', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genderOptions.map(gender => (
                          <SelectItem key={gender} value={gender}>
                            {gender.charAt(0).toUpperCase() + gender.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="profileType">Profile Type</Label>
                    <Select
                      value={newUser.profile_type}
                      onValueChange={(value) => handleInputChange('profile_type', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {profileTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Creating...</>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create User
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card className="lg:col-span-3 border-l-4 border-l-blue-500 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center justify-between text-blue-700">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Users List ({filteredUsers.length})
                </div>
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
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label>Search Users</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label>Filter by Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="deleted">Deleted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Filter by Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="mb-4" />

              {/* Users Grid */}
              <div className="space-y-4">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No users found</p>
                  </div>
                ) : (
                  Array.isArray(filteredUsers) && filteredUsers.map((user) => (
                    <Card key={user._id} className={`hover:shadow-md transition-shadow ${user.isDeleted ? 'opacity-60' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src="" />
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                                {getInitials(user.first_name, user.last_name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {user.first_name} {user.last_name}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Mail className="w-3 h-3 mr-1" />
                                  {user.email}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Phone className="w-3 h-3 mr-1" />
                                  {user.phone}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge className={getStatusColor(user)}>
                                  {getStatusText(user)}
                                </Badge>
                                <Badge className={user.profile_type === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}>
                                  {user.profile_type === 'admin' ? (
                                    <>
                                      <ShieldCheck className="w-3 h-3 mr-1" />
                                      Admin
                                    </>
                                  ) : (
                                    <>
                                      <Shield className="w-3 h-3 mr-1" />
                                      User
                                    </>
                                  )}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2">
                            {!user.isDeleted ? (
                              <>
                                <Button size="sm" variant="outline">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className={user.isActive ? "text-yellow-600" : "text-green-600"}
                                  onClick={() => toggleUserStatus(user._id)}
                                >
                                  {user.isActive ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                                  onClick={() => handleDelete(user._id, `${user.first_name} ${user.last_name}`)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => restoreUser(user._id)}
                              >
                                Restore
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Created: {new Date(user.createdAt).toLocaleDateString()}</span>
                            <span>Updated: {new Date(user.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default User;