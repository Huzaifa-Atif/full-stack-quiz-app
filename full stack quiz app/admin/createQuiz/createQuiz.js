import { addDoc, collection, db } from "../../firebase.js";

const QuizArr = [];

const CreateQuizHandler = async () => {
  try {
    const QuizTittle = document.querySelector(".QuizTittle").value.trim();
    const QuizCategory = document.querySelector(".QuizCategory").value.trim();

    const saveObj = {
      tittle: QuizTittle,
      category: QuizCategory,
      Questions: QuizArr,
      isActive: false,
    };

    const response = await addDoc(collection(db, "Quizzes"), saveObj);
  } catch (error) {
    alert(error.message);
  }
};

const AddQuestionsHandler = () => {
  const QuestionText = document.getElementById("QuestionText").value.trim();
  const option1 = document.getElementById("option1").value.trim();
  const option2 = document.getElementById("option2").value.trim();
  const option3 = document.getElementById("option3").value.trim();
  const option4 = document.getElementById("option4").value.trim();
  const CorrectAns = document.getElementById("CorrectAns").value.trim();

  if (
    !QuestionText ||
    !option1 ||
    !option2 ||
    !option3 ||
    !option4 ||
    !CorrectAns
  ) {
    alert("Required fields are not filled!");
    return;
  }

  const QuizObj = {
    QuestionText,
    options: [option1, option2, option3, option4],
    CorrectAns,
  };

  QuizArr.push(QuizObj);

  document.getElementById("QuestionText").value = "";
  document.getElementById("option1").value = "";
  document.getElementById("option2").value = "";
  document.getElementById("option3").value = "";
  document.getElementById("option4").value = "";
  document.getElementById("CorrectAns").value = "";
};

window.CreateQuizHandler = CreateQuizHandler;
window.AddQuestionsHandler = AddQuestionsHandler;
