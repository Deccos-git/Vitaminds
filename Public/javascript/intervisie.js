const DOM = document.getElementById("casus-overview")

// New casus

const nexCasusTitle = document.getElementById("new-casus-title-input")
const newCasusDespription = document.getElementById("new-casus-description")
const saveCasusButton = document.getElementById("submit-casus")
const newCasusCTA = document.getElementById("new-casus")
const createCasus = document.getElementById("create-casus")

!function newCasusTextAreaPlaceholder(){

    auth.onAuthStateChanged(User =>{
        userRef = db.collection("Vitaminders").doc(User.uid)
        userRef.get()
        .then(doc => {

                const coachClean = doc.data().GebruikersnaamClean

                if(newCasusCTA != null){

                newCasusCTA.placeholder = `Dien een nieuwe casus in, ${coachClean}`

                };

        });
    });
}();

!function newCasusTextArea(){

    if(createCasus != null){

        newCasusCTA.addEventListener("click", () => {

            const noticeP = document.createElement("p")
            noticeP.setAttribute("id", "upgrade-notice")
        const inputDiv = document.getElementById("inputCTA-div")
    
        auth.onAuthStateChanged(User =>{
            if(User){
            const userRef = db.collection("Vitaminders").doc(User.uid);
            userRef.get().then(function(doc) {
    
                const coachType = doc.data().SubscriptionType
    
                if(coachType === "Premium"){
                    console.log("Premium")

                    createCasus.style.display = "flex"
                    newCasusCTA.style.display = "none"
        
                } else if (coachType === "Basic"){
                    console.log("Basic")

                    newCasusCTA.style.display = "none"
                    noticeP.innerHTML = '<u>Upgrade</u> naar een Premium account om een casus in te dienen.'
                    inputDiv.appendChild(noticeP)
    
                    upgradeModal(noticeP)
                };
            });
        };
    }); 
        });
    };

}();

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

function saveNewCasus(){

    saveCasusButton.innerText = "Casus ingediend"

    auth.onAuthStateChanged(User =>{
        userRef = db.collection("Vitaminders").doc(User.uid)
        userRef.get()
        .then(doc => {

                const coach = doc.data().Gebruikersnaam
                const coachClean = doc.data().GebruikersnaamClean

            db.collection("Intervisie").doc().set({
                Coach: coach,
                CoachClean: coachClean,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Owner: "Vitaminds",
                Title: nexCasusTitle.value,
                ID: idClean,
                CasusTitleID: idClean + nexCasusTitle.value,
                Description: newCasusDespription.value
            });
        });
    });
};

!function submitNewCasus(){

    if(saveCasusButton != null){

        saveCasusButton.addEventListener("click", () => {
 
            saveNewCasus()
        });
    };
}();

// Casus overview

const casusDivOverview = document.getElementById("casus-outer-div")

db.collection("Intervisie")
.where("Owner", "==", "Vitaminds")
.orderBy("Timestamp", "desc")
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const titel = doc.data().Title
        const coachClean = doc.data().CoachClean
        const coach = doc.data().Coach
        const description = doc.data().Description
        const titelID = doc.data().CasusTitleID

        const casusInnerDiv = document.createElement("div")
            casusInnerDiv.setAttribute("class", "casus-inner-div")
        const casusTitleh3 = document.createElement("h3")
        const bannerDiv = document.createElement("div")
            bannerDiv.setAttribute("id", "casus-banner-div")
        const descriptionP = document.createElement("p")
        const buttonDiv = document.createElement("div")
        const casusButton = document.createElement("button")
            casusButton.setAttribute("class", "button-algemeen")
            casusButton.setAttribute("id", "casus-button")
            casusButton.setAttribute("data-coach", coach)
            casusButton.setAttribute("data-title", titelID)

        casusTitleh3.innerText = titel
        descriptionP.innerText = description
        casusButton.innerText = "Bekijk casus"

            db.collection("Vitaminders")
            .where("Gebruikersnaam", "==", coach)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
        
                    const profilePic = doc.data().Profielfoto
        
                    const coachDiv = document.createElement("div")
                        coachDiv.setAttribute("class", ("casus-coach-div"))
                    const coachPic = document.createElement("img")
                    const coachName = document.createElement("p")
                        coachName.setAttribute("class", "casus-coachname")
        
                    coachPic.src = profilePic
                    coachName.innerText = coachClean
        
                    casusDivOverview.appendChild(casusInnerDiv)
                    casusInnerDiv.appendChild(coachDiv)
                    coachDiv.appendChild(coachPic)
                    coachDiv.appendChild(coachName)

        casusInnerDiv.appendChild(casusTitleh3)
        casusInnerDiv.appendChild(bannerDiv)
        casusInnerDiv.appendChild(descriptionP)
        casusInnerDiv.appendChild(buttonDiv)
        buttonDiv.appendChild(casusButton)

        openCasusDetails(casusButton)

            });
        });   
    });
});

function openCasusDetails(casusButtonDOM){

    casusButtonDOM.addEventListener("click", () => {

        const casusTitleID = casusButtonDOM.dataset.title

        auth.onAuthStateChanged(User =>{
            if(User){
                userRef = db.collection("Vitaminders").doc(User.uid)
                userRef.get()
                .then(doc => {

                    const userType = doc.data().Usertype
                    const naamClean = doc.data().GebruikersnaamClean

                    if(userType === "Coach"){

            window.open("../Intervisions/" + [casusTitleID], "_self");

                    } else {

                        casusButtonDOM.innerHTML = `${naamClean}, maak een <a href="/aanmelden-coach.html">coachprofiel</a> aan om mee te praten`
                        casusButtonDOM.style.border = "none"
                        casusButtonDOM.style.color = "#cf6e13"
                    }

                });
            } else {
                notice.innerHTML = `Maak een <a href="/aanmelden-coach.html">coachprofiel</a> aan om mee te praten`

                casusButtonDOM.innerHTML = `Maak een <a href="/aanmelden-coach.html">coachprofiel</a> aan om mee te praten`
                casusButtonDOM.style.border = "none"
                casusButtonDOM.style.color = "#cf6e13"
            }
        });
    });
};

!function hideTextAreaForNonCoach(){

    const textarea = document.getElementById("new-casus")

    auth.onAuthStateChanged(User =>{
        if(User){
            userRef = db.collection("Vitaminders").doc(User.uid)
            userRef.get()
            .then(doc => {

                const userType = doc.data().Usertype

                if(userType === "Coach"){

                    textarea.style.display = "block"

                } else {
                    
                    textarea.style.display = "none"
                }

            });
        } else {
            textarea.style.display = "none"
        }
    });
}();

// Casus detail page

// Fetching title from url
const titelhtml = window.location.href.replace(/^.*[\\\/]/, '')
const titel1 = titelhtml.replace('.html', '')
const titel2 = titel1.replace('%20',' ')
const titel3 = titel2.replace('%20',' ')
const titel4 = titel3.replace('%20',' ')
const titel5 = titel4.replace('%20',' ')
const titel6 = titel4.replace('%20',' ')
const titel7 = titel6.replace('%20',' ')
const titel8 = titel7.replace('%20',' ')
const titel9 = titel8.replace('%20',' ')
const titel10 = titel9.replace('%20',' ')
const titel11 = titel10.replace('%20',' ')
const titel12 = titel11.split("?fb")
const titel = titel12[0]

const intervisionOuterDiv = document.getElementById("intervision-outer-div")

db.collection("Intervisie")
.where("CasusTitleID", "==", titel)
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const titel = doc.data().Title
        const coachClean = doc.data().CoachClean
        const coach = doc.data().Coach
        const description = doc.data().Description

        const casusInnerDiv = document.createElement("div")
            casusInnerDiv.setAttribute("class", "casus-inner-div-detail")
        const casusTitleh3 = document.createElement("h3")
        const bannerDiv = document.createElement("div")
            bannerDiv.setAttribute("id", "casus-banner-div")
        const descriptionP = document.createElement("p")

        casusTitleh3.innerText = titel
        descriptionP.innerText = description

            db.collection("Vitaminders")
            .where("Gebruikersnaam", "==", coach)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
        
                    const profilePic = doc.data().Profielfoto
        
                    const coachDiv = document.createElement("div")
                        coachDiv.setAttribute("class", ("casus-coach-div"))
                    const coachPic = document.createElement("img")
                    const coachName = document.createElement("p")
                        coachName.setAttribute("class", "casus-coachname")
        
                    coachPic.src = profilePic
                    coachName.innerText = coachClean
        
                    intervisionOuterDiv.appendChild(casusInnerDiv)
                    casusInnerDiv.appendChild(coachDiv)
                    coachDiv.appendChild(coachPic)
                    coachDiv.appendChild(coachName)

                    casusInnerDiv.appendChild(casusTitleh3)
                    casusInnerDiv.appendChild(bannerDiv)
                    casusInnerDiv.appendChild(descriptionP)

            });
        });   
    });
});

// Reactions

function saveReaction(reactorName){

    const reactButton = document.getElementById("give-reaction-button")
    const reaction = document.getElementById("reactions-textarea")

    reactButton.addEventListener("click", () => {

        reactButton.innerText = "Opgeslagen"

        db.collection("Intervisie")
        .where("CasusTitleID", "==", titel)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                db.collection("Intervisie").doc(doc.id)
                .collection("Reactions").doc().set({
                    CasusTitle: titel,
                    Reactor: reactorName,
                    Reaction: reaction.value,
                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                    Owner: "Vitaminds",
                });
            });
        });
    });
};

!function giveReaction(){

const reactionTitle = document.getElementById("reactions-title")

    auth.onAuthStateChanged(User =>{
        userRef = db.collection("Vitaminders").doc(User.uid)
        userRef.get()
        .then(doc => {

                const coach = doc.data().Gebruikersnaam
                const coachClean = doc.data().GebruikersnaamClean

                reactionTitle.innerText = `Hoe kijk jij hiernaar, ${coachClean}?`

                saveReaction(coach)

        });
    });
}();

// Load reactions to DOM

const reactionsOuterDiv = document.getElementById("reactions-outer-div")

console.log(titel)

db.collectionGroup("Reactions").where("CasusTitle", "==", titel)
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const reactor = doc.data().Reactor
        const reaction = doc.data().Reaction

        const reactionInnerDiv = document.createElement("div")
            reactionInnerDiv.setAttribute("class", "reaction-inner-div")
        const reactionP = document.createElement("p")

        reactionP.innerHTML = reaction

            db.collection("Vitaminders")
            .where("Gebruikersnaam", "==", reactor)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {
        
                    const profilePic = doc1.data().Profielfoto
                    const userNameClean = doc1.data().GebruikersnaamClean
        
                    const coachDiv = document.createElement("div")
                        coachDiv.setAttribute("class", ("casus-coach-div-reaction"))
                    const coachPic = document.createElement("img")
                    const coachName = document.createElement("p")
                        coachName.setAttribute("class", "casus-coachname")
        
                    coachPic.src = profilePic
                    coachName.innerText = userNameClean

                    reactionsOuterDiv.appendChild(reactionInnerDiv)
                    reactionInnerDiv.appendChild(coachDiv)
                    coachDiv.appendChild(coachPic)
                    coachDiv.appendChild(coachName)
                    reactionInnerDiv.appendChild(reactionP)
                });
            });
    });
});
