!function registerNewClient(){

    const button = document.getElementById("register-training")
    const notice = document.getElementById("notice-training")
    const contactDiv = document.getElementById("contact-div")
    const registerModal = document.getElementById("register-modal-training")

    button.addEventListener("click", () => {

        auth.onAuthStateChanged(User =>{
            if(User){
            db.collection("Vitaminders")
            .doc(User.uid)
            .get().then(function(doc) {

                const userNameClean = doc.data().GebruikersnaamClean
                const email = doc.data().Email

                mailToVitaminds(userNameClean, email)
                mailToClient(userNameClean, email)

                notice.style.display = "block" 
                contactDiv.style.display = "none"

                button.innerText = "Je bent aangemeld!"

                });
            } else {
                registerModal.style.display = "flex"
            };
        });
    });
}();

function mailToVitaminds(nameClean, email){

    db.collection("Mail").doc().set({
        to: "info@vitaminds.nu",
        message: {
        subject: `Nieuwe aanmelding voor training`,
        html: `Hallo Gijs, </br></br>
                Er is een nieuwe aanmelding voor de training<br><br> 
                
                Naam: ${nameClean}<br>
                Email: ${email}</br></br>

                Vriendelijke groet, </br></br>
                Het Vitaminds Team </br></br>
                <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
        Gebruikersnaam: nameClean,
        Emailadres: email,
        Type: "Upgrade request"
        }        
    });
};

function mailToClient(nameClean, email){

    db.collection("Mail").doc().set({
        to: [email],
        cc: "info@vitaminds.nu",
        message: {
        subject: `Je hebt je aangemeld voor de training "Klanten krijgen als coach"`,
        html: `Hallo ${nameClean}, </br></br>
                Wat leuk dat je hebt aangemeld voor de training "Klanten krijgen als coach"<br><br> 
                
                Vier maanden lang gaan we met elkaar de diepte in op weg naar een stabiele en gevulde praktijk.<br>
                Ik heb er zin in!<br><br> 

                Je ontvangt binnenkort het werkboek en de planning voor de training.<br><br> 

                Als je vragen hebt over de training ku je mij natuurlijk altijd even een berichtje sturen.

                Vriendelijke groet, </br></br>
                Gijs van Beusekom </br></br>
                <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
        Gebruikersnaam: nameClean,
        Emailadres: email,
        Type: "Upgrade request"
        }        
    });
};

!function createNewAccount(){

    const button = document.getElementById("register-button-coach")
    const notice = document.getElementById("notice-training")
    const contactDiv = document.getElementById("contact-div")
    const modal = document.getElementById("register-modal-training")

    button.addEventListener("click", () => {

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-wachtwoord").value;
    const passwordInput = document.getElementById("register-wachtwoord")
    const repeatPassword = document.getElementById("register-wachtwoord-repeat").value
    const repeatPasswordInput = document.getElementById("register-wachtwoord-repeat")
    const naam = document.getElementById("register-gebruikersnaam").value;
  
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
        SubscriptionType: "Basic",
      })
      .then(() => {
        addNewMemberToHuiskamer(idClean, naam)
      })
      .then(() => {
  
        modal.style.display = "none"
        notice.style.display = "block" 
        contactDiv.style.display = "none"

        mailToVitaminds(naam, email)
        mailToClient(naam, email)
          
        });
          }).catch((err) => {
            alert(err)
          });
        };
    });
}();

!function closeModal(){

    const button = document.getElementById("close-div")
    const modal = document.getElementById("register-modal-training")

    button.addEventListener("click", () => {

        modal.style.display = "none"

    });
}();