import { Routes as DOMRoutes, Route } from 'react-router-dom';

import { ALLOWED_ROLES } from '@app/utils/auth';
import Analysis from '@app/pages/Analysis';
import ChangePassword from '@app/pages/Auth/ChangePassword/ChangePassword';
import Expenses from '@app/pages/Expenses';
import NotFound from '@app/pages/NotFound';
import Profile from '@app/pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from '@app/pages/Auth/ResetPassword';
import SignIn from '@app/pages/Auth/SignIn';
import SignUp from '@app/pages/Auth/SignUp';
import Users from '@app/pages/Users';
import { paths } from './Routes.utils';

const Routes = () => (
  <DOMRoutes>
    {/* Authentication Routes */}
    <Route path={paths.signIn} element={<SignIn />} />
    <Route path={paths.signUp} element={<SignUp />} />
    <Route path={paths.resetPassword} element={<ResetPassword />} />
    <Route path={paths.changePassword} element={<ChangePassword />} />
    {/* Admin and User Protected Routes */}
    <Route element={<ProtectedRoute allowedRoles={[ALLOWED_ROLES.admin, ALLOWED_ROLES.user]} />}>
      <Route path={paths.profile} element={<Profile />} />
      <Route path={paths.home} element={<Analysis />} />
      <Route path={paths.analysis} element={<Analysis />} />
      <Route path={paths.expenses} element={<Expenses />} />
    </Route>
    {/* Admin Protected Routes */}
    <Route element={<ProtectedRoute allowedRoles={[ALLOWED_ROLES.admin]} />}>
      <Route path={paths.users} element={<Users />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </DOMRoutes>
);

export default Routes;
