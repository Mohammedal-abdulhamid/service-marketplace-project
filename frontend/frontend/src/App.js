import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Services from "./pages/Services";
import CreateServicePage from "./pages/CreateServicePage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SingleService from "./pages/SingleService";

function App() {
  return (
    <Router>
       <Navbar >
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/services">Services</Link> |{" "}
        <Link to="/create-service">Create Service</Link>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/create-service" element={<CreateServicePage />} />
        <Route path="/services/:id" element={<SingleService />} />
      </Routes>
    </Router>
  );
}

export default App;
