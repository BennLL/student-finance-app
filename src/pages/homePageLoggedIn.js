import './styling/homepage.css'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function HomePageLoggedIn() {
    const { user } = useAuth();

    return (
        <div className="homeContainer">
            <div className="homePageIntro">
                <div>
                    <h2>Welcome back{user ? user.displayName : ", User"}!</h2>
                    <p>
                        Continue your journey with Student Finance Help. Explore new features and tools tailored for you.
                    </p>
                    <div className="dashboardCards">
                        <Link to="/budgeting-tool" className="dashboardCard">📊 Budget Tool</Link>
                        <Link to="/tax-help" className="dashboardCard">📄 Tax Help Chatbot</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePageLoggedIn;