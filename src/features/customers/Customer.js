import { useSelector } from "react-redux";

function Customer() {
  const customerName = useSelector((store) => store.customer.fullName);
  return (
    <div className="welcome-text">
      <h2>👋 Welcome, {customerName}</h2>
    </div>
  );
}

export default Customer;
