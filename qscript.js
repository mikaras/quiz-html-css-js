
var currentQuestion = 0;
var score = 0;
var totQuestions = questions.length;

var container = document.getElementById('quizContainer');
var questionEl = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');
var nextButton = document.getElementById('nextButton');
var resultCount = document.getElementById('result');
var resultMessage = document.getElementById('message');

function loadQuestion (questionIndex) {
	var q = questions[questionIndex];
	questionEl.textContent = (questionIndex + 1) + '. ' + q.question;
	opt1.textContent = q.option1;
	opt2.textContent = q.option2;
	opt3.textContent = q.option3;
	opt4.textContent = q.option4;
};

function loadNextQuestion () {
	var selectedOption = document.querySelector('input[type=radio]:checked');
	
	//check that question has been answered
	if(!selectedOption){
		alert('Muistahan tehdä valinta!');
		return;
	}
	
	var answer = selectedOption.value;
	if(questions[currentQuestion].answer == answer){ 	//if answer is right get point
		score++;
	}
	
	selectedOption.checked =false;
	currentQuestion++;
	if(currentQuestion == totQuestions - 1){		//if all questions has answered show result button
		nextButton.textContent = 'Näytä tulos';
	}
	
	//Check all questions are answered and show result
	if(currentQuestion == totQuestions){
		container.style.display = 'none';
		result_box.style.display = '';
		resultMessage.textContent = range(score);
		resultCount.textContent = 'Tulos: ' + score + ' / 8 ';
		return;
	}

	loadQuestion(currentQuestion);
}
loadQuestion(currentQuestion);


//function show message depends on how many points user got
function range(score){

	var messages = ["Loistavaa! Olitko lomalla kisojen ajan? ;)", "Kiitettävää penkkiurheilua!", "Hyvä, ehdit hetkeksi istahtaa sohvalle kisojen aikana!", "Ohhoh, ehditkö seurata kisoja?"];
	var range;

	if(score <= 2){
		range = 3;
	}
	if (score >= 3 && score <= 4) {
		range = 2;
	}
	if (score >= 5 && score <= 6){
		range = 1;
	}
	if (score >= 7 && score <= 8){
		range = 0;
	}

	return messages[range];
}

/*
//function open questions and right answers
function showAnswerButton() {
	var x = document.getElementById("answers");

	if (x.style.display === "block") {
		x.style.display = 'none';
	} else {
		x.style.display = 'block';
		showAnswers(questions);
	}

}*/

//show questions and right answers
function showAnswers(arr) {

	var out = "";
	var i;
	var a;
		for(i = 0; i < arr.length; i++){
			if(arr[i].answer == 1){
				a = arr[i].option1;
			}if(arr[i].answer == 2){
				a = arr[i].option2;
			}if(arr[i].answer == 3){
				a = arr[i].option3;
			}if(arr[i].answer == 4){
				a = arr[i].option4;
			}
			out += arr[i].question + '<br> ' + a + '<br><br>';
		}
		document.getElementById("answers").innerHTML = out;
}

/*Modal for the right answers*/

// Get the modal
var modal = document.getElementById('answersModal');

// Button that opens the modal
var btn = document.getElementById("answerButton");

// Element which closes the modal
var span = document.getElementsByClassName("close")[0];

// Open the modal
btn.onclick = function() {
    modal.style.display = "block";
    showAnswers(questions);
}

// Close the modal after user click on X
span.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when user clicks outside of the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 


