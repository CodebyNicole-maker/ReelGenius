import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import './carousel.css';

import App from './App.tsx';

import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import Profile from './pages/Profile.tsx';
import Test from './pages/TestPage.tsx';
import Reviews from './pages/Reviews.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/profile',
        element: <Profile />
    
      },
      {
        path: '/reviews',
        element: <Reviews />
      }, 
      {
        path: '/test',
        element: <Test />
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
