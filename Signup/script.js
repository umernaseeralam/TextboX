// signup.js
import { auth, database } from '../FireBaseConfig/firebaseConfig';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.querySelector('.SignupBtn');
    
    signupBtn.addEventListener('click', (event) => {
        event.preventDefault();
        
        const name = document.querySelector('input[placeholder="Enter your name"]').value;
        const email = document.querySelector('input[placeholder="Enter your Email"]').value;
        const password = document.querySelector('input[placeholder="Enter your Password"]').value;
        const confirmPassword = document.querySelector('input[placeholder="Re-Enter your Password"]').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return set(ref(database, 'users/' + user.uid), {
                    name: name,
                    email: email
                });
            })
            .then(() => {
                alert('Signup successful!');
                // Redirect to sign-in page
                window.location.href = '../index.html';
            })
            .catch((error) => {
                alert('Signup failed: ' + error.message);
            });
    });
});