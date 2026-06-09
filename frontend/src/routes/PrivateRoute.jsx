import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/authSlice';

const PrivateRoute = ({ component: Component }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  if (isRefreshing) return null;

  return isLoggedIn ? <Component /> : <Navigate to='/welcome' />;
};
export default PrivateRoute;
