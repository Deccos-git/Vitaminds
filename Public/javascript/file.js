const fileidhtml = location.pathname.replace(/^.*[\\\/]/, '')
const fileid1 = fileidhtml.replace('.html', '')
const fileid2 = fileid1.replace('%20',' ')
const fileid3 = fileid2.replace('%20',' ')
const fileid4 = fileid3.replace('%20',' ')
const fileid5 = fileid4.replace('%20',' ')
const fileid6 = fileid5.replace('%20',' ')
const fileid7 = fileid6.replace('%20',' ')
const fileid8 = fileid7.replace('%20',' ')
const fileid9 = fileid8.replace('%20',' ')
const fileid10 = fileid9.replace('%20',' ')
const fileid11 = fileid10.replace('%20',' ')
const fileid = fileid11.replace('%20',' ')

function showCoachPhoto(coach){

    const photoOuterDiv = document.getElementById("photo-outer-div")

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", coach)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const photo = doc.data().Profielfoto
            const name = doc.data().GebruikersnaamClean

            const photoDivCoach = document.createElement("div")
                photoDivCoach.setAttribute("class", "photo-div")
            const photoP = document.createElement("img")
            const nameP = document.createElement("p")

                photoP.src = photo
                nameP.innerText = name

                photoOuterDiv.appendChild(photoDivCoach)
                photoDivCoach.appendChild(photoP)
                photoDivCoach.appendChild(nameP)

                visitCoachProfile(photoDivCoach, coach)

        });
    });
};

function visitCoachProfile(photoDivCoach, coach){
    photoDivCoach.addEventListener("click", () => {
        window.open("../Vitaminders/" + coach + ".html", "_self");
    });
};

function goToChat(auth, coach, coachee){

    const chatButton = document.getElementById("chat-button-file")

    chatButton.addEventListener("click", () => {
        if(auth === coach){
                window.open(`../Chats/${coachee}.html`, "_self");
        } else if (auth === coachee){
            window.open(`../Chats/${coach}.html`, "_self");
        };
    });
};

function showFileCreationData(timestamp){

    const dateDOM = document.getElementById("creation-date")
    const dateP = document.createElement("p")

    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = timestamp.toDate().toLocaleDateString("nl-NL", options);

    dateP.innerText = date
    dateDOM.appendChild(dateP)
};

function OpenCreateNewGoalDiv(){

    const button = document.getElementById("create-goal-button")
    const createGoalDiv = document.getElementById("create-goal-div")

    button.addEventListener("click", () => {

        if(createGoalDiv.style.display === "flex"){
            createGoalDiv.style.display = "none"
        } else {
            createGoalDiv.style.display = "flex"
        };

        createGoalDiv.scrollIntoView()
    });
};

function showExcistingGoalsofCoachee(auth, coachee){

    const select = document.getElementById("excisting-goal-select")

    if (auth === coachee){

        db.collectionGroup("Levensvragen")
        .where("Gebruikersnaam", "==", auth)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const goalClean = doc.data().LevensvraagClean

                const option = document.createElement("option")

                option.innerText = goalClean

                select.appendChild(option)
            });
        });
    };
};

function createGoalCoachee(auth, coachee){

    const createNewGoalSection = document.getElementById("create-new-goal-div")
    const insertExcistingGoalDiv = document.getElementById("insert-excinsing-goal")
    const createNewGoalButton = document.getElementById("create-new-goal")
    const backbuttonDiv = document.getElementById("backbutton-div")
    const saveGoalbutton = document.getElementById("insert-excisting-goal")
    const saveNewGoalButton = document.getElementById("insert-new-goal-button")

    if(auth === coachee){

        createNewGoalSection.style.display = "none"
    };

    createNewGoalButton.addEventListener("click", () => {

        if(createNewGoalSection.style.display === "flex"){
            createNewGoalSection.style.display = "none"
            insertExcistingGoalDiv.style.display = "flex"
            createNewGoalButton.style.display = "flex"
            backbuttonDiv.style.display = "none"
            saveNewGoalButton.style.display = "none"
            saveGoalbutton.style.display = "block"
        } else {
            createNewGoalSection.style.display = "flex" 
            insertExcistingGoalDiv.style.display = "none"
            createNewGoalButton.style.display = "none"
            backbuttonDiv.style.display = "flex"
            saveGoalbutton.style.display = "none"
            saveNewGoalButton.style.display = "block"
        };
    });

    backbuttonDiv.addEventListener("click", () => {
        insertExcistingGoalDiv.style.display = "flex"
        createNewGoalSection.style.display = "none"
        backbuttonDiv.style.display = "none"
        createNewGoalButton.style.display = "block"
        saveGoalbutton.style.display = "block"
        saveNewGoalButton.style.display = "none"
    })
};

function createGoalCoach(auth, coach){

    const insertExcistingGoalDiv = document.getElementById("insert-excinsing-goal")
    const createNewGoalButton = document.getElementById("create-new-goal")

    if(auth === coach){
        insertExcistingGoalDiv.style.display = "none"
        createNewGoalButton.style.display = "none"
    };
};

function selectExcistingGoal(DOCID, coachee){

    const button = document.getElementById("insert-excisting-goal")
    const select = document.getElementById("excisting-goal-select")

    button.addEventListener("click", () => {

        const option = select.options
        const selected = option[option.selectedIndex].innerHTML

        db.collectionGroup("Levensvragen")
        .where("Gebruikersnaam", "==", coachee)
        .where("LevensvraagClean", "==", selected)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const goal = doc.data().Levensvraag

                button.innerText = "Opgeslagen"
                button.id = "Clicked"

                db.collection("Files")
                .doc(DOCID)
                .update({
                    Goals: firebase.firestore.FieldValue.arrayUnion(goal)
                });
            });
        });
    });
};

function showSaveNewButton(coach){

    const saveNewGoalButton = document.getElementById("insert-new-goal-button")

    auth.onAuthStateChanged(User =>{
        if(User){
            db.collection("Vitaminders")
            .doc(User.uid).get().then(doc =>{

                const auth = doc.data().Gebruikersnaam

                if(auth === coach){
                    saveNewGoalButton.style.display = "block"
                };
            });
        };
    });
};

function saveNewGoal(coach, coachee, DOCID, coachClean){

    const saveNewGoalButton = document.getElementById("insert-new-goal-button")

    saveNewGoalButton.addEventListener("click", () => {

        saveNewGoalButton.innerText = "Opgeslagen"
        saveNewGoalButton.id = "Clicked"

    const select = document.getElementById("select-goal")

    const option = select.options
    const selected = option[option.selectedIndex].innerHTML

    const goalTitle = document.getElementById("goal-title").value

    const goalDescription = document.getElementById("goal-description").value 

    let suggested = ""

    auth.onAuthStateChanged(User =>{
        if(User){
                db.collection("Vitaminders")
                .doc(User.uid).get().then(doc1 =>{

                    const auth = doc1.data().Gebruikersnaam

                    if(auth === coach){
                        suggested = coach
                    } else if (auth === coachee){
                        suggested = "No"
                    };

                    db.collection("Vitaminders")
                    .where("Gebruikersnaam", "==", coachee)
                    .get().then(querySnapshot => {
                        querySnapshot.forEach(doc2 => {
                
                            db.collection("Vitaminders")
                            .doc(doc2.id).collection("Levensvragen").doc()
                            .set({
                                Eigenaar: "Vitaminds",
                                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                Gebruikersnaam: coachee,
                                Goal: selected,
                                Levenslessen: [],
                                ID: idClean,
                                Levensvraag: idClean + goalTitle,
                                LevensvraagClean: goalTitle,
                                Omschrijving: goalDescription,
                                Openbaar: "Nee",
                                Suggested: suggested,
                            })
                            .then(() => {
                                db.collection("Files")
                                .doc(DOCID)
                                .update({
                                    Goals: firebase.firestore.FieldValue.arrayUnion(idClean + goalTitle)
                                });
                            })
                        });
                    });
                });
            };
        });
    });
};

function goalinInSelect(goalClean, option){

    option.innerText = goalClean
};

function displayGoalsInOverview(fileid, coachee, auth){

    const select = document.getElementById("select-goal-overview")
    const selectDiv = document.getElementById("select-goal-div")

    const goalArray = []

    findFirstGoalInGoalArray(goalArray, coachee, auth)

    db.collection("Files")
    .where("ID", "==", fileid)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const goals = doc.data().Goals

            goals.forEach(goal => {
                db.collectionGroup("Levensvragen")
                .where("Levensvraag", "==", goal)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const goalClean = doc1.data().LevensvraagClean
                        const option = document.createElement("option")

                        goalArray.push(goalClean)
                        
                        goalinInSelect(goalClean, option)
                        select.appendChild(option)
                    });
                })
                .then(() => {
                    hideSelectIfNoGoals(goalArray, selectDiv)
                })
            });
        });
    });
};

function hideSelectIfNoGoals(goalArray, select){

    console.log(goalArray.length)

    if(goalArray.length === 0){
        select.style.display = "none"
    };
};

function findFirstGoalInGoalArray(goalArray, coachee, auth){

    setTimeout(() => {
        autoLoadFirstProces(goalArray[0], coachee, auth)
    }, 2000);
};

function getFileProces(){
    const select = document.getElementById("select-goal-overview")

    const option = select.options
    const selected = option[option.selectedIndex].innerHTML

    db.collection("Files")
    .where("ID", "==", fileid)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const coachee = doc.data().Coachee

            showSelectedProces(selected, coachee)

        });
    });
};

function suggestedByCoach(suggested, DOCID, approved){

    const suggestedByCoachDiv = document.getElementById("suggested-div")

    let suggestedNotice = document.createElement("p")
    const approveButton = document.createElement("button")
    approveButton.innerText = "Doel goedkeuren"

    goalIsApprovedMessage(approved, approveButton, suggested)

    auth.onAuthStateChanged(User =>{
        if(User){
        db.collection("Vitaminders")
        .doc(User.uid).get().then(doc1 =>{

            const auth = doc1.data().Gebruikersnaam

            console.log(DOCID)

            approveGoalSuggestedByCoach(auth, DOCID, approveButton)

                if(suggested != undefined){

                    db.collection("Vitaminders")
                    .where("Gebruikersnaam", "==", suggested)
                    .get().then(querySnapshot =>{
                        querySnapshot.forEach(doc =>{

                            const nameClean = doc.data().GebruikersnaamClean
                            const type = doc.data().Usertype

                            // Suggested is coach
                            if(suggested != "No"){
                                suggestedByCoachDiv.appendChild(suggestedNotice)

                                if(auth != suggested){
                                    suggestedNotice.innerHTML = `Dit doel is voorgesteld door ${type} ${nameClean}`
                                    suggestedByCoachDiv.appendChild(approveButton)
                                } else {
                                    suggestedNotice.innerHTML = `Dit doel is voorgesteld door jou`
                                }
                            };
                        });
                    });
                };
            });
        };
    });
};

function approveGoalSuggestedByCoach(auth, DOCID, approveButton){

    approveButton.addEventListener('click', () => {

        approveButton.innerText = "Opgeslagen"

        db.collection("Vitaminders")
        .where("Gebruikersnaam", "==", auth)
        .get().then(querySnapshot =>{
            querySnapshot.forEach(doc1 =>{

                db.collection("Vitaminders")
                .doc(doc1.id)
                .collection("Levensvragen")
                .doc(DOCID)
                .update({
                    Approved: "Approved"
                });
            });
        });
    });
};

function goalIsApprovedMessage(approved, approveButton, suggested){

    const approvedDiv = document.getElementById("approved-div")

    const approvedNotice = document.createElement("p")

    hideApprovedDivIfGoalIsNotSuggestedByCoach(suggested, approvedNotice)

     if(approved === "Approved"){
        approvedNotice.innerText = "Doel is goedgekeurd"
        approvedNotice.style.color = "Green"
        approveButton.style.display = "none"
     } else {
        approvedNotice.innerText = "Doel is nog niet goedgekeurd"
        approvedNotice.style.color = "Orange"
     };

     approvedDiv.appendChild(approvedNotice)
};

function hideApprovedDivIfGoalIsNotSuggestedByCoach(suggested, approvedNotice){

    if (suggested === undefined){
        approvedNotice.style.display = "none"
    };
};

function showSelectedProces(selected, coachee){

    const goalOverview = document.getElementById("goal-overview-inner-div")
    const progressBoxFilled = document.getElementById("progress-box-outer-div")
    const suggestedDiv = document.getElementById("suggested-div")
    const approvedDiv = document.getElementById("approved-div")

    goalOverview.innerHTML = ""
    progressBoxFilled.innerHTML = ""
    suggestedDiv.innerHTML = ""
    approvedDiv.innerHTML = ""

    db.collectionGroup("Levensvragen")
    .where("Gebruikersnaam", "==", coachee)
    .where("LevensvraagClean", "==", selected)
    .get().then(querySnapshot =>{
            querySnapshot.forEach(doc =>{

                    const ID = doc.data().ID
                    const levensvraagID = doc.data().Levensvraag
                    const levensvragen = levensvraagID.replace(ID, "")
                    const openbaar = doc.data().Openbaar
                    const description = doc.data().Omschrijving
                    const goal = doc.data().Goal
                    const domain = doc.data().Domain
                    const suggested = doc.data().Suggested
                    const approved = doc.data().Approved

                    addLessonsToProces(levensvraagID)
                    progressBox(levensvraagID, doc.id)
                    fillProgressChartWithData(levensvraagID, coachee)
                    suggestedByCoach(suggested, doc.id, approved)

                    const innerDiv = document.createElement("div")
                            innerDiv.setAttribute("class", "digimind-proces-inner-div")
                    const goalDiv = document.createElement("div")
                            goalDiv.setAttribute("class", "goal-div")
                    const goalP = document.createElement("p")
                    const levensvraagTitle = document.createElement("h2")
                    const descriptionP = document.createElement("p")
                    const privateDiv = document.createElement("div")
                            privateDiv.setAttribute("class", "private-div")
                    const private = document.createElement("div")
                    const privateTooltip = document.createElement("p")
                            privateTooltip.setAttribute("class", "private-tooltip")

                    goalP.innerHTML = goal
                    levensvraagTitle.innerHTML = levensvragen
                    descriptionP.innerHTML = description

                    goalOverview.appendChild(innerDiv)
                    innerDiv.appendChild(privateDiv)
                    privateDiv.appendChild(private)
                    privateDiv.appendChild(privateTooltip)
                    // innerDiv.appendChild(goalDiv)
                    // goalDiv.appendChild(goalP)
                    innerDiv.appendChild(levensvraagTitle)
                    innerDiv.appendChild(descriptionP)

            });
    });
};

function autoLoadFirstProces(optionZero, coachee, auth){

    const goalOverview = document.getElementById("goal-overview-inner-div")

    db.collectionGroup("Levensvragen")
    .where("Gebruikersnaam", "==", coachee)
    .where("LevensvraagClean", "==", optionZero)
    .get().then(querySnapshot =>{
            querySnapshot.forEach(doc =>{

                    const ID = doc.data().ID
                    const levensvraagID = doc.data().Levensvraag
                    const levensvragen = levensvraagID.replace(ID, "")
                    const openbaar = doc.data().Openbaar
                    const description = doc.data().Omschrijving
                    const goal = doc.data().Goal
                    const domain = doc.data().Domain
                    const suggested = doc.data().Suggested
                    const approved = doc.data().Approved

                    addLessonsToProces(levensvraagID)
                    progressBox(levensvraagID, doc.id)
                    fillProgressChartWithData(levensvraagID, coachee)
                    suggestedByCoach(suggested, doc.id, approved)

                    const innerDiv = document.createElement("div")
                            innerDiv.setAttribute("class", "digimind-proces-inner-div")
                    const goalDiv = document.createElement("div")
                            goalDiv.setAttribute("class", "goal-div")
                    const goalP = document.createElement("p")
                    const levensvraagTitle = document.createElement("h2")
                    const descriptionP = document.createElement("p")
                    const privateDiv = document.createElement("div")
                            privateDiv.setAttribute("class", "private-div")
                    const private = document.createElement("div")
                    const privateTooltip = document.createElement("p")
                            privateTooltip.setAttribute("class", "private-tooltip")

                    goalP.innerHTML = goal
                    levensvraagTitle.innerHTML = levensvragen
                    descriptionP.innerHTML = description

                    // procesPrivatePublic(openbaar, private, privateTooltip)

                    goalOverview.appendChild(innerDiv)
                    innerDiv.appendChild(privateDiv)
                    privateDiv.appendChild(private)
                    privateDiv.appendChild(privateTooltip)
                    // innerDiv.appendChild(goalDiv)
                    // goalDiv.appendChild(goalP)
                    innerDiv.appendChild(levensvraagTitle)
                    innerDiv.appendChild(descriptionP)
            
            });
    });
};

function progressChartAxis(dates, numbers){

    const hapinessChart = document.getElementById('progress-chart').getContext('2d');

const myChart = new Chart(hapinessChart, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'Ontwikkeling',
            data: numbers,
            backgroundColor: [
                    "#0c66650D"
            ],
            borderColor: [
                    "#0c6665"
            ],
            borderWidth: 1
        }]
    },
    options: {
            legend: {
                    display: false
            },           
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    userCallback: function(label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }
                    }
                }
            }]
        }
    }
});
};

function hideProgressBoxIfNoInputs(dateArray){

    const progressBox = document.getElementById("progress-box-outer-div")

    console.log(dateArray.length)

    if(dateArray.length === 0){
        progressBox.style.display = "none"
    };
};

function fillProgressChartWithData(goal, coachee){

    const dateArray = []
    const numberArray = []

    db.collectionGroup("Progress")
    .where("Goal", "==", goal)
    .where("User", "==", coachee)
    .orderBy("Timestamp", "desc")
    .onSnapshot(querySnapshot =>{
            querySnapshot.forEach(doc =>{

                const number = doc.data().Number
                const date = doc.data().Timestamp

                const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
                const dateLocale = date.toDate().toLocaleDateString("nl-NL", options);

                dateArray.push(dateLocale) 
                numberArray.push(number)

                progressChartAxis(dateArray, numberArray)

        });
    });
};

function progressBox(){

    const progressBoxDOM = document.getElementById("progress-box-outer-div")
    const progressBoxOuterDiv = document.createElement("div")
            progressBoxOuterDiv.setAttribute("id", "progress-box")
    const canvas = document.createElement("canvas")
            canvas.setAttribute("id", "progress-chart")
    
    const title = document.createElement("h3")

    title.innerText = "Ontwikkeling"

    progressBoxDOM.prepend(title)
    progressBoxDOM.appendChild(progressBoxOuterDiv)
    progressBoxOuterDiv.appendChild(canvas)
};

function addLessonsToProces(selectedProces){

    const lessonsDiv = document.getElementById("proces-lessons")
    const lessonDivTitle = document.createElement("h3")
            lessonDivTitle.setAttribute("id", "lesson-div-title")
    lessonDivTitle.innerText = "Lessen"

    lessonsDiv.innerHTML = ""

    db.collectionGroup("Levenslessen").where("Levensvraag", "==", selectedProces)
    .orderBy("Timestamp", "desc").get().then(querySnapshot =>{
            querySnapshot.forEach(doc1 =>{     

                    const levensles = doc1.data().Levensles
                    const type = doc1.data().Type
                    const timestamp = doc1.data().Timestamp

                    const levenslesDiv = document.createElement("div")
                            levenslesDiv.setAttribute("class", "levensles-div-ontwikkeling")
                    const levenslesH3 = document.createElement("h3")
                    const metaDiv = document.createElement("div")
                            metaDiv.setAttribute("class", "ontwikkeling-levensles-meta-div")
                    const metaType = document.createElement("p")
                    const metaTimestamp = document.createElement("p")
            
                    levenslesH3.innerHTML = levensles
                    metaType.innerHTML = type
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    metaTimestamp.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

                    lessonsDiv.prepend(lessonDivTitle)
                    lessonsDiv.appendChild(levenslesDiv)
                    levenslesDiv.appendChild(levenslesH3)
                    levenslesDiv.appendChild(metaDiv)
                    metaDiv.appendChild(metaType)
                    metaDiv.appendChild(metaTimestamp)

            });
    });
};


function showWriteMessageBox(){

    const showMessageBoxButton = document.getElementById("create-rapport")
    const messageBox = document.getElementById("create-message-div")

    showMessageBoxButton.addEventListener("click", () => {

        if(messageBox.style.display === "flex"){
            messageBox.style.display = "none"
        } else {
            messageBox.style.display = "flex"
        };
    });
};

function saveMessage(DOCID, auth, coach, coachee){

    const saveMessageButton = document.getElementById("save-message-button")
    const messageInput = document.getElementById("message-input")

    saveMessageButton.addEventListener("click", () => {

        const message = messageInput.value
        saveMessageButton.innerText = "Opgeslagen"
        saveMessageButton.id = "Clicked"

        db.collection("Files")
        .doc(DOCID)
        .collection("Messages")
        .doc()
        .set({
            Message: message,
            Auth: auth,
            FileID: fileid,
            Coach: coach,
            Coachee: coachee,
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        });
    });
};

function displayMessages(){

    const messageOverview = document.getElementById("message-overview")

    db.collectionGroup("Messages")
    .where("FileID", "==", fileid)
    .orderBy("Timestamp", "desc")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const message = doc.data().Message
            const timestamp = doc.data().Timestamp
            const auth = doc.data().Auth

            const messageBox = document.createElement("div")
                messageBox.setAttribute("class", "message-box")
            const messageP = document.createElement("p")
            const authDiv = document.createElement("div")
                authDiv.setAttribute("class", "auth-div-message")
            const photoP = document.createElement("img")
            const nameP = document.createElement("p")
            const timeP = document.createElement("p")
                timeP.setAttribute("class", "timestamp-message")

            messageP.innerText = message

            insertAuthDataInMessage(auth, nameP, photoP)
            insertTimestampInMessage(timestamp, timeP)

            messageOverview.appendChild(messageBox)
            messageBox.appendChild(authDiv)
            authDiv.appendChild(photoP)
            authDiv.appendChild(nameP)
            messageBox.appendChild(messageP)
            messageBox.appendChild(timeP)
            
        });
    });
};

function insertTimestampInMessage(timestamp, timeP){
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const time = timestamp.toDate().toLocaleDateString("nl-NL", options);

    timeP.innerText = time
};

function insertAuthDataInMessage(auth, nameP, photoP){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", auth)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const nameClean = doc.data().GebruikersnaamClean
            const photo = doc.data().Profielfoto

            nameP.innerText = nameClean
            photoP.src = photo
        });
    });
};

!function fileQuery(){

    db.collection("Files")
    .where("ID", "==", fileid)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const coachee = doc.data().Coachee
            const coach = doc.data().Coach
            const timestamp = doc.data().Timestamp

            auth.onAuthStateChanged(User =>{
                if(User){
                    db.collection("Vitaminders")
                    .doc(User.uid).get().then(doc1 =>{

                        const auth = doc1.data().Gebruikersnaam

                        if(auth === coach || auth === coachee){

                            showCoachPhoto(coachee)
                            showCoachPhoto(coach)
                            showFileCreationData(timestamp)
                            goToChat(auth, coach, coachee)
                            OpenCreateNewGoalDiv()
                            showExcistingGoalsofCoachee(auth, coachee)
                            createGoalCoachee(auth, coachee)
                            createGoalCoach(auth, coach)
                            showWriteMessageBox()
                            saveMessage(doc.id, auth, coach, coachee)
                            displayMessages()
                            selectExcistingGoal(doc.id, coachee)
                            saveNewGoal(coach, coachee, doc.id)
                            showSaveNewButton(coach)
                            displayGoalsInOverview(fileid, coachee)
                        };
                    });
                };
            });
        });
    });
}();

!function switchFileSection(){

    const fileSection = document.getElementsByClassName("file-component-outer-div")

    const menuItemDiv = document.getElementById("file-menu")

    const menuItem = menuItemDiv.getElementsByTagName("p")

    fileMenuItemswitch(menuItem, fileSection, 0, 0, 1, 2)
    fileMenuItemswitch(menuItem, fileSection, 1, 1, 0, 2)
    fileMenuItemswitch(menuItem, fileSection, 2, 2, 0, 1)
}();

function fileMenuItemswitch(menuItemDiv, fileSection, menuItem, section, hide1, hide2){

    menuItemDiv[menuItem].addEventListener("click", () => {
            fileSection[section].style.display = "flex"
            fileSection[hide1].style.display = "none"
            fileSection[hide2].style.display = "none"
    });
};

!function switchFileMenuItemHighlight(){

    const menuItemDiv = document.getElementById("file-menu")

    const menuItem = menuItemDiv.getElementsByTagName("p")

    for (var i = 0; i < menuItem.length; i++) {
            menuItem[i].addEventListener("click", function() {

                    var current = document.getElementsByClassName("file-menu-active");

                    current[0].className = current[0].className.replace("file-menu-active", "");
                    this.className += " "+"file-menu-active";

            });
    };
}();