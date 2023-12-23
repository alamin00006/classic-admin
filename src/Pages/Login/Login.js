import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passWordError: "",
  });

  const navigate = useNavigate();

  const emailCheck = (e) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(e.target.value);
    if (validEmail) {
      setUserInfo({ ...userInfo, email: e.target.value });
      setError({ ...error, emailError: "" });
    } else {
      setError({ ...error, emailError: "Invalid Email" });
      setUserInfo({ ...userInfo, email: "" });
    }
  };

  const passwordCheck = (e) => {
    const passwordRegex = /.{6,}/;
    const validPassWord = passwordRegex.test(e.target.value);
    if (validPassWord) {
      setUserInfo({ ...userInfo, password: e.target.value });
      setError({ ...error, passWordError: "" });
    } else {
      setError({ ...error, passWordError: "Invalid Password" });
      setUserInfo({ ...userInfo, password: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post("http://localhost:5000/api/user/login", {
        email: userInfo?.email,
        password: userInfo?.password,
      });
      localStorage.setItem("token", data.data?.data?.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      return toast.warn(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="container">
        <div className="d-flex justify-content-center ">
          <div className=" " style={{ marginTop: 150 }}>
            <form onSubmit={handleSubmit} className="login-form">
              <div>
                <h3 className="mb-4">
                  <b className="text-danger"></b> Login
                </h3>

                <label className="mt-2" htmlFor="email">
                  Email
                </label>
                <input
                  onChange={emailCheck}
                  className="d-block"
                  placeholder="Enter Your Email"
                  type="email"
                  name="email"
                  id="email"
                  required
                />
                {error?.emailError && (
                  <p className="text-danger">{error.emailError}</p>
                )}

                <label className="mt-2" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={passwordCheck}
                  className="d-block mt-2"
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  id="password"
                  required
                />
                {error?.passWordError && (
                  <p className="text-danger">{error.passWordError}</p>
                )}

                <input
                  className=" text-white border-0 py-2 mt-2 fs-5"
                  style={{ backgroundColor: "#12856b" }}
                  type="submit"
                  value="Login"
                />
                <p className="mt-2">Admin Email: alaminbamna08@gmail.com</p>
                <p>Admin Password : 112233</p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer className="toast-position" position="top-center" />
    </div>
  );
};

export default Login;
