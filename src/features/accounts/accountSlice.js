import { createSlice } from "@reduxjs/toolkit";
const initialState = { balance: 0, loan: 0, loanPurpose: "", currency: "USD", isLoading: false };

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      if (action.payload <= 0) return;
      state.balance += action.payload;
    },

    withdraw(state, action) {
      if (state.balance < action.payload) return;
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0 || action.payload.amount < 0) return;
        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state, action) {
      state.balance = state.balance - state.loan;
      state.loanPurpose = "";
      state.loan = 0;
    },

    convert(state, action) {
      state.isLoading = action.payload;
    },
  },
});

console.log(accountSlice);
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch) {
    try {
      dispatch({ type: "account/convert", payload: true });
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      console.log(response);
      const convertedCurrency = await response.json();
      console.log(convertedCurrency);
      if (convertedCurrency?.message === "not found") throw new Error("Invalid Currency!");
      dispatch({ type: "account/deposit", payload: convertedCurrency.rates.USD });
    } catch (error) {
      console.log(error);
      if (error.message === "Failed to fetch") alert("Network Error. Try again!");
    } finally {
      dispatch({ type: "account/convert", payload: false });
    }
  };
}
export default accountSlice.reducer;
