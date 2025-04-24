import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import EvolveStrengthHome from "./components/Home/mobile";
import LocationDetails from "./components/Home/mobile/LocationDetails";
import MemberDetails from "./components/Home/mobile/MemberDetails";
import MemberPayment from "./components/Home/mobile/MemberPayment";
import ConfirmationPage from "./components/Home/mobile/ConfirmationPage";
import MembershipPlan from "./components/Home/mobile/MembershipPlan";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <>
                <div className="max-lg:hidden">sdf</div>
                <div className="lg:hidden">
                  <EvolveStrengthHome />
                </div>
              </>
            }
          />
          <Route path="/location-details" element={<LocationDetails />} />
          <Route path="/membership-plan" element={<MembershipPlan />} />
          <Route path="/member-details" element={<MemberDetails />} />
          <Route path="/member-Payment" element={<MemberPayment />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
