const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateQuestions(category, count = 10) {

	    const model = genAI.getGenerativeModel({
		            model: "gemini-2.5-flash"
		        });

	    const prompt = `
	    Generate ${count} Expert quiz questions about ${category}.

	    Return ONLY valid JSON.

	    Format:

	    [
	      {
	          "question":"...",
		      "options":["A","B","C","D"],
		          "correctAnswer":0,
			      "difficulty":"Expert",
			          "category":"${category}"
				    }
				    ]
				    `;

	    const result = await model.generateContent(prompt);

	    const text = result.response.text();

	    return JSON.parse(
		            text.replace(/```json/g, "")
		                .replace(/```/g, "")
		                .trim()
		        );

}

module.exports = {
	    generateQuestions
};
