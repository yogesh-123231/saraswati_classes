import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAdmin, isStudent } = useAuth();
  const navigate = useNavigate();

  if (isAdmin) { navigate("/admin"); return null; }
  if (isStudent) { navigate("/dashboard"); return null; }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (result === "admin") {
      navigate("/admin");
    } else if (result === "student") {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Use admin or student credentials.");
    }
  };

  const { login } = useAuth();

  return (
    <Layout>
      <div className="py-12 md:py-16 min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="rounded-xl shadow-sm">
            <CardContent className="p-6 md:p-8">
              <div className="text-center mb-6 space-y-2">
                <div className="flex justify-center">
                  <img src={logo} alt="Saraswati Classes Logo" className="h-12 w-auto object-contain" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Login</h1>
                <p className="text-muted-foreground">Sign in as Admin or Student</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••" />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full">Login</Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-4">Admin: admin@saraswaticlasses.com / admin123</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
