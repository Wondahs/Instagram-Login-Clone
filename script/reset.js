const usernameInput = document.getElementById('username');
const loginBtn = document.getElementById('login-btn');

const toggleLoginButton = () => {
    loginBtn.disabled = !(usernameInput.value.length > 5);
};

usernameInput.addEventListener('input', toggleLoginButton);