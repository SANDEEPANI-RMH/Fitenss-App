import { useState, useEffect } from 'react';

interface Exercise {
  secondaryMuscles: string[];
  targetMuscles: string[];
  instructions: string[];
  exerciseId: string;
  name: string;
  gifUrl: string;
  bodyParts: string[];
  equipments: string[];
}

interface ExerciseData {
  currentPage: number;
  exercises: Exercise[];
  nextPage: string | null;
  previousPage: string | null;
  totalExercises: number;
  totalPages: number;
}

interface ApiResponse {
  success: boolean;
  data: ExerciseData;
}

export const useFetch = (url: string) => {
  const [data, setData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json: ApiResponse = await response.json();
        console.log('API Response:', json); // Add this to debug
       

        if (!json.success) throw new Error('API success flag is false');
        if (!json.data || !Array.isArray(json.data.exercises)) {
          console.error('Invalid data structure', json);
          throw new Error('Invalid data structure received from API');
        }
        
        setData(json.data.exercises);
        setError(null);


      } catch (error) {
        console.error('Fetch error:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;







