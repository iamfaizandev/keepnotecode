import { Link } from "react-router-dom";

export function UserInvalid() {
  return (
    <div className="container-fluid">
      <h4 className="text-center text-danger">Invalid Login Details</h4>
      <Link to="/login">Back To Login</Link>
    </div>
  );
}
