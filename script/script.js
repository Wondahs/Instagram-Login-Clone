const showPsswd  = document.getElementById('toggle-password');
const pswdInput = document.getElementById('password');

pswdInput.addEventListener('focus', () => {
    // console.log('focus');
    showPsswd.style.display = 'block';
})

document.addEventListener('click', (e) => {
    if (e.target !== showPsswd && e.target !== pswdInput) {
        showPsswd.style.display = 'none';
    }
})


showPsswd.addEventListener('click', () => {
    // console.log('toggle password');
    // console.log(pswdInput);
    pswdInput.type = pswdInput.type === 'password'? 'text' : 'password';  // Toggle between 'password' and 'text' types
    showPsswd.textContent = pswdInput.type === 'password'? 'Show' : 'Hide'; // Update the button text
})