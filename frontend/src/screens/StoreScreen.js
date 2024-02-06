import { useEffect, useReducer } from "react";
import axios from "axios";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";

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

function StoreScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  // <div>
  //   {product.countInStock < 11 && product.countInStock > 0 && (
  //     <h1>Almost Gone!</h1>
  //   )}
  //   {product.countInStock === 0 && <h1>Sold Out!</h1>}
  // </div>;
  // const featured = () => {
  //   products.map((product) => {
  //     if (product.highlight) {
  //       <Product key={product.slug} product={product}></Product>;
  //     }
  //   });
  // };
  return (
    <div className='store-holder'>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <div className='products'>
        <img
          className='shop-banner'
          src='/images/shopbanner.jpg'
          alt='shop banner'
        />
        <Link className='your-cart-button new-font' to='/cart'>
          Your Cart
        </Link>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <div className='product-card-holder'>
            {/* <div className='featured'>{featured}</div> */}
            {products.map((product) => (
              <Product key={product.slug} product={product}></Product>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default StoreScreen;
