const registrationForm = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const toggleBtn = document.getElementById("togglePassword");
const confirmPasswordBtn = document.getElementById("toggleConfirmPassword");

registrationForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const isRequiredValid = checkRequired([
    username,
    email,
    password,
    confirmPassword,
  ]);

  let isFormValid = isRequiredValid;
  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 15);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkLength(password, 6, 25);
    const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);

    isFormValid =
      isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
  }
  if (isFormValid) {
    alert("Registration successful!");
    registrationForm.reset();
    document.querySelectorAll(".form-group").forEach((group) => {
      group.className = "form-group";
    });
  }
});

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
    return false;
  }
  showSuccess(input2);
  return true;
}

function checkEmail(email) {
  // Email regex that covers most common email formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value.trim())) {
    showSuccess(email);
    return true;
  } else {
    showError(email, "Email is not valid");
    return false;
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${formatFieldName(input)} must be at lest ${min} characters.`,
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${formatFieldName(input)} must be less than ${max} characters.`,
    );
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkRequired(inputArray) {
  let isvalid = true;
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${formatFieldName(input)} is required`);
      isvalid = false;
    } else {
      showSuccess(input);
    }
  });
  return isvalid;
}
// format fied name with proper capitalixation
function formatFieldName(input) {
  // input id:username->Username
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
}

toggleBtn.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
    toggleBtn.classList.remove("fa-eye");
    toggleBtn.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    toggleBtn.classList.remove("fa-eye-slash");
    toggleBtn.classList.add("fa-eye");
  }
});

confirmPasswordBtn.addEventListener("click", function () {
  if (confirmPassword.type === "password") {
    confirmPassword.type="text"
   confirmPasswordBtn.classList.remove("fa-eye");
   confirmPasswordBtn.classList.add("fa-eye-slash");
  } else {
    confirmPassword.type = "password";
   confirmPasswordBtn.classList.remove("fa-eye-slash");
   confirmPasswordBtn.classList.add("fa-eye");
  }
});
