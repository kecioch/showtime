import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ hasPermission, redirect = "/login", children }) => {
  const location = useLocation();
  if (!hasPermission)
    return (
      <Navigate to={redirect} replace state={{ from: location.pathname }} />
    );

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
