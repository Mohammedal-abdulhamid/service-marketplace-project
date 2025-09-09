import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Services from "./pages/Services";
import CreateServicePage from "./pages/CreateServicePage";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/services">Services</Link> |{" "}
        <Link to="/create-service">Create Service</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/create-service" element={<CreateServicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
