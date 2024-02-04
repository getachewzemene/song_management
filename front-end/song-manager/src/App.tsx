
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { fetchSongsStart, addSongSuccess, updateSongSuccess, deleteSongSuccess } from './store/songs/songSlice';
import SongList from './components/SongList';
import SongForm from './components/SongForm';
import Statistics from './components/Statistics';
import { Song } from './common/types';
const App=  () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  const handleAddSong = (songData: Song) => {
    dispatch(addSongSuccess(songData));
  };

  const handleUpdateSong = (songData: Song) => {
    dispatch(updateSongSuccess(songData));
  };

  const handleDeleteSong = (songId: string) => {
    dispatch(deleteSongSuccess(songId));
  };

  return (
    <div>
      <h1>Song Management App</h1>
      <SongForm onSubmit={handleAddSong} />
      <SongList songs={songs} onUpdate={handleUpdateSong} onDelete={handleDeleteSong} />
      <Statistics songs={songs} />
      <input type="text" placeholder="Filter by genre" onChange={(e) => {
      }} />
    </div>
  );
};

export default App;