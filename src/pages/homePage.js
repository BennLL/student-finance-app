import './styling/homepage.css'
import { useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import HomePageLoggedIn from './homePageLoggedIn';

function HomePage() {
    const { user } = useAuth();

    return (
        <div className="homeContainer">
            {user ? <HomePageLoggedIn /> :
                <div>
                    <div className="homePageIntro">
                        <div>
                            <h2>Welcome to Student Finance Help</h2>
                            <p>
                                A modern finance education tool built for young adults and students. Our mission is to teach you how to manage money <strong>before</strong> you’re expected to.
                            </p>
                            <button>
                                Get started
                            </button>
                        </div>
                    </div>

                    <div className="homePageFeatures">
                        <div className='homePageFeaturesText'>
                            <h3>What you’ll learn</h3>
                            <ul className="feature-list">
                                <li>📄 How to file taxes for free</li>
                                <li>📊 Smart budgeting strategies</li>
                                <li>🏦 Financial responsibilities like retirement, savings, and more</li>
                            </ul>
                        </div>
                    </div>

                    <div className="homePageTools">
                        <div>
                            <h3>Interactive Tools</h3>
                            <p>
                                Take a short questionnaire to personalize your budgeting tool and explore financial scenarios through classroom-style simulations and exercises.
                            </p>
                        </div>
                    </div>

                    <div className="homePagePremium">
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