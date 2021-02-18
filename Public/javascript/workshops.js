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

db.collection("Workshops").where("WorkshopTitle", "==", titel)
.get().then(querySnapshot => {
querySnapshot.forEach(doc => {

    const workshopTitle = doc.data().WorkshopTitle
    const summary = doc.data().WorkshopGoals
    const bannerImage = doc.data().BannerImage
    
    workshopMetaTags(summary, workshopTitle, bannerImage)

    });
});

// WORKSHOP LANDING
const workshopLandingPageOuterDiv = document.getElementById("workshop-landing-page")
const workshopLandingTitle = document.getElementById("workshop-landing-title")
const buttonWorkshopLanding = document.getElementById("button-workshop-landing")
// See stripe.js for workshopButtonLanding
const workshopDescription = document.getElementById("workshop-description")
const workshopFactsUl = document.getElementById("workshop-facts")
const agreementSection = document.getElementById("workshop-agreement")

db.collection("Workshops")
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

!function workshopQuery(){

    db.collection("Workshops").where("WorkshopTitle", "==", titel)
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

            workshopDescription.innerHTML = summary

        });
    });
}();



// TAKE A WORKSHOP

    //Edit workshop hidden for non-owner
!function editWorkshopHiddenForNonOwner(){
    const editWorkshopDiv = document.getElementById("edit-workshop-div")

    auth.onAuthStateChanged(User =>{
        if(User){

            db.collection("Vitaminders").doc(User.uid).get()
            .then(doc => {

                const auth = doc.data().Gebruikersnaam
                const admin = doc.data().Admin

                if (admin === "Yes"){
                    editWorkshopDiv.style.display = "flex"
                }

                db.collection("Workshops").where("WorkshopTitle", "==", titel).where("Coach", "==", auth)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        editWorkshopDiv.style.display = "flex"

                    });
                });
            });
        };
    });
}();

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
                .doc(doc.id).collection("Levensvragen")
                .where("Domain", "==", workshopDomain)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const routes = doc1.data().LevensvraagClean

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
                .doc(doc.id).collection("Levensvragen")
                .where("Domain", "==", workshopDomain)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const routes = doc1.data().LevensvraagClean

                        const routeSelect = document.getElementById("routeSelectAuth")

                        const option = document.createElement("option")

                        option.innerHTML = `<b>${routes}</b>`

                        routeSelect.appendChild(option)

                        console.log(routeSelect)

                    });
                });
            });
        };
    });
};

function authHasNoRouteNotice(authHasNoRouteDiv, workshopDomain, nameClean){
    authHasNoRouteDiv.innerHTML = `
                Het thema van deze workshop is <b>${workshopDomain}</b>.  <br> <br>
                Ik zie dat je nog geen ontwikkeltraject hebt gestart met dit thema.  <br> 
                Maak eerst even een ontwikkelstraject met het thema ${workshopDomain}.  <br> 
                Dan kun je alles wat je bij deze workshop leert in je onwikkelomgeving opslaan. <br>  <br> 
                <button class="button-algemeen button-workshop onclick="startRoute()">Ontwikkeltraject maken</button>`
};

function authHasOneRouteNotice(authHasOneRouteDiv, workshopDomain, nameClean, routeOfAuth){
    authHasOneRouteDiv.innerHTML = `
                Het thema van deze workshop is <b>${workshopDomain}</b>. <br><br>
                Ik zie dat je een ontwikkeltraject hebt met dit thema: <br>
                <select id="routeSelectAuth"></select> <br>
                Wil je deze workshop aan dat ontwikkeltraject koppelen?<br><br>
                Alles dat je over jezelf leert tijdens deze workshop wordt dan onder dat traject opgeslagen in je ontwikkelomgeving.<br><br>
                <div class="goal-auth-buttons">
                <button class="button-algemeen button-workshop" onclick="linkRouteAndWorkshop()">Ontwikkeltraject koppelen</button>
                </div>
                <div class="goal-auth-buttons">
                <button class="button-algemeen button-workshop" onclick="startRoute()">Nieuw ontwikkeltraject starten</button>
                </div>`     
};

function authHasMultipleRouteNotice(authHasOneRouteDiv, workshopDomain, nameClean){
    authHasOneRouteDiv.innerHTML = `
                Het thema van deze workshop is <b>${workshopDomain}</b>. <br><br>
                Ik zie dat je meerdere ontwikkeltrajecten hebt met dit thema: <br>
                <select id="routeSelectAuth"></select> <br>
                Wil je deze workshop aan een van deze ontwikkeltrajecten koppelen? <br>
                Selecteer dat hierboven een van je ontwikkeltrajecten.<br><br>
                Alles dat je over jezelf leert tijdens deze workshop wordt dan onder dat traject opgeslagen in je ontwikkelomgeving.<br><br>
                <div class="goal-auth-buttons">
                <button class="button-algemeen button-workshop" onclick="linkRouteAndWorkshop()">Ontwikkeltraject koppelen</button>
                </div>
                <div class="goal-auth-buttons">
                <button class="button-algemeen button-workshop" onclick="startRoute()">Nieuw ontwikkeltraject starten</button>
                </div>`
}

function linkRouteAndWorkshop(){

    let workshopDomain = ""

    const routeSelect = document.getElementById("routeSelectAuth")

    const option = routeSelect.options
    const selected = option[option.selectedIndex].innerHTML

    db.collection("Workshops")
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
                .doc(doc.id).collection("Levensvragen").doc()
                .set({
                    Eigenaar: "Vitaminds",
                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                    Gebruikersnaam: auth,
                    Domain: workshopGoal,
                    Levenslessen: [],
                    ID: idClean,
                    Levensvraag: idClean + goalTitle,
                    LevensvraagClean: goalTitle,
                    Omschrijving: goalDescription,
                    Openbaar: "private"
                })
                .then(() => {
                    saveSet(workshopGoal, goalTitle)
                });
            });
        };
    });
};

function checkIfAuthHasSaveSet(docID){

    const checkGoalOuterDiv = document.getElementById("workshop-goal-check")
    const workshopOuterDiv = document.getElementById("workshop-inner-div")

    db.collection("Vitaminders").doc(docID)
    .collection("Workshops")
    .where("Workshops", "==", titel)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            checkGoalOuterDiv.style.display = "none"
            workshopOuterDiv.style.display = "flex"

        });
    });
};

!function workshopsQuery(){

    const workshopDomainInStartNewRoute = document.getElementById("workshop-goal-title")

    auth.onAuthStateChanged(User =>{
        if(User){
            db.collection("Vitaminders").doc(User.uid).get()
            .then(doc => {

                const auth = doc.data().Gebruikersnaam

                db.collection("Workshops")
                .where("WorkshopTitle", "==", titel)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {

                        const workshopDomain = doc.data().Goal

                        authRoutes(workshopDomain)

                        workshopDomainInStartNewRoute.innerText = workshopDomain

                        appendRoutesOfAUthToRouteSelect(workshopDomain)

                    });
                });
            });
        };
    });
}();

function startRoute(){

    const startNewRouteDiv = document.getElementById("set-new-goal-div")

    startNewRouteDiv.style.display = "flex"
}
    
function saveSet(goalWorkshop, goalAuth){

    auth.onAuthStateChanged(User =>{
        if(User){

            db.collection("Vitaminders").doc(User.uid).get()
            .then(doc => {

                const auth = doc.data().Gebruikersnaam

    db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc().set({
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



// All images responsive

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


// Load prefilled workshop data from database

// append step to DOM

function appendStepToDom(workshopDOM,stepOuterDiv, stepTitleH2, stepExplainerP, stepCTATitle, stepCTAP, stepInput){
    workshopDOM.appendChild(stepOuterDiv)
    stepOuterDiv.appendChild(stepTitleH2)
    stepOuterDiv.appendChild(stepExplainerP)
    stepOuterDiv.appendChild(stepCTATitle)
    stepOuterDiv.appendChild(stepCTAP)
    stepOuterDiv.appendChild(stepInput)
};

// toolbar counter
function toolbarCountInnerText(toolbarCount, count){
    toolbarCount.innerText = count
};

// Append toolbar
function appendToolbar(stepTitle, toolbarDiv, toolbarCheck, toolbarCount, toolBar){
    if(stepTitle != ""){
        toolBar.appendChild(toolbarDiv)
        toolbarDiv.appendChild(toolbarCheck)
        toolbarCheck.appendChild(toolbarCount)
        };
}; 

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

function openDigimindAfterCloseWorkshopButton(){

    closeWorkshopButton.addEventListener("click", () => {

    auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
    
                const auth = doc.data().Gebruikersnaam

                window.open(`../Vitaminders/${auth}`)
                });
            };
        });
    });
};

function welcomeMessage(){

    const coachWelcome = document.getElementById("coach-welcome")

    auth.onAuthStateChanged(User =>{
        if (User){
    
        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const auth = doc.data().GebruikersnaamClean

        coachWelcome.innerText = `Welkom bij mijn workshop, ${auth}`

            });
        };
    });
};

function setProfilePicOfCoach(coach){

    const coachPic = document.getElementById("coach-pic")

    db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
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

function setSummary(summary, workshopGoals){
    summary.innerHTML = workshopGoals
};

!function workshopQuery(){
    db.collection("Workshops")
    .where("WorkshopTitle", "==", titel)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const title = doc.data().WorkshopTitle
            const coach = doc.data().Coach
            const headerImg = doc.data().BannerImage

            welcomeMessage()
            setProfilePicOfCoach(coach)
            setWorkshopTitle(title)
            setHeaderImage(headerImg)

        });
    });
}();

