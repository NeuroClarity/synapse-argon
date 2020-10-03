import React from "react";

const UnsupportedBrowser = () => {
  return (
    <div 
      className="text-center" 
      style={{
        backgroundColor:"white", 
        height: "100vh"
      }}
    >
      <img
        className="mt-8"
        alt="..."
        src={"/black_logo.png"}
        style={{ width: "200px" }}
      />
      <div className="mt-4">
        <h4 style={{color:"black"}}>Sorry, this web browser is not yet supported by NeuroClarity. </h4>
        <h4 style={{color:"black"}}>Please use Google Chrome to access this page. </h4>
      </div>
    </div>
  )
}

export default UnsupportedBrowser;
