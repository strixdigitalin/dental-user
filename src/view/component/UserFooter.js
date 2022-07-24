import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        padding: "20px 0",
        background: "#F23A5E",
        textAlign: "center",
      }}
    >
      <img src={require("../assets/dlogo.png").default} alt="" />
    </div>
  );
};

export default Footer;
