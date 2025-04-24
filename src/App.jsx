import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import EvolveStrengthHome from "./components/Home/mobile";
import LocationDesktop from "./components/Home/desktop";
import MembershipDesktop from "./components/Membership/desktop";
import AboutYourself from "./components/AboutYourself";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <>
                <div className="max-lg:hidden">
                  <LocationDesktop />
                </div>
                <div className="lg:hidden">
                  <EvolveStrengthHome />
                </div>
              </>
            }
          />
          <Route
            path="/membership"
            element={
              <>
                <div className="max-lg:hidden">
                  <MembershipDesktop />
                </div>
              </>
            }
          />
          <Route
            path="/about-yourself"
            element={
              <>
                <div className="max-lg:hidden">
                  <AboutYourself />
                </div>
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
