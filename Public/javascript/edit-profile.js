
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

function edit(){
        const editDiv = document.getElementsByClassName("edit-levensvraag")
        const omschrijvingDiv = document.getElementsByClassName("omschrijving-div")

        const editArray = Array.from(editDiv) 
        const omschrijvingArray = Array.from(omschrijvingDiv)

        

        // Levensvraag editable
        editArray.forEach(array => {
        
        const dataEdit = array.parentElement.dataset.levensvraag

        const h2 = array.parentElement.previousSibling

        h2.setAttribute("contenteditable", "true")
        h2.style.color = "#d4d4d4"
        h2.style.borderBottom = "1px dotted #d4d4d4"

        const saveDiv = document.createElement("div")
        saveDiv.setAttribute("class", "save-div")
        const saveP = document.createElement("p")

        saveDiv.appendChild(saveP)

        array.parentElement.appendChild(saveDiv)


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
                                Levensvraag: ID + h2.innerHTML
                        }).then(() => {
                                location.reload();
                        })
                                                })
                                        })
                                })
                        }
                })
        })
        })
}





