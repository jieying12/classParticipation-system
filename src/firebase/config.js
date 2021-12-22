import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBdXAyO7ba_KYHwt89DObh9VqHlJ8bCqv4",
  authDomain: "classparticipationsystem-a1d23.firebaseapp.com",
  projectId: "classparticipationsystem-a1d23",
  storageBucket: "classparticipationsystem-a1d23.appspot.com",
  messagingSenderId: "272936192876",
  appId: "1:272936192876:web:64198f37bf9704d94d4149"
};

// init firebase
firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }