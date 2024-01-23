import { useEffect, useReducer } from "react";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Info from "../components/Info";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, infos: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function LatestInfoScreen() {
  const [{ loading, error, infos }, dispatch] = useReducer(reducer, {
    infos: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchInfoData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/infos");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchInfoData();
  }, []);

  const firstBlogs = infos
    .toReversed()
    .slice(0, 1)
    .map((info) => {
      return <Info className='first-blog' info={info} />;
    });

  const nextTwoBlogs = infos
    .toReversed()
    .slice(1, 3)
    .map((info) => {
      return <Info className='next-two-blogs' info={info} />;
    });

  return (
    <div className='blog-section'>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div className='blog-holder'>
          <h1>Latest Blogs</h1>
          <div className='inner-blog-holder'>
            <div className='latest-blog'>{firstBlogs}</div>
            <div className='next-two-blogs'>{nextTwoBlogs}</div>
          </div>
        </div>
      )}
    </div>
  );
}
export default LatestInfoScreen;
