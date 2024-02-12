import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { useContext, useState } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardScreen from "./screens/DashboardScreen";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import InfoScreen from "./screens/InfoScreen";
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
import ScheduleScreen from "./screens/ScheduleScreen";
import AboutScreen from "./screens/AboutScreen";
import TalkScreen from "./screens/TalkScreen";
import ProjectScreen from "./screens/ProjectsScreen";
import ContactScreen from "./screens/ContactScreen";
import InfoListScreen from "./screens/InfoListScreen";
import InfoEditScreen from "./screens/InfoEditScreen";
import NotFound from "./screens/NotFound";

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
                <Link className='nav-link' to='/about'>
                  About
                </Link>
                <Link className='nav-link' to='/blogs'>
                  Blog
                </Link>
                <Link className='nav-link' to='/projects'>
                  Projects
                </Link>
                <Link className='nav-link' to='/schedule'>
                  Schedule
                </Link>
                <Link className='nav-link' to='/store'>
                  Store
                </Link>

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='nav-dropdown'>
                    <div className='nav-link-holder'>
                      <Link to='/orderhistory'>Order History</Link>
                      <NavDropdown.Divider />
                      <Link
                        className='dropdown-item'
                        to='#signout'
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </div>
                  </NavDropdown>
                ) : (
                  <Link className='nav-link' to='/signin'>
                    Sign In
                  </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='admin-nav-dropdown'>
                    <div className='nav-link-holder'>
                      <Link className='admin-dropdown' to='/admin/dashboard'>
                        Dashboard
                      </Link>
                      <Link className='admin-dropdown' to='/admin/products'>
                        Products
                      </Link>
                      <Link className='admin-dropdown' to='/admin/Infos'>
                        Infos
                      </Link>
                      <Link className='admin-dropdown' to='/admin/orders'>
                        Orders
                      </Link>
                      <Link className='admin-dropdown' to='/admin/users'>
                        Users
                      </Link>
                    </div>
                  </NavDropdown>
                )}
                <Link className='nav-link' id='contact-btn' to='/contact'>
                  Contact Me!
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </header>
      <ToastContainer position='bottom-center' limit={1} />

      <main>
        <div className='landing'>
          <Routes>
            <Route path='/product/:slug' element={<ProductScreen />} />
            <Route path='/info/:slug' element={<InfoScreen />} />
            <Route path='/talks/:slug' element={<TalkScreen />} />
            <Route path='/projects/:slug' element={<ProjectScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/signin' element={<SigninScreen />} />
            <Route path='/signup' element={<SignupScreen />} />
            <Route path='/links' element={<LinksScreen />} />
            <Route path='/store' element={<StoreScreen />} />
            <Route path='/schedule' element={<ScheduleScreen />} />
            <Route path='/about' element={<AboutScreen />} />
            <Route path='/contact' element={<ContactScreen />} />
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
            <Route path='/shipping' element={<ShippingAddressScreen />}></Route>
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
              path='/admin/product/:id'
              element={
                <AdminRoute>
                  <ProductEditScreen />
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
              path='/admin/info/:id'
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
            <Route path='/projects' element={<ProjectScreen />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
