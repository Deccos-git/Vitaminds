// naam van auth inladen
auth.onAuthStateChanged(User =>{
    const naam = document.querySelectorAll("[data-selector=gebruikersnaam]")
    const useRef = db.collection("Vitaminders").doc(User.uid);
useRef.get().then(function(doc) {
    if (doc.exists) {
      naam.forEach(node => {
          node.textContent = " " + doc.data().Gebruikersnaam;
      });
    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
})
})

