import './styling/homepage.css'
import { useAuth } from '../context/AuthContext';

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
                </div>
            </div>
        </div>
    );
}

export default HomePageLoggedIn;