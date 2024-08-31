import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleImg from "../../assets/google.png";
import "./loginwithgoogle.css";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export function LoginWithGoogle() {
  const navigate = useNavigate();

  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          // lastName: user.displayName,
          photo: user.photoURL,
        });

        navigate("/home");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  }

  return (
    <div className="googleLogin">
      <button
        onClick={googleLogin}
        className="w-50 border border-0 btn btn-text"
      >
        Login with <img src={GoogleImg} alt="Google" className="mb-1" />
      </button>
    </div>
  );
}
