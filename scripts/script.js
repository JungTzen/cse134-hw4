const form_name = document.getElementById("form_name");
const form = document.querySelector("form");
const nameError = document.getElementById("name_error");
const nameRegExp = /^[A-Za-z]+$/;


form_name.addEventListener("input", () => {
    const isValid = form_name.value.length === 0 || nameRegExp.test(form_name.value);
    form_name.className = isValid ? "valid" : "invalid";
    nameError.textContent = isValid ? "" : "Please enter your name :)";
    if(!isValid){
        form_name.setCustomValidity("Make sure your input only contains letters and spaces.");
    }
    else{
        form_name.setCustomValidity("");
    }

    nameError.textContent = isValid ? "" : "Invalid input";
  });

window.addEventListener("load", () => {
  const isValid = form_name.value.length === 0 || nameRegExp.test(form_name.value);
  form_name.className = isValid ? "valid" : "invalid";
});

form_name.addEventListener("input", () => {
  const isValid = form_name.value.length === 0 || nameRegExp.test(email.value);
  
  if (isValid) {
    form_name.className = "valid";
    nameError.textContent = "";
    nameError.className = "error";
  } 
  else {
    form_name.className = "invalid";
  }
});




/*

const email = document.getElementById("email");
const comments = document.getElementById("comments");

email.addEventListener("input", (event) => {
    if (email.validity.valueMissing){
        email.setCustomValidity("Please enter your email :)");
    }
    else if (email.validity.typeMismatch) {
      email.setCustomValidity("Make sure this is a proper email with an @ symbol included");
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


*/