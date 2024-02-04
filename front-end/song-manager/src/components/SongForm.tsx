// components/SongForm.tsx
import React, { useState } from 'react';
import { Song } from '../common/types';
import { nanoid } from '@reduxjs/toolkit';
interface SongFormProps {
  onSubmit: (songData: Song) => void;
}


const SongForm: React.FC<SongFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({id:nanoid(), title, artist, genre });
    setTitle('');
    setArtist('');
    setGenre('');
  };

  return (
    <div>
      <h2>Add Song</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
        <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default SongForm;