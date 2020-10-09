// URL title
const titelhtml = window.location.href.replace(/^.*[\\\/]/, '')
const titel1 = titelhtml.replace('.html', '')
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

// Warning when leaving page

window.onbeforeunload = function(){
    return 'Weet je zeker dat je alles hebt opgeslagen?';
  };

// WORKSHOP LANDING

const workshopLandingPageOuterDiv = document.getElementById("workshop-landing-page")
const workshopLandingTitle = document.getElementById("workshop-landing-title")
const buttonWorkshopLanding = document.getElementById("button-workshop-landing")
const workshopDescription = document.getElementById("workshop-description")
const workshopFactsUl = document.getElementById("workshop-facts")
const agreementSection = document.getElementById("workshop-agreement")

function workshopLandingH1(workshopName){

    if(workshopLandingTitle != null){

            workshopLandingTitle.innerText = workshopName

    };
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

function arrayOfWorkshopTakers(buttonLanding){
    if(buttonLanding != null){
    buttonLanding.addEventListener("click", () => {
           // Add auth to list of members

           auth.onAuthStateChanged(User =>{
            if(User){
              const userRef = db.collection("Vitaminders").doc(User.uid);
              userRef.get().then(function(doc) {
        
                    const auth = doc.data().Gebruikersnaam

        db.collection("Workshops").where("WorkshopTitle", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                // Store members in database
        
                db.collection("Workshops").doc(doc1.id).update({
                    Takers: firebase.firestore.FieldValue.arrayUnion(auth)
                }).then(() => {
                        agreementSection.style.display = "flex"
                        workshopLandingPageOuterDiv.style.display = "none"
                            });
                        });
                    });
                });
            } else {

                const buttonDiv = document.getElementById("button-div-landing")

                const notice = document.createElement("p")
                notice.setAttribute("class", "notice-group-visitor")

            notice.innerHTML = "Maak een <u>Digimind</u> aan om lid te worden van een groep"
            notice.addEventListener("click", () => {
                window.open("../Register.html", "_self")
            })

            buttonDiv.appendChild(notice)
            buttonDiv.removeChild(buttonLanding)

                };
            });
        });
    };
};

function workshopFacts(priceOfWorkshop){

    const workshopPrice = document.createElement("li")

    workshopPrice.innerText = `Prijs: €${priceOfWorkshop}`

    workshopFactsUl.appendChild(workshopPrice)
};

function workshopAgreementTitle(){

    const agreementTitle = document.getElementById("workshop-member-agreement-title")

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().GebruikersnaamClean
    
            agreementTitle.innerText = `Welkom bij mijn workshop, ${auth}`
    
            });
        };
    });
};

function agreementButton(){
    const agreementButtonDOM = document.getElementById("visitWorkshop")

    agreementButtonDOM.addEventListener("click", () => {

        agreementSection.style.display = "none"
    });
};

function workshopAgreementQuestion(coachName){
    const questionsSection = document.getElementById("questions-workshop-agreement")

    db.collection("Vitaminders").where("Gebruikersnaam", "==", coachName)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    const nameClean = doc.data().GebruikersnaamClean
                    const profilePic = doc.data().Profielfoto
                    const name = doc.data().Gebruikersnaam

                    const authImg = document.createElement("img")
                        authImg.setAttribute("class", "group-auth-img")
                    const authName = document.createElement("p")
            
            authImg.src = profilePic
            authName.innerText = nameClean

            questionsSection.appendChild(authImg)
            questionsSection.appendChild(authName)

            questionsSection.addEventListener("click", () => {
                window.open("../Vitaminders/" + name + ".html", "_self");
            });
        });
    });
};

function hideLandingIfAuthIsArrayMember(array){
    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam

            console.log(array)
            console.log(auth)

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
            const price = doc.data().Price
            const takersArray = doc.data().Takers

            workshopLandingH1(workshopTitle)
            groupLandingCreatorInformation(creator)
            arrayOfWorkshopTakers(buttonWorkshopLanding)
            workshopFacts(price)
            workshopAgreementTitle()
            workshopAgreementQuestion(creator)
            agreementButton()
            hideLandingIfAuthIsArrayMember(takersArray)

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
    

   // Save set
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
                });
            });
        };
    });
};

// Append workshopgoal to auth goal or make a new goal

const levensvraagArray = []

function hideGoalDivAfterChoose(){
    const goalDiv = document.getElementById("workshop-goal-check")

    goalDiv.style.display = "none"
};

function appendGoal(){

    auth.onAuthStateChanged(User =>{
        if(User){
          db.collection("Vitaminders").doc(User.uid).get().then(function(doc) {
              const auth = doc.data().Gebruikersnaam;
                const authGoal = doc.data().Goals

                db.collection("Workshops").where("WorkshopTitle", "==", titel).get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {
    
                        const workshopGoal = doc1.data().Goal

                        if(authGoal.includes(workshopGoal)){

                                authGoal.forEach(goal => {

                                    if(goal == workshopGoal){

                                    db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", auth)
                                    .where("Goal", "==", goal).get().then(querySnapshot => {
                                        querySnapshot.forEach(doc2 => {

                                            const levensvraag = doc2.data().Levensvraag

                                            // If more than one
                                            levensvraagArray.push(levensvraag)

                                        });
                                    }).then(()=>{

                                        hideGoalDivAfterChoose()

                                        saveSet(workshopGoal, goal) 
                                });
                            };
                        });
                    };
                });
            });
          });
        };
    });

    const workshopDiv = document.getElementById("workshop-inner-div")
    workshopDiv.style.display = "block"
}

function newGoal(){

    const workshopGoalNewGoalDiv = document.getElementById("set-new-goal-div")

    workshopGoalNewGoalDiv.style.display = "flex"

    const workshopGoalTitlePreFill = document.getElementById("workshop-goal-title")

    db.collection("Workshops").where("WorkshopTitle", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

            const workshopGoal = doc1.data().Goal

            workshopGoalTitlePreFill.innerHTML = `<i>${workshopGoal}</i>`
        });
    });
};

function createGoalAndStartWorkshop(){

    const workshopGoalTitlePreFill = document.getElementById("workshop-goal-title")

    const personalGoalTitle = document.getElementById("personal-goal-title").value
    const goalSummary = document.getElementById("goal-summary").value

    auth.onAuthStateChanged(User =>{
        if(User){
          db.collection("Vitaminders").doc(User.uid).get().then(function(doc) {
              const auth = doc.data().Gebruikersnaam;
              const authGoal = doc.data().Goals

              db.collection("Workshops").where("WorkshopTitle", "==", titel).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const workshopGoal = doc1.data().Goal

                    workshopGoalTitlePreFill.innerHTML = `<i>${workshopGoal}</i>`

        db.collection('Vitaminders').doc(User.uid).collection("Levensvragen").doc().set({
            ID: idClean,
            Goal: workshopGoal,
            Levensvraag: idClean + personalGoalTitle,
            LevensvraagClean: personalGoalTitle,
            Levenslessen: [],
            Gebruikersnaam: auth,
            Eigenaar: "Vitaminds",
            Omschrijving: goalSummary,
            Openbaar: "Nee",
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),

                        }).then(() => {
                        db.collection('Vitaminders').doc(User.uid).update({
                                Goals: firebase.firestore.FieldValue.arrayUnion(workshopGoal)
                            });
                            
                        hideGoalDivAfterChoose()

                        saveSet(workshopGoal, personalGoalTitle)
                        });
                    });
                });                 
            });
        };
    })

    const workshopDiv = document.getElementById("workshop-inner-div")
    workshopDiv.style.display = "block"
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

function appendWorkshopGoalorNewGoal(goal){
    auth.onAuthStateChanged(User =>{
        if(User){
          db.collection("Vitaminders").doc(User.uid).get().then(function(doc) {
              const auth = doc.data().Gebruikersnaam;
              const authClean = doc.data().GebruikersnaamClean
                const authGoal = doc.data().Goals

                const workshopGoalDOM = document.getElementById("workshop-goal-check-inner-div")

                if(authGoal == undefined){
                    const workshopMessage = `<p>Het doel van deze workshop is <i>${goal}</i>.<br> 
                Ik zie dat <i>${goal}</i> nog geen doel van je is.<br> 
                Maak het eerst het doel <i>${goal}</i> aan. Dan beginnen we direct daarna met de workshop. </p><br>
                <button onclick="newGoal()" id="new-goal">Nieuw doel aanmaken</button>`

                workshopGoalDOM.innerHTML = workshopMessage
                }

                if(authGoal.includes(goal)){

                        let authgoalThatsTheSameAsWorkshopGoal = ""

                        authGoal.forEach(goalAuth => {

                            if(goal === goalAuth){
                                authgoalThatsTheSameAsWorkshopGoal = goalAuth
                            };
                        });
               
                    const workshopMessage = `<p>Het doel van deze workshop is <i>${goal}</i>.<br> 
                    Ik zie dat jij een doel hebt met de naam: <i> ${authgoalThatsTheSameAsWorkshopGoal}</i>.<br> 
                    Wil je deze workshop aan dat doel koppelen?</p><br>
                    <button onclick="appendGoal()" id="append-goal">Koppelen</button><button onclick="newGoal()" id="new-goal">Nieuw doel aanmaken</button>`

                    workshopGoalDOM.innerHTML = workshopMessage
                    }
                    else {
                            const workshopMessage = `<p>Het doel van deze workshop is <i>${goal}</i>.<br> 
                    Ik zie dat <i>${goal}</i> nog geen doel van je is.<br> 
                    Maak het eerst het doel <i>${goal}</i> aan. Dan beginnen we daarna direct met de workshop. </p><br>
                    <button onclick="newGoal()" id="new-goal">Nieuw doel aanmaken</button>`

                    workshopGoalDOM.innerHTML = workshopMessage
                        }

                    if(authGoal == undefined){
                        const workshopMessage = `<p>Het doel van deze workshop is <i>${goal}</i>.<br> 
                    Ik zie dat jij <i>${goal}</i> nog geen doel van je is.<br> 
                    Maak het eerst het doel <i>${goal}</i> aan. Dan beginnen we daarna direct met de workshop. </p><br>
                    <button onclick="newGoal()" id="new-goal">Nieuw doel aanmaken</button>`

                    workshopGoalDOM.innerHTML = workshopMessage
                    }

                        const appendGoal = document.getElementById("append-goal")
                        const newGoal =document.getElementById("new-goal")
            });
        };
    });
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

// Append workshopgoal to authgoal question in DOM
db.collection("Workshops").where("WorkshopTitle", "==", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

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
        const stepOneIntroduction = doc.data().StepOnePreview
        const stepTwoIntroduction = doc.data().StepTwoPreview
        const stepThreeIntroduction = doc.data().StepThreePreview
        const stepFourIntroduction = doc.data().StepFourPreview
        const stepFiveIntroduction = doc.data().StepFivePreview
        const stepSixIntroduction = doc.data().StepSixPreview
        const stepSevenIntroduction = doc.data().StepSevenPreview
        const stepEightIntroduction = doc.data().StepEightPreview
        const stepNineIntroduction = doc.data().StepNinePreview
        const stepOneExplainer = doc.data().StepOneExplainer
        const stepTwoExplainer = doc.data().StepTwoExplainer
        const stepThreeExplainer = doc.data().StepThreeExplainer
        const stepFourExplainer = doc.data().StepFourExplainer
        const stepFiveExplainer = doc.data().StepFiveExplainer
        const stepSixExplainer = doc.data().StepSixExplainer
        const stepSevenExplainer = doc.data().StepSevenExplainer
        const stepEightExplainer = doc.data().StepEightExplainer
        const stepNineExplainer = doc.data().StepNineExplainer
        const stepOneCTA = doc.data().StepOneCTA
        const stepTwoCTA = doc.data().StepTwoCTA
        const stepThreeCTA = doc.data().StepThreeCTA
        const stepFourCTA = doc.data().StepFourCTA
        const stepFiveCTA = doc.data().StepFiveCTA
        const stepSixCTA = doc.data().StepSixCTA
        const stepSevenCTA = doc.data().StepSevenCTA
        const stepEightCTA = doc.data().StepEightCTA
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
        const workshopGoal = doc.data().Goal

        const DOM = document.getElementById("workshop-inner-div")

        // Add workshop data to edit workshop button
        addWorkshopDataToEditWorkshopButton(title, coach)

        // Wokshop goal auth check
        appendWorkshopGoalorNewGoal(workshopGoal)

        db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const nameClean = doc1.data().GebruikersnaamClean
                const profilePic = doc1.data().Profielfoto

                const workshopTitle = document.getElementById("workshop-title")
                const worksopHeaderImg = document.getElementById("workshop-header-image")
                const img = document.createElement("img")
                    img.setAttribute("id", "workshop-image")
                const coachWelcome = document.getElementById("coach-welcome")
                const coachPic = document.getElementById("coach-pic")
                const summary = document.getElementById("workshop-summary")
                const stepsOverviewWorkshop = document.getElementById("steps-overview")
                const stepOnePreviewDiv = document.createElement("div")
                    stepOnePreviewDiv.setAttribute("class", "step-preview-inner-div")
                const stepOneTitleP = document.createElement("p")
                const stepOneCheck = document.createElement("div")
                    stepOneCheck.setAttribute("class", "step-check-div")
                const stepTwoPreviewDiv = document.createElement("div")
                    stepTwoPreviewDiv.setAttribute("class", "step-preview-inner-div")
                const stepTwoTitleP = document.createElement("p")
                const stepTwoCheck = document.createElement("div")
                    stepTwoCheck.setAttribute("class", "step-check-div")
                const stepThreePreviewDiv = document.createElement("div")
                    stepThreePreviewDiv.setAttribute("class", "step-preview-inner-div")
                const stepThreeTitleP = document.createElement("p")
                const stepThreeCheck = document.createElement("div")
                    stepThreeCheck.setAttribute("class", "step-check-div")
                const stepFourPreviewDiv = document.createElement("div")
                    stepFourPreviewDiv.setAttribute("class", "step-preview-inner-div")
                const stepFourTitleP = document.createElement("p")
                const stepFourCheck = document.createElement("div")
                    stepFourCheck.setAttribute("class", "step-check-div")
                const stepFivePreviewDiv = document.createElement("div")
                    stepFivePreviewDiv.setAttribute("class", "step-preview-inner-div")
                const stepFiveTitleP = document.createElement("p")
                const stepFiveCheck = document.createElement("div")
                    stepFiveCheck.setAttribute("class", "step-check-div")
                const stepSixPreviewDiv = document.createElement("div")
                    stepSixPreviewDiv.setAttribute("class", "step-preview-inner-div")
                const stepSixTitleP = document.createElement("p")
                const stepSixCheck = document.createElement("div")
                    stepSixCheck.setAttribute("class", "step-check-div")
                const stepSevenPreviewDiv = document.createElement("div")
                    stepSevenPreviewDiv.setAttribute("class", "step-preview-inner-div")
                const stepSevenTitleP = document.createElement("p")
                const stepSevenCheck = document.createElement("div")
                    stepSevenCheck.setAttribute("class", "step-check-div")
                const stepEightPreviewDiv = document.createElement("div")
                    stepEightPreviewDiv.setAttribute("class", "step-preview-inner-div")
                const stepEightTitleP = document.createElement("p")
                const stepEightCheck = document.createElement("div")
                    stepEightCheck.setAttribute("class", "step-check-div")
                const stepNinePreviewDiv = document.createElement("div")
                    stepNinePreviewDiv.setAttribute("class", "step-preview-inner-div")
                const stepNineTitleP = document.createElement("p")
                const stepNineCheck = document.createElement("div")
                    stepNineCheck.setAttribute("class", "step-check-div")

                const stepOneIntroductionDiv = document.createElement("div")
                    stepOneIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepOneIntroductionTitle = document.createElement("h3")
                    stepOneIntroductionTitle.setAttribute("class", "stepIntroductionTitle")
                const stepOneIntroductionP = document.createElement("p")
                const stepOneIntroductionButton = document.createElement("button")
                    stepOneIntroductionButton.setAttribute("class", "button-algemeen")
                    stepOneIntroductionButton.setAttribute("id", "step-one-button")     

                auth.onAuthStateChanged(User =>{
                    if (User){
                
                    db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                const auth = doc.data().GebruikersnaamClean

                    coachWelcome.innerText = `Welkom bij mijn workshop, ${auth}`

                        });
                    } else {
                        coachWelcome.innerText = `Welkom bij mijn workshop, bezoeker`
                    }
                });

                workshopTitle.innerText = title
                img.src = headerImg
                coachPic.src = profilePic
                summary.innerHTML = workshopGoals

                worksopHeaderImg.appendChild(img)

                // Toolbar

                const toolbarOuterDiv = document.getElementById("tool-bar-div")

                const toolbarOneDiv = document.createElement("div")
                    toolbarOneDiv.setAttribute("class","toolbar-inner-div")
                const toolbarOneCount = document.createElement("p")
                    toolbarOneCount.setAttribute("class", "toolbar-count")
                const toolbarOneCheck = document.createElement("div")
                    toolbarOneCheck.setAttribute("id", "toolbar-check")
                const toolbarTwoDiv = document.createElement("div")
                    toolbarTwoDiv.setAttribute("class","toolbar-inner-div")
                const toolbarTwoCount = document.createElement("p")
                    toolbarTwoCount.setAttribute("class", "toolbar-count")
                const toolbarTwoCheck = document.createElement("div")
                    toolbarTwoCheck.setAttribute("id", "toolbar-check")
                const toolbarThreeDiv = document.createElement("div")
                    toolbarThreeDiv.setAttribute("class","toolbar-inner-div")
                const toolbarThreeCount = document.createElement("p")
                    toolbarThreeCount.setAttribute("class", "toolbar-count")
                const toolbarThreeCheck = document.createElement("div")
                    toolbarThreeCheck.setAttribute("id", "toolbar-check")
                const toolbarFourDiv = document.createElement("div")
                    toolbarFourDiv.setAttribute("class","toolbar-inner-div")
                const toolbarFourCount = document.createElement("p")
                    toolbarFourCount.setAttribute("class", "toolbar-count")
                const toolbarFourCheck = document.createElement("div")
                    toolbarFourCheck.setAttribute("id", "toolbar-check")
                const toolbarFiveDiv = document.createElement("div")
                    toolbarFiveDiv.setAttribute("class","toolbar-inner-div")
                const toolbarFiveCount = document.createElement("p")
                    toolbarFiveCount.setAttribute("class", "toolbar-count")
                const toolbarFiveCheck = document.createElement("div")
                    toolbarFiveCheck.setAttribute("id", "toolbar-check")
                const toolbarSixDiv = document.createElement("div")
                    toolbarSixDiv.setAttribute("class","toolbar-inner-div")
                const toolbarSixCount = document.createElement("p")
                    toolbarSixCount.setAttribute("class", "toolbar-count")
                const toolbarSixCheck = document.createElement("div")
                    toolbarSixCheck.setAttribute("id", "toolbar-check")
                const toolbarSevenDiv = document.createElement("div")
                    toolbarSevenDiv.setAttribute("class","toolbar-inner-div")
                const toolbarSevenCount = document.createElement("p")
                    toolbarSevenCount.setAttribute("class", "toolbar-count")
                const toolbarSevenCheck = document.createElement("div")
                    toolbarSevenCheck.setAttribute("id", "toolbar-check")
                const toolbarEightDiv = document.createElement("div")
                    toolbarEightDiv.setAttribute("class","toolbar-inner-div")
                const toolbarEightCount = document.createElement("p")
                    toolbarEightCount.setAttribute("class", "toolbar-count")
                const toolbarEightCheck = document.createElement("div")
                    toolbarEightCheck.setAttribute("id", "toolbar-check")
                const toolbarNineDiv = document.createElement("div")
                    toolbarNineDiv.setAttribute("class","toolbar-inner-div")
                const toolbarNineCount = document.createElement("p")
                    toolbarNineCount.setAttribute("class", "toolbar-count")
                const toolbarNineCheck = document.createElement("div")
                    toolbarNineCheck.setAttribute("id", "toolbar-check")
                const saveButtonDiv = document.createElement("div")
                const saveOneButton = document.createElement("button")
                    saveOneButton.setAttribute("id", "save-one-button")
                    saveOneButton.setAttribute("onclick", "saveOne()")
                const saveTwoButton = document.createElement("button")
                    saveTwoButton.setAttribute("id", "save-two-button")
                    saveTwoButton.setAttribute("onclick", "saveTwo()")
                const saveThreeButton = document.createElement("button")
                    saveThreeButton.setAttribute("id", "save-three-button")
                    saveThreeButton.setAttribute("onclick", "saveThree()")
                const saveFourButton = document.createElement("button")
                    saveFourButton.setAttribute("id", "save-two-button")
                    saveFourButton.setAttribute("onclick", "saveFour()")
                const saveFiveButton = document.createElement("button")
                    saveFiveButton.setAttribute("id", "save-five-button")
                    saveFiveButton.setAttribute("onclick", "saveFive()")
                const saveSixButton = document.createElement("button")
                    saveSixButton.setAttribute("id", "save-six-button")
                    saveSixButton.setAttribute("onclick", "saveSix()")
                const saveSevenButton = document.createElement("button")
                    saveSevenButton.setAttribute("id", "save-seven-button")
                    saveSevenButton.setAttribute("onclick", "saveSeven()")
                const saveEightButton = document.createElement("button")
                    saveEightButton.setAttribute("id", "save-eigth-button")
                    saveEightButton.setAttribute("onclick", "saveEight()")
                const saveNineButton = document.createElement("button")
                    saveNineButton.setAttribute("id", "save-nine-button")
                    saveNineButton.setAttribute("onclick", "saveNine()")
                const closingButton = document.createElement("button")
                    closingButton.setAttribute("id", "closing-button")

                    saveButtonDiv.appendChild(saveOneButton)
                    saveButtonDiv.appendChild(saveTwoButton)
                    saveButtonDiv.appendChild(saveThreeButton)
                    saveButtonDiv.appendChild(saveFourButton)
                    saveButtonDiv.appendChild(saveFiveButton)
                    saveButtonDiv.appendChild(saveSixButton)
                    saveButtonDiv.appendChild(saveSevenButton)
                    saveButtonDiv.appendChild(saveEightButton)
                    saveButtonDiv.appendChild(saveNineButton)
                    saveButtonDiv.appendChild(closingButton)

                    saveOneButton.innerText = "Opslaan"
                    saveTwoButton.innerText = "Opslaan"
                    saveThreeButton.innerText = "Opslaan"
                    saveFourButton.innerText = "Opslaan"
                    saveFiveButton.innerText = "Opslaan"
                    saveSixButton.innerText = "Opslaan"
                    saveSevenButton.innerText = "Opslaan"
                    saveEightButton.innerText = "Opslaan"
                    saveNineButton.innerText = "Opslaan"
                    closingButton.innerText = "Opslaan"

                    saveOneButton.style.display = "none"
                    saveTwoButton.style.display = "none"
                    saveThreeButton.style.display = "none"
                    saveFourButton.style.display = "none"
                    saveFiveButton.style.display = "none"
                    saveSixButton.style.display = "none"
                    saveSevenButton.style.display = "none"
                    saveEightButton.style.display = "none"
                    saveNineButton.style.display = "none"
                    closingButton.style.display = "none"

                    
                    toolbarCountInnerText(toolbarOneCount, "1")
                    toolbarCountInnerText(toolbarTwoCount, "2")
                    toolbarCountInnerText(toolbarThreeCount, "3")
                    toolbarCountInnerText(toolbarFourCount, "4")
                    toolbarCountInnerText(toolbarFiveCount, "5")
                    toolbarCountInnerText(toolbarSixCount, "6")
                    toolbarCountInnerText(toolbarSevenCount, "7")
                    toolbarCountInnerText(toolbarEightCount, "8")
                    toolbarCountInnerText(toolbarNineCount, "9")

               
                appendToolbar(stepOneTitle, toolbarOneDiv, toolbarOneCheck, toolbarOneCount, toolbarOuterDiv)
                appendToolbar(stepTwoTitle, toolbarTwoDiv, toolbarTwoCheck, toolbarTwoCount, toolbarOuterDiv)
                appendToolbar(stepThreeTitle, toolbarThreeDiv, toolbarThreeCheck, toolbarThreeCount, toolbarOuterDiv)
                appendToolbar(stepFourTitle, toolbarFourDiv, toolbarFourCheck, toolbarFourCount, toolbarOuterDiv)
                appendToolbar(stepFiveTitle, toolbarFiveDiv, toolbarFiveCheck, toolbarFiveCount, toolbarOuterDiv)
                appendToolbar(stepSixTitle, toolbarSixDiv, toolbarSixCheck, toolbarSixCount, toolbarOuterDiv)
                appendToolbar(stepSevenTitle, toolbarSevenDiv, toolbarSevenCheck, toolbarSevenCount, toolbarOuterDiv)
                appendToolbar(stepEightTitle, toolbarEightDiv, toolbarEightCheck, toolbarEightCount, toolbarOuterDiv)
                appendToolbar(stepNineTitle, toolbarNineDiv, toolbarNineCheck, toolbarNineCount, toolbarOuterDiv)

                //Save button
                toolbarOuterDiv.appendChild(saveButtonDiv)

                // Step introduction buttons
                const stepTwoIntroductionDiv = document.createElement("div")
                    stepTwoIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepTwoIntroductionTitle = document.createElement("h3")
                const stepTwoIntroductionP = document.createElement("p")
                const stepTwoIntroductionButton = document.createElement("button")
                    stepTwoIntroductionButton.setAttribute("class", "button-algemeen")
                    stepTwoIntroductionButton.setAttribute("id", "step-two-button")  
                const stepThreeIntroductionDiv = document.createElement("div")
                    stepThreeIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepThreeIntroductionTitle = document.createElement("h3")
                const stepThreeIntroductionP = document.createElement("p")
                const stepThreeIntroductionButton = document.createElement("button")
                    stepThreeIntroductionButton.setAttribute("class", "button-algemeen")
                    stepThreeIntroductionButton.setAttribute("id", "step-three-button")
                const stepFourIntroductionDiv = document.createElement("div")
                    stepFourIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepFourIntroductionTitle = document.createElement("h3")
                const stepFourIntroductionP = document.createElement("p")
                const stepFourIntroductionButton = document.createElement("button")
                    stepFourIntroductionButton.setAttribute("class", "button-algemeen")
                    stepFourIntroductionButton.setAttribute("id", "step-four-button")
                const stepFiveIntroductionDiv = document.createElement("div")
                    stepFiveIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepFiveIntroductionTitle = document.createElement("h3")
                const stepFiveIntroductionP = document.createElement("p")
                const stepFiveIntroductionButton = document.createElement("button")
                    stepFiveIntroductionButton.setAttribute("class", "button-algemeen")
                    stepFiveIntroductionButton.setAttribute("id", "step-five-button")
                const stepSixIntroductionDiv = document.createElement("div")
                    stepSixIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepSixIntroductionTitle = document.createElement("h3")
                const stepSixIntroductionP = document.createElement("p")
                const stepSixIntroductionButton = document.createElement("button")
                    stepSixIntroductionButton.setAttribute("class", "button-algemeen")
                    stepSixIntroductionButton.setAttribute("id", "step-six-button")
                const stepSevenIntroductionDiv = document.createElement("div")
                    stepSevenIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepSevenIntroductionTitle = document.createElement("h3")
                const stepSevenIntroductionP = document.createElement("p")
                const stepSevenIntroductionButton = document.createElement("button")
                    stepSevenIntroductionButton.setAttribute("class", "button-algemeen")
                    stepSevenIntroductionButton.setAttribute("id", "step-seven-button")
                const stepEightIntroductionDiv = document.createElement("div")
                    stepEightIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepEightIntroductionTitle = document.createElement("h3")
                const stepEightIntroductionP = document.createElement("p")
                const stepEightIntroductionButton = document.createElement("button")
                    stepEightIntroductionButton.setAttribute("class", "button-algemeen")
                    stepEightIntroductionButton.setAttribute("id", "step-eight-button")
                const stepNineIntroductionTitle = document.createElement("h3")
                const stepNineIntroductionP = document.createElement("p")
                const stepNineIntroductionButton = document.createElement("button")
                        stepNineIntroductionButton.setAttribute("class", "button-algemeen")
                        stepNineIntroductionButton.setAttribute("id", "step-nine-button")
                const closingIntroductionDiv = document.createElement("div")
                    closingIntroductionDiv.setAttribute("class", "step-introduction-div")
                const closingIntroductionTitle = document.createElement("h3")
                const closingIntroductionP = document.createElement("p")
                const closingIntroductionButton = document.createElement("button")
                    closingIntroductionButton.setAttribute("class", "button-algemeen")
                    closingIntroductionButton.setAttribute("id", "closing-button")  
                    
                // Closing div
                const closingDiv = document.createElement("div")
                    closingDiv.setAttribute("id", "closing-div")

                stepOverview(stepOneTitle, stepOneTitleP, `Stap 1: ${stepOneTitle}`, stepOnePreviewDiv, stepOneCheck, stepsOverviewWorkshop)
                stepOverview(stepTwoTitle, stepTwoTitleP, `Stap 2: ${stepTwoTitle}`, stepTwoPreviewDiv, stepTwoCheck, stepsOverviewWorkshop )
                stepOverview(stepThreeTitle, stepThreeTitleP, `Stap 3: ${stepThreeTitle}`, stepThreePreviewDiv, stepThreeCheck, stepsOverviewWorkshop )
                stepOverview(stepFourTitle, stepFourTitleP, `Stap 4: ${stepFourTitle}`, stepFourPreviewDiv, stepFourCheck, stepsOverviewWorkshop )
                stepOverview(stepFiveTitle, stepFiveTitleP, `Stap 5: ${stepFiveTitle}`, stepFivePreviewDiv, stepFiveCheck, stepsOverviewWorkshop )
                stepOverview(stepSixTitle, stepSixTitleP, `Stap 6: ${stepSixTitle}`, stepSixPreviewDiv, stepSixCheck, stepsOverviewWorkshop)
                stepOverview(stepSevenTitle, stepSevenTitleP, `Stap 7: ${stepSevenTitle}`, stepSevenPreviewDiv, stepSevenCheck, stepsOverviewWorkshop)
                stepOverview(stepEightTitle, stepEightTitleP, `Stap 8: ${stepEightTitle}`, stepEightPreviewDiv, stepEightCheck, stepsOverviewWorkshop)
                stepOverview(stepNineTitle, stepNineTitleP, `Stap 9: ${stepNineTitle}`, stepNinePreviewDiv, stepNineCheck, stepsOverviewWorkshop)

                // Step one introduction
                if(stepOneTitle != ""){
                    stepOneIntroductionTitle.innerText = "Zet de eerste stap"
                    stepOneIntroductionP.innerHTML = stepOneIntroduction
                    stepOneIntroductionButton.innerText = "Zet de eerste stap"
                    DOM.appendChild(stepOneIntroductionTitle)
                    DOM.appendChild(stepOneIntroductionDiv)
                    stepOneIntroductionDiv.appendChild(stepOneIntroductionP)
                    stepOneIntroductionDiv.appendChild(stepOneIntroductionButton)
                }    

                // Save workshop after closing

                // Close workshop button when closing div opens
                const closeWorkshopButton = document.createElement("button")
                closeWorkshopButton.innerText = "Afsluiten"

                // openDigimindAfterCloseWorkshopButton()

                // Load steps when clicked in DOM
                const closingTitleH3 = document.createElement("h3")
                const closingTextP = document.createElement("p")
                    closingTextP.setAttribute("class", "closing-text-p")
                const closingInputTitle = document.createElement("h3")
                    closingInputTitle.setAttribute("class", "closing-input-title")
                const closingInput = document.createElement("textarea")
                    closingInput.setAttribute("rows", "10")
                    closingInput.setAttribute("cols", "30")
                    closingInput.setAttribute("placeholder", "Wat vond je van de workshop?")
                    closingInput.setAttribute("id", "closing-input")

                // Load step one
                if(stepOneTitle != ""){
                    stepOneIntroductionButton.addEventListener("click", () => {  

                        toolbarOuterDiv.style.display = "flex"
                        saveOneButton.style.display = "block"

                        const stepOneOuterDiv = document.createElement("div")
                            stepOneOuterDiv.setAttribute("class", "step-outer-div")
                        const stepOneTitleH2 = document.createElement("h2")
                            stepOneTitleH2.setAttribute("class", "step-title-h2")
                        const stepOneExplainerP = document.createElement("p")
                            stepOneExplainerP.setAttribute("class", "step-explainer-p")
                        const stepOneCTATitle = document.createElement("h3")
                            stepOneCTATitle.setAttribute("class", "stepCTATitle")
                        const stepOneCTAP = document.createElement("p")
                        const stepOneInput = document.createElement("textarea")
                            stepOneInput.setAttribute("rows", "10")
                            stepOneInput.setAttribute("cols", "60")
                            stepOneInput.setAttribute("placeholder", "Wat heb je geleerd?")
                            stepOneInput.setAttribute("id", "step-one-input")  

                        stepOneTitleH2.innerHTML = stepOneTitle
                        stepOneExplainerP.innerHTML = stepOneExplainer

                        auth.onAuthStateChanged(User =>{
                            if (User){
                        
                            db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                        const auth = doc.data().GebruikersnaamClean
        
                                        stepOneCTATitle.innerHTML = `${auth}, ${stepOneCTA}`
        
                                });
                            }; 
                        });
                      
                       appendStepToDom(DOM, stepOneOuterDiv, stepOneTitleH2, stepOneExplainerP, stepOneCTATitle, stepOneCTAP, stepOneInput)

                        stepTwoIntroductionTitle.innerText = "Volgende stap"
                        stepTwoIntroductionP.innerHTML = stepTwoIntroduction
                        stepTwoIntroductionButton.innerText = "Volgende stap"
                        DOM.appendChild(stepTwoIntroductionTitle)
                        DOM.appendChild(stepTwoIntroductionDiv)
                        stepTwoIntroductionDiv.appendChild(stepTwoIntroductionP)
                        stepTwoIntroductionDiv.appendChild(stepTwoIntroductionButton)
                    })
                };

                  // Load step two
                  stepTwoIntroductionButton.addEventListener("click", () => {
                  if(stepTwoTitle != ""){

                        saveOne()

                        toolbarOneCount.innerText = "V"
                        toolbarOneCheck.style.backgroundColor = "white"
                        toolbarOneCount.style.color = "#008e8e"

                        saveTwoButton.style.display = "block"
                        saveOneButton.style.display = "none"

                        const stepTwoOuterDiv = document.createElement("div")
                            stepTwoOuterDiv.setAttribute("class", "step-outer-div")
                        const stepTwoTitleH2 = document.createElement("h2")
                            stepTwoTitleH2.setAttribute("class", "step-title-h2")
                        const stepTwoExplainerP = document.createElement("p")
                            stepTwoExplainerP.setAttribute("class", "step-explainer-p")
                        const stepTwoCTATitle = document.createElement("h3")
                            stepTwoCTATitle.setAttribute("class", "stepCTATitle")
                        const stepTwoCTAP = document.createElement("p")
                        const stepTwoInput = document.createElement("textarea")
                            stepTwoInput.setAttribute("rows", "10")
                            stepTwoInput.setAttribute("cols", "30")
                            stepTwoInput.setAttribute("placeholder", "Wat heb je geleerd?")
                            stepTwoInput.setAttribute("id", "step-two-input")

                        stepTwoTitleH2.innerHTML = stepTwoTitle
                        stepTwoExplainerP.innerHTML = stepTwoExplainer

                        auth.onAuthStateChanged(User =>{
                            if (User){
                        
                            db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                        const auth = doc.data().GebruikersnaamClean
        
                                        stepTwoCTATitle.innerHTML = `${auth}, ${stepTwoCTA}`
                                });
                            }; 
                        });
                       
                        appendStepToDom(DOM, stepTwoOuterDiv, stepTwoTitleH2, stepTwoExplainerP, stepTwoCTATitle, stepTwoCTAP, stepTwoInput)


                        stepThreeIntroductionTitle.innerText = "Volgende stap"
                        stepThreeIntroductionP.innerHTML = stepThreeIntroduction
                        stepThreeIntroductionButton.innerText = "Volgende stap"
                        DOM.appendChild(stepThreeIntroductionTitle)
                        DOM.appendChild(stepThreeIntroductionDiv)
                        stepThreeIntroductionDiv.appendChild(stepThreeIntroductionP)
                        stepThreeIntroductionDiv.appendChild(stepThreeIntroductionButton)
                    
                } else {
                    const stepOneButton = document.getElementById("step-one-button")

                    toolbarOneCount.innerText = "V"
                    toolbarOneCheck.style.backgroundColor = "white"
                    toolbarOneCount.style.color = "#008e8e"

                    closingDiv.style.display = "flex"

                    closingButton.style.display = "block"
                    stepOneButton.style.display = "none"
                   
                    closingTitleH3.innerText = closingOneTitle
                    closingTextP.innerHTML = closingOneText

                    auth.onAuthStateChanged(User =>{
                        if (User){
                    
                        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                    const auth = doc.data().GebruikersnaamClean
    
                                    closingInputTitle.innerText = `Wat vond je van de workshop, ${auth}?`
                            });
                        }; 
                    });
                    

                    DOM.appendChild(closingDiv)
                    closingDiv.appendChild(closingTitleH3)
                    closingDiv.appendChild(closingTextP)
                    closingDiv.appendChild(closingInputTitle)
                    closingDiv.appendChild(closingInput)

                    // Save closing

                    closingButton.addEventListener("click", ()  => {
    
                            const closingInput = document.getElementById("closing-input").value
                            const stepOneInput = document.getElementById("step-one-input").value
                        
                            db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
                                querySnapshot.forEach(doc => {
                        
                                    auth.onAuthStateChanged(User =>{
                                        if (User){
                            
                                db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
                                    ClosingInput: closingInput,
                                    StepOneInput: stepOneInput,
                                            });
                                        };
                                    });
                                });
                            });
                        });
                };

            });

                      // Load step three
                        stepThreeIntroductionButton.addEventListener("click", () => {
                            if(stepThreeTitle != ""){

                                saveTwo()

                            toolbarTwoCount.innerText = "V"
                            toolbarTwoCheck.style.backgroundColor = "white"
                            toolbarTwoCount.style.color = "#008e8e"

                            saveThreeButton.style.display = "block"
                            saveTwoButton.style.display = "none"

                            const stepThreeOuterDiv = document.createElement("div")
                                stepThreeOuterDiv.setAttribute("class", "step-outer-div")
                            const stepThreeTitleH2 = document.createElement("h2")
                                stepThreeTitleH2.setAttribute("class", "step-title-h2")
                            const stepThreeExplainerP = document.createElement("p")
                                stepThreeExplainerP.setAttribute("class", "step-explainer-p")
                            const stepThreeCTATitle = document.createElement("h3")
                                stepThreeCTATitle.setAttribute("class", "stepCTATitle")
                            const stepThreeCTAP = document.createElement("p")
                            const stepThreeInput = document.createElement("textarea")
                                stepThreeInput.setAttribute("rows", "10")
                                stepThreeInput.setAttribute("cols", "30")
                                stepThreeInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                stepThreeInput.setAttribute("id", "step-three-input")
    
                            stepThreeTitleH2.innerHTML = stepThreeTitle
                            stepThreeExplainerP.innerHTML = stepThreeExplainer
    
                            auth.onAuthStateChanged(User =>{
                                if (User){
                            
                                db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                            const auth = doc.data().GebruikersnaamClean
            
                                            stepThreeCTATitle.innerHTML = `${auth}, ${stepThreeCTA}`
            
                                    });
                                }; 
                            });
                           
                            appendStepToDom(DOM, stepThreeOuterDiv, stepThreeTitleH2, stepThreeExplainerP, stepThreeCTATitle, stepThreeCTAP, stepThreeInput)

    
                            stepFourIntroductionTitle.innerText = "Volgende stap"
                            stepFourIntroductionP.innerHTML = stepFourIntroduction
                            stepFourIntroductionButton.innerText = "Volgende stap"
                            DOM.appendChild(stepFourIntroductionTitle)
                            DOM.appendChild(stepFourIntroductionDiv)
                            stepFourIntroductionDiv.appendChild(stepFourIntroductionP)
                            stepFourIntroductionDiv.appendChild(stepFourIntroductionButton)
                            } else {

                                const stepTwoButton = document.getElementById("step-two-button")

                                toolbarTwoCount.innerText = "V"
                                toolbarTwoCheck.style.backgroundColor = "white"
                                toolbarTwoCount.style.color = "#008e8e"
    
                                closingDiv.style.display = "flex"

                                closingButton.style.display = "block"
                                stepTwoButton.style.display = "none"
                               
                                closingTitleH3.innerText = closingTwoTitle
                                closingTextP.innerHTML = closingTwoText
    
                                auth.onAuthStateChanged(User =>{
                                    if (User){
                                
                                    db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                const auth = doc.data().GebruikersnaamClean
                
                                                closingInputTitle.innerText = `Wat vond je van de workshop, ${auth}?`
                                        });
                                    }; 
                                });
                                
    
                                DOM.appendChild(closingDiv)
                                closingDiv.appendChild(closingTitleH3)
                                closingDiv.appendChild(closingTextP)
                                closingDiv.appendChild(closingInputTitle)
                                closingDiv.appendChild(closingInput)

                                                // Save closing

                                                closingButton.addEventListener("click", ()  => {
                                
                                                    const closingInput = document.getElementById("closing-input").value
                                                    const stepOneInput = document.getElementById("step-one-input").value
                                                    const stepTwoInput = document.getElementById("step-two-input").value
                                                
                                                    db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
                                                        querySnapshot.forEach(doc => {
                                                
                                                            auth.onAuthStateChanged(User =>{
                                                                if (User){
                                                    
                                                db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
                                                    ClosingInput: closingInput,
                                                    StepOneInput: stepOneInput,
                                                    StepTwoInput: stepTwoInput,
                                                        });
                                                    };
                                                });
                                            });
                                        });
                                    });
                            };
                        })
                    

                        // Load step four
                        stepFourIntroductionButton.addEventListener("click", () => {
                        if(stepFourTitle != ""){

                            saveThree()
        
                                toolbarThreeCount.innerText = "V"
                                toolbarThreeCheck.style.backgroundColor = "white"
                                toolbarThreeCount.style.color = "#008e8e"

                                saveFourButton.style.display = "block"
                                saveThreeButton.style.display = "none"
        
                                const stepFourOuterDiv = document.createElement("div")
                                    stepFourOuterDiv.setAttribute("class", "step-outer-div")
                                const stepFourTitleH2 = document.createElement("h2")
                                    stepFourTitleH2.setAttribute("class", "step-title-h2")
                                const stepFourExplainerP = document.createElement("p")
                                    stepFourExplainerP.setAttribute("class", "step-explainer-p")
                                const stepFourCTATitle = document.createElement("h3")
                                    stepFourCTATitle.setAttribute("class", "stepCTATitle")
                                const stepFourCTAP = document.createElement("p")
                                const stepFourInput = document.createElement("textarea")
                                    stepFourInput.setAttribute("rows", "10")
                                    stepFourInput.setAttribute("cols", "30")
                                    stepFourInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                    stepFourInput.setAttribute("id", "step-four-input")
        
                                stepFourTitleH2.innerText = stepFourTitle
                                stepFourExplainerP.innerHTML = stepFourExplainer
        
                                auth.onAuthStateChanged(User =>{
                                    if (User){
                                
                                    db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                const auth = doc.data().GebruikersnaamClean
                
                                                stepFourCTATitle.innerHTML = `${auth}, ${stepFourCTA}`
                
                                        });
                                    }; 
                                });
                               
                                appendStepToDom(DOM, stepFourOuterDiv, stepFourTitleH2, stepFourExplainerP, stepFourCTATitle, stepFourCTAP, stepFourInput)

        
                                stepFiveIntroductionTitle.innerText = "Volgende stap"
                                stepFiveIntroductionP.innerHTML = stepFiveIntroduction
                                stepFiveIntroductionButton.innerText = "Volgende stap"
                                DOM.appendChild(stepFiveIntroductionTitle)
                                DOM.appendChild(stepFiveIntroductionDiv)
                                stepFiveIntroductionDiv.appendChild(stepFiveIntroductionP)
                                stepFiveIntroductionDiv.appendChild(stepFiveIntroductionButton)
                           
                        } else {
                            toolbarThreeCount.innerText = "V"
                            toolbarThreeCheck.style.backgroundColor = "white"
                            toolbarThreeCount.style.color = "#008e8e"

                            closingDiv.style.display = "flex"

                            closingButton.style.display = "block"

                            saveThreeButton.style.display = "none"
                           
                            closingTitleH3.innerText = closingThreeTitle
                            closingTextP.innerHTML = closingThreeText

                            auth.onAuthStateChanged(User =>{
                                if (User){
                            
                                db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                            const auth = doc.data().GebruikersnaamClean
            
                                            closingInputTitle.innerText = `Wat vond je van de workshop, ${auth}?`
                                    });
                                }; 
                            });
                            

                            DOM.appendChild(closingDiv)
                            closingDiv.appendChild(closingTitleH3)
                            closingDiv.appendChild(closingTextP)
                            closingDiv.appendChild(closingInputTitle)
                            closingDiv.appendChild(closingInput)

                                           // Save closing

                                           closingButton.addEventListener("click", ()  => {
                                
                                            const closingInput = document.getElementById("closing-input").value
                                            const stepOneInput = document.getElementById("step-one-input").value
                                            const stepTwoInput = document.getElementById("step-two-input").value
                                            const stepThreeInput = document.getElementById("step-three-input").value
                                        
                                            db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
                                                querySnapshot.forEach(doc => {
                                        
                                                    auth.onAuthStateChanged(User =>{
                                                        if (User){
                                            
                                        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
                                            ClosingInput: closingInput,
                                            StepOneInput: stepOneInput,
                                            StepTwoInput: stepTwoInput,
                                            StepThreeInput: stepThreeInput,
                                                });
                                            };
                                        });
                                    });
                                });
                            });
                        };
                    });

                       // Load step five
                       stepFiveIntroductionButton.addEventListener("click", () => {
                        if(stepFiveTitle != ""){

                            saveFour()
                                   
                                toolbarFourCount.innerText = "V"
                                toolbarFourCheck.style.backgroundColor = "white"
                                toolbarFourCount.style.color = "#008e8e"

                                saveFiveButton.style.display = "block"
                                saveFourButton.style.display = "none"

                                const stepFiveOuterDiv = document.createElement("div")
                                    stepFiveOuterDiv.setAttribute("class", "step-outer-div")
                                const stepFiveTitleH2 = document.createElement("h2")
                                    stepFiveTitleH2.setAttribute("class", "step-title-h2")
                                const stepFiveExplainerP = document.createElement("p")
                                    stepFiveExplainerP.setAttribute("class", "step-explainer-p")
                                const stepFiveCTATitle = document.createElement("h3")
                                    stepFiveCTATitle.setAttribute("class", "stepCTATitle")
                                const stepFiveCTAP = document.createElement("p")
                                const stepFiveInput = document.createElement("textarea")
                                    stepFiveInput.setAttribute("rows", "10")
                                    stepFiveInput.setAttribute("cols", "30")
                                    stepFiveInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                    stepFiveInput.setAttribute("id", "step-five-input")
        
                                stepFiveTitleH2.innerText = stepFiveTitle
                                stepFiveExplainerP.innerHTML = stepFiveExplainer
        
                                auth.onAuthStateChanged(User =>{
                                    if (User){
                                
                                    db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                const auth = doc.data().GebruikersnaamClean
                
                                                stepFiveCTATitle.innerHTML = `${auth}, ${stepFiveCTA}`
                
                                        });
                                    }; 
                                });
                               
                                appendStepToDom(DOM, stepFiveOuterDiv, stepFiveTitleH2, stepFiveExplainerP, stepFiveCTATitle, stepFiveCTAP, stepFiveInput)

                                stepSixIntroductionTitle.innerText = "Volgende stap"
                                stepSixIntroductionP.innerHTML = stepSixIntroduction
                                stepSixIntroductionButton.innerText = "Volgende stap"
                                DOM.appendChild(stepSixIntroductionTitle)
                                DOM.appendChild(stepSixIntroductionDiv)
                                stepSixIntroductionDiv.appendChild(stepSixIntroductionP)
                                stepSixIntroductionDiv.appendChild(stepSixIntroductionButton)
                           
                        } else {
                            toolbarFourCount.innerText = "V"
                            toolbarFourCheck.style.backgroundColor = "white"
                            toolbarFourCount.style.color = "#008e8e"

                            closingDiv.style.display = "flex"

                            closingButton.style.display = "block"
                            stepFourButton.style.display = "none"
                           
                            closingTitleH3.innerText = closingFourTitle
                            closingTextP.innerHTML = closingFourText

                            auth.onAuthStateChanged(User =>{
                                if (User){
                            
                                db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                            const auth = doc.data().GebruikersnaamClean
            
                                            closingInputTitle.innerText = `Wat vond je van de workshop, ${auth}?`
                                    });
                                }; 
                            });
                            

                            DOM.appendChild(closingDiv)
                            closingDiv.appendChild(closingTitleH3)
                            closingDiv.appendChild(closingTextP)
                            closingDiv.appendChild(closingInputTitle)
                            closingDiv.appendChild(closingInput)

                                        // Save closing

                                        closingButton.addEventListener("click", ()  => {
                                            
                                            const closingInput = document.getElementById("closing-input").value
                                            const stepOneInput = document.getElementById("step-one-input").value
                                            const stepTwoInput = document.getElementById("step-two-input").value
                                            const stepThreeInput = document.getElementById("step-three-input").value
                                            const stepFourInput = document.getElementById("step-four-input").value
                                        
                                            db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
                                                querySnapshot.forEach(doc => {
                                        
                                                    auth.onAuthStateChanged(User =>{
                                                        if (User){
                                            
                                        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
                                            ClosingInput: closingInput,
                                            StepOneInput: stepOneInput,
                                            StepTwoInput: stepTwoInput,
                                            StepThreeInput: stepThreeInput,
                                            StepFourInput: stepFourInput,
                                                });
                                            };
                                        });
                                    });
                                });
                            });
                        };
                    });

                         // Load step six
                         stepSixIntroductionButton.addEventListener("click", () => {
                            if(stepSixTitle != ""){

                                saveFive()
                               
                                    toolbarFiveCount.innerText = "V"
                                    toolbarFiveCheck.style.backgroundColor = "white"
                                    toolbarFiveCount.style.color = "#008e8e"

                                    saveSixButton.style.display = "block"
                                    saveFiveButton.style.display = "none"
            
                                    const stepSixOuterDiv = document.createElement("div")
                                        stepSixOuterDiv.setAttribute("class", "step-outer-div")
                                    const stepSixTitleH2 = document.createElement("h2")
                                        stepSixTitleH2.setAttribute("class", "step-title-h2")
                                    const stepSixExplainerP = document.createElement("p")
                                        stepSixExplainerP.setAttribute("class", "step-explainer-p")
                                    const stepSixCTATitle = document.createElement("h3")
                                        stepSixCTATitle.setAttribute("class", "stepCTATitle")
                                    const stepSixCTAP = document.createElement("p")
                                    const stepSixInput = document.createElement("textarea")
                                        stepSixInput.setAttribute("rows", "10")
                                        stepSixInput.setAttribute("cols", "30")
                                        stepSixInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                        stepSixInput.setAttribute("id", "step-six-input")
            
                                    stepSixTitleH2.innerText = stepSixTitle
                                    stepSixExplainerP.innerHTML = stepSixExplainer
            
                                    auth.onAuthStateChanged(User =>{
                                        if (User){
                                    
                                        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                    const auth = doc.data().GebruikersnaamClean
                    
                                                    stepSixCTATitle.innerHTML = `${auth}, ${stepSixCTA}`
                    
                                            });
                                        }; 
                                    });
                                   
                                    appendStepToDom(DOM, stepSixOuterDiv, stepSixTitleH2, stepSixExplainerP, stepSixCTATitle, stepSixCTAP, stepSixInput)

            
                                    stepSevenIntroductionTitle.innerText = "Volgende stap"
                                    stepSevenIntroductionP.innerHTML = stepSevenIntroduction
                                    stepSevenIntroductionButton.innerText = "Volgende stap"
                                    DOM.appendChild(stepSevenIntroductionTitle)
                                    DOM.appendChild(stepSevenIntroductionDiv)
                                    stepSevenIntroductionDiv.appendChild(stepSevenIntroductionP)
                                    stepSevenIntroductionDiv.appendChild(stepSevenIntroductionButton)
                               
                            } else {
                                toolbarFiveCount.innerText = "V"
                                toolbarFiveCheck.style.backgroundColor = "white"
                                toolbarFiveCount.style.color = "#008e8e"
    
                                closingDiv.style.display = "flex"

                                closingButton.style.display = "block"
                                stepFiveButton.style.display = "none"
                               
                                closingTitleH3.innerText = closingFiveTitle
                                closingTextP.innerHTML = closingFiveText
    
                                auth.onAuthStateChanged(User =>{
                                    if (User){
                                
                                    db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                const auth = doc.data().GebruikersnaamClean
                
                                                closingInputTitle.innerText = `Wat vond je van de workshop, ${auth}?`
                                        });
                                    }; 
                                });
                                
    
                                DOM.appendChild(closingDiv)
                                closingDiv.appendChild(closingTitleH3)
                                closingDiv.appendChild(closingTextP)
                                closingDiv.appendChild(closingInputTitle)
                                closingDiv.appendChild(closingInput)

                                                // Save closing

                                                closingButton.addEventListener("click", ()  => {
                                                            
                                                    const closingInput = document.getElementById("closing-input").value
                                                    const stepOneInput = document.getElementById("step-one-input").value
                                                    const stepTwoInput = document.getElementById("step-two-input").value
                                                    const stepThreeInput = document.getElementById("step-three-input").value
                                                    const stepFourInput = document.getElementById("step-four-input").value
                                                    const stepFiveInput = document.getElementById("step-five-input").value
                                                
                                                    db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
                                                        querySnapshot.forEach(doc => {
                                                
                                                            auth.onAuthStateChanged(User =>{
                                                                if (User){
                                                    
                                                db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
                                                    ClosingInput: closingInput,
                                                    StepOneInput: stepOneInput,
                                                    StepTwoInput: stepTwoInput,
                                                    StepThreeInput: stepThreeInput,
                                                    StepFourInput: stepFourInput,
                                                    StepFiveInput: stepFiveInput,
                                                        });
                                                    };
                                                });
                                            });
                                        });
                                    });
                            };
                        });

                        // Load step seven
                        stepSevenIntroductionButton.addEventListener("click", () => {
                            if(stepSevenTitle != ""){

                                saveSix()
                               
                                    toolbarSixCount.innerText = "V"
                                    toolbarSixCheck.style.backgroundColor = "white"
                                    toolbarSixCount.style.color = "#008e8e"

                                    saveSevenButton.style.display = "block"
                                    saveSixButton.style.display = "none"
            
                                    const stepSevenOuterDiv = document.createElement("div")
                                        stepSevenOuterDiv.setAttribute("class", "step-outer-div")
                                    const stepSevenTitleH2 = document.createElement("h2")
                                        stepSevenTitleH2.setAttribute("class", "step-title-h2")
                                    const stepSevenExplainerP = document.createElement("p")
                                        stepSevenExplainerP.setAttribute("class", "step-explainer-p")
                                    const stepSevenCTATitle = document.createElement("h3")
                                        stepSevenCTATitle.setAttribute("class", "stepCTATitle")
                                    const stepSevenCTAP = document.createElement("p")
                                    const stepSevenInput = document.createElement("textarea")
                                        stepSevenInput.setAttribute("rows", "10")
                                        stepSevenInput.setAttribute("cols", "30")
                                        stepSevenInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                        stepSevenInput.setAttribute("id", "step-seven-input")
            
                                    stepSevenTitleH2.innerText = stepSevenTitle
                                    stepSevenExplainerP.innerHTML = stepSevenExplainer
            
                                    auth.onAuthStateChanged(User =>{
                                        if (User){
                                    
                                        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                    const auth = doc.data().GebruikersnaamClean
                    
                                                    stepSevenCTATitle.innerHTML = `${auth}, ${stepSevenCTA}`
                    
                                            });
                                        }; 
                                    });
                                   
                                    appendStepToDom(DOM, stepSevenOuterDiv, stepSevenTitleH2, stepSevenExplainerP, stepSevenCTATitle, stepSevenCTAP, stepSevenInput)

            
                                    stepEightIntroductionTitle.innerText = "Volgende stap"
                                    stepEightIntroductionP.innerHTML = stepEightIntroduction
                                    stepEightIntroductionButton.innerText = "Volgende stap"
                                    DOM.appendChild(stepEightIntroductionTitle)
                                    DOM.appendChild(stepEightIntroductionDiv)
                                    stepEightIntroductionDiv.appendChild(stepEightIntroductionP)
                                    stepEightIntroductionDiv.appendChild(stepEightIntroductionButton)
                               
                            } else {
                                toolbarSixCount.innerText = "V"
                                toolbarSixCheck.style.backgroundColor = "white"
                                toolbarSixCount.style.color = "#008e8e"
    
                                closingDiv.style.display = "flex"

                                closingButton.style.display = "block"
                                stepSixButton.style.display = "none"
                               
                                closingTitleH3.innerText = closingSixTitle
                                closingTextP.innerHTML = closingSixText
    
                                auth.onAuthStateChanged(User =>{
                                    if (User){
                                
                                    db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                const auth = doc.data().GebruikersnaamClean
                
                                                closingInputTitle.innerText = `Wat vond je van de workshop, ${auth}?`
                                        });
                                    }; 
                                });
                                
    
                                DOM.appendChild(closingDiv)
                                closingDiv.appendChild(closingTitleH3)
                                closingDiv.appendChild(closingTextP)
                                closingDiv.appendChild(closingInputTitle)
                                closingDiv.appendChild(closingInput)

                                            // Save closing

                                            closingButton.addEventListener("click", ()  => {
                                                                        
                                                const closingInput = document.getElementById("closing-input").value
                                                const stepOneInput = document.getElementById("step-one-input").value
                                                const stepTwoInput = document.getElementById("step-two-input").value
                                                const stepThreeInput = document.getElementById("step-three-input").value
                                                const stepFourInput = document.getElementById("step-four-input").value
                                                const stepFiveInput = document.getElementById("step-five-input").value
                                                const stepSixInput = document.getElementById("step-six-input").value
                                            
                                                db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
                                                    querySnapshot.forEach(doc => {
                                            
                                                        auth.onAuthStateChanged(User =>{
                                                            if (User){
                                                
                                            db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
                                                ClosingInput: closingInput,
                                                StepOneInput: stepOneInput,
                                                StepTwoInput: stepTwoInput,
                                                StepThreeInput: stepThreeInput,
                                                StepFourInput: stepFourInput,
                                                StepFiveInput: stepFiveInput,
                                                StepSixInput: stepSixInput,
                                                    });
                                                };
                                            });
                                        });
                                    });
                                });
                            };
                        });

                        // Load step eighht
                        stepEightIntroductionButton.addEventListener("click", () => {
                            if(stepEightTitle != ""){

                                saveSeven()
                               
                                    toolbarSevenCount.innerText = "V"
                                    toolbarSevenCheck.style.backgroundColor = "white"
                                    toolbarSevenCount.style.color = "#008e8e"

                                    saveEightButton.style.display = "block"
                                    saveSevenButton.style.display = "none"
            
                                    const stepEightOuterDiv = document.createElement("div")
                                        stepEightOuterDiv.setAttribute("class", "step-outer-div")
                                    const stepEightTitleH2 = document.createElement("h2")
                                        stepEightTitleH2.setAttribute("class", "step-title-h2")
                                    const stepEightExplainerP = document.createElement("p")
                                        stepEightExplainerP.setAttribute("class", "step-explainer-p")
                                    const stepEightCTATitle = document.createElement("h3")
                                        stepEightCTATitle.setAttribute("class", "stepCTATitle")
                                    const stepEightCTAP = document.createElement("p")
                                    const stepEightInput = document.createElement("textarea")
                                        stepEightInput.setAttribute("rows", "10")
                                        stepEightInput.setAttribute("cols", "30")
                                        stepEightInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                        stepEightInput.setAttribute("id", "step-eight-input")
            
                                    stepEightTitleH2.innerText = stepEightTitle
                                    stepEightExplainerP.innerHTML = stepEightExplainer
            
                                    auth.onAuthStateChanged(User =>{
                                        if (User){
                                    
                                        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                    const auth = doc.data().GebruikersnaamClean
                    
                                                    stepEightCTATitle.innerHTML = `${auth}, ${stepEightCTA}`
                    
                                            });
                                        }; 
                                    });
                                   
                                    appendStepToDom(DOM, stepEightOuterDiv, stepEightTitleH2, stepEightExplainerP, stepEightCTATitle, stepEightCTAP, stepEightInput)

            
                                    stepNineIntroductionTitle.innerText = "Volgende stap"
                                    stepNineIntroductionP.innerHTML = stepNineIntroduction
                                    stepNineIntroductionButton.innerText = "Volgende stap"
                                    DOM.appendChild(stepNineIntroductionTitle)
                                    DOM.appendChild(stepNineIntroductionDiv)
                                    stepNineIntroductionDiv.appendChild(stepNineIntroductionP)
                                    stepNineIntroductionDiv.appendChild(stepNineIntroductionButton)
                               
                            } else {
                                toolbarSevenCount.innerText = "V"
                                toolbarSevenCheck.style.backgroundColor = "white"
                                toolbarSevenCount.style.color = "#008e8e"
    
                                closingDiv.style.display = "flex"

                                closingButton.style.display = "block"
                                stepSevenButton.style.display = "none"
                               
                                closingTitleH3.innerText = closingSevenTitle
                                closingTextP.innerHTML = closingSevenText
    
                                auth.onAuthStateChanged(User =>{
                                    if (User){
                                
                                    db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                const auth = doc.data().GebruikersnaamClean
                
                                                closingInputTitle.innerText = `Wat vond je van de workshop, ${auth}?`
                                        });
                                    }; 
                                });
                                
    
                                DOM.appendChild(closingDiv)
                                closingDiv.appendChild(closingTitleH3)
                                closingDiv.appendChild(closingTextP)
                                closingDiv.appendChild(closingInputTitle)
                                closingDiv.appendChild(closingInput)

                                            // Save closing

                                            closingButton.addEventListener("click", ()  => {
                                                                        
                                                const closingInput = document.getElementById("closing-input").value
                                                const stepOneInput = document.getElementById("step-one-input").value
                                                const stepTwoInput = document.getElementById("step-two-input").value
                                                const stepThreeInput = document.getElementById("step-three-input").value
                                                const stepFourInput = document.getElementById("step-four-input").value
                                                const stepFiveInput = document.getElementById("step-five-input").value
                                                const stepSixInput = document.getElementById("step-six-input").value
                                                const stepSevenInput = document.getElementById("step-seven-input").value
                                            
                                                db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
                                                    querySnapshot.forEach(doc => {
                                            
                                                        auth.onAuthStateChanged(User =>{
                                                            if (User){
                                                
                                            db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
                                                ClosingInput: closingInput,
                                                StepOneInput: stepOneInput,
                                                StepTwoInput: stepTwoInput,
                                                StepThreeInput: stepThreeInput,
                                                StepFourInput: stepFourInput,
                                                StepFiveInput: stepFiveInput,
                                                StepSixInput: stepSixInput,
                                                StepSevenInput: stepSevenInput,
                                                    });
                                                };
                                            });
                                        });
                                    });
                                });
                            };
                        });

                         // Load step nine
                         stepNineIntroductionButton.addEventListener("click", () => {
                            if(stepNineTitle != ""){

                                saveSeven()
                               
                                    toolbarEightCount.innerText = "V"
                                    toolbarEightCheck.style.backgroundColor = "white"
                                    toolbarEightCount.style.color = "#008e8e"

                                    saveNineButton.style.display = "block"
                                    saveEightButton.style.display = "none"
            
                                    const stepNineOuterDiv = document.createElement("div")
                                        stepNineOuterDiv.setAttribute("class", "step-outer-div")
                                    const stepNineTitleH2 = document.createElement("h2")
                                        stepNineTitleH2.setAttribute("class", "step-title-h2")
                                    const stepNineExplainerP = document.createElement("p")
                                        stepNineExplainerP.setAttribute("class", "step-explainer-p")
                                    const stepNineCTATitle = document.createElement("h3")
                                        stepNineCTATitle.setAttribute("class", "stepCTATitle")
                                    const stepNineCTAP = document.createElement("p")
                                    const stepNineInput = document.createElement("textarea")
                                        stepNineInput.setAttribute("rows", "10")
                                        stepNineInput.setAttribute("cols", "30")
                                        stepNineInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                        stepNineInput.setAttribute("id", "step-nine-input")
            
                                    stepNineTitleH2.innerHTML = stepNineTitle
                                    stepNineExplainerP.innerHTML = stepNineExplainer
            
                                    auth.onAuthStateChanged(User =>{
                                        if (User){
                                    
                                        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                    const auth = doc.data().GebruikersnaamClean
                    
                                                    stepNineCTATitle.innerHTML = `${auth}, ${stepNineCTA}`
                    
                                            });
                                        }; 
                                    });
                                   
                                    appendStepToDom(DOM, stepNineOuterDiv, stepNineTitleH2, stepNineExplainerP, stepNineCTATitle, stepNineCTAP, stepNineInput)

            
                                    closingIntroductionTitle.innerText = "Afronden"
                                    closingIntroductionP.innerHTML = stepNineIntroduction
                                    closingIntroductionButton.innerText = "Afronden"
                                    DOM.appendChild(closingIntroductionTitle)
                                    DOM.appendChild(closingIntroductionDiv)
                                    closingIntroductionDiv.appendChild(closingIntroductionP)
                                    closingIntroductionDiv.appendChild(closingIntroductionButton)
                               
                            } else {
                                toolbarEightCount.innerText = "V"
                                toolbarEightCheck.style.backgroundColor = "white"
                                toolbarEightCount.style.color = "#008e8e"
    
                                closingDiv.style.display = "flex"

                                closingButton.style.display = "block"
                                stepEightButton.style.display = "none"
                               
                                closingTitleH3.innerText = closingEightTitle
                                closingTextP.innerHTML = closingEightText
    
                                auth.onAuthStateChanged(User =>{
                                    if (User){
                                
                                    db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                const auth = doc.data().GebruikersnaamClean
                
                                                closingInputTitle.innerText = `Wat vond je van de workshop, ${auth}?`
                                        });
                                    }; 
                                });
                                
    
                                DOM.appendChild(closingDiv)
                                closingDiv.appendChild(closingTitleH3)
                                closingDiv.appendChild(closingTextP)
                                closingDiv.appendChild(closingInputTitle)
                                closingDiv.appendChild(closingInput)

                                            // Save closing

                                            closingButton.addEventListener("click", ()  => {
                                                                                    
                                                const closingInput = document.getElementById("closing-input").value
                                                const stepOneInput = document.getElementById("step-one-input").value
                                                const stepTwoInput = document.getElementById("step-two-input").value
                                                const stepThreeInput = document.getElementById("step-three-input").value
                                                const stepFourInput = document.getElementById("step-four-input").value
                                                const stepFiveInput = document.getElementById("step-five-input").value
                                                const stepSixInput = document.getElementById("step-six-input").value
                                                const stepSevenInput = document.getElementById("step-seven-input").value
                                                const stepEightInput = document.getElementById("step-eight-input").value
                                                const stepNineInput = document.getElementById("step-eight-input").value

                                                db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
                                                    querySnapshot.forEach(doc => {
                                            
                                                        auth.onAuthStateChanged(User =>{
                                                            if (User){
                                                
                                            db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
                                                ClosingInput: closingInput,
                                                StepOneInput: stepOneInput,
                                                StepTwoInput: stepTwoInput,
                                                StepThreeInput: stepThreeInput,
                                                StepFourInput: stepFourInput,
                                                StepFiveInput: stepFiveInput,
                                                StepSixInput: stepSixInput,
                                                StepSevenInput: stepSevenInput,
                                                StepEightInput: stepEightInput,
                                                StepNineInput: stepNineInput,
                                                    });
                                                };
                                            });
                                        });
                                    });
                                });
                            };
                        });

                        closingIntroductionButton.addEventListener("click", () => {

                            const saveNineButonDOM = document.getElementById("save-nine-button")

                            toolbarNineCount.innerText = "V"
                            toolbarNineCheck.style.backgroundColor = "white"
                            toolbarNineCount.style.color = "#008e8e"

                            closingDiv.style.display = "flex"

                            closingButton.style.display = "block"
                            saveNineButonDOM.style.display = "none"
                            
                            closingTitleH3.innerText = closingNineTitle
                            closingTextP.innerHTML = closingNineText

                            auth.onAuthStateChanged(User =>{
                                if (User){
                            
                                db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                            const auth = doc.data().GebruikersnaamClean
            
                                            closingInputTitle.innerText = `Wat vond je van de workshop, ${auth}?`
                                    });
                                }; 
                            });
                            

                            DOM.appendChild(closingDiv)
                            closingDiv.appendChild(closingTitleH3)
                            closingDiv.appendChild(closingTextP)
                            closingDiv.appendChild(closingInputTitle)
                            closingDiv.appendChild(closingInput)

                                        // Save closing

                                        closingButton.addEventListener("click", ()  => {
                                                                                                
                                            const closingInput = document.getElementById("closing-input").value
                                            const stepOneInput = document.getElementById("step-one-input").value
                                            const stepTwoInput = document.getElementById("step-two-input").value
                                            const stepThreeInput = document.getElementById("step-three-input").value
                                            const stepFourInput = document.getElementById("step-four-input").value
                                            const stepFiveInput = document.getElementById("step-five-input").value
                                            const stepSixInput = document.getElementById("step-six-input").value
                                            const stepSevenInput = document.getElementById("step-seven-input").value
                                            const stepEightInput = document.getElementById("step-eight-input").value
                                            const stepNineInput = document.getElementById("step-nine-input").value
                                        
                                            db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
                                                querySnapshot.forEach(doc => {
                                        
                                                    auth.onAuthStateChanged(User =>{
                                                        if (User){
                                            
                                        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
                                            ClosingInput: closingInput,
                                            StepOneInput: stepOneInput,
                                            StepTwoInput: stepTwoInput,
                                            StepThreeInput: stepThreeInput,
                                            StepFourInput: stepFourInput,
                                            StepFiveInput: stepFiveInput,
                                            StepSixInput: stepSixInput,
                                            StepSevenInput: stepSevenInput,
                                            StepEightInput: stepEightInput,
                                            StepNineInput: stepNineInput,
                                                });
                                            };
                                        });
                                    });
                                });
                            });
                        });

                        // Pre-fill workshops if auth has input in database
                auth.onAuthStateChanged(User =>{
                    if (User){

                        db.collection("Vitaminders").doc(User.uid).collection("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
                            querySnapshot.forEach(doc => {

                                const stepOneInput = doc.data().StepOneInput
                                const stepTwoInput = doc.data().StepTwoInput
                                const stepThreeInput = doc.data().StepThreeInput
                                const stepFourInput = doc.data().StepFourInput
                                const stepFiveInput = doc.data().StepFiveInput
                                const stepSixInput = doc.data().StepSixInput
                                const stepSevenInput = doc.data().StepSevenInput
                                const stepEightInput = doc.data().StepEightInput
                                const stepNineInput = doc.data().StepNineInput
                                const closingInput = doc.data().ClosingInput

                                const stepOneButton = document.getElementById("step-one-button")

                                const newGoalorAppend = document.getElementById("workshop-goal-check")
                                newGoalorAppend.style.display = "none"
                    
                                const workshopSection = document.getElementById("workshop-inner-div")
                                    workshopSection.style.display = "flex"

                                if(stepOneInput != ""){

                                    stepOneButton.click()

                                    stepOneButton.parentElement.style.display = "none"

                                const stepOneInputDOM = document.getElementById("step-one-input")

                                stepOneInputDOM.innerHTML = stepOneInput

                                toolbarOneCount.innerText = "V"
                                toolbarOneCheck.style.backgroundColor = "white"
                                toolbarOneCount.style.color = "#008e8e"
                                };

                                const stepTwoButton = document.getElementById("step-two-button")

                                if(stepTwoInput != ""){

                                    stepTwoButton.click()

                                const stepTwoInputDOM = document.getElementById("step-two-input")

                                stepTwoInputDOM.innerHTML = stepTwoInput

                                toolbarTwoCount.innerText = "V"
                                toolbarTwoCheck.style.backgroundColor = "white"
                                toolbarTwoCount.style.color = "#008e8e"
                                };

                                const stepThreeButton = document.getElementById("step-three-button")

                                if(stepThreeInput != ""){

                                    stepThreeButton.click()

                                const stepThreeInputDOM = document.getElementById("step-three-input")

                                stepThreeInputDOM.innerHTML = stepThreeInput

                                toolbarThreeCount.innerText = "V"
                                toolbarThreeCheck.style.backgroundColor = "white"
                                toolbarThreeCount.style.color = "#008e8e"
                                };

                                const stepFourButton = document.getElementById("step-four-button")

                                if(stepFourInput != ""){

                                    stepFourButton.click()

                                const stepFourInputDOM = document.getElementById("step-four-input")

                                stepFourInputDOM.innerHTML = stepFourInput

                                toolbarFourCount.innerText = "V"
                                toolbarFourCheck.style.backgroundColor = "white"
                                toolbarFourCount.style.color = "#008e8e"
                                };

                                const stepFiveButton = document.getElementById("step-five-button")

                                if(stepFiveInput != ""){

                                    stepFiveButton.click()

                                const stepFiveInputDOM = document.getElementById("step-five-input")

                                stepFiveInputDOM.innerHTML = stepFiveInput

                                toolbarFiveCount.innerText = "V"
                                toolbarFiveCheck.style.backgroundColor = "white"
                                toolbarFiveCount.style.color = "#008e8e"
                                };

                                const stepSixButton = document.getElementById("step-six-button")

                                if(stepSixInput != ""){

                                    stepSixButton.click()

                                const stepSixInputDOM = document.getElementById("step-six-input")

                                stepSixInputDOM.innerHTML = stepSixInput

                                toolbarSixCount.innerText = "V"
                                toolbarSixCheck.style.backgroundColor = "white"
                                toolbarSixCount.style.color = "#008e8e"
                                };

                                const stepSevenButton = document.getElementById("step-seven-button")

                                if(stepSevenInput != ""){

                                    stepSevenButton.click()

                                const stepSevenInputDOM = document.getElementById("step-seven-input")

                                stepSevenInputDOM.innerHML = stepSevenInput

                                toolbarSevenCount.innerText = "V"
                                toolbarSevenCheck.style.backgroundColor = "white"
                                toolbarSevenCount.style.color = "#008e8e"
                                };

                                const stepEightButton = document.getElementById("step-eight-button")

                                if(stepEightInput != ""){

                                    stepEightButton.click()

                                const stepEightInputDOM = document.getElementById("step-eight-input")

                                stepEightInputDOM.innerHTML = stepEightInput

                                toolbarEightCount.innerText = "V"
                                toolbarEightCheck.style.backgroundColor = "white"
                                toolbarEightCount.style.color = "#008e8e"
                                };

                                const stepNineButton = document.getElementById("step-nine-button")

                                if(stepNineInput != ""){

                                    stepNineButton.click()

                                const stepNineInputDOM = document.getElementById("step-nine-input")

                                stepNineInputDOM.innerHTML = stepNineInput

                                toolbarNineCount.innerText = "V"
                                toolbarNineCheck.style.backgroundColor = "white"
                                toolbarNineCount.style.color = "#008e8e"
                                };

                                const closingButton = document.getElementById("closing-button")

                                if(closingInput != ""){

                                    closingButton.click()

                                const closingInputDOM = document.getElementById("closing-input")

                                closingInputDOM.innerHTML = closingInput

                                };
                            });
                        });
                    };
                });  
            });
        });
    });
});

// Save 
function saveOne(){
    
    const stepOneInput = document.getElementById("step-one-input").value

    db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            auth.onAuthStateChanged(User =>{
                if (User){
    
        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
            StepOneInput: stepOneInput,
                    });
                };
            });
        });
    });
};

function saveTwo(){
    
    const stepTwoInput = document.getElementById("step-two-input").value
    const stepOneInput = document.getElementById("step-one-input").value

    db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            auth.onAuthStateChanged(User =>{
                if (User){
    
        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
            StepTwoInput: stepTwoInput,
            StepOneInput: stepOneInput,
                    });
                };
            });
        });
    });
};

function saveThree(){
    
    const stepThreeInput = document.getElementById("step-three-input").value
    const stepOneInput = document.getElementById("step-one-input").value
    const stepTwoInput = document.getElementById("step-two-input").value

    db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            auth.onAuthStateChanged(User =>{
                if (User){
    
        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
            StepThreeInput: stepThreeInput,
            StepOneInput: stepOneInput,
            StepTwoInput: stepTwoInput,
                    });
                };
            });
        });
    });
};

function saveFour(){
    
    const stepFourInput = document.getElementById("step-four-input").value
    const stepOneInput = document.getElementById("step-one-input").value
    const stepTwoInput = document.getElementById("step-two-input").value
    const stepThreeInput = document.getElementById("step-three-input").value

    db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            auth.onAuthStateChanged(User =>{
                if (User){
    
        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
            StepFourInput: stepFourInput,
            StepOneInput: stepOneInput,
            StepTwoInput: stepTwoInput,
            StepThreeInput: stepThreeInput,
                    });
                };
            });
        });
    });
};

function saveFive(){
    
    const stepFiveInput = document.getElementById("step-five-input").value
    const stepOneInput = document.getElementById("step-one-input").value
    const stepTwoInput = document.getElementById("step-two-input").value
    const stepThreeInput = document.getElementById("step-three-input").value
    const stepFourInput = document.getElementById("step-four-input").value

    db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            auth.onAuthStateChanged(User =>{
                if (User){
    
        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
            StepFiveInput: stepFiveInput,
            StepOneInput: stepOneInput,
            StepTwoInput: stepTwoInput,
            StepThreeInput: stepThreeInput,
            StepFourInput: stepFourInput,
                    });
                };
            });
        });
    });
};

function saveSix(){
    
    const stepSixInput = document.getElementById("step-six-input").value
    const stepOneInput = document.getElementById("step-one-input").value
    const stepTwoInput = document.getElementById("step-two-input").value
    const stepThreeInput = document.getElementById("step-three-input").value
    const stepFourInput = document.getElementById("step-four-input").value
    const stepFiveInput = document.getElementById("step-five-input").value

    db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            auth.onAuthStateChanged(User =>{
                if (User){
    
        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
            StepSixInput: stepSixInput,
            StepOneInput: stepOneInput,
            StepTwoInput: stepTwoInput,
            StepThreeInput: stepThreeInput,
            StepFourInput: stepFourInput,
            StepFiveInput: stepFiveInput,
                    });
                };
            });
        });
    });
};

function saveSeven(){
    
    const stepSevenInput = document.getElementById("step-seven-input").value
    const stepOneInput = document.getElementById("step-one-input").value
    const stepTwoInput = document.getElementById("step-two-input").value
    const stepThreeInput = document.getElementById("step-three-input").value
    const stepFourInput = document.getElementById("step-four-input").value
    const stepFiveInput = document.getElementById("step-five-input").value
    const stepSixInput = document.getElementById("step-six-input").value

    db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            auth.onAuthStateChanged(User =>{
                if (User){
    
        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
            StepSevenInput: stepSevenInput,
            StepOneInput: stepOneInput,
            StepTwoInput: stepTwoInput,
            StepThreeInput: stepThreeInput,
            StepFourInput: stepFourInput,
            StepFiveInput: stepFiveInput,
            StepSixInput: stepSixInput,
                    });
                };
            });
        });
    });
};

function saveEight(){
    
    const stepEightInput = document.getElementById("step-eight-input").value
    const stepOneInput = document.getElementById("step-one-input").value
    const stepTwoInput = document.getElementById("step-two-input").value
    const stepThreeInput = document.getElementById("step-three-input").value
    const stepFourInput = document.getElementById("step-four-input").value
    const stepFiveInput = document.getElementById("step-five-input").value
    const stepSixInput = document.getElementById("step-six-input").value
    const stepSevenInput = document.getElementById("step-seven-input").value

    db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            auth.onAuthStateChanged(User =>{
                if (User){
    
        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
            StepEightInput: stepEightInput,
            StepOneInput: stepOneInput,
            StepTwoInput: stepTwoInput,
            StepThreeInput: stepThreeInput,
            StepFourInput: stepFourInput,
            StepFiveInput: stepFiveInput,
            StepSixInput: stepSixInput,
            StepSevenInput: stepSevenInput,
                    });
                };
            });
        });
    });
};

function saveNine(){
    
    const stepNineInput = document.getElementById("step-Nine-input").value
    const stepOneInput = document.getElementById("step-one-input").value
    const stepTwoInput = document.getElementById("step-two-input").value
    const stepThreeInput = document.getElementById("step-three-input").value
    const stepFourInput = document.getElementById("step-four-input").value
    const stepFiveInput = document.getElementById("step-five-input").value
    const stepSixInput = document.getElementById("step-six-input").value
    const stepSevenInput = document.getElementById("step-seven-input").value
    const stepEightInput = document.getElementById("step-eight-input").value

    db.collectionGroup("Workshops").where("Workshop", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            auth.onAuthStateChanged(User =>{
                if (User){
    
        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc(doc.id).update({
            StepNineInput: stepNineInput,
            StepOneInput: stepOneInput,
            StepTwoInput: stepTwoInput,
            StepThreeInput: stepThreeInput,
            StepFourInput: stepFourInput,
            StepFiveInput: stepFiveInput,
            StepSixInput: stepSixInput,
            StepSevenInput: stepSevenInput,
            StepEightInput: stepEightInput,
                    });
                };
            });
        });
    });
};



// EDIT WORKSHOP

const titleFromStorage = localStorage.getItem("workshopTitle")
const coachFromStorage = localStorage.getItem("workshopCoach")

function clearLocalStorage(){
    localStorage.removeItem("workshopTitle")
    localStorage.removeItem("workshopCoach")
};

!function editWorkshop(){

    const editWorkshopDiv = document.getElementById("edit-workshop-div")

    if (editWorkshopDiv != null){

        editWorkshopDiv.addEventListener("click", () => {
            
            const editWorkshopButton = document.getElementById("edit-workshop")

            const dataTitle = editWorkshopButton.dataset.title
            const dataCoach = editWorkshopButton.dataset.coach

            localStorage.setItem("workshopTitle", dataTitle)
            localStorage.setItem("workshopCoach", dataCoach)

            window.open("../create-workshop.html", "_self")
        });
    };
}();

function hideSaveButtonShowUpdateButton(){
    // Save/update
    const saveWorkshopButton = document.getElementById("saveWorkshop")
    const updateWorkshopButton = document.getElementById("updateWorkshop")

    saveWorkshopButton.style.display = "none"
    updateWorkshopButton.style.display = "flex"
}

!function fillCreateWorkshopIfLocaleStorageIsSet(){ 

    if(titleFromStorage != undefined && coachFromStorage != undefined){

        db.collection("Workshops").where("WorkshopTitle", "==", titleFromStorage)
        .where("Coach", "==", coachFromStorage).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                clearLocalStorage()
                hideSaveButtonShowUpdateButton()
        
                const title = doc.data().WorkshopTitle
                const headerImg = doc.data().BannerImage
                const workshopGoals = doc.data().WorkshopGoals
                const workshopPrice = doc.data().Price
                const stepOnePreview = doc.data().StepOnePreview
                const stepOneTitle = doc.data().StepOneTitle
                const stepOneExplainer = doc.data().StepOneExplainer
                const stepOneCTA = doc.data().StepOneCTA
                const stepTwoPreview = doc.data().StepTwoPreview
                const stepTwoTitle = doc.data().StepTwoTitle
                const stepTwoExplainer = doc.data().StepTwoExplainer
                const stepTwoCTA = doc.data().StepTwoCTA
                const stepThreePreview = doc.data().StepThreePreview
                const stepThreeTitle = doc.data().StepThreeTitle
                const stepThreeExplainer = doc.data().StepThreeExplainer
                const stepThreeCTA = doc.data().StepThreeCTA
                const stepFourPreview = doc.data().StepFourPreview
                const stepFourTitle = doc.data().StepFourTitle
                const stepFourExplainer = doc.data().StepFourExplainer
                const stepFourCTA = doc.data().StepFourCTA
                const stepFivePreview = doc.data().StepFivePreview
                const stepFiveTitle = doc.data().StepFiveTitle
                const stepFiveExplainer = doc.data().StepFiveExplainer
                const stepFiveCTA = doc.data().StepFiveCTA
                const stepSixPreview = doc.data().StepSixPreview
                const stepSixTitle = doc.data().StepSixTitle
                const stepSixExplainer = doc.data().StepSixExplainer
                const stepSixCTA = doc.data().StepSixCTA
                const stepSevenPreview = doc.data().StepSevenPreview
                const stepSevenTitle = doc.data().StepSevenTitle
                const stepSevenExplainer = doc.data().StepSevenExplainer
                const stepSevenCTA = doc.data().StepSevenCTA
                const stepEightPreview = doc.data().StepEightPreview
                const stepEightTitle = doc.data().StepEightTitle
                const stepEightExplainer = doc.data().StepEightExplainer
                const stepEightCTA = doc.data().StepEightCTA
                const stepNinePreview = doc.data().StepNinePreview
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
                const workshopGoal = doc.data().Goal

                // Load workshop title
                const workshopTitleDOM = document.getElementById("workshop-title")

                workshopTitleDOM.value = title

                // Load selected header image 
                const uploadHeaderImage = document.getElementById("selected-header-img")

                    uploadHeaderImage.src = headerImg

                // Load workshop title
 
                tinyMCE.get('editor1').setContent(workshopGoals)

                // Load workshop goal
                const selectGoal = document.getElementById("select-goel-workshop")

                const options = selectGoal.options

                const optionsArray = Array.from(options)

                optionsArray.forEach(opt => {

                    if(opt.innerHTML == workshopGoal){

                        selectGoal.value = opt.innerHTML
                    }
                })

                // Load workshop price
                const priceDOM = document.getElementById("workshop-price")

                priceDOM.value = workshopPrice

                // Load step content

                function loadSteps(dbTitle,buttonID,DOMtitleID, editorA, editorB, editorC, setContentA, setContentB, setContentC, innerDiv ){
                    if(dbTitle != ""){
                        const button = document.getElementById(buttonID)
        
                        button.click()
                        button.style.display = "none"
                    };

                    const DOMtitle = document.getElementById(DOMtitleID)
                    tinyMCE.get(editorA).setContent(setContentA)
                    tinyMCE.get(editorB).setContent(setContentB)
                    tinyMCE.get(editorC).setContent(setContentC)
    
                    DOMtitle.value = dbTitle
    
                    const innerDivDOM = document.getElementById(innerDiv)
                    innerDivDOM.setAttribute("data-title", dbTitle)
                    innerDivDOM.setAttribute("data-explainer", setContentB)
                    innerDivDOM.setAttribute("data-cta", setContentC)
                
                };

                loadSteps(stepOneTitle, "button-step-one", "step-one-title", 'editor2', 'editor3', 'editor4', stepOnePreview, stepOneExplainer, stepOneCTA, "step-one-inner-div")
                loadSteps(stepTwoTitle, "button-step-two", "step-two-title", 'editor-preview-step-two', 'editor5', 'editor6', stepTwoPreview, stepTwoExplainer, stepTwoCTA, "step-two-inner-div")
                loadSteps(stepThreeTitle, "button-step-three", "step-three-title", 'editor-preview-step-three', 'editor7', 'editor8', stepThreePreview, stepThreeExplainer, stepThreeCTA, "step-three-inner-div")
                loadSteps(stepFourTitle, "button-step-four", "step-four-title", 'editor-preview-step-four', 'editor9', 'editor10', stepFourPreview, stepFourExplainer, stepFourCTA, "step-four-inner-div")
                loadSteps(stepFiveTitle, "button-step-five", "step-five-title", 'editor-preview-step-five', 'editor11', 'editor12', stepFivePreview, stepFiveExplainer, stepFiveCTA, "step-five-inner-div")
                loadSteps(stepSixTitle, "button-step-six", "step-six-title", 'editor-preview-step-six', 'editor13', 'editor14', stepSixPreview, stepSixExplainer, stepSixCTA, "step-six-inner-div" )
                loadSteps(stepSevenTitle, "button-step-seven", "step-seven-title", 'editor-preview-step-seven', 'editor15', 'editor16', stepSevenPreview, stepSevenExplainer, stepSevenCTA, "step-seven-inner-div" )
                loadSteps(stepEightTitle, "button-step-eight", "step-eight-title", 'editor-preview-step-eight', 'editor17', 'editor18', stepEightPreview, stepEightExplainer, stepEightCTA, "step-eight-inner-div" )
                loadSteps(stepNineTitle, "button-step-nine", "step-nine-title", 'editor-preview-step-nine', 'editor19', 'editor20', stepNinePreview, stepNineExplainer, stepNineCTA, "step-nine-inner-div" )

                // Load closing
                
                function loadClosing(closingTitle, closingText, createClosing, closingTitleInput, editorClosing){

                    if(closingTitle != "" && closingText != ""){

                        const closingButton = document.getElementById(createClosing)
                            closingButton.click()
    
                        const closingTitleDOM = document.getElementById(closingTitleInput)
                        tinyMCE.get(editorClosing).setContent(closingText)
    
                        closingTitleDOM.value = closingTitle
                    };
                } loadClosing(closingOneTitle, closingOneText, "create-closing-1", "closing-title-input-1", "editor-closing-1")
                loadClosing(closingTwoTitle, closingTwoText, "create-closing-2", "closing-title-input-2", "editor-closing-2")
                loadClosing(closingThreeTitle, closingThreeText, "create-closing-3", "closing-title-input-3", "editor-closing-3")
                loadClosing(closingFourTitle, closingFourText, "create-closing-4", "closing-title-input-4", "editor-closing-4")
                loadClosing(closingFiveTitle, closingFiveText, "create-closing-5", "closing-title-input-5", "editor-closing-5")
                loadClosing(closingSixTitle, closingSixText, "create-closing-6", "closing-title-input-6", "editor-closing-6")
                loadClosing(closingSevenTitle, closingSevenText, "create-closing-7", "closing-title-input-7", "editor-closing-7")
                loadClosing(closingEightTitle, closingEightText, "create-closing-8", "closing-title-input-8", "editor-closing-8")
                loadClosing(closingNineTitle, closingNineText, "create-closing-9", "closing-title-input-9", "editor-closing-9")
                    
            });
        });
    };
}();


//  CREATE WORKSHOP

// Save(set) first set of input to database

let bannerImage = ""

!function uploadBanner(){
    const uploadImageButton = document.getElementById("upload-banner")
    const selectedBannerImage = document.getElementById("selected-header-img")

    if (uploadImageButton != null){
    uploadImageButton.addEventListener("click", () => {

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
                    });                                                
                });
            });
        });
    };
}();

function saveWorkshop(){
    const workshopTitle = document.getElementById("workshop-title").value
    const workshopGoals = tinyMCE.get('editor1').getContent()
    const stepOnePreview = tinyMCE.get('editor2').getContent()

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
     const stepTwoPreview = tinyMCE.get('editor-preview-step-two').getContent()
     const stepTwoTitle =  document.getElementById("step-two-title").value
     const stepTwoExplainer = tinyMCE.get('editor5').getContent()
     const stepTwoCTA = tinyMCE.get('editor6').getContent()

      // Step three
    const stepThreePreview = tinyMCE.get('editor-preview-step-three').getContent()
    const stepThreeTitle =  document.getElementById("step-three-title").value
    const stepThreeExplainer = tinyMCE.get('editor7').getContent()
    const stepThreeCTA = tinyMCE.get('editor8').getContent()

     // Step four
     const stepFourPreview = tinyMCE.get('editor-preview-step-four').getContent()
     const stepFourTitle =  document.getElementById("step-four-title").value
     const stepFourExplainer = tinyMCE.get('editor9').getContent()
     const stepFourCTA = tinyMCE.get('editor10').getContent()

      // Step five
    const stepFivePreview = tinyMCE.get('editor-preview-step-five').getContent()
    const stepFiveTitle =  document.getElementById("step-five-title").value
    const stepFiveExplainer = tinyMCE.get('editor11').getContent()
    const stepFiveCTA = tinyMCE.get('editor12').getContent()

     // Step six
     const stepSixPreview = tinyMCE.get('editor-preview-step-six').getContent()
     const stepSixTitle =  document.getElementById("step-six-title").value
     const stepSixExplainer = tinyMCE.get('editor13').getContent()
     const stepSixCTA = tinyMCE.get('editor14').getContent()

      // Step seven
    const stepSevenPreview = tinyMCE.get('editor-preview-step-seven').getContent()
    const stepSevenTitle =  document.getElementById("step-seven-title").value
    const stepSevenExplainer = tinyMCE.get('editor15').getContent()
    const stepSevenCTA = tinyMCE.get('editor16').getContent()

     // Step eight
     const stepEightPreview = tinyMCE.get('editor-preview-step-eight').getContent()
     const stepEightTitle =  document.getElementById("step-eight-title").value
     const stepEightExplainer = tinyMCE.get('editor17').getContent()
     const stepEightCTA = tinyMCE.get('editor18').getContent()

     // Step nine
     const stepNinePreview = tinyMCE.get('editor-preview-step-nine').getContent()
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

    const saveWorkshopButton = document.getElementById("saveWorkshop")
    const updateWorkshopButton = document.getElementById("updateWorkshop")

    saveWorkshopButton.style.display = "none"
    updateWorkshopButton.style.display = "flex"

    // Save input to database
    auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;

    db.collection("Workshops").doc().set({
        Eigenaar: "Vitaminds",
        Coach: coachNaam,
        Status: "Draft",
        Goal: workshopGoal,
        Price: workshopPrice,
        WorkshopTitle: workshopTitle,
        WorkshopGoals: workshopGoals,
        BannerImage: bannerImage,
        StepOnePreview: stepOnePreview,
        StepOneTitle: stepOneTitle,
        StepOneExplainer: stepOneExplainer,
        StepOneCTA: stepOneCTA,
        StepTwoPreview: stepTwoPreview,
        StepTwoTitle: stepTwoTitle,
        StepTwoExplainer: stepTwoExplainer,
        StepTwoCTA: stepTwoCTA,
        StepThreePreview: stepThreePreview,
        StepThreeTitle: stepThreeTitle,
        StepThreeExplainer: stepThreeExplainer,
        StepThreeCTA: stepThreeCTA,
        StepFourPreview: stepFourPreview,
        StepFourTitle: stepFourTitle,
        StepFourExplainer: stepFourExplainer,
        StepFourCTA: stepFourCTA,
        StepFivePreview: stepFivePreview,
        StepFiveTitle: stepFiveTitle,
        StepFiveExplainer: stepFiveExplainer,
        StepFiveCTA: stepFiveCTA,
        StepSixPreview: stepSixPreview,
        StepSixTitle: stepSixTitle,
        StepSixExplainer: stepSixExplainer,
        StepSixCTA: stepSixCTA,
        StepSevenPreview: stepSevenPreview,
        StepSevenTitle: stepSevenTitle,
        StepSevenExplainer: stepSevenExplainer,
        StepSevenCTA: stepSevenCTA,
        StepEightPreview: stepEightPreview,
        StepEightTitle: stepEightTitle,
        StepEightExplainer: stepEightExplainer,
        StepEightCTA: stepEightCTA,
        StepNinePreview: stepNinePreview,
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
            const previewWorkshop = document.getElementById("preview-workshop")

            previewWorkshop.style.display = "block"
        
            const workshopSavedSetNotification = document.getElementById("workshop-saved-set-notification")
        
            workshopSavedSetNotification.style.display = "block"
        };

// Update input
function updateWorkshop(){
    const workshopTitle = document.getElementById("workshop-title")
    const workshopGoals = tinyMCE.get('editor1').getContent()
    const stepOnePreview = tinyMCE.get('editor2').getContent()
    const selectedBannerImg = document.getElementById("selected-header-img")

        // Workshop goal
        const workshopGoalSelect = document.getElementById("select-goel-workshop")

        const select = workshopGoalSelect.options
        const workshopGoal = select[select.selectedIndex].innerHTML

        //Banner image
        const bannerImageSource = selectedBannerImg.src

        // Price
        const workshopPrice = document.getElementById("workshop-price")

        console.log(workshopPrice.value)

       // Step one
       const stepOneTitle =  document.getElementById("step-one-title").value
       const stepOneExplainer = tinyMCE.get('editor3').getContent()
       const stepOneCTA = tinyMCE.get('editor4').getContent()

        // Step two
        const stepTwoPreview = tinyMCE.get('editor-preview-step-two').getContent()
        const stepTwoTitle =  document.getElementById("step-two-title").value
        const stepTwoExplainer = tinyMCE.get('editor5').getContent()
        const stepTwoCTA = tinyMCE.get('editor6').getContent()

        // Step three
        const stepThreePreview = tinyMCE.get('editor-preview-step-three').getContent()
        const stepThreeTitle =  document.getElementById("step-three-title").value
        const stepThreeExplainer = tinyMCE.get('editor7').getContent()
        const stepThreeCTA = tinyMCE.get('editor8').getContent()

        // Step four
        const stepFourPreview = tinyMCE.get('editor-preview-step-four').getContent()
        const stepFourTitle =  document.getElementById("step-four-title").value
        const stepFourExplainer = tinyMCE.get('editor9').getContent()
        const stepFourCTA = tinyMCE.get('editor10').getContent()

        // Step five
        const stepFivePreview = tinyMCE.get('editor-preview-step-five').getContent()
        const stepFiveTitle =  document.getElementById("step-five-title").value
        const stepFiveExplainer = tinyMCE.get('editor11').getContent()
        const stepFiveCTA = tinyMCE.get('editor12').getContent()

        // Step six
        const stepSixPreview = tinyMCE.get('editor-preview-step-six').getContent()
        const stepSixTitle =  document.getElementById("step-six-title").value
        const stepSixExplainer = tinyMCE.get('editor13').getContent()
        const stepSixCTA = tinyMCE.get('editor14').getContent()

        // Step seven
        const stepSevenPreview = tinyMCE.get('editor-preview-step-seven').getContent()
        const stepSevenTitle =  document.getElementById("step-seven-title").value
        const stepSevenExplainer = tinyMCE.get('editor15').getContent()
        const stepSevenCTA = tinyMCE.get('editor16').getContent()

        // Step eight
        const stepEightPreview = tinyMCE.get('editor-preview-step-eight').getContent()
        const stepEightTitle =  document.getElementById("step-eight-title").value
        const stepEightExplainer = tinyMCE.get('editor17').getContent()
        const stepEightCTA = tinyMCE.get('editor18').getContent()

        // Step nine
        const stepNinePreview = tinyMCE.get('editor-preview-step-nine').getContent()
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

    db.collection("Workshops").where("WorkshopTitle", "==", workshopTitle.value).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("Workshops").doc(doc.id).update({
                Goal: workshopGoal,
                Price: workshopPrice.value,
                WorkshopTitle: workshopTitle.value,
                BannerImage: bannerImageSource,
                WorkshopGoals: workshopGoals,
                StepOnePreview: stepOnePreview,
                StepOneTitle: stepOneTitle,
                StepOneExplainer: stepOneExplainer,
                StepOneCTA: stepOneCTA,
                StepTwoPreview: stepTwoPreview,
                StepTwoTitle: stepTwoTitle,
                StepTwoExplainer: stepTwoExplainer,
                StepTwoCTA: stepTwoCTA,
                StepThreePreview: stepThreePreview,
                StepThreeTitle: stepThreeTitle,
                StepThreeExplainer: stepThreeExplainer,
                StepThreeCTA: stepThreeCTA,
                StepFourPreview: stepFourPreview,
                StepFourTitle: stepFourTitle,
                StepFourExplainer: stepFourExplainer,
                StepFourCTA: stepFourCTA,
                StepFivePreview: stepFivePreview,
                StepFiveTitle: stepFiveTitle,
                StepFiveExplainer: stepFiveExplainer,
                StepFiveCTA: stepFiveCTA,
                StepSixPreview: stepSixPreview,
                StepSixTitle: stepSixTitle,
                StepSixExplainer: stepSixExplainer,
                StepSixCTA: stepSixCTA,
                StepSevenPreview: stepSevenPreview,
                StepSevenTitle: stepSevenTitle,
                StepSevenExplainer: stepSevenExplainer,
                StepSevenCTA: stepSevenCTA,
                StepEightPreview: stepEightPreview,
                StepEightTitle: stepEightTitle,
                StepEightExplainer: stepEightExplainer,
                StepEightCTA: stepEightCTA,
                StepNinePreview: stepNinePreview,
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
        const workshopSavedUpdateNotification = document.getElementById("workshop-saved-updated-notification")

        workshopSavedUpdateNotification.style.display = "block"
    };


// Preview workshop

function previewWorkshop(){
    const workshopTitle = document.getElementById("workshop-title").value

    window.open("../Workshops/" + workshopTitle + ".html", "_blank")
};

// Publish workshop

function publishWorkshop(){

    const workshopTitle = document.getElementById("workshop-title").value

    db.collection("Workshops").where("WorkshopTitle", "==", workshopTitle).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {


            console.log(workshopTitle)
            // db.collection("Workshops").doc(doc.id).update({
            //     Status: "Public"
            // })
        })
    });

    // Notification
    const workshopPublishedNotification = document.getElementById("workshop-published-notification")

    workshopPublishedNotification.style.display = "block"
    
};

// Select workshopgoal
!function selectWorkshopGoal(){

    const select = document.getElementById("select-goel-workshop")

    if(select != null){

    db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const goal = doc.data().Levensvraag

            const option = document.createElement("option")

            option.innerText = goal

            select.appendChild(option)
            });
        });
    };
}();

// Create steps

function createStep(stepInnerDiv, buttonStep){

    const createStep = document.getElementById(buttonStep)

const step = document.getElementById(stepInnerDiv)

if(createStep != null){

createStep.addEventListener("click", () => {
    step.style.display = "flex"
        });
    };
} createStep("step-one-inner-div", "button-step-one")
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

  const closingElem = elem.parentElement.parentElement.nextElementSibling.style.display = "flex" 
}

// Delete

function deleteStep1(ele){

    const workshopTitle = document.getElementById("workshop-title").value

    auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;


    db.collection("Workshops").where("WorkshopTitle", "==", workshopTitle).where("Coach", "==", coachNaam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

   db.collection("Workshops").doc(doc.id).update({
    StepOnePreview: "",
    StepOneTitle: "",
    StepOneExplainer: "",
    StepOneCTA: "",
                            }).then(() => {
                                location.reload()
                        });
                    });
                });
            });
        };
    });
};


function deleteStep2(ele){

    auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;

    globalTitle.forEach(title => {

    db.collection("Workshops").where("WorkshopTitle", "==", title).where("Coach", "==", coachNaam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

   db.collection("Workshops").doc(doc.id).update({
    StepTwoTitle: "",
    StepTwoExplainer: "",
    StepTwoCTA: "",
                            });
                        });
                    });
                });
            // }).then(() => {
            //     location.reload()
            });
        };
    });
};

function deleteStep3(ele){

    auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;

    globalTitle.forEach(title => {

    db.collection("Workshops").where("WorkshopTitle", "==", title).where("Coach", "==", coachNaam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

   db.collection("Workshops").doc(doc.id).update({
    StepThreeTitle: "",
    StepThreeExplainer: "",
    StepThreeCTA: "",
                            });
                        });
                    });
                });
            // }).then(() => {
            //     location.reload()
            });
        };
    });
};

function deleteStep4(ele){

    auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;

    globalTitle.forEach(title => {

    db.collection("Workshops").where("WorkshopTitle", "==", title).where("Coach", "==", coachNaam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

   db.collection("Workshops").doc(doc.id).update({
    StepFourTitle: "",
    StepFourExplainer: "",
    StepFourCTA: "",
                            });
                        });
                    });
                });
            // }).then(() => {
            //     location.reload()
            });
        };
    });
};

function deleteStep5(ele){

    auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;

    globalTitle.forEach(title => {

    db.collection("Workshops").where("WorkshopTitle", "==", title).where("Coach", "==", coachNaam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

   db.collection("Workshops").doc(doc.id).update({
    StepFiveTitle: "",
    StepFiveExplainer: "",
    StepFiveCTA: "",
                            });
                        });
                    });
                });
            // }).then(() => {
            //     location.reload()
            });
        };
    });
};

function deleteStep6(ele){

    auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;

    globalTitle.forEach(title => {

    db.collection("Workshops").where("WorkshopTitle", "==", title).where("Coach", "==", coachNaam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

   db.collection("Workshops").doc(doc.id).update({
    StepSixTitle: "",
    StepSixExplainer: "",
    StepSixCTA: "",
                            });
                        });
                    });
                });
            // }).then(() => {
            //     location.reload()
            });
        };
    });
};

function deleteStep7(ele){

    auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;

    globalTitle.forEach(title => {

    db.collection("Workshops").where("WorkshopTitle", "==", title).where("Coach", "==", coachNaam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

   db.collection("Workshops").doc(doc.id).update({
    StepSevenTitle: "",
    StepSevenExplainer: "",
    StepSevenCTA: "",
                            });
                        });
                    });
                });
            // }).then(() => {
            //     location.reload()
            });
        };
    });
};

function deleteStep8(ele){

    auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;

    globalTitle.forEach(title => {

    db.collection("Workshops").where("WorkshopTitle", "==", title).where("Coach", "==", coachNaam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

   db.collection("Workshops").doc(doc.id).update({
    StepEightTitle: "",
    StepEightExplainer: "",
    StepEightCTA: "",
                            });
                        });
                    });
                });
            // }).then(() => {
            //     location.reload()
            });
        };
    });
};

function deleteStep9(ele){

    auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;

    globalTitle.forEach(title => {

    db.collection("Workshops").where("WorkshopTitle", "==", title).where("Coach", "==", coachNaam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

   db.collection("Workshops").doc(doc.id).update({
    StepNineTitle: "",
    StepNineExplainer: "",
    StepNineCTA: "",
                            });
                        });
                    });
                });
            // }).then(() => {
            //     location.reload()
            });
        };
    });
};

function deleteClosing(ele){

    auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;

    globalTitle.forEach(title => {

    db.collection("Workshops").where("WorkshopTitle", "==", title).where("Coach", "==", coachNaam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

   db.collection("Workshops").doc(doc.id).update({
    ClosingDivId: "",
    ClosingText: "",
    ClosingTitle: "",
                            })
                        });
                    });
                });
            }).then(() => {
                location.reload()
            });
        };
    });
};
