
import React from 'react';
import { Song } from '../common/types';

interface SongListProps {
  songs: Song[];
  onUpdate: (songData: Song) => void;
  onDelete: (songId: string) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, onUpdate, onDelete }) => {
  return (
    <div>
      <h2>Song List</h2>
      {songs.map((song) => (
        <div key={song.id}>
          <p>Title: {song.title}</p>
          <p>Artist: {song.artist}</p>
          <p>Genre: {song.genre}</p>
          <button onClick={() => onUpdate(song)}>Update</button>
          <button onClick={() => onDelete(song.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default SongList;