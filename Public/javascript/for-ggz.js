// Register GGZ
!function registerGgz(){
    const button = document.getElementById("register-ggz-button")
    if(button != null){

        button.addEventListener("click", () => {

        const notice = document.getElementById("register-notice")
    
    const email = document.getElementById('register-email').value;
    const practiceName = document.getElementById('register-practice').value;
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
        Practice: practiceName,
        Usertype: "Therapist",
        Email: email, 
        ID: cred.user.uid,
        Color: colour,
        Levensvragen: [],
        Profielfoto: "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
    }).then(() => {
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
    html: `Hallo ${userName}, </br></br>
        Welkom bij de Vitaminds.<br><br>
        
        Je kunt je vanaf nu inloggen met je emailadres en wachtwoord.<br><br> 
        
        Klik <a href="https://vitaminds.nu/inlog.html"> hier </a> om in te loggen.</br></br>
        Vriendelijke groet, </br></br>
        Het Vitaminds Team </br></br>
        <img src="https://vitaminds.nu/images/design/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`,
    Gebruikersnaam: userName,
    Emailadres: email,
    Type: "Vitaminders"
    }        
    });
    })
    })
    .then(() => {
                notice.style.display = "flex"
            })
        }).catch((err) => {
        alert(err)
        });
        };
    };
    });
    }
}();


function registerNoticeOK(){
  firebase.auth().signOut().then(function() {
    window.location.href = "/index.html"
  }).catch(function(error) {
    console.log(error)
  })
};

!function showRegisterTherapistDiv(){

    const button = document.getElementById("show-register-therapist")
    const registerDiv = document.getElementById("register-ggz-main")

    console.log(registerDiv)

    button.addEventListener("click", () => {

        registerDiv.style.display = "flex"
        registerDiv.scrollIntoView()
    });
}();

!function showCreateAccountFormOrderdListLink(){

    const link = document.getElementById("create-therapist-account")
    const createAccountDiv = document.getElementById("register-ggz-main")

    link.addEventListener("click", () => {
        createAccountDiv.style.display = "flex"
        createAccountDiv.scrollIntoView()
    });
}();