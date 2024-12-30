// app/tabs/explore.tsx
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function TabExplore() {
  const categories: { id: number; name: string; icon: 'barbell-outline' | 'heart-outline' | 'body-outline' | 'flash-outline' | 'fitness-outline' | 'shield-outline'; count: number; }[] = [
    { id: 1, name: 'Strength Training', icon: 'barbell-outline', count: 45 },
    { id: 2, name: 'Cardio', icon: 'heart-outline', count: 32 },
    { id: 3, name: 'Yoga', icon: 'body-outline', count: 28 },
    { id: 4, name: 'HIIT', icon: 'flash-outline', count: 15 },
    { id: 5, name: 'Stretching', icon: 'fitness-outline', count: 20 },
    { id: 6, name: 'Core', icon: 'shield-outline', count: 25 },
  ];
  return (
    <View style={exploreStyles.container}>
      <Text style={exploreStyles.header}>Explore Workouts</Text>
      
      <View style={exploreStyles.searchContainer}>
        <Ionicons name="search-outline" size={24} color="#666" />
        <TextInput
          style={exploreStyles.searchInput}
          placeholder="Search workouts..."
          placeholderTextColor="#666"
        />
      </View>

      <Text style={exploreStyles.sectionTitle}>Categories</Text>
      <View style={exploreStyles.categoriesGrid}>
        {categories.map(category => (
          <TouchableOpacity 
            key={category.id} 
            style={exploreStyles.categoryCard}
          >
            <Ionicons name={category.icon} size={32} color="#007AFF" />
            <Text style={exploreStyles.categoryName}>{category.name}</Text>
            <Text style={exploreStyles.categoryCount}>{category.count} workouts</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const exploreStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryCard: {
    width: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    margin: 5,
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  categoryCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  
});