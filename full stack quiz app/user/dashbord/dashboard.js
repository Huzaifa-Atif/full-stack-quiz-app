import { collection, db, getDocs } from "../../firebase.js";

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});

const card = document.getElementById("card");
const QuizListing = async () => {
  try {
    const docSnap = await getDocs(collection(db, "Quizzes"));

    docSnap.forEach((doc) => {
      const data = doc.data();
      if (data.isActive === true) {
        card.innerHTML += `  
       <div id="card">
            <div id="content">
                <h1>01</h1>
                <h3>${data.category}</h3>
                <p>${data.tittle}</p>
                <button id= "${doc.id}" class="active-btn" onclick= "navigate(this)"> Start Quiz <span class="glow"></span></button>
            </div>
        </div>`;
      }
    });
  } catch (error) {
    console.log("error", error.message);
    alert(error.message);
  }
};

const navigate = (ele) => {
  sessionStorage.setItem("QuizId", ele.id);
  window.location.assign("../dashbord/QuizApp/quizapp.html");
};
window.navigate = navigate;
window.QuizListing = QuizListing;
