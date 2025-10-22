import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items?.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;

      if (!existingItem) {
        state.items?.push({
          title: newItem.title,
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          total: newItem.price,
        });
        console.log("Added new item to cart");
      } else {
        existingItem.quantity++;
        existingItem.total += newItem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      console.log(id);
      const existingItem = state.items.find((item) => item.id === id);
      console.log(existingItem);
      if (!existingItem) {
        return;
      }
      state.totalQuantity--;
      state.changed = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.total -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
