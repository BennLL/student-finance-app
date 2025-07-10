import './styling/budgetingTool.css';
import React, { useState } from 'react';


function BudgetingTool() {
    //income
    const [income, setIncome] = useState({
        salary: 0,
        sideIncome: 0,
        benefits: 0,
        scholarshipsGrants: 0,
        other: 0
    });

    const handleChangeIncome = (e) => {
        const { name, value } = e.target;
        setIncome(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const totalIncome = Object.values(income).reduce((sum, val) => sum + val, 0);

    //fixed expenses
    const [fixedExpenses, setFixedExpenses] = useState({
        rentMortage: 0,
        utilities: 0,
        internetPhone: 0,
        insurance: 0,
        loanPayments: 0,
        subscriptions: 0
    });

    const handleChangeExpenses = (e) => {
        const { name, value } = e.target;
        setFixedExpenses(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    }

    const totalFixedExpenses = Object.values(fixedExpenses).reduce((sum, val) => sum + val, 0);

    //variable expenses
    const [variableExpenses, setVariableExpenses] = useState({
        groceries: 0,
        gasTransport: 0,
        diningOut: 0,
        entertainment: 0,
        shopping: 0
    });

    const handleChangeVariableExpenses = (e) => {
        const { name, value } = e.target;
        setVariableExpenses(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    }

    const totalVariableExpenses = Object.values(variableExpenses).reduce((sum, val) => sum + val, 0);

    //savings and investments
    const [savingsInvestments, setSavingsInvestments] = useState({
        emergencyFund: 0,
        retirement: 0,
        investments: 0,
        generalSavings: 0
    });

    const handleChangeSavingsInvestments = (e) => {
        const { name, value } = e.target;
        setSavingsInvestments(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    }

    const totalSavingsInvestments = Object.values(savingsInvestments).reduce((sum, val) => sum + val, 0);

    return (
        <div>
            <section className="intro">
                <h2>Zero based budgeting tool</h2>
            </section>
            <div className="form-container">
                <section className="income">
                    <h3>Income</h3>
                    <form>
                        <label for="salary">Rent/Mortgage:</label><br />
                        <input type="number" id="salary" name="salary" onChange={handleChangeIncome}></input><br />
                        <label for="sideIncome">Side Income:</label><br />
                        <input type="number" id="sideIncome" name="sideIncome" onChange={handleChangeIncome}></input><br />
                        <label for="benefits">Benefits:</label><br />
                        <input type="number" id="benefits" name="benefits" onChange={handleChangeIncome}></input><br />
                        <label for="scholarshipsGrants">Scholarships/Grants:</label><br />
                        <input type="number" id="scholarshipsGrants" name="scholarshipsGrants" onChange={handleChangeIncome}></input><br />
                        <label for="other">Loan Payments:</label><br />
                        <input type="number" id="other" name="other" onChange={handleChangeIncome}></input><br />
                    </form>
                    <div>
                        <p>Total Income: $<span id="totalIncome">{totalIncome.toFixed(2)}</span></p>
                    </div>
                </section>

                <section className="fixed-expenses">
                    <h3>Fixed Expenses</h3>
                    <form>
                        <label for="rentMortage">Rent/Mortgage:</label><br />
                        <input type="number" id="rentMortage" name="rentMortage" onChange={handleChangeExpenses}></input><br />
                        <label for="utilities">Utilities:</label><br />
                        <input type="number" id="utilities" name="utilities" onChange={handleChangeExpenses}></input><br />
                        <label for="internetPhone">Internet/phone:</label><br />
                        <input type="number" id="internetPhone" name="internetPhone" onChange={handleChangeExpenses}></input><br />
                        <label for="insurance">Insurance:</label><br />
                        <input type="number" id="insurance" name="insurance" onChange={handleChangeExpenses}></input><br />
                        <label for="loanPayments">Loan Payments:</label><br />
                        <input type="number" id="loanPayments" name="loanPayments" onChange={handleChangeExpenses}></input><br />
                        <label for="subscriptions">Subscriptions:</label><br />
                        <input type="number" id="subscriptions" name="subscriptions" onChange={handleChangeExpenses}></input><br />
                    </form>
                    <div>
                        <p>Fixed Expenses: $<span id="totalFixedExpenses">{totalFixedExpenses.toFixed(2)}</span></p>
                    </div>
                </section>

                <section className="variable-expenses">
                    <h3>Variable Expenses</h3>
                    <form>
                        <label for="groceries">Groceries:</label><br />
                        <input type="number" id="groceries" name="groceries" onChange={handleChangeVariableExpenses}></input><br />
                        <label for="gasTransport">Gas/Transport:</label><br />
                        <input type="number" id="gasTransport" name="gasTransport" onChange={handleChangeVariableExpenses}></input><br />
                        <label for="diningOut">Dining Out:</label><br />
                        <input type="number" id="diningOut" name="diningOut" onChange={handleChangeVariableExpenses}></input><br />
                        <label for="entertainment">Entertainment:</label><br />
                        <input type="number" id="entertainment" name="entertainment" onChange={handleChangeVariableExpenses}></input><br />
                        <label for="shopping">Shopping:</label><br />
                        <input type="number" id="shopping" name="shopping" onChange={handleChangeVariableExpenses}></input><br />
                    </form>
                    <div>
                        <p>Variable Expenses: $<span id="totalVariableExpenses">{totalVariableExpenses.toFixed(2)}</span></p>
                    </div>
                </section>

                <section className="savings-investments">
                    <h3>Savings & Investments</h3>
                    <form>
                        <label for="emergencyFund">Emergency Fund:</label><br />
                        <input type="number" id="emergencyFund" name="emergencyFund" onChange={handleChangeSavingsInvestments}></input><br />
                        <label for="retirement">Retirement Savings:</label><br />
                        <input type="number" id="retirement" name="retirement" onChange={handleChangeSavingsInvestments}></input><br />
                        <label for="investments">Investments:</label><br />
                        <input type="number" id="investments" name="investments" onChange={handleChangeSavingsInvestments}></input><br />
                        <label for="generalSavings">General Savings:</label><br />
                        <input type="number" id="generalSavings" name="generalSavings" onChange={handleChangeSavingsInvestments}></input><br />
                    </form>
                    <div>
                        <p>Savings & Investments: $<span id="totalSavingsInvestments">{totalSavingsInvestments.toFixed(2)}</span></p>
                    </div>
                </section>

            </div>
            <section className="intro">
                <h3>Budget Difference</h3>
                <p>Difference = Total Income - (Fixed Expenses + Varaible Expenses)</p><br />
                <p>Difference: $<span>{(totalIncome - (totalVariableExpenses + totalFixedExpenses)).toFixed(2)}</span></p>
            </section>
        </div>
    );
}

export default BudgetingTool;