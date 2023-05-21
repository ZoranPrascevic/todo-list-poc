import { configureStore } from '@reduxjs/toolkit'
 // Import todoReducer from the todoSlice file in the todo feature
import todoReducer from '../features/todo/todoSlice'
 // Export a default store configuration with a todo reducer
export default configureStore({
  reducer: {
    todo: todoReducer
  },
})