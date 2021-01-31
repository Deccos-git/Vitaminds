// Update gelukstegoed

!function updateGelukstegoed(){

  db.collection("PaymentSuccess").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
  
          const sessionId = doc.data().Event
          
          const paymentSessionId = sessionId.data.object.id
          const amount = sessionId.data.object.amount_total / 100
  
          const docRef = db.collection("PaymentUser")
          docRef.where("SessionId", "==", paymentSessionId)
          .where("Status", "==", "Not approved")
          .get().then(querySnapshot => {
              querySnapshot.forEach(doc1 => {
      
                  const userSessionId = doc1.data().SessionId
                  const userName = doc1.data().UserName

                  console.log(userName)
              
                      docRef.doc(doc1.id).update({
                          Status: "Approved",
                          Amount: amount,
                          Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                      });
  
                      db.collection("Vitaminders").where("Gebruikersnaam", "==", userName)
                          .get().then(querySnapshot => {
                              querySnapshot.forEach(doc => {
  
                                  console.log(doc.id)
  
                                  db.collection("Vitaminders").doc(doc.id)
                                  .collection("Gelukstegoed")
                                  .doc().set({
                                      Type: "Plus",
                                      Product: `Gelukstegoed ${amount}`, 
                                      PaymentId:  userSessionId,
                                      Amount: amount,
                                      Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                                  });
                              });
                          });    
              });
          }).catch((error) => {
              console.log(error)
          });
      });
  }).catch((error) => {
      console.log(error)
  });
  }();

  // Buy workhop

  const buttonWorkshopLandingStripe = document.getElementById("button-workshop-landing")

function reduceGelukstegoed(){

  const amountArray = []

  const buttonDivLanding = document.getElementById("button-div-landing-workshop")
  const notice = document.createElement("p")
  notice.setAttribute("class", "notice-group-visitor")

auth.onAuthStateChanged(User =>{
  if(User){
  db.collection("Vitaminders").doc(User.uid)
  .collection("Gelukstegoed").get().then(querySnapshot =>{
      querySnapshot.forEach(doc =>{ 

          let amount = doc.data().Amount
          const type = doc.data().Type

          console.log(amount)

          if(type === "Minus"){
              amount *= -1

          amountArray.push(amount)

          } else if (type === "Plus"){

              amountArray.push(amount)
          };
      });
  }).then(() => {
      db.collection("Workshops").where("WorkshopTitle", "==", titel).get().then(querySnapshot => {
          querySnapshot.forEach(doc1 => {

              const price = doc1.data().Price

          const sum = amountArray.reduce((pv, cv) => pv + cv, 0);

         newAmount = sum - price

         console.log(newAmount)

         if(newAmount >= 0){
          auth.onAuthStateChanged(User =>{
              if(User){
                  db.collection("Vitaminders").doc(User.uid)
                  .collection("Gelukstegoed").doc().set({
                      Type: "Minus",
                      Amount: Number(price),
                      Product: `Workshop: <br> ${titel}`,
                      SessionID: idClean,
                      Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                  })
                  .then(() => {
                    arrayOfWorkshopTakers()
                  })
              };
          });
         } else if (newAmount < 0){

          console.log("No money")
          notice.innerHTML = "Je gelukstegoed is te laag om deze workshop te kunnen doen. Klik <u>hier</u> om je gelukstegoed op te hogen."
          notice.addEventListener("click", () => {
              window.open("../gelukstegoed.html", "_self")
          });
          buttonDivLanding.appendChild(notice)
         };
      });
  });
  });
  } else {
    notice.innerHTML = "Maak een gratis <u>account</u> aan om deze workshop te doen.<br><br> Heb je al een Vitaminds account? Klik dan <a href='../inlog.html' >hier </a> om in te loggen."
    notice.addEventListener("click", () => {
        window.open("../Register.html", "_self")
    });
    buttonDivLanding.appendChild(notice)
    buttonWorkshopLandingStripe.style.display = "none"
  };
});  


}; 

function arrayOfWorkshopTakers(){

  db.collection("Workshops").where("WorkshopTitle", "==", titel)
  .get().then(querySnapshot => {
  querySnapshot.forEach(doc1 => {

  const price = doc1.data().Price
  const coach = doc1.data().Coach

  auth.onAuthStateChanged(User =>{
      if(User){
      db.collection("Vitaminders").doc(User.uid)
      .get().then(doc =>{ 

              const auth = doc.data().Gebruikersnaam

              db.collection("Workshops").doc(doc1.id).update({
                  Takers: firebase.firestore.FieldValue.arrayUnion(auth)
              })
              .then(() => {

              db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                        const netPrice = price/100*90 
                        const vitamindsPrice = price/100*10

                        // Earning to coach
                        db.collection("Vitaminders").doc(doc1.id).collection("Earnings").doc().set({
                          Earning: netPrice,
                          Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                          Source: `Workshop <br> ${titel}`,
                          Buyer: auth,
                          Billed: "No"
                        })
                        .then(() => {

                          // Earning to Vitaminds
                          db.collection("Revenue").doc().set({
                            Earning: vitamindsPrice,
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            Source: `Workshop <br> ${titel}`,
                            Buyer: auth,
                            Billed: "No",
                            Coach: coach
                          })
                        })
                        .then(() => {

                          // Close landing
                          workshopLandingPageOuterDiv.style.display = "none"
                        });
                      });
                  });
                });
              });
              };
          });
      });
  });
};

// Button query
if(buttonWorkshopLandingStripe != null){
  buttonWorkshopLandingStripe.addEventListener("click", () => {

    buttonWorkshopLandingStripe.innerText = "Laden.."

      reduceGelukstegoed()
  });
};

// Buy coachgroup
const buyCoachgroupButton = document.getElementById("button-div-landing")

function storeMemberInDatabase(docId){
  auth.onAuthStateChanged(User =>{
    if(User){
    db.collection("Vitaminders").doc(User.uid).get()
    .then(doc => {

      const auth = doc.data().Gebruikersnaam

      db.collection("Coachgroups").doc(docId).update({
        Members: firebase.firestore.FieldValue.arrayUnion(auth)
      });
    });
  };
});
};

function sendEmailbyNewMember(){
  auth.onAuthStateChanged(User =>{
    if(User){
      const userRef = db.collection("Vitaminders").doc(User.uid);
      userRef.get().then(function(doc) {

            const auth = doc.data().Gebruikersnaam
            const authClean = doc.data().GebruikersnaamClean

db.collection("Coachgroups").where("Room", "==", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc1 => {

        const type = doc1.data().Type
        const creator = doc1.data().Creater
        const roomClean = doc1.data().RoomClean

            // Send Email
            db.collection("Vitaminders").where("Gebruikersnaam", "==", creator)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc2 => {

                    const email = doc2.data().Email
                    const naam = doc2.data().GebruikersnaamClean

            db.collection("Mail").doc().set({
                to: email,
                cc: "info@vitaminds.nu",
          message: {
          subject: `Je coachgroep heeft een nieuwe aanmelding.`,
          html: `Hallo ${naam}, </br></br>
                ${authClean} heeft zich aangemeld voor je coachgroep ${roomClean} op Vitaminds! <br><br>
          
                Vriendelijke groet, </br></br>
                Het Vitaminds Team </br></br>
                <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
          Gebruikersnaam: naam,
          Emailadres: email,
          Type: "New coachgroep member"
          }        
          })  
        });
    });
                });
            });
        });
    } else {

        const buttonDiv = document.getElementById("button-div-landing")

        const notice = document.createElement("p")
        notice.setAttribute("class", "notice-group-visitor")

    notice.innerHTML = "Maak een gratis <u>account</u> aan om je aan te melden voor deze groep. <br><br> Heb je al een Vitaminds account? Klik dan <a href='../inlog.html' >hier </a> om in te loggen."
    notice.addEventListener("click", () => {
        window.open("../Register.html", "_self")
    });

    buttonDiv.appendChild(notice)

        };
    });
}

function reduceGelukstegoedCoachgroup(){

  const amountArray = []

  const notice = document.createElement("p")
  notice.setAttribute("class", "notice-group-visitor")

auth.onAuthStateChanged(User =>{
  if(User){
  db.collection("Vitaminders").doc(User.uid)
  .collection("Gelukstegoed").get().then(querySnapshot =>{
      querySnapshot.forEach(doc =>{ 

          let amount = doc.data().Amount
          const type = doc.data().Type

          console.log(amount)

          if(type === "Minus"){
              amount *= -1

          amountArray.push(amount)

          } else if (type === "Plus"){

              amountArray.push(amount)
          };

          console.log(amountArray)
      });
  }).then(() => {

    const agreementModal = document.getElementById("coachgroup-agreement")
    const landingModal = document.getElementById("group-landing-page")

      db.collection("Coachgroups")
      .where("Room", "==", titel)
      .get().then(querySnapshot => {
          querySnapshot.forEach(doc1 => {

              const price = doc1.data().Costs

          const sum = amountArray.reduce((pv, cv) => pv + cv, 0);

         newAmount = sum - price

         console.log(newAmount)

         if(newAmount >= 0){
          auth.onAuthStateChanged(User =>{
              if(User){
                  db.collection("Vitaminders").doc(User.uid)
                  .collection("Gelukstegoed").doc().set({
                      Type: "Minus",
                      Amount: Number(price),
                      Product: `Coachgroep: ${titel}`,
                      SessionID: idClean,
                      Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                  })
                  .then(() => {
                    agreementModal.style.display = "flex"
                    landingModal.style.display = "none"
                    arrayOfCoachgroupSignUps()
                    storeMemberInDatabase(doc1.id)
                    sendEmailbyNewMember()
                  })
              };
          });
         } else if (newAmount < 0){
          notice.innerHTML = "Je gelukstegoed is te laag om aan deze coachgroep mee te kunnen doen. Klik <u>hier</u> om je gelukstegoed op te hogen."
          notice.addEventListener("click", () => {
              window.open("../gelukstegoed.html", "_self")
          });
         };
      });
  });
  });
  } else {
    notice.innerHTML = "Maak een gratis <u>account</u> aan om aan deze coachgroep mee te doen.<br><br> Heb je al een Vitaminds account? Klik dan <a href='../inlog.html' >hier </a> om in te loggen."
    notice.addEventListener("click", () => {
        window.open("../Register.html", "_self")
    });
    buttonDivLanding.appendChild(notice)
    buttonWorkshopLandingStripe.style.display = "none"
  }
}); 
buyCoachgroupButton.appendChild(notice)
}; 

function arrayOfCoachgroupSignUps(){

  db.collection("Coachgroups").where("Room", "==", titel)
  .get().then(querySnapshot => {
  querySnapshot.forEach(doc1 => {

  const price = doc1.data().Costs
  const coach = doc1.data().Creater

  auth.onAuthStateChanged(User =>{
      if(User){
      db.collection("Vitaminders").doc(User.uid)
      .get().then(doc =>{ 

              const auth = doc.data().Gebruikersnaam

              db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                        const netPrice = price/100*90 
                        const vitamindsPrice = price/100*10

                        console.log(vitamindsPrice)

                        // Earning to coach
                        db.collection("Vitaminders").doc(doc1.id).collection("Earnings").doc().set({
                          Earning: netPrice,
                          Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                          Source: `Coachgroep <br> ${titel}`,
                          Buyer: auth,
                          Billed: "No"
                        })
                        .then(() => {

                          // Earning to Vitaminds
                          db.collection("Revenue").doc().set({
                            Earning: vitamindsPrice,
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            Source: `Coachgroep <br> ${titel}`,
                            Buyer: auth,
                            Billed: "No",
                            Coach: coach
                          });
                        });
                      });
                  });
              });
              };
          });
      });
  });
}; 

// Button query
if(buyCoachgroupButton != null){
  buyCoachgroupButton.addEventListener("click", () => {

    buyCoachgroupButton.innerText = "Laden.."

      reduceGelukstegoedCoachgroup()
  });
};




// Create an instance of the Stripe object with your publishable API key
const stripe = Stripe('pk_test_ZEgiqIsOgob2wWIceTh0kCV4001CPznHi4');

const checkoutButtonFive = document.getElementById("checkout-button-five");
const checkoutButtonTen = document.getElementById("checkout-button-ten");
const checkoutButtonFiveteen = document.getElementById("checkout-button-fiveteen");
const checkoutButtonTwenty = document.getElementById("checkout-button-twenty");
const checkoutButtonTwentyfive = document.getElementById("checkout-button-twentyfive");
const checkoutButtonThirty = document.getElementById("checkout-button-thirty");
const checkoutButtonThirtyfive = document.getElementById("checkout-button-thirtyfive");
const checkoutButtonFourty = document.getElementById("checkout-button-fourty");
const checkoutButtonFifty = document.getElementById("checkout-button-fifty");
const checkoutButtonSixty = document.getElementById("checkout-button-sixty");
const checkoutButtonSeventy = document.getElementById("checkout-button-seventy");
const checkoutButtonEighty = document.getElementById("checkout-button-eighty");
const checkoutButtonNinety = document.getElementById("checkout-button-ninety");
const checkoutButtonHundred = document.getElementById("checkout-button-hundred");
const checkoutButtonHundredfifty = document.getElementById("checkout-button-hundredfifty");
const checkoutButtonTwohundred = document.getElementById("checkout-button-twohundred");

createSession("/create-session-five", checkoutButtonFive)
createSession("/create-session-ten", checkoutButtonTen)
createSession("/create-session-fiveteen", checkoutButtonFiveteen)
createSession("/create-session-twenty", checkoutButtonTwenty)
createSession("/create-session-twentyfive", checkoutButtonTwentyfive)
createSession("/create-session-thirty", checkoutButtonThirty)
createSession("/create-session-thirtyfive", checkoutButtonThirtyfive)
createSession("/create-session-fourty", checkoutButtonFourty)
createSession("/create-session-fifty", checkoutButtonFifty)
createSession("/create-session-sixty", checkoutButtonSixty)
createSession("/create-session-seventy", checkoutButtonSeventy)
createSession("/create-session-eighty", checkoutButtonEighty)
createSession("/create-session-ninety", checkoutButtonNinety)
createSession("/create-session-hundred", checkoutButtonHundred)
createSession("/create-session-hundredfifty", checkoutButtonHundredfifty)
createSession("/create-session-twohundred", checkoutButtonTwohundred)

function createSession(sessionNumber, buttonProduct){

  buttonProduct.addEventListener("click", function () {

    buttonProduct.innerText = "Laden"

  fetch(sessionNumber, {
    method: "POST",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (session) {

      auth.onAuthStateChanged(User =>{
        if (User){
           const userRef = db.collection("Vitaminders").doc(User.uid)
           userRef.get().then(doc => {

            const gebruikersnaam = doc.data().Gebruikersnaam
            const email = doc.data().Email
           
            db.collection("PaymentUser").doc().set({
              SessionId: session.id,
              UserName: gebruikersnaam,
              Email: email,
              Status: "Not approved"
            })
            
          }).then(() => {
            stripe.redirectToCheckout({
              sessionId: session.id
             }); 
          })
          };
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
};

