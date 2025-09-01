import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import BudgetDonutChart from '../components/budgetDonutChart';
import TransactionUpload from '../components/transactionHistory';

function HomePageLoggedIn() {
    const { user } = useAuth();
    const [latestRec, setLatestRec] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchLatest = async () => {
            if (!user) return;
            try {
                const q = query(
                    collection(db, 'budgetSurveyResponses'),
                    where('user', '==', user.email),
                    orderBy('timestamp', 'desc'),
                    limit(1)
                );
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    setLatestRec(snapshot.docs[0].data().recommendation);
                }
            } catch (err) {
                console.error("Error fetching latest recommendation:", err);
            }
        };
        fetchLatest();
    }, [user]);

    return (
        <div >
            <div>
                <div >

                    {latestRec === null ? (
                        <div>
                            <h2>Welcome back {user ? user.displayName : "User"}!</h2>
                            <p>
                                Continue your journey with Student Finance Help. Explore new features and tools tailored for you.
                            </p>
                            <div>
                                <Link to="/budgeting-tool" >
                                    📊 Budget Tool
                                </Link>
                                <Link to="/tax-help">
                                    📄 Tax Help Chatbot
                                </Link>
                            </div>
                        </div>
                    ) : (
                        latestRec && (
                            <div className="mt-6">
                                {Array.isArray(latestRec.categories) && (
                                    <>
                                        <h4>Recommended Categories:</h4>
                                        <BudgetDonutChart categories={latestRec.categories} />

                                        {/* <ul>
                                            {latestRec.categories.map((cat, idx) => (
                                                <li key={idx}>
                                                    <strong>
                                                        {cat.name} ({cat.target})
                                                    </strong>
                                                    : {cat.description}
                                                </li>
                                            ))}
                                        </ul> */}
                                    </>
                                )}
                                {/* 
                                {latestRec.visual_guide && (
                                    <p>
                                        <em>{latestRec.visual_guide}</em>
                                    </p>
                                )} */}
                            </div>
                        )
                    )}

                </div>
                {/* 🆕 Transaction History Section */}
                <div className="mt-10">
                    <h3>💳 Transaction History</h3>
                    <TransactionUpload onTransactionsParsed={setTransactions} />

                    {transactions.length > 0 && (
                        <table border="1" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th>Posted Date</th>
                                    <th>Reference Number</th>
                                    <th>Payee</th>
                                    <th>Address</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx, idx) => (
                                    <tr key={idx}>
                                        <td>{tx["Posted Date"]}</td>
                                        <td>{tx["Payee"]}</td>
                                        <td>{tx["Address"]}</td>
                                        <td style={{ color: tx.Amount < 0 ? "red" : "green" }}>
                                            {tx.Amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );


}

export default HomePageLoggedIn;
