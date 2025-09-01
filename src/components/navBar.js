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
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleDropdown = () => setShowDropdown(prev => !prev);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setShowDropdown(false);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    // detect scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    // detect click outside
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
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 text-black p-[10px] ${isScrolled ? "shadow-md bg-white shadow-md" : "bg-[#f9f5ec]"}`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        <Link to="/" className="flex items-center">
                            <img src="/img/logo3.png" alt="Logo" className="h-60 w-auto" />
                        </Link>

                        <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
                            <li><Link className="hover:text-blue-600 transition" to="/">Home</Link></li>
                            <li><Link className="hover:text-blue-600 transition" to="/tax-help">Tax Help</Link></li>
                            <li><Link className="hover:text-blue-600 transition" to="/budgeting-tool">Budgeting Tool</Link></li>
                            <li><Link className="hover:text-blue-600 transition" to="/other">About Us</Link></li>
                            <li className="relative" ref={dropdownRef}>
                                <button
                                    className="p-2 rounded-full hover:bg-gray-200 transition"
                                    onClick={toggleDropdown}
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </button>
                                {showDropdown && (
                                    <ul className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg text-sm">
                                        {user ? (
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        ) : (
                                            <li>
                                                <Link
                                                    to="/login"
                                                    onClick={() => setShowDropdown(false)}
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Login
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className={`h-[80px]`} />
        </>
    );
}

export default NavBar;
