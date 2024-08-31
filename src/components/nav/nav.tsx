import { Link } from "react-router-dom";

export function Navmenu() {
  return (
    <div>
      <nav className="d-flex justify-content-between p-3 ">
        <div className="left text-danger  h4  ">
          <Link to="/" className="text-decoration-none  text-danger">
            One Keep
          </Link>
        </div>
        {/* <div className="social-login text-white">
          <Link to="/login" className="text-decoration-none  text-white">
            <span className="bi bi-facebook fs-3 me-4"></span>
          </Link>
          <Link to="/login" className="text-decoration-none  text-white">
            <span className="bi bi-twitter fs-3"></span>
          </Link>
        </div> */}
      </nav>
    </div>
  );
}
