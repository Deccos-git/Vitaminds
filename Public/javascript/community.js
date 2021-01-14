!function participate(){

    const participateButton = document.getElementsByClassName("participate-CTA")
    const participateExplainer = document.getElementsByClassName("participate-explainer")

    const participateButtonArray = Array.from(participateButton)

    participateButtonArray.forEach(button => {

        button.addEventListener("click", () => {

            participateExplainerArray = Array.from(participateExplainer)

            participateExplainerArray.forEach(explainer => {

                console.log(explainer.style.display)

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

    db.collection("Tools")
    .where("Type", "==", "Gratitude")
    .where("PublicPrivate", "==", "Public")
    .orderBy("Timestamp", "desc")
    .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                    const gratitude = doc.data().Gratitude
                    const timestamp = doc.data().Timestamp
                    const publicPrivate = doc.data().PublicPrivate

                    const gratitudeDiv = document.createElement("div")
                            gratitudeDiv.setAttribute("class", "gratitude-div")
                    const gratitudeH3 = document.createElement("h3")
                    const dateP = document.createElement("p")

                    gratitudeH3.innerText = gratitude
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        dateP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options)

                    journalPage.appendChild(gratitudeDiv)
                    gratitudeDiv.appendChild(dateP)
                    gratitudeDiv.appendChild(gratitudeH3)

            });
    });
}();

// Hapiness scale

const veryLow = document.getElementsByClassName("hapiness-scale-img")

const hapinessChart = document.getElementById('hapiness-chart-combined').getContext('2d');
function hapinessChartAxis(dates, heightOfHapiness){

const myChart = new Chart(hapinessChart, {
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