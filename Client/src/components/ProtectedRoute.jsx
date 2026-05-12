import { Navigate } from "react-router-dom";

export default function ProtectedRoute({

  children,
  allowedRole

}) {

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  // Not logged in
  if(!token){
    return <Navigate to="/login" />;
  }

  // Wrong role
  if(role !== allowedRole){
    return <Navigate to="/login" />;
  }

  return children;
}