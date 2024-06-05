import axios from "axios";
import { API_URL } from "../user/DangNhap";
import {
  getDanhMuc,
  getKhachHang,
  getKhachHangNo,
  getListPhieuNhapPending,
  getListPhieuXuatPending,
  getLoaiVo,
  getNhaPhanPhoi,
  getNoNhaPhanPhoi,
  getSanPham,
} from "./getAPI";
import {
  updateListKhachHang,
  updateListKhachHangNo,
  updateListNhaPhanPhoi,
  updateListNoNhaPhanPhoi,
  updateListPhieuNhapSaving,
  updateListPhieuXuatSaving,
} from "../redux/dataSlice";

export const postLoaiVo = async (headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/loai-vo`,
    headers,
  })
    .then((res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        getLoaiVo(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postDanhMuc = async (headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/danh-muc`,
    headers,
  })
    .then((res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        getDanhMuc(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postSanPham = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/san-pham`,
    headers,
    data,
  })
    .then((res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        getDanhMuc(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postKhachHang = async (headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/doi-tac/khach-hang`,
    headers,
  })
    .then((res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        getKhachHang(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postTimKiemKhachHang = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/doi-tac/tim-kiem-khach-hang`,
    data,
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
export const postTimKiemKhachHangNo = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/doi-tac/tim-kiem-khach-hang-no`,
    data,
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
export const postTimKiemNoNhaPhanPhoi = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/doi-tac/tim-kiem-no-nha-phan-phoi`,
    data,
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

export const postNhaPhanPhoi = async (headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/doi-tac/nha-phan-phoi`,
    headers,
  })
    .then((res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        getNhaPhanPhoi(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postTimKiemNhaPhanPhoi = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/doi-tac/tim-kiem-nha-phan-phoi`,
    data,
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

export const postTaoPhieu = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/phieu`,
    data,
    headers,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        if (content.loaiPhieu === "px") {
          getListPhieuXuatPending(headers, dispatch);
        } else {
          getListPhieuNhapPending(headers, dispatch);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postSortPhieu = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/phieu-xuat-by-day`,
    data,
    headers,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        if (content.loaiPhieu === "px") {
          dispatch(updateListPhieuXuatSaving(content.res));
        } else {
          dispatch(updateListPhieuNhapSaving(content.res));
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postChiTiet = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/chi-tiet`,
    data,
    headers,
  }).then((res) => {
    const { statusCode, content } = res.data;
    if (statusCode === 200) {
      if (content.loaiPhieu === "px") {
        getListPhieuXuatPending(headers, dispatch);
      } else {
        getListPhieuNhapPending(headers, dispatch);
      }
    }
  });
};

export const postTraTien = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/tra-tien`,
    headers,
    data,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        if (content.loaiPhieu === "px") {
          if (content.trangThai === "pending") {
            getListPhieuXuatPending(headers, dispatch);
          } else {
            getKhachHangNo(headers, dispatch);
          }
        } else {
          if (content.trangThai === "pending") {
            getListPhieuNhapPending(headers, dispatch);
          } else {
            getNoNhaPhanPhoi(headers, dispatch);
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postTraVo = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/tra-vo`,
    headers,
    data,
  })
    .then((res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        if (content.trangThai === "pending") {
          if (content.loaiPhieu === "px") {
            getListPhieuXuatPending(headers, dispatch);
          } else if (content.loaiPhieu === "pn") {
            //gọi phiếu nhập pending
            // getListPhieuXuatPending(headers, dispatch);
          }
        } else if (content.trangThai === "saving") {
          if (content.loaiPhieu === "px") {
            getKhachHangNo(headers, dispatch);
          } else if (content.loaiPhieu === "pn") {
            //gọi nợ nhà phân phôi
            // getKhachHangNo(headers, dispatch);
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const postTraDuPhieu = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/phieu-tra-du`,
    headers,
    data,
  })
    .then(async (res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        if (content === "px") {
          await getKhachHangNo(headers, dispatch);
          await getListPhieuXuatPending(headers, dispatch);
          await getSanPham(headers, dispatch);
        } else {
          await getNoNhaPhanPhoi(headers, dispatch);
          await getListPhieuNhapPending(headers, dispatch);
          await getSanPham(headers, dispatch);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postLuuPhieu = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/phieu/luu-phieu`,
    headers,
    data,
  })
    .then(async (res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        if (content.loaiPhieu === "px") {
          await getListPhieuXuatPending(headers, dispatch);
          await getKhachHang(headers, dispatch);
          await getKhachHangNo(headers, dispatch);
        } else {
          await getListPhieuNhapPending(headers, dispatch);
          await getNhaPhanPhoi(headers, dispatch);
          await getNoNhaPhanPhoi(headers, dispatch);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const postUploadImages = async (data, headers, dispatch) => {
  await axios({
    method: "post",
    url: `${API_URL}/upload`,
    headers,
    data,
  })
    .then(async (res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        getSanPham(headers, dispatch);
        getDanhMuc(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
