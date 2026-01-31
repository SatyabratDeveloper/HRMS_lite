import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">HRMS Lite</span>
            </Link>
            <div className="ml-10 flex space-x-4">
              <Link
                to="/"
                className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Employees
              </Link>
              <Link
                to="/attendance"
                className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors ${
                  isActive("/attendance")
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Attendance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
