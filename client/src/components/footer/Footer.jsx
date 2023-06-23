import "./footer.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AddIcon from "@mui/icons-material/Add";
import CampaignIcon from "@mui/icons-material/Campaign";

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="footer">
      <div className="container">
        <Link
          className="homeBtn"
          to="/home"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <HomeOutlinedIcon />
        </Link>
        <Link to="/adform">
          <CampaignIcon />
        </Link>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search" />
        </div>
        <AddIcon />
        <Link
          className="profileBtn"
          to={`/profile/${user.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <PersonOutlineOutlinedIcon />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
