import { CButton, CCol, CForm, CFormInput, CRow } from "@coreui/react";
import React, { useState } from "react";
import { axiosInstance } from "../api/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const keyEnter = (e) => {
    if (e.key == "Enter") {
      loginClick();
      e.preventDefault();
    }
  };

  const loginClick = async () => {
    let loginData = await axiosInstance.post(`/api/auth/login`, {
      email: email,
      password: password,
    });
    Cookies.set(
      "name",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…E4N30.HxwZlcB9S4iXvT6BqYG2N8zNy39q4rZvGpJS2SE3WAc",
      { expires: 7, path: "" }
    );
    Cookies.get("name", {
      domain: "https://crudinvoicepostgresql.onrender.com",
    });
    Cookies.remove("name", {
      path: "",
      domain: "https://crudinvoicepostgresql.onrender.com",
      secure: true,
    });
    // if (loginData.flag === false) {
    //   toast.error(loginData.message);
    //   toast.success([]);
    // } else {
    //   if (loginData.data.status == "OK") {
    //     navigate(`/salesinvoice`);
    //     // Cookie.setItem(`Loginprocess`, "true");
    //     toast.error([]);
    //   } else {
    //     toast.error([loginData.data.message]);
    //     toast.success([]);
    //   }
    // }
    navigate(`/salesinvoice`);
    toast.success(loginData.data.message);
    console.log(loginData.data);
  };

  return (
    <>
      <h4 style={{ textAlign: "center", marginTop: "1px" }}>Login Form</h4>
      <div className="form-body">
        <CForm className="card-md-center">
          <CRow>
            <CCol lg="4"></CCol>
            <CCol lg="4">
              <CRow className="align-items-center">
                <CCol lg="1"></CCol>
                <CCol lg="3">
                  <label className="form-label">Email</label>
                </CCol>
                <CCol lg="7">
                  <CFormInput
                    className="form-control"
                    placeholder="Enter Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={keyEnter}
                  ></CFormInput>
                </CCol>
                <CCol lg="1"></CCol>
              </CRow>

              <CRow className="align-items-center mt-3">
                <CCol lg="1"></CCol>
                <CCol lg="3">
                  <label className="form-label">Password</label>
                </CCol>
                <CCol lg="7">
                  <CFormInput
                    className="form-control"
                    placeholder="Enter Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={keyEnter}
                  ></CFormInput>
                </CCol>
                <CCol lg="1"></CCol>
              </CRow>

              <CRow className="align-items-center mt-4">
                <CCol lg="4"></CCol>
                <CCol lg="4">
                  <CButton
                    type="button"
                    className="btn btn-primary"
                    onClick={loginClick}
                    onKeyDown={keyEnter}
                  >
                    Login
                  </CButton>
                </CCol>
                <CCol lg="4"></CCol>
              </CRow>
            </CCol>
            <CCol lg="4"></CCol>
          </CRow>
        </CForm>
      </div>
    </>
  );
};

export default Login;
