function titleOfRoom(){
    const titelhtmlCGC = window.location.href.replace(/^.*[\\\/]/, '')
    const titel1CGC = titelhtmlCGC.replace('.html', '')
    const titel2CGC = titel1CGC.replace('%20',' ')
    const titel3CGC = titel2CGC.replace('%20',' ')
    const titel4CGC = titel3CGC.replace('%20',' ')
    const titel5CGC = titel4CGC.replace('%20',' ')
    const titel6CGC = titel5CGC.replace('%20',' ')
    const titel7CGC = titel6CGC.replace('%20',' ')
    const titel8CGC = titel7CGC.replace('%20',' ')
    const titel9CGC = titel8CGC.replace('%20',' ')
    const titel10CGC = titel9CGC.replace('%20',' ')
    const titel11CGC = titel10CGC.replace('%20',' ')
    const titel12CGC = titel11CGC.split("?fb")
    const titelCGC = titel12CGC[0]

    return titelCGC
    };

!function questionOverview(){

    const overviewDom = document.getElementById("question-overview")

    db.collection("CoachQuestion")
    .where("Owner", "==", "Vitaminds")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(doc =>  {

            const auth = doc.data().Auth
            const anonymous = doc.data().Anonymous
            const timestamp = doc.data().Timestamp
            const question = doc.data().Question
            const id = doc.data().ID

            createQuestionCard(auth, question, timestamp, overviewDom, anonymous, id)

        });
    });
}();

function createQuestionCard(authname, question, timestamp, overviewDom, anonymous, id){

    const cardDiv = document.createElement("div")
        cardDiv.setAttribute("class", "card-div")
    const authDiv = document.createElement("div")
        authDiv.setAttribute("class", "question-auth-div")
    const authPhoto = document.createElement("img")
    const authName = document.createElement("p")
    const questionP = document.createElement("p")
    const timestampP = document.createElement("p")
        timestampP.setAttribute("class", "question-timestamp")
    const button = document.createElement("button")

    shortenQuestion(question, questionP)
    button.innerText = "Bekijk"
    addTimestamp(timestampP, timestamp)
    addAuthMeta(authname, authPhoto, authName, anonymous)
    visitCoachQuestion(button, id)

    if(overviewDom != null){

    overviewDom.appendChild(cardDiv)
    cardDiv.appendChild(authDiv)
    authDiv.appendChild(authPhoto)
    authDiv.appendChild(authName)
    cardDiv.appendChild(questionP)
    cardDiv.appendChild(timestampP)
    cardDiv.appendChild(button)
    };
};

function shortenQuestion(question, questionP){

    const c = Array.from(question)

    const lengthArr = c.length

    const shortendSentence = `${c[0]}${c[1]}${c[2]}${c[3]}${c[4]}${c[5]}${c[6]}${c[7]}${c[8]}${c[9]}${c[10]}${c[11]}${c[12]}${c[13]}${c[14]}${c[15]}${c[16]}${c[17]}${c[18]}${c[19]}${c[20]}${c[21]}${c[22]}${c[23]}...`

    if (lengthArr > 20){
        questionP.innerHTML = shortendSentence
    };
};

function addTimestamp(timestampP, timestamp){

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        timestampP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

};

function addAuthMeta(authname, authPhoto, authName, anonymous){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", authname)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(doc =>  {

            const photo = doc.data().Profielfoto
            const nameClean = doc.data().GebruikersnaamClean

            if(anonymous === "Anoniem"){

                console.log(authPhoto)
                authPhoto.src = "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
                authName.innerHTML = 'Anoniem'
            } else {
                authPhoto.src = photo
                authName.innerText = nameClean
            };
        });
    });
};

function visitCoachQuestion(button, id){

    button.addEventListener("click", () => {

        window.open("../Questions/" + [id] + ".html", "_self");

    });
};

!function questionDetailPage(){

    const authPhoto = document.getElementById("auth-div-image")
    const authName = document.getElementById("auth-div-name")
    const questionP = document.getElementById("questionP")

    db.collection("CoachQuestion")
    .where("Owner", "==", "Vitaminds")
    .where("ID", "==", titleOfRoom())
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(doc =>  {

            const auth = doc.data().Auth
            const anonymous = doc.data().Anonymous
            const question = doc.data().Question
            const id = doc.data().ID

            addAuthMeta(auth, authPhoto, authName, anonymous)
            questionP.innerText = question

            saveReactionToDB(doc.id, id)


        });
    });
}();

!function giveReaction(){

    const openReaction = document.getElementById("reaction-button")
    const reactionInputDiv = document.getElementById("reaction-input-div")

    openReaction.addEventListener("click", () => {

        reactionInputDiv.style.display = "flex"
        openReaction.style.display = "none"

    });
}();

function saveReactionToDB(docid, id){

    const button = document.getElementById("send-reaction")

    button.addEventListener("click", () => {

        const reaction = document.getElementById("reaction-input").value
        button.id = "button-clicked"
        button.innerText = "Verzonden"

        auth.onAuthStateChanged(User =>{
            db.collection("Vitaminders")
            .doc(User.uid).get().then(doc => {
    
                const auth = doc.data().Gebruikersnaam
                const nameClean = doc.data().GebruikersnaamClean
                const emailAdress = doc.data().Email

                db.collection("CoachQuestion")
                .doc(docid)
                .collection("Reactions")
                .doc()
                .set({
                    Auth: auth,
                    Reaction: reaction,
                    QuestionID: id,
                    ID: idClean,
                    Owner: "Vitaminds",
                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                })
                .then(() => {
                    sendReactionAsMail(emailAdress, nameClean, auth)
                });
            });
        });
    });
};

function sendReactionAsMail(emailAdress, nameClean, authName){

    console.log(emailAdress)

    db.collection("Mail").doc().set({
        to: emailAdress,
        cc: "info@vitaminds.nu",
        message: {
        subject: `Je hebt een nieuwe reaction ontvangen op je adviesvraag op Vitaminds`,
        html: `Hallo ${nameClean}, <br><br>
                Een coach of psycholoog heeft gereageert op je adviesvraag op Vitaminds <br><br>
                
                Ga naar je <a href="www.vitaminds.nu/Vitaminders/${authName}.html">account</a> om de reactie te lezen.<br>
                Je vindt de reactie in het prive gedeelte van je account onder 'Adviesvragen'.<br><br>

                P.s. Om privacyredenen kun je reactie alleen bekijken als je bent ingelogd in Vitaminds.<br><br>

                Vriendelijke groet, <br></br>
                Het Vitaminds Team <br></br>
                <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
        Gebruikersnaam: name,
        Emailadres: emailAdress,
        Type: "New coachmessage in chat"
        }        
    });
};