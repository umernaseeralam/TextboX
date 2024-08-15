// signin.js
import { auth } from '/TextboX/FireBaseConfig/firebaseConfig.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    const signinBtn = document.querySelector('.SigninBtn');
    
    signinBtn.addEventListener('click', (event) => {
        event.preventDefault();
        
        const email = document.querySelector('input[placeholder="Enter your Email"]').value;
        const password = document.querySelector('input[placeholder="Enter your Password"]').value;
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert('Sign in successful! Please close this alert to open Inbox.');
                // Redirect to inbox page
                window.location.href = 'Page 2/index.html';
            })
            .catch((error) => {
                alert('Sign in failed: ' + error.message);
            });
    });
});