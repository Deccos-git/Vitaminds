// Global title

const globalTitle = []

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
            });
        };
    });
};

function deleteClosing(ele){

}