const cooperationsOuterDiv = document.getElementById("cooperations-artikel-outer-div")

function openCooperation(buttonDOM, cooperationTitle){

    buttonDOM.addEventListener("click", () => {

        window.open("../Cooperation/" + [cooperationTitle], "_self");
    });
};

db.collection("Cooperations").where("Eigenaar", "==", "Vitaminds")
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Question
        const bannerImage = doc.data().Banner

        const cooperationInnerDiv = document.createElement("div")
            cooperationInnerDiv.setAttribute("class", "cooperation-inner-div")
        const titleh2 = document.createElement("h2")
        const banner = document.createElement("img")
        const button = document.createElement("button")
            button.setAttribute("class", "button-algemeen")
            button.setAttribute("id", "button-cooperations")
 
        titleh2.innerText = title
        button.innerText = "Praat mee"
        banner.src = bannerImage
       
        cooperationsOuterDiv.appendChild(cooperationInnerDiv)
        cooperationInnerDiv.appendChild(banner)
        cooperationInnerDiv.appendChild(titleh2)
        cooperationInnerDiv.appendChild(button)

        openCooperation(button, title)

    });
});

// Fetching title from url
const titelhtml = window.location.href.replace(/^.*[\\\/]/, '')
const titel1 = titelhtml.replace('.html', '')
const titel2 = titel1.replace('%20',' ')
const titel3 = titel2.replace('%20',' ')
const titel4 = titel3.replace('%20',' ')
const titel5 = titel4.replace('%20',' ')
const titel6 = titel4.replace('%20',' ')
const titel7 = titel6.replace('%20',' ')
const titel8 = titel7.replace('%20',' ')
const titel9 = titel8.replace('%20',' ')
const titel10 = titel9.replace('%20',' ')
const titel11 = titel10.replace('%20',' ')
const titel12 = titel11.split("?fb")
const titel = titel12[0]

const cooperationTitle = document.getElementById("cooperate-title")
const cooperationBanner = document.getElementById("cooperate-banner")
const cooperationDescription = document.getElementById("cooperate-desciption")

db.collection("Cooperations").where("Question", "==", titel)
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

    const description = doc.data().Description
    const title = doc.data().Question
    const banner = doc.data().BannerFull

    cooperationTitle.innerText = title
    cooperationDescription.innerText = description
    cooperationBanner.src = banner

    });
});

!function reactionTitle(){

    const reactionTitleAuth = document.getElementById("give-reaction-title")

    auth.onAuthStateChanged(User =>{
        userRef = db.collection("Vitaminders").doc(User.uid)
        userRef.get()
        .then(doc => {

                const coachClean = doc.data().GebruikersnaamClean

                reactionTitleAuth.innerText = `Wat denk jij, ${coachClean}?`
        });
    });
}();

!function saveNewReaction(){

    const reactionButton = document.getElementById("give-reaction-button")
    const reaction = document.getElementById("give-reaction-input")

    reactionButton.addEventListener("click", () => {

    reactionButton.innerText = "Opgeslagen"

        auth.onAuthStateChanged(User =>{
            userRef = db.collection("Vitaminders").doc(User.uid)
            userRef.get()
            .then(doc => {

                const coach = doc.data().Gebruikersnaam

                db.collection("Cooperations")
                .where("Question", "==", titel)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
        
                        db.collection("Cooperations").doc(doc.id)
                        .collection("ReactionsCooperations").doc().set({
                            Question: titel,
                            Reactor: coach,
                            Reaction: reaction.value,
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            Owner: "Vitaminds",
                        });
                    });
                });
            });
        });
    });
}();

!function loadReactionsToDOM(){

    const reactionsOuterDiv = document.getElementById("reactions-outer-div")

    console.log(titel)

db.collectionGroup("ReactionsCooperations").where("Question", "==", titel)
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const reactor = doc.data().Reactor
        const reaction = doc.data().Reaction

        const reactionInnerDiv = document.createElement("div")
            reactionInnerDiv.setAttribute("class", "reaction-inner-div")
        const reactionP = document.createElement("p")

        reactionP.innerHTML = reaction

            db.collection("Vitaminders")
            .where("Gebruikersnaam", "==", reactor)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {
        
                    const profilePic = doc1.data().Profielfoto
                    const userNameClean = doc1.data().GebruikersnaamClean
        
                    const coachDiv = document.createElement("div")
                        coachDiv.setAttribute("class", ("cooperations-coach-div-reaction"))
                    const coachPic = document.createElement("img")
                    const coachName = document.createElement("p")
                        coachName.setAttribute("class", "cooperations-coachname")
        
                    coachPic.src = profilePic
                    coachName.innerText = userNameClean

                    reactionsOuterDiv.appendChild(reactionInnerDiv)
                    reactionInnerDiv.appendChild(coachDiv)
                    coachDiv.appendChild(coachPic)
                    coachDiv.appendChild(coachName)
                    reactionInnerDiv.appendChild(reactionP)
                });
            });
        });
    });
}();