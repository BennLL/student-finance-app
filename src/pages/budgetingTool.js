// src/pages/BudgetingTool.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Survey } from 'survey-react-ui';
import { Model } from 'survey-core';
import 'survey-core/survey-core.css';
import { DefaultLightPanelless } from "survey-core/themes";
import styles from './styling/budgetingTool.module.css';

import { surveyJSON } from '../components/budgetSurveyJSON.js';
import { db } from '../firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { saveAs } from 'file-saver';

import { getBudgetRecommendation } from '../utils/openaiClient.js';

function BudgetingTool() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = React.useState(false);
  const [recommendation, setRecommendation] = React.useState("");

  const model = new Model(surveyJSON);
  model.applyTheme(DefaultLightPanelless);

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

    const gptResponse = await getBudgetRecommendation(data);
    setRecommendation(gptResponse);

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
      <div>
        <h1 className="text-center">🧾 Budgeting Profile Intake</h1>

        {!submitted ? (
          <Survey model={model} />
        ) : (
          <div className={styles.budgetingToolResult}>
            <p className="text-center"><b>✅ Survey submitted!</b></p>
            {user ? (
              <div>
                {recommendation && (
                  <div className="text-center">
                    <h3>🧠 GPT Recommendation</h3>
                    <p>{recommendation}</p>
                  </div>
                )}
                <button className="secondary-button rounded horizontal-center" onClick={handleDownload}>
                  📁 Download All Responses
                </button>

              </div>

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
