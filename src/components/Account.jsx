import React, { useState, useEffect} from 'react';
import { fetchUserAccount, updateAccountDetails } from '../utils/api';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/account.css';

const Account = () => {
    const { user } = useAuth();

    const [accountDetails, setAccountDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [kycVerified, setKycVerified] = useState(false);
    const [selectedLang, setSelectedLang] = useState("English");
    const [showAllTx, setShowAllTx] = useState(false);

    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                const data = await fetchUserAccount();
                setAccountDetails(data);
                setFormData(data);
                setKycVerified(data.kycVerified || false);
                setSelectedLang(data.language || "English");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccountDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAccountDetails(formData);
            setAccountDetails(formData);
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleKyc = () => {
        setKycVerified(true);
        alert("KYC verification completed!");
    };

    const handleDeposit = () => {
        alert("Redirecting to deposit page...");
    };

    const handleBuyPlan = (plan) => {
        alert(`Purchasing ${plan.name}...`);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="glowing-spinner"></div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const languages = Array.isArray(accountDetails.languages) ? accountDetails.languages : ["English", "Spanish", "French", "German", "Chinese"];
    const investmentPlans = Array.isArray(accountDetails.investmentPlans) ? accountDetails.investmentPlans : [];
    const allPlans = Array.isArray(accountDetails.allPlans) ? accountDetails.allPlans : [];
    const transactions = Array.isArray(accountDetails.transactions) ? accountDetails.transactions : [];
    const referrals = Array.isArray(accountDetails.referrals) ? accountDetails.referrals : [];

    // Add some example money values if not present
    const balance = accountDetails.balance ?? 12500;
    const profit = accountDetails.profit ?? 3200;
    const bonus = accountDetails.bonus ?? 150;
    const referralBonus = accountDetails.referralBonus ?? 75;
    const totalDeposit = accountDetails.totalDeposit ?? 20000;
    const totalWithdrawal = accountDetails.totalWithdrawal ?? 7500;

    return (
        <div className="login-bg" style={{ minHeight: "100vh", flexDirection: "column" }}>
            {/* Welcome & Account Setup */}
            <section className="dashboard-section animate-fadein" style={{ maxWidth: 900, margin: "40px auto 32px auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                    <img
                        src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=200&q=80"
                        alt="User"
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #2b6cb0",
                            boxShadow: "0 2px 12px rgba(44,82,130,0.10)",
                        }}
                    />
                    <div>
                        <h2 className="dashboard-section-title" style={{ fontSize: "1.5rem", marginBottom: 4 }}>
                            Welcome, {
                                user && (user.fullName || user.name)
                                    ? (user.fullName || user.name)
                                    : user && user.email
                                        ? (() => {
                                            const namePart = user.email.replace(/@gmail\.com.*/i, '').replace(/[^a-zA-Z0-9 ]/g, ' ').trim();
                                            const firstName = namePart.split(' ')[0];
                                            return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
                                        })()
                                        : "User"
                            }
                        </h2>
                        <div style={{ color: "#2b6cb0", fontWeight: 600, fontSize: "1.1rem" }}>
                            {user && user.email ? user.email : ""}
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: 24, display: "flex", gap: 24, flexWrap: "wrap" }}>
                    {!kycVerified && (
                        <div className="account-kyc-prompt animate-pop">
                            <span role="img" aria-label="shield" style={{ fontSize: 24 }}>🛡️</span>
                            <div>
                                <b>KYC Verification Required</b>
                                <div style={{ fontSize: "0.98rem", color: "#444" }}>
                                    Please verify your identity for security and compliance.
                                </div>
                                <button className="login-btn" style={{ marginTop: 8 }} onClick={handleKyc}>
                                    Complete KYC
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="account-deposit-prompt animate-pop">
                        <span role="img" aria-label="deposit" style={{ fontSize: 24 }}>💳</span>
                        <div>
                            <b>Fund Your Account</b>
                            <div style={{ fontSize: "0.98rem", color: "#444" }}>
                                Deposit funds to start trading and investing.
                            </div>
                            <Link to="/deposit" style={{ textDecoration: "none" }}>
                            <button className="login-btn" style={{ marginTop: 8 }} onClick={handleDeposit}>
                                Deposit Now
                            </button>
                            </Link>
                        </div>
                    </div>
                    <div className="account-lang-prompt animate-pop">
                        <span role="img" aria-label="language" style={{ fontSize: 24 }}>🌐</span>
                        <div>
                            <b>Language</b>
                            <div style={{ fontSize: "0.98rem", color: "#444" }}>
                                Choose your preferred language:
                            </div>
                            <select
                                className="account-lang-select"
                                value={selectedLang}
                                onChange={e => setSelectedLang(e.target.value)}
                                style={{ marginTop: 8, padding: 6, borderRadius: 6, border: "1px solid #2b6cb0" }}
                            >
                                {languages.map(lang => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Account Summary */}
            <section className="dashboard-section animate-fadein" style={{ maxWidth: 900, margin: "0 auto 32px auto" }}>
                <h2 className="dashboard-section-title" style={{ fontSize: "1.3rem" }}>Account Summary</h2>
                <div className="account-summary-cards">
                    <div className="account-summary-card">
                        <span className="account-summary-label">Balance</span>
                        <span className="account-summary-value">${balance.toLocaleString()}</span>
                    </div>
                    <div className="account-summary-card">
                        <span className="account-summary-label">Total Profit</span>
                        <span className="account-summary-value up">+${profit.toLocaleString()}</span>
                    </div>
                    <div className="account-summary-card">
                        <span className="account-summary-label">Bonus</span>
                        <span className="account-summary-value">${bonus.toLocaleString()}</span>
                    </div>
                    <div className="account-summary-card">
                        <span className="account-summary-label">Referral Bonus</span>
                        <span className="account-summary-value">${referralBonus.toLocaleString()}</span>
                    </div>
                    <div className="account-summary-card">
                        <span className="account-summary-label">Total Deposit</span>
                        <span className="account-summary-value">${totalDeposit.toLocaleString()}</span>
                    </div>
                    <div className="account-summary-card">
                        <span className="account-summary-label">Total Withdrawal</span>
                        <span className="account-summary-value">${totalWithdrawal.toLocaleString()}</span>
                    </div>
                </div>
            </section>

            {/* Investment Plans */}
            <section className="dashboard-section animate-fadein" style={{ maxWidth: 900, margin: "0 auto 32px auto" }}>
                <h2 className="dashboard-section-title" style={{ fontSize: "1.3rem" }}>Investment Plans</h2>
                <div className="account-plans-active">
                    <h3 style={{ fontSize: "1.1rem", color: "#2b6cb0", marginBottom: 8 }}>Active Plans</h3>
                    {investmentPlans.filter(p => p.status === "Active").length === 0 && (
                        <div style={{ color: "#e53e3e", marginBottom: 12 }}>No active plans.</div>
                    )}
                    {investmentPlans.filter(p => p.status === "Active").map((plan, idx) => (
                        <div className="account-plan-card animate-pop" key={idx}>
                            <div>
                                <b>{plan.name}</b>
                                <div style={{ fontSize: "0.97rem", color: "#444" }}>
                                    Invested: <b>${plan.invested}</b> | Returns: <b>${plan.returns}</b>
                                </div>
                                <div style={{ fontSize: "0.95rem", color: "#718096" }}>
                                    {plan.start} to {plan.end}
                                </div>
                            </div>
                            <div className="account-plan-progress">
                                <div className="account-plan-progress-bar" style={{ width: `${plan.progress}%` }}></div>
                            </div>
                            <div style={{ fontSize: "0.95rem", color: "#38a169" }}>{plan.progress}% Complete</div>
                        </div>
                    ))}
                </div>
                <div className="account-plans-list">
                    <h3 style={{ fontSize: "1.1rem", color: "#2b6cb0", margin: "18px 0 8px 0" }}>Available Plans</h3>
                    <div className="account-plans-cards">
                        {allPlans.map((plan, idx) => (
                            <div className="account-plan-card animate-pop" key={idx}>
                                <div>
                                    <b>{plan.name}</b>
                                    <div style={{ fontSize: "0.97rem", color: "#444" }}>{plan.desc}</div>
                                    <div style={{ fontSize: "0.95rem", color: "#718096" }}>
                                        Min: ${plan.min} | Max: ${plan.max} | Duration: {plan.duration} | Rate: {plan.rate}
                                    </div>
                                </div>
                                <button className="login-btn" style={{ marginTop: 10 }} onClick={() => handleBuyPlan(plan)}>
                                    Buy Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Transaction History */}
            <section className="dashboard-section animate-fadein" style={{ maxWidth: 900, margin: "0 auto 32px auto" }}>
                <h2 className="dashboard-section-title" style={{ fontSize: "1.3rem" }}>Transaction History</h2>
                <table className="account-tx-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(showAllTx ? transactions : transactions.slice(0, 5)).map((tx, idx) => (
                            <tr key={idx}>
                                <td>{tx.date}</td>
                                <td>
                                    <span className={`account-tx-type ${tx.type}`}>{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</span>
                                </td>
                                <td>${tx.amount.toLocaleString()}</td>
                                <td>
                                    <span className={`account-tx-status ${tx.status.toLowerCase()}`}>{tx.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!showAllTx && transactions.length > 5 && (
                    <button className="login-btn" style={{ marginTop: 12 }} onClick={() => setShowAllTx(true)}>
                        View All Transactions
                    </button>
                )}
            </section>

            {/* Referral Program */}
            <section className="dashboard-section animate-fadein" style={{ maxWidth: 900, margin: "0 auto 32px auto" }}>
                <h2 className="dashboard-section-title" style={{ fontSize: "1.3rem" }}>Referral Program</h2>
                <div className="account-referral-section">
                    <div className="account-referral-link-card animate-pop">
                        <span role="img" aria-label="link" style={{ fontSize: 22 }}>🔗</span>
                        <div>
                            <b>Your Referral Link</b>
                            <div style={{ fontSize: "0.97rem", color: "#444" }}>{accountDetails.referralLink}</div>
                            <button
                                className="login-btn"
                                style={{ marginTop: 8 }}
                                onClick={() => {
                                    navigator.clipboard.writeText(accountDetails.referralLink);
                                    alert("Referral link copied!");
                                }}
                            >
                                Copy Link
                            </button>
                        </div>
                    </div>
                    <div className="account-referral-earnings-card animate-pop">
                        <span role="img" aria-label="gift" style={{ fontSize: 22 }}>🎁</span>
                        <div>
                            <b>Referral Earnings</b>
                            <div style={{ fontSize: "0.97rem", color: "#444", marginTop: 8 }}>
                                Total: <b>${accountDetails.referralBonus}</b>
                            </div>
                            <div style={{ fontSize: "0.97rem", color: "#444", marginTop: 8 }}>
                                <b>Referrals:</b>
                                <ul style={{ margin: 0, paddingLeft: 18 }}>
                                    {referrals.map((ref, idx) => (
                                        <li key={idx}>
                                            {ref.name} (joined {ref.joined}) - <span style={{ color: "#38a169" }}>+${ref.bonus}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* UI & Accessibility */}
            <section className="dashboard-section animate-fadein" style={{ maxWidth: 900, margin: "0 auto 32px auto" }}>
                <h2 className="dashboard-section-title" style={{ fontSize: "1.3rem" }}>User Interface & Accessibility</h2>
                <ul className="account-ui-list">
                    <li>
                        <span role="img" aria-label="navigation">🧭</span> Simple Navigation – Easy-to-use dashboard with clear sections.
                    </li>
                    <li>
                        <span role="img" aria-label="mobile">📱</span> Mobile-Friendly Design – Optimized for seamless access on different devices.
                    </li>
                    <li>
                        <span role="img" aria-label="lock">🔒</span> Secure Transactions – Ensures encrypted deposits and withdrawals.
                    </li>
                </ul>
            </section>

            {/* Footer */}
            <footer className="classical-footer">
                <div className="classical-footer-content">
                    <span>© {new Date().getFullYear()} Crodex Classical Brokerage</span>
                    <span>
                        <a href="/features" className="classical-footer-link">Features</a> | 
                        <a href="/account" className="classical-footer-link">Account</a> | 
                        <a href="/dashboard" className="classical-footer-link">Dashboard</a> | 
                        <a href="/portfolio" className="classical-footer-link">Portfolio</a>
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default Account;
