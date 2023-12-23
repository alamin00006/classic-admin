import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useSingleUser from "../Hooks/useSingleUser";
import DashboardIcon from "../svgIcons/DashboardIcon";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

const Dashboard = () => {
  const [user, refetch, isLoading] = useSingleUser();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const SingOutHandle = () => {
    localStorage.removeItem("token");
    refetch();
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row bg-white">
        <div className="col-lg-3 col-md-3 col-sm-12 border">
          <div className="py-3">
            <ul className="px-2 py-3">
              <li className="list-unstyled d-flex align-items-center">
                <div className="">
                  <DashboardIcon />
                </div>
                <div className="ms-2">
                  <Link
                    to="/dashboard"
                    className="text-decoration-none text-black "
                  >
                    Dashboard
                  </Link>
                </div>
              </li>

              {/* <AdminAccess refetch={refetch} /> */}

              <li className="list-unstyled d-flex align-items-center mt-4">
                <div>
                  <MdOutlineBookmarkAdd
                    style={{ width: "25px", height: "25px" }}
                  />
                </div>
                <div className="ms-2">
                  <Link
                    to="/dashboard/product-add"
                    className="text-decoration-none text-black"
                  >
                    Product
                  </Link>
                </div>
              </li>
              <li className="list-unstyled d-flex align-items-center mt-4">
                <div>
                  <IoIosLogOut style={{ width: "25px", height: "25px" }} />
                </div>
                <div className="ms-2" onClick={SingOutHandle}>
                  <Link
                    to="/dashboard/product-add"
                    className="text-decoration-none text-black"
                  >
                    Log-out
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
