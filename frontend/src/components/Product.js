import { Link } from "react-router-dom";

function Product(props) {
  const { product } = props;

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const {
  //   cart: { cartItems },
  // } = state;

  // const addToCartHandler = async (item) => {
  //   const existItem = cartItems.find((x) => x._id === product._id);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  //   const { data } = await axios.get(`/api/products/${item._id}`);
  //   if (data.countInStock < quantity) {
  //     window.alert("Sorry. Product is out of stock");
  //     return;
  //   }
  //   ctxDispatch({
  //     type: "CART_ADD_ITEM",
  //     payload: { ...item, quantity },
  //   });
  // };

  return (
    <Link className='product-link' to={`/product/${product.slug}`}>
      <img
        src={product.image}
        className='product-card-image'
        alt={product.name}
      />
      <h1 className='product-card-name'>{product.name}</h1>
      <h3>${product.price}</h3>
      {/* {product.countInStock === 0 ? (
        <Button variant='light' disabled>
          Out of stock
        </Button>
      ) : (
        <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
      )} */}
    </Link>
  );
}
export default Product;
