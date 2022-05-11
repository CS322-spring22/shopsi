// self.importScripts('./firebase-app-compat.js')
// self.importScripts('./firebase-auth-compat.js')
// self.importScripts('./firebase-ui-auth.js')
// import { auth } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyAvaIG02Y4fujYX25X4eKTSVLOLka81TBM",
    authDomain: "shopsi-e3ba7.firebaseapp.com",
    projectId: "shopsi-e3ba7",
    storageBucket: "shopsi-e3ba7.appspot.com",
    messagingSenderId: "212209250719",
    appId: "1:212209250719:web:a7c9163690d1d40a634daa",
    measurementId: "G-6TM1MK1VVE"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const ui = new firebaseui.auth.AuthUI(firebase.auth())
const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            
            return false
        },
        uiShown: function() {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('options').style.display = 'none';
            document.getElementById('wrapper').style.pointerEvents = 'none';
        }
    },
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
}
document.getElementById('options').addEventListener('click', () => {
    ui.start('#signInOptions', uiConfig)
})