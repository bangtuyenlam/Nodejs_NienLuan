import React from "react";
import { Link } from "react-router-dom";
import { AddShoppingCart, ExitToApp, PersonAdd, Person, CancelPresentation } from "@material-ui/icons";
import { getUser, removeUserSession, getToken } from "../Utils/Common";
import { useNavigate } from "react-router";
import SearchProduct from "./homePage/searchproduct/SearchProduct";
function Navbar({size}) {
   const user = getUser();
   const token = getToken();
   const navigate = useNavigate();
   const handleLogout = () => {
    removeUserSession();
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm"
      style={{
        width: "100%",
     height: "50px",
    backgroundColor: "white",
    position: "fixed",
    top: 0,
    zIndex: 999,
    display: "flex",
  
      }}>
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to={"/"}
           reloadDocument={true}>
            Phụ kiện XZ
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-4 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={"/"}
                  style={{ fontSize: 18 }}
                 
                >
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/post"} style={{ fontSize: 18 }}>
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <SearchProduct
                 placeholer="Nhập tên sản phẩm..."
                 />
              </li>
            </ul>
          {user == null && token == null ? (
            <>
            <div className="buttons">
              <Link
                className="btn btn-outline-dark"
                to={"/login"}
                style={{ marginRight: 6, marginBottom: 3 }}
               
              >
                <div className="fa fa-login">
                  <ExitToApp />
                  Đăng nhập
                </div>
              </Link>
              </div>
              <div>
              <Link
                className="btn btn-outline-dark"
                to={"/register"}
                style={{ marginRight: 6, marginBottom: 3 }}
              >
                <div className="fa fa-login">
                  <PersonAdd />
                  Đăng ký
                </div>
              </Link>
            </div>
            </>
          ) :  (
            <>
            <div className="buttons">
              <Link
                className="btn btn-outline-dark"
                to={"/personal"}
                style={{ marginRight: 6, marginBottom: 3 }}
              >
                <div className="fa fa-login">
                  <Person />
                  {user.TenTK}
                </div>
              </Link>
              </div>
              <div>
              <Link
                className="btn btn-outline-dark"
                to={"/"}
                onClick={handleLogout}
                style={{ marginRight: 6, marginBottom: 3 }}
              >
                <div className="fa fa-login">
                  <CancelPresentation/>
                  Đăng xuất
                </div>
              </Link>
            </div>
            </>
          ) 
          }
            <div>
            <Link
              className="btn btn-outline-dark"
              to={"/showcart"}
              style={{ marginRight: 6, marginBottom: 3 }}
            >
              <div className="fa fa-login">
                <AddShoppingCart/>
              
                <span style={{
                  
                  color: "red"
                }}>({size})</span>
              </div>
            </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  
  );
}

export default Navbar;
