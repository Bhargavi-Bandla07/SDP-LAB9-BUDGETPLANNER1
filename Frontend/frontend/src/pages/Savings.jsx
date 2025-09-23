import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Savings.css";

export default function Savings() {
  const [savingsList, setSavingsList] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [editId, setEditId] = useState(null); // for update
  const [incomeTotal, setIncomeTotal] = useState(0); // total income from DB

  const API_URL = `${import.meta.env.VITE_API_URL}/api/savings`;
  const INCOME_URL = `${import.meta.env.VITE_API_URL}/api/incomes`;

  // Fetch total income
  const fetchIncome = async () => {
    try {
      const res = await axios.get(INCOME_URL);
      const totalIncome = res.data.reduce((acc, item) => acc + item.amount, 0);
      setIncomeTotal(totalIncome);
    } catch (err) {
      console.error("Error fetching income:", err);
    }
  };

  // Fetch savings from backend
  const fetchSavings = async () => {
    try {
      const res = await axios.get(API_URL);
      const updatedSavings = res.data.map((s) => ({
        ...s,
        currentAmount: s.currentAmount !== undefined ? s.currentAmount : incomeTotal,
      }));
      setSavingsList(updatedSavings);
    } catch (err) {
      console.error("Error fetching savings:", err);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  useEffect(() => {
    if (incomeTotal > 0) fetchSavings();
  }, [incomeTotal]);

  // Add or update savings goal
  const handleAddOrUpdate = async () => {
    if (!goalName || !targetAmount) return;

    const payload = {
      goalName,
      targetAmount: parseFloat(targetAmount),
      currentAmount: incomeTotal,
    };

    try {
      if (editId) {
        // Update existing
        const saving = savingsList.find((s) => s.id === editId);
        await axios.put(`${API_URL}/${editId}`, {
          ...saving,
          goalName: goalName,
          targetAmount: parseFloat(targetAmount),
        });
        setEditId(null);
      } else {
        // Add new
        await axios.post(API_URL, payload);
      }
      setGoalName("");
      setTargetAmount("");
      fetchSavings();
    } catch (err) {
      console.error("Error saving goal:", err);
    }
  };

  // Prepare goal for editing
  const handleEdit = (saving) => {
    setGoalName(saving.goalName);
    setTargetAmount(saving.targetAmount);
    setEditId(saving.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Increment currentAmount
  const incrementCurrentAmount = async (id, extraAmount) => {
    try {
      const saving = savingsList.find((s) => s.id === id);
      const updated = { ...saving, currentAmount: saving.currentAmount + extraAmount };
      await axios.put(`${API_URL}/${id}`, updated);
      fetchSavings();
    } catch (err) {
      console.error("Error updating current amount:", err);
    }
  };

  // Delete savings goal
  const deleteSavings = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchSavings();
    } catch (err) {
      console.error("Error deleting savings:", err);
    }
  };

  return (
    <div className="savings-container">
      <h2>💸 Savings Goals</h2>

      {/* Input Form */}
      <div className="savings-form">
        <input
          type="text"
          placeholder="Goal Name"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Target Amount (₹)"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editId ? "Update Goal" : "+ Add Goal"}
        </button>
      </div>

      {/* Savings Table */}
      <table className="savings-table">
        <thead>
          <tr>
            <th>Goal</th>
            <th>Target (₹)</th>
            <th>Current (₹)</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {savingsList.map((s) => (
            <tr key={s.id}>
              <td>{s.goalName}</td>
              <td>₹ {s.targetAmount}</td>
              <td>₹ {s.currentAmount}</td>
              <td>
                <progress value={s.currentAmount} max={s.targetAmount}></progress>
              </td>
              <td>
                <button onClick={() => incrementCurrentAmount(s.id, 1000)}>+ ₹1000</button>
                <button onClick={() => handleEdit(s)}>✏️ Edit</button>
                <button onClick={() => deleteSavings(s.id)} className="delete-btn">❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
