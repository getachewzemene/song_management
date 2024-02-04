// components/Statistics.tsx
import React from 'react';
import { Song } from '../common/types';

interface StatisticsProps {
  songs: Song[];
}

const Statistics: React.FC<StatisticsProps> = ({ songs }) => {
  const totalSongs = songs.length;

  // Calculate unique artists
  const uniqueArtists = Array.from(new Set(songs.map((song) => song.artist))).length;

  // Calculate unique genres
  const uniqueGenres = Array.from(new Set(songs.map((song) => song.genre))).length;

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Songs: {totalSongs}</p>
      <p>Unique Artists: {uniqueArtists}</p>
      <p>Unique Genres: {uniqueGenres}</p>
    </div>
  );
};

export default Statistics;