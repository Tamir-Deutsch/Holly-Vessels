const signin = () => {
    let email = document.getElementById('email').value;
    email = email.toLowerCase();
    let password = document.getElementById('password').value;

    // Passing email and password values to the server 
    fetch('/signIn', {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data == null) {
                let mailAlert = document.getElementById('mailAlert');
                mailAlert.style.display = 'block';
                mailAlert.style.color = 'red';
                mailAlert.style.fontSize = '12px';
            }
            else {
                // Sets a key for user email and saves it in the url
                localStorage.setItem('userEmailItem', email);
                location.href = '/productsPage';
            }
        })
        .catch(err => console.log(err));
}



