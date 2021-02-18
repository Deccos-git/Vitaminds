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


// Community question

!function personalizedTitle(){

    const title = document.getElementById("personalized-question-title")

    if(title != null){

        auth.onAuthStateChanged(User =>{
            db.collection("Vitaminders")
            .doc(User.uid).get().then(doc =>{

                const userName = doc.data().GebruikersnaamClean

                title.innerHTML = `Stel een vraag, ${userName}`

            });
        });
    };
}();

!function saveNewQuestion(){

    const button = document.getElementById("save-question-button")

    if(button != null){

        button.addEventListener("click", () => {

            const input = document.getElementById("input-question").value

            button.innerText = "Ingediend"
            button.id = "Clicked"

            auth.onAuthStateChanged(User =>{
                db.collection("Vitaminders")
                .doc(User.uid).get().then(doc =>{

                    const userName = doc.data().Gebruikersnaam
                    const userNameClean = doc.data().GebruikersnaamClean
                    const userPhoto = doc.data().Profielfoto

                    db.collection("Tools").doc().set({
                        Type: "Question",
                        Question: input,
                        User: userName,
                        Id: idClean,
                        UserPhoto: userPhoto,
                        UserClean: userNameClean,
                        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                        Owner: "Vitaminds"
                    });
                });
            });
        });
    };
}();

function linkToUser(userDiv, userName){

    userDiv.addEventListener("click", () => {

        window.open("../Vitaminders/" + userName + ".html", "_self");

    })

}

!function displayQuestionsInOverview(){

    const DOM = document.getElementById("question-overview")

    db.collection("Tools").where("Type", "==", "Question")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const question = doc.data().Question
            const timestamp = doc.data().Timestamp
            const userClean = doc.data().UserClean
            const userName = doc.data().User
            const userPhoto = doc.data().UserPhoto
            const identifier = doc.data().Id

            const questionInnerDiv = document.createElement("div")
                questionInnerDiv.setAttribute("class", "question-inner-div")
            const userDiv = document.createElement("div")
                userDiv.setAttribute("class", "question-user-div")
            const userPhotoImg = document.createElement("img")
            const userNameP = document.createElement("p")
            const questionP = document.createElement("p")
                questionP.setAttribute("class", "question-p")
            const dateP = document.createElement("p")
                dateP.setAttribute("class", "timestamp-question")
            const socialDiv = document.createElement("div")
                socialDiv.setAttribute("class", "question-social-div")
            const answerIconDiv = document.createElement("div")
                answerIconDiv.setAttribute("class", "answer-icon-div")
            const answerIcon = document.createElement("img")
            const answerIconText = document.createElement("p")

            questionP.innerText = question
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);
            userPhotoImg.src = userPhoto
            userNameP.innerText = userClean
            answerIcon.src = "../images/design/talk-icon.png"
            answerIconText.innerText = "Geef een antwoord"

            DOM.appendChild(questionInnerDiv)
            questionInnerDiv.appendChild(userDiv)
            userDiv.appendChild(userPhotoImg)
            userDiv.appendChild(userNameP)
            questionInnerDiv.appendChild(questionP)
            questionInnerDiv.appendChild(dateP)
            questionInnerDiv.appendChild(socialDiv)
            socialDiv.appendChild(answerIconDiv)
            answerIconDiv.appendChild(answerIcon)
            answerIconDiv.appendChild(answerIconText)

            linkToUser(userDiv, userName)
            addAnswerToQuestionTextarea(answerIconDiv, questionInnerDiv, question, identifier)
            appendAnswersToQuestion(doc.id, identifier, questionInnerDiv)

        });
    });
}();

function addAnswerToQuestionTextarea(answerIcon, questionInnerDiv, question, identifier){

    const replyDiv = document.createElement("div")
            replyDiv.setAttribute("class", "reply-div")
    const textarea = document.createElement("textarea")
        textarea.setAttribute("placeholder", "Jouw antwoord")
    const answerButton = document.createElement("button")
        answerButton.setAttribute("class", "button-algemeen")
        answerButton.setAttribute("data-question", question)
        answerButton.setAttribute("data-idcode", identifier)

        answerButton.innerText = "Verzenden"

    saveAnswer(answerButton, textarea)

    answerIcon.addEventListener("click", () => {
    
        questionInnerDiv.appendChild(replyDiv)
        replyDiv.appendChild(textarea)
        replyDiv.appendChild(answerButton)

    });
};

function saveAnswer(button, textarea){

    button.addEventListener("click", () => {

        button.innerText = "Verzonden"
        button.id = "Clicked"

        const question = button.dataset.question
        const idCode = button.dataset.idcode

        const answer = textarea.value

        auth.onAuthStateChanged(User =>{
            db.collection("Vitaminders")
            .doc(User.uid).get().then(doc =>{

                const userName = doc.data().Gebruikersnaam
                const userNameClean = doc.data().GebruikersnaamClean
                const userPhoto = doc.data().Profielfoto

                db.collection("Tools")
                .where("Question", "==", question)
                .where("Id", "==", idCode)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {

                        db.collection("Tools")
                        .doc(doc.id)
                        .collection("Answer")
                        .doc()
                        .set({
                            Answer: answer,
                            Question: question,
                            QuestionID: idCode,
                            UserName: userName,
                            UserNameClean: userNameClean,
                            UserPhoto: userPhoto,
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            Owner: "Vitaminds",
                            Type: "Answer"
                        });
                    });
                });
            });
        });
    });
};

function appendAnswersToQuestion(documentID, questionID, questionInnerDiv){

    db.collection("Tools").doc(documentID)
    .collection("Answer")
    .where("QuestionID", "==", questionID)
    .orderBy("Timestamp", "desc")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const answer = doc.data().Answer
            const userNameClean = doc.data().UserNameClean
            const userName = doc.data().UserName

            const answerDiv = document.createElement("div")
                answerDiv.setAttribute("class", "answer-div")
            const answerP = document.createElement("p")
                answerP.setAttribute("class", "answer-p")
            const userNameP = document.createElement("p")
                userNameP.setAttribute("class", "answer-username")

            answerP.innerText = answer
            userNameP.innerText = userNameClean

            linkToUser(userNameP, userName)

            questionInnerDiv.appendChild(answerDiv)
            answerDiv.appendChild(userNameP)
            answerDiv.appendChild(answerP)

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

