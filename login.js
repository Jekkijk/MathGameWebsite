
function validateLogin() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    
    
    if (username === "" || password === "") {
        document.getElementById("error-message").textContent = "Please fill out all fields.";
        return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            location.href = "game.html";  
        } else {
            document.getElementById("error-message").textContent = data.message;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("error-message").textContent = "Something went wrong!";
    });
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();  
    validateLogin();  
});


function showErrorMessage(message) {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
}