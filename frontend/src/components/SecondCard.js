import { Link } from "react-router-dom";

function SecondCard(props) {
  const { info } = props;
  return (
    <Link to={`/info/${info.slug}`} className='second-blog-card'>
      <h1 className='second-card-title'>{info.title}</h1>
      <p className='second-card-desc'>{info.description}</p>
      <img src={info.image} className='second-card-img' alt={info.name} />
    </Link>
  );
}
export default SecondCard;
