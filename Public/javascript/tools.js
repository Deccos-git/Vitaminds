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