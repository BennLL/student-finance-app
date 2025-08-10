import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export async function getBudgetRecommendation(surveyData) {
    const prompt = `
You are a financial assistant creating personalized budgeting advice.
Write directly to the user in **second person** ("you", "your").
Always respond with valid JSON only, following the schema exactly.

Here are the user’s survey responses:

Relationship with money: ${surveyData.relationship || "N/A"}  
Budgeting style: ${surveyData.budgeting_style || "N/A"}  
Income situation: ${surveyData.income_situation || "N/A"}  
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

Your task:
1. **narrative** – Summarize the user’s financial mindset, habits, and challenges in **exactly 3 sentences** in second person.
2. **recommendation** – Suggest a budgeting method or hybrid in **exactly 2 sentences** in second person.
3. **categories** – Suggest exactly 3–5 budget categories as an array of objects.  
   Each object must have:
   - "name": short category title
   - "target": numeric percentage as a string (e.g., "20%") — total should be close to 100%
   - "description": 1–2 sentences explaining why this category matters for them in second person
4. **visual_guide** – Provide a 1–2 sentence description of how these allocations could be shown in a donut chart or envelope system.

Output only valid JSON in this exact format:
{
  "narrative": "string",
  "recommendation": "string",
  "categories": [
    { "name": "string", "target": "string", "description": "string" }
  ],
  "visual_guide": "string"
}

Do not include any text outside of the JSON object.
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
            narrative: "Sorry, I couldn't generate your personalized recommendation right now.",
            recommendation: "",
            categories: [],
            visual_guide: ""
        };
    }
}