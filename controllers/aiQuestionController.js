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

Difficulty:
${difficulty}

Category:
${category}

Generate ONLY questions from the category above.

Every question MUST belong ONLY to the requested category.

Generate ONLY ${difficulty} questions.

Return ONLY valid JSON.

Do not return markdown.

Do not return explanations.

No mathematics calculations.

No offensive, political, gambling, adult or hateful content.

Questions must be suitable for players aged 13+.

Use simple English.

Do not repeat similar questions.

Every question must contain:

question

options

answer

category

difficulty

Exactly four options.

Only ONE option is correct.

The answer must be:

0
1
2
or
3

Example:

[
{
"question":"Which city is the capital of Kenya?",
"options":[
"Nairobi",
"Mombasa",
"Kisumu",
"Nakuru"
],
"answer":0,
"category":"Kenya",
"difficulty":"Easy"
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
