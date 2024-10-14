import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});
export default store;

/**
 * the redux-toolkit will do three things automatically for us. It will combineReducers, applyMiddleware with thunk and composeWithDevTools.
 *  the redux-toolkit will do there things automatically for us. It will combineReducers, applyMiddleware with thuni and composeWitDevTools.
 * the redux-toolkit will do there things automatically for us. It will compbineRducers, applyMiddleware with thunk and composeWith
 */
