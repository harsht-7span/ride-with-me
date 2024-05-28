import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ element: Component, isPrivate, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  if (isPrivate) {
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
  } else {
    return !isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
  }
};

export default AuthRoute;
