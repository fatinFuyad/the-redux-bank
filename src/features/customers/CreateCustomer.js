import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const dispatch = useDispatch(); // previously we called the dispatch function on the store but now we don't do that rather use the hook that has access to the dispatch function of the store.
  function handleClick() {
    if (!fullName || !nationalID) return;
    dispatch(createCustomer(fullName, nationalID));
  }
  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs customer-inputs">
        <div>
          <label>Customer full name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <label>National ID</label>
          <input value={nationalID} onChange={(e) => setNationalID(e.target.value)} />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
