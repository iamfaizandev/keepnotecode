import LightbulbIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import "./sidenav.css";

export function Sidenav() {
  return (
    <div>
      <nav className="nav ms-2 mt-2">
        <Link to="/Home" className="text-decoration-none text-dark">
          <LightbulbIcon fontSize="large" />
        </Link>
        <Link to="/Home" className="text-decoration-none text-dark">
          <NotificationsNoneOutlinedIcon fontSize="large" />
        </Link>
        <Link to="/Home" className="text-decoration-none text-dark">
          <ModeEditOutlinedIcon fontSize="large" />
        </Link>
        <Link to="/Home" className="text-decoration-none text-dark">
          <ArchiveOutlinedIcon fontSize="large" />
        </Link>
        <Link to="/Home" className="text-decoration-none text-dark">
          <DeleteOutlineOutlinedIcon fontSize="large" />
        </Link>
      </nav>
    </div>
  );
}
