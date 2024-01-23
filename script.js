// 'DOMContentLoaded' event is fired when the initial HTML document has been completely loaded.
document.addEventListener('DOMContentLoaded', function() {
    
  // Get references to the necessary elements
  const billInput = document.querySelector('#bill-input-field'); // Reference to the bill input field
  const tipButtons = document.querySelectorAll('.tip-percentage'); // References to all tip percentage buttons
  const customTipInput = document.querySelector('#custom-tip-input-field'); // Reference to the custom tip input field
  const numOfPeopleInput = document.querySelector('#num-of-people-input-field'); // Reference to the number of people input field
  const tipAmountPerPerson = document.querySelector('#tip-amount-per-person'); // Reference to the tip amount per person element
  const totalPerPerson = document.querySelector('#total-per-person'); // Reference to the total amount per person element
  const resetButton = document.querySelector('#reset-button'); // Reference to the reset button

  // Function to calculate tip and total per person
  function calculateTip() {
    const billAmount = parseFloat(billInput.value); // Parse bill amount as a floating-point number
    const tipPercentage = parseFloat(customTipInput.value) || 0; // Parse custom tip percentage as a floating-point number, default to 0 if empty
    const numOfPeople = parseFloat(numOfPeopleInput.value) || 1; // Parse number of people as a floating-point number, default to 1 if empty

    if (billAmount > 0 && numOfPeople > 0) {
      // Calculate tip amount and total amount per person
      const tipAmount = (billAmount * (tipPercentage / 100)) / numOfPeople;
      const totalAmount = (billAmount / numOfPeople) + tipAmount;

      // Update displayed tip and total amounts
      tipAmountPerPerson.textContent = `$${tipAmount.toFixed(2)}`;
      totalPerPerson.textContent = `$${totalAmount.toFixed(2)}`;
    } else {
      // If either bill amount or number of people is not valid, set tip and total amounts to zero
      tipAmountPerPerson.textContent = '$0.00';
      totalPerPerson.textContent = '$0.00';
    }
  }

  // Attach event listeners to input fields for real-time calculations
  billInput.addEventListener('input', calculateTip);
  customTipInput.addEventListener('input', calculateTip);
  numOfPeopleInput.addEventListener('input', calculateTip);

  // Attach event listeners to tip percentage buttons to set custom tip and trigger calculation
  tipButtons.forEach(button => {
    button.addEventListener('click', function() {
      customTipInput.value = button.textContent.slice(0, -1); // Set custom tip input value based on the clicked button
      calculateTip(); // Trigger calculation
    });
  });

  // Attach event listener to reset button to reset all input fields and result values
  resetButton.addEventListener('click', function() {
    billInput.value = '0';
    customTipInput.value = '';
    numOfPeopleInput.value = '0';
    tipAmountPerPerson.textContent = '$0.00';
    totalPerPerson.textContent = '$0.00';
  });
});