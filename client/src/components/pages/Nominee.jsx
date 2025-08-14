import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Users, Edit, Trash2, Search, UserPlus, Award, Building } from "lucide-react";

const Nominee = () => {
  const [nominees, setNominees] = useState([
    {
      _id: "1",
      full_name: "John Smith",
      political_party: "Democratic",
      constituency: "District 1",
      votes_count: 1250,
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      _id: "2",
      full_name: "Sarah Johnson",
      political_party: "Republican",
      constituency: "District 2", 
      votes_count: 980,
      createdAt: "2024-01-16T14:20:00Z"
    },
    {
      _id: "3",
      full_name: "Michael Brown",
      political_party: "Independent",
      constituency: "District 1",
      votes_count: 750,
      createdAt: "2024-01-17T09:15:00Z"
    }
  ]);

  const [newNominee, setNewNominee] = useState({
    full_name: "",
    political_party: "",
    constituency: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterParty, setFilterParty] = useState("all");
  const [filterConstituency, setFilterConstituency] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const politicalParties = [
    "Democratic", "Republican", "Independent", "Green", "Libertarian", 
    "Constitution", "Socialist", "Progressive", "Conservative", "Liberal"
  ];

  const constituencies = [
    "District 1", "District 2", "District 3", "District 4", "District 5",
    "District 6", "District 7", "District 8", "District 9", "District 10"
  ];

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const handleInputChange = (field, value) => {
    setNewNominee(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validation
    if (!newNominee.full_name.trim()) {
      showAlert("Full name is required", "error");
      setIsSubmitting(false);
      return;
    }

    if (!newNominee.political_party) {
      showAlert("Political party is required", "error");
      setIsSubmitting(false);
      return;
    }

    if (!newNominee.constituency) {
      showAlert("Constituency is required", "error");
      setIsSubmitting(false);
      return;
    }

    // Check for duplicate name
    const existingNominee = nominees.find(
      nominee => nominee.full_name.toLowerCase() === newNominee.full_name.toLowerCase()
    );

    if (existingNominee) {
      showAlert("A nominee with this name already exists", "error");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const nominee = {
        _id: Date.now().toString(),
        ...newNominee,
        votes_count: 0,
        createdAt: new Date().toISOString()
      };

      setNominees(prev => [nominee, ...prev]);
      setNewNominee({ full_name: "", political_party: "", constituency: "" });
      showAlert("Nominee created successfully!", "success");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete nominee "${name}"?`)) {
      setNominees(prev => prev.filter(nominee => nominee._id !== id));
      showAlert("Nominee deleted successfully", "success");
    }
  };

  const filteredNominees = nominees.filter(nominee => {
    const matchesSearch = nominee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nominee.constituency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesParty = filterParty === "all" || nominee.political_party === filterParty;
    const matchesConstituency = filterConstituency === "all" || nominee.constituency === filterConstituency;
    
    return matchesSearch && matchesParty && matchesConstituency;
  });

  const getPartyColor = (party) => {
    const colors = {
      "Democratic": "bg-blue-100 text-blue-700",
      "Republican": "bg-red-100 text-red-700",
      "Independent": "bg-purple-100 text-purple-700",
      "Green": "bg-green-100 text-green-700",
      "Libertarian": "bg-yellow-100 text-yellow-700"
    };
    return colors[party] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Users className="w-6 h-6 mr-3" />
              Nominee Management
            </CardTitle>
            <p className="text-white/80">Create and manage election nominees</p>
          </CardHeader>
        </Card>

                {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Nominees</p>
                  <p className="text-2xl font-bold">{nominees.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Votes</p>
                  <p className="text-2xl font-bold">{nominees.reduce((sum, n) => sum + n.votes_count, 0).toLocaleString()}</p>
                </div>
                <Award className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Parties</p>
                  <p className="text-2xl font-bold">{new Set(nominees.map(n => n.political_party)).size}</p>
                </div>
                <Building className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Constituencies</p>
                  <p className="text-2xl font-bold">{new Set(nominees.map(n => n.constituency)).size}</p>
                </div>
                <Building className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert */}
        {alert.show && (
          <Alert className={`${alert.type === 'error' ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}>
            <AlertDescription className={alert.type === 'error' ? 'text-red-700' : 'text-green-700'}>
              {alert.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Nominee Form */}
          <Card className="lg:col-span-1 border-l-4 border-l-green-500 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="flex items-center text-green-700">
                <UserPlus className="w-5 h-5 mr-2" />
                Add New Nominee
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter nominee's full name"
                    value={newNominee.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="party">Political Party *</Label>
                  <Select
                    value={newNominee.political_party}
                    onValueChange={(value) => handleInputChange('political_party', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select political party" />
                    </SelectTrigger>
                    <SelectContent>
                      {politicalParties.map(party => (
                        <SelectItem key={party} value={party}>{party}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="constituency">Constituency *</Label>
                  <Select
                    value={newNominee.constituency}
                    onValueChange={(value) => handleInputChange('constituency', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select constituency" />
                    </SelectTrigger>
                    <SelectContent>
                      {constituencies.map(constituency => (
                        <SelectItem key={constituency} value={constituency}>{constituency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      Create Nominee
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Nominees List */}
          <Card className="lg:col-span-2 border-l-4 border-l-blue-500 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center justify-between text-blue-700">
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Nominees List ({filteredNominees.length})
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search nominees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label>Filter by Party</Label>
                  <Select value={filterParty} onValueChange={setFilterParty}>
                    <SelectTrigger>
                      <SelectValue placeholder="All parties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All parties</SelectItem>
                      {politicalParties.map(party => (
                        <SelectItem key={party} value={party}>{party}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Filter by Constituency</Label>
                  <Select value={filterConstituency} onValueChange={setFilterConstituency}>
                    <SelectTrigger>
                      <SelectValue placeholder="All constituencies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All constituencies</SelectItem>
                      {constituencies.map(constituency => (
                        <SelectItem key={constituency} value={constituency}>{constituency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="mb-4" />

              {/* Nominees Grid */}
              <div className="space-y-4">
                {filteredNominees.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No nominees found</p>
                  </div>
                ) : (
                  filteredNominees.map((nominee) => (
                    <Card key={nominee._id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {nominee.full_name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{nominee.full_name}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className={getPartyColor(nominee.political_party)}>
                                    {nominee.political_party}
                                  </Badge>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Building className="w-3 h-3 mr-1" />
                                    {nominee.constituency}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Votes</p>
                              <p className="font-semibold text-lg text-blue-600">{nominee.votes_count.toLocaleString()}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700 hover:border-red-300"
                                onClick={() => handleDelete(nominee._id, nominee.full_name)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            Created: {new Date(nominee.createdAt).toLocaleDateString()} at {new Date(nominee.createdAt).toLocaleTimeString()}
                          </p>
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

export default Nominee;