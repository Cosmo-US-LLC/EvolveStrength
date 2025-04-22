import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
 

function App() {

  return (
    <Router>
      <Routes>
        <Route  >
          <Route
            path="/"
            element={
              <>
                <div className="max-lg:hidden"> asdasdas</div>
                <div className="lg:hidden">asdasdas</div>
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
