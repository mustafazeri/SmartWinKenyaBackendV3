const mongoose = require("mongoose");
const Question = require("./models/Question");

require("dotenv").config();

const questions = [

	{
		category:"Biblical",
		question:"Who was the father of Joseph?",
		options:["Jacob","Isaac","Abraham","Moses"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the brother of Moses?",
		options:["Aaron","David","Samuel","Peter"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the prophet taken to heaven in a chariot of fire?",
		options:["Elijah","Elisha","Isaiah","Jeremiah"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who followed Elijah as a prophet?",
		options:["Elisha","Samuel","Nathan","Jonah"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the queen who visited Solomon?",
		options:["Queen of Sheba","Queen Esther","Queen Mary","Queen Ruth"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who saved the Israelites from Haman's plan?",
		options:["Esther","Ruth","Mary","Deborah"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was a judge of Israel and a woman?",
		options:["Deborah","Esther","Miriam","Hannah"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was known as a man after God's own heart?",
		options:["David","Saul","Solomon","Moses"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What was the name of Jesus' hometown?",
		options:["Nazareth","Bethlehem","Jerusalem","Rome"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who carried Jesus' cross according to the Bible?",
		options:["Simon of Cyrene","Peter","John","Joseph"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What did Jesus calm on the sea?",
		options:["A storm","A fire","An earthquake","A flood"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was called the father of faith?",
		options:["Abraham","David","Noah","Paul"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first son of Adam and Eve?",
		options:["Cain","Abel","Seth","Noah"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who replaced Judas among the apostles?",
		options:["Matthias","Paul","Barnabas","Stephen"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the disciple known as the beloved disciple?",
		options:["John","Peter","Matthew","Thomas"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who wrote the Gospel of Luke?",
		options:["Luke","Paul","John","Peter"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first person to see Jesus after resurrection?",
		options:["Mary Magdalene","Peter","John","Thomas"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What did Jesus use during the Last Supper?",
		options:["Bread and wine","Fish and water","Milk and honey","Fruit"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"How many commandments did God give Moses?",
		options:["Ten","Five","Twelve","Seven"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first martyr of the church?",
		options:["Stephen","Paul","Peter","James"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was known for his dream interpretations?",
		options:["Daniel","David","John","Moses"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who survived the flood with his family?",
		options:["Noah","Abraham","Jacob","Joseph"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"What was Jesus' first miracle?",
		options:["Turning water into wine","Healing a blind man","Walking on water","Raising Lazarus"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was called Immanuel?",
		options:["Jesus","Moses","David","Isaac"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who preached to the people on the day of Pentecost?",
		options:["Peter","Paul","John","James"],
		answer:0,
		difficulty:"Easy",
		source:"Manual",
		createdByAI:false
	}

];
mongoose.connect(process.env.MONGODB_URI)
.then(async()=>{

	await Question.insertMany(questions);

	console.log("Easy Biblical complete bulk added!");

	process.exit();

})
.catch(err=>{
	console.log(err);
	process.exit();
});
