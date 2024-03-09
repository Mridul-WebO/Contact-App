import { useSelector } from 'react-redux';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

function ProtectedRoute() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const context = useOutletContext();

  if (Object.keys(currentUser).length === 0) {
    return <Navigate to="/" />;
  }

  return <Outlet context={context} />;
}

export default ProtectedRoute;
