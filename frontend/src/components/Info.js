import { Link } from "react-router-dom";

function Info(props) {
  const { info } = props;
  return (
    <Link to={`/info/${info.slug}`} className='blog-card'>
      {info.type === "podcast" && (
        <img src='/images/podcast-icon.png' alt='' className='card-icon'></img>
      )}
      {info.type === "blog" && (
        <img src='/images/blog-icon.png' alt='' className='card-icon'></img>
      )}
      {info.type === "video" && (
        <img src='/images/video-icon.png' alt='' className='card-icon'></img>
      )}
      <h1 className='info-card-title'>{info.title}</h1>
      <p className='card-desc'>{info.description}</p>
      <img src={info.image} className='card-img' alt={info.name} />
    </Link>
  );
}
export default Info;
