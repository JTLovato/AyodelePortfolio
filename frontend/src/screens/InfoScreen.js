import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useContext, useEffect, useReducer, useRef, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import { Store } from "../Store";
// import Form from "react-bootstrap/Form";
// import FloatingLabel from "react-bootstrap/FloatingLabel";
// import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    // case "REFRESH_PRODUCT":
    //   return { ...state, info: action.payload };
    // case "CREATE_REQUEST":
    //   return { ...state, loadingCreateReview: true };
    // case "CREATE_SUCCESS":
    //   return { ...state, loadingCreateReview: false };
    // case "CREATE_FAIL":
    //   return { ...state, loadingCreateReview: false };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, info: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function InfoScreen() {
  // let reviewsRef = useRef();

  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, info }, dispatch] = useReducer(reducer, {
    info: [],
    loading: true,
    error: "",
  });
  // const [{ loading, error, info, loadingCreateReview }, dispatch] =
  //   useReducer(reducer, {
  //     info: [],
  //     loading: true,
  //     error: "",
  //   });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/infos/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { cart, userInfo } = state;
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === info._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/infos/${info._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Info is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...info, quantity },
    });
    navigate("/cart");
  };
  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   if (!comment || !rating) {
  //     toast.error("Please enter comment and rating");
  //     return;
  //   }
  //   try {
  //     const { data } = await axios.post(
  //       `/api/infos/${info._id}/reviews`,
  //       { rating, comment, name: userInfo.name },
  //       {
  //         headers: { Authorization: `Bearer ${userInfo.token}` },
  //       }
  //     );

  //     dispatch({
  //       type: "CREATE_SUCCESS",
  //     });
  //     toast.success("Review submitted successfully");
  //     info.reviews.unshift(data.review);
  //     info.numReviews = data.numReviews;
  //     info.rating = data.rating;
  //     dispatch({ type: "REFRESH_PRODUCT", payload: info });
  //     window.scrollTo({
  //       behavior: "smooth",
  //       top: reviewsRef.current.offsetTop,
  //     });
  //   } catch (error) {
  //     toast.error(getError(error));
  //     dispatch({ type: "CREATE_FAIL" });
  //   }
  // };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : (
    <div>
      <div className='main-blog-holder'>
        <div className='blog-img-holder'>
          <img className='img-main' src={info.image} alt={info.name}></img>
        </div>
        <div>
          <Helmet>
            <title>{info.name}</title>
          </Helmet>
          <h1>{info.name}</h1>
          Description:
          <p>{info.description}</p>
        </div>
      </div>
    </div>
  );
}
export default InfoScreen;
