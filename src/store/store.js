import { configureStore } from "@reduxjs/toolkit";
import { apiSlice, util } from "../features/apiSlice";
import authReducer from "../features/authSlice";

const resetApiOnLogout = (store) => (next) => (action) => {
  if (action.type === 'auth/clearState') {
    store.dispatch(util.resetApiState());
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(resetApiOnLogout),
});

export default store;
