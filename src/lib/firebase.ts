import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// 環境変数から設定を読み込み
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCg4wwElwUtLRUGkPIheSTuXpt1bSGkwrE",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "wedding-comment-wall.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "wedding-comment-wall",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "wedding-comment-wall.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "207850893216",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:207850893216:web:714838b1629f59e7adfec5"
};

console.log('Firebase設定:', {
  apiKey: firebaseConfig.apiKey ? '設定済み' : '未設定',
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId
});

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase初期化成功');
} catch (error) {
  console.error('Firebase初期化エラー:', error);
  throw error;
}

// Initialize Firestore
let db;
try {
  db = getFirestore(app);
  console.log('Firestore初期化成功');
  
  // 開発環境でのエミュレーター接続（必要に応じて）
  if (process.env.NODE_ENV === 'development') {
    console.log('開発環境: Firestoreエミュレーターへの接続を試行');
  }
} catch (error) {
  console.error('Firestore初期化エラー:', error);
  throw error;
}

export { db };
export default app;
