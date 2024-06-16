import axios from "axios";
import { API_URL } from "../user/DangNhap";
import {
  updateListBaoCao,
  updateListDanhMuc,
  updateListKhachHang,
  updateListKhachHangNo,
  updateListKho,
  updateListLoaiVo,
  updateListNhaPhanPhoi,
  updateListNoNhaPhanPhoi,
  updateListPhieuNhapPending,
  updateListPhieuXuatPending,
  updateListSanPham,
} from "../redux/dataSlice";

export const getLoaiVo = async (headers, dispatch) => {
  await axios({
    method: "get",
    url: `${API_URL}/loai-vo`,
    headers,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        dispatch(updateListLoaiVo(content));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getDanhMuc = async (headers, dispatch) => {
  await axios({
    method: "get",
    url: `${API_URL}/danh-muc`,
    headers,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        dispatch(updateListDanhMuc(content));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getKhachHang = async (headers, dispatch) => {
  await axios({
    method: "get",
    url: `${API_URL}/doi-tac/khach-hang`,
    headers,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        dispatch(updateListKhachHang(content));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getNhaPhanPhoi = async (headers, dispatch) => {
  await axios({
    method: "get",
    url: `${API_URL}/doi-tac/nha-phan-phoi`,
    headers,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        dispatch(updateListNhaPhanPhoi(content));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getKhachHangNo = async (headers, dispatch) => {
  await axios({
    method: "get",
    url: `${API_URL}/doi-tac/khach-hang-no`,
    headers,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        dispatch(updateListKhachHangNo(content));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getNoNhaPhanPhoi = async (headers, dispatch) => {
  await axios({
    method: "get",
    url: `${API_URL}/doi-tac/no-nha-phan-phoi`,
    headers,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        dispatch(updateListNoNhaPhanPhoi(content));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getSanPham = async (headers, dispatch, giaoDich) => {
  const res = await axios({
    method: "get",
    url: `${API_URL}/san-pham`,
    headers,
  });
  const { statusCode, content } = res.data;
  if (statusCode === 200) {
    if (giaoDich === "đổi") {
      const listSanPhamDoi = content?.filter((item) => item.loaiVoId !== null);
      dispatch(updateListSanPham(listSanPhamDoi));
    } else if (giaoDich === "bán" || giaoDich === "mua") {
      dispatch(updateListSanPham(content));
    }
  }
};
export const getListPhieuXuatPending = async (headers, dispatch) => {
  await axios({
    method: "get",
    url: `${API_URL}/phieu-xuat-dang-giao`,
    headers,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        dispatch(updateListPhieuXuatPending(content));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getListPhieuNhapPending = async (headers, dispatch) => {
  await axios({
    method: "get",
    url: `${API_URL}/phieu-nhap-dang-giao`,
    headers,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        dispatch(updateListPhieuNhapPending(content));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getTraTien = async (headers, dispatch) => {
  await axios({
    method: "get",
    url: `${API_URL}/tra-tien`,
    headers,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        dispatch(updateListBaoCao(content));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getKho = async (headers, dispatch) => {
  await axios({
    method: "get",
    url: `${API_URL}/kho`,
    headers,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      // console.log(statusCode);
      if (statusCode === 200) {
        dispatch(updateListKho(content));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
