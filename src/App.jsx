import ResetPage from "./pages/ResetPage/ResetPage";
import SuccessfullPage from "./pages/Successfull/SuccessfullPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
// import RiderRegistrationPage from "./pages/RiderRegistrationPage/RiderRegistrationPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import HomePage from "./pages/HomePage/HomePage";
import { Outlet, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Toaster } from "./components/ui/toaster";
import Test2 from "./components/Test2";

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
          <Route path="/test" element={<Test2 />} />

          {/* <Route path="/distance" element={<DistanceMatrix />} /> */}

          <Route path="/homepage" element={<HomePage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
