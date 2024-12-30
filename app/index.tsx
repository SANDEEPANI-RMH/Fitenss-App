// app/types/index.tsx

export interface WorkoutItem {
  id: number;
  name: string;
  description: string;
  category: {
    name: string;
  };
}

export interface UserData {
  username: string;
  email: string;
  password: string;
}

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: { username: string };
};

import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/login" />;
}
