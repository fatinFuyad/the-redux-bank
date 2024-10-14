import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    isLoading,
  } = useSelector((store) => store.account);
  const dispatch = useDispatch();

  function handleDeposit() {
    if (!depositAmount) return;
    dispatch(deposit(Number(depositAmount), currency));
    setDepositAmount("");
    // setCurrency(""); // if this is empty then next time while depositing dollar it will be an empty "". So it will make request ot the server.
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdraw(Number(withdrawalAmount)));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) =>
              setDepositAmount(
                !e.target.value.slice(0, 1) ? "" : +e.target.value > 0 ? +e.target.value : ""
              )
            }
          />
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">US Dollar $</option>
            <option value="EUR">Euro €</option>
            <option value="GBP">British Pound £</option>
            <option value="JPY">Japanese Yen ¥</option>
            <option value="AUD">Australian Dollar $</option>
            <option value="CAD">Canadian Dollar $</option>
            <option value="CHF">Swiss Franc ₣</option>
            <option value="CNY">Chinese Yuan ¥</option>
          </select>
          <button disabled={isLoading ? true : false} onClick={handleDeposit}>
            {isLoading ? "converting..." : "Deposit"}{" "}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(!e.target.value.slice(0, 1) ? "" : +e.target.value)}
          />
          <button onClick={handleWithdrawal}>Withdraw</button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(!e.target.value.slice(0, 1) ? "" : +e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        <div>
          <p>Pay back</p>
          {currentLoan > 0 ? (
            <>
              <strong>
                ${currentLoan} ({currentLoanPurpose})
              </strong>
              <button onClick={handlePayLoan}>Pay loan</button>
            </>
          ) : (
            <strong>You have no loan yet.</strong>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
