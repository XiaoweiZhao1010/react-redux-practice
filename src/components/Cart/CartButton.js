import classes from "./CartButton.module.css";
import { useSelector, useDispatch } from "react-redux";
import uiSlice from "../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => {
    return state.cart.totalQuantity;
  });
  const toggleCartHandler = () => {
    dispatch(uiSlice.actions.toggle());
  };
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
