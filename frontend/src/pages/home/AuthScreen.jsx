import { Button, Typography } from "@mui/joy";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const AuthScreen = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-white py-24 border-b">
        <div className="container mx-auto text-center">
          <Typography
            variant="h2"
            className="mb-4 font-extrabold py-24 text-gray-800"
          >
            Track Your Expenses Effortlessly
          </Typography>
          <p className="mb-10 max-w-xl mx-auto mt-8">
            Manage your finances with our intuitive and powerful expense
            tracker.
          </p>
          <Button
            variant="contained"
            color="neutral"
            className="bg-gray-800 shadow-md hover:bg-gray-700 hover:text-white transition"
          >
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="mb-10 font-bold text-gray-800">Features</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <Typography
                variant="h6"
                className="mb-3 font-semibold text-gray-800"
              >
                Real-time Tracking
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Track your expenses in real-time and get instant insights into
                your spending habits.
              </Typography>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <Typography
                variant="h6"
                className="mb-3 font-semibold text-gray-800"
              >
                Budget Management
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Set budgets and get alerts when you&apos;re close to exceeding
                them.
              </Typography>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <Typography
                variant="h6"
                className="mb-3 font-semibold text-gray-800"
              >
                Secure & Private
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Your data is securely stored and private. We never share your
                information.
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="bg-white py-20">
        <div className="container mx-auto text-center">
          <Typography variant="h4" className="mb-6 font-bold text-gray-800">
            Ready to Take Control of Your Finances?
          </Typography>
          <p className="mb-8 mt-8 max-w-xl mx-auto text-gray-600">
            Sign up today and start tracking your expenses with ease.
          </p>
          <Button
            variant="contained"
            color="neutral"
            className="bg-gray-800 shadow-md hover:bg-gray-700 hover:text-white transition"
          >
            <Link to="/signup">Sign Up Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <Typography variant="body2" className="text-gray-500">
            &copy; 2024 Expense Tracker. All rights reserved.
          </Typography>
        </div>
      </footer>
    </div>
  );
};

export default AuthScreen;
