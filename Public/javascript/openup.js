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
                const likes = doc.data().Inspirerend

                const outerBronDiv = document.createElement("div")
                    outerBronDiv.setAttribute("class", "outer-bron-div")
                const metaUserDiv = document.createElement("div")
                    metaUserDiv.setAttribute("class", "meta-user-div")
                    metaUserDiv.setAttribute("data-user", gebruikersnaam)
                const metaUserPhoto = document.createElement("img")
                const metaUserName = document.createElement("p")
                    metaUserName.setAttribute("id", "meta-user-name")
                const nameCompareDiv = document.createElement("div")
                const bronDiv = document.createElement("div")
                    bronDiv.setAttribute("class", "bron-div-detail") 
                const titelH3 = document.createElement("h3")
                const lesDiv = document.createElement("div") 
                    lesDiv.setAttribute("class", "les-div")
                const lessen = document.createElement("p")
                const metaDiv = document.createElement("div")
                    metaDiv.setAttribute("class", "meta-div-open-up")
                    metaDiv.setAttribute("data-user", gebruikersnaam)
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
                const likeCounter = document.createElement("p")
                    likeCounter.setAttribute("class", "like-counter-p")
                const heart = document.createElement("img")
                    heart.setAttribute("class", "react-icons")
                    heart.setAttribute("data-user", gebruikersnaam)
                    heart.setAttribute("data-les", les)


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

                            if(userPhoto == undefined){
                                metaUserPhoto.src = "images/dummy-profile-photo.jpeg"
                            } else {
                    metaUserPhoto.src = userPhoto
                            };
                            
                    metaUserName.innerHTML = userClean

                    metaUserPhoto.addEventListener("click", () => {
                        window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
                            });

                    metaUserName.addEventListener("click", () => {
                        window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
                            });
                        });
                    });

                    metaUserDiv.appendChild(metaUserPhoto)
                    metaUserDiv.appendChild(nameCompareDiv)
                    nameCompareDiv.appendChild(metaUserName)

                    // Like counter
                    if(likes > 0){
                    likeCounter.innerText = likes
                    };

                    // Heart icon
                    heart.src = "images/heart-icon.png"

                    metaDiv.appendChild(heart)
                    metaDiv.appendChild(likeCounter)
                    
                    heart.style.cursor = "pointer"
                    
                    heart.addEventListener("mouseenter", () => {
                        heart.src = "images/heart-icon-hover.png"
                            })
                
                    heart.addEventListener("mouseleave", () => {
                        heart.src = "images/heart-icon.png"
                            })
            
                   // Heart icon save

                   heart.addEventListener("click", () => {
                       heart.src = "images/heart-icon-hover.png"

                       heart.addEventListener("mouseleave", () => {
                        heart.src = "images/heart-icon-hover.png"
                            });

                    auth.onAuthStateChanged(User =>{
                        userRef = db.collection("Vitaminders").doc(User.uid)
                        userRef.get()
                        .then(doc => {
                                const auth = doc.data().Gebruikersnaam

                            // Naar reciever
                        db.collection("Vitaminders").where("Gebruikersnaam", "==", gebruikersnaam).get().then(querySnapshot => {
                            querySnapshot.forEach(doc1 => {

                                const email = doc1.data().Email
                                const naam = doc1.data().GebruikersnaamClean

                                db.collection("Vitaminders").doc(doc1.id).collection("Inspiration").doc().set({

                                    New: "Yes",
                                    Reciever: gebruikersnaam,
                                    Inspiration: les,
                                    Titel: titelH3.innerText,
                                    Giver: auth,
                                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                    Type: "Levensles"
                                });

                                // Naar levensles
                                db.collectionGroup("Levenslessen").where("Levensles", "==", les).where("Gebruikersnaam", "==", gebruikersnaam).get().then(querySnapshot => {
                                    querySnapshot.forEach(doc2 => {

                                        db.collection("Vitaminders").doc(doc1.id).collection("Levenslessen").doc(doc2.id).update({

                                            Inspirerend: firebase.firestore.FieldValue.increment(1)
                            
                                                });
                                            });
                                        });
                                
                                // Mail naar reciever
                                db.collection("Mail").doc().set({
                                    to: email,
                                    cc: "info@vitaminds.nu",
                              message: {
                              subject: `Je update heeft een like ontvangen op Vitaminds! `,
                              html: `Hallo ${naam}, </br></br>
                                    Je update <i>${les}</i> heeft een like ontvangen op Vitaminds! <br><br>
                                    
                                    Ga naar <a href="https://vitaminds.nu"> Vitaminds </a> om je like te bekijken.<br><br>
                              
                                    Vriendelijke groet, </br></br>
                                    Het Vitaminds Team </br></br>
                                    <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                              Gebruikersnaam: naam,
                              Emailadres: email,
                              Type: "Love"
                              }
                                        
                              })
                                    });
                                });
                            });
                        });
                   });


                   // Add comparisons

                   const AuthGoalArray = []
                   const AuthGoalLength = [] 

                   auth.onAuthStateChanged(User =>{
                    db.collection("Vitaminders").doc(User.uid)
                    .get()
                    .then(doc => {
                            const auth = doc.data().Gebruikersnaam

                        // Naar reciever
                    db.collection("Vitaminders").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
                        querySnapshot.forEach(doc1 => {

                            const AuthGoals = doc1.data().Goals

                            AuthGoals.forEach(authGoal => {
                                AuthGoalArray.push(authGoal)
                            });
                        });
                    }).then(() => {
                        db.collection("Vitaminders").where("Gebruikersnaam", "==", gebruikersnaam)
                        .get().then(querySnapshot => {
                            querySnapshot.forEach(doc2 => {

                                const userGoals = doc2.data().Goals
                                const gebruikersnaamClean = doc2.data().gebruikersnaamClean

                                if (userGoals != undefined){

                                userGoals.forEach(UserGoal => {
                                    // console.log(UserGoal)
                                    // console.log(AuthGoalArray)
                                    if(auth != gebruikersnaam){
                                    if (AuthGoalArray.includes(UserGoal)){

                                        AuthGoalLength.push(UserGoal)

                                        const goalLength = AuthGoalLength.length

                                        const comparisonsIcon = document.createElement("img")
                                            comparisonsIcon.setAttribute("id", "comparison-icon")

                                        comparisonsIcon.src = "images/comparison-icon.png"

                                        metaUserDiv.appendChild(nameCompareDiv)
                                        nameCompareDiv.appendChild(comparisonsIcon)

                                        const comparisonsDiv = document.createElement("div")
                                        const comparisonsP = document.createElement("p")
                                            comparisonsP.setAttribute("id", "comparison-p")

                                        comparisonsIcon.addEventListener("click", () => {

                                            comparisonsP.innerText = `Jij en ${gebruikersnaamClean} delen ${goalLength} doel.`

                                            if(goalLength > 1){
                                                comparisonsP.innerText = `Jij en ${gebruikersnaamClean} delen ${goalLength} doelen.`
                                            }

                                            nameCompareDiv.appendChild(comparisonsDiv)
                                            comparisonsDiv.appendChild(comparisonsP)
                                        })
                                            
                                                };
                                            };
                                        });
                                    };
                                });
                            });
                        });  
                    });
                });
                
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
}).then(() => {

        // Fill heart if auth has liked post
    auth.onAuthStateChanged(User =>{
        if(User){
        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                const auth = doc.data().Gebruikersnaam

    db.collectionGroup("Inspiration").where("Type", "==", "Levensles").where("Giver", "==", auth).get().then(querySnapshot =>{
        querySnapshot.forEach(doc1 => {

            const likedLesson = doc1.data().Inspiration

            const DOM = document.getElementsByClassName("react-icons")

            const DOMarray = Array.from(DOM)

            DOMarray.forEach(D => {
                const dataLes = D.dataset.les

                if(likedLesson == dataLes){

                    D.src = "images/heart-icon-hover.png"

                    D.addEventListener("mouseenter", () => {
                        D.src = "images/heart-icon-hover.png"
                            })
                
                    D.addEventListener("mouseleave", () => {
                        D.src = "images/heart-icon-hover.png"
                            })
                };
            });
                


                    });
                });
            });
        };
    });
});

// Check in

    const checkInSelect = document.getElementById("check-in-select")
    const fotoUploadCheckIn = document.getElementById("foto-upload-check-in")
    const checkInShareButton = document.getElementById("check-in-button")
    const selectGoalTitle = document.getElementById("select-goal-check-in") 
    const selectPhotoTitle = document.getElementById("select-photo-check-in")   
    const inputCheckIn = document.getElementById("input-check-in")   

    // Open complete check in box with click
    inputCheckIn.addEventListener("click", () => {

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

                inputCheckIn.placeholder = `Wat houdt je bezig, ${gebruikersnaamClean}?`

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

        if (selectedFile == undefined && selected == "Niet aan doel koppelen"){
            db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
                Gebruikersnaam: gebruikersnaam,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Inspirerend: 1,
                Type: "Update",
                Levensles: inputCheckIn.value,
                Levensvraag: "Geen",
                BackgroundImage: "Geen"
                });
        } else if (selectedFile == undefined && selected != "Niet aan doel koppelen") {
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
            BackgroundImage: "Geen"
                                    });
    
        db.collection("Vitaminders").doc(User.uid).collection("Levensvragen").doc(doc2.id).update({
            Levenslessen: firebase.firestore.FieldValue.arrayUnion(inputCheckIn.value)
        })
                                            });
                                        });

            } else if (selectedFile != undefined && selected == "Niet aan doel koppelen") {

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

    db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
        Gebruikersnaam: gebruikersnaam,
        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        Inspirerend: 1,
        Type: "Update",
        Levensles: inputCheckIn.value,
        Levensvraag: "Geen",
        BackgroundImage: downloadURL
                                    });
                                });                                                
                            });
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
                                                });                                                
                                            });
                                        });

                    }

                    const sharedNotification = document.getElementById("shared-notification")

                    sharedNotification.style.display = "block"
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
    



