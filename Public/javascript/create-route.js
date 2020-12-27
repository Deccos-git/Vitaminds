
function appendGoalsToselect(goal){

    const goalSelect = document.getElementById("select-route-goal")

    const option = document.createElement("option")

    option.innerText = goal

    goalSelect.appendChild(option)

};

!function databaseQueryRouteGoals(){

    db.collection("Levensvragen")
    .where("Eigenaar", "==", "Vitaminds")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const goalClean = doc.data().Levensvraag

            appendGoalsToselect(goalClean)

        });
    });
}();

!function showOptions(){

    const optionsButton = document.getElementById("show-step-two")
    const optionsDiv = document.getElementById("route-options")

    optionsButton.addEventListener("click", () => {

        optionsDiv.style.display = "flex"

    });
}();

function setReminder(){

    const reminderOption = document.querySelector('input[name="reminder"]:checked').value;

    const goalTitle = document.getElementById("goal-title").value

    if(reminderOption === "Ja"){

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

    const select = document.getElementById("select-route-goal")

    const option = select.options
    const selected = option[option.selectedIndex].innerHTML

    const goalTitle = document.getElementById("goal-title").value

    const goalDescription = document.getElementById("goal-description").value 

    const privatePublicOption = document.querySelector('input[name="publuc-private"]:checked').value;

    let private = ""

    if(privatePublicOption === "Prive"){
        private = "Ja"
    } else if(privatePublicOption === "Openbaar") {
        private = "Nee"
    };

            const auth = doc.data().Gebruikersnaam

            db.collection("Vitaminders")
            .doc(doc.id).collection("Levenvragen").doc()
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

!function nextStep(){

    const showNextStepsDivButton = document.getElementById("save-button-auth")

    if(showNextStepsDivButton != null){

        showNextStepsDivButton.addEventListener("click", () => {

            changeNextStepBasedOnAuthOrVisitor();
            saveInputAuth()
            setReminder()
        });
    };
}();

function setGelukstegoed(user){
    db.collection('Vitaminders').doc(user).collection("Gelukstegoed").doc().set({
        Amount: 0,
        PaymentId: "none",
        Product: "Account created",
        Type: "Plus",
        Timestamp: firebase.firestore.Timestamp.fromDate(new Date())
      });
};

function setLevensvraag(user){
    db.collection("Vitaminders")
    .doc(user).collection("Levenvragen").doc()
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
    console.log("Reminder")
    const reminderOption = document.querySelector('input[name="reminder"]:checked').value;

    const goalTitle = document.getElementById("goal-title").value

    if(reminderOption === "Ja"){

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



function saveInputVisitor(){
    const button = document.getElementById("register-button")
    if(button != null){
    
        button.addEventListener("click", () => {

            notice.style.display = "flex"
    
          const notice = document.getElementById("register-notice")
      
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
        gelukstegoed(cred.user.uid)
        setLevensvraag(cred.user.uid)
        setReminder(cred.user.uid)
        setEmail(email, userName)
    })
        }).catch((err) => {
          alert(err)
        });
        };
      };
    });
}
}

function registerNoticeOK(){
    firebase.auth().signOut().then(function() {
      window.location.href = "/index.html"
    }).catch(function(error) {
      console.log(error)
    })
  };

