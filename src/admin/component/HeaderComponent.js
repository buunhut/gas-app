import React, { useState } from "react";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/dataSlice";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.dataSlice);

  const [show, setShow] = useState(false);

  const lockScroll = () => {
    if (show) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const handleClickMenu = () => {
    setShow(!show);
    lockScroll();
  };

  const handleDangXuat = () => {
    const confirm = window.confirm("Bạn có chắc muốn đăng xuất ?");
    if (confirm) {
      localStorage.removeItem("user");
      dispatch(updateUser(null));
      navigate("/dang-nhap");
    }
  };
  return (
    <>
      <div className="header">
        <div className="icon" onClick={handleClickMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div
          className="headerContent"
          style={{ transform: show ? "translateX(0)" : "" }}
        >
          <div
            className="user"
            onClick={() => {
              navigate("/admin");
              handleClickMenu();
            }}
          >
            <i className="fa-solid fa-house"></i>{" "}
            <h4>{user.shopName?.toUpperCase()}</h4>
          </div>
          <ul>
            <li
              onClick={() => {
                navigate("san-pham");
                setShow(!show);
                lockScroll();
              }}
            >
              Sản phẩm
            </li>
            <li
              onClick={() => {
                navigate("xuat-hang");
                setShow(!show);
                lockScroll();
              }}
            >
              Xuất hàng
            </li>
            <li
              onClick={() => {
                navigate("chi-tiet-xuat");
                setShow(!show);
                lockScroll();
              }}
            >
              Chi tiết xuất
            </li>
            <li
              onClick={() => {
                navigate("theo-doi-no");
                setShow(!show);
                lockScroll();
              }}
            >
              Theo dõi khách nợ
            </li>
            <li
              onClick={() => {
                navigate("khach-hang");
                setShow(!show);
                lockScroll();
              }}
            >
              Danh sách khách hàng
            </li>
            <li
              onClick={() => {
                navigate("nhap-hang");
                setShow(!show);
                lockScroll();
              }}
            >
              Nhập hàng
            </li>
            <li
              onClick={() => {
                navigate("chi-tiet-nhap");
                setShow(!show);
                lockScroll();
              }}
            >
              Chi tiết nhập
            </li>

            <li
              onClick={() => {
                navigate("no-nha-phan-phoi");
                setShow(!show);
                lockScroll();
              }}
            >
              Nợ nhà phân phối
            </li>
            <li
              onClick={() => {
                navigate("nha-phan-phoi");
                setShow(!show);
                lockScroll();
              }}
            >
              Danh sách nhà phân phối
            </li>
          </ul>
          <button onClick={handleDangXuat}>
            Đăng xuất <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>

          <i className="fa-solid fa-xmark close" onClick={handleClickMenu}></i>
        </div>
      </div>
      {show && <div className="overlay" onClick={() => setShow(!show)}></div>}
    </>
  );
};

export default HeaderComponent;
