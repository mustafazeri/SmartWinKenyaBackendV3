const mongoose = require("mongoose");
const Question = require("./models/Question");

require("dotenv").config();

const questions = [

	{
		category:"Biblical",
		question:"Who created the heavens and the earth?",
		options:["God","Moses","David","Adam"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first man created by God?",
		options:["Adam","Noah","Abraham","Peter"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first woman created by God?",
		options:["Eve","Mary","Sarah","Ruth"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who built the ark?",
		options:["Noah","Moses","David","Solomon"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Jesus' mother?",
		options:["Mary","Martha","Elizabeth","Sarah"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"In which town was Jesus born?",
		options:["Bethlehem","Jerusalem","Nazareth","Rome"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"How many disciples did Jesus have?",
		options:["12","10","7","40"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who defeated Goliath?",
		options:["David","Saul","Samuel","Joshua"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who received the Ten Commandments from God?",
		options:["Moses","Noah","Paul","Peter"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What is the first book of the Bible?",
		options:["Genesis","Exodus","Matthew","Psalms"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	}

];


mongoose.connect(process.env.MONGODB_URI)
.then(async()=>{

	console.log("MongoDB Connected");

	await Question.insertMany(questions);

	console.log("Easy Biblical questions added!");

	process.exit();

})
.catch(err=>{
	console.log(err);
	process.exit();
});
