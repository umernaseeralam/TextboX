// inbox.js
import { auth, database } from './firebaseConfig.js';
import { ref, push, onChildAdded, set, get } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

let currentUser = null;
let currentChat = null;

// Function to initialize the inbox
function initInbox() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            loadContacts();
            setupMessageSending();
        } else {
            // Redirect to login page if not authenticated
            window.location.href = 'login.html';
        }
    });
}

// Function to load contacts
function loadContacts() {
    const contactsRef = ref(database, 'users');
    get(contactsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const contactsData = snapshot.val();
            const contactsContainer = document.querySelector('.Inbox');
            contactsContainer.innerHTML = '<h1 class="InboxText">Inbox</h1>';
            
            Object.keys(contactsData).forEach((userId) => {
                if (userId !== currentUser.uid) {
                    const contact = contactsData[userId];
                    const contactElement = createContactElement(userId, contact.name);
                    contactsContainer.appendChild(contactElement);
                }
            });
        }
    });
}

// Function to create a contact element
function createContactElement(userId, name) {
    const contactHolder = document.createElement('div');
    contactHolder.classList.add('ContactHolder');
    contactHolder.innerHTML = `
        <div>
            <img src="Images/ProfileIcon.svg" class="ProfilePic" alt="${name}">
        </div>
        <div class="NameText">${name}</div>
    `;
    contactHolder.addEventListener('click', () => openChat(userId, name));
    return contactHolder;
}

// Function to open a chat
function openChat(userId, name) {
    currentChat = userId;
    const messageScreen = document.querySelector('.MessageScreenBackground');
    messageScreen.innerHTML = '';
    
    const messagesRef = ref(database, `chats/${currentUser.uid}/${userId}`);
    onChildAdded(messagesRef, (snapshot) => {
        const message = snapshot.val();
        displayMessage(message);
    });

    // Update UI to show active chat
    document.querySelectorAll('.ContactHolder').forEach(el => el.classList.remove('ContactHolder1'));
    document.querySelector(`.ContactHolder:nth-child(${Array.from(document.querySelectorAll('.ContactHolder')).findIndex(el => el.querySelector('.NameText').textContent === name) + 2})`).classList.add('ContactHolder1');
}

// Function to display a message
function displayMessage(message) {
    const messageScreen = document.querySelector('.MessageScreenBackground');
    const messageBubble = document.createElement('div');
    messageBubble.classList.add(message.sender === currentUser.uid ? 'MessageBubble2' : 'MessageBubble1');
    messageBubble.textContent = message.text;
    messageScreen.appendChild(messageBubble);
    messageScreen.scrollTop = messageScreen.scrollHeight;
}

// Function to setup message sending
function setupMessageSending() {
    const sendButton = document.querySelector('.SendButton');
    const messageInput = document.querySelector('.MessageInput');

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Function to send a message
function sendMessage() {
    const messageInput = document.querySelector('.MessageInput');
    const messageText = messageInput.value.trim();

    if (messageText && currentChat) {
        const message = {
            sender: currentUser.uid,
            text: messageText,
            timestamp: Date.now()
        };

        const senderRef = ref(database, `chats/${currentUser.uid}/${currentChat}`);
        const receiverRef = ref(database, `chats/${currentChat}/${currentUser.uid}`);

        push(senderRef, message);
        push(receiverRef, message);

        messageInput.value = '';
    }
}

// Initialize the inbox when the page loads
document.addEventListener('DOMContentLoaded', initInbox);