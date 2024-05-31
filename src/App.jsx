import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import SuccessfullPage from "./pages/Successfull/SuccessfullPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import { Toaster } from "./components/ui/toaster";
import AuthRoute from "./routes/routes";
import EditProfile from "./pages/Profile/EditProfile";
import PaymentMode from "./pages/Payment/PaymentMode";
import SuccessfullPayment from "./pages/SuccessfullPayment/SuccessfullPayment";
import CancelPayment from "./pages/CancelPayment/CancelPayment";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import About from "./pages/Profile/About";
import Help from "./pages/Profile/Help";
import Home from "./components/Home";

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
            path="/success"
            element={<AuthRoute element={SuccessfullPage} isPrivate={true} />}
          />
          <Route
            path="/verify"
            element={<AuthRoute element={VerifyPage} isPrivate={false} />}
          />
          <Route
            path="/"
            element={<AuthRoute element={Home} isPrivate={true} />}
          />
          <Route
            path="/edit"
            element={<AuthRoute element={EditProfile} isPrivate={true} />}
          />
          <Route
            path="/about"
            element={<AuthRoute element={About} isPrivate={true} />}
          />
          <Route
            path="/help"
            element={<AuthRoute element={Help} isPrivate={true} />}
          />
          <Route
            path="/paymode"
            element={<AuthRoute element={PaymentMode} isPrivate={true} />}
          />
          <Route
            path="/successpayment"
            element={
              <AuthRoute element={SuccessfullPayment} isPrivate={true} />
            }
          />
          <Route
            path="/cancelpayment"
            element={<AuthRoute element={CancelPayment} isPrivate={true} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
