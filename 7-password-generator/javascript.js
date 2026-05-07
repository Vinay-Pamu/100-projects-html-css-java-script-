const password = document.getElementById("password");
const generateBtn = document.getElementById("generate-btn");

const lengthDisplay = document.getElementById("length-value");
const copyButton = document.getElementById("copy-btn");

const lengthslider = document.getElementById("length");
const upperCasechekbox = document.getElementById("uppercase");
const lowerCasecheckbox = document.getElementById("lowercase");
const numbercheckBox = document.getElementById("number");
const symbolcheckbox = document.getElementById("symbol");

const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");

// character sets
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()-_+={}[]|:;,.<>?/";

generateBtn.addEventListener("click", function () {
  const length = Number(lengthslider.value);
  const includeUppercase = upperCasechekbox.checked;
  const includeLowercase = lowerCasecheckbox.checked;
  const includeNumbers = numbercheckBox.checked;
  const includeSymbols = symbolcheckbox.checked;

  if (
    !includeLowercase &&
    !includeUppercase &&
    !includeNumbers &&
    !includeSymbols
  ) {
    alert("please seleted at lest one char type");
    return;
  }

  const newpassword = createRandomPassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  );

  password.value = newpassword;
  updateStrengthMeter(newpassword);

  // history add
const p = document.createElement("li");
p.textContent = newpassword

history.appendChild(p);
});

function createRandomPassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
) {
  let allCharacters = "";
  if (includeUppercase) allCharacters += uppercaseChars;
  if (includeLowercase) allCharacters += lowercaseChars;
  if (includeNumbers) allCharacters += numberChars;
  if (includeSymbols) allCharacters += symbolChars;

  let upadtepassword = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    upadtepassword += allCharacters[randomIndex];
  }
  return upadtepassword;
}

lengthslider.addEventListener("input", function () {
  lengthDisplay.textContent = lengthslider.value;
});

function updateStrengthMeter(upadtepassword) {
  const passwordLength = upadtepassword.length;
  const hasUppercase = /[A-Z]/.test(upadtepassword);
  const hasLowecase = /[a-z]/.test(upadtepassword);
  const hasNumbers = /[0-9]/.test(upadtepassword);
  const hasSymbols = /[!@#$%^&*()-_=+[\]{}\|;:,.<>?]/.test(upadtepassword);

  let strengthScore = 0;

  strengthScore += Math.min(passwordLength * 2, 40);

  if (hasUppercase) strengthScore += 15;
  if (hasLowecase) strengthScore += 15;
  if (hasNumbers) strengthScore += 15;
  if (hasSymbols) strengthScore += 15;

  if (passwordLength < 8) {
    strengthScore = Math.min(strengthScore, 40);
  }

  const safeScore = Math.max(5, Math.min(100, strengthScore));
  strengthBar.style.width = safeScore + "%";

  let strengthLabelText = "";
  let barColor = "";

  if (strengthScore < 40) {
    // week
    barColor = "#fc8181";
    strengthLabelText = "Weak";
  } else if (strengthScore < 70) {
    // medium
    barColor = "#fbd38d";
    strengthLabelText = "Medium";
  } else {
    barColor = "#68d391";
    strengthLabelText = "Strong";
  }

  strengthBar.style.backgroundColor = barColor;
  strengthLabel.textContent = strengthLabelText;
}

copyButton.addEventListener("click", () => {
  if (!password.value) return;

  navigator.clipboard
    .writeText(password.value)
    .then(() => showCopySuccess())
    .catch((error) => console.log("Could not copy:", error));
});

function showCopySuccess() {
  copyButton.classList.remove("far", "fa-copy");
  copyButton.classList.add("fas", "fa-check");
  copyButton.style.color = "#48bb78";

  setTimeout(() => {
    copyButton.classList.remove("fas", "fa-check");
    copyButton.classList.add("far", "fa-copy");
    copyButton.style.color = "";
  }, 1500);
}

const history = document.getElementById("history");



const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click",function(){
    document.body.classList.toggle("dark")
})