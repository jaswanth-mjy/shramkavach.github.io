// Firebase Configuration for ShramKavach
// Get your config from: https://console.firebase.google.com/
// Project Settings → Your apps → Web app → Config

// ⚠️ REPLACE THESE VALUES WITH YOUR ACTUAL FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
  console.log('✓ Firebase initialized successfully');
  
  // Get database reference
  const database = firebase.database();
  
  // Test connection
  database.ref('.info/connected').on('value', (snapshot) => {
    if (snapshot.val()) {
      console.log('✓ Firebase Realtime Database connected');
    } else {
      console.warn('⚠ Firebase disconnected');
    }
  });
  
  // Export for use in other scripts
  window.firebaseDB = database;
  
} catch (error) {
  console.error('Firebase initialization error:', error);
  console.warn('Falling back to localStorage for view tracking');
}
