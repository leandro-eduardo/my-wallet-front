import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Transaction from './pages/Transaction';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes';

import './css/reset.css';
import './css/styles.css';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path='/home' element={<Home />} />
                        <Route path='/transaction' element={<Transaction />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
