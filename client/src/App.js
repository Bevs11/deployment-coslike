import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import './style.scss';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import { DarkModeContext } from './context/darkModeContext';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import Promotion from './components/adPromotion/Promotion';
import AddPromo from './components/adPromotion/AddPromo';
import AdPreview from './components/adPromotion/AdPreview';
import AdSubmit from './components/adPromotion/AdSubmit';
import AdForm from './components/adPromotion/AdForm';


function App() {

  const {user} = useContext(AuthContext);

  const {darkMode} = useContext(DarkModeContext);

  const Layout = () => {
    return(
      <div className = {`theme-${darkMode ? 'dark' : 'light'}`}>
        <NavBar />
        <div style={{display:'flex'}}>
          <div style={{ flex: 6}}>
          <Outlet />
          </div>
        </div>
        <Footer/>
      </div>
    );
  };

  const ProtectedRoute = ({children}) =>{
    if(!user){
      return <Navigate to='/login'/>
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path:'/',
      element: 
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>,
      children:[
        {
          path:'/',
          element: user ? <Home /> : <Navigate to ='/login'/>
        },
        {
          path:'/home',
          element:  <Home />
        },
        {
          path:'/profile/:username',
          element:<Profile />
        },
        {
          path:'/promotion',
          element:<Promotion />
        },
        {
          path:'/addpromo',
          element:<AddPromo />
        },
        {
          path:'/adpreview',
          element:<AdPreview />
        },
        {
          path:'/adsubmit',
          element:<AdSubmit />
        },
        {
          path:'/adform',
          element:<AdForm />
        },

    ]
    },
    {
      path: '/login',
      //element: user ? <Navigate to ='/Home'/> : <Login />,
      element: <Login/>,
    },
    {
      path: '/register',
      //element: user ? <Navigate to ='/register'/> : <Register />,
      element: <Register/>
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;
