import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Login from "./components/Login/Index";
import Home from "./components/Home";

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}

function App() {
  const isAuthenticated = localStorage.getItem("accessToken");

  return (
    <main>
      <Toaster />

      <Router>
        <PrivateRoute
          path="/home"
          component={Home}
          isAuthenticated={isAuthenticated}
        />
        <Route path="/login" component={Login} />
      </Router>
    </main>
  );
}

export default App;
