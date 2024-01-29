import React from "react";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import {Info}  from './Info'; 
import { Hello } from "./Hello";
import Errorjs from "./Error/Errorjs";
import Lender from "./Lender";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Temp from "./Temp";

export const AppRouter=()=>{
  const routes=createBrowserRouter([
      {path:'/',element:<Login />,errorElement:<Errorjs/>},
      {path:'/signup',element:<Signup />,errorElement:<Errorjs/>},
      {path:'/a',element:<Temp />,errorElement:<Errorjs/>},
      {path:'/home/lender/:userId',element:<Lender />,errorElement:<Errorjs/>},
      {path:'/home/borrower/:userId',element:<Lender />,errorElement:<Errorjs/>},
      {path:'/home/admin/:userId',element:<Lender />,errorElement:<Errorjs/>},

  ])

  return(
    <RouterProvider router={routes} />
  )

}


// {path:'/signup',element:<Signup />,errorElement:<Errorjs/>},

