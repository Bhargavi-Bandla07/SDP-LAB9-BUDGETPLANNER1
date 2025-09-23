import React, { useState } from "react";

export default function BudgetPlanner() {
  const [budget] = useState(5000);
  const [expenses, setExpenses] = useState(0);

  return (
    <div className="page-container">
      <Alerts budget={budget} expenses={expenses} />

      <p><b>Budget:</b> ₹{budget}</p>
      <p><b>Expenses:</b> ₹{expenses}</p>
      <button onClick={() => setExpenses(expenses + 1000)}>Add ₹1000 Expense</button>
    </div>
  );
}
