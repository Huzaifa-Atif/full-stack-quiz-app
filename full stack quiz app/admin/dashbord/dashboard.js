const Authcheck = () => {
  const user = localStorage.getItem("user");

  if (!user || user === "null" || user === "undefined") {
    window.location.replace("../../index.html");
  }
};

import { db, collection, getDocs } from "../../firebase.js";

window.Authcheck = async function () {
  await getCounts();
};

async function getCounts() {
  const quizSnap = await getDocs(collection(db, "quizzes"));
  document.getElementById("quiz-count").textContent = quizSnap.size;

  const userSnap = await getDocs(collection(db, "users"));
  document.getElementById("user-count").textContent = userSnap.size;
}

window.Authcheck = Authcheck;
