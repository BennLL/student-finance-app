import './styling/budgetingTool.css';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


function BudgetingTool() {
    const { user } = useAuth();
    const [answers, setAnswers] = useState({
        income: '',
        spending: '',
        goal: '',
        flexibility: '',
        motivation: '',
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { income, spending, goal, flexibility, motivation } = answers;

        if (spending === "track_every_dollar" || motivation === "accountability") {
            setResult("Recommended: Zero-Based Budgeting");
        } else if (spending === "simple_balance" || goal === "build_savings") {
            setResult("Recommended: 50/30/20 Rule");
        } else if (motivation === "visual_control") {
            setResult("Recommended: Envelope System");
        } else if (goal === "saving_retirement") {
            setResult("Recommended: Pay Yourself First");
        } else if (income === "varied") {
            setResult("Recommended: Rolling Budget");
        } else if (goal === "long_term") {
            setResult("Recommended: Strategic Budgeting");
        } else {
            setResult("Recommended: Priority-Based Budgeting");
        }
    };

    return (
        <div className="budgetingTool">
            <h1 >📝 Budgeting Style Survey</h1>
            <form onSubmit={handleSubmit} >

                {/* Question 1 */}
                <div>
                    <label >1. What best describes your income?</label>
                    <select name="income" value={answers.income} onChange={handleChange} required>
                        <option value="">-- Select --</option>
                        <option value="fixed">Fixed paycheck every month</option>
                        <option value="varied">Varies month to month</option>
                        <option value="multiple">Multiple income sources</option>
                    </select>
                </div>

                {/* Question 2 */}
                <div>
                    <label >2. How do you usually track or manage your spending?</label>
                    <select name="spending" value={answers.spending} onChange={handleChange} required>
                        <option value="">-- Select --</option>
                        <option value="track_every_dollar">I track every dollar</option>
                        <option value="simple_balance">Balance essentials, wants, savings</option>
                        <option value="save_whats_left">Save what’s left</option>
                        <option value="fixed_limits">Set fixed category limits</option>
                    </select>
                </div>

                {/* Question 3 */}
                <div>
                    <label >3. What is your primary financial goal right now?</label>
                    <select name="goal" value={answers.goal} onChange={handleChange} required>
                        <option value="">-- Select --</option>
                        <option value="debt">Pay off debt</option>
                        <option value="build_savings">Build savings</option>
                        <option value="consistency">Stick to a budget</option>
                        <option value="long_term">Plan for long-term expenses</option>
                        <option value="saving_retirement">Save for retirement</option>
                    </select>
                </div>

                {/* Question 4 */}
                <div>
                    <label >4. Do you need a budget that adapts easily?</label>
                    <select name="flexibility" value={answers.flexibility} onChange={handleChange} required>
                        <option value="">-- Select --</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                {/* Question 5 */}
                <div>
                    <label >5. How do you stay motivated financially?</label>
                    <select name="motivation" value={answers.motivation} onChange={handleChange} required>
                        <option value="">-- Select --</option>
                        <option value="accountability">Seeing every dollar accounted for</option>
                        <option value="goal_oriented">Working toward clear priorities</option>
                        <option value="simple">Simplicity and low-maintenance</option>
                        <option value="automation">Automating everything</option>
                        <option value="visual_control">Using cash/envelopes</option>
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>

            {result && (
                <div className="budgetingToolResult">
                    <p>{result}</p>
                    <div>
                        {user ? <div>Place holder for more features</div> : <button>
                            <Link to="/login">Log in to get started!</Link>
                        </button>}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BudgetingTool;