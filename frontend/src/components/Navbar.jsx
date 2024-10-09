import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/joy";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Expense Tracker
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6">
            <Link to="/features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link
              to="/testimonials"
              className="text-gray-600 hover:text-gray-900"
            >
              Testimonials
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About Us
            </Link>
          </nav>
        </div>
        <div>
          {/* Login Button */}
          <Link to="/login">
            <Button
              variant="outlined"
              color="neutral"
              className="border-gray-800 text-gray-800 hover:bg-gray-100 transition"
            >
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <IconButton
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {/* {menuOpen ? <CloseIcon /> : <MenuIcon />} */}
        </IconButton>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link
              to="/features"
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              to="/testimonials"
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900"
            >
              Testimonials
            </Link>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900"
            >
              About Us
            </Link>
            <Link to="/login" onClick={toggleMenu}>
              <Button
                variant="outlined"
                color="neutral"
                className="border-gray-800 text-gray-800 hover:bg-gray-100 transition"
              >
                Login
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
