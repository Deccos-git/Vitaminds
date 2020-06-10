// Check in

const checkInButton = document.getElementById("tool-download")

checkInButton.addEventListener("click", () => {

    auth.onAuthStateChanged(User =>{
       
          db.collection("Vitaminders").doc(User.uid)
          .get().then(function(doc) {
        
             const naamID = doc.data().Gebruikersnaam;

                window.open("../Vitaminders/" + [naamID] + ".html", "_self");

      
        })
    });
});

// CTA for visitors

auth.onAuthStateChanged(User =>{
    if(User){
        console.log("Online")
    } else {
        checkInButton.innerHTML = "Maak je gratis Digimind aan om deze tool te kunnen installeren"

        checkInButton.addEventListener("click", () => {
            window.open("../Register.html", "_self");
        })
    }
});