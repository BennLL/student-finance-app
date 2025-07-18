import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import HomePage from "./pages/homePage";
import BudgetingTool from "./pages/budgetingTool";
import OtherPage from "./pages/otherPage";
import TaxHelp from "./pages/taxHelpPage";
import LoginPage from "./pages/loginPage";
import SingUpPage from "./pages/signUpPage";
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from "react";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);


    return (
        <Router>
            <NavBar></NavBar>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tax-help" element={<TaxHelp />} />
                <Route path="/budgeting-tool" element={<BudgetingTool />} />
                <Route path="/other" element={<OtherPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SingUpPage />} />
            </Routes>
        </Router>
    );
}

export default App;