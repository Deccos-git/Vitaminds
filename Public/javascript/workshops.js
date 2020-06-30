// Global title

const globalTitle = []

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

                if(stepOneTitle != undefined){
                    const buttonStepOne = document.getElementById("button-step-one")

                    buttonStepOne.click()
                    buttonStepOne.style.display = "none"
                };
        
                const DOMtitle = document.getElementById("workshop-title")
                const DOMtitelStepOne = document.getElementById("step-one-title")

                DOMtitle.value = title
                tinyMCE.get('editor1').setContent(workshopGoals)
                tinyMCE.get('editor2').setContent(stepOnePreview)
                tinyMCE.get('editor3').setContent(stepOneExplainer)
                tinyMCE.get('editor4').setContent(stepOneCTA)

                //Step one
                DOMtitelStepOne.value = stepOneTitle

                const saveWorkshopButton = document.getElementById("saveWorkshop")
                const updateWorkshopButton = document.getElementById("updateWorkshop")

                saveWorkshopButton.style.display = "none"
                updateWorkshopButton.style.display = "flex"
        
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
        WorkshopTitle: workshopTitle,
        WorkshopGoals: workshopGoals,
        StepOnePreview: stepOnePreview,
        StepOneTitle: stepOneTitle,
        StepOneExplainer: stepOneExplainer,
        StepOneCTA: stepOneCTA,
        Status: "Draft"
                });
            });
        };
    });

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

                })
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

// Create the first step

function stepOne(){

const stepOne = document.getElementById("step-one-outer-div")

stepOne.style.display = "flex"

}