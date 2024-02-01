import { Link } from "react-router-dom";

function Product(props) {
  const { product } = props;

  return (
    <Link className='product-link' to={`/product/${product.slug}`}>
      <img
        src={product.image}
        className='product-card-image'
        alt={product.name}
      />
      <h1 className='product-card-name'>{product.name}</h1>
      <h3>${product.price}</h3>
    </Link>
  );
}
export default Product;
