import { useEffect, useReducer } from "react";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import SecondCard from "../components/SecondCard";

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

function BlogScreen() {
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

  const latestBlog = infos.toReversed().map((info) => {
    if (info.type === "blog") {
      return <SecondCard className='blog' info={info} />;
    }
  });

  return (
    <div className=''>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div className='blog-screen-holder'>
          <h1 className='blog-screen-header'>Latest Blogs</h1>
          <div className='blogs-holder'>{latestBlog}</div>
        </div>
      )}
    </div>
  );
}
export default BlogScreen;
