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
import LatestInfoScreen from "./LatestInfoScreen";
import HistoryScreen from "./HistoryScreen";
import NewsletterScreen from "./NewsletterScreen";
import Footer from "../components/Footer";

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
            Meet <span className='italics bold larger shimmer'>Ayodele!</span>
          </h1>
          <p className='hero-copy'>
            A leading voice in today's <span>ethical AI</span> landscape, book
            your consultation with Ayodele today for a <span>one-on-one</span>{" "}
            chat and stay ahead of the curve.
          </p>
          <Link className='nav-link' id='contact-btn-main' to='/contact'>
            Contact Me!
          </Link>
        </div>
      </div>
      <div>
        <LatestInfoScreen />
        <HistoryScreen />
        <NewsletterScreen />
      </div>
    </div>
  );
}
export default HomeScreen;
