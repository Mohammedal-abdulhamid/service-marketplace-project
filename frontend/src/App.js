import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SingleService from "./pages/SingleService";
import ProvidersPage from "./pages/ProvidersPage";
import RequestersPage from "./pages/RequestersPage";
import Footer from "./components/Footer";
import AddListing from "./pages/AddListing";
import Profile from "./pages/Profile"; 



function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<SingleService />} />
            <Route path="/providers" element={<ProvidersPage />} />
            <Route path="/requests" element={<RequestersPage />} />
            <Route path="/add-listing" element={<AddListing />} />
            <Route path="/profile" element={<Profile />} />
            

          </Routes>
        </main>

        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
