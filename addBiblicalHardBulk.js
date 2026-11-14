const mongoose = require("mongoose");
const Question = require("./models/Question");

require("dotenv").config();

const questions = [

	{
		category:"Biblical",
		question:"Which king of Judah discovered the Book of the Law during temple repairs?",
		options:["Josiah","Hezekiah","Manasseh","Rehoboam"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the prophet who confronted King Ahab and Jezebel?",
		options:["Elijah","Elisha","Nathan","Samuel"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which judge made a vow before defeating the Ammonites?",
		options:["Jephthah","Gideon","Samson","Barak"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of King Hezekiah?",
		options:["Ahaz","Uzziah","Jotham","Josiah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet saw a vision of a valley of dry bones?",
		options:["Ezekiel","Daniel","Isaiah","Jeremiah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the priest who raised Samuel in the temple?",
		options:["Eli","Aaron","Zadok","Abiathar"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king was defeated after seeking help from a medium?",
		options:["Saul","David","Solomon","Ahab"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the prophet sent to anoint Jehu as king?",
		options:["A prophet's son sent by Elisha","Samuel","Nathan","Isaiah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which book describes the rebuilding of the temple after exile?",
		options:["Ezra","Nehemiah","Esther","Daniel"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the mother of Samuel?",
		options:["Hannah","Peninnah","Elizabeth","Miriam"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},
	{
		category:"Biblical",
		question:"Which prophet rebuked David after his sin with Bathsheba?",
		options:["Nathan","Samuel","Elijah","Gad"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of John the Baptist?",
		options:["Zechariah","Jairus","Simeon","Nicodemus"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king of Israel was married to Jezebel?",
		options:["Ahab","Saul","Jeroboam","Omri"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who interpreted the handwriting on the wall for King Belshazzar?",
		options:["Daniel","Joseph","Ezra","Nehemiah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet challenged the prophets of Baal on Mount Carmel?",
		options:["Elijah","Elisha","Isaiah","Jeremiah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of King David?",
		options:["Jesse","Kish","Samuel","Saul"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which judge defeated the Midianites with only 300 men?",
		options:["Gideon","Samson","Jephthah","Othniel"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet was taken to heaven without dying?",
		options:["Elijah","Moses","Enoch","Isaiah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the king of Babylon when Jerusalem was destroyed?",
		options:["Nebuchadnezzar","Cyrus","Darius","Belshazzar"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which book records Paul's missionary journeys?",
		options:["Acts","Romans","Galatians","Hebrews"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was Paul's teacher before his conversion?",
		options:["Gamaliel","Nicodemus","Barnabas","Stephen"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which apostle had a vision of a sheet with animals?",
		options:["Peter","Paul","John","James"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first high priest of Israel?",
		options:["Aaron","Eli","Samuel","Zadok"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet was swallowed by a great fish?",
		options:["Jonah","Amos","Micah","Nahum"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the Roman governor who questioned Jesus?",
		options:["Pontius Pilate","Felix","Festus","Herod"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which disciple betrayed Jesus with a kiss?",
		options:["Judas Iscariot","Peter","Thomas","Andrew"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first king of Israel?",
		options:["Saul","David","Solomon","Samuel"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king built the temple in Jerusalem?",
		options:["Solomon","David","Hezekiah","Josiah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was thrown into the lions' den?",
		options:["Daniel","Jeremiah","Ezekiel","Isaiah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which apostle was known as the physician?",
		options:["Luke","Matthew","Mark","John"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},
	{
		category:"Biblical",
		question:"Which prophet was thrown into a cistern because of his message?",
		options:["Jeremiah","Isaiah","Ezekiel","Daniel"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of King Solomon's mother Bathsheba?",
		options:["Eliam","Jesse","Kish","Nathan"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king saw God's hand writing on the wall?",
		options:["Belshazzar","Nebuchadnezzar","Cyrus","Darius"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the prophet who married an unfaithful woman as a symbol?",
		options:["Hosea","Joel","Amos","Obadiah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which book tells about the rebuilding of Jerusalem's walls?",
		options:["Nehemiah","Ezra","Esther","Chronicles"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of King Saul?",
		options:["Kish","Jesse","Abner","Samuel"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which judge was known for great strength?",
		options:["Samson","Gideon","Barak","Jephthah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king had a dream interpreted by Daniel about a great statue?",
		options:["Nebuchadnezzar","Cyrus","Darius","Herod"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first Christian martyr?",
		options:["Stephen","James","Peter","Paul"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which apostle wrote the book of Revelation?",
		options:["John","Peter","Paul","James"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who helped Paul escape from Damascus in a basket?",
		options:["His followers","Peter","Barnabas","Silas"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which church received the warning about being lukewarm?",
		options:["Laodicea","Ephesus","Corinth","Rome"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the mother of John the Baptist?",
		options:["Elizabeth","Mary","Anna","Martha"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet saw a vision of four living creatures?",
		options:["Ezekiel","Isaiah","Jeremiah","Amos"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the king who asked God for wisdom?",
		options:["Solomon","David","Saul","Josiah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which apostle was chosen to replace Judas?",
		options:["Matthias","Paul","Barnabas","Silas"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of John the Baptist?",
		options:["Zechariah","Joseph","Jesse","Jacob"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet confronted the prophets of Baal?",
		options:["Elijah","Elisha","Samuel","Nathan"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first man created according to Genesis?",
		options:["Adam","Noah","Abraham","Moses"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which disciple was known as 'Doubting Thomas'?",
		options:["Thomas","Peter","James","Philip"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},{
		category:"Biblical",
		question:"Which prophet anointed David as king?",
		options:["Samuel","Nathan","Elijah","Elisha"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of Isaac?",
		options:["Abraham","Jacob","Joseph","Moses"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which woman became queen and saved Israel from destruction?",
		options:["Esther","Ruth","Deborah","Rahab"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the prophet who succeeded Elijah?",
		options:["Elisha","Samuel","Isaiah","Jeremiah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king of Judah was healed after praying to God?",
		options:["Hezekiah","Josiah","Uzziah","Manasseh"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who interpreted Pharaoh's dreams?",
		options:["Joseph","Daniel","Moses","Aaron"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which book contains the story of Job?",
		options:["Job","Psalms","Proverbs","Ecclesiastes"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of John Mark?",
		options:["Unknown","Barnabas","Peter","Paul"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which apostle was called the beloved disciple?",
		options:["John","Peter","James","Matthew"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the first woman created?",
		options:["Eve","Sarah","Mary","Rachel"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king was famous for his many wives?",
		options:["Solomon","David","Saul","Ahab"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who led Israel into the Promised Land after Moses?",
		options:["Joshua","Caleb","Aaron","Samuel"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which city was destroyed after the Israelites marched around it?",
		options:["Jericho","Jerusalem","Samaria","Nineveh"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the mother of Jesus?",
		options:["Mary","Elizabeth","Martha","Anna"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which disciple cut off the servant's ear?",
		options:["Peter","John","James","Andrew"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the governor who allowed Jesus' crucifixion?",
		options:["Pontius Pilate","Herod","Felix","Festus"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which apostle was formerly a persecutor of Christians?",
		options:["Paul","Peter","Thomas","Matthew"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was swallowed by a great fish?",
		options:["Jonah","Amos","Micah","Joel"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which king wrote many proverbs?",
		options:["Solomon","David","Saul","Hezekiah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was known as the father of many nations?",
		options:["Abraham","Isaac","Jacob","Noah"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet was called the weeping prophet?",
		options:["Jeremiah","Isaiah","Ezekiel","Daniel"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the brother of Moses?",
		options:["Aaron","Joshua","Caleb","Samuel"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which book tells about the early church?",
		options:["Acts","Romans","Hebrews","Revelation"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Who was the father of Jacob?",
		options:["Isaac","Abraham","Joseph","David"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},

	{
		category:"Biblical",
		question:"Which prophet was taken to heaven in a chariot of fire?",
		options:["Elijah","Elisha","Moses","Samuel"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},{
		category:"Biblical",
		question:"Who saw Jesus transfigured on the mountain?",
		options:["Peter, James and John","Matthew and Mark","Paul and Barnabas","Thomas and Andrew"],
		answer:0,
		difficulty:"Hard",
		source:"Manual",
		createdByAI:false
	},
];

mongoose.connect(process.env.MONGODB_URI)
.then(async()=>{

	await Question.insertMany(questions);

	console.log("Hard Biblical bulk added!");

	process.exit();

})
.catch(err=>{
	console.log(err);
	process.exit();
});
