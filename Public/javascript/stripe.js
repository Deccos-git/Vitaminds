// Create an instance of the Stripe object with your publishable API key
var stripe = Stripe('pk_test_ZEgiqIsOgob2wWIceTh0kCV4001CPznHi4');

var checkoutButton = document.getElementById("checkout-button");
    checkoutButton.addEventListener("click", function () {


      fetch("/create-session", {
        method: "POST",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (session) {

          auth.onAuthStateChanged(User =>{
            if (User){
               const userRef = db.collection("Vitaminders").doc(User.uid)
               
               userRef.collection("Payments").doc().set({
                  SessionId: session.id
                });
              };
            });

            return stripe.redirectToCheckout({
              sessionId: session.id ,
             });
        })
        .then(function (result) {
          // If redirectToCheckout fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using error.message.
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    });