import { Exercise } from '../types/exercise';

const BASE_URL = 'https://exercisedb-api.vercel.app/api/v1/muscles/upper%20back/exercises';

export const fetchExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await fetch(`${BASE_URL}/exercises`);
    console.log('API Response:', response.status);
    if (!response.ok) {
      throw new Error('Failed to fetch exercises');
    }
    const data = await response.json();
    console.log('Data received:', data.length, 'exercises');
    return data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};