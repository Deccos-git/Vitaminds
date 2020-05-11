
// Installing tool dankbaarheid 
function addToolDankbaarheid(){

    // Frequention
    const input = document.querySelectorAll("input")

    const inputArray = Array.from(input)

    inputArray.forEach(arr => {
        const selectedFrequention = arr.checked

        if(selectedFrequention == true){
            const sel = arr.value
   

    auth.onAuthStateChanged(User =>{
        const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
             const auth = doc.data().Gebruikersnaam;

    db.collection("Vitaminders").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
        querySnapshot.forEach(doc2 => {

            db.collection("Vitaminders").doc(doc2.id).collection("Tools").doc().set({
                Tool: "Dankbaarheid",
                Gebruikersnaam: auth,
                Frequention: sel
                            })
                        })
                    }).then(() => {
                        const alert = document.getElementById("alert-tool")
                        alert.style.display = "block"
                    })
                })
            })
        }
    })
}

// Activating tool dankbaarheid

function toolDankbaarheid(a){

setInterval(myTimer, a);

function myTimer() {

    db.collectionGroup("Tools").where("Tool", "==", "Dankbaarheid").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const gebruikersnaam = doc.data().Gebruikersnaam
    
            db.collection("Vitaminders").where("Gebruikersnaam", "==", gebruikersnaam).get().then(querySnapshot => {
                querySnapshot.forEach(doc2 => {
    
                    const email = doc2.data().Email
                    const gebruikersnaamClean = doc2.data().GebruikersnaamClean
    
                    db.collection("Mail").doc().set({
                        to: [email],
                message: {
                subject: `${gebruikersnaamClean}, waar ben jij vandaag dankbaar voor?`,
                html: `Hallo ${gebruikersnaamClean}, </br></br>
                        Dit is een berichtje van je Vitaminds Digimind.</br></br>
                        Waar ben jij vandaag dankbaar voor?
                        Vriendelijke groet, </br></br>
                        Het Vitaminds Team </br></br>
                        <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                Gebruikersnaam: gebruikersnaam,
                }
                            
                }).catch((err) => {
                        console.log(err)
                })
    
                    })
                })
            })
        })
    }
}

db.collectionGroup("Tools").where("Tool", "==", "Dankbaarheid").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const frequention = doc.data().Frequention

        // if(frequention == "wekelijks"){
        //     toolDankbaarheid(5000)
        // }

    })
})