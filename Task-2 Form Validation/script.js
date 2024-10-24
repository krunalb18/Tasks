document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let age = document.getElementById("age").value.trim();
    let gender = document.getElementById("gender").value.trim();

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("ageError").textContent = "";
    document.getElementById("genderError").textContent = "";

    let isValid = true;

    if (name === "") {
        document.getElementById("nameError").textContent = "Name is required.";
        isValid = false;
    }

    if (email === "") {
        document.getElementById("emailError").textContent = "Email is required.";
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById("emailError").textContent = "Please enter a valid email.";
        isValid = false;
    }

    if (age === "") {
        document.getElementById("ageError").textContent = "Age is required.";
        isValid = false;
    } else if (isNaN(age) || age < 18) {
        document.getElementById("ageError").textContent = "You must be older than 18.";
        isValid = false;
    }
    
    if (gender === "") {
        document.getElementById("genderError").textContent = "Gender is required.";
        isValid = false;
    }

    if (isValid) {
        let formData = {
            name: name,
            email: email,
            age: age,
            gender: gender
        };
        localStorage.setItem("formData", JSON.stringify(formData));
        alert("Form submitted successfully!");
        document.getElementById("myForm").reset();
    }
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}
