import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
  const customerName = useSelector((store) => store.customer.fullName);
  return (
    <div>
      <Header />
      {!customerName ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>&copy; Copyright {new Date().getFullYear()} by developer </p>
    </footer>
  );
}

export default App;
