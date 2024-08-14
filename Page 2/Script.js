const MessageList = [];

function SendMsg() {
    const InputField = document.querySelector('.MessageInput');
    const InputValue = InputField.value.trim();

    if (InputValue) {
        MessageList.push(InputValue);
        console.log(MessageList);

        const MessageScreen = document.querySelector('.MessageScreenBackground');

        // Create a new message bubble
        const NewMessageBubble = document.createElement('div');
        NewMessageBubble.classList.add('MessageBubble2');
        NewMessageBubble.innerText = InputValue;

        // Append the new message bubble to the message screen
        MessageScreen.appendChild(NewMessageBubble);

        // Scroll to the bottom of the message screen
        MessageScreen.scrollTop = MessageScreen.scrollHeight;

        // Clear the input field after sending the message
        InputField.value = '';
    }
}
