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

        });
    });
};

function goToChat(auth, coach, coachee){

    const chatButton = document.getElementById("chat-button-file")

    chatButton.addEventListener("click", () => {
        if(auth === coach){
                window.open(`../Chats/${coachee}.html`, "_self");
        } else if (auth === coachee){
            window.open(`../Chats/${coachee}.html`, "_self");
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

function saveNewGoal(coach, coachee, DOCID){

    const saveNewGoalButton = document.getElementById("insert-new-goal-button")

    saveNewGoalButton.addEventListener("click", () => {

        saveNewGoalButton.innerText = "Opgeslagen"
        saveNewGoalButton.id = "Clicked"

    const select = document.getElementById("select-goal")

    const option = select.options
    const selected = option[option.selectedIndex].innerHTML

    const goalTitle = document.getElementById("goal-title").value

    const goalDescription = document.getElementById("goal-description").value 

    let approved = ""

    auth.onAuthStateChanged(User =>{
        if(User){
                db.collection("Vitaminders")
                .doc(User.uid).get().then(doc1 =>{

                    const auth = doc1.data().Gebruikersnaam

                    if(auth === coach){
                        approved = "No"
                    } else if (auth === coachee){
                        approved = "Yes"
                    };

                    db.collection("Vitaminders")
                    .where("Gebruikersnaam", "==", coach)
                    .get().then(querySnapshot => {
                        querySnapshot.forEach(doc2 => {
                
                            db.collection("Vitaminders")
                            .doc(doc2.id).collection("Levensvragen").doc()
                            .set({
                                Eigenaar: "Vitaminds",
                                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                Gebruikersnaam: coach,
                                Goal: selected,
                                Levenslessen: [],
                                ID: idClean,
                                Levensvraag: idClean + goalTitle,
                                LevensvraagClean: goalTitle,
                                Omschrijving: goalDescription,
                                Openbaar: "Nee",
                                Approved: approved
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

function displayGoalsInOverview(){

    const goalOverview = document.getElementById("goal-overview")



}

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
    .orderBy("Timestamp", "asc")
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

                            showCoachPhoto(coach)
                            showCoachPhoto(coachee)
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