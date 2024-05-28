import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import ResetPage from "./pages/ResetPage/ResetPage";
import SuccessfullPage from "./pages/Successfull/SuccessfullPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import { Toaster } from "./components/ui/toaster";
import AuthRoute from "./routes/routes";
import EditProfile from "./pages/Profile/EditProfile";
import PaymentMode from "./pages/Payment/PaymentMode";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/login"
            element={<AuthRoute element={Login} isPrivate={false} />}
          />
          <Route
            path="/signup"
            element={<AuthRoute element={SignupPage} isPrivate={false} />}
          />
          <Route
            path="/reset"
            element={<AuthRoute element={ResetPage} isPrivate={false} />}
          />
          <Route
            path="/success"
            element={<AuthRoute element={SuccessfullPage} isPrivate={true} />}
          />
          <Route
            path="/verify"
            element={<AuthRoute element={VerifyPage} isPrivate={false} />}
          />
          <Route
            path="/"
            element={<AuthRoute element={HomePage} isPrivate={true} />}
          />
          <Route
            path="/edit"
            element={<AuthRoute element={EditProfile} isPrivate={true} />}
          />
          <Route
            path="/paymode"
            element={<AuthRoute element={PaymentMode} isPrivate={true} />}
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
