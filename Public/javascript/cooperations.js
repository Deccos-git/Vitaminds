const IDurl0 = window.location.href.replace(/^.*[\\\/]/, '')
const IDurl = IDurl0.replace('.html', '')

!async function communitySubTitle(){

    const subTitle = document.getElementById("community-sub-title")

    const coachesArray = []

    await db.collection("Vitaminders")
    .where("Usertype", "==", "Coach")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            coachesArray.push(doc)

        });
    });

    subTitle.innerText = `Samen groeien met ${coachesArray.length} collega coaches`

}();

function openSupport(buttonDOM, link){

    if(buttonDOM != null){

        buttonDOM.addEventListener("click", () => {

            auth.onAuthStateChanged(User =>{
                if(User){
                    userRef = db.collection("Vitaminders").doc(User.uid)
                    userRef.get()
                    .then(doc => {

                        const type = doc.data().Usertype

                        if(type === "Coach" ){

                            window.open(link, "_self");

                        } else if (subscriptionType === undefined){
                            buttonDOM.innerHTML = `Dit is een community omgeving. Maak een <a href="/aanmelden-coach.html">coachprofiel</a> aan om toegang te krijgen.`
                            buttonDOM.style.border = "none"
                            buttonDOM.style.color = "#008e8e"
                        }

                    });
                } else {
                    buttonDOM.innerHTML = `Dit is een community omgeving. Maak een <a href="/aanmelden-coach.html">coachprofiel</a> aan om toegang te krijgen.`
                    buttonDOM.style.border = "none"
                    buttonDOM.style.color = "#008e8e"
                }
            });
        });
    };
};

!function openCommunityElements(){

    const buttonDOMSupport = document.getElementById("community-support-button")
    const buttonDOMRefer = document.getElementById("community-refer-button")

    openSupport(buttonDOMSupport, "community-coaches-support.html")
    openSupport(buttonDOMRefer, "community-coaches-refer.html")
}();

//Support

!function displayCreateNewCoachGoal(){

    const displayButton = document.getElementById("create-new-coach-goal")
    const newGoalDiv = document.getElementById("create-new-coach-goal-inner-div")

    if(displayButton != null){

        displayButton.addEventListener("click", () => {

            if(newGoalDiv.style.display === "flex"){
                newGoalDiv.style.display = "none"
            } else {
                newGoalDiv.style.display = "flex"
            };
        });
    };
}();

!function saveCoachGoal(){

    const saveButton = document.getElementById("save-coach-goal")

    if(saveButton != null){

        saveButton.addEventListener("click", () => {

            const goalTitle = document.getElementById("coach-goal-title").value
            const goalDescription = document.getElementById("coach-goal-description").value
            saveButton.innerText = "Opgeslagen"

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
                            Lessons: [],
                            Tips: [],
                            ID: idClean,
                            LastActive: firebase.firestore.Timestamp.fromDate(new Date()),
                            Goal: idClean + goalTitle,
                            GoalClean: goalTitle,
                            Omschrijving: goalDescription,
                            Openbaar: "public",
                            Type: "Coachgoal"
                        })
                        .then(() => {
                            db.collection("Vitaminders")
                            .doc(doc.id)
                            .update({
                                CoachGoals: firebase.firestore.FieldValue.increment(1)
                            });
                        })
                        .then(() => {
                            location.reload(); 
                        });
                    });
                };
            });
        });
    };
}();

!function displayGoals(){

    const goalOverview = document.getElementById("goal-overview")

    if(goalOverview != null){

        db.collectionGroup("Coachgoals")
        .where("Eigenaar", "==", "Vitaminds")
        .orderBy("LastActive", "desc")
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

            const goalClean = doc.data().GoalClean
            const coach = doc.data().Gebruikersnaam
            const id = doc.data().ID
            const lastActive = doc.data().LastActive
            const lessons = doc.data().Lessons
            const tips = doc.data().Tips

            const goalCard = document.createElement("div")
                goalCard.setAttribute("class", "goal-card")
            const goalTitle = document.createElement("h2")
            const metaDiv = document.createElement("div")
                metaDiv.setAttribute("class", "meta-div")
            const profilePhoto = document.createElement("img")
                profilePhoto.setAttribute("class", "profile-photo")
            const coachName = document.createElement("p")
                coachName.setAttribute("class", "coach-name")
            const button = document.createElement("button")
                button.setAttribute("class", "button-algemeen button-support")
            const infoDiv = document.createElement("div")
                infoDiv.setAttribute("class", "info-div")
            const numberOfLessons = document.createElement("p")
            const numberOfSupport = document.createElement("p")
            const dateP = document.createElement("p")

            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const lastActiveFormatted = lastActive.toDate().toLocaleDateString("nl-NL", options);

            goalTitle.innerText = goalClean
            button.innerText = "Bekijk"

            coachMeta(coach, profilePhoto, coachName)
            openCoachSupport(button, id)
            metaDivLinkToProfile(metaDiv, coach)
            numberOfLessonsCard(numberOfLessons, lessons)

            goalOverview.appendChild(goalCard)
            goalCard.appendChild(metaDiv)
            metaDiv.appendChild(profilePhoto)
            metaDiv.appendChild(coachName)
            goalCard.appendChild(goalTitle)
            goalCard.appendChild(infoDiv)
            infoDiv.appendChild(numberOfLessons)
            goalCard.appendChild(button)

            });
        });
    };
}();

function numberOfLessonsCard(numberOfLessons, lessons){

    numberOfLessons.innerHTML = `Aantal lessen: ${lessons.length}`

};

function coachMeta(coach, profilePhoto, coachName){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", coach)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const userNameClean = doc.data().GebruikersnaamClean
            const photo = doc.data().Profielfoto

            profilePhoto.src = photo
            coachName.innerText = userNameClean

        });
    });
};

function openCoachSupport(button, id){

    button.addEventListener("click", () => {

        window.open("../coachSupports/" + id, "_self")
    });
};


// Coach support detail page

function saveTip(supportButton, supportInput){

    supportButton.addEventListener("click", () => {

        emptyScreenByOnsnapshotMessage()

        const tip = supportInput.value
        supportButton.innerText = "Verstuurd"
        supportButton.id = ""

            auth.onAuthStateChanged(User =>{
                db.collection("Vitaminders")
                .doc(User.uid)
                .get().then(function(doc) {

                    const auth = doc.data().Gebruikersnaam
                    const authClean = doc.data().GebruikersnaamClean

                db.collectionGroup("Coachgoals")
                .where("ID", "==", IDurl)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {
        
                        const idGoal = doc1.data().ID
                        const coachGoal = doc1.data().Goal
                        const coachGoalClean = doc1.data().GoalClean
                        const userName = doc1.data().Gebruikersnaam
                     

                        db.collection("Vitaminders")
                    .where("Gebruikersnaam", "==", userName)
                    .get().then(querySnapshot => {
                        querySnapshot.forEach(doc2 => {

                            const email = doc2.data().Email

                                db.collection("Vitaminders")
                                .doc(doc2.id)
                            .collection("CoachLessons")
                            .doc()
                            .set({
                                Username: userName,
                                Lesson: tip,
                                Coachgoal: coachGoal,
                                GoalID: idGoal,
                                ID: randomID(),
                                ParentID: "None",
                                Tread: [],
                                New: true,
                                Tipper: auth,
                                TipperClean: authClean,
                                Type: "supportTip",
                                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            })
                            .then(() => {
                                db.collection("CoachSocialWall")
                                .doc()
                                .set({
                                    Username: userName,
                                    Lesson: tip,
                                    Coachgoal: coachGoal,
                                    GoalID: idGoal,
                                    ID: randomID(),
                                    ParentID: "None",
                                    New: true,
                                    Tread: [],
                                    Tipper: auth,
                                    TipperClean: authClean,
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                    Type: "supportTip"
                                });
                                })
                                .then(() => {
                                    db.collection("Vitaminders")
                                    .doc(doc2.id)
                                    .collection("Coachgoals")
                                    .doc(doc1.id)
                                    .update({
                                        LastActive:firebase.firestore.Timestamp.fromDate(new Date()),
                                        Lessons: firebase.firestore.FieldValue.arrayUnion(tip)
                                    });
                                })
                                .then(() => {
                                    sendMailNewTip(email, coachGoalClean, authClean, idGoal)
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

function sendMailNewTip(email, goal, nameClean, id){

    db.collection("Mail").doc().set({
        to: [email],
        cc: "info@vitaminds.nu",
        message: {
        subject: `Nieuwe reactie op je doel "${goal}"`,
        html: `Hallo ${nameClean}, </br></br>
            Je hebt een nieuwe reactie ontvangen op je doel "${goal}".<br><br>
            
            Klik <a href="https://vitaminds.nu/coachSupports/${id}"> hier </a> om de reactie te bekijken.<br><br>
  
            Vriendelijke groet, </br></br>
            Het Vitaminds Team </br></br>
            <img src="https://vitaminds.nu/images/design/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`,
        Gebruikersnaam: nameClean,
        Emailadres: email,
        Type: "Goal tip"
          }     
      });

};

function saveReaction(supportButton, supportInput, parentID){

    supportButton.addEventListener("click", () => {

        emptyScreenByOnsnapshotReaction()

        const reaction = supportInput.value
        supportButton.id = ""

            auth.onAuthStateChanged(User =>{
                db.collection("Vitaminders")
                .doc(User.uid)
                .get().then(function(doc) {

                    const auth = doc.data().Gebruikersnaam
                    const authClean = doc.data().GebruikersnaamClean

                db.collectionGroup("CoachLessons")
                .where("ID", "==", parentID)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {
        
                        const idGoal = doc1.data().ID
                        const coachGoal = doc1.data().Coachgoal
                        const userName = doc1.data().Username

                        db.collection("Vitaminders")
                        .doc(User.uid)
                    .collection("CoachLessons")
                    .doc()
                    .set({
                        Username: userName,
                        Lesson: reaction,
                        Coachgoal: coachGoal,
                        GoalID: idGoal,
                        New: true,
                        ID: randomID(),
                        ParentID: parentID,
                        Tread: [],
                        Tipper: auth,
                        TipperClean: authClean,
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                        Type: "Reaction"
                    })
                    .then(() => {
                        db.collection("CoachSocialWall")
                        .doc()
                        .set({
                            Username: userName,
                            Lesson: reaction,
                            Coachgoal: coachGoal,
                            GoalID: idGoal,
                            New: true,
                            ID: randomID(),
                            ParentID: parentID,
                            Tread: [],
                            Tipper: auth,
                            TipperClean: authClean,
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            Type: "Reaction"
                        });
                        })
                        .then(() => {
                            db.collection("Vitaminders")
                            .doc(User.uid)
                            .collection("CoachLessons")
                            .doc(doc1.id)
                            .update({
                                LastActive:firebase.firestore.Timestamp.fromDate(new Date()),
                                Messages: firebase.firestore.FieldValue.arrayUnion(reaction)
                            });
                        });
                    });
                });
            });
        });
    });
};

!function queryGoal(){

    const outerDiv = document.getElementById("goal-wall")

    db.collectionGroup("Coachgoals")
    .where("ID", "==", IDurl)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const goalClean = doc.data().GoalClean
            const description = doc.data().Omschrijving
            const userName = doc.data().Gebruikersnaam

            const metaDiv = document.createElement("div")
                metaDiv.setAttribute("class", "meta-div")
            const profilePhoto = document.createElement("img")
                profilePhoto.setAttribute("class", "profile-photo")
            const coachName = document.createElement("p")
                coachName.setAttribute("class", "coach-name")
            const h1 = document.createElement("h1")
            const descriptionP = document.createElement("p")
                descriptionP.setAttribute("class", "goal-description")
            const supportCTADiv = document.createElement("div")
                supportCTADiv.setAttribute("id", "support-CTA-div")
            const supportCTA = document.createElement("p")
            const supportInput = document.createElement("textarea")
                supportInput.style.width = "90%"
                supportInput.style.height = "200px"
                supportInput.style.borderRadius = "5px"
            const supportTips = document.createElement("div")
            const supportButton = document.createElement("button")
                supportButton.setAttribute("class", "button-algemeen")
                supportButton.setAttribute("id", "save-support")

            h1.innerText = goalClean
            descriptionP.innerText = description
            supportCTAText(userName, supportCTA, supportTips, supportInput)
            coachMeta(userName, profilePhoto, coachName)
            metaDivLinkToProfile(metaDiv, userName)
            supportButton.innerText = "Versturen"

            saveTip(supportButton, supportInput)

            outerDiv.appendChild(metaDiv)
            metaDiv.appendChild(profilePhoto)
            metaDiv.appendChild(coachName)
            outerDiv.appendChild(h1)
            outerDiv.appendChild(descriptionP)
            outerDiv.appendChild(supportCTADiv)
            supportCTADiv.appendChild(supportCTA)
            supportCTADiv.appendChild(supportTips)
            supportCTADiv.appendChild(supportInput)
            supportCTADiv.appendChild(supportButton)

        });
    });
}();

function metaDivLinkToProfile(metaDiv, coachName){

    metaDiv.addEventListener("click", () => {
        window.open("../Vitaminders/" + coachName + ".html", "_self");
    });
};

function supportCTAText(userName, supportCTA, tips, supportInput){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", userName)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const userNameClean = doc.data().GebruikersnaamClean

            auth.onAuthStateChanged(User =>{
                    db.collection("Vitaminders")
                    .doc(User.uid)
                    .get().then(function(doc) {

                    const auth = doc.data().Gebruikersnaam
                    const authClean = doc.data().GebruikersnaamClean

                    if(userName === auth){
                        supportCTA.innerHTML = `Hoe gaat het nu, ${authClean}?`
                        tips.innerHTML = "<ul><li>Heb je iets geleerd?</li><li>Is er iets veranderd?</li><li>Welke stappen heb je gezet?</li></ul>"
                        supportInput.placeholder = "Schrijf hier wat je wilt delen."
                    } else {
                        supportCTA.innerHTML = `Help ${userNameClean} om zijn/haar doel te bereiken`
                        tips.innerHTML = "<ul><li>Geef een tip</li><li>Link naar een interessante website</li><li>Stel een verdiepende vraag</li></ul>"
                        supportInput.placeholder = "Schrijf hier je tip, link of vraag."
                    }
                });
            });
        });
    });
};


function randomID(){

    const id = Math.random() 
    const idAlpha = id.toString(36)
    const idMessage = idAlpha.replace("0.", "")

    return idMessage
};

!function addLessonsToGoal(goal){
    
    db.collectionGroup("CoachLessons")
    .where("GoalID", "==", IDurl)
    .where("ParentID", "==", "None")
    .orderBy("Timestamp", "desc")
    .onSnapshot(querySnapshot => {

        emptyScreenByOnsnapshotMessage()
        
        querySnapshot.forEach(doc => {

            const user = doc.data().Gebruikersnaam
            const lesson = doc.data().Lesson
            const timestamp = doc.data().Timestamp
            const parentID = doc.data().ParentID
            const type = doc.data().Type
            const tipper = doc.data().Tipper
            const tipperClean = doc.data().TipperClean
            const author = doc.data().Auteur 
            const source = doc.data().Source
            const id = doc.data().ID
            const messages = doc.data().Messages

            const messageDiv = document.createElement("div")
                messageDiv.setAttribute("class", "message-div message-reaction")

                messageDiv.setAttribute("data-id", id)
                messageDiv.setAttribute("data-parentid", parentID)
                messageDiv.setAttribute("data-timestamp", timestamp)

                appendMessageToDOM(timestamp, user, lesson, id, messageDiv, parentID, messages, type, tipper, tipperClean, author, source, user, goal)
        });
    });
}();

function emptyScreenByOnsnapshotMessage(){

    console.log("empty messages")

    const DOMchatScreenGroupChat = document.getElementById("goal-social-wall")

    const chatDivsUser = document.getElementsByClassName("social-wall-coaches-inner-div")

    const chatDivsArrayUser = Array.from(chatDivsUser)

    chatDivsArrayUser.forEach(divs => {

        console.log("empty messages")
        
        DOMchatScreenGroupChat.removeChild(divs)
    });
};

function emptyScreenByOnsnapshotReaction(){
    
    console.log("empty reactions")

    const chatDivsUser = document.getElementsByClassName("reaction-div")

    const chatDivsArrayUser = Array.from(chatDivsUser)

    chatDivsArrayUser.forEach(divs => {

        console.log("empty reactions")
        
        divs.remove();
    });
};

function appendMessageToDOM(timestamp, sender, lesson, id, messageDiv, parentID, messages, type, tipper, tipperClean, author, source, user, goal){

    const innerDiv = document.createElement("div")
        innerDiv.setAttribute("class", "social-wall-coaches-inner-div")
        innerDiv.setAttribute("data-id", id)
    const typeP = document.createElement("p")
        typeP.setAttribute("class", "type-support")
    const lessonP = document.createElement("p")
    const timestampP = document.createElement("p")
        timestampP.setAttribute("class", "timestamp-support")
    const socialIconOuterDiv = document.createElement("div")
    const reactionInputDiv = document.createElement("div")
        reactionInputDiv.setAttribute("class", "reaction-input-div")
    const reactionInput = document.createElement("input")
        reactionInput.setAttribute("type", "text")
        reactionInput.setAttribute("placeholder", "Schrijf hier je reactie")
    const reactionButton = document.createElement("img")
    const loadReactions = document.createElement("p")
        loadReactions.setAttribute("class", "load-reactions")

    loadReactionsButton(loadReactions, messages)

    loadAllReactions(loadReactions, id, goal) 

    saveReaction(reactionButton, reactionInput, id)

    typeDescription(type, typeP, tipper, tipperClean, author, source)

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    timestampP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);
    lessonP.innerHTML = lesson
    reactionButton.src = "../images/send-icon.png"

    innerDiv.appendChild(typeP)
    innerDiv.appendChild(lessonP)
    innerDiv.appendChild(timestampP)
    innerDiv.appendChild(reactionInputDiv)
    innerDiv.appendChild(reactionInputDiv)
    reactionInputDiv.appendChild(reactionInput)
    reactionInputDiv.appendChild(reactionButton)
    innerDiv.appendChild(socialIconOuterDiv)
    innerDiv.appendChild(loadReactions)

    appendMessagesToMessageOrReaction(innerDiv, parentID)

    findLinkInText(lessonP.innerHTML)
};

function findLinkInText(lesson){

    const text = lesson

    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    const links = text.match(urlRegex)

    if(links != null){

    const newText = text.replace(links[0], `<a href="${links}", target="_blank">${links}</a>`)

    lesson.innerHTML = newText

    };
};

function typeDescription(type, typeP, tipper, tipperClean, author, source){

    if(type === "supportTip"){
        typeP.innerHTML = `Bericht van <a href="../Vitaminders/${tipper}">${tipperClean}</a>`
    } else if (type === "Check-in"){
        typeP.innerHTML = "Update"
    } else if (type === "Coach-inzicht"){
        linkAuthorAndArticle(typeP, author, source)
    } else if (type === "Tool: Check in"){
        typeP.innerHTML = 'Tool geactiveerd: <a href="../Tools/Check-in.html">Stok achter de deur</a>'
    };
};

const DOMlessons = document.getElementById("goal-social-wall")

messageDivArray = []

function appendMessagesToMessageOrReaction(messageDiv, parentID){
    messageDivArray.push(messageDiv)

    messageDivArray.forEach(div => {

        const divID = div.dataset.id

        console.log(parentID)

        if(parentID === divID){
            console.log(messageDiv)
            div.appendChild(messageDiv)
            messageDiv.setAttribute("class", "reaction-div")
        } else if (parentID === "None") {
            DOMlessons.appendChild(messageDiv)
            console.log(messageDiv, DOMlessons)
        };
    });
};


function loadReactionsButton(loadReactions, messages){
    
    if(messages === undefined){
        // loadReactions.style.display = "none"
    } else if (messages === 1){
        loadReactions.innerHTML = `Bekijk ${messages.length} reactie` 
    } else {
        loadReactions.innerHTML = `Bekijk ${messages.length} reacties`
    };
};

function loadAllReactions(loadReactionsP, id, goal){
    
    loadReactionsP.addEventListener("click", () => {
        loadReactionsInRealtime(id, goal)
        // loadReactionsP.style.display = "none"
    });
};

function loadReactionsInRealtime(parentID, goal){
    
    db.collectionGroup("CoachLessons")
    .where("Type", "==", "Reaction")
    .orderBy("Timestamp", "desc")
    .where("ParentID", "==", parentID)
    .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {

            const user = doc.data().Gebruikersnaam
            const sender = doc.data().Auth
            const lesson = doc.data().Lesson
            const timestamp = doc.data().Timestamp
            const parentID = doc.data().ParentID
            const id = doc.data().ID
            const messages = doc.data().Messages
            const type = doc.data().Type
            const tipper = doc.data().Tipper
            const tipperClean = doc.data().TipperClean
            const author = doc.data().Auteur 
            const source = doc.data().Sources

            const messageDiv = document.createElement("div")
                messageDiv.setAttribute("class", "message-div message-reaction")
                messageDiv.setAttribute("data-id", id)
                messageDiv.setAttribute("data-parentid", parentID)
                messageDiv.setAttribute("data-timestamp", timestamp)

                // showNewReactions(messageDiv, id)
                appendMessageToDOM(timestamp, sender, lesson, id, messageDiv, parentID, messages, type, tipper, tipperClean, author, source, user, goal)
        });
    });
};
