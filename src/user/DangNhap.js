import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/dataSlice";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h3>Đăng nhập</h3>
      <form action="">
        <div className="inputItem">
          <input
            type="text"
            placeholder="Số điện thoại"
            id="userPhone"
            onChange={handleChangeInput}
          />
        </div>
        <div className="inputItem">
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
  );
};

export default DangNhap;
