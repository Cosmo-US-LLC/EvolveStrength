import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import EvolveStrengthHome from "./components/Home/mobile";
import LocationDesktop from "./components/Home/desktop";
import MembershipDesktop from "./components/Home/desktop/Membership/desktop";
import AboutYourself from "./components/Home/desktop/AboutYourself";
import LocationDetails from "./components/Home/mobile/LocationDetails";
import MemberDetails from "./components/Home/mobile/MemberDetails";
import MemberPayment from "./components/Home/mobile/MemberPayment";
import ConfirmationPage from "./components/Home/mobile/ConfirmationPage";
import MembershipPlan from "./components/Home/mobile/MembershipPlan";
import ReviewAndPay from "./components/Home/desktop/Payment/desktop";
import Congratulations from "./components/Home/desktop/Congratulations";

import ScrollToTop from "./utils/ScrollToTop";
import NotFoundPage from "./pages/NotFoundPage";
import Loader from "./components/Loader";

function App() {
  return (
    <Router>
      <ScrollToTop />
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
                <div className="lg:hidden">
                  <MembershipPlan />
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
                <div className="lg:hidden">
                  <MemberDetails />
                </div>
              </>
            }
          />
          <Route
            path="/review-and-pay"
            element={
              <>
                <div className="max-lg:hidden">
                  <ReviewAndPay />
                </div>
                <div className="lg:hidden">
                  <MemberPayment />
                </div>
              </>
            }
          />
          <Route
            path="/congratulations"
            element={
              <>
                <div className="max-lg:hidden">
                  <Congratulations />
                </div>
              </>
            }
          />
          <Route path="/location-details" element={<LocationDetails />} />
          {/* <Route path="/membership-plan" element={<MembershipPlan />} /> */}
          {/* <Route path="/member-details" element={<MemberDetails />} /> */}
          {/* <Route path="/member-Payment" element={<MemberPayment />} /> */}
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/loader" element={<Loader />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
