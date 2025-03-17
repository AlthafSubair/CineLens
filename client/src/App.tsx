import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

import Loader from './pages/Loader';



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





// Lazy load components
const Layout = lazy(() => import('./Layout/Layout'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Register = lazy(() => import('./pages/Register'));
const Otp = lazy(() => import('./pages/Otp'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const WatchListPage = lazy(() => import('./pages/WatchListPage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const AdminDashBoard = lazy(() => import('./pages/AdminDashBoard'));
const AdminMovies = lazy(() => import('./pages/AdminMovies'));
const AdminMovie = lazy(() => import('./pages/AdminMovie'));
const AdminRoles = lazy(() => import('./pages/AdminRoles'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AdminCarousel = lazy(() => import('./pages/AdminCarousel'));
const AdminUsers = lazy(()=> import('./pages/AdminUsers'));
const AdminSearch = lazy(()=> import('./pages/AdminSearch'));

function App() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const [isLoading, setIsLoading] = useState(true);

  



  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '/auth/login', element: <LoginPage /> },
        { path: '/auth/signup', element: <Register /> },
        {path: "/auth/verify-otp/:email", element: <Otp />},
        { path: '/auth/forgot-password', element: <ForgotPasswordPage /> },
        { path: '/auth/reset-password/:email', element: <ResetPasswordPage /> },
        { path: '/watchlist', element: <WatchListPage /> },
        { path: '/movie/:id', element: <MoviePage /> },
        {path: '/admin/dashboard', element: <AdminDashBoard />},
        {path: '/admin/movies', element: <AdminMovies />},
        {path: '/admin/movie/:id', element: <AdminMovie />},
        {path: '/admin/roles', element: <AdminRoles />},
        {path: '/search', element: <SearchPage />},
        {path: '/admin/corusel', element: <AdminCarousel />},
        {path: '/admin/users', element: <AdminUsers />},
        {path: '/admin/search', element: <AdminSearch />}
        
      ],
    },
  ]);

  // Simulate loading complete after assets are ready
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulated loading delay

    return () => clearTimeout(timeout);
  }, [darkMode, isLoading]);

  if (isLoading) {
    return <Loader />; // Show loading spinner
  }

  return (
    <Suspense fallback={ <Loader />}>
     <ToastContainer />
      <RouterProvider router={router} />
     
    </Suspense>
  );
}

export default App;
