import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

function App() {
  useFavicon();

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <>
                <div className="max-lg:hidden">{/** Desktop Component */}</div>
                <div className="lg:hidden">{/** Mobile Component */}</div>
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
