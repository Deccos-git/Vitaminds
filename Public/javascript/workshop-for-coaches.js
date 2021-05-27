// URL title
const titelhtml = window.location.href.replace(/^.*[\\\/]/, '')
const titelOne = titelhtml.replace('.html', '')
const titelTwo = titelOne.replace('%20',' ')
const titelThree = titelTwo.replace('%20',' ')
const titelFour = titelThree.replace('%20',' ')
const titelFive = titelFour.replace('%20',' ')
const titelSix = titelFive.replace('%20',' ')
const titelSeven = titelSix.replace('%20',' ')
const titel2 = titelSeven.replace('%20',' ')
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


// UPDATE META TAGS
function workshopMetaTags(descriptionWorkshop, titleWorkshop, bannerWorkshop){
const keywords = document.getElementById("meta-keywords")
const pageTitle = document.getElementById("page-title")
const description = document.getElementById("meta-description")
const facebookURL = document.getElementById("facebook-url")
const facebookTitle = document.getElementById("facebook-title")
const facebookDescription = document.getElementById("facebook-description")
const facebookImage = document.getElementById("facebook-img")

keywords.content = titleWorkshop
description.content = descriptionWorkshop
facebookURL.content = window.location.href
facebookTitle.content = titleWorkshop
pageTitle.innerText = titleWorkshop
facebookDescription.content = descriptionWorkshop
facebookImage.content = bannerWorkshop
};

db.collection("WorkshopsForCoaches").where("WorkshopTitle", "==", titel)
.get().then(querySnapshot => {
querySnapshot.forEach(doc => {

    const workshopTitle = doc.data().WorkshopTitle
    const summary = doc.data().WorkshopGoals
    const bannerImage = doc.data().BannerImage
    
    workshopMetaTags(summary, workshopTitle, bannerImage)

    });
});

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
            const admin = doc.data().Admin

            console.log(admin)

            if(admin == "Yes"){
                createWorkshopOuterDiv.style.display = "flex"
                authHeader.innerText = `${nameClean},`
            };

        });
        };
    });
};

function changeButtonIfAuthIsWorkshopTaker(takers, button){

    auth.onAuthStateChanged(User =>{
        if(User){

            db.collection("Vitaminders").doc(User.uid).get()
            .then(doc2 => {

                const auth = doc2.data().Gebruikersnaam

                if(takers.includes(auth)){
                    button.innerText = "Ga verder met workshop"
                };
            });
        };
    });
};

!function showWorkshopsInDraftForAuth(){
    auth.onAuthStateChanged(User =>{
        if(User){

            db.collection("Vitaminders").doc(User.uid).get()
            .then(doc2 => {

                const admin = doc2.data().Admin

                db.collection("WorkshopsForCoaches")
                .where("Status", "==", "Draft")
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                
                        const title = doc.data().WorkshopTitle
                        const coach = doc.data().Coach
                        const headerImg = doc.data().BannerImage
                        const workshopPrice = doc.data().Price
                        const takers = doc.data().Takers
                
                        db.collection("Vitaminders")
                        .where("Gebruikersnaam", "==", coach).get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc1 => {
                
                                const nameClean = doc1.data().GebruikersnaamClean
                                const name = doc1.data().Gebruikersnaam
                                const profilePic = doc1.data().Profielfoto
                
                                const DOM = document.getElementById("workshops-for-coaches")
                
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
                                    button.setAttribute("onclick", "openWorkshopCoaches(this)")
                
                                img.src = headerImg
                                coachPic.src = profilePic
                                titleH3.innerText = title
                                priceP.innerText = `Prijs: ${workshopPrice} euro`
                                button.innerText = "Meer informatie"
                                draftStatus.innerText = "Niet gepubliceerd"
                                draftStatus.style.color = "#cf6e13"

                                changeButtonIfAuthIsWorkshopTaker(takers, button)
                
                                if(DOM != null){

                                    db.collection("Vitaminders").doc(User.uid).get().then(function(doc2) {

                                    const auth = doc2.data().Gebruikersnaam

                                    if(name === auth || admin === "Yes"){
                
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
                            });
                        });
                    })
                });
            });
        };
    });
}();

// Workshops loaded from database

db.collection("WorkshopsForCoaches")
.where("Status", "==", "Public")
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().WorkshopTitle
        const coach = doc.data().Coach
        const headerImg = doc.data().BannerImage
        const workshopPrice = doc.data().Price
        const takers = doc.data().Takers

        db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const nameClean = doc1.data().GebruikersnaamClean
                const profilePic = doc1.data().Profielfoto

                const DOM = document.getElementById("workshops-for-coaches")

                const innerDiv = document.createElement("div")
                    innerDiv.setAttribute("class", "workshop-section")
                const header = document.createElement("div")
                    header.setAttribute("class", "workshop-header")
                const img = document.createElement("img")
                    img.setAttribute("class", "header-workshop")
                const nameP = document.createElement("p")
                const coachPicDiv = document.createElement("div")
                    coachPicDiv.setAttribute("class", "coach-pic-div-workshop")
                const coachPic = document.createElement("img")
                const titleH3 = document.createElement("h3")
                const priceP = document.createElement("p")
                    priceP.setAttribute("id", "workshop-price")
                const buttonDiv = document.createElement("div")
                const button = document.createElement("button")
                    button.setAttribute("class", "button-algemeen")
                    button.setAttribute("onclick", "openWorkshopCoaches(this)")
                    button.setAttribute("data-title", title)
                const freeNotice = document.createElement("p")
                    freeNotice.setAttribute("class", "free-notice-workshops")

                img.src = headerImg
                coachPic.src = profilePic
                nameP.innerText = nameClean
                titleH3.innerText = title
                priceP.innerText = `Prijs: ${workshopPrice} euro`
                button.innerText = "Meer informatie"
                freeNotice.innerText = "Gratis voor premium coaches"

                changeButtonIfAuthIsWorkshopTaker(takers, button)

                if(DOM != null){

                DOM.appendChild(innerDiv)
                innerDiv.appendChild(header)
                header.appendChild(img)
                innerDiv.appendChild(coachPicDiv)
                coachPicDiv.appendChild(coachPic)
                coachPicDiv.appendChild(nameP)
                innerDiv.appendChild(titleH3)
                innerDiv.appendChild(priceP)
                innerDiv.appendChild(freeNotice)
                innerDiv.appendChild(buttonDiv)
                buttonDiv.appendChild(button)

                };
            })
        });
    })
});

// Open workshops after onclick

function openWorkshopCoaches(elem){

    const title = elem.dataset.title
    window.open("../Workshops-coaches/" + title + ".html", "_self")
};

// Build workshop

function clearLocalStorage(){
    localStorage.removeItem("workshopTitle")
    localStorage.removeItem("workshopCoach")
};

!function buildWorkshop(){

    const makeWorkshopButton = document.getElementById("build-workshop-coaches")
    const noticeP = document.createElement("p")
        noticeP.setAttribute("id", "upgrade-notice")
    const bottomDiv = document.getElementById("button-div-create-workshop")

    if(makeWorkshopButton != null){

            makeWorkshopButton.addEventListener("click", () => {

                clearLocalStorage()

                auth.onAuthStateChanged(User =>{
                    if(User){
                    const userRef = db.collection("Vitaminders").doc(User.uid);
                    userRef.get().then(function(doc) {

                        const coachType = doc.data().SubscriptionType

                        if(coachType === "Premium"){
                            console.log("Premium")
                            window.open("create-workshops-for-coaches.html", "_self");
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

    if(requestButton != null){

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
    };
}();


// WORKSHOP LANDING
const workshopLandingPageOuterDiv = document.getElementById("workshop-landing-page")
const workshopLandingTitle = document.getElementById("workshop-landing-title")
const buttonWorkshopLanding = document.getElementById("button-workshop-landing")
const workshopDescription = document.getElementById("workshop-description")
const workshopFactsUl = document.getElementById("workshop-facts")
const agreementSection = document.getElementById("workshop-agreement")

db.collection("WorkshopsForCoaches")
.where("WorkshopTitle", "==", titel)
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const workshopTitle = doc.data().WorkshopTitle
        const summary = doc.data().WorkshopGoals
        const bannerImage = doc.data().BannerImage

        workshopMetaTags(summary, workshopTitle, bannerImage)

    });
});

function workshopLandingH1(workshopName){

    if(workshopLandingTitle != null){

            workshopLandingTitle.innerText = workshopName

    };
};

function workshopHeader(image){

    const header = document.getElementById("workshop-header")

    header.src = image
};

function groupLandingCreatorInformation(creator){
    const creatorDiv = document.getElementById("creator-information-div")

    const creatorName = document.createElement("h2")
    const creatorProfilePicture = document.createElement("img")

    db.collection("Vitaminders").where("Gebruikersnaam", "==", creator)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const gebruikersnaamClean = doc.data().GebruikersnaamClean
            const profilePicture = doc.data().Profielfoto

            creatorName.innerText = gebruikersnaamClean
            creatorProfilePicture.src = profilePicture

            creatorDiv.addEventListener("click", () => {
                window.open("../Vitaminders/" + [creator] + ".html", "_self");
            })

            creatorDiv.appendChild(creatorName)
            creatorDiv.appendChild(creatorProfilePicture)
        });
    });
};

function workshopFacts(priceOfWorkshop){

    const workshopPrice = document.createElement("li")

    workshopPrice.innerHTML = `<b>Prijs:</b> €${priceOfWorkshop}`

    workshopFactsUl.appendChild(workshopPrice)
};

function hideLandingIfAuthIsArrayMember(array){
    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam

            if (array.includes(auth)){
                workshopLandingPageOuterDiv.style.display = "none"
            }

            });
        };
    });
};

!function startWorkshop(){

    const button = document.getElementById("button-workshop-landing-coaches")
    const notice = document.getElementById("no-auth-notice")
    const landing = document.getElementById("workshop-landing-page")
    const paymentModal = document.getElementById("confirm-payment-modal")

    if(button != null){

        button.addEventListener("click", () => {

            auth.onAuthStateChanged(User =>{
                if(User){
        
                    landing.style.display = "none"
                    paymentModal.style.display = "flex"

                } else {
                    notice.scrollIntoView()
                    notice.style.display = "block"
                    button.style.display = "none"
                }
            });
        });
    };
}();

async function addCoachToListOfTakers(userName, paymentModal){

    await db.collection("WorkshopsForCoaches")
      .where("WorkshopTitle", "==", titel)
      .get().then(querySnapshot => {
          querySnapshot.forEach(doc => {

            console.log("test")

            db.collection("WorkshopsForCoaches")
            .doc(doc.id)
            .update({
                Takers: firebase.firestore.FieldValue.arrayUnion(userName)
            });   
        });
    });

    paymentModal.style.display = "none"
};

!function startWorkshop(){

    const button = document.getElementById("confirm-payment-button")
    const paymentModal = document.getElementById("confirm-payment-modal")

    if(button != null){

        button.addEventListener("click", () => {

            auth.onAuthStateChanged(User =>{
            db.collection("Vitaminders").doc(User.uid)
            .get()
            .then(doc =>{

                const userName = doc.data().Gebruikersnaam

                addCoachToListOfTakers(userName, paymentModal)

                });
            });
        });
    };
}();

function fillPaymentModalWithData(price, creator){

    const priceP = document.getElementById("price")
    const coachP = document.getElementById("coach")

    priceP.innerText = `€${price}` 

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", creator)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const name = doc.data().GebruikersnaamClean

            coachP.innerText = name

        });
    });
};

!function workshopQuery(){

    db.collection("WorkshopsForCoaches")
    .where("WorkshopTitle", "==", titel)
        .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const workshopTitle = doc.data().WorkshopTitle
            const summary = doc.data().WorkshopGoals
            const creator = doc.data().Coach
            const bannerImage = doc.data().BannerImage
            const price = doc.data().Price
            const takersArray = doc.data().Takers
            
            workshopLandingH1(workshopTitle)
            groupLandingCreatorInformation(creator)
            workshopFacts(price)
            hideLandingIfAuthIsArrayMember(takersArray)
            workshopHeader(bannerImage)
            fillPaymentModalWithData(price, creator)

            workshopDescription.innerHTML = summary

        });
    });
}();


// EDIT WORKSHOP
!function editWorkshopButtonOnClick(){

    const editWorkshopDiv = document.getElementById("edit-workshop-div")

    if (editWorkshopDiv != null){

        editWorkshopDiv.addEventListener("click", () => {
            
            const editWorkshopButton = document.getElementById("edit-workshop")

            const dataTitle = editWorkshopButton.dataset.title
            const dataCoach = editWorkshopButton.dataset.coach

            localStorage.setItem("workshopTitle", dataTitle)
            localStorage.setItem("workshopCoach", dataCoach)

            window.open("../create-workshops-for-coaches.html", "_self")
        });
    };
}();

function clearLocalStorage(){
    localStorage.removeItem("workshopTitle")
    localStorage.removeItem("workshopCoach")
};

function loadWorkshopTitle(title){

       const workshopTitleDOM = document.getElementById("workshop-title")

       workshopTitleDOM.value = title
};

function loadHeaderImage(headerImg){

        const uploadHeaderImage = document.getElementById("selected-header-img")

        uploadHeaderImage.src = headerImg
};

function loadWorkshopSummary(workshopGoals){
    tinyMCE.get('editor1').setContent(workshopGoals)
};

function loadWorkshopGoal(workshopGoal){
    const selectGoal = document.getElementById("select-goel-workshop")

    const options = selectGoal.options

    const optionsArray = Array.from(options)

    optionsArray.forEach(opt => {

        if(opt.innerHTML == workshopGoal){

            selectGoal.value = opt.innerHTML
        };
    });
};

function loadWorkshopPrice(workshopPrice){

    const priceDOM = document.getElementById("workshop-price")

    priceDOM.value = workshopPrice
};

function loadSteps(dbTitle,buttonID,DOMtitleID, editorB, editorC, setContentB, setContentC, innerDiv ){
    if(dbTitle != ""){
        const button = document.getElementById(buttonID)

        button.click()
        button.style.display = "none"
    };

    const DOMtitle = document.getElementById(DOMtitleID)
    tinyMCE.get(editorB).setContent(setContentB)
    tinyMCE.get(editorC).setContent(setContentC)

    DOMtitle.value = dbTitle

    const innerDivDOM = document.getElementById(innerDiv)
    innerDivDOM.setAttribute("data-title", dbTitle)
    innerDivDOM.setAttribute("data-explainer", setContentB)
    innerDivDOM.setAttribute("data-cta", setContentC)

};

function loadClosing(closingTitle, closingText, createClosing, closingTitleInput, editorClosing){

    if(closingTitle != "" && closingText != ""){

        const closingButton = document.getElementById(createClosing)
            closingButton.click()

        const closingTitleDOM = document.getElementById(closingTitleInput)
        tinyMCE.get(editorClosing).setContent(closingText)

        closingTitleDOM.value = closingTitle
    };
} 

function hideSaveButtonShowUpdateButton(){
    const saveWorkshopButton = document.getElementById("saveWorkshop")
    const updateWorkshopButton = document.getElementById("updateWorkshop")

    saveWorkshopButton.innerText = "Opgeslagen"
    saveWorkshopButton.onclick = "clicked()"

    setTimeout(() => { 
        saveWorkshopButton.style.display = "none" 
        updateWorkshopButton.style.display = "flex" 
    }, 2000);
};

function addMetaDataToUpdateButton(coach, title){
    const updateWorkshopButton = document.getElementById("updateWorkshop")

    updateWorkshopButton.setAttribute("data-coach", coach)
    updateWorkshopButton.setAttribute("data-title", title)
};

!function fillCreateWorkshopIfLocaleStorageIsSet(){ 

    const loaderModal = document.getElementById("loading-modal")
    const titleFromStorage = localStorage.getItem("workshopTitle")
    const coachFromStorage = localStorage.getItem("workshopCoach")

    if(titleFromStorage != undefined && coachFromStorage != undefined){

        if(loaderModal != null){

            loaderModal.style.display = "flex"

            setTimeout(() => {

            db.collection("WorkshopsForCoaches").where("WorkshopTitle", "==", titleFromStorage)
            .where("Coach", "==", coachFromStorage).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
            
                    const title = doc.data().WorkshopTitle
                    const coach = doc.data().Coach
                    const headerImg = doc.data().BannerImage
                    const theme = doc.data().Goal
                    const workshopGoals = doc.data().WorkshopGoals
                    const workshopPrice = doc.data().Price
                    const stepOneTitle = doc.data().StepOneTitle
                    const stepOneExplainer = doc.data().StepOneExplainer
                    const stepOneCTA = doc.data().StepOneCTA
                    const stepTwoTitle = doc.data().StepTwoTitle
                    const stepTwoExplainer = doc.data().StepTwoExplainer
                    const stepTwoCTA = doc.data().StepTwoCTA
                    const stepThreeTitle = doc.data().StepThreeTitle
                    const stepThreeExplainer = doc.data().StepThreeExplainer
                    const stepThreeCTA = doc.data().StepThreeCTA
                    const stepFourTitle = doc.data().StepFourTitle
                    const stepFourExplainer = doc.data().StepFourExplainer
                    const stepFourCTA = doc.data().StepFourCTA
                    const stepFiveTitle = doc.data().StepFiveTitle
                    const stepFiveExplainer = doc.data().StepFiveExplainer
                    const stepFiveCTA = doc.data().StepFiveCTA
                    const stepSixTitle = doc.data().StepSixTitle
                    const stepSixExplainer = doc.data().StepSixExplainer
                    const stepSixCTA = doc.data().StepSixCTA
                    const stepSevenTitle = doc.data().StepSevenTitle
                    const stepSevenExplainer = doc.data().StepSevenExplainer
                    const stepSevenCTA = doc.data().StepSevenCTA
                    const stepEightTitle = doc.data().StepEightTitle
                    const stepEightExplainer = doc.data().StepEightExplainer
                    const stepEightCTA = doc.data().StepEightCTA
                    const stepNineTitle = doc.data().StepNineTitle
                    const stepNineExplainer = doc.data().StepNineExplainer
                    const stepNineCTA = doc.data().StepNineCTA
                    const closingOneText = doc.data().ClosingOneText 
                    const closingOneTitle = doc.data().ClosingOneTitle
                    const closingTwoText = doc.data().ClosingTwoText 
                    const closingTwoTitle = doc.data().ClosingTwoTitle
                    const closingThreeText = doc.data().ClosingThreeText 
                    const closingThreeTitle = doc.data().ClosingThreeTitle
                    const closingFourText = doc.data().ClosingFourText 
                    const closingFourTitle = doc.data().ClosingFourTitle
                    const closingFiveText = doc.data().ClosingFiveText 
                    const closingFiveTitle = doc.data().ClosingFiveTitle
                    const closingSixText = doc.data().ClosingSixText 
                    const closingSixTitle = doc.data().ClosingSixTitle
                    const closingSevenText = doc.data().ClosingSevenText 
                    const closingSevenTitle = doc.data().ClosingSevenTitle
                    const closingEightText = doc.data().ClosingEightText 
                    const closingEightTitle = doc.data().ClosingEightTitle
                    const closingNineText = doc.data().ClosingNineText 
                    const closingNineTitle = doc.data().ClosingNineTitle

                    loadWorkshopTitle(title)
                    loadHeaderImage(headerImg)
                    loadWorkshopSummary(workshopGoals)
                    loadWorkshopGoal(theme)
                    loadWorkshopPrice(workshopPrice)
                    hideSaveButtonShowUpdateButton()
                    addMetaDataToUpdateButton(coach, title)

                    loadSteps(stepOneTitle, "button-step-one", "step-one-title", 'editor3', 'editor4', stepOneExplainer, stepOneCTA, "step-one-inner-div")
                    loadSteps(stepTwoTitle, "button-step-two", "step-two-title",  'editor5', 'editor6', stepTwoExplainer, stepTwoCTA, "step-two-inner-div")
                    loadSteps(stepThreeTitle, "button-step-three", "step-three-title", 'editor7', 'editor8', stepThreeExplainer, stepThreeCTA, "step-three-inner-div")
                    loadSteps(stepFourTitle, "button-step-four", "step-four-title", 'editor9', 'editor10', stepFourExplainer, stepFourCTA, "step-four-inner-div")
                    loadSteps(stepFiveTitle, "button-step-five", "step-five-title", 'editor11', 'editor12', stepFiveExplainer, stepFiveCTA, "step-five-inner-div")
                    loadSteps(stepSixTitle, "button-step-six", "step-six-title", 'editor13', 'editor14', stepSixExplainer, stepSixCTA, "step-six-inner-div" )
                    loadSteps(stepSevenTitle, "button-step-seven", "step-seven-title", 'editor15', 'editor16', stepSevenExplainer, stepSevenCTA, "step-seven-inner-div" )
                    loadSteps(stepEightTitle, "button-step-eight", "step-eight-title", 'editor17', 'editor18', stepEightExplainer, stepEightCTA, "step-eight-inner-div" )
                    loadSteps(stepNineTitle, "button-step-nine", "step-nine-title", 'editor19', 'editor20', stepNineExplainer, stepNineCTA, "step-nine-inner-div" )
                    
                    loadClosing(closingOneTitle, closingOneText, "create-closing-1", "closing-title-input-1", "editor-closing-1")
                    loadClosing(closingTwoTitle, closingTwoText, "create-closing-2", "closing-title-input-2", "editor-closing-2")
                    loadClosing(closingThreeTitle, closingThreeText, "create-closing-3", "closing-title-input-3", "editor-closing-3")
                    loadClosing(closingFourTitle, closingFourText, "create-closing-4", "closing-title-input-4", "editor-closing-4")
                    loadClosing(closingFiveTitle, closingFiveText, "create-closing-5", "closing-title-input-5", "editor-closing-5")
                    loadClosing(closingSixTitle, closingSixText, "create-closing-6", "closing-title-input-6", "editor-closing-6")
                    loadClosing(closingSevenTitle, closingSevenText, "create-closing-7", "closing-title-input-7", "editor-closing-7")
                    loadClosing(closingEightTitle, closingEightText, "create-closing-8", "closing-title-input-8", "editor-closing-8")
                    loadClosing(closingNineTitle, closingNineText, "create-closing-9", "closing-title-input-9", "editor-closing-9")
                            
                    });
                })
                .then(() => {
                        loaderModal.style.display = "none"
                });
            }, 2000);
        };
    };
}();


//CREATE WORKSHOP

let bannerImage = ""

!function uploadBanner(){
    const uploadImageButton = document.getElementById("upload-banner")
    const selectedBannerImage = document.getElementById("selected-header-img")
    const loaderModal = document.getElementById("loading-modal")

    console.log(uploadImageButton)

    if (uploadImageButton != null){
    uploadImageButton.addEventListener("click", () => {

        loaderModal.style.display = "flex"

        uploadImageButton.innerText = "Uploaden.."
    
    const selectedFile = document.getElementById('foto-upload-create-workshop').files[0];
    const storageRef = firebase.storage().ref("/Workshop-banners/" + selectedFile.name);

    const uploadTask = storageRef.put(selectedFile)
    uploadTask.then(() => {
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    progressBar.innerHTML = ` ${progress} %`;
    switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
    }, function(error) {
    // Handle unsuccessful uploads
    }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        bannerImage = downloadURL
        uploadImageButton.innerText = "Geupload"
        console.log(downloadURL)
        selectedBannerImage.src = downloadURL
        loaderModal.style.display = "none"
                    });                                                
                });
            });
        });
    };
}();

function showPreviewButton(){
    const previewWorkshop = document.getElementById("preview-workshop")

    previewWorkshop.style.display = "block"
};

function setMetaDataToLocalStorage(title, coach){
    localStorage.setItem("workshopTitle", title)
    localStorage.setItem("workshopCoach", coach)
};

function saveWorkshop(){
    const workshopTitle = document.getElementById("workshop-title").value
    const workshopGoals = tinyMCE.get('editor1').getContent()

    hideSaveButtonShowUpdateButton()
    showPreviewButton()

    // Workshop goal
    const workshopGoalSelect = document.getElementById("select-goel-workshop")

    const select = workshopGoalSelect.options
    const workshopGoal = select[select.selectedIndex].innerHTML

    // Workshop price
    const workshopPrice = document.getElementById("workshop-price").value

    // Step one
    const stepOneTitle =  document.getElementById("step-one-title").value
    const stepOneExplainer = tinyMCE.get('editor3').getContent()
    const stepOneCTA = tinyMCE.get('editor4').getContent()

    const innerDiv = document.getElementById("step-one-inner-div")
        innerDiv.setAttribute("data-title", stepOneTitle)
        innerDiv.setAttribute("data-explainer", stepOneExplainer)
        innerDiv.setAttribute("data-cta", stepOneCTA)
   
     // Step two
     const stepTwoTitle =  document.getElementById("step-two-title").value
     const stepTwoExplainer = tinyMCE.get('editor5').getContent()
     const stepTwoCTA = tinyMCE.get('editor6').getContent()

      // Step three
    const stepThreeTitle =  document.getElementById("step-three-title").value
    const stepThreeExplainer = tinyMCE.get('editor7').getContent()
    const stepThreeCTA = tinyMCE.get('editor8').getContent()

     // Step four
     const stepFourTitle =  document.getElementById("step-four-title").value
     const stepFourExplainer = tinyMCE.get('editor9').getContent()
     const stepFourCTA = tinyMCE.get('editor10').getContent()

      // Step five
    const stepFiveTitle =  document.getElementById("step-five-title").value
    const stepFiveExplainer = tinyMCE.get('editor11').getContent()
    const stepFiveCTA = tinyMCE.get('editor12').getContent()

     // Step six
     const stepSixTitle =  document.getElementById("step-six-title").value
     const stepSixExplainer = tinyMCE.get('editor13').getContent()
     const stepSixCTA = tinyMCE.get('editor14').getContent()

      // Step seven
    const stepSevenTitle =  document.getElementById("step-seven-title").value
    const stepSevenExplainer = tinyMCE.get('editor15').getContent()
    const stepSevenCTA = tinyMCE.get('editor16').getContent()

     // Step eight
     const stepEightTitle =  document.getElementById("step-eight-title").value
     const stepEightExplainer = tinyMCE.get('editor17').getContent()
     const stepEightCTA = tinyMCE.get('editor18').getContent()

     // Step nine
     const stepNineTitle =  document.getElementById("step-nine-title").value
     const stepNineExplainer = tinyMCE.get('editor19').getContent()
     const stepNineCTA = tinyMCE.get('editor20').getContent()

     // Closing
     const closingOneTitle = document.getElementById("closing-title-input-1").value
     const closingOneText = tinyMCE.get('editor-closing-1').getContent()
     const closingTwoTitle = document.getElementById("closing-title-input-2").value
     const closingTwoText = tinyMCE.get('editor-closing-2').getContent()
     const closingThreeTitle = document.getElementById("closing-title-input-3").value
     const closingThreeText = tinyMCE.get('editor-closing-3').getContent()
     const closingFourTitle = document.getElementById("closing-title-input-4").value
     const closingFourText = tinyMCE.get('editor-closing-4').getContent()
     const closingFiveTitle = document.getElementById("closing-title-input-5").value
     const closingFiveText = tinyMCE.get('editor-closing-5').getContent()
     const closingSixTitle = document.getElementById("closing-title-input-6").value
     const closingSixText = tinyMCE.get('editor-closing-6').getContent()
     const closingSevenTitle = document.getElementById("closing-title-input-7").value
     const closingSevenText = tinyMCE.get('editor-closing-7').getContent()
     const closingEightTitle = document.getElementById("closing-title-input-8").value
     const closingEightText = tinyMCE.get('editor-closing-8').getContent()
     const closingNineTitle = document.getElementById("closing-title-input-9").value
     const closingNineText = tinyMCE.get('editor-closing-9').getContent()

     auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const auth = doc.data().Gebruikersnaam;

                    addMetaDataToUpdateButton(auth, workshopTitle)
                    setMetaDataToLocalStorage(workshopTitle, auth)

    db.collection("WorkshopsForCoaches").doc().set({
        Eigenaar: "Vitaminds",
        Coach: auth,
        Status: "Draft",
        Goal: workshopGoal,
        Price: workshopPrice,
        Takers: firebase.firestore.FieldValue.arrayUnion(auth),
        WorkshopTitle: workshopTitle,
        WorkshopGoals: workshopGoals,
        BannerImage: bannerImage,
        StepOneTitle: stepOneTitle,
        StepOneExplainer: stepOneExplainer,
        StepOneCTA: stepOneCTA,
        StepTwoTitle: stepTwoTitle,
        StepTwoExplainer: stepTwoExplainer,
        StepTwoCTA: stepTwoCTA,
        StepThreeTitle: stepThreeTitle,
        StepThreeExplainer: stepThreeExplainer,
        StepThreeCTA: stepThreeCTA,
        StepFourTitle: stepFourTitle,
        StepFourExplainer: stepFourExplainer,
        StepFourCTA: stepFourCTA,
        StepFiveTitle: stepFiveTitle,
        StepFiveExplainer: stepFiveExplainer,
        StepFiveCTA: stepFiveCTA,
        StepSixTitle: stepSixTitle,
        StepSixExplainer: stepSixExplainer,
        StepSixCTA: stepSixCTA,
        StepSevenTitle: stepSevenTitle,
        StepSevenExplainer: stepSevenExplainer,
        StepSevenCTA: stepSevenCTA,
        StepEightTitle: stepEightTitle,
        StepEightExplainer: stepEightExplainer,
        StepEightCTA: stepEightCTA,
        StepNineTitle: stepNineTitle,
        StepNineExplainer: stepNineExplainer,
        StepNineCTA: stepNineCTA,
        ClosingOneTitle: closingOneTitle,
        ClosingOneText: closingOneText,
        ClosingTwoTitle: closingTwoTitle,
        ClosingTwoText: closingTwoText,
        ClosingThreeTitle: closingThreeTitle,
        ClosingThreeText: closingThreeText,
        ClosingFourTitle: closingFourTitle,
        ClosingFourText: closingFourText,
        ClosingFiveTitle: closingFiveTitle,
        ClosingFiveText: closingFiveText,
        ClosingSixTitle: closingSixTitle,
        ClosingSixText: closingSixText,
        ClosingSevenTitle: closingSevenTitle,
        ClosingSevenText: closingSevenText,
        ClosingEightTitle: closingEightTitle,
        ClosingEightText: closingEightText,
        ClosingNineTitle: closingNineTitle,
        ClosingNineText: closingNineText,
                });
            });
        };
    });
};

function savedNotice(updateButton){
    updateButton.innerText = "Opgeslagen"

    setTimeout(() => { 
        updateButton.innerText = "Opslaan" 
    }, 2000);
};

function updateWorkshop(){
    const workshopGoals = tinyMCE.get('editor1').getContent()
    const selectedBannerImg = document.getElementById("selected-header-img")

    const updateButton = document.getElementById("updateWorkshop")
    const workshopTitle = updateButton.dataset.title
    const workshopCoach = updateButton.dataset.coach

    savedNotice(updateButton)

        // Workshop goal
        const workshopGoalSelect = document.getElementById("select-goel-workshop")

        const select = workshopGoalSelect.options
        const workshopGoal = select[select.selectedIndex].innerHTML

        //Banner image
        const bannerImageSource = selectedBannerImg.src

        // Price
        const workshopPrice = document.getElementById("workshop-price")

       // Step one
       const stepOneTitle =  document.getElementById("step-one-title").value
       const stepOneExplainer = tinyMCE.get('editor3').getContent()
       const stepOneCTA = tinyMCE.get('editor4').getContent()

        // Step two
        const stepTwoTitle =  document.getElementById("step-two-title").value
        const stepTwoExplainer = tinyMCE.get('editor5').getContent()
        const stepTwoCTA = tinyMCE.get('editor6').getContent()

        // Step three
        const stepThreeTitle =  document.getElementById("step-three-title").value
        const stepThreeExplainer = tinyMCE.get('editor7').getContent()
        const stepThreeCTA = tinyMCE.get('editor8').getContent()

        // Step four
        const stepFourTitle =  document.getElementById("step-four-title").value
        const stepFourExplainer = tinyMCE.get('editor9').getContent()
        const stepFourCTA = tinyMCE.get('editor10').getContent()

        // Step five
        const stepFiveTitle =  document.getElementById("step-five-title").value
        const stepFiveExplainer = tinyMCE.get('editor11').getContent()
        const stepFiveCTA = tinyMCE.get('editor12').getContent()

        // Step six
        const stepSixTitle =  document.getElementById("step-six-title").value
        const stepSixExplainer = tinyMCE.get('editor13').getContent()
        const stepSixCTA = tinyMCE.get('editor14').getContent()

        // Step seven
        const stepSevenTitle =  document.getElementById("step-seven-title").value
        const stepSevenExplainer = tinyMCE.get('editor15').getContent()
        const stepSevenCTA = tinyMCE.get('editor16').getContent()

        // Step eight
        const stepEightTitle =  document.getElementById("step-eight-title").value
        const stepEightExplainer = tinyMCE.get('editor17').getContent()
        const stepEightCTA = tinyMCE.get('editor18').getContent()

        // Step nine
        const stepNineTitle =  document.getElementById("step-nine-title").value
        const stepNineExplainer = tinyMCE.get('editor19').getContent()
        const stepNineCTA = tinyMCE.get('editor20').getContent()

        // Closing
        const closingOneTitle = document.getElementById("closing-title-input-1").value
        const closingOneText = tinyMCE.get('editor-closing-1').getContent()
        const closingTwoTitle = document.getElementById("closing-title-input-2").value
        const closingTwoText = tinyMCE.get('editor-closing-2').getContent()
        const closingThreeTitle = document.getElementById("closing-title-input-3").value
        const closingThreeText = tinyMCE.get('editor-closing-3').getContent()
        const closingFourTitle = document.getElementById("closing-title-input-4").value
        const closingFourText = tinyMCE.get('editor-closing-4').getContent()
        const closingFiveTitle = document.getElementById("closing-title-input-5").value
        const closingFiveText = tinyMCE.get('editor-closing-5').getContent()
        const closingSixTitle = document.getElementById("closing-title-input-6").value
        const closingSixText = tinyMCE.get('editor-closing-6').getContent()
        const closingSevenTitle = document.getElementById("closing-title-input-7").value
        const closingSevenText = tinyMCE.get('editor-closing-7').getContent()
        const closingEightTitle = document.getElementById("closing-title-input-8").value
        const closingEightText = tinyMCE.get('editor-closing-8').getContent()
        const closingNineTitle = document.getElementById("closing-title-input-9").value
        const closingNineText = tinyMCE.get('editor-closing-9').getContent()

    db.collection("WorkshopsForCoaches")
    .where("WorkshopTitle", "==", workshopTitle)
    .where("Coach", "==", workshopCoach)

    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("WorkshopsForCoaches").doc(doc.id).update({
                Goal: workshopGoal,
                Price: workshopPrice.value,
                Coach: workshopCoach,
                Takers: firebase.firestore.FieldValue.arrayUnion(workshopCoach),
                WorkshopTitle: workshopTitle,
                BannerImage: bannerImageSource,
                WorkshopGoals: workshopGoals,
                StepOneTitle: stepOneTitle,
                StepOneExplainer: stepOneExplainer,
                StepOneCTA: stepOneCTA,
                StepTwoTitle: stepTwoTitle,
                StepTwoExplainer: stepTwoExplainer,
                StepTwoCTA: stepTwoCTA,
                StepThreeTitle: stepThreeTitle,
                StepThreeExplainer: stepThreeExplainer,
                StepThreeCTA: stepThreeCTA,
                StepFourTitle: stepFourTitle,
                StepFourExplainer: stepFourExplainer,
                StepFourCTA: stepFourCTA,
                StepFiveTitle: stepFiveTitle,
                StepFiveExplainer: stepFiveExplainer,
                StepFiveCTA: stepFiveCTA,
                StepSixTitle: stepSixTitle,
                StepSixExplainer: stepSixExplainer,
                StepSixCTA: stepSixCTA,
                StepSevenTitle: stepSevenTitle,
                StepSevenExplainer: stepSevenExplainer,
                StepSevenCTA: stepSevenCTA,
                StepEightTitle: stepEightTitle,
                StepEightExplainer: stepEightExplainer,
                StepEightCTA: stepEightCTA,
                StepNineTitle: stepNineTitle,
                StepNineExplainer: stepNineExplainer,
                StepNineCTA: stepNineCTA,
                ClosingOneTitle: closingOneTitle,
                ClosingOneText: closingOneText,
                ClosingTwoTitle: closingTwoTitle,
                ClosingTwoText: closingTwoText,
                ClosingThreeTitle: closingThreeTitle,
                ClosingThreeText: closingThreeText,
                ClosingFourTitle: closingFourTitle,
                ClosingFourText: closingFourText,
                ClosingFiveTitle: closingFiveTitle,
                ClosingFiveText: closingFiveText,
                ClosingSixTitle: closingSixTitle,
                ClosingSixText: closingSixText,
                ClosinSevenTitle: closingSevenTitle,
                ClosingSevenText: closingSevenText,
                ClosingEightTitle: closingEightTitle,
                ClosingEightText: closingEightText,
                ClosingNineTitle: closingNineTitle,
                ClosingNineText: closingNineText,
            });   
        })
    });
};

function previewWorkshop(){

    const updateButton = document.getElementById("updateWorkshop")
    const workshopTitle = updateButton.dataset.title
    const workshopCoach = updateButton.dataset.coach

    db.collection("WorkshopsForCoaches")
    .where("WorkshopTitle", "==", workshopTitle)
    .where("Coach", "==", workshopCoach)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("WorkshopsForCoaches").doc(doc.id).update({
                Status: "Draft",
                Takers: firebase.firestore.FieldValue.arrayUnion(workshopCoach)
            });
        });
    })
    .then(() => {
        window.open("../workshops-coaches/" + workshopTitle + ".html", "_blank")
    });
};

function publishWorkshop(){

    const updateButton = document.getElementById("updateWorkshop")
    const workshopTitle = updateButton.dataset.title
    const workshopCoach = updateButton.dataset.coach

    changeTextOfPublishButton()

    db.collection("WorkshopsForCoaches")
    .where("WorkshopTitle", "==", workshopTitle)
    .where("Coach", "==", workshopCoach)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("WorkshopsForCoaches").doc(doc.id).update({
                Status: "Draft",
                Takers: firebase.firestore.FieldValue.arrayUnion(workshopCoach)
            });
        });
    });    
};

function changeTextOfPublishButton(){

    const publishButton = document.getElementById("publish-workshop")

    publishButton.innerText = "Aangemeld"

};

function createStep(stepInnerDiv, buttonStep){

    const createStep = document.getElementById(buttonStep)

        const step = document.getElementById(stepInnerDiv)

        if(createStep != null){

        createStep.addEventListener("click", () => {
            step.style.display = "flex"
        });
    };
} 

createStep("step-one-inner-div", "button-step-one")
createStep("step-two-inner-div", "button-step-two")
createStep("step-three-inner-div", "button-step-three")
createStep("step-four-inner-div", "button-step-four")
createStep("step-five-inner-div", "button-step-five")
createStep("step-six-inner-div", "button-step-six")
createStep("step-seven-inner-div", "button-step-seven")
createStep("step-eight-inner-div", "button-step-eight")
createStep("step-nine-inner-div", "button-step-nine")

// Create closing

function createClosing(elem){

    const closingElem = elem.parentElement.parentElement.nextElementSibling

    console.log(closingElem)
    closingElem.style.display = "flex"
};

// TAKE A WORKSHOP
!function showEditWorkshopOwner(){
    const editWorkshopDiv = document.getElementById("edit-workshop-div")

    auth.onAuthStateChanged(User =>{
        if(User){

            db.collection("Vitaminders").doc(User.uid).get()
            .then(doc => {

                const auth = doc.data().Gebruikersnaam
                const admin = doc.data().Admin

                showEditWorkshopAdmin(admin, editWorkshopDiv)

                db.collection("WorkshopsForCoaches")
                .where("WorkshopTitle", "==", titel)
                .where("Coach", "==", auth)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        editWorkshopDiv.style.display = "flex"

                    });
                });
            });
        };
    });
}();

function showEditWorkshopAdmin(admin, editWorkshopDiv){

    if (admin === "Yes"){
        editWorkshopDiv.style.display = "flex"
    };
};

// Goal check

function authRoutes(workshopDomain){

    const authRouteDiv = document.getElementById("auth-routes")

    const routeArray = []

    auth.onAuthStateChanged(User =>{
        if(User){
            db.collection("Vitaminders").doc(User.uid).get()
            .then(doc => {
    

                const nameClean = doc.data().GebruikersnaamClean
                const name = doc.data().Gebruikersnaam

                authHasNoRouteNotice(authRouteDiv, workshopDomain, nameClean)

                console.log(workshopDomain)

                db.collection("Vitaminders")
                .doc(doc.id).collection("Coachvragen")
                .where("Domain", "==", workshopDomain)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const routes = doc1.data().GoalClean

                        routeArray.push(routes)

                        console.log(routeArray.length)

                        if(routeArray.length === 1){
                            
                            authHasOneRouteNotice(authRouteDiv, workshopDomain, nameClean, routes)

                        } else if (routeArray.length > 1){

                                authHasMultipleRouteNotice(authRouteDiv, workshopDomain, nameClean)

                        };
                    });
                });
            });
        };
    });
};

function appendRoutesOfAUthToRouteSelect(workshopDomain){

    auth.onAuthStateChanged(User =>{
        if(User){
            db.collection("Vitaminders").doc(User.uid).get()
            .then(doc => {

                db.collection("Vitaminders")
                .doc(doc.id).collection("Coachvragen")
                .where("Domain", "==", workshopDomain)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const routes = doc1.data().GoalClean

                        const routeSelect = document.getElementById("routeSelectAuth")

                        const option = document.createElement("option")

                        option.innerHTML = `<b>${routes}</b>`

                        routeSelect.appendChild(option)

                    });
                });
            });
        };
    });
};

function authHasNoRouteNotice(authHasNoRouteDiv, workshopDomain, nameClean){
    authHasNoRouteDiv.innerHTML = `
        <b>Het thema van deze workshop is ${workshopDomain}</b>  <br> <br>
        Ik zie dat je nog geen doel hebt  met dit thema.  <br> 
        Maak eerst een doel aan met het thema ${workshopDomain}.  <br> 
        Dan wordt alles wat je bij deze workshop leert onder dat doel opgeslagen in je account. <br>  <br> 
        <button class="button-algemeen button-workshop" onclick="startRoute()">Doel aanmaken</button>`
};

function authHasOneRouteNotice(authHasOneRouteDiv, workshopDomain, nameClean, routeOfAuth){
    authHasOneRouteDiv.innerHTML = `
        <b>Het thema van deze workshop is ${workshopDomain}</b> <br><br>
        Ik zie dat je een doel hebt met dit thema: <br>
        <select id="routeSelectAuth"></select> <br>
        Wil je deze workshop aan dat doel koppelen?<br><br>
        Alles dat je over jezelf leert tijdens deze workshop wordt dan onder dat doel opgeslagen in je account.<br><br>
        <div class="goal-auth-buttons">
        <button class="button-algemeen button-workshop" onclick="linkRouteAndWorkshop()">Doel koppelen</button>
        </div>
        <div class="goal-auth-buttons">
        <button class="button-algemeen button-workshop start-route-button" onclick="startRoute()">Nieuw doel aanmaken</button>
        </div>`     
};

function authHasMultipleRouteNotice(authHasOneRouteDiv, workshopDomain, nameClean){
    authHasOneRouteDiv.innerHTML = `
                Het thema van deze workshop is <b>${workshopDomain}</b> <br><br>
                Ik zie dat je meerdere doelen hebt met dit thema: <br>
                <select id="routeSelectAuth"></select> <br>
                Wil je deze workshop aan een van deze doelen koppelen? <br>
                Selecteer hierboven het doel van je keuze.<br><br>
                Alles dat je over jezelf leert tijdens deze workshop wordt dan onder dat doel opgeslagen in je account.<br><br>
                <div class="goal-auth-buttons">
                <button class="button-algemeen button-workshop" onclick="linkRouteAndWorkshop()">Doel koppelen</button>
                </div>
                <div class="goal-auth-buttons">
                <button class="button-algemeen button-workshop start-route-button" onclick="startRoute()">Nieuw doel aanmaken</button>
                </div>`
}

function startRoute(){

    const startNewRouteDiv = document.getElementById("set-new-goal-div")

    startNewRouteDiv.style.display = "flex"
}

function linkRouteAndWorkshop(){

    let workshopDomain = ""

    const routeSelect = document.getElementById("routeSelectAuth")

    const option = routeSelect.options
    const selected = option[option.selectedIndex].innerHTML

    db.collection("WorkshopsForCoaches")
        .where("WorkshopTitle", "==", titel)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                workshopDomain = doc.data().Goal

            });
        })
        .then(() => {

            saveSet(workshopDomain, selected)

        });
};


function createGoalAndStartWorkshop(){

    const workshopGoal = document.getElementById("workshop-goal-title").innerText
    const goalTitle = document.getElementById("personal-goal-title").value
    const goalDescription = document.getElementById("goal-summary").value

    auth.onAuthStateChanged(User =>{
        if(User){
            db.collection("Vitaminders").doc(User.uid).get()
            .then(doc => {

                const auth = doc.data().Gebruikersnaam

                db.collection("Vitaminders")
                .doc(doc.id).collection("Coachgoals").doc()
                .set({
                    Eigenaar: "Vitaminds",
                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                    Gebruikersnaam: auth,
                    Domain: workshopGoal,
                    Lessons: [],
                    ID: idClean,
                    Goal: idClean + goalTitle,
                    GoalClean: goalTitle,
                    Omschrijving: goalDescription,
                    Openbaar: "public",
                    Type: "Coachgoal"
                })
                .then(() => {
                    saveSet(workshopGoal, goalTitle)
                });
            });
        };
    });
};

!function checkIfAuthHasSaveSet(){

    const checkGoalOuterDiv = document.getElementById("workshop-goal-check")
    const workshopOuterDiv = document.getElementById("workshop-inner-div")

    auth.onAuthStateChanged(User =>{
        if(User){
            db.collection("Vitaminders").doc(User.uid).get()
            .then(doc1 => {

                const authName = doc1.data().Gebruikersnaam

                db.collectionGroup("WorkshopsForCoaches")
                .where("Workshop", "==", titel)
                .where("Gebruikersnaam", "==", authName)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {

                        checkGoalOuterDiv.style.display = "none"
                        workshopOuterDiv.style.display = "flex"
                    });
                });
            });
        };
    });
}();
    
function saveSet(goalWorkshop, goalAuth){

    auth.onAuthStateChanged(User =>{
        if(User){

            db.collection("Vitaminders").doc(User.uid).get()
            .then(doc => {

                const auth = doc.data().Gebruikersnaam

    db.collection("Vitaminders")
    .doc(User.uid)
    .collection("WorkshopsForCoaches")
    .doc().set({
        Workshop: titel,
        Gebruikersnaam: auth,
        Goal: goalWorkshop,
        AuthGoal: goalAuth,
        StepOneInput: "",
        StepTwoInput: "",
        StepThreeInput: "",
        StepFourInput: "",
        StepFiveInput: "",
        StepSixInput: "",
        StepSevenInput: "",
        StepEightInput: "",
        StepNineInput: "",
        ClosingInput: "",
        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                })
                .then(() => {
                    location.reload();
                })
            });
        };
    });
};

!function allImagesResponsive(){
    const workshopSection = document.getElementById("workshop-section")

    if (workshopSection != undefined){

    const allImg = workshopSection.querySelectorAll("img")
    
    allImgArray = Array.from(allImg)
    
    allImgArray.forEach(img => {
        img.style.height = "100%"
        img.style.width = "100%"
    })
};
}();

 // Step overview
 function stepOverview(stepTitle, stepTitleP, innerTextTitleP, stepPreviewDiv, stepCheck, stepOverviewDom){
    if(stepTitle != ""){
        stepTitleP.innerText = innerTextTitleP
    stepOverviewDom.appendChild(stepPreviewDiv)
    stepPreviewDiv.appendChild(stepCheck)
    stepPreviewDiv.appendChild(stepTitleP)
    };
};

// Add workshop data to edit workshop button
function addWorkshopDataToEditWorkshopButton(titleWorkshop, coachWorkshop){

    const editWorkshop = document.getElementById("edit-workshop")

    editWorkshop.setAttribute("data-title", titleWorkshop)
    editWorkshop.setAttribute("data-coach", coachWorkshop)
};

function welcomeMessage(){

    const coachWelcome = document.getElementById("coach-welcome")

    auth.onAuthStateChanged(User =>{
        if (User){
    
        db.collection("Vitaminders")
        .doc(User.uid).get()
        .then(function(doc){
                    const auth = doc.data().GebruikersnaamClean

        coachWelcome.innerText = `Welkom bij mijn workshop, ${auth}`

            });
        };
    });
};

function setProfilePicOfCoach(coach){

    const coachPic = document.getElementById("coach-pic")

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", coach)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

            const nameClean = doc1.data().GebruikersnaamClean
            const profilePic = doc1.data().Profielfoto

            coachPic.src = profilePic

        });
    });
};

function setHeaderImage(headerImg){

    const headerImage = document.getElementById("workshopHeader")
    const img = document.createElement("img")

    img.src = headerImg
    headerImage.appendChild(img)
};

function setWorkshopTitle(title){

    const workshopTitle = document.getElementById("workshop-title")

    workshopTitle.innerText = title
};

function loadSummary(workshopGoals){
    const summary = document.getElementById("workshop-summary")

    summary.innerHTML = workshopGoals
};

function stepOverview(stepTitle, list){

    const stepsOverview = document.getElementById("steps-overview")

    if(stepTitle != ""){
        const listItem = document.createElement("li")

        listItem.innerText = stepTitle

        stepsOverview.appendChild(list)
        list.appendChild(listItem)
    };
};

function displayNextStap(button, nextStepTitle, nextStepDiv, closing){

    button.addEventListener("click", () => {

        console.log(nextStepTitle)
        if(nextStepTitle != ""){
            nextStepDiv.style.display = "flex"
        } else {
            closing.style.display = "flex"
        };
    });
};

function closingTitle(closingTitleDom, closingTitleP){

    closingTitleDom.innerHTML = closingTitleP

};

function closingText(closingTextDom, closingTextP){

    closingTextDom.innerHTML = closingTextP

};

function stepTitle(stepTitleDOM, stepTitleP){

    stepTitleDOM.innerHTML = stepTitleP

};

function stepExplainer(stepExplainerDOM,stepExplainerP){

    stepExplainerDOM.innerHTML = stepExplainerP

};

function saveButtonNotice(button){
    
    button.innerText = "Opgeslagen"

    setTimeout(() => { 
        button.innerText = "Opslaan"
    }, 2000);
};

function updateSaveWorkshop(titel){

    const button = document.getElementById("update")

    button.addEventListener("click", () => {

        saveButtonNotice(button)

        const stepOneCTA = document.getElementById("step-one-CTA").value
        const stepTwoCTA = document.getElementById("step-two-CTA").value
        const stepThreeCTA = document.getElementById("step-three-CTA").value
        const stepFourCTA = document.getElementById("step-four-CTA").value
        const stepFiveCTA = document.getElementById("step-five-CTA").value
        const stepSixCTA = document.getElementById("step-six-CTA").value
        const stepSevenCTA = document.getElementById("step-seven-CTA").value
        const stepEightCTA = document.getElementById("step-eight-CTA").value
        const stepNineCTA = document.getElementById("step-nine-CTA").value

        const feedbackInput = document.getElementsByClassName("feedback-input")

        const feedbackInputArray = Array.from(feedbackInput)

        let closingInput = ""

        feedbackInputArray.forEach(FB => {

            if(FB.value != ""){
                closingInput = FB.value
                console.log(closingInput)
            };
        });

        auth.onAuthStateChanged(User =>{
            if (User){
                db.collection("Vitaminders")
                .doc(User.uid).get()
                .then(doc => {
    
                        const auth = doc.data().Gebruikersnaam
    
                        db.collectionGroup("WorkshopsForCoaches")
                        .where("Gebruikersnaam", "==", auth)
                        .where("Workshop", "==", titel)
                        .get().then(querySnapshot => {
                            querySnapshot.forEach(doc1 => {
        
                            db.collection("Vitaminders")
                            .doc(doc.id)
                            .collection("WorkshopsForCoaches")
                            .doc(doc1.id).update({
                                StepOneInput: stepOneCTA,
                                StepTwoInput: stepTwoCTA,
                                StepThreeInput: stepThreeCTA,
                                StepFourInput: stepFourCTA,
                                StepFiveInput: stepFiveCTA,
                                StepSixInput: stepSixCTA,
                                StepSevenInput: stepSevenCTA,
                                StepEightInput: stepEightCTA,
                                StepNineInput: stepNineCTA,
                                ClosingInput: closingInput
                            });
                        });
                    });
                });
            };
        });
    });
};

function saveAndCloseWorkshop(titel){

    const button = document.getElementsByClassName("close-workshop")
    const loaderModal = document.getElementById("load-modal")

    const buttonArray = Array.from(button)

    auth.onAuthStateChanged(User =>{
        if (User){
            db.collection("Vitaminders")
            .doc(User.uid).get()
            .then(doc => {

                    const auth = doc.data().Gebruikersnaam

                    buttonArray.forEach(btn => {

                        btn.addEventListener("click", () => {
                        updateSaveWorkshop(titel)
                        
                        loaderModal.style.display = "flex"

                        setTimeout(() => { 
                            window.open("../Vitaminders/" + auth + ".html", "_self");
                         }, 3000);
                    });
                });
            });
        };
    });
};

!function workshopQuery(){

    const workshopDomainInStartNewRoute = document.getElementById("workshop-goal-title")
    const list = document.createElement("ul")
        list.setAttribute("id", "step-overview-list")

    db.collection("WorkshopsForCoaches")
    .where("WorkshopTitle", "==", titel)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const workshopDomain = doc.data().Goal             
            const title = doc.data().WorkshopTitle
            const coach = doc.data().Coach
            const headerImg = doc.data().BannerImage
            const workshopGoals = doc.data().WorkshopGoals
            const stepOneTitle = doc.data().StepOneTitle
            const stepTwoTitle = doc.data().StepTwoTitle
            const stepThreeTitle = doc.data().StepThreeTitle
            const stepFourTitle = doc.data().StepFourTitle
            const stepFiveTitle = doc.data().StepFiveTitle
            const stepSixTitle = doc.data().StepSixTitle
            const stepSevenTitle = doc.data().StepSevenTitle
            const stepEightTitle = doc.data().StepEightTitle
            const stepNineTitle = doc.data().StepNineTitle
            const stepOneExplainer = doc.data().StepOneExplainer
            const stepTwoExplainer = doc.data().StepTwoExplainer
            const stepThreeExplainer = doc.data().StepThreeExplainer
            const stepFourExplainer = doc.data().StepFourExplainer
            const stepFiveExplainer = doc.data().StepFiveExplainer
            const stepSixExplainer = doc.data().StepSixExplainer
            const stepSevenExplainer = doc.data().StepSevenExplainer
            const stepEightExplainer = doc.data().StepEightExplainer
            const stepNineExplainer = doc.data().StepNineExplainer
            const closingOneText = doc.data().ClosingOneText 
            const closingOneTitle = doc.data().ClosingOneTitle
            const closingTwoText = doc.data().ClosingTwoText 
            const closingTwoTitle = doc.data().ClosingTwoTitle
            const closingThreeText = doc.data().ClosingThreeText 
            const closingThreeTitle = doc.data().ClosingThreeTitle
            const closingFourText = doc.data().ClosingFourText 
            const closingFourTitle = doc.data().ClosingFourTitle
            const closingFiveText = doc.data().ClosingFiveText 
            const closingFiveTitle = doc.data().ClosingFiveTitle
            const closingSixText = doc.data().ClosingSixText 
            const closingSixTitle = doc.data().ClosingSixTitle
            const closingSevenText = doc.data().ClosingSevenText 
            const closingSevenTitle = doc.data().ClosingSevenTitle
            const closingEightText = doc.data().ClosingEightText 
            const closingEightTitle = doc.data().ClosingEightTitle
            const closingNineText = doc.data().ClosingNineText 
            const closingNineTitle = doc.data().ClosingNineTitle

            const buttonOne = document.getElementById("start-workshop")
            const buttonTwo = document.getElementById("step-two-button")
            const buttonThree = document.getElementById("step-three-button")
            const buttonFour = document.getElementById("step-four-button")
            const buttonFive = document.getElementById("step-five-button")
            const buttonSix = document.getElementById("step-six-button")
            const buttonSeven = document.getElementById("step-seven-button")
            const buttonEight = document.getElementById("step-eight-button")
            const buttonNine = document.getElementById("step-nine-button")

            const stepOneDiv = document.getElementById("step-one-div")
            const stepTwoDiv = document.getElementById("step-two-div")
            const stepThreeDiv = document.getElementById("step-three-div")
            const stepFourDiv = document.getElementById("step-four-div")
            const stepFiveDiv = document.getElementById("step-five-div")
            const stepSixDiv = document.getElementById("step-six-div")
            const stepSevenDiv = document.getElementById("step-seven-div")
            const stepEightDiv = document.getElementById("step-eight-div")
            const stepNineDiv = document.getElementById("step-nine-div")

            const stepOneTitleDOM = document.getElementById("step-one-title")
            const stepTwoTitleDOM = document.getElementById("step-two-title")
            const stepThreeTitleDOM = document.getElementById("step-three-title")
            const stepFourTitleDOM = document.getElementById("step-four-title")
            const stepFiveTitleDOM = document.getElementById("step-five-title")
            const stepSixTitleDOM = document.getElementById("step-six-title")
            const stepSevenTitleDOM = document.getElementById("step-seven-title")
            const stepEightTitleDOM = document.getElementById("step-eight-title")
            const stepNineTitleDOM = document.getElementById("step-nine-title")

            const stepOneExplainerDOM = document.getElementById("step-one-explainer")
            const stepTwoExplainerDOM = document.getElementById("step-two-explainer")
            const stepThreeExplainerDOM = document.getElementById("step-three-explainer")
            const stepFourExplainerDOM = document.getElementById("step-four-explainer")
            const stepFiveExplainerDOM = document.getElementById("step-five-explainer")
            const stepSixExplainerDOM = document.getElementById("step-six-explainer")
            const stepSevenExplainerDOM = document.getElementById("step-seven-explainer")
            const stepEightExplainerDOM = document.getElementById("step-eight-explainer")
            const stepNineExplainerDOM = document.getElementById("step-nine-explainer")

            const closingOne = document.getElementById("closing-one")
            const closingTwo = document.getElementById("closing-two")
            const closingThree = document.getElementById("closing-three")
            const closingFour = document.getElementById("closing-four")
            const closingFive = document.getElementById("closing-five")
            const closingSix = document.getElementById("closing-six")
            const closingSeven = document.getElementById("closing-seven")
            const closingEight = document.getElementById("closing-eight")
            const closingNine = document.getElementById("closing-nine")

            const closingOneTitleDOM = document.getElementById("closing-title-one")
            const closingTwoTitleDOM = document.getElementById("closing-title-two")
            const closingThreeTitleDOM = document.getElementById("closing-title-three")
            const closingFourTitleDOM = document.getElementById("closing-title-four")
            const closingFiveTitleDOM = document.getElementById("closing-title-five")
            const closingSixTitleDOM = document.getElementById("closing-title-six")
            const closingSevenTitleDOM = document.getElementById("closing-title-seven")
            const closingEightTitleDOM = document.getElementById("closing-title-eight")
            const closingNineTitleDOM = document.getElementById("closing-title-nine")

            const closingTextOneDOM = document.getElementById("closing-text-one")
            const closingTextTwoDOM = document.getElementById("closing-text-two")
            const closingTextThreeDOM = document.getElementById("closing-text-three")
            const closingTextFourDOM = document.getElementById("closing-text-four")
            const closingTextFiveDOM = document.getElementById("closing-text-five")
            const closingTextSixDOM = document.getElementById("closing-text-six")
            const closingTextSevenDOM = document.getElementById("closing-text-seven")
            const closingTextEightDOM = document.getElementById("closing-text-eight")
            const closingTextNineDOM = document.getElementById("closing-text-nine")

            workshopDomainInStartNewRoute.innerText = workshopDomain

            loadSummary(workshopGoals)
            authRoutes(workshopDomain)
            appendRoutesOfAUthToRouteSelect(workshopDomain)
            welcomeMessage()
            setProfilePicOfCoach(coach)
            setWorkshopTitle(title)
            setHeaderImage(headerImg)
            addWorkshopDataToEditWorkshopButton(title, coach)
            stepOverview(stepOneTitle, list)
            stepOverview(stepTwoTitle, list)
            stepOverview(stepThreeTitle, list)
            stepOverview(stepFourTitle, list)
            stepOverview(stepFiveTitle, list)
            stepOverview(stepSixTitle, list)
            stepOverview(stepSevenTitle, list)
            stepOverview(stepEightTitle, list)
            stepOverview(stepNineTitle, list)
            displayNextStap(buttonOne, stepOneTitle, stepOneDiv, closingOne)
            displayNextStap(buttonTwo, stepTwoTitle, stepTwoDiv, closingOne)
            displayNextStap(buttonThree, stepThreeTitle, stepThreeDiv, closingTwo)
            displayNextStap(buttonFour, stepFourTitle, stepFourDiv, closingThree)
            displayNextStap(buttonFive, stepFiveTitle, stepFiveDiv, closingFour)
            displayNextStap(buttonSix, stepSixTitle, stepSixDiv, closingFive)
            displayNextStap(buttonSeven, stepSevenTitle, stepSevenDiv, closingSix)
            displayNextStap(buttonEight, stepEightTitle, stepEightDiv, closingSeven)
            displayNextStap(buttonNine, stepNineTitle, stepNineDiv, closingEight)
            stepTitle(stepOneTitleDOM, stepOneTitle)
            stepTitle(stepTwoTitleDOM, stepTwoTitle)
            stepTitle(stepThreeTitleDOM, stepThreeTitle)
            stepTitle(stepFourTitleDOM, stepFourTitle)
            stepTitle(stepFiveTitleDOM, stepFiveTitle)
            stepTitle(stepSixTitleDOM, stepSixTitle)
            stepTitle(stepSevenTitleDOM, stepSevenTitle)
            stepTitle(stepEightTitleDOM, stepEightTitle)
            stepTitle(stepNineTitleDOM, stepNineTitle)
            stepExplainer(stepOneExplainerDOM,stepOneExplainer)
            stepExplainer(stepTwoExplainerDOM,stepTwoExplainer)
            stepExplainer(stepThreeExplainerDOM,stepThreeExplainer)
            stepExplainer(stepFourExplainerDOM,stepFourExplainer)
            stepExplainer(stepFiveExplainerDOM,stepFiveExplainer)
            stepExplainer(stepSixExplainerDOM,stepSixExplainer)
            stepExplainer(stepSevenExplainerDOM,stepSevenExplainer)
            stepExplainer(stepEightExplainerDOM,stepEightExplainer)
            stepExplainer(stepNineExplainerDOM,stepNineExplainer)
            closingTitle(closingOneTitleDOM, closingOneTitle)
            closingTitle(closingTwoTitleDOM, closingTwoTitle)
            closingTitle(closingThreeTitleDOM, closingThreeTitle)
            closingTitle(closingFourTitleDOM, closingFourTitle)
            closingTitle(closingFiveTitleDOM, closingFiveTitle)
            closingTitle(closingSixTitleDOM, closingSixTitle)
            closingTitle(closingSevenTitleDOM, closingSevenTitle)
            closingTitle(closingEightTitleDOM, closingEightTitle)
            closingTitle(closingNineTitleDOM, closingNineTitle)
            closingText(closingTextTwoDOM, closingTwoText)
            closingText(closingTextThreeDOM, closingThreeText)
            closingText(closingTextFourDOM, closingFourText)
            closingText(closingTextFiveDOM, closingFiveText)
            closingText(closingTextSixDOM, closingSixText)
            closingText(closingTextSevenDOM, closingSevenText)
            closingText(closingTextEightDOM, closingEightText)
            closingText(closingTextNineDOM, closingNineText)
            updateSaveWorkshop(title)
            saveAndCloseWorkshop(title)

        });
    });
}();

function loadAlreadySavedSteps(stepInput, stepButton, stepCTA){

    if(stepInput != ""){
        stepButton.addEventListener("click", () => {
            stepCTA.value = stepInput
        });
    };
};

!function fillWorkshopWithAuthData(){

    auth.onAuthStateChanged(User =>{
        if (User){
            db.collection("Vitaminders")
            .doc(User.uid).get()
            .then(doc => {

                const auth = doc.data().Gebruikersnaam

                db.collectionGroup("WorkshopsForCoaches")
                .where("Gebruikersnaam", "==", auth)
                .where("Workshop", "==", titel)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const stepOneInputAuth = doc1.data().StepOneInput
                        const stepTwoInputAuth = doc1.data().StepTwoInput
                        const stepThreeInputAuth = doc1.data().StepThreeInput
                        const stepFourInputAuth = doc1.data().StepFourInput
                        const stepFiveInputAuth = doc1.data().StepFiveInput
                        const stepSixInputAuth = doc1.data().StepSixInput
                        const stepSevenInputAuth = doc1.data().StepSevenInput
                        const stepEightInputAuth = doc1.data().StepEightInput
                        const stepNineInputAuth = doc1.data().StepNineInput
                        const closingInputAuth = doc1.data().ClosingInput

                        const stepOneCTA = document.getElementById("step-one-CTA")
                        const stepTwoCTA = document.getElementById("step-two-CTA")
                        const stepThreeCTA = document.getElementById("step-three-CTA")
                        const stepFourCTA = document.getElementById("step-four-CTA")
                        const stepFiveCTA = document.getElementById("step-five-CTA")
                        const stepSixCTA = document.getElementById("step-six-CTA")
                        const stepSevenCTA = document.getElementById("step-seven-CTA")
                        const stepEightCTA = document.getElementById("step-eight-CTA")
                        const stepNineCTA = document.getElementById("step-nine-CTA")

                        const closingOne = document.getElementById("feedback-one")
                        const closingTwo = document.getElementById("feedback-two")
                        const closingThree = document.getElementById("feedback-three")
                        const closingFour = document.getElementById("feedback-four")
                        const closingFive = document.getElementById("feedback-five")
                        const closingSix = document.getElementById("feedback-six")
                        const closingSeven = document.getElementById("feedback-seven")
                        const closingEight = document.getElementById("feedback-eight")
                        const closingNine = document.getElementById("feedback-nine")

                        const stepOneButton = document.getElementById("start-workshop")
                        const stepTwoButton = document.getElementById("step-two-button")
                        const stepThreeButton = document.getElementById("step-three-button")
                        const stepFourButton = document.getElementById("step-four-button")
                        const stepFiveButton = document.getElementById("step-five-button")
                        const stepSixButton = document.getElementById("step-six-button")
                        const stepSevenButton = document.getElementById("step-seven-button")
                        const stepEightButton = document.getElementById("step-eight-button")
                        const stepNineButton = document.getElementById("step-nine-button")

                        loadAlreadySavedSteps(stepOneInputAuth, stepOneButton, stepOneCTA)
                        loadAlreadySavedSteps(stepTwoInputAuth, stepTwoButton, stepTwoCTA)
                        loadAlreadySavedSteps(stepThreeInputAuth, stepThreeButton, stepThreeCTA)
                        loadAlreadySavedSteps(stepFourInputAuth, stepFourButton, stepFourCTA)
                        loadAlreadySavedSteps(stepFiveInputAuth, stepFiveButton, stepFiveCTA)
                        loadAlreadySavedSteps(stepSixInputAuth, stepSixButton, stepSixCTA)
                        loadAlreadySavedSteps(stepSevenInputAuth, stepSevenButton, stepSevenCTA)
                        loadAlreadySavedSteps(stepEightInputAuth, stepEightButton, stepEightCTA)
                        loadAlreadySavedSteps(stepNineInputAuth, stepNineButton, stepNineCTA)

                    });
                });
            });
        };
    });
}();

