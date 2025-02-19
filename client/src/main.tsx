import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.css";
import "./styles/carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.tsx";

import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
// import Profile from './pages/Profile.tsx';
import Test from "./pages/TestPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      // {
      //   path: '/profile',
      //   element: <Profile />

      // },
      // {
      //   path: '/reviews',
      //   element: <Reviews />
      // },
      {
        path: "/test",
        element: <Test />,
      },
      // {
      //   path: '/profile',
      //   element: <Profile />
      // },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
