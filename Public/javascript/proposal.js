// Proposal naar database
function proposalGoal(){
    const title = document.getElementById("proposal-title").value
    const summary = document.getElementById("proposal-summary").value

    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders").doc(User.uid).get()
         .then(doc => {
                 const naam = doc.data().Gebruikersnaam

    db.collection("Proposal").doc().set({
        Title: title,
        Summary: summary,
        Coach: naam,
        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            });
        })
    });

    const proposalNotification = document.getElementById("proposal-notification")
        proposalNotification.style.display = "block"
};