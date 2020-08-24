import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const booksAdapter = createEntityAdapter()

const initialState = booksAdapter.getInitialState({
  status: "idle",
  error: null,
});


export const fetchBooks = createAsyncThunk('books/fetchBooks', async (search) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
    const body = await response.json();
    return body
  })




  
export const booksSlice = createSlice ({
    name: 'books',

    initialState,

    reducers: {},

    extraReducers: {
        [fetchBooks.pending]: (state, action) => {
            state.status = 'loading'
          },
        [fetchBooks.fulfilled]: (state, action) => {
            if (action.payload.items !== undefined) {
              state.status = 'succeeded'
              booksAdapter.setAll(state, action.payload.items)
            } else {
              state.status = 'succeeded-no-matches'
            }
        },
        [fetchBooks.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          },
    },
})

export default booksSlice.reducer

export const {
    selectAll: selectAllBooks,
  } = booksAdapter.getSelectors((state) => state.books)

