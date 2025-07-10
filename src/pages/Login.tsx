
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "worker" as "worker" | "employer"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Successful!",
      description: `Welcome back! Redirecting to your ${formData.userType} dashboard.`,
    });
    navigate(`/dashboard/${formData.userType}`);
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
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your JobLink account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div className="space-y-3">
              <Label>I am a:</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={formData.userType === "worker" ? "default" : "outline"}
                  onClick={() => setFormData({...formData, userType: "worker"})}
                  className="h-12"
                >
                  Job Seeker
                </Button>
                <Button
                  type="button"
                  variant={formData.userType === "employer" ? "default" : "outline"}
                  onClick={() => setFormData({...formData, userType: "employer"})}
                  className="h-12"
                >
                  Employer
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
                  placeholder="Enter your password"
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

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-green-600">
              Sign In
            </Button>

            <div className="text-center text-sm">
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
