!function changeNextStepButtonAuthVisitor(){

    const authButton = document.getElementById("auth-button")
    const visitorButton = document.getElementById("visitor-button")

    auth.onAuthStateChanged(User =>{
        if(User){

            authButton.style.display = "flex"
            visitorButton.style.display = "none"

        };
    });
}();


!function showOptions(){

    const optionsButton = document.getElementById("show-step-two")
    const optionsDiv = document.getElementById("route-options")

    optionsButton.addEventListener("click", () => {

        optionsDiv.style.display = "flex"

    });
}();

function setReminderAuth(){

    console.log("test")

    const reminderOption = document.querySelector('input[name="reminder"]:checked').value;

    console.log(reminderOption)

    const goalTitle = document.getElementById("goal-title").value

    if(reminderOption === "Yes"){

        auth.onAuthStateChanged(User =>{
            db.collection("Vitaminders")
            .doc(User.uid).get().then(doc => {
    
                const auth = doc.data().Gebruikersnaam

            db.collection("Tools").doc().set({
                Type: "Check-in",
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Gebruikersnaam: auth,
                Levensvraag: goalTitle
                });
            });
        });
    };
};

function saveInputAuth(){

    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders")
        .doc(User.uid).get().then(doc => {

            const auth = doc.data().Gebruikersnaam

    const select = document.getElementById("select-route-goal")

    const option = select.options
    const selected = option[option.selectedIndex].innerHTML

    const goalTitle = document.getElementById("goal-title").value

    const goalDescription = document.getElementById("goal-description").value 

    const privatePublicOption = document.querySelector('input[name="public-private"]:checked').value;

    let private = ""

    if(privatePublicOption === "Private"){
        private = "Ja"
    } else if(privatePublicOption === "Public") {
        private = "Nee"
    };

            db.collection("Vitaminders")
            .doc(doc.id).collection("Levensvragen").doc()
            .set({
                Eigenaar: "Vitaminds",
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Gebruikersnaam: auth,
                Goal: selected,
                Levenslessen: [],
                ID: idClean,
                Levensvraag: idClean + goalTitle,
                LevensvraagClean: goalTitle,
                Omschrijving: goalDescription,
                Openbaar: private
            });
        });
    });
};



const showNextStepsDivButton = document.getElementById("auth-button")

if(showNextStepsDivButton != null){

    showNextStepsDivButton.addEventListener("click", nextStepAuth)
};

function nextStepAuth(){

    const nextStep = document.getElementById("route-next-step-auth")
    nextStep.style.display = "flex"

    saveInputAuth()
    setReminderAuth()
};

// Visitor

function setGelukstegoed(user){
    db.collection('Vitaminders').doc(user).collection("Gelukstegoed").doc().set({
        Amount: 0,
        PaymentId: "none",
        Product: "Account created",
        Type: "Plus",
        Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
      });
};

function setLevensvraag(user, selected, goalTitle, goalDescription, private){
    db.collection("Vitaminders")
    .doc(user).collection("Levenvragen").doc()
    .set({
        Eigenaar: "Vitaminds",
        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        Gebruikersnaam: user,
        Goal: selected,
        Levenslessen: [],
        ID: idClean,
        Levensvraag: idClean + goalTitle,
        LevensvraagClean: goalTitle,
        Omschrijving: goalDescription,
        Openbaar: private
    });
};

function setEmail(mail, user){
    db.collection("Mail").doc().set({
        to: [mail],
        cc: "info@vitaminds.nu",
  message: {
  subject: `Verifier je account op Vitaminds! `,
  html: `Hallo ${user}, </br></br>
        Welkom bij de Vitaminds community. Het sociale netwerk voor imperfecte mensen.<br><br>
        Je kunt je vanaf nu inloggen met je emailadres en wachtwoord.<br><br> 
        
        Klik <a href="https://vitaminds.nu/inlog.html"> hier </a> om direct te beginnen.</br></br>
        Vriendelijke groet, </br></br>
        Het Vitaminds Team </br></br>
        <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
  Gebruikersnaam: user,
  Emailadres: mail,
  Type: "Vitaminders"
  }        
  });
}

function setReminder(user){
    const reminderOption = document.querySelector('input[name="reminder"]:checked').value;

    console.log(reminderOption)

    const goalTitle = document.getElementById("goal-title").value

    if(reminderOption === "Yes"){

        db.collection("Vitaminders")
        .doc(user).get().then(doc => {

            const auth = doc.data().Gebruikersnaam

            db.collection("Tools").doc().set({
                Type: "Check-in",
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Gebruikersnaam: auth,
                Levensvraag: goalTitle
                });
            });
        };
};



!function nextStepVisitor(){
    const visitorButton = document.getElementById("visitor-button")
    if(visitorButton != null){

        visitorButton.addEventListener("click", () => {

        const nextStepVisitor = document.getElementById("route-next-step-visitor")
        nextStepVisitor.style.display = "flex"
        });

    };
}();

function showNotice(){

    const notice = document.getElementById("register-notice")

    notice.style.display = "flex"    

};

const saveVisitorToAuthButton = document.getElementById("register-button-create-route")

saveVisitorToAuthButton.addEventListener("click", saveInputVisitor)

function saveInputVisitor(){

    const select = document.getElementById("select-route-goal")

    const option = select.options
    const selectedOption = option[option.selectedIndex].innerHTML

    const newGoalTitle = document.getElementById("goal-title").value

    const newGoalDescription = document.getElementById("goal-description").value 

    const privatePublicOption = document.querySelector('input[name="public-private"]:checked').value;

    let privateOption = ""

    if(privatePublicOption === "Private"){
        privateOption = "Ja"
    } else if(privatePublicOption === "Public") {
        privateOption = "Nee"
    };

      const email = document.getElementById('register-email').value;
      const passwordVM = document.getElementById('register-wachtwoord').value;
      const passwordInput = document.getElementById('register-wachtwoord')
      const repeatPasswordVM = document.getElementById("register-wachtwoord-repeat").value
      const repeatPasswordVMInput = document.getElementById("register-wachtwoord-repeat")
      const firstName = document.getElementById('register-firstname').value;
      const lastName = document.getElementById('register-lastname').value;
    
      const colour = getRandomColor()
    
      let userName = ""
    
      if (lastName != ""){
        userName = firstName +" "+ lastName
      } else {
        userName = firstName
      };
    
      if (passwordVM != repeatPasswordVM){
        passwordInput.style.borderColor = "red"
        repeatPasswordVMInput.style.borderColor = "red"
        alert("De wachtwoorden zijn niet gelijk")
      } else {
    
        if (firstName === ""){
          alert("Vergeet niet je voornaam in te vullen")
    
        } else {
      
      firebase.auth().createUserWithEmailAndPassword(email, passwordVM)
      .then(cred =>{
        db.collection('Vitaminders').doc(cred.user.uid).set({
          Gebruikersnaam: cred.user.uid + userName,
          GebruikersnaamClean: userName,
          Firstname: firstName,
          Lastname: lastName,
          Usertype: "Vitaminder",
          Inspiratiepunten: 1,
          Email: email, 
          ID: cred.user.uid,
          Color: colour,
          Levensvragen: [],
          Profielfoto: "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
      }).then(() => {
        setGelukstegoed(cred.user.uid)
        setLevensvraag(cred.user.uid, selectedOption, newGoalTitle, newGoalDescription, privateOption)
        setReminder(cred.user.uid)
        setEmail(email, userName)
    })
    .then(() => {
        showNotice()
    })
        }).catch((err) => {
          alert(err)
        });
        };
      };
}

function registerNoticeOK(){
    firebase.auth().signOut().then(function() {
      window.location.href = "/index.html"
    }).catch(function(error) {
      console.log(error)
    })
  };

