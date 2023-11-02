function editNav() {
  const toggleMenu = document.querySelector("#myTopnav");
  toggleMenu.classList.toggle("responsive");
  }

//REGEX
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const nameRegex = /^[$A-Za-zéèà\s-]{2,}$/; // 2 caractères minimum
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalSuccess = document.querySelector(".modal-success");
const modalBtn = document.querySelectorAll(".modal-btn"); // button to launch form modal
const closeBtn = document.querySelector("#close-btn"); // button to close form modal
const closeBtnSuccess = document.querySelector(".close-success"); // button to close success modal
const closeBtnByBtn = document.querySelector(".close-by-btn"); // button to close success modal by button
const formData = document.querySelectorAll(".formData"); // get all form fields

const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthDate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const locationCheckboxArray = Array.from(
  document.querySelectorAll('input[name="location"]')
);
const conditionCheckbox1 = document.querySelector("#checkbox1");
const conditionCheckbox2 = document.querySelector("#checkbox2");

// launch modal form event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//close modal form event
closeBtn.addEventListener("click", closeModal);

//close success modal
closeBtnSuccess.addEventListener("click", closeSuccessModal);
closeBtnByBtn.addEventListener("click", closeSuccessModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// launch success modal event
function launchSuccessModal() {
  modalSuccess.style.display = "block";
}

// close modal event
function closeModal() {
  modalbg.style.display = "none";
}

// close success modal
function closeSuccessModal() {
  modalSuccess.style.display = "none";
}

// form validation
const submit = document.querySelector(".btn-submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();


  if (checkForm()) {

    let selectedLocation = locationCheckboxArray.find((item) =>
    item.checked ? item.value : null
  );
  
    let sendFormData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      birthDate: birthDate.value,
      quantity: quantity.value,
      location: selectedLocation?.value,
      condition1: conditionCheckbox1.checked,
      condition2: conditionCheckbox2.checked,
    };

    console.log("sendFormData", sendFormData);
    closeModal();
    launchSuccessModal();
  }
});

// check all form fields
function checkForm() {
  const validations = [
    { input: firstName, regex: nameRegex },
    { input: lastName, regex: nameRegex },
    { input: email, regex: emailRegex },
    { input: birthDate, regex: dateRegex },
    { input: quantity, regex: null },
    { input: locationCheckboxArray, regex: null },
    { input: conditionCheckbox1, regex: null },
  ];

  let isValid = true;

  validations.forEach((validation, index) => {
    const { input, regex } = validation;

    let isValidInput = true;

    if (regex) {
      isValidInput = regex.test(input.value); // check if input value matches regex
    } else if (Array.isArray(input)) {
      isValidInput = input.some((item) => item.checked); // check if at least one radio button is checked
    } else if (input.type === "checkbox") {
      isValidInput = input.checked; // check if checkbox is checked
    } else {
      isValidInput = input.value !== ""; // check if input value is not empty
    }

    formData[index].setAttribute("data-error-visible", String(!isValidInput));
    isValid &&= isValidInput;
  });

  return isValid;
}
