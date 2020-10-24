const DOM = document.getElementById("casus-overview")

// New casus

const nexCasusTitle = document.getElementById("new-casus-title-input")
const newCasusDespription = document.getElementById("new-casus-description")
const saveCasusButton = document.getElementById("submit-casus")
const newCasusCTA = document.getElementById("new-casus")
const createCasus = document.getElementById("create-casus")

!function newCasusTextAreaPlaceholder(){

    auth.onAuthStateChanged(User =>{
        userRef = db.collection("Vitaminders").doc(User.uid)
        userRef.get()
        .then(doc => {

                const coachClean = doc.data().GebruikersnaamClean

                newCasusCTA.placeholder = `Dien een nieuwe casus in, ${coachClean}`

        });
    });
}();

!function newCasusTextArea(){

    newCasusCTA.addEventListener("click", () => {

        createCasus.style.display = "flex"
        newCasusCTA.style.display = "none"

    })

}();

function saveNewCasus(){

    auth.onAuthStateChanged(User =>{
        userRef = db.collection("Vitaminders").doc(User.uid)
        userRef.get()
        .then(doc => {

                const coach = doc.data().Gebruikersnaam
                const coachClean = doc.data().GebruikersnaamClean

            db.collection("Intervisie").doc().set({
                Coach: coach,
                CoachClean: coachClean,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Owner: "Vitaminds",
                Title: nexCasusTitle.value,
                Description: newCasusDespription.value
            });
        });
    });
};

!function submitNewCasus(){

    saveCasusButton.addEventListener("click", () => {
        console.log("test")
        saveNewCasus()
    });
}();

// Casus overview

const casusDivOverview = document.getElementById("casus-outer-div")

db.collection("Intervisie")
.where("Owner", "==", "Vitaminds")
.orderBy("Timestamp", "desc")
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const titel = doc.data().Title
        const coachClean = doc.data().CoachClean
        const coach = doc.data().Coach
        const description = doc.data().Description

        const casusInnerDiv = document.createElement("div")
            casusInnerDiv.setAttribute("class", "casus-inner-div")
        const casusTitleh3 = document.createElement("h3")
        const bannerDiv = document.createElement("div")
            bannerDiv.setAttribute("id", "casus-banner-div")
        const descriptionP = document.createElement("p")
        const buttonDiv = document.createElement("div")
        const casusButton = document.createElement("button")
            casusButton.setAttribute("class", "button-algemeen")
            casusButton.setAttribute("id", "casus-button")
            casusButton.setAttribute("data-coach", coach)
            casusButton.setAttribute("data-title", titel)

        casusTitleh3.innerText = titel
        descriptionP.innerText = description
        casusButton.innerText = "Bekijk casus"

            db.collection("Vitaminders")
            .where("Gebruikersnaam", "==", coach)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
        
                    const profilePic = doc.data().Profielfoto
        
                    const coachDiv = document.createElement("div")
                        coachDiv.setAttribute("class", ("casus-coach-div"))
                    const coachPic = document.createElement("img")
                    const coachName = document.createElement("p")
                        coachName.setAttribute("class", "casus-coachname")
        
                    coachPic.src = profilePic
                    coachName.innerText = coachClean
        
                    casusDivOverview.appendChild(casusInnerDiv)
                    casusInnerDiv.appendChild(coachDiv)
                    coachDiv.appendChild(coachPic)
                    coachDiv.appendChild(coachName)

        casusInnerDiv.appendChild(casusTitleh3)
        casusInnerDiv.appendChild(bannerDiv)
        casusInnerDiv.appendChild(descriptionP)
        casusInnerDiv.appendChild(buttonDiv)
        buttonDiv.appendChild(casusButton)

        openCasusDetails(casusButton)

            });
        });   
    });
});

function openCasusDetails(casusButtonDOM){

    casusButtonDOM.addEventListener("click", () => {

        const casusTitle = casusButtonDOM.dataset.title

        window.open("../Intervisions/" + [casusTitle], "_self");
    })

};

// Casus detail page

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

console.log(titel)