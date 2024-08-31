export function AddAppointment() {
  return (
    <div className="container-fluid">
      <div className="appoint-container">
        <form
          action=""
          className="form w-50 mt-4"
          style={{ display: "block", margin: "auto", marginTop: "7%" }}
        >
          <div className="card-header input-group">
            <input
              name="takeNote"
              type="text"
              className="form-control  border-end-0"
              placeholder="Take a note.."
            />
            <div className=" input-group-text bg-none">
              <span className="bi bi-pin"></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
