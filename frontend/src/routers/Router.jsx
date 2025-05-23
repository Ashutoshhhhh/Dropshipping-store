import {createBrowserRouter} from 'react-router-dom'
import App from '../App';
import Home from '../components/Home/Home';
import Shop from '../components/Shop/Shop';
import Categogypage from '../components/Categories/Categogypage';
import Search from '../components/Search/Search';
import Singleproduct from '../components/Shop/Singleproduct';
import Login from '../components/Login/Login';
import Register from '../components/Login/Register';
const router =createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path:"/categories/:categoryName",
                element:<Categogypage/>
            },
            {
                path:"/search",
                element:<Search/>
            },
            {path:"/shop", element:<Shop/>},
            {path:"/shop/:id",element:<Singleproduct/>}
        ]

    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
]);

export default router