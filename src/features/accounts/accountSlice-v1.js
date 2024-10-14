const initialStateAccount = { balance: 0, loan: 0, loanPurpose: "", currency: "USD", isLoading: false };

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      if (action.payload > 0)
        return { ...state, balance: state.balance + action.payload, isLoading: false };
      break;
    case "account/withdraw":
      if (state.balance >= action.payLoan) return { ...state, balance: state.balance - action.payload };
      break;
    case "account/requestLoan":
      if (state.loan > 0) return state; // if we don't return any state then state will be 'undefined'
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/converting":
      return { ...state, isLoading: action.payload };
    case "account/payLoan":
      return { ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan };
    default:
      return state;
  }
}

// fetch( `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch) {
    try {
      dispatch({ type: "account/converting", payload: true });
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const convertedCurrency = await response.json();
      console.log(convertedCurrency);
      if (convertedCurrency?.message === "not found") throw new Error("Invalid Currency!");
      dispatch({ type: "account/deposit", payload: convertedCurrency.rates.USD });
    } catch (error) {
      console.log(error);
    }
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
