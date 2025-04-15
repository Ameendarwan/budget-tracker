import { Navigate, Outlet, useLocation } from 'react-router-dom';

import Layout from '@app/components/Layout';
import auth from '@app/utils/auth';
import { paths } from '@app/routes/Routes.utils';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = auth.token();
  const userRole = auth.getUserRole() ?? '';

  if (!token) {
    return <Navigate to={paths.signIn} replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={paths.signIn} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
