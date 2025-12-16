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
    clearError("lastName");
    return true;  // Validation passed
}
