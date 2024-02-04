// api/songs.ts
import axios from 'axios';
import { Song } from '../common/types';
// Fetch songs from the server
export const fetchSongsAPI = async () => {
  try {
    const response = await axios.get('/api/songs');
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};

// Add a new song to the server
export const addSongAPI = async (songData: Song) => {
  try {
    const response = await axios.post('/api/songs', songData);
    return response.data;
  } catch (error) {
    console.error('Error adding song:', error);
    throw error;
  }
};

// Update an existing song on the server
export const updateSongAPI = async (context: unknown, songId: string, updatedSongData: any) => {
  try {
    const response = await axios.put(`/api/songs/${songId}`, updatedSongData);
    return response.data;
  } catch (error) {
    console.error('Error updating song:', error);
    throw error;
  }
};

// Delete a song from the server
export const deleteSongAPI = async (songId: string) => {
  try {
    const response = await axios.delete(`/api/songs/${songId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting song:', error);
    throw error;
  }
};

// Filter songs based on certain criteria
export const filterSongsAPI = async (filterParams: any) => {
  try {
    const response = await axios.get('/api/songs', { params: filterParams });
    return response.data;
  } catch (error) {
    console.error('Error filtering songs:', error);
    throw error;
  }
};