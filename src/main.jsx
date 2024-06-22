import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux'
import { store } from './ReduxStore/store.js';
 import {createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
 import Redirect from './Redirect.jsx';
import Faviourite from './Faviourite.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    },
    { path: "/redirect",
      element: <Redirect/>,
    },
    { path: "/favorite",
      element: <Faviourite/>,
    }
   
])
ReactDOM.createRoot(document.getElementById('root')).render(
       <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>,

 )
