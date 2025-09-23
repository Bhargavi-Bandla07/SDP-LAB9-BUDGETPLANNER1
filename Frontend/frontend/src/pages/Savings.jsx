import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Savings() {
  const [savingsList, setSavingsList] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE = import.meta.env.VITE_API_URL || "http://localhost:2005";
  const API = `${BASE}/api/savings`;

  // inline axios
  const axiosClient = axios.create({
    baseURL: BASE,
    headers: { "Content-Type": "application/json" },
  });
  axiosClient.interceptors.request.use((cfg) => {
    const token = localStorage.getItem("token");
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
  });

  useEffect(() => {
    loadSavings();
    // eslint-disable-next-line
  }, []);

  async function loadSavings() {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get("/api/savings"); // relative to baseURL
      console.debug("loadSavings response:", res.status, res.data);
      setSavingsList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch savings:", err);
      const msg = err?.response?.data ?? err?.response?.statusText ?? err?.message;
      setError("Load error: " + (typeof msg === "object" ? JSON.stringify(msg) : msg));
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setGoalName("");
    setTargetAmount("");
    setSavedAmount("");
    setEditId(null);
    setError(null);
  }

  async function handleAddOrUpdate() {
    if (!goalName || !targetAmount) {
      setError("Please provide a goal name and target amount.");
      return;
    }
    setError(null);

    const payload = {
      goalName: goalName.trim(),
      targetAmount: parseFloat(targetAmount),
      savedAmount: parseFloat(savedAmount) || 0,
    };

    try {
      if (editId) {
        const res = await axiosClient.put(`/api/savings/${editId}`, payload);
        console.debug("update response:", res.status, res.data);
        setSavingsList((prev) => prev.map((s) => (s.id === editId ? res.data : s)));
        setEditId(null);
      } else {
        const res = await axiosClient.post("/api/savings", payload);
        console.debug("create response:", res.status, res.data);
        setSavingsList((prev) => [...prev, res.data]);
      }
      resetForm();
    } catch (err) {
      console.error("Add/Update failed:", err);
      // show the actual server response if any
      const serverMsg = err?.response?.data ?? err?.response?.statusText ?? err?.message;
      setError("Add/Update error: " + (typeof serverMsg === "object" ? JSON.stringify(serverMsg) : serverMsg));
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this savings goal?")) return;
    try {
      const res = await axiosClient.delete(`/api/savings/${id}`);
      console.debug("delete response:", res.status);
      setSavingsList((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      const serverMsg = err?.response?.data ?? err?.response?.statusText ?? err?.message;
      setError("Delete error: " + (typeof serverMsg === "object" ? JSON.stringify(serverMsg) : serverMsg));
    }
  }

  async function addToSaved(id, amountToAdd) {
    if (isNaN(amountToAdd) || amountToAdd <= 0) return;
    try {
      const target = savingsList.find((s) => s.id === id);
      if (!target) return;
      const newSaved = (target.savedAmount || 0) + parseFloat(amountToAdd);
      const payload = {
        goalName: target.goalName,
        targetAmount: target.targetAmount,
        savedAmount: newSaved,
      };
      const res = await axiosClient.put(`/api/savings/${id}`, payload);
      console.debug("addToSaved response:", res.status, res.data);
      setSavingsList((prev) => prev.map((s) => (s.id === id ? res.data : s)));
    } catch (err) {
      console.error("Add to saved failed:", err);
      const serverMsg = err?.response?.data ?? err?.response?.statusText ?? err?.message;
      setError("Add-money error: " + (typeof serverMsg === "object" ? JSON.stringify(serverMsg) : serverMsg));
    }
  }

  const totalTarget = savingsList.reduce((sum, s) => sum + (s.targetAmount || 0), 0);
  const totalSaved = savingsList.reduce((sum, s) => sum + (s.savedAmount || 0), 0);

  return (
    <div style={{ maxWidth: 980, margin: "24px auto", padding: 12 }}>
      <h1>Savings Goals</h1>
      {error && <div style={{ color: "#b00020", marginBottom: 12 }}>{error}</div>}

      <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 8, background: "#fafafa", marginBottom: 16 }}>
        <h2>{editId ? "Edit Goal" : "Add New Goal"}</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input value={goalName} onChange={(e) => setGoalName(e.target.value)} placeholder="Goal name" />
          <input value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} placeholder="Target amount" type="number" />
          <input value={savedAmount} onChange={(e) => setSavedAmount(e.target.value)} placeholder="Saved amount" type="number" />
        </div>
        <div>
          <button onClick={handleAddOrUpdate}>{editId ? "Update Goal" : "Add Goal"}</button>
          {editId && <button onClick={resetForm} style={{ marginLeft: 8 }}>Cancel</button>}
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <strong>Total target:</strong> ₹ {totalTarget.toFixed(2)} &nbsp; <strong>Total saved:</strong> ₹ {totalSaved.toFixed(2)}
      </div>

      <div>
        {loading ? <div>Loading...</div> : savingsList.length === 0 ? <div>No goals yet.</div> :
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr><th>Goal</th><th>Target</th><th>Saved</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {savingsList.map((s) => (
                <tr key={s.id}>
                  <td>{s.goalName}</td>
                  <td>₹ {Number(s.targetAmount || 0).toFixed(2)}</td>
                  <td>₹ {Number(s.savedAmount || 0).toFixed(2)}</td>
                  <td>
                    <button onClick={() => { setGoalName(s.goalName); setTargetAmount(String(s.targetAmount)); setSavedAmount(String(s.savedAmount)); setEditId(s.id); }}>Edit</button>
                    <button onClick={() => handleDelete(s.id)} style={{ marginLeft: 8 }}>Delete</button>
                    <button onClick={() => { const val = prompt("Add amount:"); const n = parseFloat(val); if (!isNaN(n) && n>0) addToSaved(s.id, n); }} style={{ marginLeft: 8 }}>+ Add</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
}
