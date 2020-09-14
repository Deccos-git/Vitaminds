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

function noticeVisitor(buttonDiv, button){
    const notice = document.createElement("p")
        notice.setAttribute("class", "notice-group-visitor")

    notice.innerText = "Maak een Digimind aan om deel te nemen in een groep"
    notice.addEventListener("click", () => {
        window.open("Register.html", "_self")
    })

    buttonDiv.appendChild(notice)
    buttonDiv.removeChild(button)
}; 

    // Theme groups overview

    const DOMthemeView = document.getElementById("themegroups")

    db.collection("Chats").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const type = doc.data().Type
            const room = doc.data().Room

            if(type === "Group"){


    db.collection("Levensvragen").where("Levensvraag", "==", room).get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

            const title = doc1.data().Levensvraag
            const headerImage = doc1.data().HeaderImage

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
        const buttonDiv = document.createElement("div")
            buttonDiv.setAttribute("id", "button-div-theme-group")
        const button = document.createElement("button")
            button.setAttribute("class", "button-algemeen-card")
            button.setAttribute("id", "button-theme-group")
        const leaveGroup = document.createElement("p")
            leaveGroup.setAttribute("class", "leave-group-button")

        titleH2.innerHTML = title
        headerImg.src = headerImage
        button.innerHTML = "Lid worden"
        leaveGroup.innerText = "Groep verlaten"

        button.addEventListener("click", () => {

            button.innerText = "Laden..."

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
                } else {

                    const notice = document.createElement("p")
                    notice.setAttribute("class", "notice-group-visitor")

                notice.innerText = "Maak een Digimind aan om lid te worden van een groep"
                notice.addEventListener("click", () => {
                    window.open("Register.html", "_self")
                })

                buttonDiv.appendChild(notice)
                buttonDiv.removeChild(button)

                }
            });
        });

        auth.onAuthStateChanged(User =>{
            if(User){
              const userRef = db.collection("Vitaminders").doc(User.uid);
              userRef.get().then(function(doc) {
        
                    const auth = doc.data().Gebruikersnaam

        db.collection("Chats").where("Room", "==", title).get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const members = doc1.data().Members

                // Display number of members in the title

                const numberOfMembers = members.length

                if(numberOfMembers === 1){
                    subTitle.innerText = `${numberOfMembers} mens praat over`
                } else {
                    subTitle.innerText = `${numberOfMembers} mensen praten over`
                };

                //Already a member of the group
                alreadyMember(members, button)

                 //Leave group
                leaveGroup.addEventListener("click", () => {

                leaveTheGroup(title)

                    const buttonThemeGroup = document.getElementById("button-theme-group")

                    buttonThemeGroup.innerText = "Lid worden"

                });

            if(members.includes(auth)){
                buttonDiv.appendChild(leaveGroup)
                };

            });
        });
    });
};
        });

        DOMthemeView.appendChild(outerSection)
        outerSection.appendChild(headerDiv)
        headerDiv.appendChild(headerImg)
        outerSection.appendChild(titleDiv)
        titleDiv.appendChild(subTitle)
        titleDiv.appendChild(titleH2)
        outerSection.appendChild(buttonDiv)
        buttonDiv.appendChild(button)

                });
            });
        };
    });
});

// Themegroup individual page

    // Title

    const DOMtitle = document.getElementById("group-title")

    console.log(DOMtitle)

    if(DOMtitle != null){

        db.collection("Chats").where("Room", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const roomClean = doc.data().RoomClean
                const room = doc.data().Room

                if(roomClean == undefined){
                    DOMtitle.innerText = room
                } else {
                    DOMtitle.innerText = roomClean
                }
    
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

    // Add learning

    function addLearning(){

        const inspirationIcon = document.getElementById("inspiration-icon")
        const addLearningDiv = document.getElementById("add-learning-div")
        const selectGoals = document.getElementById("select-goals")
        const buttonAddLearning = document.getElementById("button-add-learning")
        const inputAddLearning = document.getElementById("input-learning")
        const addLearningH3 = document.getElementById("add-learning-h3")
        const addLearningButtonDiv = document.getElementById("add-learning-button-div")

        if(inspirationIcon != null){
    
        inspirationIcon.addEventListener("click", () => {
    
            addLearningDiv.style.display = "flex"
    
        });
    };
    
        // Load goals of auth in select
        db.collection("Chats").where("Room", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const goal = doc.data().Goal

                auth.onAuthStateChanged(User =>{
                    if(User){
                      const userRef = db.collection("Vitaminders").doc(User.uid);
                      userRef.get().then(function(doc) {
            
                        const auth = doc.data().Gebruikersnaam

                        console.log(goal)
                
                        db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", auth).where("Goal", "==", goal)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc1 => {
            
                                const levensvraagClean = doc1.data().LevensvraagClean
            
                                const option = document.createElement("option")
            
                                option.innerText = levensvraagClean
            
                                selectGoals.appendChild(option)
                            });
                        });
                      });
                    };
                });
    
            });
        });
    
    if (buttonAddLearning != null){
        buttonAddLearning.addEventListener("click", () => {
    
            const input = document.getElementById("input-learning").value
       
            const select = document.getElementById("select-goals")
            const option = select.options
            const selected = option[option.selectedIndex].innerHTML
       
            db.collectionGroup("Levensvragen").where("LevensvraagClean", "==", selected).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
       
                   const levensvraagID = doc.data().Levensvraag
       
            auth.onAuthStateChanged(User =>{
                userRef = db.collection("Vitaminders").doc(User.uid)
                userRef.get()
                 .then(doc => {
                         const auth = doc.data().Gebruikersnaam
       
            db.collection("Vitaminders").doc(User.uid).collection("Levenslessen").doc().set({
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Levensles: input,
            Gebruikersnaam: auth,
            Inspirerend: 1,
            Type: "Group-inzicht",
            Source: titel,
            Levensvraag: levensvraagID
                    })
       
            levensvraagRef = db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraagID).where("Gebruikersnaam", "==", auth)
            levensvraagRef.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc4 => {
    
                    console.log(input)
                    
                    db.collection("Vitaminders").doc(User.uid).collection("Levensvragen").doc(doc4.id).update({
                        Levenslessen: firebase.firestore.FieldValue.arrayUnion(input)
                    })
                    
                })
            })
            const savedNotice = document.getElementById("notice-learning-added")
            savedNotice.style.display = "block"
                       })
                   })
               })
           })
        }); 
    }; 
    }; addLearning()
     

    // Save message to database

    const DOMchatScreenChat = document.getElementById("chat-screen")

    function saveMessage(){
        const message = document.getElementById("chat-input").value 

        auth.onAuthStateChanged(User =>{
            if(User){
            const userRef = db.collection("Vitaminders").doc(User.uid);
            userRef.get().then(function(doc) {
        
                    const auth = doc.data().Gebruikersnaam

        const roomName = titel

    db.collection("Chats").where("Room", "==", roomName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const members = doc.data().Members

        db.collection("Chats").doc(doc.id).collection("Messages").doc().set({
            Auth: auth,
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Message: message,
            Room: roomName,
            Members: members,
            Read: [],
            Status: "New"
            }).then(() => {
                db.collection("Chats").doc(doc.id).update({
                    Messages: firebase.firestore.FieldValue.increment(1)
                                }).then(() => {
                                    const input = document.getElementById("chat-input")

                                    input.value = ""
                                });
                            });  
                        });
                    });
                });
            };
        });
    };
    const send = document.getElementById("send-icon-group")

    if(send != null){

    send.addEventListener("click", saveMessage, false)
    send.addEventListener("submit", saveMessage, false)

    };

    // Get chat from database in realtime

        //Functions
        function emptyScreenByOnsnapshot(){
            const chatDivsUser = document.getElementsByClassName("auth-message-p")
        
            const chatDivsArrayUser = Array.from(chatDivsUser)
        
            chatDivsArrayUser.forEach(chatUser => {
                DOMchatScreenChat.removeChild(chatUser)
            });
        };

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

                const auth = doc.data().Gebruikersnaam

                const roomName = titel

                db.collectionGroup("Messages")
                .where("Room", "==", roomName)
                .orderBy("Timestamp", "asc")
                .onSnapshot(querySnapshot => {

                emptyScreenByOnsnapshot()
                    
                    querySnapshot.forEach(doc2 => {

                        const authMessage = doc2.data().Message
                        const sender = doc2.data().Auth

                        const messageP = document.createElement("p")
                        messageP.setAttribute("class", "auth-message-p")
    
                        const senderName = document.createElement("p")
                        senderName.setAttribute("class", "sender-name-message")
    
                db.collection("Vitaminders").where("Gebruikersnaam", "==", sender).get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const messageNameClean = doc1.data().GebruikersnaamClean
                    
                        if (auth == sender){
    
                            senderName.innerText = messageNameClean
    
                            messageP.innerText = authMessage
    
                            messageP.style.alignSelf = "flex-end"
    
                        } else {
    
                            senderName.innerText = messageNameClean
    
                            messageP.innerText = authMessage
    
                            messageP.style.alignSelf = "flex-start"
                            
                            };
    
                            messageP.appendChild(senderName)

                        });
                    });

                    DOMchatScreen.appendChild(messageP)
                });
            });
        });
    };
});

    // Get chats and groups of auth in overview

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
                            photoImg.src = "../images/dummy-profile-photo.jpeg"
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


// Group builder

function startCoachgroupBuilder(){
    window.open("coachgroup-builder.html", "_self");
}

function startPracticegroupBuilder(){
    window.open("practicegroup-builder.html", "_self");
}

// Group goal

const groupGoalSelect = document.getElementById("create-practicegroup-goal-select")

if(groupGoalSelect != null){

db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc=> {
            const doel = doc.data().Levensvraag

            const option = document.createElement("option")

            option.innerHTML = doel

            groupGoalSelect.appendChild(option)
        });
    });
};

const coachgroupGoalSelect = document.getElementById("create-coachgroup-goal-select")

if(coachgroupGoalSelect != null){

db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc=> {
            const doel = doc.data().Levensvraag

            const option = document.createElement("option")

            option.innerHTML = doel

            coachgroupGoalSelect.appendChild(option)
        });
    });
};

// Title

function groupTitle(a,b){

const coachGroupTitle = document.getElementById(a)

if (coachGroupTitle != null){

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
    };
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
    const exercises = document.getElementById("coachgroup-number-exercises").value

    // Group goal
    const groupGoalSelect = document.getElementById("create-coachgroup-goal-select")

    const select = groupGoalSelect.options
    const option = select[select.selectedIndex].innerHTML

   db.collection("Chats").doc().set({
        Eigenaar: "Vitaminds",
        Room: idClean + title,
        RoomClean: title,
        Creater: auth,
        Description: description,
        NumberParticipants: numberParticipants,
        Costs: costs,
        StartNumber: startNumber,
        Members: firebase.firestore.FieldValue.arrayUnion(auth),
        Goal: option,
        AmountExersices: exercises,
        Messages: 0,
        Type: "Coachgroup", 
        CoverPhoto: coverPhoto
                }).then(() => {
                        const notice = document.createElement("p")

                        notice.innerText = "Je groep is aangemaakt!"

                        const buttonCoachGroup = document.getElementById("button-coachgroup")

                        buttonCoachGroup.appendChild(notice)

                        notice.style.cursor = "pointer"

                        notice.addEventListener("click", () => {
                            window.open(`../Group/${idClean + title}.html`, "_self");
                        });
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

    //group goal
    const groupGoalSelect = document.getElementById("create-practicegroup-goal-select")

    const select = groupGoalSelect.options
    const option = select[select.selectedIndex].innerHTML


   db.collection("Chats").doc().set({
        Eigenaar: "Vitaminds",
        Room: idClean + title,
        RoomClean: title,
        Creater: auth,
        Description: description,
        NumberParticipants: numberParticipants,
        StartNumber: startNumber,
        Goal: option,
        Members: firebase.firestore.FieldValue.arrayUnion(auth),
        Messages: 0,
        Type: "Practicegroup", 
        CoverPhoto: coverPhoto
                }).then(() => {
                    const notice = document.createElement("p")

                        notice.innerText = "Je groep is aangemaakt!"

                        const buttonPracticeGroup = document.getElementById("button-practicegroup")

                        buttonPracticeGroup.appendChild(notice)

                        notice.style.cursor = "pointer"

                        notice.addEventListener("click", () => {
                            window.open(`../Group/${idClean + title}.html`, "_self");
                        });
                })
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
        const exersices = doc.data().AmountExercises

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
        const exersicesP = document.createElement("p")
        const costsP = document.createElement("p")
        const bottomDiv = document.createElement("div")
            bottomDiv.setAttribute("class", "bottom-div")
        const groupTitleH2 = document.createElement("h2")
            groupTitleH2.setAttribute("class", "titelTekst")
        const descriptionP = document.createElement("p")
        const buttonDiv = document.createElement("div")
            buttonDiv.setAttribute("id", "group-button-div")
        const groupButton = document.createElement("button")
            groupButton.setAttribute("class", "button-algemeen-card")
            groupButton.setAttribute("id", "group-button")
            groupButton.setAttribute("data-room", title)
            groupButton.setAttribute("onclick", "memberCoachGroups(this)")
        const leaveGroup = document.createElement("p")
            leaveGroup.setAttribute("class", "leave-group-button")

            groupCoverPhoto.src = coverPhoto
            groupTitleH2.innerText = titleClean
            descriptionP.innerText = description

            groupButton.innerText = "Lid worden"

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
            exersicesP.innerText = `Aantal oefeningen per maand: ${exersices}`
            leaveGroup.innerText = "Groep verlaten"

            // coachgroup agreement

            coachgroupAgreementTitle(`${description}. Ik plaats ${exersices} keer per maand een nieuwe oefening.`)

            db.collection("Vitaminders").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const profilePic = doc1.data().Profielfoto
                    const coachNameClean = doc1.data().GebruikersnaamClean

                    coachGroupAgreementQuestions(profilePic, coachNameClean, auth)

                });
            });   
            
            visitCoachgroupAgreement(title)

            DOM.appendChild(groupInnerDiv)
            groupInnerDiv.appendChild(groupHeader)
            groupHeader.appendChild(groupCoverPhoto)
            groupInnerDiv.appendChild(authDiv)
            groupInnerDiv.appendChild(bottomDiv)
            bottomDiv.appendChild(groupTitleH2)
            bottomDiv.appendChild(descriptionP)
            groupInnerDiv.appendChild(metaDiv)
            metaDiv.appendChild(exersicesP)
            metaDiv.appendChild(numberParticipantsP)
            metaDiv.appendChild(startNumberP)
            metaDiv.appendChild(memberCount)
            metaDiv.appendChild(costsP)
            groupInnerDiv.appendChild(buttonDiv)
            buttonDiv.appendChild(groupButton)

            if(members.includes(auth)){
                buttonDiv.appendChild(leaveGroup)
                };

              // Group is full message
              groupIsFull(members.length, groupButton, numberParticipants)

              //Already a member of the group
            alreadyMember(members, groupButton)

             //Leave group
             leaveGroup.addEventListener("click", () => {

                leaveTheGroup(title)

                groupButton.innerText = "Lid worden"

            });

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
        const buttonDiv = document.createElement("div")
            buttonDiv.setAttribute("id", "group-button-div")
        const PracticegroupButton = document.createElement("button")
            PracticegroupButton.setAttribute("class", "button-algemeen-card")
            PracticegroupButton.setAttribute("id", "group-button")
            PracticegroupButton.setAttribute("data-room", title)
            PracticegroupButton.setAttribute("onclick", "memberPracticeGroups(this)")
        const leaveGroup = document.createElement("p")
            leaveGroup.setAttribute("class", "leave-group-button")

            groupCoverPhoto.src = coverPhoto
            groupTitleH2.innerText = titleClean
            descriptionP.innerText = description

            PracticegroupButton.innerText = "Deelnemen"

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
            startNumberP.innerText = `Oefengroep begint bij: ${startNumber} leden`
            costsP.innerText = `Kosten: gratis`
            leaveGroup.innerText = "Groep verlaten"

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
            groupInnerDiv.appendChild(buttonDiv)
            buttonDiv.appendChild(PracticegroupButton)

            if(members.includes(auth)){
            buttonDiv.appendChild(leaveGroup)
            };


            // Group is full message
            groupIsFull(members.length, PracticegroupButton, numberParticipants)


            //Already a member of the group
            alreadyMember(members, PracticegroupButton)

            //Leave group
            leaveGroup.addEventListener("click", () => {

                leaveTheGroup(title)

            });
    });
});

const NewChatsCountArray = []

function hidePracticegroupBuilderForLessThenTenLikes(){
    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam

            db.collectionGroup("Inspiration").where("Reciever", "==", auth).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const likeCount = doc1.data().Reciever

                    NewChatsCountArray.push(likeCount)
                        });
                    }).then(() => {
    
                        const practiceGroupButton = document.getElementById("create-practicegroup-button")
                        const minimumLikesNotice = document.getElementById("minimum-likes-notice")
    
                            if(NewChatsCountArray.length < 10 ){

                                practiceGroupButton.style.display = "none"
                                minimumLikesNotice.style.display = "block"
                            };
                });
            });
        };
    });
}; 
hidePracticegroupBuilderForLessThenTenLikes()


// New member
function saveNewMemberToGroup(a){

    const groupButton = document.getElementById("group-button")
    const groupButtonDiv = document.getElementById("group-button-div")

    groupButton.innerText = "Laden..."

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam

    db.collection("Chats").where("Room", "==", a ).get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

            const type = doc1.data().Type
            const groupName = doc1.data().RoomClean
            const coach = doc1.data().Creater

           db.collection("Vitaminders").where("Gebruikersnaam", "==", coach).get().then(querySnapshot => {
               querySnapshot.forEach(doc => {
              
                      const coachNameClean = doc.data().GebruikersnaamClean;

            groupButton.setAttribute("data-groupname", groupName)
            groupButton.setAttribute("data-coachname", coachNameClean)

                });
            });

            db.collection("Chats").doc(doc1.id).update({
                Members: firebase.firestore.FieldValue.arrayUnion(auth)
                        }).then(() => {
                            if(type === "Coachgroup"){
                                window.open("coachgroup-agreement.html", "_self") 
                            } else {
                            window.open("../Group/" + title + ".html", "_self") 
                            };
                        });
                    });
                });
            });
        } else {
           noticeVisitor(groupButtonDiv, groupButton)
        }
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

 // Already a member notice

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

// Leave group
function leaveTheGroup(roomTitle){
    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

            const auth = doc.data().Gebruikersnaam

            db.collection("Chats").where("Room", "==", roomTitle ).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
        
                db.collection("Chats").doc(doc.id).update({
                    Members: firebase.firestore.FieldValue.arrayRemove(auth)
                            });
                        });
                    });
            });
        };
    });
};

// Coachgroup payment agreement title and welkom message
function coachgroupAgreementTitle(welkomMessage){
const title = document.getElementById("coachgroup-member-agreement-title")
const goalAndAmountExercises = document.getElementById("goal-coachgroup")

if (title != null){

auth.onAuthStateChanged(User =>{
    if(User){
    const userRef = db.collection("Vitaminders").doc(User.uid);
    userRef.get().then(function(doc) {

        const auth = doc.data().GebruikersnaamClean

title.innerText = `Welkom bij mijn coachgroep, ${auth}`
goalAndAmountExercises.innerText = welkomMessage

                });
            };
        });
    };
};

// Coachgroup payment agreement questions
function coachGroupAgreementQuestions(imageSource, coachNameClean, coachName){

    const DOM = document.getElementById("questions-coachgroup-agreement")

    if (DOM != null){

    const imgAndNameDiv = document.createElement("div")
        imgAndNameDiv.setAttribute("id", "img-name-div-coachgroup-agreement-questions")
    const img = document.createElement("img")
    const name = document.createElement("p")

    img.src = imageSource
    name.innerText = coachNameClean

    DOM.appendChild(imgAndNameDiv)
    imgAndNameDiv.appendChild(img)
    imgAndNameDiv.appendChild(name)

    imgAndNameDiv.addEventListener("click", () => {
        window.open("../Vitaminders/" + coachName + ".html", "_self");
        });
    };
};

function visitCoachgroupAgreement(coachGroupButton){

    const button = document.getElementById("visitCoachgroup")

    if (button != null){

    button.addEventListener("click", () => {
        window.open(`../Group/${coachGroupButton}.html`, "_self");
        });
    };
};
