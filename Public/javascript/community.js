const IDurl0 = window.location.href.replace(/^.*[\\\/]/, '')
const IDurl = IDurl0.replace('.html', '')

// !function ghdsjghd(){

//     db.collectionGroup("Levenslessen")
//     .where("Status", "==", "Approved")
//     .get().then(querySnapshot => {
//         querySnapshot.forEach(doc => {

//             const user = doc.data().Gebruikersnaam

//             db.collection("Vitaminders")
//             .where("Gebruikersnaam", "==", user)
//             .get().then(querySnapshot => {
//                 querySnapshot.forEach(doc1 => {

//                     console.log(user)

//                     db.collection("Vitaminders")
//                     .doc(doc1.id)
//                     .collection("Levenslessen")
//                     .doc(doc.id)
//                     .update({
//                         ParentID: "None"
//                     })

//                 });
//             });
//         });
//     });
// }();

// Community overview

!function hideNoticeMakeAccountIfAuth(){

    const authButton = document.getElementsByClassName("open-community-element")
    const noticeVisitorDiv = document.getElementsByClassName("notice-visitor")

    if(authButton != null || noticeVisitorDiv != null){
       
        auth.onAuthStateChanged(User =>{
            if(User){

                const authButtonArray = Array.from(authButton)
                authButtonArray.forEach(button => {

                    button.style.display = "block"
                });

                const noticeVisitorDivArray = Array.from(noticeVisitorDiv)
                noticeVisitorDivArray.forEach(noticeDiv => {
                    noticeDiv.style.display = "none"
                });
            };
        });
    };
}();

function showVisitorNotice(buttonElement, noticeElement){

    const button = document.getElementById(buttonElement)
    const notice = document.getElementById(noticeElement)

    if(button != null || notice != null){

        button.addEventListener("click", () => {

            notice.style.display = "block"

        });
    };
};

showVisitorNotice("visitor-button-open-up", "notice-open-up")
showVisitorNotice("visitor-button-gratitude", "notice-gratitude")
showVisitorNotice("visitor-button-happiness", "notice-happiness")
showVisitorNotice("visitor-button-questions", "notice-questions")
showVisitorNotice("visitor-button-promotions", "notice-promotions")


// Gratitude

!function participate(){

    const participateButton = document.getElementsByClassName("participate-CTA")
    const participateExplainer = document.getElementsByClassName("participate-explainer")

    const participateButtonArray = Array.from(participateButton)

    participateButtonArray.forEach(button => {

        button.addEventListener("click", () => {

            participateExplainerArray = Array.from(participateExplainer)

            participateExplainerArray.forEach(explainer => {

                if (explainer.style.display === "block"){
                    explainer.style.display = "none"
                } else if (explainer.style.display === ""){
                    explainer.style.display = "block"
                } else if (explainer.style.display === "none"){
                    explainer.style.display = "block"
                }
            });
        });
    });
}();


!function displayGratitudesInOverview(){

    const journalPage = document.getElementById("page-div")

    if(journalPage != null){

        db.collection("Tools")
        .where("Type", "==", "Gratitude")
        .where("PublicPrivate", "==", "Public")
        .orderBy("Timestamp", "desc")
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const gratitude = doc.data().Gratitude
                        const timestamp = doc.data().Timestamp
                        const name = doc.data().User

                        const gratitudeDiv = document.createElement("div")
                                gratitudeDiv.setAttribute("class", "gratitude-div")
                        const gratitudeH3 = document.createElement("h3")
                        const dateP = document.createElement("p")
                        const userDiv = document.createElement("div")
                        const nameP = document.createElement("p")
                            nameP.setAttribute("class", "gratitude-username")

                        gratitudeH3.innerText = gratitude
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                            dateP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options)
                        
                        db.collection("Vitaminders")
                        .where("Gebruikersnaam", "==", name)
                        .get().then(querySnapshot => {
                            querySnapshot.forEach(doc1 => {

                                const userName = doc1.data().GebruikersnaamClean

                                nameP.innerText = userName

                                nameP.addEventListener("click", () => {
                                    window.open("../Vitaminders/" + name + ".html", "_self");
                                });

                        journalPage.appendChild(gratitudeDiv)
                        gratitudeDiv.appendChild(userDiv)
                        userDiv.appendChild(nameP)
                        gratitudeDiv.appendChild(gratitudeH3)
                        gratitudeDiv.appendChild(dateP)

                            });
                        });
                });
        });
    };
}();

// Hapiness scale

const veryLow = document.getElementsByClassName("hapiness-scale-img")

const hapinessChart = document.getElementById('hapiness-chart-combined')

    function hapinessChartAxis(dates, heightOfHapiness){

        if(hapinessChart != null){

    const myChart = new Chart(hapinessChart.getContext('2d'), {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Geluksniveau',
                    data: heightOfHapiness,
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
};

const dateArray = []
const heightArray = []

        db.collectionGroup("HapinessScale")
        .orderBy("Timestamp", "asc")
        .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    const height = doc.data().Height
                    const date = doc.data().Timestamp

                    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
                    const dateLocale = date.toDate().toLocaleDateString("nl-NL", options);

                    dateArray.push(dateLocale) 
                    heightArray.push(height)

                    hapinessChartAxis(dateArray, heightArray)

                });
        });

// Community resources

!function showCommunityResources(){

    const resourcesOverview = document.getElementById("resource-div")

    if(resourcesOverview != null){

        db.collection("Tools")
        .where("Type", "==", "Resource")
        .orderBy("Timestamp", "asc")
        .where("PublicPrivate", "==", "Public")
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const resource = doc.data().Resource
                const author = doc.data().User
                const date = doc.data().Timestamp

                const resourceInnerDiv = document.createElement("div")
                    resourceInnerDiv.setAttribute("class", "resource-inner-div")
                const resourceP = document.createElement("p")
                    resourceP.setAttribute("class", "resource-p")
                const authorP = document.createElement("p")
                    authorP.setAttribute("class", "resource-author")
                const dateP = document.createElement("p")
                    dateP.setAttribute("class", "resource-date")

                resourceP.innerText = resource

                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                dateP.innerHTML = date.toDate().toLocaleDateString("nl-NL", options)

                showAuthorNameOfResource(author, authorP)

                resourcesOverview.appendChild(resourceInnerDiv)
                resourceInnerDiv.appendChild(authorP)
                resourceInnerDiv.appendChild(resourceP) 
                resourceInnerDiv.appendChild(dateP)

            });
        });
    };
}();

function showAuthorNameOfResource(author, authorP){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", author)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const authorClean = doc.data().GebruikersnaamClean

            authorP.innerText = authorClean

        });
    });
};


// Goals

!function goalQuery(){

    const domOverview = document.getElementById("goal-overview")

    db.collectionGroup("Levensvragen")
    .where("Openbaar", "==", "Ja")
    .orderBy("LastActive", "desc")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const goalClean = doc.data().LevensvraagClean
            const user = doc.data().Gebruikersnaam
            const id = doc.data().ID
            const lessons = doc.data().Lessons

            goalCard(goalClean, domOverview, user, id, lessons)

        });
    });
}();

function goalCard(goalClean, domOverview, user, id, lessons){

    const goalCard = document.createElement("div")
        goalCard.setAttribute("class", "goal-card")
    const goalTitle = document.createElement("h2")
    const metaDiv = document.createElement("div")
        metaDiv.setAttribute("class", "meta-div")
    const profilePhoto = document.createElement("img")
        profilePhoto.setAttribute("class", "profile-photo")
    const nameP = document.createElement("p")
        nameP.setAttribute("class", "coach-name")
    const button = document.createElement("button")
        button.setAttribute("class", "button-support")
    const infoDiv = document.createElement("div")
        infoDiv.setAttribute("class", "info-div")
    const lessonP = document.createElement("p")
        lessonP.setAttribute("class", "number-of-lessons-card")

    goalTitle.innerText = goalClean
    button.innerText = "Bekijk"
    lessonP.innerText = `Aantal lessen: ${lessons}`

    userMeta(user, profilePhoto, nameP,  metaDiv)
    openGoal(button, id)

    domOverview.appendChild(goalCard)
    goalCard.appendChild(metaDiv)
    metaDiv.appendChild(profilePhoto)
    metaDiv.appendChild(nameP)
    goalCard.appendChild(goalTitle)
    goalCard.appendChild(infoDiv)
    infoDiv.appendChild(lessonP)
    goalCard.appendChild(button)
};

function userMeta(user, profilePhoto, nameP, metaDiv){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", user)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const userClean = doc.data().GebruikersnaamClean
            const photo = doc.data().Profielfoto
            const userName = doc.data().Gebruikersnaam

            profilePhoto.src = photo
            nameP.innerText = userClean

            if(photo === undefined){
                profilePhoto.src = "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
            };

            metaDiv.addEventListener("click", () => {
                window.open("../Vitaminders/" + userName + ".html", "_self");
            });

        });
    });
};

function openGoal(button, id){

    button.addEventListener("click", () => {

        window.open("../Goals/" + id, "_self")
    });
};

!function goalDetailPage(){

    db.collectionGroup("Levensvragen")
    .where("ID", "==", IDurl)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const goalClean = doc.data().LevensvraagClean
            const goal = doc.data().Levensvraag
            const description = doc.data().Omschrijving
            const user = doc.data().Gebruikersnaam

            createDomElements(goalClean, description, user, goal)
            addLessonsToGoal(goal)

        });
    });
}();

function createDomElements(goalClean, description, user, goal){

    const outerDiv = document.getElementById("goal-wall")

    const metaDiv = document.createElement("div")
        metaDiv.setAttribute("class", "meta-div")
    const profilePhoto = document.createElement("img")
        profilePhoto.setAttribute("class", "profile-photo")
    const nameP = document.createElement("p")
        nameP.setAttribute("class", "coach-name")
    const h1 = document.createElement("h1")
    const descriptionP = document.createElement("p")
        descriptionP.setAttribute("class", "goal-description")
    const giveAdviseButton = document.createElement("button")
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
        supportButton.setAttribute("data-user", user)

        h1.innerText = goalClean
        descriptionP.innerText = description
        giveAdviseButton.innerText = "Geef advies"
        supportButton.innerText = "Versturen"
        userMeta(user, profilePhoto, nameP, metaDiv)
        metaDivLinkToProfile(metaDiv, nameP)
        supportCTATitle(user, supportCTA)
        tipsCTASupport(supportTips)
        saveTip(supportButton, user, supportInput, goal)

        outerDiv.appendChild(metaDiv)
        metaDiv.appendChild(profilePhoto)
        metaDiv.appendChild(nameP)
        outerDiv.appendChild(h1)
        outerDiv.appendChild(descriptionP)
        // outerDiv.appendChild(giveAdviseButton)
        outerDiv.appendChild(supportCTADiv)
        supportCTADiv.appendChild(supportCTA)
        supportCTADiv.appendChild(supportTips)
        supportCTADiv.appendChild(supportInput)
        supportCTADiv.appendChild(supportButton)

};

function saveTip(supportButton, user, supportInput, goal){

    supportButton.addEventListener("click", () => {

        supportButton.setAttribute("class", "button-clicked")
        supportButton.innerText = "Verstuurd"

        const userName = supportButton.dataset.user
        supportInput.innerText = ""

        const tip = supportInput.value

        auth.onAuthStateChanged(User =>{
            if(User){
                db.collection("Vitaminders")
                .doc(User.uid)
                .get().then(function(doc) {

                const auth = doc.data().Gebruikersnaam
                const authClean = doc.data().GebruikersnaamClean

                        db.collection("Vitaminders")
                        .where("Gebruikersnaam", "==", user)
                        .get().then(querySnapshot => {
                            querySnapshot.forEach(doc => {

                                const email = doc.data().Email
                                const nameClean = doc.data().GebruikersnaamClean

                            db.collection("Vitaminders").doc(doc.id)
                            .collection("Levenslessen").doc().set({
                                Tipper: auth,
                                TipperClean: authClean,
                                Gebruikersnaam: user,
                                New: true,
                                ID: idClean,
                                ParentID: "None",
                                Levensles: tip,
                                Levensvraag: goal,
                                Status: "Approved",
                                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                Type: "Community-tip"
                            })
                            .then(() => {
                                updateGoalLastActive(goal, doc.id)
                                sendNewInspirationMail(email, nameClean, user)
                            });
                        });
                    });
                });
            };
        });
    });
};

function sendNewInspirationMail(emailAdress, naamClean, name){

    db.collection("Mail").doc().set({
        to: emailAdress,
        cc: "info@vitaminds.nu",
        message: {
        subject: `Je hebt nieuwe inspiratie ontvangen op je ontwikkeldoel`,
        html: `Hallo ${naamClean}, <br><br>
                Je hebt een nieuwe inspiratie ontvangen op je ontwikkeldoel. <br><br>
                
                Bekijk je nieuwe inspiratie <a href="https://vitaminds.nu/Goals/${IDurl}">hier</a>.<br></br>

                Vriendelijke groet, <br></br>
                Het Vitaminds Team <br></br>
                <img src="https://vitaminds.nu/images/design/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`,
        Gebruikersnaam: name,
        Emailadres: emailAdress,
        Type: "Inspiration on goal"
        }        
    }); 
};

function updateGoalLastActive(goal, docid){

    db.collectionGroup("Levensvragen")
    .where("Levensvraag", "==", goal)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("Vitaminders").doc(docid)
            .collection("Levensvragen")
            .doc(doc.id)
            .update({
                LastActive: firebase.firestore.Timestamp.fromDate(new Date()),
                Lessons: firebase.firestore.FieldValue.increment(1)
            });
        });
    });
};

function metaDivLinkToProfile(metaDiv, nameP){

    metaDiv.addEventListener("click", () => {
        window.open("../Vitaminders/" + nameP + ".html", "_self");
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

    tips.innerHTML = "<ul><li>Geef een tip</li><li>Link naar een interessante website/artikel</li><li>Stel een verdiepende vraag</li></ul>"

};

// Lessons

const DOMlessons = document.getElementById("goal-social-wall")

function randomID(){

    const id = Math.random() 
    const idAlpha = id.toString(36)
    const idMessage = idAlpha.replace("0.", "")

    return idMessage
};

function emptyScreenByOnsnapshotReaction(){
    
    console.log("empty reactions")

    const DOMchatScreenGroupChat = document.getElementById("chat-screen")

    const chatDivsUser = document.getElementsByClassName("reaction-div")

    const chatDivsArrayUser = Array.from(chatDivsUser)

    chatDivsArrayUser.forEach(divs => {

        console.log("empty reactions")
        
        divs.remove();
    });
};

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

function addLessonsToGoal(goal){
    
    db.collectionGroup("Levenslessen")
    .where("Levensvraag", "==", goal)
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

                showNewMessages(messageDiv, id)
                appendMessageToDOM(timestamp, user, lesson, id, messageDiv, parentID, messages, type, tipper, tipperClean, author, source, user, goal)
        });
    });
};

const messageIDList = localStorage.getItem("IDs")

function showNewMessages(messageDiv, id){
    
    if(messageIDList != null){
        const messageIDArray = messageIDList.split(",")

        if(messageIDArray.includes(id)){

            messageDiv.style.borderColor = "#8e0000" 
            removeNewMessageBorderColorOnHover(messageDiv, id, messageIDArray)

        };
    };
};

function loadReactionsInRealtime(parentID, goal){
    
    db.collectionGroup("Levenslessen")
    .where("Type", "==", "Reaction")
    .orderBy("Timestamp", "desc")
    .where("ParentID", "==", parentID)
    .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {

            const user = doc.data().Gebruikersnaam
            const sender = doc.data().Auth
            const lesson = doc.data().Levensles
            const timestamp = doc.data().Timestamp
            const parentID = doc.data().ParentID
            const id = doc.data().ID
            const messages = doc.data().Messages
            const type = doc.data().Type
            const tipper = doc.data().Tipper
            const tipperClean = doc.data().TipperClean
            const author = doc.data().Auteur 
            const source = doc.data().Source

            console.log(user)

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

function loadAllReactions(loadReactionsP, id, goal){
    
    loadReactionsP.addEventListener("click", () => {
        loadReactionsInRealtime(id, goal)
        // loadReactionsP.style.display = "none"
    });
};

messageDivArray = []
    
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
    
    console.log(user)

    saveReaction(reactionButton, reactionInput, user, id, goal)

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


function loadReactionsButton(loadReactions, messages){
    
    if(messages === undefined){
        // loadReactions.style.display = "none"
    } else if (messages === 1){
        loadReactions.innerHTML = `Bekijk ${messages} reactie` 
    } else {
        loadReactions.innerHTML = `Bekijk ${messages} reacties`
    };
};

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

function saveReaction(reactionButton, reactionInput, user, ID, goal){

    reactionButton.addEventListener("click", () => {

        const input = reactionInput.value
        reactionInput.value = ""
        const thread = [idClean]
        const parentID = ID

            auth.onAuthStateChanged(User =>{
              db.collection("Vitaminders")
              .doc(User.uid)
              .get()
              .then(function(doc2) {

                const auth = doc2.data().Gebruikersnaam

                db.collection("Vitaminders")
                .where("Gebruikersnaam", "==", user)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {

                        db.collection("Vitaminders")
                        .doc(doc.id)
                        .collection("Levenslessen")
                        .doc()
                        .set({
                            Levensles: input,
                            Levensvraag: goal,
                            ID: randomID(),
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            Gebruikersnaam: auth,
                            Gebruikersnaam: user,
                            ParentID: ID,
                            Tread: [],
                            New: true,
                            Type: "Reaction"
                        })
                        .then(() => {
                            addIdToThread(parentID, thread)
                            // updateNumberOfReactionsInMessage(parentID, doc.id)
                        });
                    });
                });
            });
        });
    });
};

function addIdToThread(parentID, thread){
    
    db.collectionGroup("Levenslessen")
    .where("ID", "==", parentID)
    .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {

            const threadParent = doc.data().Tread

            threadParent.forEach(thr => {
                thread.push(thr)
            });
        });
    });
};

// function updateNumberOfReactionsInMessage(parentID, docid){

//     db.collectionGroup("Levenslessen")
//     .where("ID", "==", parentID)
//     .onSnapshot(querySnapshot => {
//         querySnapshot.forEach(doc1 => {

//             console.log("update")

//             db.collection("Vitaminders")
//             .doc(docid)
//             .collection("Levenslessen")
//             .doc(doc1.id)
//             .update({
//                 Messages: firebase.firestore.FieldValue.increment(1)
//             });
//         });
//     });
// };



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

function linkAuthorAndArticle(typeP, author, source){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", author)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const coach = doc.data().GebruikersnaamClean

            typeP.innerHTML = `Geïnspireerd door <a href="../Vitaminders/${author}">${coach}</a> in artikel <a href="../Artikelen/${source}.html">${source}</a>`

        });
    });
};

function socialStartIcon(socialIconOuterDiv, socialIconDiv){
    
    startIcon = document.createElement("img")
        startIcon.setAttribute("class", "socials-start-icon")

    startIcon.src = "../images/heart-icon.png"

    socialIconOuterDiv.appendChild(startIcon)

    startIcon.addEventListener("mouseover", () => {
        socialIconDiv.style.display = "flex"
        startIcon.style.display = "none"
    });

    socialIconDiv.addEventListener("mouseleave", () => {
        socialIconDiv.style.display = "none"
        startIcon.style.display = "flex"
    });

};

function addDataToSocial(supportType, userName, message){
        
    supportType.setAttribute("data-username", userName)
    supportType.setAttribute("data-message", message)

};

function addSocialIconsToMessage(user, message, socialIconOuterDiv, innerDiv){
    
    const socialIconDiv = document.createElement("div")
    socialIconDiv.setAttribute("class", "social-div-goals") 

    const IFeelForYouIconDiv = document.createElement("div")
    const InspirationIconDiv = document.createElement("div")
    const yourGoodTheWayYouAreDiv = document.createElement("div")
    const keepAtItDiv = document.createElement("div")
    const yourNotAloneDiv = document.createElement("div")

    const IFeelForYouIconP = document.createElement("p")
        IFeelForYouIconP.setAttribute("class", "social-icon-p")
    const InspirationIconP = document.createElement("p")
    InspirationIconP.setAttribute("class", "social-icon-p")
    const yourGoodTheWayYouAreP = document.createElement("p")
        yourGoodTheWayYouAreP.setAttribute("class", "social-icon-p")
    const keepAtItP = document.createElement("p")
        keepAtItP.setAttribute("class", "social-icon-p")
    const yourNotAloneP = document.createElement("p")
        yourNotAloneP.setAttribute("class", "social-icon-p")

    IFeelForYouIconP.innerHTML = "Ik leef <br> met je mee"
    InspirationIconP.innerHTML = "Inspirerend"
    yourGoodTheWayYouAreP.innerHTML = "Je bent goed <br> zoals je bent"
    keepAtItP.innerHTML = "Ga zo door!"
    yourNotAloneP.innerHTML = "Je staat er <br> niet alleen voor"

    IFeelForYouIconDiv.setAttribute("class", "social-icon-div") 
    InspirationIconDiv.setAttribute("class", "social-icon-div")  
    yourGoodTheWayYouAreDiv.setAttribute("class", "social-icon-div") 
    keepAtItDiv.setAttribute("class", "social-icon-div") 
    yourNotAloneDiv.setAttribute("class", "social-icon-div") 

    addDataToSocial(IFeelForYouIconDiv, user, message)
    addDataToSocial(InspirationIconDiv, user, message)
    addDataToSocial(yourGoodTheWayYouAreDiv, user, message)
    addDataToSocial(keepAtItDiv, user, message)
    addDataToSocial(yourNotAloneDiv, user, message)

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

                const auth = doc.data().Gebruikersnaam

                savebutton(IFeelForYouIconDiv, "IFeelForYou", auth, IFeelForYouIconP, "Ik leef met je mee")
                savebutton(InspirationIconDiv, "Inspiration", auth, InspirationIconP, "Inspirerend")
                savebutton(yourGoodTheWayYouAreDiv, "YourGoodTheWayYouAre", auth, yourGoodTheWayYouAreP, "Je bent goed zoals je bent")
                savebutton(keepAtItDiv, "KeepAtIt", auth, keepAtItP, "Ga zo door!")
                savebutton(yourNotAloneDiv, "YourNotAlone", auth, yourNotAloneP, "Je staat er niet alleen voor")

            });
        };
    });

    const IFeelForYouIcon = document.createElement("img")
    const InspirationIcon = document.createElement("img")
    const yourGoodTheWayYouAre = document.createElement("img")
    const keepAtIt = document.createElement("img")
    const yourNotAlone = document.createElement("img")

    IFeelForYouIcon.src = "../images/design/person-24px-heart.png"
    InspirationIcon.src = "../images/comparison-icon.png"
    yourGoodTheWayYouAre.src = "../images/design/person-24px-check.png"
    keepAtIt.src = "../images/heart-icon.png"
    yourNotAlone.src = "../images/design/group-24px.png"

    socialIconDiv.appendChild(IFeelForYouIconDiv)
    IFeelForYouIconDiv.appendChild(IFeelForYouIcon)
    IFeelForYouIconDiv.appendChild(IFeelForYouIconP)
    socialIconDiv.appendChild(InspirationIconDiv)
    InspirationIconDiv.appendChild(InspirationIcon)
    InspirationIconDiv.appendChild(InspirationIconP)
    socialIconDiv.appendChild(yourGoodTheWayYouAreDiv)
    yourGoodTheWayYouAreDiv.appendChild(yourGoodTheWayYouAre)
    yourGoodTheWayYouAreDiv.appendChild(yourGoodTheWayYouAreP)
    socialIconDiv.appendChild(keepAtItDiv)
    keepAtItDiv.appendChild(keepAtIt)
    keepAtItDiv.appendChild(keepAtItP)
    socialIconDiv.appendChild(yourNotAloneDiv)
    yourNotAloneDiv.appendChild(yourNotAlone)
    yourNotAloneDiv.appendChild(yourNotAloneP)

    socialStartIcon(socialIconOuterDiv, socialIconDiv)
    socialIconOuterDiv.appendChild(socialIconDiv)
}

function showSocialDescription(iconDiv, iconP){
    iconDiv.addEventListener("mouseover", () => {
        iconP.style.display = "block"
    });

    iconDiv.addEventListener("mouseout", () => {
        iconP.style.display = "none"
    });
};

function savebutton(supportType, support, auth, notice, socialTypeWritten){
    
    supportType.addEventListener("click", () => {

        const username = supportType.dataset.username
        const message = supportType.dataset.message

        // saveInMessage(support, username, message)
        saveInUser(username, auth, message, support, socialTypeWritten)

        notice.innerText = "Verstuurd"
        notice.style.color = "#8e0000"

    });
};

function saveInMessage(support, username, message){
    
    db.collection("Coachgroups")
    .where("Room", "==", titleOfRoom())
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("Coachgroups")
            .doc(doc.id)
            .collection("Messages")
            .where("Room", "==", titleOfRoom())
            .where("Auth", "==", username)
            .where("Message", "==", message)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    db.collection("Coachgroups")
                    .doc(doc.id)
                    .collection("Messages")
                    .doc(doc1.id)
                    .update({
                        Support: firebase.firestore.FieldValue.arrayUnion(support)
                    });
                });
            });
        });
    });
};

function saveInUser(username, giver, message, support, socialTypeWritten){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", username)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const email = doc.data().Email
            const usernameClean = doc.data().GebruikersnaamClean

            sendMailNewSocial(email, usernameClean, socialTypeWritten)

            db.collection("Vitaminders")
            .doc(doc.id)
            .collection("Support")
            .doc()
            .set({
                Type: support,
                Giver: giver,
                Reciever: username,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Message: message,
                Source: IDurl,
                SourceType: "Goals",
                Status: "New"
            });
        });
    });
};

function sendMailNewSocial(email, gebruikersnaamClean, socialTypeWritten){

    db.collection("Mail").doc().set({
        to: email,
        cc: "info@vitaminds.nu",
        message: {
        subject: `Nieuwe steunreactie op Vitaminds`,
        html: `Hallo ${gebruikersnaamClean},</br></br>
        
        Je hebt een nieuwe steunreactie: <b>"${socialTypeWritten}"</b>.</br></br>

        Ga naar <a href="www.vitaminds.nu">Vitaminds</a> en bekijk je nieuwe reactie.</br></br>
        
        Vriendelijke groet, </br></br>
        Het Vitaminds Team </br></br>
        <img src="https://vitaminds.nu/images/design/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`
        }
                
        }).catch((err) => {
        console.log(err)
        });
};


// Promotions

!function saveRegistrations(){

    const registrationButton = document.getElementsByClassName("submit-interest")

    if(registrationButton != null){

        const buttonArray = Array.from(registrationButton)

        buttonArray.forEach(button => {

            button.addEventListener("click", () => {

                button.innerText = "Opgeslagen"
                button.id = "Clicked"

                const titel = button.dataset.title

                saveRegistrationToDB(titel)

            });
        });
    };
}();

function saveRegistrationToDB(titel){

    auth.onAuthStateChanged(User =>{
        if (User){
            db.collection("Vitaminders")
            .doc(User.uid)
            .get().then(function(doc){

                const auth = doc.data().Gebruikersnaam

                db.collection("Promotions")
                .doc(doc.id)
                .set({
                    Title: titel,
                    Regsitration: auth
                });
            });
        };
    });
};

