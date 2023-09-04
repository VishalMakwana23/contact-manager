import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login/Index";
import Home from "./components/Home";

function App() {
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("accessToken");
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <main>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
