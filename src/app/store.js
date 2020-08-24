import { configureStore } from '@reduxjs/toolkit'

import booksReducer from '../features/books/booksSlice'
import bookReducer from '../features/books/singleBookSlice'
//import notificationsReducer from '../features/notifications/notificationsSlice'


export default configureStore({
  reducer: {
    books: booksReducer,
    book: bookReducer,
   // notifications: notificationsReducer
  }
})
