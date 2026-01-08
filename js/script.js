// Get the form element from the DOM (Document Object Model) using its ID "contactForm"
// This allows us to listen from submission events.

const form = document.getElementById("contactForm");

// Get the success toast /notification element that will show when form submission is successful.
const successToast = document.getElementById("successToast");

// * Get all form input element by theur ID so we can access their value and validate them
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const consentInput = document.getElementById("consent");

// ** HELPER FUNCTIONS
/* Display an error message for a specific form field 
   fieldName - The name of the field that has an error
   message - The error message to display
   */

function setError(fieldName, message){
    // Find the form control div using the data-field attribute (e.g., data-field="firstName")
    const control = document.querySelector(`.form-control[data-field="${fieldName}"]`);

    // find the eroe message element for this field (e.g., element with id="firstNameError")
    const errorE1 = document.getElementById(`${fieldName}Error`);

    // if either element doesn't exit, the function to prevent errors
    if(!control || !errorE1) return;

    // Add the "error" CSS class to form control to visually indicate an error
    // This might change border color, background, etc. based on your CSS
    control.classList.add("error");

    // set the text content of the error element to show the error message
    errorE1.textContent = message;

    // Make the error element visible (assuming it's hidden by default)
    errorE1.style.display = "block";
}

// ** Clears any error message for a specific form field
// fieldName - The name of the field to clear errors from

function clearError(fieldName){
    // find the form control div using the data-field attribute (e.g.. data-field="firstName")

    const control = document.querySelector(`.foem-control[data-field="${fieldName}"]`);
    // Find the error message element for this field (e.g., element with id="firstNameError")

    const errorE1 = document.getElementById(`${fieldName}Error`);

    // If either element doesn't exist, exit the function
    if (!control || !errorE1) return;

    // Remove the "error" CSS class to restore normal styling
    control.classList.remove("error");

    // clear any error text
    errorE1.textcontent = "";

    // Hide the error element 

    errorE1.style.display = "none";
}

// * Validate the first name field
// {boolean} - True if valid, false if invalid

function validateFirstName(){
    const value = firstNameInput.value.trim();

    // Check if the value is empty 
    if(!value){
        // If empty, show error message
        setError("firstName", "This field is required");
        return false; // validation failed
    }

    // if Valid, clear an existing error
    clearError("firstName");
    return true;  // Validation passed
}

// * Validate the Last name field
// {boolean} - True if valid, false if invalid

function validateLastName(){
    const value = lastNameInput.value.trim();

    // Check if the value is empty 
    if(!value){
        // If empty, show error message
        setError("lastName", "This field is required");
        return false; // validation failed
    }

    // if Valid, clear an existing error
    clearError("lastName");
    return true;  // Validation passed
}


function validateEmail(){
    // Get the value from the input and trim whitespace 
    const value = emailInput.value.trim();

    // * Regular expression to validate email format
// pattern : non-whitespace characters, then @, then non-whitespace, then ., then non-whitespace
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the value is empty 
    if(!value){
        // If empty, show error message
        setError("email", "This field is required");
        return false; // validation failed
    }

    // Check if the email matches the valid format using regex
    if(!emailRegex.test(value)){
        setError("email", "Please enter a valid email address");
    }

    // if Valid, clear an existing error
    clearError("email");
    return true;  // Validation passed
}

// * Validate the query typr radio buttons
// {boolean} - True if valid, false if invalid

function validateQueryType(){
    // find which radio button is checked (if any)
    // querySelector returns the first matching element of null if none found
    const selected = document.querySelector('input[name="queryType"]:checked');

    // if no radio button is selected

    if(!selected){
        // if empty, show error message
        setError("queryType", "please select a query type");
        return false; // validation failed
    }
    // if valid, clear any existing error
    clearError("queryType");
    return true;  // Validation passed
}


// validate the message textarea
function validateMessage(){
    // Get the value from the input and trim whitespace
    const value = messageInput.value.trim();

    // Check if the value is empty
    if(!value){
        // if empty, show error message
        setError("message", "This field is required");
        return false;  // validation failed
    }

    // if valid, clear any existing error
    clearError("message");
    return true;  // validation passsed
}

// validates the consent checkbox
function validateConsent(){

    // Check if the value is empty
    if(!consentInput.checked){
        // if not checked, shoe error message
        setError("consent", "To submit this form, please consent to being contacted");
        return false;  // validation failed
    }

    // if checked, clear any error
    clearError("consent");
    return true;  // validation passed
}


// validates the entire form by checking all fields
function validateForm(){
    // call all validation function and store their results
    const v1 = validateFirstName();
    const v2 = validateLastName();
    const v3 = validateEmail();
    const v4 = validateQueryType();
    const v5 = validateConsent();
    const v6 = validateConsent();

    // * Return true only if ALL validations passed (all are true)
    // * Using Logical AND: return onlt if all conditions are true
    return v1 && v2 && v3 && v4 && v5 && v6
}

// Show a success notification toast and automatically hides it after 3 seconds
function showSuccessToast(){
    successToast.classList.add('show');
    setTimeout(() => {
        successToast.classList.remove("show");
    }, 3000)
}

// * Resets radio buttons and clears all error messages (for form rest)


function restRadioAndErrors(){
  // Get all radio buttons with name="queryType"
  const radios = document.querySelectorAll('input[name="queryType"]');
  // Loop through each radio button and uncheck it.
  radios.forEach((r) => (r.checked = false));

}

// * EVENT LISTENERS FOR REAL-TIME VALIDATION

// Add blur event listeners to validate fields when user leaves them
// "blur" event fires when an element loses focus (user clicks/tabs away)



// When user leaves first name field, validate it
firstNameInput.addEventListener("blur", validateFirstName);

// When user leave last name field, validate it.
lastNameInput.addEventListener("blur", validateLastName);

// When user leaves email field, validate it.
emailInput.addEventListener("blur", validateEmail);

// When user leaves message field, validate it.
messageInput.addEventListener("blur", validateMessage);

// When consent checkbox changes (checked/unchecked), validate it.
consentInput.addEventListener("change", validateConsent);


// * get all query type radio buttons

const queryRadios = document.querySelectorAll('input[name="queryType"]');


// Add changes event listener too each radio button
// When any radio button selection changes, validate the query type

queryRadios.forEach((radio) => 
  radio.addEventListener("change", validateQueryType)
);

// FORM SUBMIT HANDLER

// Add submit event listener to the form
form.addEventListener("submit", function(e) {
  // Prevent the default form submission (Which would reload the page)
  e.preventDefault();

  // Validate the entire form

  const isValid  = validateForm();

  // If form is not valid, stop here (don't submit)

  if(!isValid) return;

  // If form IS valid:

  // 1. Reset the form(clears all input value)
  form.reset();


  // 2. Reset radio buttons and clear any remaining errors
  restRadioAndErrors();

  // 3. Clear errors for all fields (just to be sure)
  const fields = ["firstName", "lastName", "email", "queryType", "message", "consent"];

  fields.forEach(clearError);
  // 4. Show success notification
  showSuccessToast();
});
