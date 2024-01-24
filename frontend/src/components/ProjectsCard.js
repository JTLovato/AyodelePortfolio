import React from "react";
import { Link } from "react-router-dom";

export default function ProjectsCard(props) {
  const { info } = props;
  return (
    <Link className='talk-link' to={`/talks/${info.slug}`}>
      <img src={info.image} className='talk-link-image' alt=''></img>
      <h1>{info.title}</h1>
    </Link>
  );
}
