import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./logIn.css";
import { LoginWithGoogle } from "../loginwithgoogle/loginwithgoogle";
// import LoginWithGoogle from "../../assets/google.png";

export interface UserContract {
  Email: string;
  Password: string;
}

export function LogIn() {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["Email"]);
  const [user, setUser] = useState<UserContract>({ Email: "", Password: "" });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, user.Email, user.Password);
      setCookie("Email", user.Email);
      navigate("/home");
    } catch (error: any) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <section className="signIn-section">
      <div className="signIn_container">
        <div className="signIn_content">
          <div className="leftSide">
            <h4 className="Fz_logo text-danger">
              <Link to="/" className="text-decoration-none brand_text">
                One <span className="text-success">keep</span>
              </Link>
            </h4>
            <div className="signIn_title">
              <h3>Sign In</h3>
              <div className="sub-title">Use your Account</div>
            </div>
          </div>
          <div className="signIn_formSide">
            <form className="w-100" onSubmit={handleFormSubmit}>
              <TextField
                id="email"
                label="Email or Phone"
                variant="outlined"
                placeholder="Email or Phone"
                fullWidth
                focused
                name="Email"
                value={user.Email}
                onChange={handleChange}
              />
              <div className="password mt-4">
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  placeholder="Password"
                  fullWidth
                  focused
                  name="Password"
                  value={user.Password}
                  onChange={handleChange}
                />
              </div>
              <div className="footer-link ">
                <div>
                  <Link to="/" className="text-decoration-none">
                    Forgot Email
                  </Link>
                </div>
                <div>
                  New User ? {""}
                  <Link to="/register" className="text-decoration-none ">
                    Create account
                  </Link>
                </div>
              </div>
              <div className="form-footer mt-2">
                <div className="loginBtns">
                  <button type="submit" className="btn btn-primary  w-50">
                    Login
                  </button>
                  <LoginWithGoogle />
                  {/* <button className="w-50 border border-0 ms-2 btn btn-outline-secondary">
                    Login with <img src={LoginWithGoogle} alt="" />
                  </button> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
