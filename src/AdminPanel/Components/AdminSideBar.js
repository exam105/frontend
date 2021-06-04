import React, { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FcPlus, FcTodoList, FcDeleteDatabase, FcSearch } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";
import { BsFillCaretRightFill } from "react-icons/bs";
import "../css/AdminSideBar.css";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { reset_board, reset_theory, reset_mcq } from "../../action/index";
import Cookies from "js-cookie";

function AdminSideBar(props) {
  const history = useHistory();
  const mcqReducer = useSelector((data) => data.mcqReducer);
  const theoryReducer = useSelector((data) => data.theoryReducer);
  useEffect(() => {
    axios({
      method: "GET",
      url: "/dashboard/de/metadata",
    })
      .then((res) => {
        if (res.data.message) {
          props.set_logout();
          history.push("/admin/panel/");
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sidebar_open = () => {
    $(".Admin_Sidebar").toggleClass("open_sidebar");
    $(".Admin_Sidebar").blur(() => {
      $(this).toggleClass("open_sidebar");
    });
  };
  const logout = () => {
    Cookies.remove("access");
    localStorage.removeItem("refresh_token");
    props.set_logout();
    history.push("/admin/panel/");
  };

  return (
    <section className="Admin_Sidebar">
      <ul className="sidebar_ul">
        <li className="admin_panel_heading_li">
          <h4>Admin Panel</h4>
        </li>
        <li>
          <NavLink exact to="/admin/panel/papers">
            <FcTodoList /> Papers List
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/admin/panel/add/papers">
            <FcPlus /> Add Paper
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/admin/panel/search">
            <FcSearch /> Search
          </NavLink>
        </li>
        {theoryReducer.length !== 0 || mcqReducer.length !== 0 ? (
          <li>
            <NavLink exact to="/admin/panel/add/papers">
              <BiEdit /> Resume unsaved paper
            </NavLink>
          </li>
        ) : (
          ""
        )}
        <li onClick={logout}>
          <NavLink to="#">
            <FcDeleteDatabase /> Logout
          </NavLink>
        </li>
      </ul>
      <BsFillCaretRightFill
        className="sidebar_open_icon"
        onClick={sidebar_open}
      />
    </section>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    set_logout: () => {
      dispatch({ type: "logout" });
    },
    reset_board: () => {
      dispatch(reset_board());
    },
    reset_mcq: () => {
      dispatch(reset_mcq());
    },
    reset_theory: () => {
      dispatch(reset_theory());
    },
  };
};

export default connect(null, mapDispatchToProps)(AdminSideBar);
