function validateForm() {
    // Get the value of the text box
    var textBoxValue = document.getElementById("exampleInputEmail1").value;
    
    // Check if the text box is empty
    if (textBoxValue.trim() == "") {
      // Set the border color to red
      document.getElementById("exampleInputEmail1").style.borderColor = "red";
      // Shake the text box using CSS animation
      document.getElementById("exampleInputEmail1").classList.add("shake");
      
      // Return false to prevent the form from submitting
      return false;
    }
    // If the text box is not empty, return true to submit the form
    return true;
  }
  