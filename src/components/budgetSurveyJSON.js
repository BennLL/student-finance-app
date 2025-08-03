import { Model } from "survey-core";
import { ContrastDark } from "survey-core/themes";

export const surveyJSON = {
  title: "📊 Student Budgeting Survey",
  showProgressBar: "top",
  pages: [
    {
      name: "basic",
      elements: [
        { type: "text", name: "name", title: "Name:", isRequired: true },
        { type: "text", name: "age", inputType: "number", title: "Age:", isRequired: true },
        { type: "text", name: "school", title: "School:", isRequired: true },
        { type: "text", name: "year", title: "Year in School:", isRequired: true },
        { type: "text", name: "major", title: "Major:", isRequired: true },
      ]
    },
    {
      name: "financial",
      elements: [
        { type: "text", name: "income", title: "1. What's your current monthly income?", isRequired: true },
        { type: "text", name: "housing", title: "2. Do you live on-campus, off-campus, or at home?", isRequired: true },
        { type: "text", name: "housingCovered", title: "3. Do you pay for rent or housing expenses?", isRequired: true },
        { type: "text", name: "expenses", title: "4. What are your typical monthly expenses?", isRequired: true },
        { type: "text", name: "subscriptions", title: "5. Do you have any recurring bills or subscriptions?", isRequired: true },
        { type: "text", name: "savingsGoal", title: "6. Do you have a savings goal?", isRequired: true },
        { type: "text", name: "debt", title: "7. Do you have any debt or loans?", isRequired: true },
        { type: "text", name: "irregularPurchases", title: "8. How often do you make irregular purchases?", isRequired: true },
        {
          type: "dropdown", name: "comfort", title: "9. How comfortable are you with budgeting?",
          isRequired: true,
          choices: ["Beginner", "Intermediate", "Advanced"]
        },
        {
          type: "radiogroup", name: "autoCategorization",
          title: "10. Would you like automatic categorization of your expenses?",
          choices: ["Yes", "No"], isRequired: true
        },
        {
          type: "radiogroup", name: "alerts",
          title: "11. Do you want notifications for low balances or large transactions?",
          choices: ["Yes", "No"], isRequired: true
        },
        {
          type: "radiogroup", name: "studentDiscounts",
          title: "12. Would you like suggestions for student discounts or cost-saving tips?",
          choices: ["Absolutely", "No thanks"], isRequired: true
        }
      ]
    }
  ]
};

const survey = new Model(surveyJSON);
survey.applyTheme(ContrastDark);

export default survey;
