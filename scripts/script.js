const form = document.querySelector('form');

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

  event.preventDefault();

  const encoded = JSON.stringify({ form_errors: form_errors });

  fetch('https://httpbin.org/post', { 
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: encoded 
  })

  .then(response => response.json())
  .then(data => {
    const newPage = window.open('', '_blank');
    if (newPage) {
      newPage.document.write(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
    } else {
      console.error('Popup blocked');
    }
  })
  .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', () => {
  const JS_toggle = document.querySelector('theme_switcher');

  if(theme_switcher){
    theme_switcher.style.display = 'inline';
  }
});

function themeSetter(theme){
  const root = document.documentElement;
  if(theme =='light'){
    root.style.setProperty('--primary-color','var(--light-primary-color)');
    root.style.setProperty('--secondary-color','var(--light-secondary-color)');
    root.style.setProperty('--text-color','var(--light-text-color)');
    root.style.setProperty('--form-and-about-me-text-color','var(--light-form-and-about-me-text-color)');
    root.style.setProperty('--background-color','var(--light-background-color)');
  }
  else{
    root.style.setProperty('--primary-color','var(--dark-primary-color)');
    root.style.setProperty('--secondary-color','var(--dark-secondary-color)');
    root.style.setProperty('--text-color','var(--dark-text-color)');
    root.style.setProperty('--form-and-about-me-text-color','var(--dark-form-and-about-me-text-color)');
    root.style.setProperty('--background-color','var(--dark-background-color)');
  }
}

function themeButton(){
  const currentTheme = localStorage.getItem('theme') || 'light';
  let newTheme = '';
  if (currentTheme == 'light'){newTheme = 'dark';}
  else{newTheme = 'light';}

  localStorage.setItem('theme', newTheme);
  themeSetter(newTheme);
}

function setLocalTheme(){
  const local = localStorage.getItem('theme') || 'light';
  if(local){
    themeSetter(local);
    document.getElementById('theme_switcher').checked = local==='dark'
  }
}

document.addEventListener('DOMContentLoaded', setLocalTheme)