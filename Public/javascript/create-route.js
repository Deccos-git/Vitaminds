function appendGoalsToselect(goal){

    const goalSelect = document.getElementById("select-route-goal")

    const option = document.createElement("option")

    option.innerText = goal

    goalSelect.appendChild(option)

};

!function databaseQueryRouteGoals(){

    db.collection("Levensvragen")
    .where("Eigenaar", "==", "Vitaminds")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const goalClean = doc.data().Levensvraag

            appendGoalsToselect(goalClean)

        });
    });
}();

!function fillNextStepBasedOnAuthOrVisitor(){

    const nextStepVisitor = document.getElementById("route-next-step-visitor")
    const nextStepAuth = document.getElementById("route-next-step-auth")

    auth.onAuthStateChanged(User =>{
        if(User){
         
            nextStepAuth.style.display = "flex"
            nextStepVisitor.style.display = "none"

        };
    });  
}();