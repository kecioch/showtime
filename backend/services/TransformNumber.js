const transformAmount = (amount) => {
  // Check if the number has a comma
  if (amount.toString().indexOf(".") !== -1) {
    // Remove the comma and get the decimal places
    var decimalPlaces = amount.toString().split(".")[1];
    // Add a zero if there is only one decimal place
    if (decimalPlaces.length === 1) {
      amount = amount.toString().replace(".", "") + "0";
    } else {
      // Otherwise, just remove the comma
      amount = amount.toString().replace(".", "");
    }
  } else {
    // Add two zeros if there is no comma
    amount = amount.toString() + "00";
  }
  return parseInt(amount);
};

module.exports = { transformAmount };
