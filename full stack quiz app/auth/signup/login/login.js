import {
  auth,
  db,
  signInWithEmailAndPassword,
  getDoc,
  doc,
} from "../../../firebase.js";

const loginHandler = async () => {
  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, "users", uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      alert("Login successful!");

      if (userData.type === "admin") {
        window.location.replace("../../../admin/dashbord/dashboard.html");
      } else {
        window.location.replace("../../../user/dashbord/dashboard.html");
      }
    } else {
      alert("User data not found in Firestore.");
    }
  } catch (error) {
    console.error("Login error:", error.message);
    if (error.code === "auth/invalid-credential") {
      alert("Invalid email or password. Please try again.");
    } else {
      alert("Login failed: " + error.message);
    }
  }
};

window.loginHandler = loginHandler;
