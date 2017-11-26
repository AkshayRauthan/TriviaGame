
var num = 30;
var intervalId;
var numOfCorrectAns = 0;
var numOfIncorrectAns = 0;
var numOfAttempts = 0;

var displayRemainingTime = function(num){
	// console.log("In the time remaining fuction");
	if(num === 0){
		$("#time-up").text("Time is up!!");	
		resetInterval();
		//displayPrompt();
		processResults();
		displayModal();
		putResults();
	}
	$("#time-remaining").text(num + " secs");
	// console.log("Exiting");
}

$(document).ready(function(){
	console.log("document loaded");
	buildQuestions();
	runTimer();

	$("#modal-close").click(function(){
		closeModal();
	});

	$("#modal-restart").click(function(){
		restartGame();
	});

	// $("input:radio").click(function(){
	// 	var radioName = $(this).attr('name');
	// 	var radioValue = $(this).attr('value');
	// 	processAnswer(radioName, radioValue);
	// });
    // $("input[name=president]").click(function(){
    // 	alert("Radio clicked - " + $("input[name=president]:checked").val());
    // });
});

var processResults = function(){
	// $("#questions input[type='radio']:checked").val();
	//console.log($("#questions").children("div").length);
	$("#questions").children("div").each(function(ele){
		var divId = $(this).attr("id");
		var radioName = divId;
		var radioValue = $("input[name="+radioName+"]:checked").val();
		if(radioValue)
			processAnswer(radioName, radioValue);
	});	
	numOfAttempts = parseInt(numOfCorrectAns) + parseInt(numOfIncorrectAns);
}

var putResults = function(){
	$("#correct-answers").text(numOfCorrectAns);
	$("#incorrect-answers").text(numOfIncorrectAns);
	$("#attempted-questions").text(numOfAttempts);
}

var processAnswer = function(radioName, radioValue){
	console.log("In the process answer function");
	var matchFound = false;
	questions.forEach(function(ele){
		if(ele.name===radioName && ele.correctAns===radioValue){
			//alert("Correct Answer!!");
			matchFound = true;
			return;
		}
	});


	if(matchFound){
		numOfCorrectAns = parseInt(numOfCorrectAns) + 1;
	}else{
		numOfIncorrectAns = parseInt(numOfIncorrectAns) + 1;
	}
	console.log("Exiting process answer function - " + numOfCorrectAns + " " + numOfIncorrectAns);
}

var runTimer = function(){
	displayRemainingTime(num);
	intervalId = setInterval(decrement, 1000);
}

var decrement = function(){
	num--;
	displayRemainingTime(num);
}

var resetInterval = function(){
	clearInterval(intervalId);
}

var displayPrompt = function(){
	if(confirm("Do you want to restart the game?")){
		window.location.href = "index.html";
	}
	else{
		return false;
	}
}

var displayModal = function(){
	$("#modal-window").css({"display": "block"});
}

window.onclick = function(){
	closeModal();
}

var closeModal = function(){
	$("#modal-window").css({"display": "none"});
}

var restartGame = function(){
	console.log("In restart function");
	window.location.href = "index.html";
	console.log("Existing restart function");
}

var questions = [
{
	text: "Which franchise was the oldest in professional football history?",
	name: "first",
	answers: [
	{ans: "Chicago Bears"},
	{ans: "New York Giants"},
	{ans: "Green Bay Packers"},
	{ans: "Arizona Cardinals"}
	],
	correctAns: "Arizona Cardinals"
},
{
	text: "The first recorded NFL season occurred in 1920. Only two of those franchises survived. One was the Chicago Bears. But they weren't called the Bears, and they weren't in Chicago in 1920. What were the Bears called in 1920?",
	name: "second",
	answers: [
	{ans: "Dayton Triangles"},
	{ans: "Muncie Flyers"},
	{ans: "Decatur Staleys"},
	{ans: "Hammond Pros"}
	],
	correctAns: "Decatur Staleys"	
},
{
	text: "Which team entered the league in 1921?",
	name: "third",
	answers: [
	{ans: "Detroit Lions"},
	{ans: "Philadelphia Eagles"},
	{ans: "Washington Redskins"},
	{ans: "Green Bay Packers"}
	],
	correctAns: "Green Bay Packers"
},
{
	text: "The initial name of the Detroit Lions was the Spartans. What city did they start in?",
	name: "fourth",
	answers: [
	{ans: "Lansing, MI"},
	{ans: "Portsmouth, OH"},
	{ans: "Detroit, MI"},
	{ans: "Muncie, IN"}
	],
	correctAns: "Portsmouth, OH"
},
{
	text: "The Boston Braves entered the NFL in 1932. They changed their name in 1937 to what?",
	name: "fifth",
	answers: [
	{ans: "Washington Redskins"},
	{ans: "New York Jets"},
	{ans: "New England Patriots"},
	{ans: "Atlanta Falcons"}
	],
	correctAns: "Washington Redskins"
},
{
	text: "The Rams franchise entered the league in 1937. What city hosted the Rams for their early years?",
	name: "sixth",
	answers: [
	{ans: "Cleveland"},
	{ans: "Los Angeles"},
	{ans: "St. Louis"},
	{ans: "Milwaukee"}
	],
	correctAns: "Cleveland"
},
{
	text: "Art Rooney was the legendary long-time owner of the Pittsburgh Steelers. But what other team did he also partially own for a brief period of time?",
	name: "seventh",
	answers: [
	{ans: "Cleveland Browns"},
	{ans: "Denver Broncos"},
	{ans: "Washington Redskins"},
	{ans: "Philadelphia Eagles"}
	],
	correctAns: "Philadelphia Eagles"
},
{
	text: "World War II took a toll on the NFL. The Steelers were forced to merge with the Eagles in 1943. They also had to merge with another team in 1944. What team did they combine with that year?",
	name: "eigth",
	answers: [
	{ans: "Bears"},
	{ans: "Rams"},
	{ans: "Cardinals"},
	{ans: "Giants"}
	],
	correctAns: "Cardinals"
},
{
	text: "One team was actually forced to suspend operations for a year during World War II. Who was forced to take this drastic measure?",
	name: "ninth",
	answers: [
	{ans: "Packers"},
	{ans: "Browns"},
	{ans: "Rams"},
	{ans: "Giants"}
	],
	correctAns: "Rams"
},
{
	text: "Robert Irsay is most remembered as the man that moved the Colts from Baltimore to Indianapolis under cover of darkness. But before he owned the Colts, what team did he own?",
	name: "tenth",
	answers: [
	{ans: "Denver Broncos"},
	{ans: "Los Angeles Rams"},
	{ans: "Dallas Cowboys"},
	{ans: "Houston Oilers"}
	],
	correctAns: "Los Angeles Rams"
}
];

var buildQuestions = function(){
	var name;
	var questionText;
	var questionHtml;
	var quesAns;
	for(var i=0; i<questions.length; i++){
		name = questions[i].name;
		questionText = questions[i].text;
		if(questionHtml){
			questionHtml = questionHtml + "<hr>" + "<div id=\""+ questions[i].name + "\">" +
			"<h4>" + questions[i].text + "</h4>";
		}else{
			questionHtml = "<hr>" + "<div id=\""+ questions[i].name + "\">" +
			"<h4>" + questions[i].text + "</h4>";			
		}
		
		quesAns = "";
		for(var j=0; j<questions[i].answers.length; j++){
			if(quesAns){
				quesAns = quesAns + 
				"<input type=\"radio\" name=\"" + questions[i].name + "\" value=\"" + questions[i].answers[j].ans + "\">" + questions[i].answers[j].ans;
			}else{
				quesAns = "<input type=\"radio\" name=\"" + questions[i].name + "\" value=\"" + questions[i].answers[j].ans + "\">" + questions[i].answers[j].ans;				
			}

		}

		questionHtml = questionHtml + quesAns + "</div>";
		
		// console.log(questionHtml);
	}

	$("#questions").html(questionHtml);
} 


