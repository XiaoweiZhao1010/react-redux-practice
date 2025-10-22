import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://udemy-project-77b1c-default-rtdb.firebaseio.com/cart.json"
      );
      if (!res.ok) {
        throw new Error("Fetching cart data failed.");
      }
      const data = await res.json();
      return data;
    };
    try {
      const data = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Getting cart data failed!",
        })
      );
      return;
    }
  };
};
export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    const sendRequest = async () => {
      const res = await fetch(
        "https://udemy-project-77b1c-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartData.items,
            totalQuantity: cartData.totalQuantity,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
      return;
    }
  };
};
