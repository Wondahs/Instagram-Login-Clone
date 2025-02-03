const showPsswd  = document.getElementById('toggle-password');

showPsswd.addEventListener('click', () => {
    console.log('toggle password');
    const pswdInput = document.getElementById('password');
    console.log(pswdInput);
    pswdInput.type = pswdInput.type === 'password'? 'text' : 'password';  // Toggle between 'password' and 'text' types
    showPsswd.textContent = pswdInput.type === 'password'? 'Show' : 'Hide'; // Update the button text
})