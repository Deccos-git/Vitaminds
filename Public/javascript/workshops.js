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
        const closingText = doc.data().ClosingText 
        const closingTitle = doc.data().ClosingTitle

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
                const saveButton = document.createElement("button")

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
                const stepThreeIntroductionDiv = document.createElement("div")
                    stepThreeIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepThreeIntroductionTitle = document.createElement("h3")
                const stepThreeIntroductionP = document.createElement("p")
                const stepThreeIntroductionButton = document.createElement("button")
                    stepThreeIntroductionButton.setAttribute("class", "button-algemeen")
                const stepFourIntroductionDiv = document.createElement("div")
                    stepFourIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepFourIntroductionTitle = document.createElement("h3")
                const stepFourIntroductionP = document.createElement("p")
                const stepFourIntroductionButton = document.createElement("button")
                    stepFourIntroductionButton.setAttribute("class", "button-algemeen")
                const stepFiveIntroductionDiv = document.createElement("div")
                    stepFiveIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepFiveIntroductionTitle = document.createElement("h3")
                const stepFiveIntroductionP = document.createElement("p")
                const stepFiveIntroductionButton = document.createElement("button")
                    stepFiveIntroductionButton.setAttribute("class", "button-algemeen")
                const stepSixIntroductionDiv = document.createElement("div")
                    stepSixIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepSixIntroductionTitle = document.createElement("h3")
                const stepSixIntroductionP = document.createElement("p")
                const stepSixIntroductionButton = document.createElement("button")
                    stepSixIntroductionButton.setAttribute("class", "button-algemeen")
                const stepSevenIntroductionDiv = document.createElement("div")
                    stepSevenIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepSevenIntroductionTitle = document.createElement("h3")
                const stepSevenIntroductionP = document.createElement("p")
                const stepSevenIntroductionButton = document.createElement("button")
                    stepSevenIntroductionButton.setAttribute("class", "button-algemeen")
                const stepEightIntroductionDiv = document.createElement("div")
                    stepEightIntroductionDiv.setAttribute("class", "step-introduction-div")
                const stepEightIntroductionTitle = document.createElement("h3")
                const stepEightIntroductionP = document.createElement("p")
                const stepEightIntroductionButton = document.createElement("button")
                    stepEightIntroductionButton.setAttribute("class", "button-algemeen")    
                    
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

                        saveButtonDiv.appendChild(saveButton)

                        saveButton.innerText = "Opslaan"

                        const stepOneOuterDiv = document.createElement("div")
                            stepOneOuterDiv.setAttribute("class", "step-outer-div")
                        const stepOneTitleH2 = document.createElement("h2")
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
                        stepTwoIntroductionP.innerText = "stepTwoIntroduction"
                        stepTwoIntroductionButton.innerText = "Volgende stap"
                        DOM.appendChild(stepTwoIntroductionTitle)
                        DOM.appendChild(stepTwoIntroductionDiv)
                        stepTwoIntroductionDiv.appendChild(stepTwoIntroductionP)
                        stepTwoIntroductionDiv.appendChild(stepTwoIntroductionButton)
                    })
                };

                  // Load step two
                  if(stepTwoTitle != ""){
                    stepTwoIntroductionButton.addEventListener("click", () => {

                        toolbarOneCount.innerText = "V"
                        toolbarOneCheck.style.backgroundColor = "white"
                        toolbarOneCount.style.color = "#008e8e"

                        const stepTwoOuterDiv = document.createElement("div")
                            stepTwoOuterDiv.setAttribute("class", "step-outer-div")
                        const stepTwoTitleH2 = document.createElement("h2")
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
                        stepThreeIntroductionP.innerText = "stepThreeIntroduction"
                        stepThreeIntroductionButton.innerText = "Volgende stap"
                        DOM.appendChild(stepThreeIntroductionTitle)
                        DOM.appendChild(stepThreeIntroductionDiv)
                        stepThreeIntroductionDiv.appendChild(stepThreeIntroductionP)
                        stepThreeIntroductionDiv.appendChild(stepThreeIntroductionButton)
                    })
                };

                      // Load step three
                      if(stepThreeTitle != ""){
                        stepThreeIntroductionButton.addEventListener("click", () => {
    
                            toolbarTwoCount.innerText = "V"
                            toolbarTwoCheck.style.backgroundColor = "white"
                            toolbarTwoCount.style.color = "#008e8e"

    
                            const stepThreeOuterDiv = document.createElement("div")
                                stepThreeOuterDiv.setAttribute("class", "step-outer-div")
                            const stepThreeTitleH2 = document.createElement("h2")
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
                            stepFourIntroductionP.innerText = "stepThreeIntroduction"
                            stepFourIntroductionButton.innerText = "Volgende stap"
                            DOM.appendChild(stepFourIntroductionTitle)
                            DOM.appendChild(stepFourIntroductionDiv)
                            stepFourIntroductionDiv.appendChild(stepFourIntroductionP)
                            stepFourIntroductionDiv.appendChild(stepFourIntroductionButton)
                        })
                    };

                        // Load step four
                        stepFourIntroductionButton.addEventListener("click", () => {
                        if(stepFourTitle != ""){
                           
        
                                toolbarThreeCount.innerText = "V"
                                toolbarThreeCheck.style.backgroundColor = "white"
                                toolbarThreeCount.style.color = "#008e8e"

        
                                const stepFourOuterDiv = document.createElement("div")
                                    stepFourOuterDiv.setAttribute("class", "step-outer-div")
                                const stepFourTitleH2 = document.createElement("h2")
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
                                stepFiveIntroductionP.innerText = "stepFiveIntroduction"
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

                            const closingTitleH3 = document.createElement("h3")
                            const closingTextP = document.createElement("p")
                            const closingInputTitle = document.createElement("h3")
                            const closingInput = document.createElement("textarea")
                                closingInput.setAttribute("rows", "10")
                                closingInput.setAttribute("cols", "30")
                                closingInput.setAttribute("placeholder", "Wat vond je van de workshop?")
                                closingInput.setAttribute("id", "closing-input")
                           
                            closingTitleH3.innerText = closingTitle
                            closingTextP.innerText = closingText

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
                        };
                    });
            })
        })
    })
});




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

    //Closing
    function closingDivGetInput(a,b){
        const closingDiv = document.getElementById(a)
        const closingText = tinyMCE.get(b).getContent()

        const closingTitle = closingDiv.firstElementChild.nextElementSibling.nextElementSibling.value

        const closingDivId = closingDiv.id

        if(closingTitle != "" && closingText != ""){

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
        };
    } closingDivGetInput("closing-1", "editor-closing-1")
    closingDivGetInput("closing-2", "editor-closing-2")
    closingDivGetInput("closing-3", "editor-closing-3")
    closingDivGetInput("closing-4", "editor-closing-4")
    closingDivGetInput("closing-5", "editor-closing-5")
    closingDivGetInput("closing-6", "editor-closing-6")
    closingDivGetInput("closing-7", "editor-closing-7")
    closingDivGetInput("closing-8", "editor-closing-8")

    const previewWorkshop = document.getElementById("preview-workshop")

    previewWorkshop.style.display = "block"

    const workshopSavedSetNotification = document.getElementById("workshop-saved-set-notification")

    workshopSavedSetNotification.style.display = "block"
};

// Update or set input

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

        //Closing
        function closingDivGetInput(a,b){
        const closingDiv = document.getElementById(a)
        const closingText = tinyMCE.get(b).getContent()

        const closingTitle = closingDiv.firstElementChild.nextElementSibling.nextElementSibling.value

        const closingDivId = closingDiv.id

        if(closingTitle != "" && closingText != ""){

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
    };

    } closingDivGetInput("closing-1", "editor-closing-1")
    closingDivGetInput("closing-2", "editor-closing-2")
    closingDivGetInput("closing-3", "editor-closing-3")
    closingDivGetInput("closing-4", "editor-closing-4")
    closingDivGetInput("closing-5", "editor-closing-5")
    closingDivGetInput("closing-6", "editor-closing-6")
    closingDivGetInput("closing-7", "editor-closing-7")
    closingDivGetInput("closing-8", "editor-closing-8")

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