import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { useContext, useEffect, useState } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { getError } from "./utils";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./screens/DashboardScreen";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import InfoEditScreen from "./screens/InfoEditScreen";
import InfoListScreen from "./screens/InfoListScreen";
import InfoScreen from "./screens/InfoScreen";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Footer from "./components/Footer";
import LinksScreen from "./screens/LinksScreen";
import BlogScreen from "./screens/BlogScreen";
import StoreScreen from "./screens/StoreScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <Helmet>
        <title>Ayodele Odubela</title>
      </Helmet>

      <header>
        <Navbar expand='lg' fixed='top'>
          <div className='nav-header'>
            <Link to='/'>
              <Navbar.Brand>
                <img src='../images/logo.png' alt='Logo' />
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle
              justify-content-end
              aria-controls='basic-navbar-nav'
            />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className=''>
                {/* <Link to='/cart' className='nav-link'>
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg='danger'>
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link> */}

                <Link className='nav-link' to='/'>
                  About
                </Link>
                <Link className='nav-link' to='/blogs'>
                  Blog
                </Link>
                <Link className='nav-link' to='/'>
                  Projects
                </Link>
                <Link className='nav-link' to='/'>
                  Media
                </Link>
                <Link className='nav-link' to='/'>
                  Schedule
                </Link>
                <Link className='nav-link' to='/store'>
                  Store
                </Link>

                {/* {userInfo ? (
                    <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                      <Link to='/profile'>User Profile</Link>
                      <NavDropdown.Divider />
                      <Link to='/orderhistory'>Order History</Link>
                      <NavDropdown.Divider />
                      <Link
                        className='dropdown-item'
                        to='#signout'
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className='nav-link' to='/signin'>
                      Sign In
                    </Link>
                  )} */}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='admin-nav-dropdown'>
                    <Link className='admin-dropdown' to='/admin/dashboard'>
                      Dashboard
                    </Link>
                    <Link className='admin-dropdown' to='/admin/products'>
                      Products
                    </Link>
                    <Link className='admin-dropdown' to='/admin/orders'>
                      Orders
                    </Link>
                    <Link className='admin-dropdown' to='/admin/users'>
                      Users
                    </Link>
                  </NavDropdown>
                )}
                <Link className='nav-link' id='contact-btn' to='/'>
                  Contact Me!
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </header>
      <div
        className={
          sidebarIsOpen
            ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
            : "side-navbar d-flex justify-content-between flex-wrap flex-column"
        }
      >
        <Nav className='flex-column text-white w-100 p-2'>
          <Nav>
            <strong>Categories</strong>
          </Nav>
          {categories.map((category) => (
            <Nav key={category}>
              <Link
                to={`/search?category=${category}`}
                onClick={() => setSidebarIsOpen(false)}
              >
                <Nav>{category}</Nav>
              </Link>
            </Nav>
          ))}
        </Nav>
      </div>
      <div
        className={
          sidebarIsOpen
            ? "d-flex flex-column site-container active-cont"
            : "d-flex flex-column site-container"
        }
      >
        <ToastContainer position='bottom-center' limit={1} />

        <main>
          <div className='landing'>
            <Routes>
              <Route path='/product/:slug' element={<ProductScreen />} />
              <Route path='/infos/:slug' element={<InfoScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/search' element={<SearchScreen />} />
              <Route path='/signin' element={<SigninScreen />} />
              <Route path='/signup' element={<SignupScreen />} />
              <Route path='/links' element={<LinksScreen />} />
              <Route path='/store' element={<StoreScreen />} />
              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route
                path='/order/:id'
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/orderhistory'
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path='/shipping'
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path='/payment' element={<PaymentMethodScreen />}></Route>
              {/* Admin Routes */}
              <Route
                path='/admin/dashboard'
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/orders'
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/users'
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/products'
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/infos'
                element={
                  <AdminRoute>
                    <InfoListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/product/:id'
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/infos/:id'
                element={
                  <AdminRoute>
                    <InfoEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path='/admin/user/:id'
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route path='/' element={<HomeScreen />} />
              <Route path='/blogs' element={<BlogScreen />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
