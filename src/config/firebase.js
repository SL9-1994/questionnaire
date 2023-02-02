import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

import 'firebase/compat/firestore';

const firebaseConfig = {
  // 各人の認証情報を記述
  apiKey: "AIzaSyBU8_z6UFNKhqfcMPbdGsem_7Tr_LnV5hE",
  authDomain: "questionnaire-56c93.firebaseapp.com",
  projectId: "questionnaire-56c93",
  storageBucket: "questionnaire-56c93.appspot.com",
  messagingSenderId: "325583491663",
  appId: "1:325583491663:web:6bcb2dc3cf0fa63a02103a",
};

// 認証情報を引数に与えて Firebase App の初期化を行う
firebase.initializeApp(firebaseConfig);
//初期化後のFirebase App をエクスポート
export default firebase;
