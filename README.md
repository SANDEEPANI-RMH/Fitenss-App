# Sport and Fitness Mobile App

## Overview

This project is a Sports & Fitness App built using React Native and Expo. It allows users to explore various exercises, view exercise details, and manage their profile. Users can register, login, and logout of the application.

## Features

- User Registration and Login
- Explore Exercises by Categories
- View Exercise Details
- User Profile Management
- Logout Functionality

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/mySecondProject.git
   cd mySecondProject
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the Expo development server:
   ```sh
   expo start
   ```

4. Use the Expo Go app on your mobile device to scan the QR code and run the app.

## Project Structure

```
mySecondProject/
├── app/
│   ├── (tabs)/
│   │   ├── explore.tsx
│   │   ├── index.tsx
│   │   ├── profile.tsx
│   ├── components/
│   │   ├── PasswordInput.tsx
│   ├── constants/
│   │   ├── storage.ts
│   ├── exercise/
│   │   ├── [id].tsx
│   ├── hooks/
│   │   ├── useFetch.tsx
│   ├── utils/
│   │   ├── auth.ts
│   ├── login.tsx
│   ├── register.tsx
├── assets/
│   ├── ...
├── App.tsx
├── package.json
├── README.md
```

## Usage

### Register

1. Open the app and navigate to the Register screen.
2. Fill in the required fields (username, email, password, confirm password).
3. Click the "Register" button.
4. Upon successful registration, a popup will appear confirming the registration. Click "OK" to navigate to the login screen.

### Login

1. Open the app and navigate to the Login screen.
2. Enter your username and password.
3. Click the "Login" button.
4. Upon successful login, you will be redirected to the home screen.

### Explore Exercises

1. Navigate to the Explore tab.
2. Use the search bar to search for workouts.
3. Browse through the categories and click on any category to view exercises.

### View Exercise Details

1. From the home screen or explore tab, click on any exercise card.
2. You will be redirected to the exercise details screen where you can view detailed information about the exercise.

### Profile Management

1. Navigate to the Profile tab.
2. View your profile information, including username and email.
3. Click on the "Logout" button to log out of the app.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
```
