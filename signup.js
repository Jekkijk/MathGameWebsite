
function validateSignup() {
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("signup-confirm-password").value.trim();
    
    
    if (username === "" || password === "" || confirmPassword === "") {
        showErrorMessage("Please fill in all fields.");
        return;
    }

    
    if (password !== confirmPassword) {
        showErrorMessage("Passwords do not match.");
        return;
    }

    
    const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordStrengthRegex.test(password)) {
        showErrorMessage("Password must be at least 8 characters long and contain both letters and numbers.");
        return;
    }

    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('signup.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Sign Up Successful!");
            location.href = "login.html";  
        } else {
            showErrorMessage(data.message);
        }
    })
    .catch(error => {
        showErrorMessage("Error during signup. Please try again.");
    });
}

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();  
    validateSignup();  
});


function showErrorMessage(message) {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
}