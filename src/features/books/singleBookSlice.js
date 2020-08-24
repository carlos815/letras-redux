import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const singleBookAdapter = createEntityAdapter();

const initialState = singleBookAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchSingleBook = createAsyncThunk(
  "books/fetchSingleBook",
  async (id) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
    const body = await response.json();
    return body;
  }
);

export const singleBookSlice = createSlice({
  name: "book",

  initialState,

  reducers: {},

  extraReducers: {
    [fetchSingleBook.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchSingleBook.fulfilled]: (state, action) => {
      state.status = "succeeded";
      singleBookAdapter.setAll(state, []);
      singleBookAdapter.addOne(state, action.payload);
    },
    [fetchSingleBook.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default singleBookSlice.reducer;

export const { selectAll: selectBook } = singleBookAdapter.getSelectors(
  (state) => state.book
);
