//Register CH

    // Open make an coach account with CTA button

    const makeCoachAccoutnButtonBasic = document.getElementById("become-member-button-basic")
    const makeCoachAccoutnButtonPremium = document.getElementById("become-member-button-premium")
    const coachRegisterForm = document.getElementById("coach-register-form")
    const subscriptionType = document.getElementById("subscription-type")
    const registerDiv = document.getElementById("register-div")

    function showRegisterForm(button, type){

    button.addEventListener("click", () => {

    coachRegisterForm.style.display = "flex"
    registerDiv.style.display = "flex"

    subscriptionType.innerText = type

    coachRegisterForm.scrollIntoView()

    });
  };

  showRegisterForm(makeCoachAccoutnButtonBasic, "Basic")
  showRegisterForm(makeCoachAccoutnButtonPremium, "Premium")
  
!function registerCoach(){

  const button = document.getElementById("register-button-coach")
  const successModal = document.getElementById("success-modal")
  
  if(button != null){
  button.addEventListener("click", () => {

    console.log("test")

    button.innerText = "Laden.."

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-wachtwoord").value;
  const passwordInput = document.getElementById("register-wachtwoord")
  const repeatPassword = document.getElementById("register-wachtwoord-repeat").value
  const repeatPasswordInput = document.getElementById("register-wachtwoord-repeat")
  const naam = document.getElementById("register-gebruikersnaam").value;
  const subscriptionType = document.getElementById("subscription-type").innerText

  const colour = getRandomColor()

  if (password != repeatPassword){
    passwordInput.style.borderColor = "red"
    repeatPasswordInput.style.borderColor = "red"
    alert("De wachtwoorden zijn niet gelijk")
  } else {

  firebase.auth().createUserWithEmailAndPassword(email, password)
  
  .then(cred =>{

    db.collection("Vitaminders").doc(cred.user.uid).set({
      Gebruikersnaam: idClean + naam,
      GebruikersnaamClean: naam,
      Usertype: "Coach",
      Inspiratiepunten: 1,
      Email: email,
      PhoneNumber: "",
      Website: "",                 
      Coachingstyle: "",
      City: "",
      Color: colour,
      Why: "",
      Targetgroup: "",
      YearsExperience: "",
      Experience: "",
      Education: "",
      Approach: "",
      Costs: "",
      ID: cred.user.uid,
      Status: "Approved",
      Levensvragen: [],
      SubscriptionType: subscriptionType,
    })
    .then(() => {

      createGelukstegoed(cred.user.uid)
    })
    .then(() => {
      addNewMemberToHuiskamer(idClean, naam)
    })
    .then(() => {

      sendConfirmationMail(subscriptionType, email, naam)

    })
    .then(() => {

      successModal.style.display = "flex"
        
      });
        }).catch((err) => {
          alert(err)
        });
      };
    });
  };
}();

function createGelukstegoed(credUserUid){

  db.collection('Vitaminders')
  .doc(credUserUid)
  .collection("Gelukstegoed")
  .doc().set({
    Amount: 0,
    PaymentId: "none",
    Product: "Account created",
    Type: "Plus",
    Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  });
};

function addNewMemberToHuiskamer(id, userName){

  console.log(id + userName)

  db.collection("GroupsForCoaches")
  .doc("SwraRaTYkCAABcdMZrj7")
  .update({
    Members: firebase.firestore.FieldValue.arrayUnion(id + userName)
  });
};

function sendConfirmationMail(subscriptionType, email, naam){

  if(subscriptionType === "Premium"){

      db.collection("Mail").doc().set({
        to: [email],
        cc: "info@vitaminds.nu",
        message: {
        subject: `Verifier je account op Vitaminds! `,
        html: `Hallo ${naam}, </br></br>
            Geweldig dat je je hebt aangesloten bij Vitaminds! Je bent van harte welkom in onze community. 
            Daarnaast hopen we van harte dat dit een mooie stap is in de online vindbaarheid van je praktijk.<br><br>
            Vergeet niet om je coachgegevens goed in- en aan te vullen in je account.
            Je kunt je vanaf nu inloggen met je emailadres en wachtwoord.<br><br> 
            
            Klik <a href="https://vitaminds.nu/inlog.html"> hier </a> om direct te beginnen.<br><br>
            Vriendelijke groet, </br></br>
            Het Vitaminds Team </br></br>
            <img src="https://vitaminds.nu/images/design/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`,
        Gebruikersnaam: naam,
        Emailadres: email,
        Type: "Coach"
          }     
      });

  } else if (subscriptionType === "Basic"){
    
    db.collection("Mail").doc().set({
      to: [email],
      cc: "info@vitaminds.nu",
      message: {
      subject: `Verifier je account op Vitaminds! `,
      html: `Hallo ${naam}, </br></br>
          Geweldig dat je een coach-account hebt aangemaakt op Vitaminds! Je bent van harte welkom in onze community. 
          
          Klik <a href="https://vitaminds.nu/inlog.html"> hier </a> om direct te beginnen.<br><br>

          Ben je benieuwd hoe Vitaminds je kan helpen om je doelen te bereiken?</br>
          Lees dan <a href="https://vitaminds.nu/Kenniscentrum-coaching/Welkom%20bij%20Vitaminds.html">dit artikel</a>.<br><br>

          Vriendelijke groet, </br></br>
          Het Vitaminds Team </br></br>
          <img src="https://vitaminds.nu/images/design/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`,
      Gebruikersnaam: naam,
      Emailadres: email,
      Type: "Coach"
        }     
    });

  };
};

// Succes pagina
!function getAdminUsernameAndProfilePicture(){

  const succesQuestion = document.getElementById("succes-questions")
  
  if (succesQuestion != null){

const photoDiv = document.createElement("div")
      photoDiv.setAttribute("id", "admin-photo-img-div")
const photoImg = document.createElement("img")
const adminName = document.createElement("h3")
const adminContactMe = document.createElement("p")

 db.collection("Vitaminders")
.where("GebruikersnaamClean", "==", "Gijs van Beusekom")
.get()
.then(querySnapshot => {
  querySnapshot.forEach(doc => {

    const gebruikersnaamClean = doc.data().GebruikersnaamClean
    const profilePicture = doc.data().Profielfoto
    const auth = doc.data().Gebruikersnaam

    photoImg.src = profilePicture
    adminName.innerText = gebruikersnaamClean
    adminContactMe.innerText = `Voor alle vragen over Vitaminds kun je mij altijd even een berichtje sturen.`

    linkToDigimind(photoImg, auth)
    linkToDigimind(adminName, auth)
    linkToDigimind(adminContactMe, auth)

    succesQuestion.appendChild(photoDiv)
    photoDiv.appendChild(adminContactMe) 
    photoDiv.appendChild(photoImg)
    photoDiv.appendChild(adminName)

      });
    });
  };
}();

function linkToDigimind(elem, auth){
  elem.addEventListener("click", () => {
    window.open("../Vitaminders/" + auth + ".html", "_self");
  });
}; 

function successNoticeOK(){
  firebase.auth().signOut().then(function() {
    window.location.href = "/voor-coaches.html"
  }).catch(function(error) {
    console.log(error)
  })
}