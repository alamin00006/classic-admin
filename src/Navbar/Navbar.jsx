import React from "react";

import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import "./Navbar.css";
import { Link } from "react-router-dom";

import useSingleUser from "../Hooks/useSingleUser";

const Navber = () => {
  const [user] = useSingleUser();
  const token = localStorage.getItem("token");

  // refetch()

  return (
    <nav className="container p-0 ">
      <Navbar className="searching-nav " expand="lg">
        <Container fluid className="">
          <Link to="/" className="">
            <p className="text-white text-decoration-none">Admin Dashboard</p>
          </Link>

          {token ? (
            <>
              <p className=" sing-Out my-account-aria">
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  className="text-black d-flex flex-column align-items-center account-part"
                >
                  <div>
                    <AiOutlineUser
                      style={{ width: "30px", height: "30px", color: "white" }}
                    />
                  </div>
                  <div className="">
                    <span style={{ fontSize: "14px", color: "white" }}>
                      My Account
                    </span>
                  </div>
                </Nav.Link>
              </p>
            </>
          ) : (
            <p className="login-aria">
              <Nav.Link
                as={Link}
                to="/login"
                className="text-black d-flex flex-column align-items-center "
              >
                <div>
                  <AiOutlineUser
                    style={{ width: "30px", height: "30px", color: "white" }}
                  />
                </div>
                <div className="">
                  <span style={{ fontSize: "14px", color: "white" }}>
                    Sign Up/In
                  </span>
                </div>
              </Nav.Link>
            </p>
          )}
        </Container>
      </Navbar>
    </nav>
  );
};

export default Navber;
