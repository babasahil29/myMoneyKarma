
App.js
import React, { useState } from 'react'; import axios from 'axios';
import './App.css'; // Import your CSS file

const App = () => {
const [income, setIncome] = useState(''); const [expenses, setExpenses] = useState(''); const [savings, setSavings] = useState(''); const [advice, setAdvice] = useState('');

const handleSubmit = async (e) => { e.preventDefault(); // Prevent default form submission

try {
const response = await axios.post('http://localhost:5004/api/financial-advice', { income: Number(income),
expenses: Number(expenses), savings: Number(savings),
});
setAdvice(response.data.advice); // Set advice from response
} catch (error) {
console.error('Error submitting data:', error); setAdvice('Error submitting data. Please try again.');
}
};

return (
<div className="app-container">
<h1 className="app-title">Financial Advice Dashboard</h1>
<form onSubmit={handleSubmit} className="form">
<div className="form-group">
<label>Income: </label>
<input
className="input-field" type="number" value={income}
onChange={(e) => setIncome(e.target.value)} required
/>
</div>
<div className="form-group">
<label>Expenses: </label>
<input
className="input-field" type="number" value={expenses}
onChange={(e) => setExpenses(e.target.value)} required
/>
</div>
<div className="form-group">
<label>Savings: </label>
 
<input
className="input-field" type="number" value={savings}
onChange={(e) => setSavings(e.target.value)} required
/>
</div>
<button className="submit-button" type="submit">Get Advice</button>
</form>
{advice && <div className="advice-box"><h2>Advice:</h2><p>{advice}</p></div>}
</div>
);
};

export default App;
