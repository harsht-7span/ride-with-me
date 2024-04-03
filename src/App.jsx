import ResetPage from "./pages/ResetPage/ResetPage";
import SuccessfullPage from "./pages/Successfull/SuccessfullPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import RiderRegistrationPage from "./pages/RiderRegistrationPage/RiderRegistrationPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import MapboxPage from "./components/MapBoxPage";
import HomePage from "./pages/HomePage/HomePage";
import Test from "./components/Test";
import { Outlet, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Toaster } from "./components/ui/toaster";

function Layout() {
  return <Outlet />;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="/successfull" element={<SuccessfullPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route
            path="/riderRegistreation"
            element={<RiderRegistrationPage />}
          />
        </Route>
      </Routes>
      <Toaster />

      {/* <Login /> */}
      {/* <h1 className="">Ride with Me</h1> */}
      {/* <ResetPage /> */}
      {/* <VerifyPage /> */}
      {/* <SuccessfullPage /> */}
      {/* <SignupPage /> */}
      {/* <RiderRegistrationPage /> */}
      {/* <MapboxPage /> */}
      {/* <HomePage /> */}
      {/* <Test /> */}
    </>
  );
}

export default App;
