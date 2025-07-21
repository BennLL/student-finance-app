import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
import "./styling/authPages.css";
import "./styling/authPages.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

function SingUpPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

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


    return (
        <div className="authPage">
            <div className="authSpacer">
                <h1>Welcome aboard!</h1>
                <p>You’re all set to take control of your finances. Let’s start building your path to smarter spending and saving!</p>
                <div>
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faYoutube} />
                </div>
            </div>
            <div className="authForm">
                <h2>Sign Up</h2>
                <form>
                    <div>
                        <label htmlFor="email-address">
                            Email address
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
                            Password
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" onClick={onSubmit}>Sign up</button>
                </form>
                <div className='authOptions'>
                    <p>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ OR ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</p>
                    <button onClick={handleGoogleSignIn}>
                        <FontAwesomeIcon icon={faGoogle} />
                    </button>
                    <p>Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SingUpPage;