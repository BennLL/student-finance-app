import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;


export async function getBudgetRecommendation(surveyData) {
    const prompt = `
You are a financial advisor for students.

Based on the following budgeting survey data, write a personalized recommendation in plain, friendly language. Write a paragraph or 2 and focus on improving the user's financial habits.

Survey Response:
${JSON.stringify(surveyData, null, 2)}

Recommendation:
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

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error getting recommendation:', error);
        return "Sorry, we couldn't generate a recommendation at this time.";
    }
}
