!function signUp(){

    const signUpButton = document.getElementById("intervision-sign-up-button")
    const noticeDOM = document.getElementById("notice")

    signUpButton.addEventListener("click", () => {

        auth.onAuthStateChanged(User =>{
            if(User){
                const userRef = db.collection("Vitaminders").doc(User.uid);
                userRef.get().then(function(doc) {

                    const auth = doc.data().Gebruikersnaam
                    const nameClean = doc.data().GebruikersnaamClean
                    const emailAdress = doc.data().Email
                    const userType = doc.data().userType
                    const subsciptionType = doc.data().SubscriptionType

                    const noticeP = document.createElement("p")
                    noticeP.setAttribute("id", "upgrade-notice")

                    if(subsciptionType === "Prenium"){
                        signUpButton.innerText = "Aanvraag verzonden"
                        sendEmail(nameClean, auth, emailAdress)
                    } else if (subsciptionType === "Basic"){

                        noticeP.innerHTML = '<u>Upgrade</u> naar een Premium account om aan intervisie deel te nemen.'
                        noticeDOM.appendChild(noticeP)
                        upgradeModal(noticeP)

                    } else if (subsciptionType === undefined){
                        noticeP.innerHTML = '<u>Upgrade</u> naar een Premium coach account om aan intervisie deel te nemen.'
                        noticeDOM.appendChild(noticeP)
                        upgradeModal(noticeP)
                    };
                });
            };
        });
    });
}();

function sendEmail(nameClean, naam, emailAdress){

        db.collection("Mail").doc().set({
            to: "info@vitaminds.nu",
    message: {
    subject: `Nieuwe aanmelding voor intervisiegroep`,
    html: ` ${nameClean} heeft zich aangemeld voor een intervisiegroep.<br></br>

            Vriendelijke groet, <br></br>
            Het Vitaminds Team <br></br>
            <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
    Gebruikersnaam: naam,
    Emailadres: emailAdress,
    Type: "Sign up intervision"
    }        
    }); 

};

function upgradeModal(notice){

    const upgradeModal = document.getElementById("upgrade-account-modal")

    notice.addEventListener("click", () => {

        upgradeModal.style.display = "flex"
    });
};

!function upgradeMessage(){

    const title = document.getElementById("welcome-message-upgrade")

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

            const name = doc.data().GebruikersnaamClean

            title.innerHTML = `Wat leuk dat je wilt updragen naar een Premium abonnement, ${name}!`

            });
        };
    });
}();

!function sendUpgradeRequest(){
    const requestButton = document.getElementById("upgrade-button")

    requestButton.addEventListener("click", () => {

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

            const email = doc.data().Email
            const nameClean = doc.data().GebruikersnaamClean

                db.collection("Mail").doc().set({
                    to: [email],
                    cc: "info@vitaminds.nu",
                    message: {
                    subject: `Upgrade naar Premium Vitaminds account`,
                    html: `Hallo ${nameClean}, </br></br>
                            Wat leuk dat je een Premium-account hebt aangevraagd!<br><br> 
                            
                            We gaan je account direct upgraden. Je ontvangt een mailtje zodra je account is ge-upgrade.</br></br>
                            Vriendelijke groet, </br></br>
                            Het Vitaminds Team </br></br>
                            <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                    Gebruikersnaam: nameClean,
                    Emailadres: email,
                    Type: "Upgrade request"
                    }        
                    })
            .then(() => {

                requestButton.innerText = "Je upgrade is aangevraagd!"

            })
            });
        };
    });
});
}();

!function exitModalUpgrade(){

     const exitModal = document.getElementById("exit-modal")
     const upgradeModal = document.getElementById("upgrade-account-modal")

     exitModal.addEventListener("click", () => {

        upgradeModal.style.display = "none"

     });
}(); 