import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;


export async function getBudgetRecommendation(surveyData) {
    const prompt = `
You are a financial assistant helping users build personalized budgeting plans based on their financial psychology, goals, and habits.

Here is the user’s survey response:

Relationship with money: ${surveyData.relationship || "N/A"}  
Budgeting style: ${surveyData.budgeting_style || "N/A"}  
Income consistency: ${surveyData.income_consistency || "N/A"}  
Income frequency: ${surveyData.income_frequency || "N/A"}  
Shared expenses: ${surveyData.shared_expenses || "N/A"}  
Financial goals: ${surveyData.financial_goals || "N/A"}  
Goal urgency: ${surveyData.goal_urgency || "N/A"}  
Overspending categories: ${surveyData.overspending || "N/A"}  
Spending tracking method: ${surveyData.tracking_method || "N/A"}  
Age range: ${surveyData.age || "N/A"}  
Student status: ${surveyData.student_status || "N/A"}  
Employment status: ${surveyData.employment_status || "N/A"}  
Large recurring expenses: ${surveyData.recurring_expenses || "N/A"}  
Additional notes: ${surveyData.additional_notes || "N/A"}

Please:

1. Provide a brief narrative summary highlighting the user’s financial mindset and challenges.  
2. Recommend a budgeting method or hybrid that fits the user’s profile.  
3. Suggest 3–5 budget categories with recommended allocation percentages or focus areas.  
4. Optionally, include a simple visual guide description (e.g., pie chart or envelope buckets).  
5. Format your output as JSON with the keys: "narrative", "recommendation", "categories", and "visual_guide".

Respond with valid JSON only.
`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const content = response.data.choices[0].message.content.trim();

        return JSON.parse(content);
    } catch (error) {
        console.error('Error getting recommendation:', error);
        return {
            narrative: "Sorry, we couldn't generate a recommendation at this time.",
            recommendation: "",
            categories: [],
            visual_guide: ""
        };
    }
}

