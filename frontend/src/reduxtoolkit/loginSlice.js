import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Axios from "../components/axiosInstance/AxiosIndex";

const initialState = {
  userData: null,
  loading: false,
  islogin: false,
  error: null,
};

export const fetchloginData = createAsyncThunk(
  "login/fetchloginData",
  async (data) => {
    try {
      const response = await Axios.post("/api/login", data);
      if (response.status === 200) {
        toast.success("User Login Successfully");
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong! Please try after sometimes");
      }
      throw error;
    }
  }
);
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    Islogin: (state) => {
      state.islogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchloginData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchloginData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.islogin = true;
        sessionStorage.setItem("userInfo", JSON.stringify(state.userData));
      })
      .addCase(fetchloginData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { Islogin } = loginSlice.actions;

export default loginSlice.reducer;
