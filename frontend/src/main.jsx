import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './components/Login.jsx'
import { Dashboard } from './components/Dashboard.jsx'
import Signup from './components/Signup.jsx'
import PredictSentence from './components/PredictSentence.jsx'
import AddSentence from './components/Addsentence.jsx'
import Forgotpassword from './components/Forgotpassword.jsx'
import { LoginProvider } from './context/Logincontext.jsx'
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Login",
        element: <Login />
      },
      {
        path: "/ForgotPassword",
        element: <Forgotpassword />
      },
      {
        path: "Signup",
        element: <Signup />
      },
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "predictsentence",
            element: <PredictSentence />
          },
          {
            path: "/",
            element: <AddSentence />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={route} />
    </LoginProvider>
  </React.StrictMode>,
)
