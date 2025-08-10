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
import BudgetDonutChart from '../components/budgetDonutChart.js';

function BudgetingTool() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = React.useState(false);
  const [recommendation, setRecommendation] = React.useState(null);

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

    try {
      const gptResponse = await getBudgetRecommendation(data);
      console.log("GPT Recommendation:", gptResponse);
      setRecommendation(gptResponse);
    } catch (err) {
      console.error("Error getting recommendation:", err);
      setRecommendation({ narrative: "Sorry, we couldn't generate a recommendation at this time." });
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
                  <div className="text-left max-w-xl mx-auto mt-6">
                    <h3>🧠 GPT Recommendation</h3>

                    {recommendation.narrative && (
                      <p><strong>Summary:</strong> {recommendation.narrative}</p>
                    )}

                    {recommendation.recommendation && (
                      <p><strong>Suggested Method:</strong> {recommendation.recommendation}</p>
                    )}

                    {Array.isArray(recommendation.categories) && (
                      <>
                        <h4>Recommended Categories:</h4>
                        <BudgetDonutChart categories={recommendation.categories} />
                        <ul>
                          {recommendation.categories.map((cat, index) => (
                            <li key={index}>
                              <strong>{cat.name} ({cat.target})</strong>: {cat.description}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {recommendation.visual_guide && (
                      <p><em>{recommendation.visual_guide}</em></p>
                    )}
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
