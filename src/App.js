import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import HomePage from "./pages/homePage";
import BudgetingTool from "./pages/budgetingTool";
import OtherPage from "./pages/aboutUsPage";
import TaxHelp from "./pages/taxHelpPage";
import LoginPage from "./pages/loginPage";
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from "react";
import AboutUsPage from "./pages/aboutUsPage";

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
                <Route path="/other" element={<AboutUsPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;