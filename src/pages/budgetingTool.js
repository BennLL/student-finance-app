import styles from './styling/budgetingTool.module.css';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { saveAs } from 'file-saver';


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

    const handleSubmit = async (e) => {
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

        if (user) {
            try {
                await addDoc(collection(db, "budgetSurveyResponses"), {
                    ...answers,
                    user: user?.email || "Anonymous",
                    timestamp: serverTimestamp(),
                });

            } catch (e) {
                console.error("Error saving survey response: ", e);
            }
        }
    };

    const handleDownload = async () => {
        const snapshot = await getDocs(collection(db, "budgetSurveyResponses"));
        const data = snapshot.docs.map(doc => doc.data());
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        saveAs(blob, "surveyResponses.json");
    };


    return (
        <div className="centered-container">
            <div className={`${styles.budgetingTool} rounded shadowed glass`}>
                <h1 className="text-center">📝 Budgeting Style Survey</h1>
                <form onSubmit={handleSubmit} >

                    {/* Question 1 */}
                    <div>
                        <label><b>1. What best describes your income?</b></label>
                        <select className="rounded-slight" name="income" value={answers.income} onChange={handleChange} required>
                            <option value="">-- Select --</option>
                            <option value="fixed">Fixed paycheck every month</option>
                            <option value="varied">Varies month to month</option>
                            <option value="multiple">Multiple income sources</option>
                        </select>
                    </div>

                    {/* Question 2 */}
                    <div>
                        <label><b>2. How do you usually track or manage your spending?</b></label>
                        <select className="rounded-slight" name="spending" value={answers.spending} onChange={handleChange} required>
                            <option value="">-- Select --</option>
                            <option value="track_every_dollar">I track every dollar</option>
                            <option value="simple_balance">Balance essentials, wants, savings</option>
                            <option value="save_whats_left">Save what’s left</option>
                            <option value="fixed_limits">Set fixed category limits</option>
                        </select>
                    </div>

                    {/* Question 3 */}
                    <div>
                        <label><b>3. What is your primary financial goal right now?</b></label>
                        <select className="rounded-slight" name="goal" value={answers.goal} onChange={handleChange} required>
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
                        <label><b>4. Do you need a budget that adapts easily?</b></label>
                        <select className="rounded-slight" name="flexibility" value={answers.flexibility} onChange={handleChange} required>
                            <option value="">-- Select --</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    {/* Question 5 */}
                    <div>
                        <label><b>5. How do you stay motivated financially?</b></label>
                        <select className="rounded-slight" name="motivation" value={answers.motivation} onChange={handleChange} required>
                            <option value="">-- Select --</option>
                            <option value="accountability">Seeing every dollar accounted for</option>
                            <option value="goal_oriented">Working toward clear priorities</option>
                            <option value="simple">Simplicity and low-maintenance</option>
                            <option value="automation">Automating everything</option>
                            <option value="visual_control">Using cash/envelopes</option>
                        </select>
                    </div>

                    <button type="submit" className="rounded primary-button horizontal-center">Submit</button>
                </form>

                {result && (
                    <div className={`${styles.budgetingToolResult} rounded shadowed glass`}>
                        <p className="text-center"><b>{result}</b></p>
                        <div>
                            {user ? <div>
                                <button className="secondary-button rounded horizontal-center" onClick={handleDownload}>
                                    📁 Download All Responses
                                </button>
                            </div> : <Link to="/login">
                                <button className="primary-button rounded horizontal-center">
                                    Log in to get started!
                                </button>
                            </Link>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BudgetingTool;