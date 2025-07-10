
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Search, Filter, Star, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const categories = [
    "all", "Construction", "Delivery", "Cleaning", "Security", 
    "Cooking", "Electrical", "Painting", "Mechanical", "Service"
  ];

  const locations = [
    "all", "Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan"
  ];

  const allJobs = [
    {
      id: 1,
      title: "Construction Worker",
      company: "BuildRight Lagos",
      location: "Ikeja, Lagos",
      wage: "₦8,000/day",
      type: "Physical Labor",
      urgency: "Urgent",
      skills: ["Construction", "Manual Labor"],
      posted: "2 hours ago",
      rating: 4.5,
      description: "Need experienced construction workers for residential building project. Must have basic safety training."
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
      posted: "5 hours ago",
      rating: 4.2,
      description: "Reliable delivery driver needed for package delivery across Lagos. Valid driver's license required."
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
      posted: "1 day ago",
      rating: 4.8,
      description: "Assist with event setup, guest management, and cleanup for weekend wedding celebration."
    },
    {
      id: 4,
      title: "House Cleaner",
      company: "CleanCorp Nigeria",
      location: "Lekki, Lagos",
      wage: "₦4,500/day",
      type: "Cleaning",
      urgency: "Normal",
      skills: ["Cleaning", "Attention to Detail"],
      posted: "3 hours ago",
      rating: 4.3,
      description: "Deep cleaning of residential apartments. Experience with cleaning equipment preferred."
    },
    {
      id: 5,
      title: "Security Guard",
      company: "SecureGuard Services",
      location: "Surulere, Lagos",
      wage: "₦7,200/day",
      type: "Security",
      urgency: "Urgent",
      skills: ["Security", "Alert"],
      posted: "6 hours ago",
      rating: 4.4,
      description: "Night shift security guard for commercial building. Previous security experience required."
    },
    {
      id: 6,
      title: "Cook Assistant",
      company: "Tasty Meals Restaurant",
      location: "Kano",
      wage: "₦5,500/day",
      type: "Food Service",
      urgency: "Normal",
      skills: ["Cooking", "Food Prep"],
      posted: "4 hours ago",
      rating: 4.6,
      description: "Assist head chef with food preparation and kitchen maintenance. Basic cooking skills required."
    }
  ];

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
                           job.skills.some(skill => skill.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    const matchesLocation = selectedLocation === "all" || 
                           job.location.includes(selectedLocation);

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleApply = (jobTitle: string) => {
    toast({
      title: "Application Submitted!",
      description: `Your application for ${jobTitle} has been sent successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
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

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Find Your Next Job</h2>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search jobs by title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === "all" ? "All Locations" : location}
                </option>
              ))}
            </select>
          </div>

          <p className="text-gray-600">{filteredJobs.length} jobs found</p>
        </div>

        {/* Job Listings */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      {job.urgency === "Urgent" && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                      {job.urgency === "This Weekend" && (
                        <Badge className="text-xs bg-orange-100 text-orange-800">This Weekend</Badge>
                      )}
                    </div>
                    <CardDescription className="font-medium text-blue-600 mb-2">
                      {job.company}
                    </CardDescription>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        <span>{job.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{job.posted}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{job.wage}</div>
                    <Badge variant="outline" className="text-xs mt-1">{job.type}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button 
                      onClick={() => handleApply(job.title)}
                      className="bg-gradient-to-r from-blue-600 to-green-600"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
