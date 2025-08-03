// src/pages/BudgetingTool.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import 'survey-core/survey-core.css';
import { ContrastLight } from "survey-core/themes"; 
import styles from './styling/budgetingTool.module.css';

import { surveyJSON } from '../components/budgetSurveyJSON.js';
import { db } from '../firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { saveAs } from 'file-saver';

function BudgetingTool() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = React.useState(false);

  const model = new Model(surveyJSON);

  model.onComplete.add(async (sender) => {
    const data = sender.data;

    if (user) {
      try {
        await addDoc(collection(db, 'budgetSurveyResponses'), {
          ...data,
          user: user?.email || 'Anonymous',
          timestamp: serverTimestamp()
        });
      } catch (e) {
        console.error('Error saving survey response: ', e);
      }
    }

    setSubmitted(true);
  });

  const handleDownload = async () => {
    const snapshot = await getDocs(collection(db, "budgetSurveyResponses"));
    const data = snapshot.docs.map(doc => doc.data());
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    saveAs(blob, "surveyResponses.json");
  };

  return (
    <div className="centered-container">
      <div className={`${styles.budgetingTool} rounded shadowed glass`}>
        <h1 className="text-center">🧾 Budgeting Profile Intake</h1>

        {!submitted ? (
          <Survey model={model} />
        ) : (
          <div className={`${styles.budgetingToolResult} rounded shadowed glass`}>
            <p className="text-center"><b>✅ Survey submitted!</b></p>
            {user ? (
              <button className="secondary-button rounded horizontal-center" onClick={handleDownload}>
                📁 Download All Responses
              </button>
            ) : (
              <Link to="/login">
                <button className="primary-button rounded horizontal-center">
                  Log in to save your results!
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BudgetingTool;
