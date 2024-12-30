// app/register.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { validateForm, storeUserData } from './utils/auth';
import { User, AuthError } from './types/auth';
import { PasswordInput } from './components/PasswordInput';

export default function Register() {
  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<AuthError[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    
    // Validate form
    const validationErrors = validateForm(userData);
    
    // Add password confirmation validation
    if (userData.password !== confirmPassword) {
      validationErrors.push({
        field: 'confirmPassword',
        message: 'Passwords do not match',
      });
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await storeUserData(userData);
      Alert.alert(
        'Success',
        'Registration successful! Please login.',
        [{ text: 'OK', onPress: () => router.replace('/login') }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getFieldError = (field: string) => {
    return errors.find(error => error.field === field)?.message;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, getFieldError('username') && styles.inputError]}
            placeholder="Username"
            value={userData.username}
            onChangeText={(text) => {
              setUserData(prev => ({ ...prev, username: text }));
              setErrors(errors.filter(error => error.field !== 'username'));
            }}
          />
          {getFieldError('username') && (
            <Text style={styles.errorText}>{getFieldError('username')}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, getFieldError('email') && styles.inputError]}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={userData.email}
            onChangeText={(text) => {
              setUserData(prev => ({ ...prev, email: text }));
              setErrors(errors.filter(error => error.field !== 'email'));
            }}
          />
          {getFieldError('email') && (
            <Text style={styles.errorText}>{getFieldError('email')}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <PasswordInput
            placeholder="Password"
            value={userData.password}
            onChangeText={(text) => {
              setUserData(prev => ({ ...prev, password: text }));
              setErrors(errors.filter(error => error.field !== 'password'));
            }}
          />
          {getFieldError('password') && (
            <Text style={styles.errorText}>{getFieldError('password')}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, getFieldError('confirmPassword') && styles.inputError]}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors(errors.filter(error => error.field !== 'confirmPassword'));
            }}
          />
          {getFieldError('confirmPassword') && (
            <Text style={styles.errorText}>{getFieldError('confirmPassword')}</Text>
          )}
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.replace('/login')}
          style={styles.linkButton}
        >
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  inputError: {
    borderColor: '#dc3545',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 15,
    padding: 10,
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
});