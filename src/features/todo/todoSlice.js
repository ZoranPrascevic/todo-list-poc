import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    modalOpen: false,
    editId: 0,
    todos: [
      {
        key: 1,
        title: 'Conquer Mount Everest',
        description: 'Embark on an epic adventure and climb the highest peak in the world. Prepare yourself for a challenging expedition and enjoy breathtaking views from the summit.',
        state: false,
        createdTime: Date.now(),
      },
      {
        key: 2,
        title: 'Learn to Play the Ukulele',
        description: 'Strum your way to happiness with the delightful sounds of the ukulele. Dive into tutorials, practice chords, and serenade your friends and family with your newfound musical talent.',
        state: false,
        createdTime: Date.now(),
      },
      {
        key: 3,
        title: 'Build a Sandcastle',
        description: 'Head to the beach armed with buckets and shovels. Let your creativity flow as you sculpt a magnificent sandcastle, complete with turrets, moats, and seashell decorations.',
        state: true,
        createdTime: Date.now(),
      },
      {
        key: 4,
        title: 'Host a Game Night Extravaganza',
        description: 'Gather your friends for an unforgettable game night. Prepare a variety of board games, card games, and snacks for an evening filled with laughter, friendly competition, and lots of fun.',
        state: false,
        createdTime: Date.now(),
      },
      {
        key: 5,
        title: 'Create a DIY Terrarium',
        description: 'Get your hands dirty and unleash your inner gardener by building a beautiful terrarium. Select your favorite plants, layer the soil and rocks, and design a miniature ecosystem that brings nature indoors.',
        state: true,
        createdTime: Date.now(),
      },
      {
        key: 6,
        title: 'Master the Art of Latte Art',
        description: 'Become a barista extraordinaire and learn the techniques of creating stunning latte art. From hearts to ferns, hone your skills in pouring and drawing patterns on creamy coffee creations.',
        state: false,
        createdTime: Date.now(),
      },
      {
        key: 7,
        title: 'Organize a Costume Party',
        description: 'Let your imagination run wild and throw a themed costume party. Whether it\'s superheroes, fairy tales, or movie characters, dress up, have a blast, and capture memorable moments.',
        state: false,
        createdTime: Date.now(),
      },
      {
        key: 8,
        title: 'Write a Short Story',
        description: 'Unleash your creativity and weave a captivating tale. Develop interesting characters, create engaging plots, and transport readers to a world of imagination with your storytelling skills.',
        state: true,
        createdTime: Date.now(),
      },
    ],
  },
  reducers: {
    // add a new todo
    addTodo: (state, action) => {
      const newTodo = {
        key: Date.now(),
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