const IDurl0 = window.location.href.replace(/^.*[\\\/]/, '')
const IDurl = IDurl0.replace('.html', '')

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
        button.setAttribute("class", "button-algemeen button-support")
    const infoDiv = document.createElement("div")
        infoDiv.setAttribute("class", "info-div")
    const numberOfLessons = document.createElement("p")
    const numberOfSupport = document.createElement("p")
    const dateP = document.createElement("p")
    const lessonP = document.createElement("p")
        lessonP.setAttribute("class", "number-of-lessons-card")

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

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
    infoDiv.appendChild(numberOfLessons)
    infoDiv.appendChild(numberOfSupport)
    infoDiv.appendChild(lessonP)
    goalCard.appendChild(dateP)
    goalCard.appendChild(button)
};

function userMeta(user, profilePhoto, nameP, metaDiv){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", user)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const userClean = doc.data().GebruikersnaamClean
            const photo = doc.data().Profielfoto

            profilePhoto.src = photo
            nameP.innerText = userClean

            if(photo === undefined){
                profilePhoto.src = "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
            };

            metaDiv.addEventListener("click", () => {
                window.open("../Vitaminders/" + user + ".html", "_self");
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

        h1.innerText = goalClean
        descriptionP.innerText = description
        giveAdviseButton.innerText = "Geef advies"
        supportButton.innerText = "Versturen"
        userMeta(user, profilePhoto, nameP)
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

        const tip = supportInput.value

        auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders")
        .doc(User.uid).get().then(doc =>{

            const auth = doc.data().Gebruikersnaam
            const authClean = doc.data().GebruikersnaamClean

                db.collection("Vitaminders").doc(User.uid)
                .collection("Levenslessen").doc().set({
                    Tipper: auth,
                    TipperClean: authClean,
                    Gebruikersnaam: user,
                    Levensles: tip,
                    Levensvraag: goal,
                    Status: "Approved",
                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                    Type: "Community-tip"
                })
                .then(() => {
                    updateGoalLastActive(goal, User.uid)
                });
            });
        });
    });
};

function updateGoalLastActive(goal, useruid){

    db.collectionGroup("Levensvragen")
    .where("Levensvraag", "==", goal)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("Vitaminders").doc(useruid)
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

    tips.innerHTML = "<ul><li>Geef een tip</li><li>Link naar een interessante website</li><li>Stel een verdiepende vraag</li></ul>"

};

function addLessonsToGoal(goal){

    const goalWall = document.getElementById("goal-social-wall")

    db.collectionGroup("Levenslessen")
    .where("Levensvraag", "==", goal)
    .orderBy("Timestamp", "desc")
    .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {

            const lesson = doc.data().Levensles
            const timestamp = doc.data().Timestamp
            const type = doc.data().Type
            const tipper = doc.data().Tipper
            const tipperClean = doc.data().TipperClean
            const author = doc.data().Auteur 
            const source = doc.data().Source

            lessonCard(goalWall, timestamp, lesson, type, tipper, tipperClean, author, source)

        });
    });
};

function lessonCard(goalWall, timestamp, lesson, type, tipper, tipperClean, author, source){

    const innerDiv = document.createElement("div")
        innerDiv.setAttribute("class", "social-wall-coaches-inner-div")
    const typeP = document.createElement("p")
        typeP.setAttribute("class", "type-support")
    const lessonP = document.createElement("p")
    const timestampP = document.createElement("p")
        timestampP.setAttribute("class", "timestamp-support")

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timestampP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);
        lessonP.innerText = lesson
        typeDescription(type, typeP, tipper, tipperClean, author, source)

        goalWall.appendChild(innerDiv)
        innerDiv.appendChild(typeP)
        innerDiv.appendChild(lessonP)
        innerDiv.appendChild(timestampP)

};

function typeDescription(type, typeP, tipper, tipperClean, author, source){

    if(type === "Community-tip"){
        typeP.innerHTML = `Hulp van <a href="../Vitaminders/${tipper}">${tipperClean}</a>`
    } else if (type === "Check-in"){
        typeP.innerHTML = "Check in"
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

