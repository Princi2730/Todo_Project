import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateComponent() {
  let Info = sessionStorage.getItem("userInfo");
  if (Info) {
    Info = JSON.parse(Info);
    var decoded = jwtDecode(Info?.token);

    sessionStorage.setItem("Info", JSON.stringify(decoded));
    sessionStorage.setItem("userId", JSON.stringify(decoded.userId));
  }
  return (
    <>
      {decoded && decoded?.exp ? (
        <Outlet />
      ) : (
        <>
          <Navigate to="/" />
        </>
      )}
    </>
  );
}

export default PrivateComponent;
