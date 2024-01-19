import { useEffect, useReducer } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext, useState } from "react";
import { Store } from "../Store";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
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
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div className='hero-section'>
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
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
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
                <Link className='nav-link' to='/'>
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
                <Link className='nav-link' to='/'>
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
                    <Link to='/admin/dashboard'>Dashboard</Link>
                    <Link to='/admin/productlist'>Products</Link>
                    <Link to='/admin/orderlist'>Orders</Link>
                    <Link to='/admin/userlist'>Users</Link>
                    <Link to='/admin/products'>Products</Link>
                    <Link to='/admin/orders'>Orders</Link>
                    <Link to='/admin/users'>Users</Link>
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
      <div className='hero-holder'>
        <div className='hero-image'>
          <img
            src='images/profilepic.png'
            className='profile-img'
            alt='Ayodele Odubela Headshot'
          ></img>
        </div>
        <div className='hero-info'>
          <h1>
            Meet <span className='italics bold larger'>Ayodele!</span>
          </h1>
          <p>
            I suppose a lot of Lorem Epsom salts could go here but whatever
            blach blah blahdkb I suppose a lot of Lorem EMPHASIS salts could go
            here but whatever blach blah tacos oh WOW I suppose a lot of Lorem
            Epsom salts could go here but whatever blahdkb{" "}
          </p>
          <Link className='nav-link' id='contact-btn-main' to='/'>
            Contact Me!
          </Link>
        </div>
      </div>
    </div>
  );
}
export default HomeScreen;
