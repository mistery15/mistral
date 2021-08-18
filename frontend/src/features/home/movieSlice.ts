import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import MovieApi from './MovieApi';

export interface Review {
  rating: number,
  sessionId: string
}

export interface Movie {
  _id: string,
  title: string,
  release_date: string,
  original_title: string,
  backdrop_path: string,
  poster_path: string,
  description: string,
  rating: number,
  reviews: Review[]
}

export interface Show {
  _id: string,
  name: string,
  release_date: string,
  backdrop_path: string,
  poster_path: string,
  description: string,
  rating: number,
  reviews: Review[]
}

export interface MoviesState {
  results: Movie[] | Show[];
  totalItems: number,
  page: number,
  fetchingResults: 'idle' | 'loading' | 'failed';
  type: Type,
  search: string,
  sessionId: string
}

export type Type = 'shows' | 'movies';

const initialState: MoviesState = {
  results: [],
  fetchingResults: 'idle',
  type: 'movies',
  search: '',
  totalItems: 0,
  page: 1,
  sessionId: '',
};
interface MovieApiResponse {
  results: Movie[] | Show[],
  totalItems: number
}
export const fetchMovies = createAsyncThunk<MovieApiResponse, { type: Type, search: string }>(
  'movies/fetchMovies',
  async ({ type, search }) => {
    const response = await MovieApi.getInstance().getMovies(type, search, 1);
    return response.data;
  }
);
export const fetchMoreMovies = createAsyncThunk<MovieApiResponse, { type: Type, search: string, page: number }>(
  'movies/fetchMoreMovies',
  async ({ type, search, page }) => {
    const response = await MovieApi.getInstance().getMovies(type, search, page);
    return response.data;
  }
);
export const createReview = createAsyncThunk<Movie | Show, { id: string, rating: number, sessionId: string, type: Type }>(
  'movies/createReview',
  async ({ id, rating, sessionId, type }) => {
    const response = await MovieApi.getInstance().storeReview(type, rating, sessionId, id);
    return response.data.result;
  }
);
export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.results = [];
      state.page = 1;
      state.totalItems = 0;
    },
    increasePage: (state) => {
      state.page = state.page + 1;
    },
    changeType: (state, action) => {
      state.type = action.payload;
    },
    setSessionid: (state, action) => {
      state.sessionId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.fetchingResults = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.fetchingResults = 'idle';
        state.results = action.payload.results;
        state.totalItems = action.payload.totalItems;
      });
    builder
      .addCase(fetchMoreMovies.pending, (state) => {
        state.fetchingResults = 'loading';
      })
      .addCase(fetchMoreMovies.fulfilled, (state, action) => {
        state.fetchingResults = 'idle';
        state.results = [...state.results, ...action.payload.results] as Movie[] | Show[];
      });
    builder
      .addCase(createReview.pending, (state) => {
        state.fetchingResults = 'loading';
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.fetchingResults = 'idle';
        state.results = (state.results as  Array<Movie | Show>).map((item) => item._id === action.payload._id ? action.payload : item) as Movie[] | Show[];
      });
  },
});

export const { setSearch, increasePage, changeType, setSessionid } = movieSlice.actions;
export const selectMoviesOrShows = (state: RootState) => state.movies.results;


export default movieSlice.reducer;
