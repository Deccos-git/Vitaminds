// WORKSHOP OVERVIEW PAGE

    // Name auth in create workshop
    const authHeader = document.getElementById("titleSub-workshop")
    const createWorkshopOuterDiv = document.getElementById("create-your-workshop")

    if(createWorkshopOuterDiv != undefined && authHeader != undefined){

    auth.onAuthStateChanged(User =>{
        if(User){
        db.collection("Vitaminders").doc(User.uid).get().then(function(doc) {

            const userType = doc.data().Usertype
            const nameClean = doc.data().GebruikersnaamClean

            if(userType == "Coach"){
                createWorkshopOuterDiv.style.display = "flex"
                authHeader.innerText = `${nameClean},`
            };

        });
        };
    });
};

!function showWorkshopsInDraftForAuth(){
    auth.onAuthStateChanged(User =>{
        if(User){

            db.collection("Workshops").where("Status", "==", "Draft").get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
            
                    const title = doc.data().WorkshopTitle
                    const coach = doc.data().Coach
                    const headerImg = doc.data().BannerImage
                    const workshopPrice = doc.data().Price
            
                    db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {
            
                            const nameClean = doc1.data().GebruikersnaamClean
                            const name = doc1.data().Gebruikersnaam
                            const profilePic = doc1.data().Profielfoto
            
                            const DOM = document.getElementById("workshops-outer-div")
            
                            const innerDiv = document.createElement("div")
                                innerDiv.setAttribute("class", "workshop-section")
                            const header = document.createElement("div")
                                header.setAttribute("class", "workshop-header")
                            const img = document.createElement("img")
                                img.setAttribute("class", "header-workshop")
                            const coachPicDiv = document.createElement("div")
                                coachPicDiv.setAttribute("class", "coach-pic-div-workshop")
                            const draftStatus = document.createElement("p")
                                draftStatus.setAttribute("id", "draft-status-workshop")
                            const coachPic = document.createElement("img")
                            const titleH3 = document.createElement("h3")
                            const priceP = document.createElement("p")
                                priceP.setAttribute("id", "workshop-price")
                            const buttonDiv = document.createElement("div")
                            const button = document.createElement("button")
                                button.setAttribute("class", "button-algemeen")
                                button.setAttribute("onclick", "openWorkshop(this)")
            
                            img.src = headerImg
                            coachPic.src = profilePic
                            titleH3.innerText = title
                            priceP.innerText = `Prijs: ${workshopPrice} euro`
                            button.innerText = "Meer informatie"
                            draftStatus.innerText = "Niet gepubliceerd"
                            draftStatus.style.color = "#cf6e13"
            
                            if(DOM != null){

                                db.collection("Vitaminders").doc(User.uid).get().then(function(doc2) {

                                const auth = doc2.data().Gebruikersnaam

                                if(name === auth){
            
                            DOM.appendChild(innerDiv)
                            innerDiv.appendChild(header)
                            header.appendChild(img)
                            innerDiv.appendChild(coachPicDiv)
                            coachPicDiv.appendChild(coachPic)
                            innerDiv.appendChild(draftStatus)
                            innerDiv.appendChild(titleH3)
                            innerDiv.appendChild(priceP)
                            innerDiv.appendChild(buttonDiv)
                            buttonDiv.appendChild(button)
                                    };
                                });
                            };
                        })
                    });
                })
            });
        };
    });
}();

// Workshops loaded from database

db.collection("Workshops").where("Status", "==", "Public").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().WorkshopTitle
        const coach = doc.data().Coach
        const headerImg = doc.data().BannerImage
        const workshopPrice = doc.data().Price

        db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const nameClean = doc1.data().GebruikersnaamClean
                const profilePic = doc1.data().Profielfoto

                const DOM = document.getElementById("workshops-outer-div")

                const innerDiv = document.createElement("div")
                    innerDiv.setAttribute("class", "workshop-section")
                const header = document.createElement("div")
                    header.setAttribute("class", "workshop-header")
                const img = document.createElement("img")
                    img.setAttribute("class", "header-workshop")
                const coachPicDiv = document.createElement("div")
                    coachPicDiv.setAttribute("class", "coach-pic-div-workshop")
                const coachPic = document.createElement("img")
                const titleH3 = document.createElement("h3")
                const priceP = document.createElement("p")
                    priceP.setAttribute("id", "workshop-price")
                const buttonDiv = document.createElement("div")
                const button = document.createElement("button")
                    button.setAttribute("class", "button-algemeen")
                    button.setAttribute("onclick", "openWorkshop(this)")

                img.src = headerImg
                coachPic.src = profilePic
                titleH3.innerText = title
                priceP.innerText = `Prijs: ${workshopPrice} euro`
                button.innerText = "Meer informatie"

                if(DOM != null){

                DOM.appendChild(innerDiv)
                innerDiv.appendChild(header)
                header.appendChild(img)
                innerDiv.appendChild(coachPicDiv)
                coachPicDiv.appendChild(coachPic)
                innerDiv.appendChild(titleH3)
                innerDiv.appendChild(priceP)
                innerDiv.appendChild(buttonDiv)
                buttonDiv.appendChild(button)

                };
            })
        });
    })
});

// Open workshops after onclick

function openWorkshop(elem){

    divTitle = elem.parentElement.previousElementSibling.previousElementSibling.innerText

    db.collection("Workshops")
    .where("WorkshopTitle", "==", divTitle)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("Workshops").doc(doc.id).update({
                Views: firebase.firestore.FieldValue.increment(1)
            })
            .then(() => {
                window.open("../Workshops/" + divTitle + ".html", "_self")
            });
        });
    });
};

//Hide make a workshop if no coach/visitor
!function hideMakeAWorkshop(){

    const makeAworkshopDiv = document.getElementById("create-your-workshop")
        auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
    
                const type = doc.data().Usertype

                console.log(type)

                if(type === "Coach"){
                    makeAworkshopDiv.style.display = "flex"
                };
            });
        };
    });
}();

// Build workshop

!function buildWorkshop(){

    const makeWorkshopButton = document.getElementById("build-workshop")
    const noticeP = document.createElement("p")
        noticeP.setAttribute("id", "upgrade-notice")
    const bottomDiv = document.getElementById("button-div-create-workshop")

    makeWorkshopButton.addEventListener("click", () => {

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

            const coachType = doc.data().SubscriptionType

            if(coachType === "Premium"){
                console.log("Premium")
                window.open("create-workshop.html", "_self");
            } else if (coachType === "Basic"){
                console.log("Basic")
                makeWorkshopButton.style.display = "none"
                noticeP.innerHTML = '<u>Upgrade</u> naar een Premium account om een workshop te maken'
                bottomDiv.appendChild(noticeP)

                upgradeModal(noticeP)
            };
        });
    };
}); 
});
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
