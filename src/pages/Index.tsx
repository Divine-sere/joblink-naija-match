
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Briefcase, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"worker" | "employer" | null>(null);

  const featuredJobs = [
    {
      id: 1,
      title: "Construction Worker",
      company: "BuildRight Lagos",
      location: "Ikeja, Lagos",
      wage: "₦8,000/day",
      type: "Physical Labor",
      urgency: "Urgent",
      skills: ["Construction", "Manual Labor"],
      posted: "2 hours ago"
    },
    {
      id: 2,
      title: "Delivery Driver",
      company: "QuickMove Logistics",
      location: "Victoria Island, Lagos",
      wage: "₦6,500/day",
      type: "Transportation",
      urgency: "Normal",
      skills: ["Driving", "Navigation"],
      posted: "5 hours ago"
    },
    {
      id: 3,
      title: "Event Helper",
      company: "Celebrations Ltd",
      location: "Abuja Central",
      wage: "₦5,000/day",
      type: "Service",
      urgency: "This Weekend",
      skills: ["Customer Service", "Setup"],
      posted: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
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
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/register")} className="bg-gradient-to-r from-blue-600 to-green-600">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Next Gig in
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Nigeria</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-powered job matching for daily wage workers. Connect with employers, showcase your skills, and find work that fits your expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500" onClick={() => setUserType("worker")}>
              <div className="text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">I'm Looking for Work</h3>
                <p className="text-gray-600">Find daily wage jobs that match your skills</p>
              </div>
            </Card>
            
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-500" onClick={() => setUserType("employer")}>
              <div className="text-center">
                <Briefcase className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">I Need Workers</h3>
                <p className="text-gray-600">Post jobs and find skilled workers</p>
              </div>
            </Card>
          </div>

          {userType && (
            <div className="animate-fade-in">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 text-lg px-8 py-3"
                onClick={() => navigate(`/dashboard/${userType}`)}
              >
                Continue as {userType === "worker" ? "Job Seeker" : "Employer"}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Featured Jobs Today</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="font-medium text-green-600">{job.company}</CardDescription>
                    </div>
                    {job.urgency === "Urgent" && (
                      <Badge variant="destructive">Urgent</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">{job.wage}</span>
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{job.posted}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => navigate("/jobs")}>
              View All Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose JobLink?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">AI-Powered Matching</h4>
              <p className="text-gray-600">Our smart algorithm matches you with jobs that fit your skills and location perfectly.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Local Focus</h4>
              <p className="text-gray-600">Find work in your area across all major Nigerian cities and states.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Quick Applications</h4>
              <p className="text-gray-600">Apply to jobs with one click and get responses from employers fast.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold">JobLink</h1>
              </div>
              <p className="text-gray-400">Connecting Nigerian workers with daily wage opportunities.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">For Job Seekers</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white">Create Profile</a></li>
                <li><a href="#" className="hover:text-white">Skills Assessment</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">For Employers</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Post a Job</a></li>
                <li><a href="#" className="hover:text-white">Find Workers</a></li>
                <li><a href="#" className="hover:text-white">Manage Listings</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Safety Guidelines</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobLink Nigeria. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
