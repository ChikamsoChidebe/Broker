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
        <div className="login-bg" style={{ minHeight: "100vh", padding: "40px 20px", fontFamily: "'Georgia', serif", color: "var(--gradient-text)", background: "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))" }}>
            <section style={{ maxWidth: 600, margin: "0 auto", background: "rgba(155, 89, 182, 0.15)", borderRadius: 12, padding: 32, boxShadow: "0 4px 24px rgba(155, 89, 182, 0.3)" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: 24, color: "var(--gradient-accent)", textAlign: "center" }}>Deposit Funds</h1>
                {submitted ? (
                    <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
                        Thank you! Your deposit request of <strong>${amount}</strong> via <strong>{paymentMethod.replace('_', ' ')}</strong> is being processed.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="amount" style={{ display: "block", marginBottom: 8, fontWeight: "600", color: "var(--gradient-accent)" }}>Amount</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="1"
                            required
                            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1.5px solid var(--gradient-accent)", fontSize: "1rem", marginBottom: 20, background: "rgba(155, 89, 182, 0.1)", color: "var(--gradient-text)" }}
                        />

                        <label htmlFor="paymentMethod" style={{ display: "block", marginBottom: 8, fontWeight: "600", color: "var(--gradient-accent)" }}>Payment Method</label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1.5px solid var(--gradient-accent)", fontSize: "1rem", marginBottom: 20, background: "rgba(155, 89, 182, 0.1)", color: "var(--gradient-text)" }}
                        >
                            <option value="credit_card">Credit Card</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="paypal">PayPal</option>
                            <option value="crypto">Cryptocurrency</option>
                        </select>

                        <button
                            type="submit"
                            style={{
                                background: "linear-gradient(90deg, var(--gradient-accent) 0%, var(--gradient-end) 100%)",
                                color: "var(--gradient-text)",
                                border: "none",
                                borderRadius: 6,
                                padding: "12px 24px",
                                fontSize: "1.1rem",
                                fontWeight: "700",
                                cursor: "pointer",
                                width: "100%",
                                transition: "background 0.3s ease",
                            }}
                            onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, var(--gradient-end) 0%, var(--gradient-accent) 100%)"}
                            onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, var(--gradient-accent) 0%, var(--gradient-end) 100%)"}
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
