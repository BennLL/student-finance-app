import './navBar.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function NavBar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { user } = useAuth();

    const toggleDropdown = () => setShowDropdown(prev => !prev);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setShowDropdown(false);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <div className="navbar">
            <div>
                <h1 className='navbarTitle'>Student Finance Help</h1>
            </div>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/tax-help">Tax Help</Link></li>
                    <li><Link to="/budgeting-tool">Budgeting Tool</Link></li>
                    <li><Link to="/other">Other</Link></li>
                    <li style={{ position: 'relative' }} ref={dropdownRef}>
                        <button className="profileIcon" onClick={toggleDropdown}>
                            <FontAwesomeIcon icon={faUser} />
                        </button>
                        {showDropdown && (
                            <ul className="profileDropdown">
                                {user ? (
                                    <>
                                        <li style={{ color: 'white', padding: '5px 10px' }}>
                                            Welcome, {user.email}
                                        </li>
                                        <li>
                                            <Link onClick={handleLogout}>Logout</Link>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link to="/login" onClick={() => setShowDropdown(false)}>Login</Link>
                                    </li>
                                )}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;
