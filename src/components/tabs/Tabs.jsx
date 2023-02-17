import React from "react";
import "./Tabs.css";
import { FaHeart, FaUserCircle, FaShoppingBag, FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Tabs() {
  const location = useLocation();
  const home = "/home";
  const favorite = "/favorite";
  const spesa = "/spesa";
  const user = "/user";
  const size = 24;
 
  return (
    <>
      <nav>
        <div className="tab-cont">
          <Link to={home} className="link">
            <FaHome
              size={size}
              color={location.pathname === home ? "#17c964" : "#ffffff"}
            />
          </Link>

          <Link to={favorite} className="link">
            <FaHeart
              size={size}
              color={location.pathname === favorite ? "#17c964" : "#ffffff"}
            />
          </Link>

          <Link to={spesa} className="link">
            <FaShoppingBag
              size={size}
              color={location.pathname === spesa ? "#17c964" : "#ffffff"}
            />
          </Link>

          <Link to={user} className="link">
            <FaUserCircle
              size={size}
              color={location.pathname === user ? "#17c964" : "#ffffff"}
            />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Tabs;
