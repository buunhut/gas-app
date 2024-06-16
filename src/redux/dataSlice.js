import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  headers: null,
  isLoading: false,
  alert: null,
  listLoaiVo: [],
  listDanhMuc: [],
  listSanPham: [],
  listKhachHang: [],
  listKhachHangNo: [],
  listNoNhaPhanPhoi: [],
  listNhaPhanPhoi: [],
  listPhieuXuatPending: [],
  listPhieuNhapPending: [],
  listPhieuXuatSaving: [],
  listPhieuNhapSaving: [],
  listDonHang: [],
  listBaoCao: null,
  listKho: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateUser(state, action) {
      if (action.payload === null) {
        state.user = null;
        state.headers = null;
      } else {
        state.user = action.payload;
        state.headers = { token: action.payload.token };
      }
    },
    updateIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    updateAlert(state, action) {
      state.alert = action.payload;
    },
    updateListLoaiVo(state, action) {
      state.listLoaiVo = action.payload;
    },
    updateListDanhMuc(state, action) {
      state.listDanhMuc = action.payload;
    },
    updateListSanPham(state, action) {
      state.listSanPham = action.payload;
    },
    updateListKhachHang(state, action) {
      state.listKhachHang = action.payload;
    },
    updateListKhachHangNo(state, action) {
      state.listKhachHangNo = action.payload;
    },
    updateListNoNhaPhanPhoi(state, action) {
      state.listNoNhaPhanPhoi = action.payload;
    },
    updateListNhaPhanPhoi(state, action) {
      state.listNhaPhanPhoi = action.payload;
    },

    updateListPhieuXuatPending(state, action) {
      state.listPhieuXuatPending = action.payload;
    },
    updateListPhieuNhapPending(state, action) {
      state.listPhieuNhapPending = action.payload;
    },
    updateListPhieuXuatSaving(state, action) {
      state.listPhieuXuatSaving = action.payload;
    },
    updateListPhieuNhapSaving(state, action) {
      state.listPhieuNhapSaving = action.payload;
    },
    updateListDonHang(state, action) {
      state.listDonHang = action.payload;
    },
    updateListBaoCao(state, action) {
      state.listBaoCao = action.payload;
    },
    updateListKho(state, action) {
      state.listKho = action.payload;
    },
  },
});

export const {
  updateUser,
  updateIsLoading,
  updateAlert,
  updateListLoaiVo,
  updateListDanhMuc,
  updateListSanPham,
  updateListKhachHang,
  updateListKhachHangNo,
  updateListNoNhaPhanPhoi,
  updateListNhaPhanPhoi,
  updateListPhieuXuatPending,
  updateListPhieuNhapPending,
  updateListPhieuXuatSaving,
  updateListPhieuNhapSaving,
  updateListDonHang,
  updateListBaoCao,
  updateListKho,
} = dataSlice.actions;
export default dataSlice.reducer;
