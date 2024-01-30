import axios from "axios";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
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
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, info }, dispatch] = useReducer(reducer, {
    info: [],
    loading: true,
    error: "",
  });

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
