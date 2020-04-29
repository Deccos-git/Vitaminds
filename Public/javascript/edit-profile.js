
// Profiel aanpassen

    // Profielfoto
    function showChangeProfilePicture(){
        const profielfotoAanpassenDiv = document.getElementById("profielfoto-aanpassen")
        profielfotoAanpassenDiv.style.display = "block"
}

function changeProfilePicture(){
        const uploadProfilePic = document.getElementById("foto-upload-div")
        uploadProfilePic.style.display = "flex"
}

function uploadFile(){

    auth.onAuthStateChanged(User =>{
            if (User){
                db.collection("Vitaminders").doc(User.uid).get().then(doc =>{     
                                const id = doc.id

                    const docRef = db.collection("Vitaminders").doc(id);
                       
const selectedFile = document.getElementById('foto-upload').files[0];

const storageRef = firebase.storage().ref("/Profielfotos/" + selectedFile.name);

   const uploadTask = storageRef.put(selectedFile)
   uploadTask.then(() => {
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    // Handle unsuccessful uploads
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
      docRef.update({
                    Profielfoto: downloadURL
                                                    }) .then(()=>{
                                                         location.reload();
                                                }) 
                                            })
                                                  
                                    })
                            })
                    })
            }
    })    
};

// Levensvragen aanpassen

function edit(elem){

        const vraag = elem.parentElement.parentElement.firstElementChild
        const omschrijving = elem.parentElement.nextSibling.firstElementChild
        const removeDiv = elem.parentElement.nextSibling.nextSibling

        const dataEdit = elem.dataset.levensvraag

        vraag.setAttribute("contenteditable", "true")
        vraag.style.color = "#d4d4d4"
        vraag.style.borderBottom = "1px dotted #d4d4d4"

        omschrijving.setAttribute("contenteditable", "true")
        omschrijving.style.color = "#d4d4d4"
        omschrijving.style.borderBottom = "1px dotted #d4d4d4"

        removeDiv.style.display ="none"

         //Public Yes/No
         const publicDiv = document.createElement("div")
         const publicP = document.createElement("p")
         publicDiv.setAttribute("class", "public-div")
         const publicForm = document.createElement("form")
         const publicInputYes = document.createElement("input")
                 publicInputYes.setAttribute("type", "radio")
                 publicInputYes.setAttribute("id", "Ja")
                 publicInputYes.setAttribute("name", "Public")
         const publicLabelYes = document.createElement("label")
                 publicLabelYes.setAttribute("for", "Ja")
         const publicInputNo = document.createElement("input")
                 publicInputNo.setAttribute("type", "radio")
                 publicInputNo.setAttribute("id", "Nee")
                 publicInputNo.setAttribute("name", "Public")
         const publicLabelNo = document.createElement("label")
                 publicLabelNo.setAttribute("for", "Nee")
 
         publicP.innerHTML = "Levensvraag openbaar of prive?"
         publicLabelYes.innerHTML = "Openbaar"
         publicLabelNo.innerHTML = "Prive"
 
         elem.parentElement.nextSibling.appendChild(publicDiv)
         publicDiv.appendChild(publicP)
         publicDiv.appendChild(publicForm)
         publicForm.appendChild(publicInputYes)
         publicForm.appendChild(publicLabelYes)
         publicForm.appendChild(publicInputNo)
         publicForm.appendChild(publicLabelNo)

         const saveDiv = document.createElement("div")
         saveDiv.setAttribute("class", "save-div")
         const saveP = document.createElement("p")

        saveP.innerHTML = "Opslaan"

        elem.parentElement.nextSibling.appendChild(saveDiv)
        saveDiv.appendChild(saveP)

        saveP.addEventListener("click", () => {  

                // Public selected input
                const input = document.querySelectorAll("input[type='radio']")

                const InputArray = Array.from(input)
        
                InputArray.forEach(arr => {
                        if (arr.checked == true){

        auth.onAuthStateChanged(User =>{
                        if (User){
                            let docRef = db.collection("Vitaminders").doc(User.uid);
                                docRef.get().then(function(doc){

        db.collectionGroup("Levensvragen").where("Levensvraag", "==", dataEdit).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                        const ID = doc1.data().ID

                        db.collection("Vitaminders").doc(doc.id).collection("Levensvragen").doc(doc1.id).update({
                                Levensvraag: ID + vraag.innerHTML,
                                Omschrijving: omschrijving.innerHTML,
                                Openbaar: arr.id
                        }).then(() => {
                                location.reload();
                        })
                                                                })
                                                        })
                                                })
                                        }
                                })
                        }
                })
        })

        // Delete
        const deleteDiv = document.createElement("div")
        deleteDiv.setAttribute("class", "delete-div")
        const deleteP = document.createElement("p")

        deleteP.innerHTML = "Delete"

        elem.parentElement.nextSibling.appendChild(deleteDiv)
        deleteDiv.appendChild(deleteP)

        deleteP.addEventListener("click", () => {    

        auth.onAuthStateChanged(User =>{
                        if (User){
                            let docRef = db.collection("Vitaminders").doc(User.uid);
                                docRef.get().then(function(doc){

        db.collectionGroup("Levensvragen").where("Levensvraag", "==", dataEdit).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                        db.collection("Vitaminders").doc(doc.id).collection("Levensvragen").doc(doc1.id).delete()
                        .then(() => {
                                location.reload();
                                                        })
                                                })
                                        })
                                })
                        }
                })
        })

          // Auto check public
          db.collectionGroup("Levensvragen").where("Levensvraag", "==", dataEdit).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                        const check = doc1.data().Openbaar

                        const input = document.querySelectorAll("input[type='radio']")

                        const InputArray = Array.from(input)
        
                        InputArray.forEach(arr => {

                        if(arr.id == check){
                                arr.checked = true
                                }
                        })
                })
        })

};

// Levenslessen aanpassen

function editLessons(elem){
        const les = elem.parentElement.nextSibling

        const dataEdit = elem.dataset.levensles

        les.setAttribute("contenteditable", "true")
        les.style.color = "#d4d4d4"
        les.style.borderBottom = "1px dotted #d4d4d4"

        const saveLes = document.createElement("div")
        saveLes.setAttribute("class", "save-div")
        const saveLesP = document.createElement("p")

        saveLes.appendChild(saveLesP)

        elem.parentElement.parentElement.appendChild(saveLes)

        saveLesP.innerHTML = "Opslaan"

        saveLesP.addEventListener("click", () => {    

        auth.onAuthStateChanged(User =>{
                        if (User){
                        let docRef = db.collection("Vitaminders").doc(User.uid);
                                docRef.get().then(function(doc){

        db.collectionGroup("Levenslessen").where("Levensles", "==", dataEdit).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                        db.collection("Vitaminders").doc(doc.id).collection("Levenslessen").doc(doc1.id).update({
                                Levensles: les.innerHTML
                        }).then(() => {
                                location.reload();
                        })
                                                })
                                        })
                                })
                        }
                })
        })

         // Delete
         const deleteDiv = document.createElement("div")
         deleteDiv.setAttribute("class", "delete-div")
         const deleteP = document.createElement("p")
 
         deleteP.innerHTML = "Delete"
 
         elem.parentElement.parentElement.appendChild(deleteDiv)
         deleteDiv.appendChild(deleteP)
 
         deleteP.addEventListener("click", () => {    
 
         auth.onAuthStateChanged(User =>{
                         if (User){
                             let docRef = db.collection("Vitaminders").doc(User.uid);
                                 docRef.get().then(function(doc){
 
         db.collectionGroup("Levenslessen").where("Levensles", "==", dataEdit).get().then(querySnapshot => {
                 querySnapshot.forEach(doc1 => {
 
                         db.collection("Vitaminders").doc(doc.id).collection("Levenslessen").doc(doc1.id).delete()
                         .then(() => {
                                 location.reload();
                                                         })
                                                 })
                                         })
                                 })
                         }
                 })
         })
}

// My contributions

        // Edit reactions

function editReactions(elem){

        const reaction = elem.parentElement.nextSibling

        const dataNaam = elem.dataset.gebruikersnaam
        const dataVrager = elem.dataset.vraagsteller

        reaction.setAttribute("contenteditable", "true")
        reaction.style.color = "#d4d4d4"
        reaction.style.borderBottom = "1px dotted #d4d4d4"

        const saveLes = document.createElement("div")
        saveLes.setAttribute("class", "save-div")
        const saveLesP = document.createElement("p")

        saveLes.appendChild(saveLesP)

        elem.parentElement.parentElement.appendChild(saveLes)

        saveLesP.innerHTML = "Opslaan"

        saveLesP.addEventListener("click", () => {    

                db.collection("Vitaminders").where("Gebruikersnaam", "==", dataVrager).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
        
                db.collectionGroup("Reactions").where("Gebruikersnaam", "==", dataNaam).get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {
        
                                db.collection("Vitaminders").doc(doc.id).collection("Reactions").doc(doc1.id).update({
                                        Reactie: reaction.innerHTML
                                }).then(() => {
                                        location.reload();
                                })
                                                        })
                                                })
                                               
                                        })
                        })
                })
}

        // Edit articles

function editArticle(elem){
        const titel = elem.parentElement.previousElementSibling.parentElement.dataset.titel

        db.collection("Artikelen").where("Titel", "==", titel).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                        const body = doc.data().Body
                        const titelClean = doc.data().TitelClean
                        const hiddenID = doc.data().ID

                       tinymce.get("tiny-mce").setContent(body);
                       const titelReplace = document.getElementById("nieuwposttitel")
                       titelReplace.value = titelClean
                       const hideID = document.getElementById("hidden-ID")
                       hideID.innerHTML = hiddenID


                })
        }).then(() => {
                artikel()
        })      
}; 



// Coach info aanpassen
        //Coach contact

function editContact(elem){
        const bel = elem.parentElement.nextSibling.nextSibling.firstElementChild.nextSibling
                const belDiv =  elem.parentElement.nextSibling.nextSibling
        const website = elem.parentElement.nextSibling.nextSibling.nextSibling.firstElementChild.nextSibling
                const websiteDiv = elem.parentElement.nextSibling.nextSibling.nextSibling
                const websiteLink = elem.parentElement.nextSibling.nextSibling.nextSibling.firstElementChild.nextSibling.firstElementChild

                console.log(elem.parentElement.parentElement)

        if(belDiv.style.display == "none" ){
        belDiv.style.display = "flex"
        bel.innerHTML = "Telefoonnummer"
        }

        bel.setAttribute("contenteditable", "true")
        bel.style.color = "#d4d4d4"
        bel.style.borderBottom = "1px dotted #d4d4d4"

        if(websiteDiv.style.display == "none"){
        websiteDiv.style.display = "flex"
        website.innerHTML = "Website"
        website.style.color = "#d4d4d4"
        website.style.borderBottom = "1px dotted #d4d4d4"
        }

        website.setAttribute("contenteditable", "true")
        if(websiteLink == null){
                console.log("Error")
        } else {
        websiteLink.style.color = "#d4d4d4"
        }
        website.style.borderBottom = "1px dotted #d4d4d4"

        const saveLes = document.createElement("div")
        saveLes.setAttribute("class", "save-div")
        const saveLesP = document.createElement("p")

        saveLes.appendChild(saveLesP)

        elem.parentElement.parentElement.appendChild(saveLes)

        saveLesP.innerHTML = "Opslaan"

        saveLesP.addEventListener("click", () => {    

        auth.onAuthStateChanged(User =>{
                        if (User){
                        let docRef = db.collection("Vitaminders").doc(User.uid);
                                docRef.get().then(function(doc){

                        db.collection("Vitaminders").doc(doc.id).update({
                                PhoneNumber: bel.innerHTML,
                                Website: website.innerHTML
                        }).then(() => {
                                location.reload();
                        })
                                       
                                })
                        }
                })
        })
}

//Coach summary

function editShort(elem){
        const locatie = elem.parentElement.nextSibling.firstElementChild.nextSibling
                const locatieDiv = elem.parentElement.nextSibling
        const ervaring = elem.parentElement.nextSibling.nextSibling.firstElementChild.nextSibling
                const ervaringDiv = elem.parentElement.nextSibling
        const opleiding = elem.parentElement.nextSibling.nextSibling.nextSibling.firstElementChild.nextSibling
                const opleidingDiv = elem.parentElement.nextSibling.nextSibling.nextSibling

        if(locatieDiv.style.display == "none" ){
        locatieDiv.style.display = "flex"
        locatie.innerHTML = "Stad of dorp"
        }

        locatie.setAttribute("contenteditable", "true")
        locatie.style.color = "#d4d4d4"
        locatie.style.borderBottom = "1px dotted #d4d4d4"

        if(ervaringDiv.style.display == "none" ){
        ervaringDiv.style.display = "flex"
        ervaring.innerHTML = "Specialisatie"
        }

        ervaring.setAttribute("contenteditable", "true")
        ervaring.style.color = "#d4d4d4"
        ervaring.style.borderBottom = "1px dotted #d4d4d4"

        if(opleidingDiv.style.display == "none" ){
        opleidingDiv.style.display = "flex"
        opleiding.innerHTML = "€/uur"
        }

        opleiding.setAttribute("contenteditable", "true")
        opleiding.style.color = "#d4d4d4"
        opleiding.style.borderBottom = "1px dotted #d4d4d4"
        

        const saveLes = document.createElement("div")
        saveLes.setAttribute("class", "save-div")
        const saveLesP = document.createElement("p")

        saveLes.appendChild(saveLesP)

        elem.parentElement.parentElement.appendChild(saveLes)

        saveLesP.innerHTML = "Opslaan"

        saveLesP.addEventListener("click", () => {    

        auth.onAuthStateChanged(User =>{
                        if (User){
                        let docRef = db.collection("Vitaminders").doc(User.uid);
                                docRef.get().then(function(doc){

                        db.collection("Vitaminders").doc(doc.id).update({
                                City: locatie.innerHTML,
                                Targetgroup: ervaring.innerHTML,
                                Costs: opleiding.innerHTML
                        }).then(() => {
                                location.reload();
                        })
                                       
                                })
                        }
                })
        })
}

//Coach Coaching

function editCoach(elem){
        const jaren = elem.parentElement.nextSibling.firstElementChild.nextSibling
                const jarenDiv = elem.parentElement.nextSibling
        const ervaring= elem.parentElement.nextSibling.nextSibling.firstElementChild.nextSibling
                const ervaringDiv = elem.parentElement.nextSibling.nextSibling

        console.log(ervaringDiv)
        const opleiding = elem.parentElement.nextSibling.nextSibling.nextSibling.firstElementChild.nextSibling
                const opleidingDiv = elem.parentElement.nextSibling.nextSibling.nextSibling

        if(jarenDiv.style.display == "none" ){
        jarenDiv.style.display = "flex"
        jaren.innerHTML = "jaren"
        }

        jaren.setAttribute("contenteditable", "true")
        jaren.style.color = "#d4d4d4"
        jaren.style.borderBottom = "1px dotted #d4d4d4"

        if(ervaringDiv.style.display == "none" ){
        ervaringDiv.style.display = "flex"
        ervaring.innerHTML = "ervaring"
        }

        ervaring.setAttribute("contenteditable", "true")
        ervaring.style.color = "#d4d4d4"
        ervaring.style.borderBottom = "1px dotted #d4d4d4"

        if(opleidingDiv.style.display == "none" ){
        opleidingDiv.style.display = "flex"
        opleiding.innerHTML = "opleiding"
        }

        opleiding.setAttribute("contenteditable", "true")
        opleiding.style.color = "#d4d4d4"
        opleiding.style.borderBottom = "1px dotted #d4d4d4"
        

        const saveLes = document.createElement("div")
        saveLes.setAttribute("class", "save-div")
        const saveLesP = document.createElement("p")

        saveLes.appendChild(saveLesP)

        elem.parentElement.parentElement.appendChild(saveLes)

        saveLesP.innerHTML = "Opslaan"

        saveLesP.addEventListener("click", () => {    

        auth.onAuthStateChanged(User =>{
                        if (User){
                        let docRef = db.collection("Vitaminders").doc(User.uid);
                                docRef.get().then(function(doc){

                        db.collection("Vitaminders").doc(doc.id).update({
                                Coachingstyle: jaren.innerHTML,
                                Approach: ervaring.innerHTML,
                                Why: opleiding.innerHTML
                        }).then(() => {
                                location.reload();
                        })
                                       
                                })
                        }
                })
        })
}


//Coach Experience

function editExperience(elem){
        const jaren = elem.parentElement.nextSibling.firstElementChild.nextSibling
                const jarenDiv = elem.parentElement.nextSibling
        const ervaring= elem.parentElement.nextSibling.nextSibling.firstElementChild.nextSibling
                const ervaringDiv = elem.parentElement.nextSibling.nextSibling
        const opleiding = elem.parentElement.nextSibling.nextSibling.nextSibling.firstElementChild.nextSibling
                const opleidingDiv = elem.parentElement.nextSibling.nextSibling.nextSibling

        if(jarenDiv.style.display == "none" ){
        jarenDiv.style.display = "flex"
        jaren.innerHTML = "jaren"
        }

        jaren.setAttribute("contenteditable", "true")
        jaren.style.color = "#d4d4d4"
        jaren.style.borderBottom = "1px dotted #d4d4d4"

        if(ervaringDiv.style.display == "none" ){
        ervaringDiv.style.display = "flex"
        ervaring.innerHTML = "ervaring"
        }

        ervaring.setAttribute("contenteditable", "true")
        ervaring.style.color = "#d4d4d4"
        ervaring.style.borderBottom = "1px dotted #d4d4d4"

        if(opleidingDiv.style.display == "none" ){
        opleidingDiv.style.display = "flex"
        opleiding.innerHTML = "opleiding"
        }

        opleiding.setAttribute("contenteditable", "true")
        opleiding.style.color = "#d4d4d4"
        opleiding.style.borderBottom = "1px dotted #d4d4d4"
        

        const saveLes = document.createElement("div")
        saveLes.setAttribute("class", "save-div")
        const saveLesP = document.createElement("p")

        saveLes.appendChild(saveLesP)

        elem.parentElement.parentElement.appendChild(saveLes)

        saveLesP.innerHTML = "Opslaan"

        saveLesP.addEventListener("click", () => {    

        auth.onAuthStateChanged(User =>{
                        if (User){
                        let docRef = db.collection("Vitaminders").doc(User.uid);
                                docRef.get().then(function(doc){

                        db.collection("Vitaminders").doc(doc.id).update({
                                YearsExperience: jaren.innerHTML,
                                Experience: ervaring.innerHTML,
                                Ecudation: opleiding.innerHTML
                        }).then(() => {
                                location.reload();
                        })
                                       
                                })
                        }
                })
        })
}





