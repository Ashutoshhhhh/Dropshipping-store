import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import App from './App.jsx'
import router from './routers/Router.jsx'
import {RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import { store } from './redux/store.js'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/> 
  </Provider>,
)
