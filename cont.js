// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
  
    // You can process the form data here, for example, send it to a server using AJAX
    // In this example, we'll just display a success message
  
    const successMessage = document.getElementById("successMessage");
    successMessage.style.display = "block";
  
    // Reset the form after submission
    form.reset();
  }
  
  // Attach event listener to the form submission
  document.getElementById("contactForm").addEventListener("submit", handleSubmit);
  