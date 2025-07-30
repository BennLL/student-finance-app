/* temporary */
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function TaxHelp() {
    const { user } = useAuth();

    return (
        <div className="centered-container">
            <div className="rounded shadowed glass">
                <h2>📄 Understanding Taxes: A Student’s Guide</h2>
                <p>
                    Filing taxes can feel overwhelming, especially if you're just getting started — but we're here to help simplify the process.
                </p>

                <h3>🧾 What You’ll Learn:</h3>
                <ul>
                    <li>✔️ What documents you need before filing (e.g., W-2, 1098-T, 1099)</li>
                    <li>✔️ Where and how to file your taxes for free</li>
                    <li>✔️ The purpose of common tax forms</li>
                    <li>✔️ How to avoid common mistakes</li>
                </ul>

                <h3>🎯 Who Is This For?</h3>
                <p>
                    This resource is designed for students, part-time workers, and young adults who want to take control of their finances by learning to file taxes independently.
                </p>

                <h3>💡 Quick Tip</h3>
                <p>
                    If you earned less than a certain threshold, you may not be required to file — but you still might want to in order to receive a refund. Always check with the official IRS guidelines or a verified resource.
                </p>

                <p>
                    In the near future, you’ll be able to interact with our chatbot below for guidance, simulations, and FAQs related to tax filing.
                </p>
                {user ?
                    <div>Place holder for more features</div>
                    : <button>
                        <Link to="/login">Log in to get started!</Link>
                    </button>}
            </div>
        </div>
    );
}

export default TaxHelp;