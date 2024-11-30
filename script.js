const form_name = document.getElementById("name-input");
const form_number = document.getElementById("card-number-input");
const form_month = document.getElementById("month-input");
const form_year = document.getElementById("year-input");
const form_cvc = document.getElementById("cvc-input");

const confirmBtn = document.getElementById("confirm");

const card_number = document.getElementById("number");
const card_name = document.getElementById("name");
const card_month = document.getElementById("month");
const card_year = document.getElementById("year");
const card_cardCode = document.getElementById("card-code");

const completed = document.getElementById("completed");
const rightContent = document.getElementById("right-content");
const continueBtn = document.getElementById("continue");
const container = document.getElementById("container");

form_name.addEventListener("keyup", change);
form_name.input = form_name;
form_name.output = card_name;
form_name.limit = 30;

form_number.addEventListener("keyup", change);
form_number.input = form_number;
form_number.output = card_number;
form_number.limit = 20;
form_number.format_function = card_format;
form_number.format_label = card_format_label;

form_month.addEventListener("keyup", change);
form_month.input = form_month;
form_month.output = card_month;
form_month.limit = 2;

form_year.addEventListener("keyup", change);
form_year.input = form_year;
form_year.output = card_year;
form_year.limit = 2;

form_cvc.addEventListener("keyup", change);
form_cvc.input = form_cvc;
form_cvc.output = card_cardCode;
form_cvc.limit = 3;

confirmBtn.addEventListener("click", () => {
  const inputs = [form_cvc, form_month, form_year, form_number];
  removeErrors([...inputs, form_name]);
  if (form_name.value === "") emptyError(form_name);
  verifyInputs(inputs);
  let isErrorFree = document.querySelector(".error") === null;
  if (isErrorFree) {
    container.classList.add("slim");
    completed.dataset.status = "active";
    rightContent.dataset.status = "inactive";
  }
});

continueBtn.addEventListener("click", () => {
  container.classList.remove("slim");
  completed.dataset.status = "inactive";
  rightContent.dataset.status = "active";
});

function emptyError(node) {
  node.parentElement.classList.add("error");
  node.parentElement.classList.add("error-empty");
}
function formatError(node) {
  node.parentElement.classList.add("error");
  node.parentElement.classList.add("error-format");
}
function verifyInputs(inputs) {
  for (const input of inputs) {
    if (input.value === "") emptyError(input);
    if (numbersAndSpaces(input)) formatError(input);
  }
}

function removeErrors(inputs) {
  for (const input of inputs) {
    input.parentElement.classList.remove("error");
    input.parentElement.classList.remove("error-empty");
    input.parentElement.classList.remove("error-format");
  }
}

function numbersAndSpaces(s) {
  const rgx = /^[\d\s]+$/g;
  return !rgx.test(s.value);
}

function change(event) {
  const object = event.currentTarget;
  if (object.limit) {
    if (object.limit < object.input.value.length) {
      return;
    }
  }
  if (object.format_function) {
    const formattedValue = object.format_function(object.input.value);
    object.input.value = formattedValue; // Update the input field's value
    object.output.innerHTML = object.format_label(formattedValue);
    return;
  }
  object.output.innerHTML = object.input.value;
}

function card_format(value) {
  value = value.replace(/\D/g, ""); // Remove all non-digit characters
  let formatted = "";

  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formatted += " "; // Add a space every 4 digits
    }
    formatted += value[i];
  }

  return formatted;
}

function card_format_label(v) {
  value = v.replace(/\s+/g, "");
  let generic = "0000000000000000";
  let response = "";

  for (let i = 0; i < generic.length; i++) {
    if (i === 4 || i === 8 || i === 12) {
      response += " ";
    }
    if (value[i]) {
      response += value[i];
      continue;
    } else {
      response += generic[i];
    }
  }
  console.log(response);

  return response;
}
