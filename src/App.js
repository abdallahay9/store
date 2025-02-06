import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Page/Auth/Login';
import Register from './Page/Auth/Register';
import Users from './Page/Dashboard/inerrPages/Users/Users';
import Dashboard from './Page/Dashboard/Dashboard';
import RequireAuth from './Page/Auth/RequireAuth';
import UpdateUsers from './Page/Dashboard/inerrPages/Users/UpdateUsers';
import AddUser from './Page/Dashboard/inerrPages/Users/AddUser';
import Forbidden404 from './Page/Auth/404';
import Categories from './Page/Dashboard/inerrPages/Categories/categories';
import AddCategories from './Page/Dashboard/inerrPages/Categories/AddCategories';
import UpdateCategories from './Page/Dashboard/inerrPages/Categories/UpdateCategories';
import Products from './Page/Dashboard/inerrPages/Products/Products';
import AddProduct from './Page/Dashboard/inerrPages/Products/AddProduct';
import UpdateProduct from './Page/Dashboard/inerrPages/Products/UpdateProduct';
import Website from './Page/Websites/Website';
import HomePage from './Page/Websites/HomePage/HomePage';
import ProductPage from './Page/Websites/Product/ProductPage';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<Forbidden404/>} />

          <Route path='/' element={<Website/>} >
            <Route element={<HomePage />} path='/' />
            <Route element={<ProductPage />} path='/product/:id' />
          </Route>


          {/* PRIVATE ROTES */}
          <Route element={<RequireAuth allowedRole={["1996","1995","1999"]} />}>
             <Route path='/dashboard' element={<Dashboard />} >
                      {/* User ROTES */}
                      <Route element={<RequireAuth allowedRole={["1995"]} />}>
                              <Route path='users' element={<Users />} />
                              <Route path='users/:id' element={<UpdateUsers />} />
                              <Route path='/dashboard/user/add' element={<AddUser />} />
                      </Route>
                      <Route element={<RequireAuth allowedRole={["1995","1999"]} />}>
                              {/* Categories ROTES */}
                              <Route path='categories' element={<Categories />} />
                              <Route path='categore/add' element={<AddCategories />} />
                              <Route path='categories/:id' element={<UpdateCategories />} />
                              {/* Products ROTES */}
                              <Route path='products' element={<Products />} />
                              <Route path='product/add' element={<AddProduct />} />
                              <Route path='products/:id' element={<UpdateProduct />} />
                      </Route>
                      
              </Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;

