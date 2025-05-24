import { getDoc, doc, db, addDoc, collection } from "../../../firebase.js";

var questionElement = document.getElementById("questionElement");
var optionElement = document.getElementById("optionElement");
const nextbtn = document.getElementById("nextbtn");
const totalCount = document.getElementById("totalCount");
var currentQuesCount = document.getElementById("currentQuesCount");

let questions = [];
let indexnum = 0;
let quizTitle = "";
let score = 0;

const QuizId = async () => {
  try {
    const QuizID = sessionStorage.getItem("QuizId");

    if (QuizID === null) {
      window.location.replace("../../dashbord/dashboard.html");
      return;
    }
    const DocSnap = await getDoc(doc(db, "Quizzes", QuizID));
    quizTitle = DocSnap.data().tittle;

    questions = DocSnap.data().Questions;
    return questions;
  } catch (error) {
    return error.message;
  }
};

QuizId()
  .then((response) => {
    questions = response;
    totalCount.innerHTML = questions.length;
    handleQuestion();
  })

  .catch((error) => {
    console.log(error, "error");
  });

const handleQuestion = () => {
  var optionsObj = questions[indexnum].options;
  var questionTittle = questions[indexnum].QuestionText;

  questionElement.innerHTML = questionTittle;
  optionElement.innerHTML = "";
  for (var key in optionsObj) {
    optionElement.innerHTML += `<li onclick="checkAnswer(this)" >${optionsObj[key]}</li>`;
  }

  currentQuesCount.innerHTML = indexnum + 1;
};

var second = document.getElementById("Sec");
var minHeading = document.getElementById("Min");

var sec = 60;
var min = 2;

var interval = setInterval(timer, 1000);
function timer() {
  if (sec === 0) {
    if (min > 0) {
      min--;
      sec = 60;
    } else {
      clearInterval(interval);
      alert("Time's up! The quiz is over.");
      quizContainer.style.display = "none";
      onsubmit();
    }
  }

  sec--;
  second.innerHTML = sec < 10 ? `0${sec}` : sec;
  minHeading.innerHTML = min < 10 ? `0${min}:` : `${min}:`;
}

const nextbutton = () => {
  indexnum++;

  if (indexnum < questions.length) {
    handleQuestion();
    nextbtn.disabled = true;
  } else {
    nextbtn.innerHTML = "Submit";
    quizContainer.style.display = "none";
    onsubmit();
  }
};

const checkAnswer = (ele) => {
  const allLiElement = optionElement.children;
  const correctans = questions[indexnum].CorrectAns;

  if (ele.innerHTML === correctans) {
    ele.style.backgroundColor = "green";
    score++;
  } else {
    ele.style.backgroundColor = "red";
  }

  for (var i = 0; i < allLiElement.length; i++) {
    if (allLiElement[i].innerHTML === correctans) {
      allLiElement[i].style.backgroundColor = "green";
      break;
    }
  }

  for (var i = 0; i < allLiElement.length; i++) {
    allLiElement[i].style.pointerEvents = "none";
  }
  nextbtn.disabled = false;
};

const onsubmit = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const scoreObj = {
      totalQues: questions.length,
      score: score,
      wrongAns: questions.length - score,
      per: (score / questions.length) * 100,
      QuizId: sessionStorage.getItem("QuizId"),
      UserId: user.uid,
      UserName: user.username,
      quizTitle: quizTitle,
    };
    const response = await addDoc(collection(db, "Scores"), scoreObj);

    // Update the result container
    document.getElementById(
      "scores"
    ).children[0].innerHTML = `Quiz Name : ${quizTitle}`;
    document.getElementById(
      "scores"
    ).children[1].innerHTML = `Total Questions : ${questions.length}`;
    document.getElementById(
      "scores"
    ).children[2].innerHTML = `Correct Answer : ${score}`;
    document.getElementById("scores").children[3].innerHTML = `Wrong Answer : ${
      questions.length - score
    }`;
    document.getElementById("scores").children[4].innerHTML = `Percentage : ${
      (score / questions.length) * 100
    }%`;

    // Show the result container
    document.getElementById("resultContainer").style.display = "block";
  } catch (error) {
    return error.message;
  }
};

window.checkAnswer = checkAnswer;
window.nextbutton = nextbutton;
window.onsubmit = onsubmit;
