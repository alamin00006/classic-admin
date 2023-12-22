import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Loading";
import useSingleUser from "../../Hooks/useSingleUser";
import axios from "axios";

const Login = () => {
  const [user, refetch, isLoading] = useSingleUser();

  const token = localStorage.getItem("token");
  // console.log(user)
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
      const data = await axios.post(
        "https://book-collection-server.vercel.app/api/v1/user/login",
        { email: userInfo?.email, password: userInfo?.password }
      );
      localStorage.setItem("token", data.data?.data?.token);
      navigate("/");
      refetch();
    } catch (error) {
      return toast.warn(error.response.data.message);
    }
  };

  //  if(isLoading){
  //   return(<Loading></Loading>)
  //  }
  useEffect(() => {
    if (!user?.email) {
      refetch();
    } else {
      navigate("/");
    }
  }, [refetch, token, user, isLoading, navigate]);

  return (
    <div className="bg-white">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 singup-image">
            <img
              src="https://boiferry.com/assets/images/register-1.webp"
              alt=""
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 signup-part">
            <form onSubmit={handleSubmit} className="login-form">
              <div>
                <h3 className="mb-4">
                  <b className="text-danger">নাফিউনে </b> সাইনইন করুন
                </h3>

                <label className="mt-2" htmlFor="email">
                  ইমেইল ঠিকানা
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
                  পাসওয়ার্ড
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
                <div className="d-flex justify-content-end">
                  <Link
                    to="/forgot-password"
                    className="text-danger forgot-password py-1"
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </Link>
                </div>
                <input
                  className="bg-danger text-white border-0 py-2 mt-2 fs-5"
                  type="submit"
                  value="সাইন ইন"
                />
                <p className="mt-3">
                  আমাদের সাথে একাউন্ট নেই?
                  <Link className="text-danger" to="/singUp">
                    {" "}
                    একাউন্ট করুন
                  </Link>
                </p>
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
