import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import BudgetDonutChart from '../components/budgetDonutChart';
import TransactionUploaderWithTable from '../components/transactionHistory';

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
        <div className="flex justify-center mt-10 px-4 space-x-8 ">
            <div className='w-[30%]'>
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
                                    <div>
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
                                    </div>
                                </>
                            )}

                        </div>
                    )
                )}
            </div>
            <div className="p-4 w-[40%]">
                <TransactionUploaderWithTable />
            </div>
        </div>
    );


}

export default HomePageLoggedIn;
