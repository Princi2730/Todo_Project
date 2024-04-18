import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Axios from "../components/axiosInstance/AxiosIndex";

const initialState = {
  userData: null,
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (data) => {
    try {
      const response = await Axios.post("/api/user", data);
      if (response.status === 201) {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong! Please try after sometimes");
      }
      throw error;
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
