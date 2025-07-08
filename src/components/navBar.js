import './navBar.css';
import {Link} from 'react-router-dom';

function NavBar() {
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
                </ul>
            </div>
        </div>
    );
}

export default NavBar;