
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Eye, EyeOff, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newSkill, setNewSkill] = useState("");
  const [formData, setFormData] = useState({
    userType: "worker" as "worker" | "employer",
    email: "",
    password: "",
    fullName: "",
    phone: "",
    location: "",
    skills: [] as string[],
    experience: "",
    companyName: "",
    industry: ""
  });

  const commonSkills = [
    "Construction", "Painting", "Electrical", "Plumbing", "Carpentry",
    "Delivery", "Cleaning", "Security", "Cooking", "Gardening",
    "Mechanical", "Welding", "Driving", "Sales", "Customer Service"
  ];

  const handleAddSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData({...formData, skills: [...formData.skills, skill]});
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({...formData, skills: formData.skills.filter(s => s !== skill)});
  };

  const handleAddCustomSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({...formData, skills: [...formData.skills, newSkill.trim()]});
      setNewSkill("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account Created Successfully!",
      description: `Welcome to JobLink! Your ${formData.userType} account is ready.`,
    });
    navigate(`/dashboard/${formData.userType}`);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-4 left-4">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            JobLink
          </h1>
        </div>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Join JobLink and start your journey</CardDescription>
          <div className="flex justify-center space-x-2 mt-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  step <= currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 1 && (
              <>
                <div className="space-y-3">
                  <Label>I want to:</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      type="button"
                      variant={formData.userType === "worker" ? "default" : "outline"}
                      onClick={() => setFormData({...formData, userType: "worker"})}
                      className="h-16 flex-col"
                    >
                      <span className="font-semibold">Find Work</span>
                      <span className="text-xs opacity-80">I'm looking for daily wage jobs</span>
                    </Button>
                    <Button
                      type="button"
                      variant={formData.userType === "employer" ? "default" : "outline"}
                      onClick={() => setFormData({...formData, userType: "employer"})}
                      className="h-16 flex-col"
                    >
                      <span className="font-semibold">Hire Workers</span>
                      <span className="text-xs opacity-80">I need to find skilled workers</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
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
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    {formData.userType === "employer" ? "Contact Person" : "Full Name"}
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required
                  />
                </div>

                {formData.userType === "employer" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        placeholder="e.g., Construction, Hospitality"
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                        required
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Lagos, Abuja"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>
              </>
            )}

            {currentStep === 3 && formData.userType === "worker" && (
              <>
                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {commonSkills.map((skill) => (
                      <Button
                        key={skill}
                        type="button"
                        variant={formData.skills.includes(skill) ? "default" : "outline"}
                        size="sm"
                        onClick={() => formData.skills.includes(skill) ? handleRemoveSkill(skill) : handleAddSkill(skill)}
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add custom skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomSkill())}
                    />
                    <Button type="button" onClick={handleAddCustomSkill} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-0"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Textarea
                    id="experience"
                    placeholder="Tell us about your work experience..."
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    rows={3}
                  />
                </div>
              </>
            )}

            {currentStep === 3 && formData.userType === "employer" && (
              <div className="text-center py-6">
                <h3 className="text-lg font-semibold mb-2">Ready to get started!</h3>
                <p className="text-gray-600">Your employer account will be created and you can start posting jobs immediately.</p>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {currentStep < 3 ? (
                <Button type="button" onClick={nextStep} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button type="submit" className="ml-auto bg-gradient-to-r from-blue-600 to-green-600">
                  Create Account
                </Button>
              )}
            </div>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
