const form_name = document.getElementById("form_name");
const email = document.getElementById("email");
const comments = document.getElementById("comments");

form_name.addEventListener("input", (event) => {
    if (form_name.validity.valueMissing){
        form_name.setCustomValidity("Please enter your name :)");
    }
    else if (form_name.validity.patternMismatch) {
        form_name.setCustomValidity("Make sure your input only contains letters and spaces.");
    } 
    else {
        form_name.setCustomValidity("");
    }
  });

email.addEventListener("input", (event) => {
    if (email.validity.valueMissing){
        email.setCustomValidity("Please enter your email :)");
    }
    else if (email.validity.typeMismatch) {
      email.setCustomValidity("Make sure this is a proper email with the @ symbol");
    } 
    else {
      email.setCustomValidity("");
    }
  });

comments.addEventListener("input", (event) => {
    if (comments.validity.valueMissing){
        comments.setCustomValidity("Please enter your comments :)");
    }
    else if (form_name.validity.patternMismatch) {
        comments.setCustomValidity("Make sure your input only contains typical characters (letters, numbers, spaces, and . ? ! , ' +)");
    } 
    else {
        comments.setCustomValidity("");
    }
  });