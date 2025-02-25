import React from 'react'
import Mainlayout from './components/Mainlayout'
import { useState ,createContext} from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
export const Globlelogin = createContext();
import Login from './pages/Login'
import Layout0 from './pages/Layout0'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Test from './pages/Test'
import Meeting from './components/Meeting'
import Test2 from './pages/Test2'
import Test3 from './pages/Test3'
import Meeting1v1 from './components/Meeting1v1'
import Rating123 from './components/Rating'
import Apptitude from './pages/Apptitude'
import MainApptiapge from './pages/MainApptiapge'
import AddaptiQ from './components/AddaptiQ'
import Dicussion from './pages/Dicussion'
import ATS from './pages/ATS'

export default function App() {
  const [globalUser, setGlobalUser] = useState(null);

  const handleGlobalUser = (user) => {
    setGlobalUser(user);
    console.log("About user", user);
  };
  const ProtectedRoute = ({ children }) =>{
    return globalUser ? children : <Login handleGlobalUser={handleGlobalUser} />;
  };

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout0/>,
        children: [
          {
            path: "",
            element: <Login handleGlobalUser={handleGlobalUser}/>
          },
          {
            path: "new",
            element: <Register />
          },
          {
            path: "Home",
            element: (
              <ProtectedRoute>
                <Mainlayout />
              </ProtectedRoute>
            ),
            children: [
              {
                path: "",
                element: <Dashboard/>
              },
              {
                path: "Dashboard",
                element: <Dashboard/>
              },
              {
                path: "GDrooms",
                element: <Test />,
               
              },
              {
                path: "Rooms/:id",
                element: <Meeting />,
               
              },
              {
                path:'Com-Q',
                element:<Test2/>,
                
              },
              {
                path:'Test3',
                element:<Test3/>
              },
              {
                path:'Test3/:id',
                element:<Meeting1v1/>
              },
              {
                path:'Rating/:id',
                element:<Rating123/>
              },
              {
                path:'Apptitude',
                element:<MainApptiapge/>,
                           
             },
             {
              path:'Test',
              element:<Apptitude/>
             },
             {
              path:'Add_Q',
              element:<AddaptiQ/>
             },
             {
              path:'Discussion',
              element:<Dicussion/>
             },
             {
              path:'ATS',
              element:<ATS/>
             }
            ]
          }
        ],


      },
    ]
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Globlelogin.Provider value={{ globalUser, setGlobalUser }}>
    <RouterProvider router={router} />
  </Globlelogin.Provider>
  )
}
