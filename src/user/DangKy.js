import React, { useState } from "react";
import "./dangky.scss";
import { useNavigate } from "react-router-dom";

const DangKy = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleChangeInput = () => {};
  const handleDangKy = () => {};
  return (
    <div className="dangKy">
      <div className="icon">
        <i className="fa-solid fa-user"></i>
      </div>

      <h1>Đăng ký</h1>
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
              type={show ? "text" : "password"}
              placeholder="Mật khẩu"
              id="userPass"
              onChange={handleChangeInput}
            />
            {show ? (
              <i
                className="fa-regular fa-eye-slash show"
                onClick={() => setShow(!show)}
              ></i>
            ) : (
              <i
                className="fa-regular fa-eye show"
                onClick={() => setShow(!show)}
              ></i>
            )}
          </div>
          <div className="inputItem">
            <i className="fa-solid fa-shop" style={{ fontSize: "14px" }}></i>
            <input
              type="text"
              placeholder="Tên cửa hàng"
              id="shopName"
              onChange={handleChangeInput}
            />
          </div>
          <div className="inputItem">
            <i className="fa-solid fa-location-dot"></i>
            <input
              type="text"
              placeholder="Địa chỉ cửa hàng"
              id="shopAddress"
              onChange={handleChangeInput}
            />
          </div>

          <button type="button" onClick={handleDangKy}>
            Đăng ký
          </button>
        </form>
        <button
          className="dangKyNgay"
          onClick={() => {
            navigate("/dang-nhap");
          }}
        >
          <i className="fa-solid fa-reply"></i> Quay về trang đăng nhập
        </button>

        <div className="contact">
          <a href="tel:+909240886">Zero - 0909240886</a>
        </div>
      </div>
    </div>
  );
};

export default DangKy;
