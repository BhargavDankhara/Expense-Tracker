import { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Input, Button, Card, CardContent } from "@mui/joy";
import { useAuthStore } from "../store/authUser";

const Signup = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuthStore();

  const handleSignup = (e) => {
    e.preventDefault();
    signup({ email, username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card variant="outlined" className="w-full max-w-md p-6">
        <CardContent>
          <Typography level="h4" className="mb-4 text-center font-bold">
            Create an Account
          </Typography>

          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <Input
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
            </div>
            <div className="mb-4">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
            </div>
            <Button type="submit" color="primary" fullWidth>
              Sign Up
            </Button>
          </form>
        </CardContent>
        <Typography level="body2" className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Log in
          </Link>
        </Typography>
      </Card>
    </div>
  );
};

export default Signup;
