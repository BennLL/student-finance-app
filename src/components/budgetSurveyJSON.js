import { Model } from "survey-core";
import { DefaultLightPanelless } from "survey-core/themes";

export const surveyJSON = {
  title: "📊 Personalized Budgeting Survey",
  showProgressBar: "top",
  pages: [
    {
      name: "basic",
      elements: [
        { type: "text", name: "name", title: "Name:", isRequired: true },
        {
          type: "dropdown", name: "age", title: "Age Range:", isRequired: true,
          choices: ["Under 18", "18-22", "23-29", "30-39", "40+"]
        },
        {
          type: "radiogroup", name: "student_status", title: "Are you currently a student?", isRequired: true,
          choices: ["Yes", "No"]
        },
        {
          type: "dropdown", name: "employment_status", title: "What is your current employment status?", isRequired: true,
          choices: ["Unemployed", "Part-time", "Full-time", "Freelancer", "Other"]
        }
      ]
    },
    {
      name: "financial",
      elements: [
        {
          type: "dropdown", name: "budgeting_style", title: "Which budgeting style best describes you?", isRequired: true,
          choices: ["Envelope method", "Zero-based", "50/30/20", "I don't use a specific method"]
        },
        {
          type: "radiogroup", name: "income_consistency", title: "How consistent is your monthly income?", isRequired: true,
          choices: ["Very consistent", "Somewhat consistent", "Varies a lot"]
        },
        {
          type: "dropdown", name: "income_frequency", title: "How often do you receive income?", isRequired: true,
          choices: ["Weekly", "Bi-weekly", "Monthly", "Irregularly"]
        },
        {
          type: "radiogroup", name: "shared_expenses", title: "Do you share expenses with others (e.g., roommates, partner)?", isRequired: true,
          choices: ["Yes", "No"]
        },
        {
          type: "checkbox", name: "financial_goals", title: "What financial goals are most important to you?", isRequired: true,
          choices: ["Emergency fund", "Paying off debt", "Saving for a big purchase", "Building credit", "Investing", "Other"]
        },
        {
          type: "dropdown", name: "goal_urgency", title: "How urgent are your financial goals?", isRequired: true,
          choices: ["Very urgent", "Somewhat urgent", "Not urgent"]
        },
        {
          type: "checkbox", name: "overspending", title: "What categories do you tend to overspend in?", isRequired: true,
          choices: ["Food delivery", "Clothing", "Entertainment", "Subscriptions", "Other"]
        },
        {
          type: "dropdown", name: "tracking_method", title: "How do you currently track your spending?", isRequired: true,
          choices: ["Spreadsheet", "Budgeting app", "Bank app", "Pen & paper", "I don’t track it"]
        },
        { type: "comment", name: "recurring_expenses", title: "List any large recurring expenses you have (tuition, rent, etc.):", isRequired: true },
        { type: "comment", name: "additional_notes", title: "Any additional notes or context you want to share?" }
      ]
    }
  ]
};


const survey = new Model(surveyJSON);
survey.applyTheme(DefaultLightPanelless);

export default survey;
