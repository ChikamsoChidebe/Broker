import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, just simulate submission
        setSubmitted(true);
    };

    return (
        <div className="login-bg" style={{ minHeight: "100vh", padding: "40px 20px", fontFamily: "'Georgia', serif", color: "#4b3b1b" }}>
            <section style={{ maxWidth: 700, margin: "0 auto", background: "#fff8e1", borderRadius: 12, padding: 32, boxShadow: "0 4px 24px rgba(122, 92, 30, 0.2)" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: 24, color: "#5a3e1b" }}>Contact Us</h1>
                {submitted ? (
                    <p style={{ fontSize: "1.1rem" }}>Thank you for your message! We will get back to you shortly.</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor="name" style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d6c68a", fontSize: "1rem" }}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor="email" style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d6c68a", fontSize: "1rem" }}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor="message" style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #d6c68a", fontSize: "1rem" }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: "#7a5c1e",
                                color: "#f9f6f1",
                                padding: "10px 22px",
                                border: "none",
                                borderRadius: 6,
                                fontSize: "1rem",
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "background 0.2s",
                            }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = "#a67c00"}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = "#7a5c1e"}
                        >
                            Send Message
                        </button>
                    </form>
                )}
            </section>
        </div>
    );
};

export default Contact;
