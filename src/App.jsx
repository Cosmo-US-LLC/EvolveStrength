import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} >
          <Route
            path="/"
            element={
              <>
                {/* <div className="max-lg:hidden">sdf</div> */}
                <div className="lg:hidden"><EvolveStrengthHome/></div>
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
