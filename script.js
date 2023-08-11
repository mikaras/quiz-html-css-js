
let currentQuestion = 0;
let score = 0;
let totQuestions = questions.length;

let container = document.getElementById('quizContainer');
let questionEl = document.getElementById('question');
let opt1 = document.getElementById('opt1');
let opt2 = document.getElementById('opt2');
let opt3 = document.getElementById('opt3');
let opt4 = document.getElementById('opt4');
let nextButton = document.getElementById('nextButton');
let restartButton = document.getElementById('restartButton');
let resultCount = document.getElementById('result');
let resultMessage = document.getElementById('message');
let answerElements = document.querySelectorAll('.answer');
let answers = [];
let sortQuestions;

restartButton.addEventListener('click', restartGame);

function restartGame() {
  container.style.display = '';
	result_box.style.display = 'none';
  currentQuestion = 0;
  answers.length = 0;
  score = 0;
  questions.sort(() => Math.random() - .5)
  //console.log(questions);
  clearLabelClass();
  loadQuestion(currentQuestion);
} 

function loadQuestion (questionIndex) {
  let q = questions[questionIndex];
  //console.log(q);
  questionEl.textContent = (questionIndex + 1) + '. ' + q.question;
	opt1.textContent = q.option1;
	opt2.textContent = q.option2;
	opt3.textContent = q.option3;
	opt4.textContent = q.option4;
};

function changeLabelBG() {
  
  answerElements.forEach(function(selected) {
    selected.addEventListener("change", function() {
      answerElements.forEach(function(node) {
        node.parentElement.classList.remove('active');
      })
      selected.parentElement.classList.add('active');  
    });
  });
}
changeLabelBG();

function loadNextQuestion() {
	let selectedOption = document.querySelector('input[type=radio]:checked');
	
	//check that question has been answered
	if(!selectedOption){
		alert('Muistahan tehdä valinta!');
		return;
	}
    	
	let answer = selectedOption.value;
  //console.log(answer);
  
  answers.push(answer);
  /*for(let i=0; i<answers.length; i++){
    console.log(i + " . " + answers[i]);
  }*/

	if(questions[currentQuestion].answer == answer){ 	//if answer is right get point
		score++;
  }
	
	selectedOption.checked = false;
	currentQuestion++;

	if(currentQuestion == totQuestions - 1){		
		nextButton.textContent = 'Näytä tulos';
	} else {
    nextButton.textContent = 'Seuraava kysymys';
  }
	
	//Check if all questions are answered and then show the result
	if(currentQuestion == totQuestions){
		container.style.display = 'none';
		result_box.style.display = '';
		resultMessage.textContent = range(score);
		resultCount.textContent = 'Tulos: ' + score + ' / 8 ';
		return;
	}

	loadQuestion(currentQuestion);
  
  clearLabelClass();
}

loadQuestion(currentQuestion);

function clearLabelClass(){
  answerElements.forEach(function(node) {
    node.parentElement.classList.remove('active');
  })
}

function restartGame() {
  container.style.display = '';
	result_box.style.display = 'none';
  currentQuestion = 0;
  answers.length = 0;
  score = 0;
  questions.sort(() => Math.random() - .5)
  //console.log(questions);
  clearLabelClass();
  loadQuestion(currentQuestion);
} 
  
//function show message depends on how many points user got
function range(score){

	let messages = ["Loistavaa! Olitko lomalla kisojen ajan? ;)", "Kiitettävää penkkiurheilua!", "Hyvä, ehdit hetkeksi istahtaa sohvalle kisojen aikana!", "Ohhoh, ehditkö seurata kisoja?"];
	let range;

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

//show questions and right answers
function showAnswers(arr) {

	let out = "";
	let i;
	let a;
  let b;

  for(i = 0; i < arr.length; i++){
    if (arr[i].answer == 1){
      a = arr[i].option1;
    } else if (arr[i].answer == 2){
      a = arr[i].option2;
    } else if (arr[i].answer == 3){
      a = arr[i].option3;
    } else if(arr[i].answer == 4){
      a = arr[i].option4;
    }
    
    if(answers[i] == 1){
      b = arr[i].option1;
    } else if (answers[i] == 2){
      b = arr[i].option2;
    } else if (answers[i] == 3){
      b = arr[i].option3;
    } else if (answers[i] == 4){
      b = arr[i].option4;
    }

    if (a == b ){
      console.log("Green");
      color = "green";
    } else {
      console.log("Red");
      color = "#933A16";
    }

  let userAnswer = '<span style="color:'+color+'">'+b+'</span>';

    out += arr[i].question + '<br> ' + a + "<br> ( " + userAnswer + " ) " +'<br><br>';
  }

  document.getElementById("answers").innerHTML = out;
}


/*Modal for the right answers*/

// Get the modal
let modal = document.getElementById('answersModal');

// Button that opens the modal
let btn = document.getElementById("answerButton");

// Element which closes the modal
let span = document.getElementsByClassName("close")[0];

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


