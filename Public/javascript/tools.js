// Check in

const checkInButton = document.getElementsByClassName("checkin-button")

const checkInButtonArray = Array.from(checkInButton)

checkInButtonArray.forEach(redirect => {
    


redirect.addEventListener("click", () => {

    auth.onAuthStateChanged(User =>{
       
          db.collection("Vitaminders").doc(User.uid)
          .get().then(function(doc) {
        
             const naamID = doc.data().Gebruikersnaam;

                window.open("../Vitaminders/" + [naamID] + ".html", "_self");
            })
        });
    });
});

// CTA for visitors

function CTAVisitors(button){
auth.onAuthStateChanged(User =>{
    if(User){
        console.log("Online")
    } else {
        button.innerHTML = "Maak je gratis Digimind aan om deze tool te kunnen installeren"

        button.addEventListener("click", () => {
            window.open("../Register.html", "_self");
        })
    }
})
};

CTAVisitors(checkInButton)

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

!function installHapinessScale(){

    const installButton = document.getElementById("hapiness-button")
    const notice = document.getElementById("tool-notice-hapiness-scale")

    installButton.addEventListener("click", () => {
        auth.onAuthStateChanged(User =>{
            if (User){
                db.collection("Vitaminders").doc(User.uid)
                .get().then(doc => {

                    const auth = doc.data().Gebruikersnaam

                    db.collection("Tools").doc("efGmnHUapj3y9b3SFH4V")
                    .update({
                        Installs: firebase.firestore.FieldValue.arrayUnion(auth)
                    }).then(() => {

                        installButton.innerText = "Geïnstalleerd"

                        showNotice()
                    });
                });
            };
        });
    });
}();

!function checkIfAuthHasInstalledTool(){

    const installButton = document.getElementById("hapiness-button")
    
    db.collection("Tools").doc("efGmnHUapj3y9b3SFH4V")
    .get().then(doc =>{ 

        const installs = doc.data().Installs

        auth.onAuthStateChanged(User =>{
            if (User){
                db.collection("Vitaminders").doc(User.uid)
                .get().then(doc1 => {

                    const auth = doc1.data().Gebruikersnaam

                    if(installs.includes(auth)){
                        installButton.innerText = "Geïnstalleerd"
                        showNotice(auth)
                    };
                });
            };
        });
    });
}();

function showNotice(authName){

    const notice = document.getElementById("tool-notice-hapiness-scale")

    notice.style.display = "block"
    notice.innerHTML = `Je vindt deze tool in je <u>Digimind</u> onder Tools`
    notice.addEventListener("click", () => {
        window.open("../Vitaminders/" + [authName] + ".html", "_self");
    });
}
