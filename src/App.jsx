// import ResetPage from "./pages/ResetPage/ResetPage";
// import SuccessfullPage from "./pages/Successfull/SuccessfullPage";
// import VerifyPage from "./pages/VerifyPage/VerifyPage";
// // import RiderRegistrationPage from "./pages/RiderRegistrationPage/RiderRegistrationPage";
// import SignupPage from "./pages/SignupPage/SignupPage";
// import HomePage from "./pages/HomePage/HomePage";
// import { Outlet, Route, Router, Routes } from "react-router-dom";
// import Login from "./pages/Login/Login";
// import { Toaster } from "./components/ui/toaster";
// import RiderDetails from "./pages/RiderDetails/RiderDetails";

// function Layout() {
//   return (
//     <>
//       <Outlet />
//     </>
//   );
// }

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/reset" element={<ResetPage />} />
//           <Route path="/successfull" element={<SuccessfullPage />} />
//           <Route path="/verify" element={<VerifyPage />} />
//           {/* <Route path="/distance" element={<DistanceMatrix />} /> */}
//           <Route path="/homepage" element={<HomePage />} />
//           <Route path="/driver" element={<RiderDetails />} />
//         </Route>
//       </Routes>
//       <Toaster />
//     </>
//   );
// }

// export default App;

import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import ResetPage from "./pages/ResetPage/ResetPage";
import SuccessfullPage from "./pages/Successfull/SuccessfullPage";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import { Toaster } from "./components/ui/toaster";
import RiderDetails from "./pages/RiderDetails/RiderDetails";
import AuthRoute from "./routes/routes";

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
            path="/"
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
            path="/successfull"
            element={<AuthRoute element={SuccessfullPage} isPrivate={false} />}
          />
          <Route
            path="/verify"
            element={<AuthRoute element={VerifyPage} isPrivate={false} />}
          />
          <Route
            path="/home"
            element={<AuthRoute element={HomePage} isPrivate={false} />}
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
