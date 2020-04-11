import React from "react";
import logo from "../images/logo.png";

function Header() {
  return (
    <div className="Header">
      <img src={logo} alt="Logo" />;
      <h1 >Employee Directory</h1>
    </div>
  );
}

export default Header;
