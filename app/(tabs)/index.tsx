import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import useFetch from '../hooks/useFetch';
import { logout } from '../utils/auth';
import { useSearchParams } from 'expo-router/build/hooks';

export default function Home() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  console.log('username:', username);
  const { data, loading, error } = useFetch(
    'https://exercisedb-api.vercel.app/api/v1/muscles/upper%20back/exercises'
  );

  const exercises = data?.map((exercise: any) => ({
    exerciseId: exercise.exerciseId,
    name: exercise.name,
    bodyParts: exercise.bodyParts,
    equipments: exercise.equipments,
    gifUrl: exercise.gifUrl,
    instructions: exercise.instructions,
    targetMuscles: exercise.targetMuscles,
    secondaryMuscles: exercise.secondaryMuscles,
  })) || [];
  
  const handleExercisePress = (exercise: any) => {
    router.push({
      pathname: `/exercise/[id]`,
      params: { id: exercise.exerciseId, exercise: JSON.stringify(exercise) },
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderExerciseCard = ({ item }: { item: { exerciseId: string; name: string; bodyParts: string[]; equipments: string[]; gifUrl: string; } }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleExercisePress(item)}
    >
      <Image
        source={{ uri: item.gifUrl }}
        style={styles.exerciseImage}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.cardContent}>
        <Text style={styles.exerciseName}>{item.name || 'Unknown Exercise'}</Text>
        <View style={styles.tags}>
          {item.bodyParts.map((part, index) => (
            <Text key={`${item.exerciseId}-body-${index}`} style={styles.tag}>
              {part}
            </Text>
          ))}
          {item.equipments.map((equipment, index) => (
            <Text key={`${item.exerciseId}-equipment-${index}`} style={styles.equipmentTag}>
              {equipment}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Your Workouts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Oops! Something went wrong.</Text>
        <TouchableOpacity onPress={() => window.location.reload()} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.usernameText}>{username}!</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Upper Back Exercises</Text>
      
      <FlatList
        data={exercises}
        renderItem={renderExerciseCard}
        keyExtractor={(item) => item.exerciseId ? item.exerciseId.toString() : Math.random().toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  welcomeText: {
    fontSize: 25,
    color: '#666',
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  exerciseImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    padding: 16,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 14,
    color: '#007AFF',
    textTransform: 'capitalize',
  },
  equipmentTag: {
    backgroundColor: '#fff0f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 14,
    color: '#e83e8c',
    textTransform: 'capitalize',
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff0f0',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc3545',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});