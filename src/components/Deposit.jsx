import React, { useState } from 'react';

const Deposit = () => {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate deposit processing
        alert(`Depositing $${amount} via ${paymentMethod.replace('_', ' ')}`);
        setSubmitted(true);
    };

    return (
        <div className="login-bg" style={{ minHeight: "100vh", padding: "40px 20px", fontFamily: "'Georgia', serif", color: "#f0f0f0", background: "linear-gradient(135deg, #4b6cb7, #182848)" }}>
            <section style={{ maxWidth: 600, margin: "0 auto", background: "rgba(255, 179, 71, 0.15)", borderRadius: 12, padding: 32, boxShadow: "0 4px 24px rgba(255, 179, 71, 0.3)" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: 24, color: "#ffb347", textAlign: "center" }}>Deposit Funds</h1>
                {submitted ? (
                    <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
                        Thank you! Your deposit request of <strong>${amount}</strong> via <strong>{paymentMethod.replace('_', ' ')}</strong> is being processed.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="amount" style={{ display: "block", marginBottom: 8, fontWeight: "600" }}>Amount</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="1"
                            required
                            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1.5px solid #ffb347", fontSize: "1rem", marginBottom: 20, background: "rgba(255, 179, 71, 0.1)", color: "#f0f0f0" }}
                        />

                        <label htmlFor="paymentMethod" style={{ display: "block", marginBottom: 8, fontWeight: "600" }}>Payment Method</label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1.5px solid #ffb347", fontSize: "1rem", marginBottom: 20, background: "rgba(255, 179, 71, 0.1)", color: "#f0f0f0" }}
                        >
                            <option value="credit_card">Credit Card</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="paypal">PayPal</option>
                            <option value="crypto">Cryptocurrency</option>
                        </select>

                        <button
                            type="submit"
                            style={{
                                background: "linear-gradient(90deg, #ffb347 0%, #182848 100%)",
                                color: "#f0f0f0",
                                border: "none",
                                borderRadius: 6,
                                padding: "12px 24px",
                                fontSize: "1.1rem",
                                fontWeight: "700",
                                cursor: "pointer",
                                width: "100%",
                                transition: "background 0.3s ease",
                            }}
                            onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #182848 0%, #ffb347 100%)"}
                            onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #ffb347 0%, #182848 100%)"}
                        >
                            Deposit
                        </button>
                    </form>
                )}
            </section>
        </div>
    );
};

export default Deposit;
