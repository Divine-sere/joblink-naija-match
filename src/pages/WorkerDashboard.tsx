
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, Search, Star, ThumbsUp, Briefcase, User, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WorkerDashboard = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("recommended");

  const userProfile = {
    name: "Emeka Okafor",
    avatar: "/placeholder.svg",
    rating: 4.8,
    completedJobs: 47,
    skills: ["Construction", "Painting", "Electrical"],
    location: "Lagos, Nigeria"
  };

  const recommendedJobs = [
    {
      id: 1,
      title: "House Painting Assistant",
      company: "HomeFix Solutions",
      location: "Surulere, Lagos",
      wage: "₦7,500/day",
      type: "Skilled Labor",
      matchScore: 95,
      skills: ["Painting", "Manual Labor"],
      posted: "3 hours ago",
      urgent: false,
      description: "Need experienced painter for 2-bedroom apartment renovation."
    },
    {
      id: 2,
      title: "Electrical Technician Helper",
      company: "PowerPro Services",
      location: "Ikeja, Lagos",
      wage: "₦9,000/day",
      type: "Technical",
      matchScore: 88,
      skills: ["Electrical", "Technical Skills"],
      posted: "1 hour ago",
      urgent: true,
      description: "Assist with residential electrical installations and repairs."
    },
    {
      id: 3,
      title: "Construction Site Worker",
      company: "BuildSmart Nigeria",
      location: "Lekki, Lagos",
      wage: "₦8,500/day",
      type: "Physical Labor",
      matchScore: 92,
      skills: ["Construction", "Heavy Lifting"],
      posted: "5 hours ago",
      urgent: false,
      description: "General construction work for new residential complex."
    }
  ];

  const applicationHistory = [
    {
      id: 1,
      title: "Warehouse Assistant",
      company: "Lagos Logistics",
      status: "accepted",
      appliedDate: "2 days ago",
      wage: "₦6,000/day"
    },
    {
      id: 2,
      title: "Event Setup Helper",
      company: "Event Masters",
      status: "pending",
      appliedDate: "1 day ago",
      wage: "₦5,500/day"
    },
    {
      id: 3,
      title: "Delivery Assistant",
      company: "QuickMove",
      status: "rejected",
      appliedDate: "3 days ago",
      wage: "₦7,000/day"
    }
  ];

  const handleApplyJob = (jobId: number, jobTitle: string) => {
    toast({
      title: "Application Submitted!",
      description: `Your application for ${jobTitle} has been sent to the employer.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredJobs = recommendedJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Taskified
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Avatar>
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback>EO</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Profile */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={userProfile.avatar} />
                  <AvatarFallback className="text-lg">EO</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{userProfile.name}</CardTitle>
                <CardDescription className="flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {userProfile.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">{userProfile.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Jobs Completed</span>
                    <span className="font-semibold">{userProfile.completedJobs}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {userProfile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Applications</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Interviews</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Jobs Started</span>
                    <span className="font-semibold">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search jobs by title, company, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 border-b">
                <button
                  onClick={() => setActiveTab("recommended")}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "recommended"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Recommended for You
                </button>
                <button
                  onClick={() => setActiveTab("applications")}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "applications"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  My Applications
                </button>
              </div>
            </div>

            {/* Content Area */}
            {activeTab === "recommended" && (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle className="text-lg">{job.title}</CardTitle>
                            {job.urgent && (
                              <Badge variant="destructive" className="text-xs">Urgent</Badge>
                            )}
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                              {job.matchScore}% Match
                            </Badge>
                          </div>
                          <CardDescription className="font-medium text-blue-600">
                            {job.company}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{job.wage}</div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="w-3 h-3 mr-1" />
                            {job.posted}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{job.location}</span>
                        </div>
                        <p className="text-gray-700">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-sm text-gray-500">Type: {job.type}</span>
                          <Button 
                            onClick={() => handleApplyJob(job.id, job.title)}
                            className="bg-gradient-to-r from-blue-600 to-green-600"
                          >
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "applications" && (
              <div className="space-y-4">
                {applicationHistory.map((application) => (
                  <Card key={application.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg">{application.title}</h3>
                          <p className="text-gray-600">{application.company}</p>
                          <p className="text-sm text-gray-500">Applied {application.appliedDate}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-600 mb-2">
                            {application.wage}
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
