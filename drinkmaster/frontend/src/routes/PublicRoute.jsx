import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/authSlice';

const PublicRoute = ({ component: Component }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to='/home' /> : <Component />;
};
export default PublicRoute;
