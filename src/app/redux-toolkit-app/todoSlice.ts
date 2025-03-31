import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoState {
  todos: string[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchTodos: (state) => {
      state.loading = true;
      state.error = null;
    },
    setTodos: (state, action: PayloadAction<string[]>) => {
      state.todos = action.payload;
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchTodos, setTodos, setError } = todoSlice.actions;

export default todoSlice.reducer;
