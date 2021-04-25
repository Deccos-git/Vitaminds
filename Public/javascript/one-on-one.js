!function displayQuestionModal(){

    const button = document.getElementById("ask-button")
    const modal = document.getElementById("question-modal")

    button.addEventListener("click", () => {

        modal.style.display = "flex"

    });
}();

function closeModal(){

    const closeButton = document.getElementById("close-modal-div")
    const modal = document.getElementById("question-modal")

    closeButton.addEventListener("click", () => {
        modal.style.display = "none"
    });
};

!async function fillInAmountOfCoachesAndTherapists(dom, usertype, stringType){

    const coachesTherapists = document.getElementById("amount-of-coaches")

    const amountArray = []

    await db.collection("Vitaminders")
    .where("Usertype", "==", "Coach")
    .where("SubscriptionType", "==", "Premium")
    .where("Status", "==", "Approved")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const username = doc.data().Gebruikersnaam

            amountArray.push(username)

        });
    })

    coachesTherapists.innerHTML = `${amountArray.length} ${"Coaches"}`
}();

!function showNoticeIfVisitor(){

    const input = document.getElementById("question-input")
    const notice = document.getElementById("visitor-notice")
    const anonymous = document.getElementById("radio-outer-div")
    const button = document.getElementById("button-coach-question")

    auth.onAuthStateChanged(User =>{
        if(User){

            input.style.display = "block"
        } else {
            notice.style.display = "block"
            anonymous.style.display = "none"
            button.style.display = "none"
        }
    });
}();

!function authName(){

    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders")
        .doc(User.uid).get().then(doc => {

            const auth = doc.data().Gebruikersnaam

            saveQuestionToDatabase(auth)


        });
    });
}();

function saveQuestionToDatabase(auth){

    const button = document.getElementById("button-coach-question")

    button.addEventListener("click", () => {

        button.setAttribute("id", "button-clicked")
        button.innerText = "Verzonden"

        const input = document.getElementById("question-input").value
        const anonymous = document.querySelector('input[name="reminder"]:checked').value;

        db.collection("CoachQuestion")
        .doc()
        .set({
            Question: input,
            Anonymous: anonymous,
            Auth: auth,
            ID: idClean,
            Read: [],
            Owner: "Vitaminds",
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        }).then(() => {
            closeModalAfterSaving()
        });
    });
};

function closeModalAfterSaving(){

    const modal = document.getElementById("question-modal")

    modal.style.display = "none"

};