var firebaseConfig = {
apiKey: "AIzaSyB7C2MoAxhLxAEVzIIDONJt3m4kn25mv9M",
authDomain: "fir-project-1-dfd89.firebaseapp.com",
projectId: "fir-project-1-dfd89",
storageBucket: "fir-project-1-dfd89.appspot.com",
messagingSenderId: "426200684196",
appId: "1:426200684196:web:f8d7fe60262c9e952f7831",
measurementId: "G-7FLS07XLFJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// initialize firestore
var db = firebase.firestore();


