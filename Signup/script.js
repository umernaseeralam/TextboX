import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-F_vM6xYRSSBsrg1-7IWOp2ktbHIrtV4",
  authDomain: "talkbox-293f2.firebaseapp.com",
  databaseURL: "https://talkbox-293f2-default-rtdb.firebaseio.com",
  projectId: "talkbox-293f2",
  storageBucket: "talkbox-293f2.appspot.com",
  messagingSenderId: "23719783807",
  appId: "1:23719783807:web:5109bd103f0feae04efe4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const signupbtn = document.getElementById('signupbtn');

signupbtn.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic client-side validation
    if (name === '') {
        alert('Please enter your name');
        return;
    }
    if (email === '') {
        alert('Please enter your email');
        return;
    }
    if (password === '') {
        alert('Please enter your password');
        return;
    }

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Signup successful!');

        } else {
            alert('Signup failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});
