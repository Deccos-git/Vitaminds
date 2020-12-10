//Register CH

    // Open make an coach account with CTA button

    const makeCoachAccoutnButtonBasic = document.getElementById("become-member-button-basic")
    const makeCoachAccoutnButtonPremium = document.getElementById("become-member-button-premium")
    const coachRegisterForm = document.getElementById("coach-register-form")
    const subscriptionType = document.getElementById("subscription-type")

    function showRegisterForm(button, type){

    button.addEventListener("click", () => {

    coachRegisterForm.style.display = "flex"

    subscriptionType.innerText = type

    coachRegisterForm.scrollIntoView()

    })
  };

  showRegisterForm(makeCoachAccoutnButtonBasic, "Basic")
  showRegisterForm(makeCoachAccoutnButtonPremium, "Premium")
  
function registerCoach(){

  const button = document.getElementById("register-button-coach")
  const successModal = document.getElementById("success-modal")
  
  if(button != null){
  button.addEventListener("click", () => {

    button.innerText = "Laden.."

  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-wachtwoord").value;
  const passwordInput = document.getElementById("register-wachtwoord")
  const repeatPassword = document.getElementById("register-wachtwoord-repeat").value
  const repeatPasswordInput = document.getElementById("register-wachtwoord-repeat")
  const naam = document.getElementById("register-gebruikersnaam").value;
  const method = document.getElementById("register-method").value;
  const city = document.getElementById("register-city").value;
  const targetgroup = document.getElementById("register-targetgroup").value;
  const why = document.getElementById("register-why").value;
  const phone = document.getElementById("register-phone").value;
  const website = document.getElementById("register-website").value;
  const costs = document.getElementById("register-costs").value;
  const approach = document.getElementById("register-style").value;
  const experience = document.getElementById("register-experience").value;
  const experienceType = document.getElementById("register-experience-type").value;
  const education = document.getElementById("register-education").value;
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
      PhoneNumber: phone,
      Website: website,                 
      Coachingstyle: method,
      City: city,
      Color: colour,
      Why: why,
      Targetgroup: targetgroup,
      YearsExperience: experience,
      Experience: experienceType,
      Education: education,
      Approach: approach,
      Costs: costs,
      ID: cred.user.uid,
      Status: Approved,
      Levensvragen: [],
      SubscriptionType: subscriptionType
    })
    .then(() => {
      db.collection('Vitaminders').doc(cred.user.uid).collection("Gelukstegoed").doc().set({
        Amount: 0,
        PaymentId: "none",
        Product: "Account created",
        Type: "Plus",
        Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
      })
 .then(() => {
    db.collection("Mail").doc().set({
      to: [email],
  cc: "info@vitaminds.nu",
message: {
subject: `Verifier je account op Vitaminds! `,
html: `Hallo ${naam}, </br></br>
      Wat geweldig dat je een coach-account hebt aangemaakt op Vitaminds! Je bent in ieder geval van harte welkom in onze community. 
      Daarnaast hopen we van harte dat is een mooie stap is in de online vindbaarheid van je praktijk.<br><br>
      Vergeet niet om je coachgegevens goed in- en aan te vullen in je Digimind (je persoonlijke ontwikkelomgeving en tevens coachprofiel op Vitaminds).
      Je kunt je vanaf nu inloggen met je emailadres en wachtwoord.<br><br> 
      
      Klik <a href="https://vitaminds.nu/inlog.html"> hier </a> om direct te beginnen.<br><br>
      Vriendelijke groet, </br></br>
      Het Vitaminds Team </br></br>
      <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
Gebruikersnaam: naam,
Emailadres: email,
Type: "Coach"
}
          
});
 });
 })
 .then(() => {

  successModal.style.display = "flex"

  firebase.auth().signOut()
    
  });
        }).catch((err) => {
          alert(err)
        })
      }
    })
  }
}; registerCoach();

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
    const admin = doc.data().Gebruikersnaam

    photoImg.src = profilePicture
    adminName.innerText = gebruikersnaamClean
    adminContactMe.innerText = `Voor alle vragen over Vitaminds kun je mij altijd even een berichtje sturen.`

    function linkToDigimind(a){
      a.addEventListener("click", () => {
        window.open("../Vitaminders/" + admin + ".html", "_self");
      });
    } linkToDigimind(photoImg)
    linkToDigimind(adminName)
    linkToDigimind(adminContactMe)

    });
  });

  succesQuestion.appendChild(photoDiv)
    photoDiv.appendChild(adminContactMe) 
    photoDiv.appendChild(photoImg)
    photoDiv.appendChild(adminName)
  };
}();

function successNoticeOK(){
  firebase.auth().signOut().then(function() {
    window.location.href = "/index.html"
  }).catch(function(error) {
    console.log(error)
  })
}