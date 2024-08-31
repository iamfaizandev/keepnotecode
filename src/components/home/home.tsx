import { Link } from "react-router-dom";
import "./home.css";
import { Navmenu } from "../nav/nav";

export function Home() {
  return (
    <div className="home">
      <div>
        <nav className="d-flex justify-content-between p-3 ">
          <div className="left text-danger  h4  ">
            <Link to="/" className="text-decoration-none  text-white">
              One Keep
            </Link>
          </div>
        </nav>
      </div>
      <header style={{ width: "50%", margin: "auto", marginTop: "35vh" }}>
        <div className="content">
          <h3 className="text-white h2 mb-4">
            Save your thoughts, wherever you are
          </h3>
          <div className="btn">
            <Link
              to="/login"
              className="text-decoration-none curson-pointer text-white"
            >
              <button className=" btn btn-primary">Try One Keep</button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
