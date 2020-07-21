// Openbare levensvragen inladen

const DOM = document.getElementById("verzamelOpenUps")


        db.collectionGroup("Levenslessen").orderBy("Timestamp", "desc").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const les = doc.data().Levensles
                const type = doc.data().Type
                const timestamp = doc.data().Timestamp
                const inspirator = doc.data().Auteur
                const bron = doc.data().Titel
                const gebruikersnaam = doc.data().Gebruikersnaam
                const levensvraag = doc.data().Levensvraag
                const backgroundImage = doc.data().BackgroundImage

                const outerBronDiv = document.createElement("div")
                    outerBronDiv.setAttribute("class", "outer-bron-div")
                const metaUserDiv = document.createElement("div")
                    metaUserDiv.setAttribute("class", "meta-user-div")
                const metaUserPhoto = document.createElement("img")
                const metaUserName = document.createElement("p")
                const bronDiv = document.createElement("div")
                    bronDiv.setAttribute("class", "bron-div-detail") 
                const titelH3 = document.createElement("h3")
                const lesDiv = document.createElement("div") 
                    lesDiv.setAttribute("class", "les-div")
                const lessen = document.createElement("p")
                const metaDiv = document.createElement("div")
                    metaDiv.setAttribute("class", "meta-div-open-up")
                const typeMeta = document.createElement("p")
                const timestampMeta = document.createElement("p")
                    timestampMeta.setAttribute("class", "timestamp-meta-p")
                const titelP = document.createElement("p")
                    titelP.setAttribute("class", "openup-meta-source")
                const editIcon = document.createElement("img")
                    editIcon.setAttribute("src", "../images/edit-icon.png")
                    editIcon.setAttribute("class", "edit-icon-insights")
                    editIcon.setAttribute("onclick", "editLessonOpenUp(this)")
                    editIcon.setAttribute("data-lesson", les)


                    // Loader display none

                    const loader = document.getElementById("loader")
                        loader.style.display = "none"

                    // Background image

                    if(backgroundImage != undefined){
                        lesDiv.style.backgroundImage = `url(${backgroundImage})`
                    } else {
                        lesDiv.style.backgroundImage = `url("images/avontuur3.jpg")`
                    }

                    if(backgroundImage == "Geen"){
                        lesDiv.style.backgroundImage = `url("images/avontuur3.jpg")`
                    }

                    // User meta
                    db.collection("Vitaminders").where("Gebruikersnaam", "==", gebruikersnaam).get().then(querySnapshot => {
                        querySnapshot.forEach(doc4 => {

                            const userClean = doc4.data().GebruikersnaamClean
                            const userPhoto = doc4.data().Profielfoto

                    metaUserPhoto.src = userPhoto
                    metaUserName.innerHTML = userClean

                    metaUserDiv.addEventListener("click", () => {
                        window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
                        });

                        })
                    });

                    metaUserDiv.appendChild(metaUserPhoto)
                    metaUserDiv.appendChild(metaUserName)

                
                // Titel
                if(type == "Coach-inzicht"){

                    db.collection("Vitaminders").where("Gebruikersnaam", "==", inspirator).get().then(querySnapshot => {
                        querySnapshot.forEach(doc3 => {

                            const coachClean = doc3.data().GebruikersnaamClean

                    titelH3.innerHTML = `Geinspireerd door <i>${coachClean}</i>`

                    titelH3.addEventListener("click", () => {
                        window.open("../Vitaminders/" + [inspirator] + ".html", "_self");
                        });

                        titelH3.style.cursor = "pointer"

                        })
                    });
                } else if (type == "Check-in"){

                    db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraag).get().then(querySnapshot => {
                        querySnapshot.forEach(doc2 => {

                            const levensvraagClean = doc2.data().LevensvraagClean
                    titelH3.innerHTML = `Check in bij <i> ${levensvraagClean}</i>`

                        })
                    });
                } else if (type == "Update") {
                    titelH3.innerText = "Update"

                    DOM.appendChild(outerBronDiv)
                    outerBronDiv.appendChild(bronDiv)
                    bronDiv.appendChild(metaUserDiv)
                    bronDiv.appendChild(editIcon)
                    bronDiv.appendChild(titelH3)
                    bronDiv.appendChild(lesDiv)
                    bronDiv.appendChild(lessen)
                    bronDiv.appendChild(timestampMeta)
                    bronDiv.appendChild(metaDiv) 

                }
                
                lessen.innerHTML = les
                typeMeta.innerHTML = type
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                timestampMeta.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

               
                     // User role
                    // Visitor
                    auth.onAuthStateChanged(User =>{
                        if (!User){
                            editIcon.style.display = "none"
                        }
                    });
                       //Non auth
                       
                       auth.onAuthStateChanged(User =>{
                        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                                const auth = doc.data().Gebruikersnaam
                        
                    if(gebruikersnaam != auth){
    
                        editIcon.style.display = "none"
    
                            }
                        })
                    });


                    // Hide private

                    db.collectionGroup('Levensvragen').where("Levenslessen", "array-contains", les).get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                        
                            const public = doc.data().Openbaar

                            if(public == "Nee"){
                                bronDiv.style.display = "none"
                            }
                 
                DOM.appendChild(outerBronDiv)
                outerBronDiv.appendChild(bronDiv)
                bronDiv.appendChild(metaUserDiv)
                bronDiv.appendChild(editIcon)
                bronDiv.appendChild(titelH3)
                bronDiv.appendChild(lesDiv)
                bronDiv.appendChild(lessen)
                bronDiv.appendChild(timestampMeta)
                bronDiv.appendChild(metaDiv) 

                                })
                            })
                        })
                    });

// Check in

    const checkInSelect = document.getElementById("check-in-select")
    const checkInTitle = document.getElementById("check-in-titel")  
    const fotoUploadCheckIn = document.getElementById("foto-upload-check-in")
    const checkInShareButton = document.getElementById("check-in-button")
    const selectGoalTitle = document.getElementById("select-goal-check-in") 
    const selectPhotoTitle = document.getElementById("select-photo-check-in")   
    const inputCheckIn = document.getElementById("input-check-in")   

    // Open complete check in box with click
    inputCheckIn.addEventListener("mouseover", () => {

        checkInSelect.style.display = "block"
        fotoUploadCheckIn.style.display = "block"
        checkInShareButton.style.display = "block"
        selectGoalTitle.style.display = "block"
        selectPhotoTitle.style.display = "block"
        inputCheckIn.rows = "5"
    })
    
    

    // Public goals in select

    auth.onAuthStateChanged(User =>{
        if(User){
        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                const gebruikersnaam = doc.data().Gebruikersnaam
                const gebruikersnaamClean = doc.data().GebruikersnaamClean

                checkInTitle.innerText = `Hoe gaat het met je, ${gebruikersnaamClean} ?`

                db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", gebruikersnaam).where("Openbaar", "==", "Ja").get().then(querySnapshot =>{
                    querySnapshot.forEach(doc1 => {

                        levensvraagClean = doc1.data().LevensvraagClean

                        const option = document.createElement("option")

                        option.innerHTML = levensvraagClean

                        checkInSelect.appendChild(option)

                    });
                });
            


    // Save check in to database

    checkInShareButton.addEventListener("click", () => {

    const option = checkInSelect.options
    const selected = option[option.selectedIndex].innerHTML

        //Upload photo
        const selectedFile = document.getElementById('foto-upload-check-in').files[0];
        const progressBar = document.getElementById("progress-bar")

        if (selectedFile == undefined){
            db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
                Gebruikersnaam: gebruikersnaam,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Inspirerend: 1,
                Type: "Check-in",
                Levensles: inputCheckIn.value,
                Levensvraag: "Geen",
                BackgroundImage: "Geen"
                });
        } else {

        

        const storageRef = firebase.storage().ref("/Check-in-photos/" + selectedFile.name);

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
        progressBar.innerHTML = ` ${progress} %`;
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

        if(selected == "Niet aan doel koppelen"){

            db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
                Gebruikersnaam: gebruikersnaam,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Inspirerend: 1,
                Type: "Update",
                Levensles: inputCheckIn.value,
                Levensvraag: "Geen",
                BackgroundImage: downloadURL
                });

        } else {

        //LevensvraagClean naar levensvraag met ID

        db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", selected).where("Gebruikersnaam", "==", gebruikersnaam).get().then(querySnapshot =>{
            querySnapshot.forEach(doc2 => {

                const levensvraagID = doc2.data().Levensvraag

    db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
        Gebruikersnaam: gebruikersnaam,
        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        Inspirerend: 1,
        Type: "Check-in",
        Levensles: inputCheckIn.value,
        Levensvraag: levensvraagID,
        BackgroundImage: downloadURL
                                });

    db.collection("Vitaminders").doc(User.uid).collection("Levensvragen").doc(doc2.id).update({
        Levenslessen: firebase.firestore.FieldValue.arrayUnion(inputCheckIn.value)
    })
                                            });
                                        });
                                    };
                                });                                                
                            });
                        });
                    }
                });
            });
    } else {
        inputCheckIn.addEventListener("mouseover", () => {

            const noAuth = document.createElement("p")

            const DOM = document.getElementById("check-in-outer-div")

            noAuth.innerText = `Maak eerst even een Digimind aan om te kunnen delen`

            noAuth.style.cursor = "pointer"
            noAuth.style.textDecoration = "underline"

            noAuth.addEventListener("click", () => {
                window.open("/Register.html", "_self")
            })

            DOM.appendChild(noAuth)
            checkInSelect.style.display = "none"
            fotoUploadCheckIn.style.display = "none"
            checkInShareButton.style.display = "none"
            selectGoalTitle.style.display = "none"
            selectPhotoTitle.style.display = "none"
            inputCheckIn.style.display = "none"
        })
    }
});
    



