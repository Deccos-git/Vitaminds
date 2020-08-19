// Fetching title from url
const titelhtml = window.location.href.replace(/^.*[\\\/]/, '')
const titel1 = titelhtml.replace('.html', '')
const titel2 = titel1.replace('%20',' ')
const titel3 = titel2.replace('%20',' ')
const titel4 = titel3.replace('%20',' ')
const titel5 = titel4.replace('%20',' ')
const titel6 = titel4.replace('%20',' ')
const titel7 = titel6.replace('%20',' ')
const titel8 = titel7.replace('%20',' ')
const titel9 = titel8.replace('%20',' ')
const titel10 = titel9.replace('%20',' ')
const titel11 = titel10.replace('%20',' ')
const titel12 = titel11.split("?fb")
const titel = titel12[0]

// Groups overview page

const practicegroupDOM = document.getElementById("practicegroups")
const themegroupDOM = document.getElementById("themegroups")
const coachGroupDOM = document.getElementById("coachgroups")

const practicegroupTab = document.getElementById("practicegroup-tab")
const themegroupTab = document.getElementById("themegroup-tab")
const coachgroupTab = document.getElementById("coachgroup-tab")

if(practicegroupTab != null){
    practicegroupTab.addEventListener("click", () => {
        practicegroupDOM.style.display = "flex"
        themegroupDOM.style.display = "none"
        coachGroupDOM.style.display = "none"
        practicegroupTab.style.backgroundColor = "#122b46"
        practicegroupTab.style.color = "white"
        themegroupTab.style.backgroundColor = "white"
        themegroupTab.style.color = "#122b46"
        coachgroupTab.style.backgroundColor = "white"
        coachgroupTab.style.color = "#122b46"
    });
};

if(themegroupTab != null){
    themegroupTab.addEventListener("click", () => {
        practicegroupDOM.style.display = "none"
        themegroupDOM.style.display = "flex"
        coachGroupDOM.style.display = "none"
        practicegroupTab.style.backgroundColor = "white"
        practicegroupTab.style.color = "#122b46"
        themegroupTab.style.backgroundColor = "#122b46"
        themegroupTab.style.color = "white"
        coachgroupTab.style.backgroundColor = "white"
        coachgroupTab.style.color = "#122b46"
    });
};

if(coachgroupTab != null){
    coachgroupTab.addEventListener("click", () => {
        practicegroupDOM.style.display = "none"
        themegroupDOM.style.display = "none"
        coachGroupDOM.style.display = "flex"
        practicegroupTab.style.backgroundColor = "white"
        practicegroupTab.style.color = "#122b46"
        themegroupTab.style.backgroundColor = "white"
        themegroupTab.style.color = "#122b46"
        coachgroupTab.style.backgroundColor = "#122b46"
        coachgroupTab.style.color = "white"
    });
};

    // Theme groups overview

    const DOMthemeView = document.getElementById("themegroups")

    db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const title = doc.data().Levensvraag
            const headerImage = doc.data().HeaderImage

            const outerSection = document.createElement("section")
            outerSection.setAttribute("class", "theme-groups-section")
        const headerDiv = document.createElement("div")
            headerDiv.setAttribute("class", "theme-groups-header")
        const headerImg = document.createElement("img")
            headerImg.setAttribute("class", "header-image-groups")
        const titleDiv = document.createElement("div")
            titleDiv.setAttribute("class", "title-div-themegroups")
        const titleH2 = document.createElement("h2")
            titleH2.setAttribute("class", "titelTekst")
        const subTitle = document.createElement("h5")
        const buttonDiv = document.createElement("button")
            buttonDiv.setAttribute("class", "button-algemeen-card")

        titleH2.innerHTML = title
        headerImg.src = headerImage
        buttonDiv.innerHTML = "Lid worden"

        buttonDiv.addEventListener("click", () => {

            // Add auth to list of members

            auth.onAuthStateChanged(User =>{
                if(User){
                  const userRef = db.collection("Vitaminders").doc(User.uid);
                  userRef.get().then(function(doc) {
            
                        const auth = doc.data().Gebruikersnaam

            db.collection("Chats").where("Room", "==", title).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    // Store members in database
            
                    db.collection("Chats").doc(doc1.id).update({
                        Members: firebase.firestore.FieldValue.arrayUnion(auth)
                    }).then(() => {
                        window.open("../Group/" + title + ".html", "_self") 
                                });
                            });
                        });
                    });
                };
            });
        });

        db.collection("Chats").where("Room", "==", title).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const members = doc1.data().Members

                console.log(members)

                // Display number of members in the title

                const numberOfMembers = members.length

                subTitle.innerText = `${numberOfMembers} mensen praten over`

                //Already a member of the group
                alreadyMember(members, buttonDiv)

            });
        });

        DOMthemeView.appendChild(outerSection)
        outerSection.appendChild(headerDiv)
        headerDiv.appendChild(headerImg)
        outerSection.appendChild(titleDiv)
        titleDiv.appendChild(subTitle)
        titleDiv.appendChild(titleH2)
        outerSection.appendChild(buttonDiv)

        });
    });

// Themegroup individual page

    // Title

    const DOMtitle = document.getElementById("group-title")

    if(DOMtitle != null){

        db.collection("Chats").where("Room", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const roomClean = doc.data().RoomClean
        
                DOMtitle.innerText = roomClean
            });
        });
    }

    const DOMchatScreen = document.getElementById("chat-screen")

    // Display members 

    const listOfMembers = document.getElementById("list-of-members-inner-div")

    const roomName = titel

db.collection("Chats").where("Room", "==", roomName).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

            const members = doc.data().Members

            members.forEach(member => {

            db.collection("Vitaminders").where("Gebruikersnaam", "==", member).get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

                const gebruikersnaamClean = doc1.data().GebruikersnaamClean
                const photo = doc1.data().Profielfoto

                const memberPhoto = document.createElement("img")
                    memberPhoto.setAttribute("class", "group-member-photo")

                
                    if(photo == undefined){
                        memberPhoto.src = "../images/dummy-profile-photo.jpeg"
                    } else {
                        memberPhoto.src = photo
                    }    

                memberPhoto.addEventListener("click", () => {

                    window.open("../Vitaminders/" + member, "_self");

                });

                listOfMembers.appendChild(memberPhoto)

                    });
                });
            });
        });
    });
     

    // Save message to database
    const send = document.getElementById("send-icon-group")

    if(send != null){

    send.addEventListener("click", () => {

        const message = document.getElementById("chat-input").value 

        auth.onAuthStateChanged(User =>{
            if(User){
            const userRef = db.collection("Vitaminders").doc(User.uid);
            userRef.get().then(function(doc) {
        
                    const auth = doc.data().Gebruikersnaam

        const roomName = titel

    db.collection("Chats").where("Room", "==", roomName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {


        db.collection("Chats").doc(doc.id).collection("Messages").doc().set({
            Auth: auth,
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Message: message,
            Room: roomName
            }).then(() => {
                db.collection("Chats").doc(doc.id).update({
                    Messages: firebase.firestore.FieldValue.increment(1)
                                });
                            });  
                        });
                    });
                });
            };
        });
    });
    };

    // Get chat from database in realtime

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

                const auth = doc.data().Gebruikersnaam

                const roomName = titel

                db.collectionGroup("Messages").where("Room", "==", roomName).orderBy("Timestamp", "asc").onSnapshot(querySnapshot => {

            // User
        const chatDivsUser = document.getElementsByClassName("auth-message-div-user")

        const chatDivsArrayUser = Array.from(chatDivsUser)

        chatDivsArrayUser.forEach(chatUser => {
            DOMchatScreen.removeChild(chatUser)
        });
            // Auth
        const chatDivsAuth = document.getElementsByClassName("auth-message-div-auth")

        const chatDivsArrayAuth = Array.from(chatDivsAuth)

        chatDivsArrayAuth.forEach(chatAuth => {
            DOMchatScreen.removeChild(chatAuth)
        });
                    
                    querySnapshot.forEach(doc2 => {

                        const authMessage = doc2.data().Message
                        const sender = doc2.data().Auth

                        
                db.collection("Vitaminders").where("Gebruikersnaam", "==", sender).get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const messageNameClean = doc1.data().GebruikersnaamClean
                    
                        if (auth == sender){

                        const authMessageDiv = document.createElement("div")
                        authMessageDiv.setAttribute("class", "auth-message-div-auth")
                        const authMessageP = document.createElement("p")
                            authMessageP.setAttribute("class", "auth-message-p")
                        const senderName = document.createElement("p")
                            senderName.setAttribute("class", "sender-name-message")

                        senderName.innerText = messageNameClean

                        authMessageP.innerText = authMessage

                        DOMchatScreen.appendChild(authMessageDiv)
                        authMessageDiv.appendChild(authMessageP)
                        authMessageP.appendChild(senderName)

                        } else {

                        const userMessageDiv = document.createElement("div")
                        userMessageDiv.setAttribute("class", "auth-message-div-user")
                        const userMessageP = document.createElement("p")
                            userMessageP.setAttribute("class", "user-message-p")
                        const senderName = document.createElement("p")
                        senderName.setAttribute("class", "sender-name-message")

                        senderName.innerText = messageNameClean

                        userMessageP.innerText = authMessage

                        DOMchatScreen.appendChild(userMessageDiv)
                        userMessageDiv.appendChild(userMessageP)
                        userMessageP.appendChild(senderName)

                            };
                        });
                    });
                });
            });
        });
    };
});

    // Get chats of auth

    const DOMchats = document.getElementById("overview-chats")

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

            const auth = doc.data().Gebruikersnaam


    db.collection("Chats").where("Eigenaar", "==", "Vitaminds").where("type", "==", "Group").get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

            const users = doc1.data().Room

            const userArray = users.split("_")

            if(userArray.includes(auth)){

            userArray.forEach(user => {

                    if(auth != user){

                        db.collection("Vitaminders").where("Gebruikersnaam", "==", user).get().then(querySnapshot => {
                            querySnapshot.forEach(doc4 => {

                                const userClean = doc4.data().GebruikersnaamClean
                                const photo = doc4.data().Profielfoto

                        const chatsDiv = document.createElement("div")
                            chatsDiv.setAttribute("class", "chats-div")
                        const chatsP = document.createElement("p")
                        const photoDiv = document.createElement("div")
                            photoDiv.setAttribute("class", "photo-div")
                        const photoImg = document.createElement("img")

                        chatsP.innerText = userClean
                        
                        if(photo == undefined){
                            photoImg.src = "images/dummy-profile-photo.jpeg"
                        } else {
                        photoImg.src = photo
                        }

                        console.log(photo)

                        chatsDiv.addEventListener("click", () => {
                            window.open(`../Chats/${user}.html`, "_self");
                        })

                        DOMchats.appendChild(chatsDiv)
                        chatsDiv.appendChild(photoDiv)
                        photoDiv.appendChild(photoImg)
                        chatsDiv.appendChild(chatsP)

                                    });
                                });
                            };    
                    });
                };
                });
            });
        });
        };
    });


// Coachgroup builder

function startCoachgroupBuilder(){
    window.open("coachgroup-builder.html", "_self");
}

function startPracticegroupBuilder(){
    window.open("practicegroup-builder.html", "_self");
}

// Title

function groupTitle(a,b){

const coachGroupTitle = document.getElementById(a)

const authRef = auth.onAuthStateChanged(User =>{
    if(User){
    const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {

        const auth = doc.data().GebruikersnaamClean
        const usertype = doc.data().Usertype

        coachGroupTitle.innerText = `Wat leuk dat je een ${b} gaat starten, ${auth}`

            });
        };
    });
}   groupTitle("coachgroup-builder-title", "coachgroep")
    groupTitle("practicegroup-builder-title", "oefengroep")

    // Save to database
    const uploadCoverPhotoButton = document.getElementById("upload-cover-photo-coachgroup")

    if(uploadCoverPhotoButton != null){

    uploadCoverPhotoButton.addEventListener("click", () => {
        const selectedFile = document.getElementById('foto-upload').files[0];
        const progressBar = document.getElementById("progress-bar")

        uploadCoverPhotoButton.innerText = "Uploaden..."
        
        const storageRef = firebase.storage().ref("/GroupCoverPhotos/" + selectedFile.name);
        
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
              uploadCoverPhotoButton.innerText = "Geupload"
              window.coverPhoto = downloadURL

                });
            });
        });
    });
};

    const uploadCoverPhotoButtonPracticegroup = document.getElementById("upload-cover-photo-practicegroup")

    if (uploadCoverPhotoButtonPracticegroup != null){
    uploadCoverPhotoButtonPracticegroup.addEventListener("click", () => {
        const selectedFile = document.getElementById('foto-upload').files[0];
        const progressBar = document.getElementById("progress-bar")

        uploadCoverPhotoButtonPracticegroup.innerText = "Uploaden..."
        
        const storageRef = firebase.storage().ref("/GroupCoverPhotos/" + selectedFile.name);
        
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
              uploadCoverPhotoButtonPracticegroup.innerText = "Geupload"
              window.coverPhoto = downloadURL

                });
            });
        });
    });
};

function saveCoachgroup(){

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam
    
    const title = document.getElementById("coachgroup-title").value
    const description = document.getElementById("coachgroup-description").value
    const numberParticipants = document.getElementById("coachgroup-number-participants").value
    const costs = document.getElementById("coachgroup-costs").value
    const startNumber = document.getElementById("coachgroup-start-number").value

   db.collection("Chats").doc().set({
        Eigenaar: "Vitaminds",
        Room: idClean + title,
        Creater: auth,
        Description: description,
        NumberParticipants: numberParticipants,
        Costs: costs,
        StartNumber: startNumber,
        Members: [],
        Messages: 0,
        Type: "Coachgroup", 
        CoverPhoto: coverPhoto
                });
            });
        };
    });
};

function savePracticegroup(){

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam
    
    const title = document.getElementById("coachgroup-title").value
    const description = document.getElementById("coachgroup-description").value
    const numberParticipants = document.getElementById("coachgroup-number-participants").value
    const startNumber = document.getElementById("coachgroup-start-number").value

   db.collection("Chats").doc().set({
        Eigenaar: "Vitaminds",
        Room: idClean + title,
        RoomClean: title,
        Creater: auth,
        Description: description,
        NumberParticipants: numberParticipants,
        StartNumber: startNumber,
        Members: [],
        Messages: 0,
        Type: "Practicegroup", 
        CoverPhoto: coverPhoto
                });
            });
        };
    });
};

// Load coachgroups from database to overview

db.collection("Chats").where("Type", "==", "Coachgroup").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Room
        const titleClean = doc.data().RoomClean
        const auth = doc.data().Creater
        const description = doc.data().Description
        const numberParticipants = doc.data().NumberParticipants
        const startNumber = doc.data().StartNumber
        const coverPhoto = doc.data().CoverPhoto
        const costs = doc.data().Costs
        const members = doc.data().Members

        const DOM = document.getElementById("coachgroups")

        const groupInnerDiv = document.createElement("div")
            groupInnerDiv.setAttribute("class", "theme-groups-section")
        const groupHeader = document.createElement("div")
            groupHeader.setAttribute("class", "theme-groups-header")
        const groupCoverPhoto = document.createElement("img")
            groupCoverPhoto.setAttribute("class", "header-image-groups")
        const authDiv = document.createElement("div")
            authDiv.setAttribute("class", "group-auth-div")
        const authImg = document.createElement("img")
            authImg.setAttribute("class", "group-auth-img")
        const authName = document.createElement("p")
        const metaDiv = document.createElement("div")
            metaDiv.setAttribute("class", "group-meta-div")
        const numberParticipantsP = document.createElement("p")
        const memberCount = document.createElement("p")
        const startNumberP = document.createElement("p")
        const costsP = document.createElement("p")
        const bottomDiv = document.createElement("div")
            bottomDiv.setAttribute("class", "bottom-div")
        const groupTitleH2 = document.createElement("h2")
            groupTitleH2.setAttribute("class", "titelTekst")
        const descriptionP = document.createElement("p")
        const groupButton = document.createElement("button")
            groupButton.setAttribute("class", "button-algemeen-card")
            groupButton.setAttribute("id", "coachgroup-button")
            groupButton.setAttribute("data-room", title)
            groupButton.setAttribute("onclick", "memberCoachGroups(this)")

            groupCoverPhoto.src = coverPhoto
            groupTitleH2.innerText = titleClean
            descriptionP.innerText = description

            groupButton.innerText = "Deelnemen"

            db.collection("Vitaminders").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const nameClean = doc1.data().GebruikersnaamClean
                    const profilePic = doc1.data().Profielfoto
            
            authImg.src = profilePic
            authName.innerText = nameClean

            authDiv.appendChild(authImg)
            authDiv.appendChild(authName)

            authDiv.addEventListener("click", () => {
                window.open("../Vitaminders/" + auth + ".html", "_self");
            })

                });
            });

            numberParticipantsP.innerText = `Max. leden: ${numberParticipants}`
            memberCount.innerText = `Huidig aantal leden: ${members.length}`
            costsP.innerText = `Kosten per week: ${costs} euro`
            startNumberP.innerText = `Coachgroep begint bij: ${startNumber} leden`

            DOM.appendChild(groupInnerDiv)
            groupInnerDiv.appendChild(groupHeader)
            groupHeader.appendChild(groupCoverPhoto)
            groupInnerDiv.appendChild(authDiv)
            groupInnerDiv.appendChild(bottomDiv)
            bottomDiv.appendChild(groupTitleH2)
            bottomDiv.appendChild(descriptionP)
            groupInnerDiv.appendChild(metaDiv)
            metaDiv.appendChild(numberParticipantsP)
            metaDiv.appendChild(startNumberP)
            metaDiv.appendChild(memberCount)
            metaDiv.appendChild(costsP)
            groupInnerDiv.appendChild(groupButton)

              // Group is full message
              groupIsFull(members.length, groupButton, numberParticipants)

              //Already a member of the group
            alreadyMember(members, groupButton)

    });
});

function hideCoachgroupBuilderForNoneCoach(){
    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam

            db.collection("Vitaminders").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    const userType = doc.data().Usertype

                    const coachGroupBuiderDiv = document.getElementById("coachgroup-builder-div")

                    if(userType === "Coach" ){
                        coachGroupBuiderDiv.style.display = "block"
                    }

                    });
                });
            });
        };
    });
}; 
hideCoachgroupBuilderForNoneCoach()

// Load practicegroups from database to overview

db.collection("Chats").where("Type", "==", "Practicegroup").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Room
        const titleClean = doc.data().RoomClean
        const auth = doc.data().Creater
        const description = doc.data().Description
        const numberParticipants = doc.data().NumberParticipants
        const startNumber = doc.data().StartNumber
        const coverPhoto = doc.data().CoverPhoto
        const members = doc.data().Members

        const DOM = document.getElementById("practicegroups")

        const groupInnerDiv = document.createElement("div")
            groupInnerDiv.setAttribute("class", "theme-groups-section")
        const groupHeader = document.createElement("div")
            groupHeader.setAttribute("class", "theme-groups-header")
        const groupCoverPhoto = document.createElement("img")
            groupCoverPhoto.setAttribute("class", "header-image-groups")
        const authDiv = document.createElement("div")
            authDiv.setAttribute("class", "group-auth-div")
        const authImg = document.createElement("img")
            authImg.setAttribute("class", "group-auth-img")
        const authName = document.createElement("p")
        const metaDiv = document.createElement("div")
            metaDiv.setAttribute("class", "group-meta-div")
        const numberParticipantsP = document.createElement("p")
        const memberCount = document.createElement("p")
        const startNumberP = document.createElement("p")
        const costsP = document.createElement("p")
        const bottomDiv = document.createElement("div")
            bottomDiv.setAttribute("class", "bottom-div")
        const groupTitleH2 = document.createElement("h2")
            groupTitleH2.setAttribute("class", "titelTekst")
        const descriptionP = document.createElement("p")
        const groupButton = document.createElement("button")
            groupButton.setAttribute("class", "button-algemeen-card")
            groupButton.setAttribute("id", "practicegroup-button")
            groupButton.setAttribute("data-room", title)
            groupButton.setAttribute("onclick", "memberPracticeGroups(this)")

            groupCoverPhoto.src = coverPhoto
            groupTitleH2.innerText = titleClean
            descriptionP.innerText = description

            groupButton.innerText = "Deelnemen"

            db.collection("Vitaminders").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const nameClean = doc1.data().GebruikersnaamClean
                    const profilePic = doc1.data().Profielfoto
            
            authImg.src = profilePic
            authName.innerText = nameClean

            authDiv.appendChild(authImg)
            authDiv.appendChild(authName)

            authDiv.addEventListener("click", () => {
                window.open("../Vitaminders/" + auth + ".html", "_self");
                    });
                });
            });

            numberParticipantsP.innerText = `Max. leden: ${numberParticipants}`
            memberCount.innerText = `Huidig aantal leden: ${members.length}`
            startNumberP.innerText = `Coachgroep begint bij: ${startNumber} leden`
            costsP.innerText = `Kosten: gratis`

            DOM.appendChild(groupInnerDiv)
            groupInnerDiv.appendChild(groupHeader)
            groupHeader.appendChild(groupCoverPhoto)
            groupInnerDiv.appendChild(authDiv)
            groupInnerDiv.appendChild(bottomDiv)
            bottomDiv.appendChild(groupTitleH2)
            bottomDiv.appendChild(descriptionP)
            groupInnerDiv.appendChild(metaDiv)
            metaDiv.appendChild(numberParticipantsP)
            metaDiv.appendChild(startNumberP)
            metaDiv.appendChild(memberCount)
            metaDiv.appendChild(costsP)
            groupInnerDiv.appendChild(groupButton)

            // Group is full message
            groupIsFull(members.length, groupButton, numberParticipants)


            //Already a member of the group
            alreadyMember(members, groupButton)
    });
});

// New member

const practicegroupButton = document.getElementById("practicegroup-button")

function saveNewMemberToGroup(a){

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam

    db.collection("Chats").where("Room", "==", a ).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("Chats").doc(doc.id).update({
                Members: firebase.firestore.FieldValue.arrayUnion(auth)
                        });
                    });
                });
            });
        };
    });
};

function memberPracticeGroups(elem){

    const roomTitle = elem.dataset.room

   saveNewMemberToGroup(roomTitle)
};


function memberCoachGroups(elem){

    const roomTitle = elem.dataset.room

    saveNewMemberToGroup(roomTitle)
 };

 // Group is full message

 function groupIsFull(a,b,c){

    if (a === c){
        b.innerText = "Groep is vol"
        b.setAttribute("onclick", "null()")
    }; 
 };

 function alreadyMember(a,b){

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam
     if(a.includes(auth)){
            b.innerText = "Je bent lid"
            b.setAttribute("onclick", "null()")

                };
            });
        };
    });
;}

