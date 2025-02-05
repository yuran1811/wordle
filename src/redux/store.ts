import { configureStore } from '@reduxjs/toolkit';

import boardReducer from './boardSlice';

const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {board: boardReducer}
export type AppDispatch = typeof store.dispatch;
