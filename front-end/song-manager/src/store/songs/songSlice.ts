import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchSongsAPI, addSongAPI, updateSongAPI, deleteSongAPI } from '../../api/songs';
import { Song } from '../../common/types';
import { Draft } from 'immer';

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
};

export const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSongStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      const updatedSong = action.payload;
      const index = state.songs.findIndex((song) => song.id === updatedSong.id);
      if (index !== -1) {
        state.songs[index] = updatedSong;
      }
      state.loading = false;
      state.error = null;
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      const songId = action.payload;
      state.songs = state.songs.filter((song) => song.id !== songId);
      state.loading = false;
      state.error = null;
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    filterSongs: (state, action: PayloadAction<string>) => {
      const genre = action.payload.toLowerCase();
      state.songs = state.songs.filter((song) => song.genre.toLowerCase().includes(genre));
    },
  },
});

// Actions
export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure
} = songSlice.actions;

// Sagas
function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    const songs: Song[] = yield call(fetchSongsAPI);
    yield put(fetchSongsSuccess(songs));
  } catch (error:any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* addSongSaga(action: PayloadAction<Song>): Generator<any, void, any> {
  try {
    const song: Song = yield call(addSongAPI, action.payload);
    yield put(addSongSuccess(song));
  } catch (error:any) {
    yield put(addSongFailure(error.message));
  }
}

function* updateSongSaga(action: PayloadAction<Song>): Generator<any, void, any> {
  try {
    const { id, ...updatedData } = action.payload;
    const song: Song = yield call(updateSongAPI, null, id, updatedData);
    yield put(updateSongSuccess(song));
  } catch (error:any) {
    yield put(updateSongFailure(error.message));
  }
}

function* deleteSongSaga(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    const songId: string = action.payload;
    yield call(deleteSongAPI, songId);
    yield put(deleteSongSuccess(songId));
  } catch (error:any) {
    yield put(deleteSongFailure(error.message));
  }
}

export function* songSaga(): Generator<any, void, any> {
  yield takeLatest(fetchSongsStart.type, fetchSongsSaga);
  yield takeLatest(addSongStart.type, addSongSaga);
  yield takeLatest(updateSongStart.type, updateSongSaga);
  yield takeLatest(deleteSongStart.type, deleteSongSaga);
}

export default songSlice.reducer;