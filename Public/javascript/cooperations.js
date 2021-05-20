const IDurl0 = window.location.href.replace(/^.*[\\\/]/, '')
const IDurl = IDurl0.replace('.html', '')

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
        .orderBy("Timestamp", "desc")
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
            numberOfLessons.innerHTML = `<b>Aantal lessen</b>: ${lessons.length}`
            numberOfSupport.innerHTML = `<b>Aantal tips</b>: ${tips.length}`
            dateP.innerHTML = `<b>Laatst actief</b>: ${lastActiveFormatted}`

            coachMeta(coach, profilePhoto, coachName)
            openCoachSupport(button, id)
            metaDivLinkToProfile(metaDiv, coach)

            goalOverview.appendChild(goalCard)
            goalCard.appendChild(metaDiv)
            metaDiv.appendChild(profilePhoto)
            metaDiv.appendChild(coachName)
            goalCard.appendChild(goalTitle)
            goalCard.appendChild(infoDiv)
            infoDiv.appendChild(numberOfLessons)
            infoDiv.appendChild(numberOfSupport)
            infoDiv.appendChild(dateP)
            goalCard.appendChild(button)

            });
        });
    };
}();

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
                        const userName = doc1.data().Gebruikersnaam

                        db.collection("Vitaminders")
                        .doc(User.uid)
                    .collection("CoachLessons")
                    .doc()
                    .set({
                        Username: userName,
                        Tip: tip,
                        Coachgoal: coachGoal,
                        GoalID: idGoal,
                        ID: randomID(),
                        ParentID: "None",
                        Tread: [],
                        Tipper: auth,
                        TipperClean: authClean,
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                    })
                    .then(() => {
                        db.collection("CoachSocialWall")
                        .doc()
                        .set({
                            Username: userName,
                            Tip: tip,
                            Coachgoal: coachGoal,
                            ID: idGoal,
                            ID: randomID(),
                            ParentID: "None",
                            Tread: [],
                            Tipper: auth,
                            TipperClean: authClean,
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            Type: "supportTip"
                        });
                        })
                        .then(() => {
                            db.collection("Vitaminders")
                            .doc(User.uid)
                            .collection("Coachgoals")
                            .doc(doc1.id)
                            .update({
                                LastActive:firebase.firestore.Timestamp.fromDate(new Date()),
                                Tips: firebase.firestore.FieldValue.arrayUnion(tip)
                            });
                        })
                        .then(() => {
                            location.reload(); 
                        });
                    });
                });
            });
        });
    });
};

function saveReaction(supportButton, supportInput, ID){

    supportButton.addEventListener("click", () => {

        const reaction = supportInput.value
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
                        const userName = doc1.data().Gebruikersnaam

                        db.collection("Vitaminders")
                        .doc(User.uid)
                    .collection("CoachLessons")
                    .doc()
                    .set({
                        Username: userName,
                        Lesson: reaction,
                        Coachgoal: coachGoal,
                        GoalID: idGoal,
                        ID: randomID(),
                        ParentID: ID,
                        Tread: [],
                        Tipper: auth,
                        TipperClean: authClean,
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                    })
                    .then(() => {
                        db.collection("CoachSocialWall")
                        .doc()
                        .set({
                            Username: userName,
                            Lesson: reaction,
                            Coachgoal: coachGoal,
                            ID: idGoal,
                            ID: randomID(),
                            ParentID: ID,
                            Tread: [],
                            Tipper: auth,
                            TipperClean: authClean,
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            Type: "supportTip"
                        });
                        })
                        .then(() => {
                            db.collection("Vitaminders")
                            .doc(User.uid)
                            .collection("Coachgoals")
                            .doc(doc1.id)
                            .update({
                                LastActive:firebase.firestore.Timestamp.fromDate(new Date()),
                                Messages: firebase.firestore.FieldValue.arrayUnion(reaction)
                            });
                        })
                        .then(() => {
                            location.reload(); 
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
                supportInput.placeholder = "Schrijf hier je tip, link of vraag."
                supportInput.style.width = "90%"
                supportInput.style.height = "200px"
                supportInput.style.borderRadius = "5px"
            const supportTips = document.createElement("div")
            const supportButton = document.createElement("button")
                supportButton.setAttribute("class", "button-algemeen")
                supportButton.setAttribute("id", "save-support")

            h1.innerText = goalClean
            descriptionP.innerText = description
            supportCTATitle(userName, supportCTA)
            tipsCTASupport(supportTips)
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

function supportCTATitle(userName, supportCTA){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", userName)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const userNameClean = doc.data().GebruikersnaamClean

            supportCTA.innerHTML = `Help ${userNameClean} om zijn/haar doel te bereiken`

        });
    });
};

function tipsCTASupport(tips){

    tips.innerHTML = "<ul><li>Geef een tip</li><li>Link naar een interessante website</li><li>Stel een verdiepende vraag</li></ul>"

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
            const lesson = doc.data().Levensles
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

    const DOMchatScreenGroupChat = document.getElementById("chat-screen")

    const chatDivsUser = document.getElementsByClassName("message-div")

    const chatDivsArrayUser = Array.from(chatDivsUser)

    chatDivsArrayUser.forEach(divs => {

        console.log("empty messages")
        
        DOMchatScreenGroupChat.removeChild(divs)
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

    if(type === "Community-tip"){
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
        loadReactions.innerHTML = `Bekijk ${messages} reactie` 
    } else {
        loadReactions.innerHTML = `Bekijk ${messages} reacties`
    };
};

function loadAllReactions(loadReactionsP, id, goal){
    
    loadReactionsP.addEventListener("click", () => {
        loadReactionsInRealtime(id, goal)
        // loadReactionsP.style.display = "none"
    });
};
