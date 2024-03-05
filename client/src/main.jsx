import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
//import Home from './pages/Home';


import Signup from './pages/Signup';
import Login from './pages/Login';
//import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import Board from './pages/Board';
import PackageNotification from './pages/PackageNotification';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Profile />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
         path: '/board',
         element: <Board/>
      }, {
        path: '/package',
        element: <PackageNotification />
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
