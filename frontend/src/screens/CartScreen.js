import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div className='cart'>
      <Helmet>
        <title>Your Cart</title>
      </Helmet>
      <h1>Your Cart</h1>
      <div>
        <div className='cart-holder'>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to='/'>Go Shopping</Link>
            </MessageBox>
          ) : (
            <div className='cart-list'>
              {cartItems.map((item) => (
                <div
                  to={`/product/${item.slug}`}
                  key={item._id}
                  className='cart-item-holder'
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className='cart-image-thumbnail'
                  ></img>{" "}
                  <div className='cart-item-info'>
                    <Link
                      to={`/product/${item.slug}`}
                      className='cart-item-name'
                    >
                      {item.name}
                    </Link>
                    <div className='cart-quantities'>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant='light'
                        disabled={item.quantity === 1}
                      >
                        <i className='fas fa-minus-circle'></i>
                      </Button>{" "}
                      <span className='cart-quantity-total'>
                        {item.quantity}
                      </span>{" "}
                      <Button
                        variant='light'
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className='fas fa-plus-circle'></i>
                      </Button>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant='light'
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </div>
                  </div>
                  <div className='cart-item-price'>
                    <h4>Price:</h4>
                    <h3>${item.price}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className='totals'>
            <h3>
              Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) :
              ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
            </h3>
            <button
              className='checkout-button'
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
