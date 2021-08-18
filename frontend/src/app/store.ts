import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import movieReducer from '../features/home/movieSlice';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false 
  })
});
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
