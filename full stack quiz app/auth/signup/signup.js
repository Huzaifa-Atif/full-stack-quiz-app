import { auth, db, createUserWithEmailAndPassword, setDoc, doc } from "../../firebase.js";

const signupHandler = async () => {
  try {
    const FirstName = document.getElementById("FirstName").value.trim();
    const LastName = document.getElementById("LastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!FirstName || !LastName || !email || !password) {
      alert("All fields are required!");
      return;
    }

    const userObj = {
      FirstName: FirstName,
      LastName: LastName,
      email: email,
      type: "user",  
      isBlock: false,
      isDelete: false
    };

    const authResponse = await createUserWithEmailAndPassword(auth, email, password);
    console.log("authResponse", authResponse);

    await setDoc(doc(db, "users", authResponse.user.uid), userObj);
    alert("User signed up successfully!");
    window.location.replace("../../index.html");
  } catch (error) {
    console.error("Error during signup:", error.message);
    alert(error.message);
  }
};

window.signupHandler = signupHandler;
