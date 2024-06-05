import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./admin/AdminPage";
import BanHang from "./admin/banHangPage/BanHang";
import NhapHang from "./admin/nhapHangPage/NhapHang";
import KhachHang from "./admin/khachHangPage/KhachHang";
import NhaPhanPhoi from "./admin/nhaPhanPhoiPage/NhaPhanPhoi";
import NoNhaPhanPhoi from "./admin/noNhaPhanPhoi/NoNhaPhanPhoi";
import ChiTietBan from "./admin/chiTietBanPage/ChiTietBan";
import ChiTietNhap from "./admin/chiTietNhapPage/ChiTietNhap";
import DangNhap from "./user/DangNhap";
import DangKy from "./user/DangKy";
import ThongKe from "./admin/thongKePage/ThongKe";
import TheoDoiNoPage from "./admin/khachNoPage/TheoDoiNoPage";
import SanPhamPage from "./admin/sanPhamPage/SanPhamPage";
import HomePage from "./user/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="dang-nhap" element={<DangNhap />}></Route>
        <Route path="dang-ky" element={<DangKy />}></Route>

        <Route path="admin" element={<AdminPage />}>
          <Route index element={<ThongKe />} />
          <Route path="san-pham" element={<SanPhamPage />} />
          <Route path="xuat-hang" element={<BanHang />} />
          <Route path="khach-hang" element={<KhachHang />} />
          <Route path="chi-tiet-xuat" element={<ChiTietBan />} />
          <Route path="theo-doi-no" element={<TheoDoiNoPage />} />
          <Route path="nhap-hang" element={<NhapHang />} />
          <Route path="chi-tiet-nhap" element={<ChiTietNhap />} />
          <Route path="no-nha-phan-phoi" element={<NoNhaPhanPhoi />} />
          <Route path="nha-phan-phoi" element={<NhaPhanPhoi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
