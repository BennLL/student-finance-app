import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styling/authPages.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate("/");

        } catch (error) {
            console.error("Google Sign-In Error:", error);
            setError(error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div className="authPage">
            <div className="authSpacer">
                <h1>Welcome Back!</h1>
                <p>Let’s check in on your goals and keep your budget on track. Every step counts — you’re doing great!.</p>
                <div>
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faYoutube} />
                </div>
            </div>
            <div className="authForm">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div >
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">Login</button>

                </form>
                <div className='authOptions'>
                    <p>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ OR ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</p>
                    <button onClick={handleGoogleSignIn}>
                        <FontAwesomeIcon icon={faGoogle} />
                    </button>
                    <p>Don't have an account? <Link to="/signup">Register Now</Link></p>
                </div>
            </div>


        </div>
    );
}

export default LoginPage;