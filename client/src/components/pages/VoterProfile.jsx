import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit, Save, X } from "lucide-react";

const VoterProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Suraj",
    lastName: "yadav",
    email: "surajyadav@email.com",
    phone: "+9123456533",
    dateOfBirth: "1998-06-15",
    address: "Suraram colony",
    city: "Hyderabad",
    state: "Telangana",
    zipCode: "500055",
    voterID: "EPIC3445689",
    registrationDate: "2016-10-15",
    party: "Independent",
    district: "District 7",
    precinct: "Precinct 12",
    bio: "Engaged citizen committed to participating in local and national elections."
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile });
  };

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-4 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className='text-2xl font-semibold mb-4 text-center'>VOTER PROFILE</h3>
        {/* Header Section */}
        <Card className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 text-white border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 ring-4 ring-white/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-white text-purple-600 text-xl font-semibold">
                    {getInitials(profile.firstName, profile.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="text-white/80">Voter ID: {profile.voterID}</p>
                  <Badge className="mt-1 bg-white/20 text-white border-white/30 hover:bg-white/30">
                    {profile.party}
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                {!isEditing ? (
                  <Button onClick={handleEdit} className="bg-white/20 hover:bg-white/30 text-white border-white/30" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} className="bg-white/20 hover:bg-white/30 text-white border-white/30" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center text-blue-700">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={editedProfile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{profile.firstName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={editedProfile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{profile.lastName}</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                {isEditing ? (
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={editedProfile.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={editedProfile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profile.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="flex items-center text-green-700">
                <Mail className="w-5 h-5 mr-2 text-green-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profile.phone}</p>
                )}
              </div>

              <Separator />

              <div>
                <Label htmlFor="address">Street Address</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={editedProfile.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profile.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  {isEditing ? (
                    <Input
                      id="city"
                      value={editedProfile.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{profile.city}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  {isEditing ? (
                    <Input
                      id="zipCode"
                      value={editedProfile.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-gray-900">{profile.zipCode}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                {isEditing ? (
                  <Select value={editedProfile.state} onValueChange={(value) => handleInputChange('state', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alabama">Alabama</SelectItem>
                      <SelectItem value="Alaska">Alaska</SelectItem>
                      <SelectItem value="Arizona">Arizona</SelectItem>
                      <SelectItem value="California">California</SelectItem>
                      <SelectItem value="Florida">Florida</SelectItem>
                      <SelectItem value="Illinois">Illinois</SelectItem>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Texas">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profile.state}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Voting Information */}
          <Card className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
              <CardTitle className="flex items-center text-purple-700">
                <Shield className="w-5 h-5 mr-2 text-purple-600" />
                Voting Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Voter ID</Label>
                <p className="mt-1 text-sm text-gray-900 font-mono">{profile.voterID}</p>
              </div>

              <div>
                <Label>Registration Date</Label>
                <p className="mt-1 text-sm text-gray-900">{new Date(profile.registrationDate).toLocaleDateString()}</p>
              </div>

              <div>
                <Label htmlFor="party">Political Party</Label>
                {isEditing ? (
                  <Select value={editedProfile.party} onValueChange={(value) => handleInputChange('party', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Democratic">Democratic</SelectItem>
                      <SelectItem value="Republican">Republican</SelectItem>
                      <SelectItem value="Independent">Independent</SelectItem>
                      <SelectItem value="Green">Green</SelectItem>
                      <SelectItem value="Libertarian">Libertarian</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{profile.party}</p>
                )}
              </div>

              <div>
                <Label>Electoral District</Label>
                <p className="mt-1 text-sm text-gray-900">{profile.district}</p>
              </div>

              <div>
                <Label>Precinct</Label>
                <p className="mt-1 text-sm text-gray-900">{profile.precinct}</p>
              </div>
            </CardContent>
          </Card>

          {/* Voting History */}
          <Card className="border-l-4 border-l-orange-500 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
              <CardTitle className="flex items-center text-orange-700">
                <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                Recent Voting History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-orange-100">
                  <div>
                    <p className="font-medium text-gray-900">2024 Presidential Election</p>
                    <p className="text-sm text-gray-600">November 5, 2024</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Voted</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-orange-100">
                  <div>
                    <p className="font-medium text-gray-900">2024 Primary Election</p>
                    <p className="text-sm text-gray-600">March 19, 2024</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Voted</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-orange-100">
                  <div>
                    <p className="font-medium text-gray-900">2023 Local Election</p>
                    <p className="text-sm text-gray-600">November 7, 2023</p>
                  </div>
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Did Not Vote</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium text-gray-900">2022 Midterm Election</p>
                    <p className="text-sm text-gray-600">November 8, 2022</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Voted</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card className="border-l-4 border-l-indigo-500 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                <MapPin className="w-4 h-4 mr-2" />
                Find Polling Location
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Upcoming Elections
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                Update Voter Registration
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                Request Absentee Ballot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoterProfile;