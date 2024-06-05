import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import "./adminpage.scss";
import HeaderComponent from "./component/HeaderComponent";
import FooterComponent from "./component/FooterComponent";
import { updateUser } from "../redux/dataSlice";

//đọc text
export const speak = (text) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "vi-VN"; // Đặt ngôn ngữ là tiếng Việt
  synth.speak(utterance);
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
export const getRemainingString = (str, num) => {
  if (str.length >= num) {
    return str.slice(0, num) + " ...";
  } else {
    return str;
  }
};

const AdminPage = () => {
  const { user, isLoading } = useSelector((state) => state.dataSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const readLocal = (key) => {
    const res = JSON.parse(localStorage.getItem(key));
    return res;
  };

  useEffect(() => {
    const user = readLocal("user");
    if (user) {
      dispatch(updateUser(user));
    } else {
      navigate("/dang-nhap");
    }
  }, [dispatch, navigate]);

  if (user) {
    return (
      <div id="container">
        <HeaderComponent />
        <div className="content">
          <Outlet />
        </div>
        <FooterComponent />
      </div>
    );
  } else {
    return null;
  }
};

export default AdminPage;
