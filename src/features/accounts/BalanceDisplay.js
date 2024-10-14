import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

// legact way of writing redux code for getting state property

// mapStateToProps is a function that is passed as an argument to the connect function and it will extract the balance value from the store and return it.
// the connect function will the take the returned value and will return another function that will take the BalanceDisplay function as arguemnt and will finally return a new BalanceDisplay component that will be called with the balance prop and it will be finally exported

function mapStateToProps(state) {
  return { balance: state.account.balance };
}

// connect takes a function as argument that returns the desired object and then it will return another function
export default connect(mapStateToProps)(BalanceDisplay);
