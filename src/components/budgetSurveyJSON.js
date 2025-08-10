import { Model } from "survey-core";
import { DefaultLightPanelless } from "survey-core/themes";

export const surveyJSON = {
  title: "📊 Personalized Budgeting Survey",
  showProgressBar: "top",
  pages: [

    {
      name: "financial_mindset",
      elements: [
        {
          type: "radiogroup",
          name: "money_relationship",
          title: "How would you describe your overall relationship with money?",
          isRequired: true,
          choices: [
            "I feel in control and organized",
            "I try to stay on top of things but sometimes slip",
            "I feel overwhelmed or avoid thinking about money",
            "Other (please explain)"
          ]
        },
        {
          type: "radiogroup",
          name: "budgeting_style",
          title: "Which best describes your budgeting style?",
          isRequired: true,
          choices: [
            "I track every expense manually",
            "I check my bank account regularly but don’t use a formal budget",
            "I try to budget but struggle to stick to it",
            "I don’t budget at all yet"
          ]
        },
        {
          type: "radiogroup",
          name: "spending_decision",
          title: "How do you usually make spending decisions?",
          isRequired: true,
          choices: [
            "I plan most purchases in advance",
            "I tend to spend spontaneously or emotionally",
            "I shop around for deals or delay purchases",
            "Other (please explain)"
          ]
        }
      ]
    },

    {
      name: "income",
      elements: [
        {
          type: "radiogroup",
          name: "income_situation",
          title: "Which best describes your income situation?",
          isRequired: true,
          choices: [
            "Consistent (e.g. salary or fixed stipend)",
            "Somewhat irregular (e.g. part-time or gig work)",
            "Very irregular or unpredictable",
            "No current income"
          ]
        },
        {
          type: "radiogroup",
          name: "income_frequency",
          title: "How frequently do you receive income?",
          isRequired: true,
          choices: ["Weekly", "Bi-weekly", "Monthly", "Irregular", "N/A"]
        },
        {
          type: "radiogroup",
          name: "shared_expenses",
          title: "Do you share expenses with anyone (e.g. family, roommates, partner)?",
          isRequired: true,
          choices: ["Yes", "No", "Sometimes"]
        }
      ]
    },

    {
      name: "financial_goals",
      elements: [
        {
          type: "checkbox",
          name: "goals",
          title: "Which of the following are your current financial goals? (Select all that apply)",
          isRequired: true,
          choices: [
            "Save for an emergency fund",
            "Pay off debt",
            "Build good money habits",
            "Stick to a weekly/monthly budget",
            "Save for a big purchase (e.g. trip, car, tuition)",
            "Learn more about personal finance",
            "Invest or grow my money",
            "Other (please explain)"
          ]
        },
        {
          type: "radiogroup",
          name: "goal_timeline",
          title: "How soon do you want to start seeing progress toward these goals?",
          isRequired: true,
          choices: [
            "Immediately",
            "Within 1–2 months",
            "In the next 6 months",
            "I’m not in a rush"
          ]
        }
      ]
    },

    {
      name: "spending_habits",
      elements: [
        {
          type: "checkbox",
          name: "overspending_categories",
          title: "Which categories do you tend to overspend on? (Select any that apply)",
          isRequired: true,
          choices: [
            "Food (restaurants, delivery, groceries)",
            "Subscriptions / streaming",
            "Clothing / shopping",
            "Entertainment / nightlife",
            "Transportation (gas, rideshare)",
            "Other (please explain)"
          ]
        },
        {
          type: "radiogroup",
          name: "tracking_spending",
          title: "How do you currently track your spending?",
          isRequired: true,
          choices: [
            "I use an app",
            "I write it down or use a spreadsheet",
            "I rely on memory / check my bank app",
            "I don’t track it right now"
          ]
        }
      ]
    },

    {
      name: "life_info",
      elements: [
        {
          type: "dropdown",
          name: "age_range",
          title: "What is your age range?",
          isRequired: true,
          choices: ["Under 18", "18–22", "23–29", "30–39", "40+"]
        },
        {
          type: "radiogroup",
          name: "student_status",
          title: "Are you currently a student?",
          isRequired: true,
          choices: ["Yes, full-time", "Yes, part-time", "No"]
        },
        {
          type: "radiogroup",
          name: "employment_status",
          title: "Are you currently employed?",
          isRequired: true,
          choices: [
            "Yes, full-time",
            "Yes, part-time or freelance",
            "No",
            "Other (please explain)"
          ]
        },
        {
          type: "checkbox",
          name: "recurring_expenses",
          title: "Do you currently have any large recurring expenses?",
          isRequired: true,
          choices: [
            "Rent / housing",
            "Student loans or other debt",
            "Childcare",
            "Transportation",
            "Other (please explain)",
            "No major recurring expenses"
          ]
        }
      ]
    },

    {
      name: "final_notes",
      elements: [
        {
          type: "comment",
          name: "additional_notes",
          title:
            "Is there anything else you’d like to share about your financial goals, challenges, or what you're looking to get out of this app? (Optional, but highly recommended)"
        }
      ]
    }
  ]
};

const survey = new Model(surveyJSON);
survey.applyTheme(DefaultLightPanelless);

export default survey;
