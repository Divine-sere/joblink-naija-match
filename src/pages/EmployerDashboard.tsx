
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MapPin, Clock, Search, Star, Eye, CheckCircle, Briefcase, Settings, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmployerDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("jobs");
  const [showJobForm, setShowJobForm] = useState(false);

  const companyProfile = {
    name: "BuildSmart Nigeria",
    avatar: "/placeholder.svg",
    rating: 4.6,
    totalHires: 156,
    location: "Lagos, Nigeria",
    industry: "Construction"
  };

  const activeJobs = [
    {
      id: 1,
      title: "Construction Site Worker",
      location: "Lekki, Lagos",
      wage: "₦8,500/day",
      type: "Physical Labor",
      posted: "2 hours ago",
      applications: 12,
      filled: false,
      urgent: true,
      description: "Need experienced construction workers for residential project."
    },
    {
      id: 2,
      title: "Painting Assistant",
      location: "Victoria Island, Lagos",
      wage: "₦7,000/day",
      type: "Skilled Labor",
      posted: "1 day ago",
      applications: 8,
      filled: false,
      urgent: false,
      description: "Looking for painting assistants for office renovation."
    },
    {
      id: 3,
      title: "Warehouse Helper",
      location: "Ikeja, Lagos",
      wage: "₦6,500/day",
      type: "Manual Labor",
      posted: "3 days ago",
      applications: 15,
      filled: true,
      urgent: false,
      description: "Warehouse operations and inventory management assistance."
    }
  ];

  const jobApplications = [
    {
      id: 1,
      jobTitle: "Construction Site Worker",
      applicant: {
        name: "Kemi Adebayo",
        avatar: "/placeholder.svg",
        rating: 4.8,
        experience: "5 years construction experience",
        skills: ["Construction", "Heavy Lifting", "Safety Protocols"],
        location: "Surulere, Lagos",
        completedJobs: 89
      },
      appliedDate: "2 hours ago",
      status: "new"
    },
    {
      id: 2,
      jobTitle: "Construction Site Worker",
      applicant: {
        name: "Ibrahim Mohammed",
        avatar: "/placeholder.svg",
        rating: 4.5,
        experience: "3 years construction and electrical work",
        skills: ["Construction", "Electrical", "Teamwork"],
        location: "Ikeja, Lagos",
        completedJobs: 67
      },
      appliedDate: "3 hours ago",
      status: "new"
    },
    {
      id: 3,
      jobTitle: "Painting Assistant",
      applicant: {
        name: "Chioma Okwu",
        avatar: "/placeholder.svg",
        rating: 4.9,
        experience: "4 years painting and decoration",
        skills: ["Painting", "Color Matching", "Detail Work"],
        location: "Victoria Island, Lagos",
        completedJobs: 73
      },
      appliedDate: "5 hours ago",
      status: "reviewed"
    }
  ];

  const handleAcceptApplicant = (applicantName: string) => {
    toast({
      title: "Applicant Accepted!",
      description: `${applicantName} has been notified and the job has been filled.`,
    });
  };

  const handleRejectApplicant = (applicantName: string) => {
    toast({
      title: "Applicant Declined",
      description: `${applicantName} has been notified of your decision.`,
    });
  };

  const handlePostJob = () => {
    toast({
      title: "Job Posted Successfully!",
      description: "Your job listing is now live and workers can start applying.",
    });
    setShowJobForm(false);
  };

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
              JobLink
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setShowJobForm(true)}
              className="bg-gradient-to-r from-blue-600 to-green-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post Job
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Avatar>
              <AvatarImage src={companyProfile.avatar} />
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Company Profile */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={companyProfile.avatar} />
                  <AvatarFallback className="text-lg">BS</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{companyProfile.name}</CardTitle>
                <CardDescription className="flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {companyProfile.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">{companyProfile.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Hires</span>
                    <span className="font-semibold">{companyProfile.totalHires}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Industry</span>
                    <Badge variant="secondary">{companyProfile.industry}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Active Jobs</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Applications</span>
                    <span className="font-semibold">35</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Hires Made</span>
                    <span className="font-semibold">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 border-b">
                <button
                  onClick={() => setActiveTab("jobs")}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "jobs"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  My Job Listings
                </button>
                <button
                  onClick={() => setActiveTab("applications")}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "applications"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Applications ({jobApplications.length})
                </button>
              </div>
            </div>

            {/* Job Listings Tab */}
            {activeTab === "jobs" && (
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle className="text-lg">{job.title}</CardTitle>
                            {job.urgent && (
                              <Badge variant="destructive" className="text-xs">Urgent</Badge>
                            )}
                            {job.filled && (
                              <Badge className="text-xs bg-green-100 text-green-800">Filled</Badge>
                            )}
                          </div>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{job.location}</span>
                          </div>
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
                        <p className="text-gray-700">{job.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1 text-gray-500" />
                              <span className="text-sm text-gray-600">{job.applications} applications</span>
                            </div>
                            <Badge variant="outline">{job.type}</Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === "applications" && (
              <div className="space-y-4">
                {jobApplications.map((application) => (
                  <Card key={application.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{application.jobTitle}</CardTitle>
                          <CardDescription>Applied {application.appliedDate}</CardDescription>
                        </div>
                        <Badge 
                          variant={application.status === "new" ? "default" : "secondary"}
                          className={application.status === "new" ? "bg-blue-100 text-blue-800" : ""}
                        >
                          {application.status === "new" ? "New" : "Reviewed"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={application.applicant.avatar} />
                          <AvatarFallback>{application.applicant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{application.applicant.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {application.applicant.location}
                            </div>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 mr-1 text-yellow-500" />
                              {application.applicant.rating}
                            </div>
                            <span>{application.applicant.completedJobs} jobs completed</span>
                          </div>
                          <p className="text-gray-700 mb-3">{application.applicant.experience}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {application.applicant.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex space-x-3">
                            <Button 
                              onClick={() => handleAcceptApplicant(application.applicant.name)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => handleRejectApplicant(application.applicant.name)}
                            >
                              Decline
                            </Button>
                            <Button variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Job Posting Form Modal */}
            {showJobForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
                  <CardHeader>
                    <CardTitle>Post a New Job</CardTitle>
                    <CardDescription>Fill in the details to attract the right workers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Title</label>
                      <Input placeholder="e.g., Construction Worker, Delivery Driver" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <Input placeholder="e.g., Ikeja, Lagos" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Daily Wage (₦)</label>
                        <Input placeholder="e.g., 8000" type="number" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Job Type</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Physical Labor</option>
                          <option>Skilled Labor</option>
                          <option>Technical</option>
                          <option>Service</option>
                          <option>Transportation</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Description</label>
                      <Textarea 
                        placeholder="Describe the job requirements, working conditions, and any specific skills needed..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Required Skills (comma-separated)</label>
                      <Input placeholder="e.g., Construction, Heavy Lifting, Safety Training" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="urgent" />
                      <label htmlFor="urgent" className="text-sm">Mark as urgent</label>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button variant="outline" onClick={() => setShowJobForm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handlePostJob} className="bg-gradient-to-r from-blue-600 to-green-600">
                        Post Job
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
