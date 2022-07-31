import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Admin from "./admin/admin";

const cookies = new Cookies();


const ProtectedRoutes = () => {
  const token = cookies.get("TOKEN");
  if (token) {
    return (<Admin />)
  } else {
    return (
      <Navigate to={"/admin/login"} replace />
    )
  }
}

export default ProtectedRoutes;
