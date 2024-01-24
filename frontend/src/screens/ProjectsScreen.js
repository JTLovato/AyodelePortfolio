import { useEffect, useReducer } from "react";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProjectsCard from "../components/ProjectsCard";

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

function ProjectScreen() {
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

  const latestTalk = infos.toReversed().map((info) => {
    if (info.type === "video") {
      return <ProjectsCard className='talks' info={info} />;
    }
  });

  return (
    <div className='margin-holder'>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div className='about-screen-holder'>
          <h2>About Ayodele</h2>
          <h4>
            This is where I discuss my projects and other things. Lookit here at
            all this text. Wowzers.
          </h4>
          <div className='talks-holder'>{latestTalk}</div>
        </div>
      )}
    </div>
  );
}
export default ProjectScreen;
