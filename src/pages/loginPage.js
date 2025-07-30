import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./authPages.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleAuthMode = () => setIsSignIn(prev => !prev);

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

    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/login")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <div className={styles.authPage}>
            {isSignIn ?
                <div>
                    <div className={styles.authSpacer}>
                        <h1>Welcome Back!</h1>
                        <p>Let’s check in on your goals and keep your budget on track. Every step counts — you’re doing great!.</p>
                        <div>
                            <FontAwesomeIcon icon={faInstagram} />
                            <FontAwesomeIcon icon={faTwitter} />
                            <FontAwesomeIcon icon={faYoutube} />
                        </div>
                    </div>
                    <div className={styles.authForm}>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Email address:</label>
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
                            {/*debug  */}
                            {error && <p>{error}</p>}
                            <button type="submit">Login</button>

                        </form>
                        <div className={styles.authOptions}>
                            <p>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ OR ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</p>
                            <button onClick={handleGoogleSignIn}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </button>
                            <p>
                                Don't have an account? <span onClick={toggleAuthMode} style={{ cursor: 'pointer', color: 'orange', textDecoration: 'underline' }}>Register Now</span>
                            </p>

                        </div>
                    </div>
                </div> : <div>
                    <div className={styles.authSpacer}>
                        <h1>Welcome aboard!</h1>
                        <p>You’re all set to take control of your finances. Let’s start building your path to smarter spending and saving!</p>
                        <div>
                            <FontAwesomeIcon icon={faInstagram} />
                            <FontAwesomeIcon icon={faTwitter} />
                            <FontAwesomeIcon icon={faYoutube} />
                        </div>
                    </div>
                    <div className={styles.authForm}>
                        <h2>Sign Up</h2>
                        <form>
                            <div>
                                <label htmlFor="email-address">
                                    Email address:
                                </label>
                                <input
                                    type="email"
                                    label="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    label="Create password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
                                />
                            </div>
                            {error && <p>{error}</p>}
                            <button type="submit" onClick={onSubmit}>Sign up</button>
                        </form>
                        <div className={styles.authOptions}>
                            <p>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ OR ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</p>
                            <button onClick={handleGoogleSignIn}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </button>
                            <p>
                                Already have an account? <span onClick={toggleAuthMode} style={{ cursor: 'pointer', color: 'orange', textDecoration: 'underline' }}>Sign In</span>
                            </p>

                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default LoginPage;