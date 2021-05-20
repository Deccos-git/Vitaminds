!function queryCoachLessons(){

    const goalWall = document.getElementById("goal-social-wall")
    const title = document.createElement("h2")
    title.innerText = "Mijn proces"
    goalWall.appendChild(title)

    db.collectionGroup("CoachLessons")
    .where("GoalID", "==", IDurl)
    .orderBy("Timestamp", "desc")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const type = doc.data().Type
            const source = doc.data().Source
            const lesson = doc.data().Lesson
            const tip = doc.data().Tip
            const tipperClean = doc.data().TipperClean
            const timestamp = doc.data().Timestamp
            const tipper = doc.data().Tipper

            const innerDiv = document.createElement("div")
                innerDiv.setAttribute("class", "social-wall-coaches-inner-div")
            const typeP = document.createElement("p")
                typeP.setAttribute("class", "type-support")
            const lessonP = document.createElement("p")
            const timestampP = document.createElement("p")
                timestampP.setAttribute("class", "timestamp-support")

            typeSocialWall(type, typeP, tip, lessonP, lesson, source, tipperClean, tipper)
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            timestampP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

            goalWall.appendChild(innerDiv)
            innerDiv.appendChild(typeP)
            innerDiv.appendChild(lessonP)
            innerDiv.appendChild(timestampP)

        });
    });
}();

function typeSocialWall(type, typeP, tip, lessonP, lesson, source, tipperClean, tipper){

    if(type === "ArticleLesson"){
        typeP.innerHTML = `Geinspireerd in artikel: <u>${source}</u>`
        lessonP.innerHTML = `<b>${lesson}</b> `
        linkSupportSource(typeP, "../Kenniscentrum-coaching/" + [source])
    } else if (type === "supportTip"){
        typeP.innerHTML = `Bijdrage van <u>${tipperClean}</u>`
        lessonP.innerHTML = `<b>${tip}</b>`
        linkSupportSource(typeP, "../Vitaminders/" + [tipper])
    };
};

function linkSupportSource(typeP, link){
    typeP.addEventListener("click", () => {
        window.open(link + ".html", "_self");
    });
};

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