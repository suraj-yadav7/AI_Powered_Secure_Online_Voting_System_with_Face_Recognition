import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Vote, Calendar, Users, Trophy, Search, Settings, CheckCircle, XCircle, Edit, Trash2 } from "lucide-react";

const Election = () => {
  // Mock nominees data (this would come from your nominees API)
  const [availableNominees] = useState([
    { _id: "1", full_name: "John Smith", political_party: "Democratic", constituency: "District 1" },
    { _id: "2", full_name: "Sarah Johnson", political_party: "Republican", constituency: "District 2" },
    { _id: "3", full_name: "Michael Brown", political_party: "Independent", constituency: "District 1" },
    { _id: "4", full_name: "Emily Davis", political_party: "Green", constituency: "District 3" },
    { _id: "5", full_name: "Robert Wilson", political_party: "Libertarian", constituency: "District 2" },
    { _id: "6", full_name: "Lisa Anderson", political_party: "Democratic", constituency: "District 3" }
  ]);

  const [elections, setElections] = useState([
    {
      _id: "1",
      name: "2024 Presidential Election",
      type: "Presidential",
      total_votes: 15420,
      result: true,
      nominees: ["1", "2", "3"],
      createdAt: "2025-01-15T10:30:00Z"
    },
    {
      _id: "2", 
      name: "2024 Local Council Election",
      type: "Local",
      total_votes: 8950,
      result: false,
      nominees: ["4", "5", "6"],
      createdAt: "2024-02-01T14:20:00Z"
    }
  ]);

  const [newElection, setNewElection] = useState({
    name: "",
    type: "",
    nominees: []
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const electionTypes = [
    "Presidential", "Congressional", "Senate", "Gubernatorial", 
    "Mayoral", "Local", "Primary", "Special", "Referendum"
  ];

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const handleInputChange = (field, value) => {
    setNewElection(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNomineeToggle = (nomineeId) => {
    setNewElection(prev => ({
      ...prev,
      nominees: prev.nominees.includes(nomineeId)
        ? prev.nominees.filter(id => id !== nomineeId)
        : [...prev.nominees, nomineeId]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validation
    if (!newElection.name.trim()) {
      showAlert("Election name is required", "error");
      setIsSubmitting(false);
      return;
    }

    if (!newElection.type) {
      showAlert("Election type is required", "error");
      setIsSubmitting(false);
      return;
    }

    if (newElection.nominees.length === 0) {
      showAlert("At least one nominee must be selected", "error");
      setIsSubmitting(false);
      return;
    }

    // Check for duplicate name
    const existingElection = elections.find(
      election => election.name.toLowerCase() === newElection.name.toLowerCase()
    );

    if (existingElection) {
      showAlert("An election with this name already exists", "error");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const election = {
        _id: Date.now().toString(),
        ...newElection,
        total_votes: 0,
        result: false,
        createdAt: new Date().toISOString()
      };

      setElections(prev => [election, ...prev]);
      setNewElection({ name: "", type: "", nominees: [] });
      showAlert("Election created successfully!", "success");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete election "${name}"?`)) {
      setElections(prev => prev.filter(election => election._id !== id));
      showAlert("Election deleted successfully", "success");
    }
  };

  const toggleElectionResult = (id) => {
    setElections(prev => prev.map(election => 
      election._id === id 
        ? { ...election, result: !election.result }
        : election
    ));
  };

  const filteredElections = elections.filter(election => {
    const matchesSearch = election.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         election.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || election.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const getNomineesByIds = (nomineeIds) => {
    return availableNominees.filter(nominee => nomineeIds.includes(nominee._id));
  };

  const getTypeColor = (type) => {
    const colors = {
      "Presidential": "bg-blue-100 text-blue-700",
      "Congressional": "bg-green-100 text-green-700",
      "Senate": "bg-purple-100 text-purple-700",
      "Gubernatorial": "bg-orange-100 text-orange-700",
      "Mayoral": "bg-pink-100 text-pink-700",
      "Local": "bg-teal-100 text-teal-700",
      "Primary": "bg-indigo-100 text-indigo-700",
      "Special": "bg-red-100 text-red-700",
      "Referendum": "bg-yellow-100 text-yellow-700"
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Vote className="w-6 h-6 mr-3" />
              Election Management
            </CardTitle>
            <p className="text-white/80">Create and manage elections with nominees</p>
          </CardHeader>
        </Card>

                {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Elections</p>
                  <p className="text-2xl font-bold">{elections.length}</p>
                </div>
                <Vote className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Active Elections</p>
                  <p className="text-2xl font-bold">{elections.filter(e => !e.result).length}</p>
                </div>
                <Settings className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Completed Elections</p>
                  <p className="text-2xl font-bold">{elections.filter(e => e.result).length}</p>
                </div>
                <Trophy className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Total Votes Cast</p>
                  <p className="text-2xl font-bold">{elections.reduce((sum, e) => sum + e.total_votes, 0).toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-orange-200" />
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Create Election Form */}
          <Card className="lg:col-span-2 border-l-4 border-l-green-500 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="flex items-center text-green-700">
                <Plus className="w-5 h-5 mr-2" />
                Create New Election
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="electionName">Election Name *</Label>
                  <Input
                    id="electionName"
                    placeholder="e.g., 2024 Presidential Election"
                    value={newElection.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="electionType">Election Type *</Label>
                  <Select
                    value={newElection.type}
                    onValueChange={(value) => handleInputChange('type', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select election type" />
                    </SelectTrigger>
                    <SelectContent>
                      {electionTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Select Nominees *</Label>
                  <div className="mt-2 max-h-64 overflow-y-auto border rounded-md p-3 bg-gray-50">
                    {availableNominees.length === 0 ? (
                      <p className="text-gray-500 text-sm">No nominees available</p>
                    ) : (
                      <div className="space-y-3">
                        {availableNominees.map((nominee) => (
                          <div key={nominee._id} className="flex items-center space-x-3">
                            <Checkbox
                              id={`nominee-${nominee._id}`}
                              checked={newElection.nominees.includes(nominee._id)}
                              onCheckedChange={() => handleNomineeToggle(nominee._id)}
                            />
                            <div className="flex-1">
                              <label 
                                htmlFor={`nominee-${nominee._id}`}
                                className="text-sm font-medium cursor-pointer"
                              >
                                {nominee.full_name}
                              </label>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={`text-xs ${getTypeColor(nominee.political_party)}`}>
                                  {nominee.political_party}
                                </Badge>
                                <span className="text-xs text-gray-500">{nominee.constituency}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {newElection.nominees.length} nominees
                  </p>
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
                      Create Election
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Elections List */}
          <Card className="lg:col-span-3 border-l-4 border-l-blue-500 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center justify-between text-blue-700">
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Elections List ({filteredElections.length})
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label>Search Elections</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by name or type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label>Filter by Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      {electionTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="mb-4" />

              {/* Elections Grid */}
              <div className="space-y-4">
                {filteredElections.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Vote className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No elections found</p>
                  </div>
                ) : (
                  filteredElections.map((election) => (
                    <Card key={election._id} className="hover:shadow-md transition-shadow border-l-2 border-l-indigo-400">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold">
                                <Vote className="w-6 h-6" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-gray-900">{election.name}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge className={getTypeColor(election.type)}>
                                    {election.type}
                                  </Badge>
                                  <Badge className={election.result ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                                    {election.result ? (
                                      <>
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Completed
                                      </>
                                    ) : (
                                      <>
                                        <Settings className="w-3 h-3 mr-1" />
                                        Active
                                      </>
                                    )}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-sm text-blue-600 font-medium">Total Votes</p>
                                <p className="text-2xl font-bold text-blue-700">{election.total_votes.toLocaleString()}</p>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-lg">
                                <p className="text-sm text-purple-600 font-medium">Nominees</p>
                                <p className="text-2xl font-bold text-purple-700">{election.nominees.length}</p>
                              </div>
                            </div>

                            {/* Nominees List */}
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Participating Nominees:</p>
                              <div className="flex flex-wrap gap-2">
                                {getNomineesByIds(election.nominees).map((nominee) => (
                                  <Badge key={nominee._id} variant="outline" className="text-xs">
                                    {nominee.full_name} ({nominee.political_party})
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2 ml-4">
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:border-red-300"
                              onClick={() => handleDelete(election._id, election.name)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className={election.result ? "text-yellow-600" : "text-green-600"}
                              onClick={() => toggleElectionResult(election._id)}
                            >
                              {election.result ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            Created: {new Date(election.createdAt).toLocaleDateString()} at {new Date(election.createdAt).toLocaleTimeString()}
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

export default Election;