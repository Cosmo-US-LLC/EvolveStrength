import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import EvolveStrengthHome from "./components/Home/mobile";
import LocationDesktop from "./components/Home/desktop";

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
