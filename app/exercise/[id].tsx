import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';

export default function ExerciseDetail() {
  const { exercise } = useLocalSearchParams();
  const parsedExercise = typeof exercise === 'string' ? JSON.parse(exercise) : null;
  console.log('Parsed exercise:', parsedExercise);

  if (!parsedExercise) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading exercise details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: parsedExercise.gifUrl || 'https://via.placeholder.com/150' }}
        style={styles.exerciseImage}
        contentFit="cover"
        transition={1000}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{parsedExercise.name || 'Unknown Exercise'}</Text>
        <Text style={styles.subtitle}>Target Muscles:</Text>
        <Text style={styles.bodyText}>
          {parsedExercise.targetMuscles?.join(', ') || 'N/A'}
        </Text>
        <Text style={styles.subtitle}>Body Parts:</Text>
        <Text style={styles.bodyText}>
          {Array.isArray(parsedExercise.bodyParts) ? parsedExercise.bodyParts.join(', ') : parsedExercise.bodyParts || 'N/A'}
        </Text>
        <Text style={styles.subtitle}>Equipments:</Text>
        <Text style={styles.bodyText}>
          {Array.isArray(parsedExercise.equipments) ? parsedExercise.equipments.join(', ') : 'N/A'}
        </Text>
        <Text style={styles.subtitle}>Instructions:</Text>
        {parsedExercise.instructions?.length > 0 ? (
          parsedExercise.instructions.map((step: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
            <Text key={index} style={styles.bodyText}>
              {(index as number) + 1}. {step}
            </Text>
          ))
        ) : (
          <Text style={styles.bodyText}>N/A</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    textAlign: 'center',
    marginTop: 24,
    fontWeight: '600',
  },
  exerciseImage: {
    width: '100%',
    height: 350,
    borderRadius: 0,
    backgroundColor: '#e9ecef',
  },
  details: {
    marginTop: -20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 20,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  tag: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  muscleTag: {
    backgroundColor: '#e8f0fe',
  },
  bodyPartTag: {
    backgroundColor: '#fff0f6',
  },
  equipmentTag: {
    backgroundColor: '#f0f9ff',
  },
});