import styles from './styling/homePage.module.css'
import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import HomePageLoggedIn from './homePageLoggedIn';
import { Link } from 'react-router-dom';

function HomePage() {
    const { user } = useAuth();

    return (
        <div className={styles.homeContainer}>
            {user ? <HomePageLoggedIn /> :
                <div>
                    <div className={styles.homePageIntro}>
                        <div>
                            <h2>Welcome to Student Finance Help</h2>
                            <p>
                                A modern finance education tool built for young adults and students. Our mission is to teach you how to manage money <strong>before</strong> you’re expected to.
                            </p>
                            <button>
                                <Link to="/login">Get started</Link>
                            </button>
                        </div>
                    </div>

                    <div className={styles.homePageFeatures}>
                        <div className={styles.homePageFeaturesText}>
                            <h3>What you’ll learn</h3>
                            <ul className={styles.featureList}>
                                <li>📄 How to file taxes for free</li>
                                <li>📊 Smart budgeting strategies</li>
                                <li>🏦 Financial responsibilities like retirement, savings, and more</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.homePageTools}>
                        <div>
                            <h3>Interactive Tools</h3>
                            <p>
                                Take a short questionnaire to personalize your budgeting tool and explore financial scenarios through classroom-style simulations and exercises.
                            </p>
                        </div>
                    </div>

                    <div className={styles.homePagePremium}>
                        <div>
                            <h3>Premium Features</h3>
                            <p>
                                Upgrade for access to our advanced budgeting system — built for long-term planning and progress tracking.
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default HomePage;