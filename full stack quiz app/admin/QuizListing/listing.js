import { collection, getDocs, db, updateDoc, doc } from "../../firebase.js";
const parent = document.getElementById("card");
const getQuizList = async () => {
  try {
    const quizSnap = await getDocs(collection(db, "Quizzes"));
    parent.innerHTML = "";
    quizSnap.forEach((doc) => {
      const quizObj = { ...doc.data(), id: doc.id };

      parent.innerHTML += `    
    <div id="card">
        <div id="card">
            <div id="content">
              <h1>1</h1>
              <h3>${quizObj.category}</h3>
              <p>${quizObj.tittle}</p>
              ${
                quizObj.isActive == true
                  ? `<button id= ${doc.id} onclick= "ToggleButton(this, 'Active')" class="active-btn"> Active <span class="glow"></span></button>`
                  : `<button id= ${doc.id} onclick= "ToggleButton(this, 'inActive')" class="inactive-btn">Inactive</button>`
              }
          </div>
      </div>
  </div>`;
    });
  } catch (error) {
    console.error("Error", error);
  }
};

const ToggleButton = async (ele, status) => {
  const cardId = ele.id;

  await updateDoc(doc(db, "Quizzes", cardId), {
    isActive: status === "Active" ? false : true,
  });
  getQuizList();
};
window.getQuizList = getQuizList;
window.ToggleButton = ToggleButton;
