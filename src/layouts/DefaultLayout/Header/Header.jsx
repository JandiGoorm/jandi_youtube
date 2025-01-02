import { Link } from "react-router-dom";
import logo from "../../../assets/icons/logo.svg";

const Header = () => {
  return (
    <>
      <header style={headerStyle}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="YouTube Logo" style={logoStyle} />
        </Link>
      </header>
    </>
  );
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#ffffff",
  color: "white",
};

const logoStyle = {
  height: "40px",
  cursor: "pointer",
};

export default Header;
