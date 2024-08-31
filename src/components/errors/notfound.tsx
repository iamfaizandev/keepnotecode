import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="container-fluid">
      <div
        className=" w-75"
        style={{ display: "block", margin: "auto", marginTop: "25vh" }}
      >
        <h4 className="text-center ms-4 mt-4">
          Path not Exist Please Follow Navigation
        </h4>
        <div>
          <Link to="/" className="btn btn-danger ">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
