import React, { useState } from 'react';
import { Vote, User, Mail, Phone, Shield, Settings, Bell, Eye, EyeOff, Save, Edit, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Switch} from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    profile_type: "user",
    isActive: true
  });

  const [notifications, setNotifications] = useState({
    email_alerts: true,
    sms_alerts: false,
    election_updates: true,
    security_alerts: true
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    alert("Profile updated successfully!");
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
                <Card className="bg-gradient-to-r from-black via-gray-600 to-black text-yellow-300 border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 ring-4 ring-white/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-white text-purple-600 text-xl font-semibold">
                    SY
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Suraj Yadav
                  </h1>
                  <p className="text-white/80">Voter ID: "EPIC20043"</p>
                  <Badge className="mt-1 bg-white/20 text-white border-white/30 hover:bg-white/30">
                    BJP
                  </Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                {!isEditing ? (
                  <Button  className="bg-white/20 hover:bg-white/30 text-white border-white/30" size="sm">
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
        <div className="grid gap-6 mt-4">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <span>Account Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={userData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={userData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <span>Account Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-green-700 dark:text-green-400">Account Active</p>
                  <p className="text-sm text-green-600 dark:text-green-500">Verified</p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <User className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-medium text-blue-700 dark:text-blue-400">Profile Type</p>
                  <p className="text-sm text-blue-600 dark:text-blue-500 capitalize">{userData.profile_type}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="font-medium text-purple-700 dark:text-purple-400">Security</p>
                  <p className="text-sm text-purple-600 dark:text-purple-500">Protected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current_password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current_password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    disabled={!isEditing}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              
              {isEditing && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="new_password">New Password</Label>
                    <Input
                      id="new_password"
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm_password">Confirm New Password</Label>
                    <Input
                      id="confirm_password"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                </>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                  <Bell className="h-5 w-5 text-green-600" />
                </div>
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Alerts</Label>
                  <p className="text-sm text-gray-500">Receive important updates via email</p>
                </div>
                <Switch 
                  checked={notifications.email_alerts}
                  onCheckedChange={(value) => handleNotificationChange('email_alerts', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Alerts</Label>
                  <p className="text-sm text-gray-500">Get text messages for urgent notifications</p>
                </div>
                <Switch 
                  checked={notifications.sms_alerts}
                  onCheckedChange={(value) => handleNotificationChange('sms_alerts', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Election Updates</Label>
                  <p className="text-sm text-gray-500">Stay informed about upcoming elections</p>
                </div>
                <Switch 
                  checked={notifications.election_updates}
                  onCheckedChange={(value) => handleNotificationChange('election_updates', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified of security-related activities</p>
                </div>
                <Switch 
                  checked={notifications.security_alerts}
                  onCheckedChange={(value) => handleNotificationChange('security_alerts', value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
                  <Settings className="h-5 w-5 text-indigo-600" />
                </div>
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Voter Registration</p>
                      <p className="text-sm text-gray-500">Complete your voter profile</p>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Vote className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">View Elections</p>
                      <p className="text-sm text-gray-500">See available elections</p>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Security Center</p>
                      <p className="text-sm text-gray-500">Manage security settings</p>
                    </div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <Settings className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Account Settings</p>
                      <p className="text-sm text-gray-500">Advanced preferences</p>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="border-red-200 bg-red-50/30 dark:border-red-800 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-400">
                <AlertCircle className="h-5 w-5" />
                <span>Account Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-red-600 dark:text-red-400">
                  Manage your account status and data. These actions are permanent and cannot be undone.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    Deactivate Account
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    Download My Data
                  </Button>
                  <Button variant="destructive">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}