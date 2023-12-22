import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useSingleUser from "../Hooks/useSingleUser";
import DashboardIcon from "../svgIcons/DashboardIcon";
// import LoveIcon from "../../svgIcons/LoveIcon";
// import OrderIcon from "../../svgIcons/OrderIcon";
// import ProfileIcon from "../../svgIcons/ProfileIcon";

// import AdminAccess from "./AdminAccess";

// import Loading from "../../Pages/Loading/Loading";

const Dashboard = () => {
  const [user, refetch, isLoading] = useSingleUser();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const SingOutHandle = () => {
    localStorage.removeItem("token");
    refetch();
  };
  //   if (isLoading) {
  //     <Loading></Loading>;
  //   }

  //   useEffect(() => {
  //     if (!token) {
  //       return navigate("/");
  //     }
  //   }, [token, navigate]);
  return (
    <div className="container">
      <div className="row bg-white">
        <div className="col-lg-3 col-md-3 col-sm-12 border">
          <div className="py-3">
            <h5 className="px-2">আমার একাউন্ট</h5>
            <ul className="px-2 py-3">
              <li className="list-unstyled d-flex align-items-center">
                <div className="">
                  <DashboardIcon />
                </div>
                <div className="ms-2">
                  <Link
                    to="/side-navbar"
                    className="text-decoration-none text-black "
                  >
                    ড্যাশবোর্ড
                  </Link>
                </div>
              </li>

              {/* <AdminAccess refetch={refetch} /> */}

              <li className="list-unstyled d-flex align-items-center mt-4">
                <div>{/* <OrderIcon /> */}</div>
                <div className="ms-2">
                  <Link
                    to="/side-navbar/product-add"
                    className="text-decoration-none text-black"
                  >
                    Product Add
                  </Link>
                </div>
              </li>
              <li className="list-unstyled d-flex align-items-center mt-4">
                <div>{/* <ProfileIcon /> */}</div>
                <div className="ms-2">
                  <Link
                    to="/side-navbar/user-profile"
                    className="text-decoration-none text-black"
                  >
                    প্রোফাইল
                  </Link>
                </div>
              </li>
              <li className="list-unstyled d-flex align-items-center mt-4">
                <div>{/* <LoveIcon /> */}</div>
                <div className="ms-2">
                  <Link
                    to="/up-comming"
                    className="text-decoration-none text-black"
                  >
                    ইচ্ছেতালিকা
                  </Link>
                </div>
              </li>
              <li className="list-unstyled d-flex align-items-center mt-4">
                <div>{/* <QuestionIcon /> */}</div>
                <div className="ms-2">
                  <Link
                    to="/side-navbar/support"
                    className="text-decoration-none text-black"
                  >
                    সাপোর্ট
                  </Link>
                </div>
              </li>
              <li className="list-unstyled d-flex align-items-center mt-4">
                <div>{/* <SingOutIcon /> */}</div>
                <div className="ms-2">
                  <Link
                    onClick={SingOutHandle}
                    to="/"
                    className="text-decoration-none text-black"
                  >
                    লগ আউট
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-lg-9 col-md-9 col-sm-12">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
