import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = () => {
    const auth = useAuth();

    return auth.user ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
