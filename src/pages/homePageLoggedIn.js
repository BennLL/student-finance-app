import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import BudgetDonutChart from '../components/budgetDonutChart';

function HomePageLoggedIn() {
    const { user } = useAuth();
    const [latestRec, setLatestRec] = useState(null);

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
                                <h3>Your Last Budget Recommendation</h3>

                                {latestRec.narrative && (
                                    <p>
                                        <strong>Summary:</strong> {latestRec.narrative}
                                    </p>
                                )}

                                {latestRec.recommendation && (
                                    <p>
                                        <strong>Suggested Method:</strong> {latestRec.recommendation}
                                    </p>
                                )}

                                {Array.isArray(latestRec.categories) && (
                                    <>
                                        <h4>Recommended Categories:</h4>
                                        <BudgetDonutChart categories={latestRec.categories} />

                                        <ul>
                                            {latestRec.categories.map((cat, idx) => (
                                                <li key={idx}>
                                                    <strong>
                                                        {cat.name} ({cat.target})
                                                    </strong>
                                                    : {cat.description}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {latestRec.visual_guide && (
                                    <p>
                                        <em>{latestRec.visual_guide}</em>
                                    </p>
                                )}
                            </div>
                        )
                    )}

                </div>
            </div>
        </div>
    );


}

export default HomePageLoggedIn;
