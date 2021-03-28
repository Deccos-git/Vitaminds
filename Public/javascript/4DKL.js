!function getQuestionairyResults(){

    const button = document.getElementById("save-questionairy")

    const somatisitieArray = []
    const distressArray = []
    const angstArray = []
    const depressieArray = []

    button.addEventListener("click", () => {
        const inputs = document.querySelectorAll("input")

        inputs.forEach(input => {
    
            if(input.checked === true){
                const score = input.id

                const categoryAndScore = score.split("-")

                categorySelect(categoryAndScore, somatisitieArray, distressArray, angstArray, depressieArray)

            };
        });

        getTotelScore("somatisitie", somatisitieArray, button)
        getTotelScore("depressie", depressieArray, button)
        getTotelScore("distress", distressArray, button)
        getTotelScore("angst", angstArray, button)
    });

}();
         
         

function categorySelect(categoryAndScore, somatisitieArray, distressArray, angstArray, depressieArray){
    if(categoryAndScore[0] === "1" ||
    categoryAndScore[0] === "2" ||
    categoryAndScore[0] === "3" ||
    categoryAndScore[0] === "4" ||
    categoryAndScore[0] === "5" ||
    categoryAndScore[0] === "6" ||
    categoryAndScore[0] === "7" ||
    categoryAndScore[0] === "8" ||
    categoryAndScore[0] === "9" ||
    categoryAndScore[0] === "10" ||
    categoryAndScore[0] === "11" || 
    categoryAndScore[0] === "12" ||
    categoryAndScore[0] === "13" ||
    categoryAndScore[0] === "14" ||
    categoryAndScore[0] === "15" ||
    categoryAndScore[0] === "16" 
    ){

     somatisitieArray.push(categoryAndScore[1])

 } else if (categoryAndScore[0] === "17" ||
         categoryAndScore[0] === "19" ||
         categoryAndScore[0] === "20" ||
         categoryAndScore[0] === "22" ||
         categoryAndScore[0] === "25" ||
         categoryAndScore[0] === "26" ||
         categoryAndScore[0] === "29" ||
         categoryAndScore[0] === "31" ||
         categoryAndScore[0] === "32" ||
         categoryAndScore[0] === "36" || 
         categoryAndScore[0] === "37" ||
         categoryAndScore[0] === "38" ||
         categoryAndScore[0] === "39" ||
         categoryAndScore[0] === "41" ||
         categoryAndScore[0] === "47" ||
         categoryAndScore[0] === "48"
 ){

     distressArray.push(categoryAndScore[1])

 } else if (categoryAndScore[0] === "17" ||
            categoryAndScore[0] === "18" ||
            categoryAndScore[0] === "21" ||
            categoryAndScore[0] === "23" ||
            categoryAndScore[0] === "24" ||
            categoryAndScore[0] === "27" ||
            categoryAndScore[0] === "40" ||
            categoryAndScore[0] === "42" ||
            categoryAndScore[0] === "43" ||
            categoryAndScore[0] === "44" || 
            categoryAndScore[0] === "45" ||
            categoryAndScore[0] === "49" ||
            categoryAndScore[0] === "50" 
 ){

     angstArray.push(categoryAndScore[1])

 } else if (categoryAndScore[0] === "17" ||
            categoryAndScore[0] === "28" ||
            categoryAndScore[0] === "30" ||
            categoryAndScore[0] === "33" ||
            categoryAndScore[0] === "35" ||
            categoryAndScore[0] === "46" 
 ){

     depressieArray.push(categoryAndScore[1])

 };
}

function getTotelScore(category, array, button){

    const numberArray = []

    array.forEach(score => {

        const scoreNumber = parseInt(score, 10)

        numberArray.push(scoreNumber)

    });

    const totalScore = numberArray.reduce((a, b) => a + b, 0)

    saveTotalScoreToDB(category, totalScore, button)
};

function saveTotalScoreToDB(category, totalScore, button){

    button.innerText = "Opgeslagen"
    button.setAttribute("class", "questioniary-saved")

    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders")
        .doc(User.uid).get().then(doc =>{

            const auth = doc.data().Gebruikersnaam

            db.collection("Vitaminders")
            .doc(doc.id)
            .collection("4DKL")
            .doc()
            .set({
                Score: totalScore,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Owner: "Vitaminds",
                Taker: auth,
                Category: category
            });
        });
    });
};