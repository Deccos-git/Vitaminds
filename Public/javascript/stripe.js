// Create an instance of the Stripe object with your publishable API key
var stripe = Stripe('pk_test_ZEgiqIsOgob2wWIceTh0kCV4001CPznHi4');
var checkoutButtonFive = document.getElementById('checkout-button-five');


function buyProduct(checkoutButton){
  checkoutButton.addEventListener('click', function() {
    // Create a new Checkout Session using the server-side endpoint you
    // created in step 3.

    console.log("test")
    fetch('/create-checkout-session-five', {
      method: 'POST',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(session) {
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function(result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using `error.message`.
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
  });
};

buyProduct(checkoutButtonFive)