// Naam uit URL halen
const naamhtml = location.pathname.replace(/^.*[\\\/]/, '')
const naam1 = naamhtml.replace('.html', '')
const naam2 = naam1.replace('%20',' ')
const naam3 = naam2.replace('%20',' ')
const naam4 = naam3.replace('%20',' ')
const naam5 = naam4.replace('%20',' ')
const naam6 = naam5.replace('%20',' ')
const naam7 = naam6.replace('%20',' ')
const naam8 = naam7.replace('%20',' ')
const naam9 = naam8.replace('%20',' ')
const naam10 = naam9.replace('%20',' ')
const naam11 = naam10.replace('%20',' ')
const naam = naam11.replace('%20',' ')

// Title 
db.collection('Vitaminders').where('Gebruikersnaam', '==', naam )
    .get()
    .then(querySnapshot => {
    querySnapshot.forEach(doc => {

    const user1 = doc.data().GebruikersnaamClean

    const chatTitle = document.getElementById("chat-title")

    chatTitle.innerText = `Gesprek met ${user1}`

    });
});

// Save message to database

const DOMchatScreenChat = document.getElementById("chat-screen")
    
function saveMessage(){
    const message = document.getElementById("chat-input").value 

    auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
    
                const auth = doc.data().Gebruikersnaam

    const roomName = auth<naam ? auth+'_'+naam : naam+'_'+auth;

db.collection("Chats").where("Room", "==", roomName).get().then(querySnapshot => {
    querySnapshot.forEach(doc => {


    db.collection("Chats").doc(doc.id).collection("Messages").doc().set({
        Auth: auth,
        Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        Message: message,
        Read: [], 
        Room: roomName,
        Status: "New"
        }).then(() => {
            db.collection("Chats").doc(doc.id).update({
                Messages: firebase.firestore.FieldValue.increment(1)
                            }).then (() => {
                                const input = document.getElementById("chat-input")

                                input.value = ""
                            })
                        });  
                    });
                });
            });
        };
    });
};
    const send = document.getElementById("send-icon")

if(send != null){

send.addEventListener("click", saveMessage, false)
};

// Get chat from database in realtime

        // functions
function emptyScreenByOnsnapshot(){
    const chatDivsUser = document.getElementsByClassName("auth-message-p")

    const chatDivsArrayUser = Array.from(chatDivsUser)

    chatDivsArrayUser.forEach(chatUser => {
        DOMchatScreenChat.removeChild(chatUser)
    });
};

    // Database query
auth.onAuthStateChanged(User =>{
    if(User){
      const userRef = db.collection("Vitaminders").doc(User.uid);
      userRef.get().then(function(doc) {

            const auth = doc.data().Gebruikersnaam

            const roomName = auth<naam ? auth+'_'+naam : naam+'_'+auth;

            db.collectionGroup("Messages")
            .where("Room", "==", roomName)
            .orderBy("Timestamp", "asc")
            .onSnapshot(querySnapshot => {

                // Empty screen
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
                    DOMchatScreenChat.appendChild(messageP)
                    
            });
        });
      });
    };
});

// Get chats and groups of auth

        // Chat functions
function getProfilePicOfChat(pic, picDOMobject){
    if(pic == undefined){
        picDOMobject.src = "images/dummy-profile-photo.jpeg"
    } else {
    picDOMobject.src = pic
    };
};

function setInnerTextOfDOMobjects(chat, grouptype, user, typeOfGroup){
    chat.innerText = user
    grouptype.innerText = typeOfGroup
  };

function openChatIfNoNewMessages(userName){
    const docRef = db.collection("Chats")

    docRef.get()
    .then(querySnapshot => {
    querySnapshot.forEach(doc2 => {

        const type = doc2.data().Type

            docRef.where("Messages", "==", 0)
            .get().then(doc8 => {

                window.alert("test")

                if(type === "Chat"){
                    window.open(`../Chats/${userName}.html`, "_self");
                } else if (type === "Group" || type === "Practicegroup" || type === "Coachgroup"){
                    window.open(`../Group/${titleURL}.html`, "_self");
                };
            });
        });
    });
};

function updateOnlineStatus(docID, authName){
    db.collection("Chats")
    .doc(docID)
    .update({
        Online: firebase.firestore.FieldValue.arrayUnion(authName)
    });
};

function saveAuthToReadlist(docID, authName, userName){
    const docRef = db.collection("Chats")
    .doc(docID)
    .collection("Messages")
    .where("Messages", ">", 0)

    docRef.get()
    .then(querySnapshot => {
    querySnapshot.forEach(doc2 => {

        const status = doc2.data().Status

        if(status === "New"){

            docRef.doc(doc2.id).update({

            Read: firebase.firestore.FieldValue.arrayUnion(authName)

                 }).then(() => {
                    window.open(`../Chats/${userName}.html`, "_self");
                });
            } else {
                window.open(`../Chats/${userName}.html`, "_self");
            };
        });
    });
}; 

function updateNewStatusOfMessage(docID, authName){
        db.collection("Chats").doc(docID)
        .collection("Messages")
        .where("Read", "array-contains", authName)
        .where("Status", "==", "New")
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc2 => {

            const docRef = db.collection("Chats").doc(docID)
        .collection("Messages").doc(doc2.id)

        docRef.get().then(doc5 => {

                const readList = doc5.data().Read
                const sender = doc5.data().Auth

                if(sender != authName){
                    if(readList.includes(authName)){
                        docRef.update({
                            Status: "Read"
                        });
                    };
                };
            });
        });
    });
};

function updateOnlineStatusFromPagesLeave(authName){

    const pageLeaves = localStorage.getItem("leftPages")

    db.collection("Chats")
    .where("Members", "array-contains", authName)
    .where("Room", "==", pageLeaves)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc10 => {

    db.collection("Chats").doc(doc10.id).update({
        Online: firebase.firestore.FieldValue.arrayRemove(auth)

            });
        });
    });
};

function updateReadStatusBasedOnOnline(onlineArray, authName, docID){
    if(onlineArray.includes(authName)){
       const docRefOnline = db.collection("Chats").doc(docID)
       docRefOnline.collection("Messages").where("Status", "==", "New")
       .get().then(querySnapshot => {
           querySnapshot.forEach(
        doc11 => {

        docRefOnline.collection("Messages").doc(doc11.id).update({
            Read: firebase.firestore.FieldValue.arrayUnion(authName)
                });
            });
        });
    };
};

function newMessageInAuthMenu(docID, authName, chatsDivDOM, newMessage){

    db.collection("Chats").doc(docID)
    .collection("Messages")
    .where("Members", "array-contains", authName)
    .where("Status", "==", "New")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc2 => {

            const authSender = doc2.data().Auth
            const docLengt = [doc2]          
            objectLength = Object.keys(docLengt).length

            console.log(objectLength)

            if(authSender != authName){

            const newMessagesDiv = document.createElement("div")
                newMessagesDiv.setAttribute("class", "new-message-div")
           
            newMessage.innerText = objectLength

    chatsDivDOM.appendChild(newMessagesDiv)
    newMessagesDiv.appendChild(newMessage)
            };
        });
    });
};

function groupsOverviewTitle(groupType, titleURL, titleURLClean, chatDOM, photoDOM, groupDOM){
    if(groupType === "Group"){
    chatDOM.innerText = titleURL
    photoDOM.src = "images/groups-icon.jpg"
    groupDOM.innerText = "Themagroep"
    } else if (groupType === "Practicegroup"){
        chatDOM.innerText = titleURLClean
        photoDOM.src = "images/practicegroup-icon.png"
        groupDOM.innerText = "Oefengroep"
    } else if ( groupType === "Coachgroup"){
        chatDOM.innerText = titleURLClean
        photoDOM.src = "images/coachgroup-icon.png"
        groupDOM.innerText = "Coachgroep"
    }; 
}; 

function updateReadList(docID, authName, titleURL){
    db.collection("Chats")
    .doc(docID)
    .collection("Messages")
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc6 => {

            const status = doc6.data().Status

            if(status === "New"){

        const docRef = db.collection("Chats").doc(docID)
    .collection("Messages").doc(doc6.id)
    
    docRef.get().then(doc7 => {

        const authSender = doc7.data().Auth

        if(authSender != authName){

        docRef.update({

        Read: firebase.firestore.FieldValue.arrayUnion(authName)

        })
        .then(() => {

            window.open(`../Group/${titleURL}.html`, "_self");
        });
    } else {
        window.open(`../Group/${titleURL}.html`, "_self");
    };   
        });
    } else {
        window.open(`../Group/${titleURL}.html`, "_self");
    };
        });
    });
}; 


        // Database query
const DOMchats = document.getElementById("overview-chats")

auth.onAuthStateChanged(User =>{
    if(User){
      const userRef = db.collection("Vitaminders").doc(User.uid);
      userRef.get().then(function(doc) {

        const auth = doc.data().Gebruikersnaam

db.collection("Chats").where("Eigenaar", "==", "Vitaminds").where("Members", "array-contains", auth).get().then(querySnapshot => {
    querySnapshot.forEach(doc1 => {

        const type = doc1.data().Type
        const title = doc1.data().Room
        const titleClean = doc1.data().RoomClean
        const members = doc1.data().Members
        const creator = doc1.data().Creater
        const online = doc1.data().Online

        const chatsDiv = document.createElement("div")
            chatsDiv.setAttribute("class", "chats-div")
        const chatsP = document.createElement("p")
        const photoDiv = document.createElement("div")
            photoDiv.setAttribute("class", "photo-div")
        const photoImg = document.createElement("img")
        const groupType = document.createElement("p")
            groupType.setAttribute("class", "grouptype-description")

        // CHATS
        if(type === "Chat"){

        const userArray = title.split("_")

        if(userArray.includes(auth)){

        userArray.forEach(user => {

                if(auth != user){        

                    db.collection("Vitaminders").where("Gebruikersnaam", "==", user).get().then(querySnapshot => {
                        querySnapshot.forEach(doc4 => { 

                            const userClean = doc4.data().GebruikersnaamClean
                            const photo = doc4.data().Profielfoto

                    setInnerTextOfDOMobjects(chatsP,groupType,  userClean, type);
                        
                    getProfilePicOfChat(photo, photoImg);

                    // Open chat
                    chatsDiv.addEventListener("click", () => {

                         openChatIfNoNewMessages(title)

                         updateOnlineStatus(doc1.id, auth)
                            
                         saveAuthToReadlist(doc1.id, auth, user)
                    });
            
                    // Update status of message
                    updateNewStatusOfMessage(doc1.id, auth)

                    // Update online/offline when user leaves page
                    updateOnlineStatusFromPagesLeave(auth);

                    // Update status of message based on online/offline in room
                    updateReadStatusBasedOnOnline(online, auth, doc1.id)
        
                    DOMchats.appendChild(chatsDiv)
                    chatsDiv.appendChild(photoDiv)
                    photoDiv.appendChild(photoImg)
                    photoDiv.appendChild(groupType)
                    chatsDiv.appendChild(chatsP)

                    // New messages
                    const newMessagesP = document.createElement("p")

                     newMessageInAuthMenu(doc1.id, auth, chatsDiv, newMessagesP)
                                    });
                                });
                            };    
                        });
                    };

                // GROUPS
                } else if(type === "Group" || type === "Practicegroup" || type === "Coachgroup"){
                
                  if (members.includes(auth)){
                
                    groupsOverviewTitle(type, title, titleClean, chatsP, photoImg, groupType)  
                                    
                    // Open group
                    chatsDiv.addEventListener("click", () => {

                        openChatIfNoNewMessages(title)

                        updateOnlineStatus(doc1.id, auth)
                    
                        updateReadList(doc1.id, auth, title)

                    });

                    // Update new status of message if all members have read the message
                    
                    updateNewStatusOfMessage(doc1.id, auth)

                    // Update status of message based on online/offline in room
                    updateOnlineStatusFromPagesLeave(auth)

                    // Update status of message based on online/offline in room
                    updateReadStatusBasedOnOnline(online, auth, doc1.id)

                DOMchats.appendChild(chatsDiv)
                chatsDiv.appendChild(photoDiv)
                photoDiv.appendChild(photoImg)
                photoDiv.appendChild(groupType)
                chatsDiv.appendChild(chatsP)

                    // New messages
                    const newMessagesPGroups = document.createElement("p")
                    newMessageInAuthMenu(doc1.id, auth, chatsDiv) 
                    };                
                };
            });
        });
      });
    };
});


function addLearning(){

    const inspirationIcon = document.getElementById("inspiration-icon")
    const addLearningDiv = document.getElementById("add-learning-div")
    const selectGoals = document.getElementById("select-goals")
    const buttonAddLearning = document.getElementById("button-add-learning")
    const inputAddLearning = document.getElementById("input-learning")
    const addLearningH3 = document.getElementById("add-learning-h3")
    const addLearningButtonDiv = document.getElementById("add-learning-button-div")

    inspirationIcon.addEventListener("click", () => {

        addLearningDiv.style.display = "flex"

    })

    // Load goals of auth in select

    auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {

            const auth = doc.data().Gebruikersnaam
    
            db.collectionGroup("Levensvragen").where("Gebruikersnaam", "==", auth)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const levensvraagClean = doc1.data().LevensvraagClean

                    const option = document.createElement("option")

                    option.innerText = levensvraagClean

                    selectGoals.appendChild(option)
                });
            }).then (() => {
            // If auth has no goals display notice
            const optionLenght = Array.from(selectGoals.options)

            console.log(optionLenght.length)

            if(optionLenght.length == 0){

                selectGoals.style.display = "none"
                inputAddLearning.style.display = "none"
                addLearningButtonDiv.style.display = "none"

                addLearningH3.innerText = "Maak een doel aan in je Digimind om een levensles op te kunnen slaan"
                addLearningH3.style.cursor = "pointer"
                addLearningH3.style.color = "#cf6e13"

                addLearningH3.addEventListener("click", () => {

                    auth.onAuthStateChanged(User =>{
                        if(User){
                          const userRef = db.collection("Vitaminders").doc(User.uid);
                          userRef.get().then(function(doc) {

                              const naamID = doc.data().Gebruikersnaam;

                              window.open("../Vitaminders/" + [naamID] + ".html", "_self");

                          });
                        };
                    });


                });

            };
        });
          });
        };
    });


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
        Type: "Chat-inzicht",
        Source: `Chat met ${naam}`,
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
}; addLearning()