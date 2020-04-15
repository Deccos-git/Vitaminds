
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

        const vraag = elem.nextSibling.nextSibling.firstElementChild
        const omschrijving = elem.nextSibling.nextSibling.firstElementChild.nextSibling.nextSibling.firstElementChild
        const removeDiv = elem.nextSibling.nextSibling.firstElementChild.nextSibling.nextSibling.nextSibling

        const dataEdit = elem.dataset.levensvraag

        vraag.setAttribute("contenteditable", "true")
        vraag.style.color = "#d4d4d4"
        vraag.style.borderBottom = "1px dotted #d4d4d4"

        omschrijving.setAttribute("contenteditable", "true")
        omschrijving.style.color = "#d4d4d4"
        omschrijving.style.borderBottom = "1px dotted #d4d4d4"

        removeDiv.style.display ="none"

        const saveDiv = document.createElement("div")
        saveDiv.setAttribute("class", "save-div")
        const saveP = document.createElement("p")

        saveDiv.appendChild(saveP)

        elem.nextSibling.nextSibling.appendChild(saveDiv)

        saveP.innerHTML = "Opslaan"

                saveP.addEventListener("click", () => {    

        auth.onAuthStateChanged(User =>{
                        if (User){
                            let docRef = db.collection("Vitaminders").doc(User.uid);
                                docRef.get().then(function(doc){

        db.collectionGroup("Levensvragen").where("Levensvraag", "==", dataEdit).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                        const ID = doc1.data().ID

                        db.collection("Vitaminders").doc(doc.id).collection("Levensvragen").doc(doc1.id).update({
                                Levensvraag: ID + vraag.innerHTML,
                                Omschrijving: omschrijving.innerHTML
                        }).then(() => {
                                location.reload();
                        })
                                                })
                                        })
                                })
                        }
                })
        })
}

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
}





