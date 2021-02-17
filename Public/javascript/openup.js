// Lifelessons in overview
function flagOpenUpPost(flag, metaDiv){

    const lesson = flag.dataset.les
    const user = flag.dataset.user
    flag.src = "images/flag-icon.png"
    metaDiv.appendChild(flag)

    flag.addEventListener("click", () => {

        flag.src = "images/flag-icon-flagged.png"

        db.collection("Vitaminders").where("Gebruikersnaam", "==", user)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

        db.collectionGroup("Levenslessen").where("Levensles", "==", lesson)
        .where("Gebruikersnaam", "==", user).get().then(querySnapshot => {
            querySnapshot.forEach(doc2 => {

                db.collection("Vitaminders").doc(doc1.id)
                .collection("Levenslessen").doc(doc2.id).update({
                    Status: "Under review"
                        });
                    });
                });
            });
        });
    });
};

function addSourceOfInspiration(articleType, titleSource, sourceDOM){

    if(titleSource != undefined){

        db.collection(articleType).where("Insights", "array-contains", titleSource)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const article = doc.data().Levensvraag
                const thema = doc.data().Thema

                if(article != undefined){
                    sourceDOM.innerHTML = `In artikel: <a href="../Artikelen/${article}.html">${article}</a>`
                } else if (thema != undefined){
                    sourceDOM.innerHTML = `In artikel: <a href="../Artikelen/${thema}.html">${thema}</a>`
                }

            });
        });
    };
};

function addCoachOfInspiration(inspirator, titelH3, type){
    if(type === "Coach-inzicht"){
        db.collection("Vitaminders")
        .where("Gebruikersnaam", "==", inspirator)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc3 => {

            const coachClean = doc3.data().GebruikersnaamClean

            titelH3.innerHTML = `Geinspireerd door <i>${coachClean}</i>`

            titelH3.addEventListener("click", () => {
                window.open("../Vitaminders/" + [inspirator] + ".html", "_self");
                });
            });
        });
    };
};

function sourceOfLesson(lessonSource, sourceP){
    if(lessonSource != undefined){

        sourceP.innerHTML = `In: <a href="Artikelen/${lessonSource}.html">${lessonSource}</a>`
        };
};

function checkInTitle(type, levensvraag, titelH3){
    if (type === "Check-in"){

        db.collectionGroup("Levensvragen")
        .where("Levensvraag", "==", levensvraag)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc2 => {

                const levensvraagClean = doc2.data().LevensvraagClean
                titelH3.innerHTML = `Check in bij doel <i> ${levensvraagClean}</i>`

            });
        });
    };
};

function updateTitle(type, titelH3){
    if (type === "Update") {
        titelH3.innerText = "Update"
    };
};

function hideLoader(){
    const loader = document.getElementById("loader")
                loader.style.display = "none"
};

function diplayBackgroundImage(backgroundImage, lesDiv){

    if(backgroundImage != undefined){
        lesDiv.style.backgroundImage = `url(${backgroundImage})`
    } else {
        lesDiv.style.backgroundImage = `url("images/avontuur3.jpg")`
    };

    if(backgroundImage == "Geen"){
        lesDiv.style.backgroundImage = `url("images/avontuur3.jpg")`
    };
};

function userMeta(gebruikersnaam, metaUserPhoto, metaUserName, metaUserDiv){
   
       db.collection("Vitaminders")
       .where("Gebruikersnaam", "==", gebruikersnaam)
       .get().then(querySnapshot => {
           querySnapshot.forEach(doc => {

               const userClean = doc.data().GebruikersnaamClean
               const userPhoto = doc.data().Profielfoto

       metaUserPhoto.src = userPhoto
               
       metaUserName.innerHTML = userClean

       metaUserPhoto.addEventListener("click", () => {
           window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
               });

       metaUserName.addEventListener("click", () => {
           window.open("../Vitaminders/" + [gebruikersnaam] + ".html", "_self");
               });

       metaUserDiv.appendChild(metaUserPhoto)
       metaUserDiv.appendChild(metaUserName)

   });
});
};

function addDataToSocial(social, userName, lesson){

    social.setAttribute("data-username", userName)
    social.setAttribute("data-lesson", lesson)

};

function addSocialIconsToMessage(metaDiv, userName, lesson){

    const socialIconDiv = document.createElement("div")
    socialIconDiv.setAttribute("class", "social-div-openup") 

    const IFeelForYouIconDiv = document.createElement("div")
    const IUnderstandIconDiv = document.createElement("div")
    const yourGoodTheWayYouAreDiv = document.createElement("div")
    const keepAtItDiv = document.createElement("div")
    const yourNotAloneDiv = document.createElement("div")

    const IFeelForYouIconP = document.createElement("p")
    const IUnderstandIconP = document.createElement("p")
    const yourGoodTheWayYouAreP = document.createElement("p")
    const keepAtItP = document.createElement("p")
    const yourNotAloneP = document.createElement("p")

    IFeelForYouIconP.innerHTML = "Ik leef <br> met je mee"
    IUnderstandIconP.innerHTML = "Ik begrijp wat <br> je voelt"
    yourGoodTheWayYouAreP.innerHTML = "Je bent goed <br> zoals je bent"
    keepAtItP.innerHTML = "Ga zo door!"
    yourNotAloneP.innerHTML = "Je staat er <br> niet alleen voor"

    IFeelForYouIconDiv.setAttribute("class", "social-icon-div") 
    IUnderstandIconDiv.setAttribute("class", "social-icon-div")  
    yourGoodTheWayYouAreDiv.setAttribute("class", "social-icon-div") 
    keepAtItDiv.setAttribute("class", "social-icon-div") 
    yourNotAloneDiv.setAttribute("class", "social-icon-div") 

    addDataToSocial(IFeelForYouIconDiv, userName, lesson)
    addDataToSocial(IUnderstandIconDiv, userName, lesson)
    addDataToSocial(yourGoodTheWayYouAreDiv, userName, lesson)
    addDataToSocial(keepAtItDiv, userName, lesson)
    addDataToSocial(yourNotAloneDiv, userName, lesson)

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

                const auth = doc.data().Gebruikersnaam

                savebutton(IFeelForYouIconDiv, "IFeelForYou", auth, IFeelForYouIconP, "Ik leef met je mee")
                savebutton(IUnderstandIconDiv, "IUnderstandYou", auth, IUnderstandIconP, "Ik begrijp wat je voelt")
                savebutton(yourGoodTheWayYouAreDiv, "YourGoodTheWayYouAre", auth, yourGoodTheWayYouAreP, "Je bent goed zoals je bent")
                savebutton(keepAtItDiv, "KeepAtIt", auth, keepAtItP, "Ga zo door!")
                savebutton(yourNotAloneDiv, "YourNotAlone", auth, yourNotAloneP, "Je staat er niet alleen voor")

            });
        };
    });

    const IFeelForYouIcon = document.createElement("img")
    const IUnderstandIcon = document.createElement("img")
    const yourGoodTheWayYouAre = document.createElement("img")
    const keepAtIt = document.createElement("img")
    const yourNotAlone = document.createElement("img")

    IFeelForYouIcon.src = "../images/design/person-24px-heart.png"
    IUnderstandIcon.src = "../images/comparison-icon.png"
    yourGoodTheWayYouAre.src = "../images/design/person-24px-check.png"
    keepAtIt.src = "../images/heart-icon.png"
    yourNotAlone.src = "../images/design/group-24px.png"

    socialIconDiv.appendChild(IFeelForYouIconDiv)
    IFeelForYouIconDiv.appendChild(IFeelForYouIcon)
    IFeelForYouIconDiv.appendChild(IFeelForYouIconP)
    socialIconDiv.appendChild(IUnderstandIconDiv)
    IUnderstandIconDiv.appendChild(IUnderstandIcon)
    IUnderstandIconDiv.appendChild(IUnderstandIconP)
    socialIconDiv.appendChild(yourGoodTheWayYouAreDiv)
    yourGoodTheWayYouAreDiv.appendChild(yourGoodTheWayYouAre)
    yourGoodTheWayYouAreDiv.appendChild(yourGoodTheWayYouAreP)
    socialIconDiv.appendChild(keepAtItDiv)
    keepAtItDiv.appendChild(keepAtIt)
    keepAtItDiv.appendChild(keepAtItP)
    socialIconDiv.appendChild(yourNotAloneDiv)
    yourNotAloneDiv.appendChild(yourNotAlone)
    yourNotAloneDiv.appendChild(yourNotAloneP)

    metaDiv.appendChild(socialIconDiv)
}

function savebutton(supportType, support, auth, notice, socialTypeWritten){

    supportType.addEventListener("click", () => {

        const username = supportType.dataset.username
        const lesson = supportType.dataset.lesson

        saveInLesson(support, lesson, username)
        saveInUser(username, auth, lesson, support, socialTypeWritten)

        notice.innerText = "Verstuurd"
        notice.style.color = "#8e0000"

    });
};

function saveInLesson(support, lesson, username){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", username)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collectionGroup("Levenslessen")
            .where("Levensles", "==", lesson)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    db.collection("Vitaminders")
                    .doc(doc.id).collection("Levenslessen")
                    .doc(doc1.id)
                    .update({
                        Support: firebase.firestore.FieldValue.arrayUnion(support)
                    });
                });
            });
        });
    });
};


function saveInUser(username, giver, lesson, support, socialTypeWritten){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", username)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const email = doc.data().Email
            const usernameClean = doc.data().GebruikersnaamClean

            sendMailNewSocial(email, usernameClean, socialTypeWritten)

            db.collection("Vitaminders")
            .doc(doc.id)
            .collection("Support")
            .doc()
            .set({
                Type: support,
                Giver: giver,
                Reciever: username,
                Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                Message: lesson,
                SourceType: "OpenUp",
                Status: "New"
            });
        });
    });
};

function sendMailNewSocial(email, gebruikersnaamClean, socialTypeWritten){

    console.log(email)

    db.collection("Mail").doc().set({
        to: email,
        cc: "info@vitaminds.nu",
        message: {
        subject: `Nieuwe steunreactie op Vitaminds`,
        html: `Hallo ${gebruikersnaamClean},</br></br>
        
        Je hebt een nieuwe steunreactie: <b>"${socialTypeWritten}"</b>.</br></br>

        Ga naar <a href="www.vitaminds.nu">Vitaminds</a> en bekijk je nieuwe reactie.</br></br>
        
        Vriendelijke groet, </br></br>
        Het Vitaminds Team </br></br>
        <img src="https://vitaminds.nu/images/design/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`
        }
                
        }).catch((err) => {
        console.log(err)
        });

};

!function queryPublicLifelessons(){

    const DOM = document.getElementById("verzamelOpenUps")

    db.collectionGroup("Levenslessen")
    .where("Public", "==", "Yes")
    .where("Status", "==", "Approved")
    .orderBy("Timestamp", "desc")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const les = doc.data().Levensles
            const type = doc.data().Type
            const timestamp = doc.data().Timestamp
            const inspirator = doc.data().Auteur
            const lessonSource = doc.data().Source
            const gebruikersnaam = doc.data().Gebruikersnaam
            const levensvraag = doc.data().Levensvraag
            const backgroundImage = doc.data().BackgroundImage
            const source = doc.data().Source

            const outerBronDiv = document.createElement("div")
            outerBronDiv.setAttribute("class", "outer-bron-div")
        const metaUserDiv = document.createElement("div")
            metaUserDiv.setAttribute("class", "meta-user-div")
            metaUserDiv.setAttribute("data-user", gebruikersnaam)
        const metaUserPhoto = document.createElement("img")
        const metaUserName = document.createElement("p")
            metaUserName.setAttribute("id", "meta-user-name")
        const bronDiv = document.createElement("div")
            bronDiv.setAttribute("class", "bron-div-detail") 
        const titelH3 = document.createElement("h3")
        const sourceP = document.createElement("p")
            sourceP.setAttribute("id", "source-of-inspiration")
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
        const flagIcon = document.createElement("img")
            flagIcon.setAttribute("id", "flag-icon-open-up")
            flagIcon.setAttribute("data-user", gebruikersnaam)
            flagIcon.setAttribute("data-les", les)

            lessen.innerHTML = les
            typeMeta.innerHTML = type
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            timestampMeta.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

            sourceOfLesson(lessonSource, sourceP)
            hideLoader()
            diplayBackgroundImage(backgroundImage, lesDiv)
            userMeta(gebruikersnaam, metaUserPhoto, metaUserName, metaUserDiv)
            flagOpenUpPost(flagIcon, metaDiv)
            addSourceOfInspiration("Levensvragen", source, sourceP)
            addCoachOfInspiration(inspirator, titelH3, type)
            checkInTitle(type, levensvraag, titelH3)
            updateTitle(type, titelH3)
            addSocialIconsToMessage(metaDiv, gebruikersnaam, les)

            DOM.appendChild(outerBronDiv)
            outerBronDiv.appendChild(bronDiv)
            bronDiv.appendChild(metaUserDiv)
            bronDiv.appendChild(editIcon)
            bronDiv.appendChild(titelH3)
            bronDiv.appendChild(sourceP)
            bronDiv.appendChild(lesDiv)
            bronDiv.appendChild(lessen)
            bronDiv.appendChild(timestampMeta)
            bronDiv.appendChild(metaDiv) 

        });
    });
}();

    

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

    checkInShareButton.innerText = "Gedeeld"

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
                Public: "Yes",
                BackgroundImage: "Geen",
                Status: "Approved"
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
            Public: "Yes",
            Levensles: inputCheckIn.value,
            Levensvraag: levensvraagID,
            BackgroundImage: "Geen",
            Status: "Approved"
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
        Public: "Yes",
        BackgroundImage: downloadURL,
        Status: "Approved"
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
                        Public: "Yes",
                        Levensles: inputCheckIn.value,
                        Levensvraag: levensvraagID,
                        BackgroundImage: downloadURL,
                        Status: "Approved"
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
                });
            });
    } else {
        inputCheckIn.addEventListener("mouseover", () => {

            const noAuth = document.createElement("p")

            const DOM = document.getElementById("check-in-outer-div")

            noAuth.innerText = `Maak eerst even een aacount aan om te kunnen delen`

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
    



