const Question = require("../models/Question");
const axios = require("axios");

const TARGET_PER_POOL = 100;
const BATCH_SIZE = 25;

const DIFFICULTIES = [
    "Easy",
    "Medium",
    "Hard",
    "Expert"
];

const CATEGORIES = [
    "Kenya",
    "Africa",
    "World",
    "Science",
    "Technology",
    "History",
    "Agriculture",
    "Sports",
    "Entertainment",
    "Business",
    "English",
    "Driving",
    "IQ"
];

async function generateQuestions(difficulty, category, amount) {

    try {

        console.log(
            `Generating ${amount} ${difficulty} ${category} questions...`
        );

        await axios.post(
            "http://localhost:10000/ai/generateQuestions",
            {
                amount,
                difficulty,
                category
            }
        );

    } catch (err) {

        console.log(
            `Generation failed for ${difficulty} ${category}`
        );

    }

}

async function checkQuestionBank() {

	    console.log("==================================");
	    console.log("Checking AI Question Bank...");
	    console.log("==================================");

	    let jobFound = false;

	    for (const difficulty of DIFFICULTIES) {

		            if (jobFound) break;

		            for (const category of CATEGORIES) {

				                const count = await Question.countDocuments({
							                difficulty,
							                category
							            });

				                console.log(`${difficulty} | ${category} = ${count}`);

				                if (count < TARGET_PER_POOL) {

							                const needed = Math.min(
										                    TARGET_PER_POOL - count,
										                    BATCH_SIZE
										                );

							                await generateQuestions(
										                    difficulty,
										                    category,
										                    needed
										                );

							                jobFound = true;

							                break;

							            }

				            }

		        }

	    console.log("Question Bank Check Finished.");

}
module.exports = {
	    checkQuestionBank
};
