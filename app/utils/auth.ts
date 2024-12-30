// app/utils/auth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';
import { VALIDATION_RULES } from '../constants/validation';
import { User, AuthError } from '../types/auth';

export const validateField = (field: keyof typeof VALIDATION_RULES, value: string): string | null => {
  const rules = VALIDATION_RULES[field];
  
  if (!value) {
    return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
  }

  if ('minLength' in rules && value.length < rules.minLength) {
    return `${field} must be at least ${rules.minLength} characters`;
  }

  if ('maxLength' in rules && value.length > rules.maxLength) {
    return `${field} must be less than ${rules.maxLength} characters`;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.message;
  }

  return null;
};

export const validateForm = (userData: Partial<User>): AuthError[] => {
  const errors: AuthError[] = [];

  Object.keys(userData).forEach((field) => {
    const value = userData[field as keyof User] || '';
    const error = validateField(field as keyof typeof VALIDATION_RULES, value);
    if (error) {
      errors.push({ field, message: error });
    }
  });

  return errors;
};

export const storeUserData = async (userData: User) => {
    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.USER_DATA, JSON.stringify(userData)],
        [STORAGE_KEYS.USER_TOKEN, 'dummy-token'], // In real app, use proper JWT
        ['isLoggedIn', 'true'] // Add this line
      ]);
    } catch (error) {
      console.error('Error storing user data:', error);
      throw error;
    }
  };

  export const getUserData = async () => {
    try {
      const [[, userData], [, isLoggedIn]] = await AsyncStorage.multiGet([
        STORAGE_KEYS.USER_DATA,
        'isLoggedIn'
      ]);
      
      if (!userData || !isLoggedIn) return null;
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  };

export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    return !!token;
  } catch (error) {
    return false;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.USER_TOKEN, STORAGE_KEYS.USER_DATA]);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};