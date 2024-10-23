import React, { useEffect } from "react";
import "./index.css";
import { Button } from "../components/ui/button";

const Popup = () => {
  
  return (
    <div style={{ width: "100px", padding: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
      <h1>VELLA</h1>
      <Button style={{ width: "100%" }} onClick={()=>window.open("https://vella-backend.onrender.com/login-page", "_blank")}>Login</Button>
      <Button style={{ width: "100%" }} onClick={()=>window.open("https://vella-backend.onrender.com/register-page", "_blank")}>Signup</Button>
    </div>
  );
};


export default Popup;
