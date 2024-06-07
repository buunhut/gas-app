import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import "./dangnhap.scss";

export const API_URL = process.env.REACT_APP_LINK_API;

const DangNhap = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    userPhone: null,
    userPass: null,
  });

  const postDangNhap = async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/user/dang-nhap`,
        data,
      });
      if (res.data.statusCode === 200) {
        const { content } = res.data;
        localStorage.setItem("user", JSON.stringify(content));
        dispatch(updateUser(content));
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleDangNhap = () => {
    postDangNhap(data);
  };
  return (
    <div className="dangNhap">
      <div className="icon">
        <i className="fa-solid fa-lock"></i>
      </div>

      <h1>Đăng nhập</h1>
      <div className="dangNhapContent">
        <form action="">
          <div className="inputItem">
            <i className="fa-solid fa-phone"></i>
            <input
              type="text"
              placeholder="Số điện thoại"
              id="userPhone"
              onChange={handleChangeInput}
            />
          </div>
          <div className="inputItem">
            <i className="fa-solid fa-key"></i>
            <input
              type="password"
              placeholder="Mật khẩu"
              id="userPass"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" onClick={handleDangNhap}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default DangNhap;
