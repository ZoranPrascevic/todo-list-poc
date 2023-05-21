import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    modalOpen: false,
    editId: 0,
    todos: [
      {
        key: 1,
        title: 'Task 1',
        description: 'This is task 1.',
        state: false,
        createdTime: Date.now()
      },
      {
        key: 2,
        title: 'Task 2',
        description: 'This is task 2.',
        state: true,
        createdTime: Date.now()
      },
      {
        key: 3,
        title: 'Task 3',
        description: 'This is task 3.',
        state: false,
        createdTime: Date.now()
      },
    ],
  },
  reducers: {
    // add a new todo
    addTodo: (state, action) => {
      const newTodo = {
        key: state.todos.length + 1,
        title: action.payload.title,
        description: action.payload.description,
        state: false,
        createdTime: Date.now(),
      };
      state.todos.unshift(newTodo); // add new todo to the start of the list
    },
    // toggle a todo's state between completed and not completed
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.key === action.payload.key);
      if (todo) {
        todo.state = todo.state === true ? false : true;
      }
    },
    // edit a todo's title and description
    editTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.key === state.editId);
      if (todo) {
        todo.title = action.payload.title;
        todo.description = action.payload.description;
      }
    },
    // delete a todo
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.key !== action.payload.key);
    },
    // toggle the todo edit modal
    toggleModal: (state, action) => {
      state.editId = action.payload || -1;
      state.modalOpen = !state.modalOpen;
    }
  },
});

export const { addTodo, toggleTodo, editTodo, deleteTodo, toggleModal } = todoSlice.actions;

export default todoSlice.reducer;