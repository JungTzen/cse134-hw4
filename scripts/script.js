const form_name = document.getElementById("form_name");
const email = document.getElementById("email");
const comments = document.getElementById("comments");

const nameError = document.getElementById("name_error");
const emailError = document.getElementById("email_error");
const commentsError = document.getElementById("comments_error");

const maxCharacters = 200;
const counter = document.getElementById("counter");
const commentsInfo = document.getElementById("comments_info")

const nameRegExp = /^[A-Za-z ]+$/;
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const commentsRegExp = /^[A-Za-z0-9 .?!,'+]*$/;

let form_errors = [];

form_name.addEventListener("input", () => {
  let isValid = true;
  
  if (form_name.validity.valueMissing){
    nameError.textContent = "Please enter your name :)";
    isValid = false;
    form_errors.push({field: 'name', type: 'valueMissing', value: form_name.value});
  }
  else if(!nameRegExp.test(form_name.value)){
    nameError.textContent = "Make sure your input only contains letters and spaces.";
    isValid = false;
    form_errors.push({field: 'name', type: 'patternMismatch', value: form_name.value});
  }
  else{
    nameError.textContent = "";
  }

  form_name.className = isValid ? "valid" : "invalid";
  form_name.setCustomValidity(nameError.textContent);
});

email.addEventListener("input", (event) => {
  let isValid = true;
  
  if (email.validity.valueMissing){
    emailError.textContent = "Please enter your email :)";
    isValid = false;
    form_errors.push({field: 'email', type: 'valueMissing', value: email.value});
  }
  else if(!emailRegExp.test(email.value)){
    emailError.textContent = "Make sure this is correct email address.";
    isValid = false;
    form_errors.push({field: 'email', type: 'patternMismatch', value: email.value});
  }
  else{
    emailError.textContent = "";
  }

  email.className = isValid ? "valid" : "invalid";
  email.setCustomValidity(emailError.textContent);
});

comments.addEventListener("input", (event) => {
  let isValid = true;
  
  if (comments.validity.valueMissing){
    commentsError.textContent = "Please leave any comment :)";
    isValid = false;
    form_errors.push({field: 'comments', type: 'valueMissing', value: comments.value});
  }
  else if(!commentsRegExp.test(comments.value)){
    commentsError.textContent = "Make sure your input only contains typical characters (letters, numbers, spaces, and . ? ! , ' +)";
    isValid = false;
    form_errors.push({field: 'comments', type: 'patternMismatch', value: comments.value});
  }
  else{
    commentsError.textContent = "";
  }

  comments.className = isValid ? "valid" : "invalid";
  comments.setCustomValidity(emailError.textContent);
});

comments.addEventListener("keyup", (event) => {
  const entered = comments.value.length;

  if(entered <= maxCharacters){
    commentsInfo.textContent = `${entered} / ${maxCharacters}`;
  }

  if(entered < 150 && entered >= 100){
    commentsInfo.classList = "orange-warning";
  }
  else if(entered >= 150){
    commentsInfo.classList = "red-warning";
  }
  else{
    commentsInfo.classList = "no-warning";
  }
});

form.addEventListener("submit", (event) => {
  const encoded = JSON.stringify(form_errors);
  const server_side = new FormData();
  server_side.append('form_errors', encoded);
});
