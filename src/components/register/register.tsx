import { useNavigate } from "react-router-dom";
import "./register.css";
import { Navmenu } from "../nav/nav";
import { Alert, CircularProgress, TextField } from "@mui/material";
import { RegisterContracts } from "../../contracts/RegisterContracts";
import { useCookies } from "react-cookie";
import { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { LoginWithGoogle } from "../loginwithgoogle/loginwithgoogle";

export function Register() {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies<string>(["Fname", "Lname", "Email"]);

  // Initialize the form state with the RegisterContracts interface
  const [formData, setFormData] = useState<RegisterContracts>({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });

  const [btnText, setBtnText] = useState<string | JSX.Element>(
    "Create Account"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function handleLoginBtn() {
    navigate("/login");
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setBtnText(<CircularProgress size={24} color="inherit" />);
    setError(null);

    try {
      const { FirstName, LastName, Email, Password } = formData;

      await createUserWithEmailAndPassword(auth, Email, Password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: FirstName,
          lastName: LastName,
          displayName: "",
          photo: "",
        });
        setCookie("Email", Email);
        setCookie("Fname", FirstName);
        setCookie("Lname", LastName);
      }
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      setLoading(false);
      setBtnText("Create Account");

      // Handle specific Firebase error codes
      if (error.code === "auth/email-already-in-use") {
        setError("Your email is already registered.");
      } else {
        setError(error.message);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="register">
      <Navmenu />
      <div className="register-container">
        <div className="p-2 alertBox">
          {error && <Alert severity="error">{error}</Alert>}
        </div>
        <div className="register-content">
          <div className="leftSide">
            <div className="title">
              <div className="brandTitle text-danger h2">
                One <span className="text-success">Keep</span>
              </div>
              <div className="subTitle h3">Create a Google Account</div>
              <div className="subText">Enter your information</div>
            </div>
          </div>
          <div className="registerForm">
            <form action="" className="form w-100" onSubmit={handleRegister}>
              <div className="mb-3 d-flex">
                <TextField
                  id="outlined-FirstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  focused
                  required
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleInputChange}
                  placeholder="Ram"
                  className="w-50 me-2"
                />

                <TextField
                  id="outlined-LastName"
                  label="Last Name (optional)"
                  variant="outlined"
                  fullWidth
                  focused
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleInputChange}
                  className="w-50 me-2"
                  placeholder="Kumar"
                />
              </div>
              <div className="">
                <TextField
                  id="outlined-Email"
                  label="Email"
                  type="email"
                  variant="filled"
                  fullWidth
                  focused={true}
                  required
                  name="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  className="w-100 me-2"
                  placeholder="example@gmail.com"
                />
                <TextField
                  id="outlined-Password"
                  label="Password"
                  type="password"
                  variant="filled"
                  fullWidth
                  focused={true}
                  required
                  name="Password"
                  value={formData.Password}
                  onChange={handleInputChange}
                  className="w-100 me-2 mt-4"
                  placeholder="Password"
                  helperText="Password must be at least 6 characters long and contain a number."
                  inputProps={{
                    pattern: "^(?=.*[0-9]).{6,}$",
                    title:
                      "Password must be at least 6 characters long and contain a number.",
                  }}
                />
              </div>

              <div className="regBtns">
                <button
                  className="btn btn-primary w-100 mt-4 rounded rounded-4"
                  disabled={loading}
                >
                  {btnText}
                </button>

                <div className="mt-4 btn-group">
                  <button
                    onClick={handleLoginBtn}
                    className="btn btn-danger w-50   rounded rounded-4"
                    disabled={loading}
                  >
                    Login
                  </button>

                  <div>
                    <LoginWithGoogle />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
