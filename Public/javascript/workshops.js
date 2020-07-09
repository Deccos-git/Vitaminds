// Global title

const globalTitle = []

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

// Workshop overview page

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

// Workshops loaded from database

db.collection("Workshops").where("Status", "==", "Public").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().WorkshopTitle
        const coach = doc.data().Coach
        const headerImg = doc.data().HeaderImage

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
                const buttonDiv = document.createElement("div")
                const button = document.createElement("button")
                    button.setAttribute("class", "button-algemeen")
                    button.setAttribute("onclick", "openWorkshop(this)")

                img.src = headerImg
                coachPic.src = profilePic
                titleH3.innerText = title
                button.innerText = "Bekijk"

                DOM.appendChild(innerDiv)
                innerDiv.appendChild(header)
                header.appendChild(img)
                innerDiv.appendChild(coachPicDiv)
                coachPicDiv.appendChild(coachPic)
                innerDiv.appendChild(titleH3)
                innerDiv.appendChild(buttonDiv)
                buttonDiv.appendChild(button)

            })
        });
    })
});

// Open workshops after onclick

function openWorkshop(elem){

    divTitle = elem.parentElement.previousElementSibling.innerText

    window.open("../Workshops/" + divTitle + ".html", "_self")

}

// Individual workshop page

function askMe(){

    db.collection("Workshops").where("WorkshopTitle", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
    
            const coach = doc.data().Coach

            window.open("../Vitaminders/" + coach, " _blank");

        })
    });
};

db.collection("Workshops").where("WorkshopTitle", "==", titel).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().WorkshopTitle
        const coach = doc.data().Coach
        const headerImg = doc.data().HeaderImage
        const workshopGoals = doc.data().WorkshopGoals
        const stepOneTitle = doc.data().StepOneTitle
        const stepTwoTitle = doc.data().StepTwoTitle
        const stepThreeTitle = doc.data().StepThreeTitle
        const stepFourTitle = doc.data().StepFourTitle
        const stepFiveTitle = doc.data().StepFiveTitle
        const stepSixTitle = doc.data().StepSixTitle
        const stepSevenTitle = doc.data().StepSevenTitle
        const stepEightTitle = doc.data().StepEightTitle
        const stepOneIntroduction = doc.data().StepOnePreview
        const stepTwoIntroduction = doc.data().StepTwoPreview
        const stepThreeIntroduction = doc.data().StepThreePreview
        const stepFourIntroduction = doc.data().StepFourPreview
        const stepFiveIntroduction = doc.data().StepFivePreview
        const stepSixIntroduction = doc.data().StepSixPreview
        const stepSevenIntroduction = doc.data().StepSevenPreview
        const stepEightIntroduction = doc.data().StepEightPreview
        const stepOneExplainer = doc.data().StepOneExplainer
        const stepTwoExplainer = doc.data().StepTwoExplainer
        const stepThreeExplainer = doc.data().StepThreeExplainer
        const stepFourExplainer = doc.data().StepFourExplainer
        const stepFiveExplainer = doc.data().StepFiveExplainer
        const stepSixExplainer = doc.data().StepSixExplainer
        const stepSevenExplainer = doc.data().StepSevenExplainer
        const stepEightExplainer = doc.data().StepEightExplainer
        const stepOneCTA = doc.data().StepOneCTA
        const stepTwoCTA = doc.data().StepTwoCTA
        const stepThreeCTA = doc.data().StepThreeCTA
        const stepFourCTA = doc.data().StepFourCTA
        const stepFiveCTA = doc.data().StepFiveCTA
        const stepSixCTA = doc.data().StepSixCTA
        const stepSevenCTA = doc.data().StepSevenCTA
        const stepEightCTA = doc.data().StepEightCTA
        const closingOneText = doc.data().ClosingOneText 
        const closingOneTitle = doc.data().ClosingOneTitle
        const closingTwoText = doc.data().ClosingTwoText 
        const closingTwoTitle = doc.data().ClosingTwoTitle
        const closingThreeText = doc.data().ClosingThreeText 
        const closingThreeTitle = doc.data().ClosingThreeTitle
        const closingFourText = doc.data().ClosingFourText 
        const closingFouritle = doc.data().ClosingFourTitle
        const closingFiveText = doc.data().ClosingFiveText 
        const closingFiveTitle = doc.data().ClosingFiveTitle
        const closingSixText = doc.data().ClosingSixText 
        const closingSixTitle = doc.data().ClosingSixTitle
        const closingSevenText = doc.data().ClosingSevenText 
        const closingSevenTitle = doc.data().ClosingSevenTitle
        const closingEightText = doc.data().ClosingEightText 
        const closingEightTitle = doc.data().ClosingEightTitle

        const DOM = document.getElementById("workshop-section")

        // All images responsive

        const workshopSection = document.getElementById("workshop-section")

        const allImg = workshopSection.querySelectorAll("img")

        allImgArray = Array.from(allImg)

        allImgArray.forEach(img => {
            img.style.height = "100%"
            img.style.width = "100%"
        })

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
                const stepsOverview = document.getElementById("steps-overview")
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

                const stepOneIntroductionDiv = document.createElement("div")
                    stepOneIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepOneIntroductionTitle = document.createElement("h3")
                const stepOneIntroductionP = document.createElement("p")
                const stepOneIntroductionButton = document.createElement("button")
                    stepOneIntroductionButton.setAttribute("class", "button-algemeen")
                    stepOneIntroductionButton.setAttribute("id", "step-one-button")
                    stepOneIntroductionButton.setAttribute("onclick", "saveSet()")      

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
                    const closingButton = document.createElement("button")
                    closingButton.setAttribute("id", "closing-button")
                    closingButton.setAttribute("onclick", "saveClosing()")

                    saveButtonDiv.appendChild(saveOneButton)
                    saveButtonDiv.appendChild(saveTwoButton)
                    saveButtonDiv.appendChild(saveThreeButton)
                    saveButtonDiv.appendChild(saveFourButton)
                    saveButtonDiv.appendChild(saveFiveButton)
                    saveButtonDiv.appendChild(saveSixButton)
                    saveButtonDiv.appendChild(saveSevenButton)
                    saveButtonDiv.appendChild(saveEightButton)
                    saveButtonDiv.appendChild(closingButton)

                    saveOneButton.innerText = "Opslaan(1)"
                    saveTwoButton.innerText = "Opslaan(2)"
                    saveThreeButton.innerText = "Opslaan(3)"
                    saveFourButton.innerText = "Opslaan(4)"
                    saveFiveButton.innerText = "Opslaan(5)"
                    saveSixButton.innerText = "Opslaan(6)"
                    saveSevenButton.innerText = "Opslaan(7)"
                    saveEightButton.innerText = "Opslaan(8)"
                    closingButton.innerText = "Opslaan(closing)"

                    saveOneButton.style.display = "none"
                    saveTwoButton.style.display = "none"
                    saveThreeButton.style.display = "none"
                    saveFourButton.style.display = "none"
                    saveFiveButton.style.display = "none"
                    saveSixButton.style.display = "none"
                    saveSevenButton.style.display = "none"
                    saveEightButton.style.display = "none"
                    closingButton.style.display = "none"

                toolbarOneCount.innerText = "1"
                toolbarTwoCount.innerText = "2"
                toolbarThreeCount.innerText = "3"
                toolbarFourCount.innerText = "4"
                toolbarFiveCount.innerText = "5"
                toolbarSixCount.innerText = "6"
                toolbarSevenCount.innerText = "7"
                toolbarEightCount.innerText = "8"

                if(stepOneTitle != ""){
                toolbarOuterDiv.appendChild(toolbarOneDiv)
                toolbarOneDiv.appendChild(toolbarOneCheck)
                toolbarOneCheck.appendChild(toolbarOneCount)
                };

                if(stepTwoTitle != ""){
                toolbarOuterDiv.appendChild(toolbarTwoDiv)
                toolbarTwoDiv.appendChild(toolbarTwoCheck)
                toolbarTwoCheck.appendChild(toolbarTwoCount)
                };

                if(stepThreeTitle != ""){
                toolbarOuterDiv.appendChild(toolbarThreeDiv)
                toolbarThreeDiv.appendChild(toolbarThreeCheck)
                toolbarThreeCheck.appendChild(toolbarThreeCount)
                };

                if(stepFourTitle != ""){
                toolbarOuterDiv.appendChild(toolbarFourDiv)
                toolbarFourDiv.appendChild(toolbarFourCheck)
                toolbarFourCheck.appendChild(toolbarFourCount)
                };

                if(stepFiveTitle != ""){
                toolbarOuterDiv.appendChild(toolbarFiveDiv)
                toolbarFiveDiv.appendChild(toolbarFiveCheck)
                toolbarFiveCheck.appendChild(toolbarFiveCount)
                };

                if(stepSixTitle != ""){
                toolbarOuterDiv.appendChild(toolbarSixDiv)
                toolbarSixDiv.appendChild(toolbarSixCheck)
                toolbarSixCheck.appendChild(toolbarSixCount)
                };

                if(stepSevenTitle != ""){
                toolbarOuterDiv.appendChild(toolbarSevenDiv)
                toolbarSevenDiv.appendChild(toolbarSevenCheck)
                toolbarSevenCheck.appendChild(toolbarSevenCount)
                };

                if(stepEightTitle != ""){
                toolbarOuterDiv.appendChild(toolbarEightDiv)
                toolbarEightDiv.appendChild(toolbarEightCheck)
                toolbarEightCheck.appendChild(toolbarEightCount)
                };

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

                // Step overview
                
                if(stepOneTitle != ""){
                    stepOneTitleP.innerText = `Stap 1: ${stepOneTitle}`
                stepsOverview.appendChild(stepOnePreviewDiv)
                stepOnePreviewDiv.appendChild(stepOneCheck)
                stepOnePreviewDiv.appendChild(stepOneTitleP)
                }

                if(stepTwoTitle != ""){
                    stepTwoTitleP.innerText = `Stap 2: ${stepTwoTitle}`
                stepsOverview.appendChild(stepTwoPreviewDiv)
                stepTwoPreviewDiv.appendChild(stepTwoCheck)
                stepTwoPreviewDiv.appendChild(stepTwoTitleP)
                }

                if(stepThreeTitle != ""){
                    stepThreeTitleP.innerText = `Stap 3: ${stepThreeTitle}`
                stepsOverview.appendChild(stepThreePreviewDiv)
                stepThreePreviewDiv.appendChild(stepThreeCheck)
                stepThreePreviewDiv.appendChild(stepThreeTitleP)
                }

                if(stepFourTitle != ""){
                    stepFourTitleP.innerText = `Stap 4: ${stepFourTitle}`
                stepsOverview.appendChild(stepFourPreviewDiv)
                stepFourPreviewDiv.appendChild(stepFourCheck)
                stepFourPreviewDiv.appendChild(stepFourTitleP)
                }

                if(stepFiveTitle != ""){
                    stepFiveTitleP.innerText = `Stap 5: ${stepFiveTitle}`
                stepsOverview.appendChild(stepFivePreviewDiv)
                stepFivePreviewDiv.appendChild(stepFiveCheck)
                stepFivePreviewDiv.appendChild(stepFiveTitleP)
                }

                if(stepSixTitle != ""){
                    stepSixTitleP.innerText = `Stap 6: ${stepSixTitle}`
                stepsOverview.appendChild(stepSixPreviewDiv)
                stepSixPreviewDiv.appendChild(stepSixCheck)
                stepSixPreviewDiv.appendChild(stepSixTitleP)
                }

                if(stepSevenTitle != ""){
                    stepSevenTitleP.innerText = `Stap 7: ${stepSevenTitle}`
                stepsOverview.appendChild(stepSevenPreviewDiv)
                stepSevenPreviewDiv.appendChild(stepSevenCheck)
                stepSevenPreviewDiv.appendChild(stepSevenTitleP)
                }

                if(stepEightTitle != ""){
                    stepEightTitleP.innerText = `Stap 8: ${stepEightTitle}`
                stepsOverview.appendChild(stepEightPreviewDiv)
                stepEightPreviewDiv.appendChild(stepEightCheck)
                stepEightPreviewDiv.appendChild(stepEightTitleP)
                }

                // Step one introduction
                if(stepOneTitle != ""){
                    stepOneIntroductionTitle.innerText = "Zet de eerste stap"
                    stepOneIntroductionP.innerText = stepOneIntroduction
                    stepOneIntroductionButton.innerText = "Zet de eerste stap"
                    DOM.appendChild(stepOneIntroductionTitle)
                    DOM.appendChild(stepOneIntroductionDiv)
                    stepOneIntroductionDiv.appendChild(stepOneIntroductionP)
                    stepOneIntroductionDiv.appendChild(stepOneIntroductionButton)
                }    

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
                        const stepOneCTATitle = document.createElement("h3")
                        const stepOneCTAP = document.createElement("p")
                        const stepOneInput = document.createElement("textarea")
                            stepOneInput.setAttribute("rows", "10")
                            stepOneInput.setAttribute("cols", "30")
                            stepOneInput.setAttribute("placeholder", "Wat heb je geleerd?")
                            stepOneInput.setAttribute("id", "step-one-input")  

                        stepOneTitleH2.innerText = stepOneTitle
                        stepOneExplainerP.innerText = stepOneExplainer
                        stepOneCTAP.innerText = stepOneCTA

                        auth.onAuthStateChanged(User =>{
                            if (User){
                        
                            db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                        const auth = doc.data().GebruikersnaamClean
        
                                        stepOneCTATitle.innerText = `Wat heb je over jezelf geleerd, ${auth}?`
        
                                });
                            }; 
                        });
                       
                        DOM.appendChild(stepOneOuterDiv)
                        stepOneOuterDiv.appendChild(stepOneTitleH2)
                        stepOneOuterDiv.appendChild(stepOneExplainerP)
                        stepOneOuterDiv.appendChild(stepOneCTATitle)
                        stepOneOuterDiv.appendChild(stepOneCTAP)
                        stepOneOuterDiv.appendChild(stepOneInput)

                        stepTwoIntroductionTitle.innerText = "Volgende stap"
                        stepTwoIntroductionP.innerText = stepTwoIntroduction
                        stepTwoIntroductionButton.innerText = "Volgende stap"
                        DOM.appendChild(stepTwoIntroductionTitle)
                        DOM.appendChild(stepTwoIntroductionDiv)
                        stepTwoIntroductionDiv.appendChild(stepTwoIntroductionP)
                        stepTwoIntroductionDiv.appendChild(stepTwoIntroductionButton)

                        // Save set

                    const localStorageSaveSet = localStorage.getItem("saveSet")

                    console.log(localStorageSaveSet)

                    if(localStorageSaveSet != "Set"){

                    auth.onAuthStateChanged(User =>{
                        if (User){

                            db.collection("Vitaminders").doc(User.uid).get().then(doc1 => {
                                const name = doc1.data().Gebruikersnaam
                    
                        db.collection("Vitaminders").doc(User.uid).collection("Workshops").doc().set({
                            Workshop: titel,
                            Gebruikersnaam: name,
                            StepOneInput: "",
                            StepTwoInput: "",
                            StepThreeInput: "",
                            StepFourInput: "",
                            StepFiveInput: "",
                            StepSixInput: "",
                            StepSevenInput: "",
                            StepEightInput: "",
                            ClosingInput: "",
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                        });
                                    });
                                };
                            });

                    localStorage.setItem("saveSet", "Set")

                        };
                    })
                };

                  // Load step two
                  stepTwoIntroductionButton.addEventListener("click", () => {
                  if(stepTwoTitle != ""){

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
                        const stepTwoCTATitle = document.createElement("h3")
                        const stepTwoCTAP = document.createElement("p")
                        const stepTwoInput = document.createElement("textarea")
                            stepTwoInput.setAttribute("rows", "10")
                            stepTwoInput.setAttribute("cols", "30")
                            stepTwoInput.setAttribute("placeholder", "Wat heb je geleerd?")
                            stepTwoInput.setAttribute("id", "step-two-input")

                        stepTwoTitleH2.innerText = stepTwoTitle
                        stepTwoExplainerP.innerText = stepTwoExplainer
                        stepTwoCTAP.innerText = stepTwoCTA

                        auth.onAuthStateChanged(User =>{
                            if (User){
                        
                            db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                        const auth = doc.data().GebruikersnaamClean
        
                                        stepTwoCTATitle.innerText = `Wat heb je over jezelf geleerd, ${auth}?`
        
                                });
                            }; 
                        });
                       
                        DOM.appendChild(stepTwoOuterDiv)
                        stepTwoOuterDiv.appendChild(stepTwoTitleH2)
                        stepTwoOuterDiv.appendChild(stepTwoExplainerP)
                        stepTwoOuterDiv.appendChild(stepTwoCTATitle)
                        stepTwoOuterDiv.appendChild(stepTwoCTAP)
                        stepTwoOuterDiv.appendChild(stepTwoInput)

                        stepThreeIntroductionTitle.innerText = "Volgende stap"
                        stepThreeIntroductionP.innerText = stepThreeIntroduction
                        stepThreeIntroductionButton.innerText = "Volgende stap"
                        DOM.appendChild(stepThreeIntroductionTitle)
                        DOM.appendChild(stepThreeIntroductionDiv)
                        stepThreeIntroductionDiv.appendChild(stepThreeIntroductionP)
                        stepThreeIntroductionDiv.appendChild(stepThreeIntroductionButton)
                    
                } else {
                    toolbarOneCount.innerText = "V"
                    toolbarOneCheck.style.backgroundColor = "white"
                    toolbarOneCount.style.color = "#008e8e"

                    closingDiv.style.display = "flex"

                    closingButton.style.display = "block"
                    stepOneButton.style.display = "none"

                    const closingTitleH3 = document.createElement("h3")
                    const closingTextP = document.createElement("p")
                    const closingInputTitle = document.createElement("h3")
                    const closingInput = document.createElement("textarea")
                        closingInput.setAttribute("rows", "10")
                        closingInput.setAttribute("cols", "30")
                        closingInput.setAttribute("placeholder", "Wat vond je van de workshop?")
                        closingInput.setAttribute("id", "closing-input")
                   
                    closingTitleH3.innerText = closingOneTitle
                    closingTextP.innerText = closingOneText

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
                            const stepThreeCTATitle = document.createElement("h3")
                            const stepThreeCTAP = document.createElement("p")
                            const stepThreeInput = document.createElement("textarea")
                                stepThreeInput.setAttribute("rows", "10")
                                stepThreeInput.setAttribute("cols", "30")
                                stepThreeInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                stepThreeInput.setAttribute("id", "step-three-input")
    
                            stepThreeTitleH2.innerText = stepThreeTitle
                            stepThreeExplainerP.innerText = stepThreeExplainer
                            stepThreeCTAP.innerText = stepThreeCTA
    
                            auth.onAuthStateChanged(User =>{
                                if (User){
                            
                                db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                            const auth = doc.data().GebruikersnaamClean
            
                                            stepThreeCTATitle.innerText = `Wat heb je over jezelf geleerd, ${auth}?`
            
                                    });
                                }; 
                            });
                           
                            DOM.appendChild(stepThreeOuterDiv)
                            stepThreeOuterDiv.appendChild(stepThreeTitleH2)
                            stepThreeOuterDiv.appendChild(stepThreeExplainerP)
                            stepThreeOuterDiv.appendChild(stepThreeCTATitle)
                            stepThreeOuterDiv.appendChild(stepThreeCTAP)
                            stepThreeOuterDiv.appendChild(stepThreeInput)
    
                            stepFourIntroductionTitle.innerText = "Volgende stap"
                            stepFourIntroductionP.innerText = stepFourIntroduction
                            stepFourIntroductionButton.innerText = "Volgende stap"
                            DOM.appendChild(stepFourIntroductionTitle)
                            DOM.appendChild(stepFourIntroductionDiv)
                            stepFourIntroductionDiv.appendChild(stepFourIntroductionP)
                            stepFourIntroductionDiv.appendChild(stepFourIntroductionButton)
                            } else {
                                toolbarTwoCount.innerText = "V"
                                toolbarTwoCheck.style.backgroundColor = "white"
                                toolbarTwoCount.style.color = "#008e8e"
    
                                closingDiv.style.display = "flex"

                                closingButton.style.display = "block"
                                stepTwoButton.style.display = "none"
    
                                const closingTitleH3 = document.createElement("h3")
                                const closingTextP = document.createElement("p")
                                const closingInputTitle = document.createElement("h3")
                                const closingInput = document.createElement("textarea")
                                    closingInput.setAttribute("rows", "10")
                                    closingInput.setAttribute("cols", "30")
                                    closingInput.setAttribute("placeholder", "Wat vond je van de workshop?")
                                    closingInput.setAttribute("id", "closing-input")
                               
                                closingTitleH3.innerText = closingTwoTitle
                                closingTextP.innerText = closingTwoText
    
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
                                const stepFourCTATitle = document.createElement("h3")
                                const stepFourCTAP = document.createElement("p")
                                const stepFourInput = document.createElement("textarea")
                                    stepFourInput.setAttribute("rows", "10")
                                    stepFourInput.setAttribute("cols", "30")
                                    stepFourInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                    stepFourInput.setAttribute("id", "step-four-input")
        
                                stepFourTitleH2.innerText = stepFourTitle
                                stepFourExplainerP.innerText = stepFourExplainer
                                stepFourCTAP.innerText = stepFourCTA
        
                                auth.onAuthStateChanged(User =>{
                                    if (User){
                                
                                    db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                const auth = doc.data().GebruikersnaamClean
                
                                                stepFourCTATitle.innerText = `Wat heb je over jezelf geleerd, ${auth}?`
                
                                        });
                                    }; 
                                });
                               
                                DOM.appendChild(stepFourOuterDiv)
                                stepFourOuterDiv.appendChild(stepFourTitleH2)
                                stepFourOuterDiv.appendChild(stepFourExplainerP)
                                stepFourOuterDiv.appendChild(stepFourCTATitle)
                                stepFourOuterDiv.appendChild(stepFourCTAP)
                                stepFourOuterDiv.appendChild(stepFourInput)
        
                                stepFiveIntroductionTitle.innerText = "Volgende stap"
                                stepFiveIntroductionP.innerText = stepFiveIntroduction
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

                            const closingTitleH3 = document.createElement("h3")
                            const closingTextP = document.createElement("p")
                            const closingInputTitle = document.createElement("h3")
                            const closingInput = document.createElement("textarea")
                                closingInput.setAttribute("rows", "10")
                                closingInput.setAttribute("cols", "30")
                                closingInput.setAttribute("placeholder", "Wat vond je van de workshop?")
                                closingInput.setAttribute("id", "closing-input")
                           
                            closingTitleH3.innerText = closingThreeTitle
                            closingTextP.innerText = closingThreeText

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
                                const stepFiveCTATitle = document.createElement("h3")
                                const stepFiveCTAP = document.createElement("p")
                                const stepFiveInput = document.createElement("textarea")
                                    stepFiveInput.setAttribute("rows", "10")
                                    stepFiveInput.setAttribute("cols", "30")
                                    stepFiveInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                    stepFiveInput.setAttribute("id", "step-five-input")
        
                                stepFiveTitleH2.innerText = stepFiveTitle
                                stepFiveExplainerP.innerText = stepFiveExplainer
                                stepFiveCTAP.innerText = stepFiveCTA
        
                                auth.onAuthStateChanged(User =>{
                                    if (User){
                                
                                    db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                const auth = doc.data().GebruikersnaamClean
                
                                                stepFiveCTATitle.innerText = `Wat heb je over jezelf geleerd, ${auth}?`
                
                                        });
                                    }; 
                                });
                               
                                DOM.appendChild(stepFiveOuterDiv)
                                stepFiveOuterDiv.appendChild(stepFiveTitleH2)
                                stepFiveOuterDiv.appendChild(stepFiveExplainerP)
                                stepFiveOuterDiv.appendChild(stepFiveCTATitle)
                                stepFiveOuterDiv.appendChild(stepFiveCTAP)
                                stepFiveOuterDiv.appendChild(stepFiveInput)
        
                                stepSixIntroductionTitle.innerText = "Volgende stap"
                                stepSixIntroductionP.innerText = stepSixIntroduction
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

                            const closingTitleH3 = document.createElement("h3")
                            const closingTextP = document.createElement("p")
                            const closingInputTitle = document.createElement("h3")
                            const closingInput = document.createElement("textarea")
                                closingInput.setAttribute("rows", "10")
                                closingInput.setAttribute("cols", "30")
                                closingInput.setAttribute("placeholder", "Wat vond je van de workshop?")
                                closingInput.setAttribute("id", "closing-input")
                           
                            closingTitleH3.innerText = closingFourTitle
                            closingTextP.innerText = closingFourText

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
                                    const stepSixCTATitle = document.createElement("h3")
                                    const stepSixCTAP = document.createElement("p")
                                    const stepSixInput = document.createElement("textarea")
                                        stepSixInput.setAttribute("rows", "10")
                                        stepSixInput.setAttribute("cols", "30")
                                        stepSixInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                        stepSixInput.setAttribute("id", "step-six-input")
            
                                    stepSixTitleH2.innerText = stepSixTitle
                                    stepSixExplainerP.innerText = stepSixExplainer
                                    stepSixCTAP.innerText = stepSixCTA
            
                                    auth.onAuthStateChanged(User =>{
                                        if (User){
                                    
                                        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                    const auth = doc.data().GebruikersnaamClean
                    
                                                    stepSixCTATitle.innerText = `Wat heb je over jezelf geleerd, ${auth}?`
                    
                                            });
                                        }; 
                                    });
                                   
                                    DOM.appendChild(stepSixOuterDiv)
                                    stepSixOuterDiv.appendChild(stepSixTitleH2)
                                    stepSixOuterDiv.appendChild(stepSixExplainerP)
                                    stepSixOuterDiv.appendChild(stepSixCTATitle)
                                    stepSixOuterDiv.appendChild(stepSixCTAP)
                                    stepSixOuterDiv.appendChild(stepSixInput)
            
                                    stepSevenIntroductionTitle.innerText = "Volgende stap"
                                    stepSevenIntroductionP.innerText = stepSevenIntroduction
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
    
                                const closingTitleH3 = document.createElement("h3")
                                const closingTextP = document.createElement("p")
                                const closingInputTitle = document.createElement("h3")
                                const closingInput = document.createElement("textarea")
                                    closingInput.setAttribute("rows", "10")
                                    closingInput.setAttribute("cols", "30")
                                    closingInput.setAttribute("placeholder", "Wat vond je van de workshop?")
                                    closingInput.setAttribute("id", "closing-input")
                               
                                closingTitleH3.innerText = closingFiveTitle
                                closingTextP.innerText = closingFiveText
    
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
                                    const stepSevenCTATitle = document.createElement("h3")
                                    const stepSevenCTAP = document.createElement("p")
                                    const stepSevenInput = document.createElement("textarea")
                                        stepSevenInput.setAttribute("rows", "10")
                                        stepSevenInput.setAttribute("cols", "30")
                                        stepSevenInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                        stepSevenInput.setAttribute("id", "step-seven-input")
            
                                    stepSevenTitleH2.innerText = stepSevenTitle
                                    stepSevenExplainerP.innerText = stepSevenExplainer
                                    stepSevenCTAP.innerText = stepSevenCTA
            
                                    auth.onAuthStateChanged(User =>{
                                        if (User){
                                    
                                        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                    const auth = doc.data().GebruikersnaamClean
                    
                                                    stepSevenCTATitle.innerText = `Wat heb je over jezelf geleerd, ${auth}?`
                    
                                            });
                                        }; 
                                    });
                                   
                                    DOM.appendChild(stepSevenOuterDiv)
                                    stepSevenOuterDiv.appendChild(stepSevenTitleH2)
                                    stepSevenOuterDiv.appendChild(stepSevenExplainerP)
                                    stepSevenOuterDiv.appendChild(stepSevenCTATitle)
                                    stepSevenOuterDiv.appendChild(stepSevenCTAP)
                                    stepSevenOuterDiv.appendChild(stepSevenInput)
            
                                    stepEightIntroductionTitle.innerText = "Volgende stap"
                                    stepEightIntroductionP.innerText = stepEightIntroduction
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
    
                                const closingTitleH3 = document.createElement("h3")
                                const closingTextP = document.createElement("p")
                                const closingInputTitle = document.createElement("h3")
                                const closingInput = document.createElement("textarea")
                                    closingInput.setAttribute("rows", "10")
                                    closingInput.setAttribute("cols", "30")
                                    closingInput.setAttribute("placeholder", "Wat vond je van de workshop?")
                                    closingInput.setAttribute("id", "closing-input")
                               
                                closingTitleH3.innerText = closingSixTitle
                                closingTextP.innerText = closingSixText
    
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

                         // Load eight seven
                         stepEightIntroductionButton.addEventListener("click", () => {
                            if(stepEightTitle != ""){
                               
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
                                    const stepEightCTATitle = document.createElement("h3")
                                    const stepEightCTAP = document.createElement("p")
                                    const stepEightInput = document.createElement("textarea")
                                        stepEightInput.setAttribute("rows", "10")
                                        stepEightInput.setAttribute("cols", "30")
                                        stepEightInput.setAttribute("placeholder", "Wat heb je geleerd?")
                                        stepEightInput.setAttribute("id", "step-seven-input")
            
                                    stepEightTitleH2.innerText = stepEightTitle
                                    stepEightExplainerP.innerText = stepEightExplainer
                                    stepEightCTAP.innerText = stepEightCTA
            
                                    auth.onAuthStateChanged(User =>{
                                        if (User){
                                    
                                        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                                                    const auth = doc.data().GebruikersnaamClean
                    
                                                    stepEightCTATitle.innerText = `Wat heb je over jezelf geleerd, ${auth}?`
                    
                                            });
                                        }; 
                                    });
                                   
                                    DOM.appendChild(stepEightOuterDiv)
                                    stepEightOuterDiv.appendChild(stepEightTitleH2)
                                    stepEightOuterDiv.appendChild(stepEightExplainerP)
                                    stepEightOuterDiv.appendChild(stepEightCTATitle)
                                    stepEightOuterDiv.appendChild(stepEightCTAP)
                                    stepEightOuterDiv.appendChild(stepEightInput)
            
                                    closingIntroductionTitle.innerText = "Afronden"
                                    closingIntroductionP.innerText = "stepFiveIntroduction"
                                    closingIntroductionButton.innerText = "Afronden"
                                    DOM.appendChild(closingIntroductionTitle)
                                    DOM.appendChild(closingIntroductionDiv)
                                    closingIntroductionDiv.appendChild(closingIntroductionP)
                                    closingIntroductionDiv.appendChild(closingIntroductionButton)
                               
                            } else {
                                toolbarSevenCount.innerText = "V"
                                toolbarSevenCheck.style.backgroundColor = "white"
                                toolbarSevenCount.style.color = "#008e8e"
    
                                closingDiv.style.display = "flex"

                                closingButton.style.display = "block"
                                stepSevenButton.style.display = "none"
    
                                const closingTitleH3 = document.createElement("h3")
                                const closingTextP = document.createElement("p")
                                const closingInputTitle = document.createElement("h3")
                                const closingInput = document.createElement("textarea")
                                    closingInput.setAttribute("rows", "10")
                                    closingInput.setAttribute("cols", "30")
                                    closingInput.setAttribute("placeholder", "Wat vond je van de workshop?")
                                    closingInput.setAttribute("id", "closing-input")
                               
                                closingTitleH3.innerText = closingSevenTitle
                                closingTextP.innerText = closingSevenText
    
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

                        closingIntroductionButton.addEventListener("click", () => {

                            toolbarEightCount.innerText = "V"
                            toolbarEightCheck.style.backgroundColor = "white"
                            toolbarEightCount.style.color = "#008e8e"

                            closingDiv.style.display = "flex"

                            closingButton.style.display = "block"
                            stepEightButton.style.display = "none"

                            const closingTitleH3 = document.createElement("h3")
                            const closingTextP = document.createElement("p")
                            const closingInputTitle = document.createElement("h3")
                            const closingInput = document.createElement("textarea")
                                closingInput.setAttribute("rows", "10")
                                closingInput.setAttribute("cols", "30")
                                closingInput.setAttribute("placeholder", "Wat vond je van de workshop?")
                                closingInput.setAttribute("id", "closing-input")
                            
                            closingTitleH3.innerText = closingEightTitle
                            closingTextP.innerText = closingEightText

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
                                const closingInput = doc.data().ClosingInput

                                const stepOneButton = document.getElementById("step-one-button")

                                if(stepOneInput != ""){

                                    stepOneButton.click()

                                const stepOneInputDOM = document.getElementById("step-one-input")

                                stepOneInputDOM.innerText= stepOneInput

                                toolbarOneCount.innerText = "V"
                                toolbarOneCheck.style.backgroundColor = "white"
                                toolbarOneCount.style.color = "#008e8e"
                                };

                                const stepTwoButton = document.getElementById("step-two-button")

                                if(stepTwoInput != ""){

                                    stepTwoButton.click()

                                const stepTwoInputDOM = document.getElementById("step-two-input")

                                stepTwoInputDOM.innerText= stepTwoInput

                                toolbarTwoCount.innerText = "V"
                                toolbarTwoCheck.style.backgroundColor = "white"
                                toolbarTwoCount.style.color = "#008e8e"
                                };

                                const stepThreeButton = document.getElementById("step-three-button")

                                if(stepThreeInput != ""){

                                    stepThreeButton.click()

                                const stepThreeInputDOM = document.getElementById("step-three-input")

                                stepThreeInputDOM.innerText= stepThreeInput

                                toolbarThreeCount.innerText = "V"
                                toolbarThreeCheck.style.backgroundColor = "white"
                                toolbarThreeCount.style.color = "#008e8e"
                                };

                                const stepFourButton = document.getElementById("step-four-button")

                                if(stepFourInput != ""){

                                    stepFourButton.click()

                                const stepFourInputDOM = document.getElementById("step-four-input")

                                stepFourInputDOM.innerText= stepFourInput

                                toolbarFourCount.innerText = "V"
                                toolbarFourCheck.style.backgroundColor = "white"
                                toolbarFourCount.style.color = "#008e8e"
                                };

                                const stepFiveButton = document.getElementById("step-five-button")

                                if(stepFiveInput != ""){

                                    stepFiveButton.click()

                                const stepFiveInputDOM = document.getElementById("step-five-input")

                                stepFiveInputDOM.innerText= stepFiveInput

                                toolbarFiveCount.innerText = "V"
                                toolbarFiveCheck.style.backgroundColor = "white"
                                toolbarFiveCount.style.color = "#008e8e"
                                };

                                const stepSixButton = document.getElementById("step-six-button")

                                if(stepSixInput != ""){

                                    stepSixButton.click()

                                const stepSixInputDOM = document.getElementById("step-six-input")

                                stepSixInputDOM.innerText= stepSixInput

                                toolbarSixCount.innerText = "V"
                                toolbarSixCheck.style.backgroundColor = "white"
                                toolbarSixCount.style.color = "#008e8e"
                                };

                                const stepSevenButton = document.getElementById("step-seven-button")

                                if(stepSevenInput != ""){

                                    stepSevenButton.click()

                                const stepSevenInputDOM = document.getElementById("step-seven-input")

                                stepSevenInputDOM.innerText= stepSevenInput

                                toolbarSevenCount.innerText = "V"
                                toolbarSevenCheck.style.backgroundColor = "white"
                                toolbarSevenCount.style.color = "#008e8e"
                                };

                                const stepEightButton = document.getElementById("step-eight-button")

                                if(stepEightInput != ""){

                                    stepEightButton.click()

                                const stepEightInputDOM = document.getElementById("step-eight-input")

                                stepEightInputDOM.innerText= stepEightInput

                                toolbarEightCount.innerText = "V"
                                toolbarEightCheck.style.backgroundColor = "white"
                                toolbarEightCount.style.color = "#008e8e"
                                };

                                const closingButton = document.getElementById("closing-button")

                                if(closingInput != ""){

                                    closingButton.click()

                                const closingInputDOM = document.getElementById("closing-input")

                                closingInputDOM.innerText= closingInput

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


// Create new or edit excisting workshop
const inputNew = document.getElementById("edit-workshop")

auth.onAuthStateChanged(User =>{
    if (User){

    db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                const coachNaam = doc.data().Gebruikersnaam;

db.collection("Workshops").where("Coach", "==", coachNaam).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().WorkshopTitle

        const option = document.createElement("option")

        option.innerHTML = title

        inputNew.appendChild(option)

                });
            });
        });
    };
});

// Catch selected workshop or new workshop

const createNewWorkshopOuterDiv = document.getElementById("create-new-workshop-outer-div")

function selectNewOrEdit(){
    const options = inputNew.options
    const selected = options[options.selectedIndex].innerHTML

    globalTitle.push(selected)

    const toolBar = document.getElementById("create-workshop-tool-bar")
    const editOrNewOuterDiv = document.getElementById("edit-or-new-outer-div")

    editOrNewOuterDiv.style.display = "none"

    if(selected == "Nieuwe workshop creeren"){

        createNewWorkshopOuterDiv.style.display = "flex"
        toolBar.style.display = "flex"
    }else{
        createNewWorkshopOuterDiv.style.display = "flex"
        toolBar.style.display = "flex"

        const previewButton = document.getElementById("preview-workshop")

        previewButton.style.display = "block"

        const saveWorkshop = document.getElementById("saveWorkshop")
        const updateWorkshop = document.getElementById("updateWorkshop")

        saveWorkshop.style.display = "none"
        updateWorkshop.style.display = "block"

        auth.onAuthStateChanged(User =>{
            if (User){
    
            db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                        const coachNaam = doc.data().Gebruikersnaam;

        db.collection("Workshops").where("WorkshopTitle", "==", selected).where("Coach", "==", coachNaam).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
        
                const title = doc.data().WorkshopTitle
                const workshopGoals = doc.data().WorkshopGoals
                const stepOnePreview = doc.data().StepOnePreview
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
                const closingDivId = doc.data().ClosingDivId
                const closingDivTitle = doc.data().ClosingTitle
                const closingDivText = doc.data().ClosingText
                
                // Load workshop content
                const DOMtitle = document.getElementById("workshop-title")
                DOMtitle.value = title
                tinyMCE.get('editor1').setContent(workshopGoals)

                // Load step one content
                if(stepOneTitle != ""){
                const buttonStepOne = document.getElementById("button-step-one")

                buttonStepOne.click()
                buttonStepOne.style.display = "none"
                };
        
                const DOMtitelStepOne = document.getElementById("step-one-title")
                tinyMCE.get('editor2').setContent(stepOnePreview)
                tinyMCE.get('editor3').setContent(stepOneExplainer)
                tinyMCE.get('editor4').setContent(stepOneCTA)

                DOMtitelStepOne.value = stepOneTitle

                const innerDivOne = document.getElementById("step-one-inner-div")
                innerDivOne.setAttribute("data-title", stepOneTitle)
                innerDivOne.setAttribute("data-explainer", stepOneExplainer)
                innerDivOne.setAttribute("data-cta", stepOneCTA)

                // Load step two content
                if(stepTwoTitle != ""){
                const addOrCloseDivTwo = document.getElementById("add-step-or-finish-two")
                const buttonStepTwo = document.getElementById("button-step-two")

                buttonStepTwo.click()
                buttonStepTwo.style.display = "none"
                };
        
                const DOMtitelStepTwo = document.getElementById("step-two-title")
                tinyMCE.get('editor5').setContent(stepTwoExplainer)
                tinyMCE.get('editor6').setContent(stepTwoCTA)

                DOMtitelStepTwo.value = stepTwoTitle

                const innerDivTwo = document.getElementById("step-two-inner-div")
                innerDivTwo.setAttribute("data-title", stepTwoTitle)
                innerDivTwo.setAttribute("data-explainer", stepTwoExplainer)
                innerDivTwo.setAttribute("data-cta", stepTwoCTA)

                // Load step three content
                if(stepThreeTitle != ""){
                const addOrCloseDivThree = document.getElementById("add-step-or-finish-three")
                const buttonStepThree = document.getElementById("button-step-three")

                buttonStepThree.click()
                buttonStepThree.style.display = "none"
                };
              
                const DOMtitelStepThree = document.getElementById("step-three-title")
                tinyMCE.get('editor7').setContent(stepThreeExplainer)
                tinyMCE.get('editor8').setContent(stepThreeCTA)

                DOMtitelStepThree.value = stepThreeTitle

                const innerDivThree = document.getElementById("step-three-inner-div")
                innerDivThree.setAttribute("data-title", stepThreeTitle)
                innerDivThree.setAttribute("data-explainer", stepThreeExplainer)
                innerDivThree.setAttribute("data-cta", stepThreeCTA)

                // Load step four content
                if(stepFourTitle!= ""){
                const addOrCloseDivFour = document.getElementById("add-step-or-finish-four")
                const buttonStepFour = document.getElementById("button-step-four")

                buttonStepFour.click()
                buttonStepFour.style.display = "none"
                };
            
                const DOMtitelStepFour = document.getElementById("step-four-title")
                tinyMCE.get('editor9').setContent(stepFourExplainer)
                tinyMCE.get('editor10').setContent(stepFourCTA)

                DOMtitelStepFour.value = stepFourTitle

                const innerDivFour = document.getElementById("step-four-inner-div")
                innerDivFour.setAttribute("data-title", stepFourTitle)
                innerDivFour.setAttribute("data-explainer", stepFourExplainer)
                innerDivFour.setAttribute("data-cta", stepFourCTA)

                // Load step five content
                if(stepFiveTitle != ""){
                const addOrCloseDivFive = document.getElementById("add-step-or-finish-five")
                const buttonStepFive = document.getElementById("button-step-five")

                buttonStepFive.click()
                buttonStepFive.style.display = "none"
                };
            
                const DOMtitelStepFive = document.getElementById("step-five-title")
                tinyMCE.get('editor11').setContent(stepFiveExplainer)
                tinyMCE.get('editor12').setContent(stepFiveCTA)

                DOMtitelStepFive.value = stepFiveTitle

                const innerDivFive = document.getElementById("step-five-inner-div")
                innerDivFive.setAttribute("data-title", stepFiveTitle)
                innerDivFive.setAttribute("data-explainer", stepFiveExplainer)
                innerDivFive.setAttribute("data-cta", stepFiveCTA)

                // Load step six content
                if(stepSixTitle != ""){
                const addOrCloseDivSix = document.getElementById("add-step-or-finish-six")
                const buttonStepSix = document.getElementById("button-step-six")

                buttonStepSix.click()
                buttonStepSix.style.display = "none"
                };
            
                const DOMtitelStepSix = document.getElementById("step-six-title")
                tinyMCE.get('editor13').setContent(stepSixExplainer)
                tinyMCE.get('editor14').setContent(stepSixCTA)

                DOMtitelStepSix.value = stepSixTitle

                const innerDivSix = document.getElementById("step-six-inner-div")
                innerDivSix.setAttribute("data-title", stepSixTitle)
                innerDivSix.setAttribute("data-explainer", stepSixExplainer)
                innerDivSix.setAttribute("data-cta", stepSixCTA)

                // Load step seven content
                if(stepSevenTitle !=""){
                const addOrCloseDivSeven = document.getElementById("add-step-or-finish-seven")
                const buttonStepSeven = document.getElementById("button-step-seven")

                buttonStepSeven.click()
                buttonStepSeven.style.display = "none"
                };
            
                const DOMtitelStepSeven = document.getElementById("step-seven-title")
                tinyMCE.get('editor15').setContent(stepSevenExplainer)
                tinyMCE.get('editor16').setContent(stepSevenCTA)

                DOMtitelStepSeven.value = stepSevenTitle

                const innerDivSeven = document.getElementById("step-seven-inner-div")
                innerDivSeven.setAttribute("data-title", stepSevenTitle)
                innerDivSeven.setAttribute("data-explainer", stepSevenExplainer)
                innerDivSeven.setAttribute("data-cta", stepSevenCTA)

                // Load step eight content
                if(stepEightTitle != ""){
                const addOrCloseDivEight = document.getElementById("add-step-or-finish-eight")
                const buttonStepEight = document.getElementById("button-step-eight")

                buttonStepEight.click()
                buttonStepEight.style.display = "none"
                };
            
                const DOMtitelStepEight = document.getElementById("step-eight-title")
                tinyMCE.get('editor17').setContent(stepEightExplainer)
                tinyMCE.get('editor18').setContent(stepEightCTA)

                DOMtitelStepEight.value = stepEightTitle

                const innerDivEight = document.getElementById("step-eight-inner-div")
                innerDivEight.setAttribute("data-title", stepEightTitle)
                innerDivEight.setAttribute("data-explainer", stepEightExplainer)
                innerDivEight.setAttribute("data-cta", stepEightCTA)

                // Load closing content

                if(closingDivId != ""){

                    const addOrCloseButtonDiv = document.getElementsByClassName("add-step-or-finish")

                    const addOrCloseButtonDivArray = Array.from(addOrCloseButtonDiv)
        
                    addOrCloseButtonDivArray.forEach(add => {
                        add.style.display = "none"
                    });

                function closingDivSet(a,b,c,d){

                    const closingDiv = document.getElementById(a)

                    const closingDivIdDOM = closingDiv.id

                    if(closingDivIdDOM == closingDivId){

                        const closingButton = document.getElementById(c)
                        closingButton.click()

                        const title = document.getElementById(d)

                        title.value = closingDivTitle
                        tinyMCE.get(b).setContent(closingDivText)
                    }

                } closingDivSet("closing-1", "editor-closing-1", "create-closing-1", "closing-title-input-1")
                closingDivSet("closing-2", "editor-closing-2","create-closing-2", "closing-title-input-2")
                closingDivSet("closing-3", "editor-closing-3", "create-closing-3", "closing-title-input-3")
                closingDivSet("closing-4", "editor-closing-4", "create-closing-4", "closing-title-input-4")
                closingDivSet("closing-5", "editor-closing-5", "create-closing-5", "closing-title-input-5")
                closingDivSet("closing-6", "editor-closing-6", "create-closing-6", "closing-title-input-6")
                closingDivSet("closing-7", "editor-closing-7", "create-closing-7", "closing-title-input-7")
                closingDivSet("closing-8", "editor-closing-8", "create-closing-8", "closing-title-input-8")

                // Save/update
                const saveWorkshopButton = document.getElementById("saveWorkshop")
                const updateWorkshopButton = document.getElementById("updateWorkshop")

                saveWorkshopButton.style.display = "none"
                updateWorkshopButton.style.display = "flex"

                            };
                        });
                    });
                })
            };
        });
    };
};

// Save(set) first set of input to database

function saveWorkshop(){
    const workshopTitle = document.getElementById("workshop-title").value
    const workshopGoals = tinyMCE.get('editor1').getContent()
    const stepOnePreview = tinyMCE.get('editor2').getContent()

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
        WorkshopTitle: workshopTitle,
        WorkshopGoals: workshopGoals,
        StepOnePreview: stepOnePreview,
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
        ClosingTitle: closingTitle,
        ClosingText: closingText,
        ClosingDivId: closingDivId
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
    const workshopTitle = document.getElementById("workshop-title").value
    const workshopGoals = tinyMCE.get('editor1').getContent()
    const stepOnePreview = tinyMCE.get('editor2').getContent()

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

    globalTitle.forEach(title => {

    db.collection("Workshops").where("WorkshopTitle", "==", title).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("Workshops").doc(doc.id).update({
                WorkshopTitle: workshopTitle,
                WorkshopGoals: workshopGoals,
                StepOnePreview: stepOnePreview,
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
                ClosingTitle: closingTitle,
                ClosingText: closingText,
                ClosingDivId: closingDivId
                    });   
                })
            });
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

            db.collection("Workshops").doc(doc.id).update({
                Status: "Public"
            })
        })
    });

    // Notification
    const workshopPublishedNotification = document.getElementById("workshop-published-notification")

    workshopPublishedNotification.style.display = "block"
    
};

// Create steps

function stepOne(){

const stepOne = document.getElementById("step-one-inner-div")

stepOne.style.display = "flex"

}

function stepTwo(){

    const stepTwo = document.getElementById("step-two-inner-div")
    
    stepTwo.style.display = "flex"
    
}

function stepThree(){

    const stepThree = document.getElementById("step-three-inner-div")
    
    stepThree.style.display = "flex"
    
}

function stepFour(){

    const stepFour = document.getElementById("step-four-inner-div")
    
    stepFour.style.display = "flex"
    
}

function stepFive(){

    const stepFive = document.getElementById("step-five-inner-div")
    
    stepFive.style.display = "flex"
    
}

function stepSix(){

    const stepSix = document.getElementById("step-six-inner-div")
    
    stepSix.style.display = "flex"
    
}

function stepSeven(){

    const stepSeven = document.getElementById("step-seven-inner-div")
    
    stepSeven.style.display = "flex"
    
}

function stepEight(){

    const stepEight = document.getElementById("step-eight-inner-div")
    
    stepEight.style.display = "flex"
    
}

// Create closing

function createClosing(elem){

  elem.parentElement.parentElement.nextElementSibling.style.display = "flex"
}

// Delete

function deleteStep1(ele){

    auth.onAuthStateChanged(User =>{
        if (User){

        db.collection("Vitaminders").doc(User.uid).get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;

    globalTitle.forEach(title => {

    db.collection("Workshops").where("WorkshopTitle", "==", title).where("Coach", "==", coachNaam).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

   db.collection("Workshops").doc(doc.id).update({
    StepOnePreview: "",
    StepOneTitle: "",
    StepOneExplainer: "",
    StepOneCTA: "",
                            });
                        });
                    // }).then(() => {
                    //     location.reload()
                    });
                });
            })
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

}

// Select header image

const chooseHeaderImg = document.getElementById("chosse-header-image")
const chooseHeaderImageModal = document.getElementById("select-header-img-modal")
const chooseHeaderImageModalButton = document.getElementById("toolbar-select-header-image-button")

chooseHeaderImg.addEventListener("click", () => {

    chooseHeaderImageModal.style.display = "flex"
})

// Save(set) first set of input to database
chooseHeaderImageModalButton.addEventListener("click", () => {

    // Header image

    const selectedImage = document.querySelectorAll("input[name=select-header-img]:checked")[0].id

    const workshopTitle = document.getElementById("workshop-title").value
    const workshopGoals = tinyMCE.get('editor1').getContent()
    const stepOnePreview = tinyMCE.get('editor2').getContent()

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

     // Closing

     const closingTitleOne = document.getElementById("closing-title-input-1")
     const closingTextOne = tinyMCE.get('editor-closing-1').getContent()
     const closingTitleTwo = document.getElementById("closing-title-input-2")
     const closingTextTwo = tinyMCE.get('editor-closing-2').getContent()
     const closingTitleThree = document.getElementById("closing-title-input-3")
     const closingTextThree = tinyMCE.get('editor-closing-3').getContent()
     const closingTitleFour = document.getElementById("closing-title-input-4")
     const closingTextFour = tinyMCE.get('editor-closing-4').getContent()
     const closingTitleFive = document.getElementById("closing-title-input-5")
     const closingTextFive = tinyMCE.get('editor-closing-5').getContent()
     const closingTitleSix = document.getElementById("closing-title-input-6")
     const closingTextSix= tinyMCE.get('editor-closing-6').getContent()
     const closingTitleSeven = document.getElementById("closing-title-input-7")
     const closingTextSeven = tinyMCE.get('editor-closing-7').getContent()
     const closingTitleEight = document.getElementById("closing-title-input-8")
     const closingTextEight = tinyMCE.get('editor-closing-18').getContent()

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
        HeaderImage: selectedImage,
        WorkshopTitle: workshopTitle,
        WorkshopGoals: workshopGoals,
        StepOnePreview: stepOnePreview,
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
        ClosingOneTitle: closingOneTitle,
        ClosingOneText: closingOneText,
        ClosingOneTitle: closingOneTitle,
        ClosingOneText: closingOneText,
        ClosingOneTitle: closingOneTitle,
        ClosingOneText: closingOneText,
        ClosingOneTitle: closingOneTitle,
        ClosingOneText: closingOneText,
        ClosingOneTitle: closingOneTitle,
        ClosingOneText: closingOneText,
        ClosingOneTitle: closingOneTitle,
        ClosingOneText: closingOneText,
        ClosingOneTitle: closingOneTitle,
        ClosingOneText: closingOneText,
        ClosingOneTitle: closingOneTitle,
        ClosingOneText: closingOneText,
                    });
                });
            };
        });

        const previewWorkshop = document.getElementById("preview-workshop")

        previewWorkshop.style.display = "block"
    
        const workshopSavedSetNotification = document.getElementById("workshop-saved-set-notification")
    
        workshopSavedSetNotification.style.display = "block"
    
        // Close modal
    
        chooseHeaderImageModal.style.display = "none"

});