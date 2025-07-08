import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import HomePage from "./pages/homePage";
import BudgetingTool from "./pages/budgetingTool";
import OtherPage from "./pages/otherPage";
import TaxHelp from "./pages/taxHelpPage";

function App() {
    return (
        <Router>
            <NavBar></NavBar>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tax-help" element={<TaxHelp />} />
                <Route path="/budgeting-tool" element={<BudgetingTool />} />
                <Route path="/other" element={<OtherPage />} />
            </Routes>
        </Router>
    );
}

export default App;