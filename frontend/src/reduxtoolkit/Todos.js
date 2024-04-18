import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Axios from "../components/axiosInstance/AxiosIndex";

const initialState = {
  userData: null,
  OneUsersData: [],
  loading: false,
  error: null,
};
export const fetchAllTodosData = createAsyncThunk(
  "todos/fetchAllTodosData",
  async () => {
    try {
      const response = await Axios.get(`/api/alltasks`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      toast.error("Something went wrong! Please try after sometimes");
      throw error;
    }
  }
);

export const fetchOneTodosData = createAsyncThunk(
  "todos/fetchOneTodosData",
  async (id) => {
    try {
      const response = await Axios.get(`/api/tasks/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      toast.error("Something went wrong! Please try after sometimes");
      throw error;
    }
  }
);

export const CreateTodoData = createAsyncThunk(
  "todos/CreateTodoData",
  async (data) => {
    try {
      const response = await Axios.post("/api/tasks", data);
      if (response.status === 201) {
        toast.success(response.data);
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

export const UpdateTodoData = createAsyncThunk(
  "todos/UpdateTodoData",
  async (data) => {
    try {
      const response = await Axios.put(`/api/tasks/${data?.id}`, data);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Book not found.");
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
      throw error;
    }
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  try {
    const response = await Axios.delete(`/api/tasks/${id}`);
    if (response.status === 200) {
      toast.success(response.data);
      return id; // Returning the deleted book ID for further processing if needed
    }
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Task not found.");
    } else {
      toast.error("Something went wrong! Please try again later.");
    }
    throw error;
  }
});

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(CreateTodoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateTodoData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(CreateTodoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //fetch All-books
      .addCase(fetchAllTodosData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTodosData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchAllTodosData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //fetch task individually
      .addCase(fetchOneTodosData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneTodosData.fulfilled, (state, action) => {
        state.loading = false;
        state.OneUsersData = action.payload;
      })
      .addCase(fetchOneTodosData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //patch
      .addCase(UpdateTodoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateTodoData.fulfilled, (state, action) => {
        state.loading = false;
      })

      .addCase(UpdateTodoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //delete
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = state.userData.filter(
          (obj) => obj.id !== action.payload
        );
      })

      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default todoSlice.reducer;
