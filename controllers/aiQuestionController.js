const { GoogleGenAI } = require("@google/genai");
const Question = require("../models/Question");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

exports.generateQuestions = async (req, res) => {

    try {

        const {
            amount = 10,
            difficulty = "Medium",
            category = "General"
        } = req.body;

        
const prompt = `
	    Generate ${amount} unique multiple-choice quiz questions.

		    Category: ${category}
	    Difficulty: ${difficulty}

	    Rules:
	    - Questions must only be about the category.
		    - Use simple English.
		    - Suitable for players aged 13+.
		    - Exactly 4 options per question.
		    - Only 1 correct answer.
		    - Answer must be the option index: 0, 1, 2, or 3.
		    - No explanations.
		    - No markdown.

		    Return ONLY valid JSON in this format:

	    [
		     {
			       "question":"Question text",
			       "options":["A","B","C","D"],
			       "answer":0,
			       "category":"${category}",
			       "difficulty":"${difficulty}"
			      }
	    ]
	    `;
        let response;

        for (let attempt = 1; attempt <= 3; attempt++) {

            try {

                response = await ai.models.generateContent({

                    model: "gemini-3.8-flash",

                    contents: prompt

                });

                break;

            } catch (err) {

                if (attempt === 3)
                    throw err;

                console.log(
                    `Retrying Gemini (${attempt}/3)...`
                );

                await new Promise(resolve =>
                    setTimeout(resolve, 3000)
                );

            }

        }

        const aiText = response.text;
        console.log(aiText);

        let questions;

        try {

            questions = JSON.parse(aiText);

        } catch (err) {

            return res.json({

                success: false,

                message: "AI returned invalid JSON."

            });

        }

        if (!Array.isArray(questions)) {

            return res.json({

                success: false,

                message: "AI response is not an array."

            });

        }

        let added = 0;
        let skipped = 0;

        for (const q of questions) {

            if (
                !q.question ||
                !q.options ||
                !q.category ||
                q.answer === undefined ||
                !q.difficulty
            ) {

                skipped++;

                continue;

            }

            if (!Array.isArray(q.options)) {

                skipped++;

                continue;

            }

            if (q.options.length !== 4) {

                skipped++;

                continue;

            }

            if (q.answer < 0 || q.answer > 3) {

                skipped++;

                continue;

            }

            const exists = await Question.findOne({

                question: q.question

            });

            if (exists) {

                skipped++;

                continue;

            }
            await Question.create({

                category: q.category,

                question: q.question,

                options: q.options,

                answer: q.answer,

                difficulty: q.difficulty,

                source: "AI",

                createdByAI: true

            });

            added++;

        }

        return res.json({

            success: true,

            added,

            skipped,

            total: questions.length

        });

    } catch (err) {

        console.error(err);

        return res.json({

            success: false,

            message: "Server error."

        });

    }

};
