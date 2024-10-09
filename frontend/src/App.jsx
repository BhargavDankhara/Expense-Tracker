import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/home/HomePage";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";

function App() {
  const { user, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/"} />}
        />
      </Routes>
      {/* <Toaster /> */}
    </Router>
  );
}

export default App;
