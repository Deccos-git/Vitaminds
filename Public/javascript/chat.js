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


const DOMchatScreen = document.getElementById("chat-screen")

// Save message to database
    
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

auth.onAuthStateChanged(User =>{
    if(User){
      const userRef = db.collection("Vitaminders").doc(User.uid);
      userRef.get().then(function(doc) {

            const auth = doc.data().Gebruikersnaam

            const roomName = auth<naam ? auth+'_'+naam : naam+'_'+auth;

            db.collectionGroup("Messages").where("Room", "==", roomName).orderBy("Timestamp", "asc").onSnapshot(querySnapshot => {

                // Empty screen
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

// Get chats and groups of auth
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

        // Chats

        if(type === "Chat"){

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
                    const groupType = document.createElement("p")
                            groupType.setAttribute("class", "grouptype-description")

                    chatsP.innerText = userClean
                    groupType.innerText = type
                    
                    if(photo == undefined){
                        photoImg.src = "images/dummy-profile-photo.jpeg"
                    } else {
                    photoImg.src = photo
                    };

                    // Open chat
                    chatsDiv.addEventListener("click", () => {
                        // Add auth to readlist
                        const chatsDocRef = db.collection("Chats").doc(doc1.id)

                        chatsDocRef.get().then(doc8 => {

                            const messagesCount = doc8.data().Messages

                            if(messagesCount === 0){
                                window.open(`../Chats/${user}.html`, "_self");
                            }
                        })
                            
                        chatsDocRef.collection("Messages")
                    .get().then(querySnapshot => {
                        querySnapshot.forEach(doc2 => {

                            const status = doc2.data().Status

                            if(status === "New"){

                        const docRef = db.collection("Chats").doc(doc1.id)
                    .collection("Messages").doc(doc2.id)

                        docRef.get().then(doc7 => {

                        const readList = doc7.data().Read
                    
                         docRef.update({

                        Read: firebase.firestore.FieldValue.arrayUnion(auth)

                                     }).then(() => {

                                        window.open(`../Chats/${user}.html`, "_self");
                                });
                               
                                });
                            } else {
                                window.open(`../Chats/${user}.html`, "_self");
                            }
                            })
                    });
                });

                    // Update status of message
                    db.collection("Chats").doc(doc1.id)
                    .collection("Messages")
                    .where("Status", "==", "New")
                    .get().then(querySnapshot => {
                        querySnapshot.forEach(doc2 => {

                        const docRef = db.collection("Chats").doc(doc1.id)
                    .collection("Messages").doc(doc2.id)

                    docRef.get().then(doc5 => {

                            const readList = doc5.data().Read

                            if(readList.includes(auth)){
                                docRef.update({
                                    Status: "Read"
                                });
                            };
                    });
                });
            });

                    DOMchats.appendChild(chatsDiv)
                    chatsDiv.appendChild(photoDiv)
                    photoDiv.appendChild(photoImg)
                    photoDiv.appendChild(groupType)
                    chatsDiv.appendChild(chatsP)

                    // New messages
                    const newMessagesP = document.createElement("p")

                    db.collection("Chats").doc(doc1.id)
                    .collection("Messages")
                    .where("Status", "==", "New")
                    .get().then(querySnapshot => {
                        querySnapshot.forEach(doc2 => {

                            const authSender = doc2.data().Auth
                            const docLengt = [doc2]          
                            objectLength = Object.keys(docLengt).length

                            if(authSender != auth){

                            const newMessagesDiv = document.createElement("div")
                                newMessagesDiv.setAttribute("class", "new-message-div")
                           
                            newMessagesP.innerText = objectLength

                    chatsDiv.appendChild(newMessagesDiv)
                    newMessagesDiv.appendChild(newMessagesP)
                                                };
                                            });
                                        });
                                    });
                                });
                            };    
                        });
                    };
                } else if(type === "Group" || type === "Practicegroup" || type === "Coachgroup"){
                
                  if (members.includes(auth)){
                
                                    const chatsDiv = document.createElement("div")
                                        chatsDiv.setAttribute("class", "chats-div")
                                        chatsDiv.setAttribute("data-room", title)
                                    const chatsP = document.createElement("p")
                                    const photoDiv = document.createElement("div")
                                        photoDiv.setAttribute("class", "photo-div")
                                    const photoImg = document.createElement("img")
                                    const groupType = document.createElement("p")
                                        groupType.setAttribute("class", "grouptype-description")
                
                                    if(type === "Group"){
                                    chatsP.innerText = title
                                    photoImg.src = "images/groups-icon.jpg"
                                    groupType.innerText = "Themagroep"
                                    } else if (type === "Practicegroup"){
                                        chatsP.innerText = titleClean
                                        photoImg.src = "images/practicegroup-icon.png"
                                        groupType.innerText = "Oefengroep"
                                    } else if ( type === "Coachgroup"){
                                        chatsP.innerText = titleClean
                                        photoImg.src = "images/coachgroup-icon.png"
                                        groupType.innerText = "Coachgroep"
                                    };     
                                    
                                    // Open group
                                    chatsDiv.addEventListener("click", () => {
                                    const chatsDocRef = db.collection("Chats").doc(doc1.id)

                                    chatsDocRef.get().then(doc8 => {

                                        const messagesCount = doc8.data().Messages

                                        if(messagesCount === 0){
                                            console.log("test1")
                                            window.open(`../Group/${title}.html`, "_self");
                                        };
                                    });

                                    chatsDocRef.update({
                                        Online: firebase.firestore.FieldValue.arrayUnion(auth)
                                    });
                                        
                                    chatsDocRef.collection("Messages")
                                        .get().then(querySnapshot => {
                                            querySnapshot.forEach(doc6 => {

                                                const status = doc6.data().Status

                                                if(status === "New"){
                    
                                            const docRef = db.collection("Chats").doc(doc1.id)
                                        .collection("Messages").doc(doc6.id)
                                        
                                        docRef.get().then(doc7 => {

                                            const authSender = doc7.data().Auth

                                            if(authSender != auth){

                                                console.log("test2")
                                            docRef.update({
                    
                                            Read: firebase.firestore.FieldValue.arrayUnion(auth)
                    
                                                         })
                                                         .then(() => {
                    
                                                            window.open(`../Group/${title}.html`, "_self");
                                                    });
                                                };
                                                   
                                                    });
                                                } else {
                                                    console.log("test3")
                                                    window.open(`../Group/${title}.html`, "_self");
                                                }
                                                    });
                                                });
                                    });

                                     // Update new status of message
                                     
                            docRefUpdate = db.collection("Chats").doc(doc1.id)
                    
                            docRefUpdate.collection("Messages")
                            .where("Status", "==", "New")
                            .get().then(querySnapshot => {
                                querySnapshot.forEach(doc2 => {

                                const docRef = db.collection("Chats").doc(doc1.id)
                            .collection("Messages").doc(doc2.id)

                            docRef.get().then(doc5 => {

                            const readList = doc5.data().Read
                            const members = doc5.data().Members

                            if(members.length - 1 === readList.length){
                                docRef.update({
                                    Status: "Read"
                                });
                            };
                        });
                    });
                });

                                    DOMchats.appendChild(chatsDiv)
                                    chatsDiv.appendChild(photoDiv)
                                    photoDiv.appendChild(photoImg)
                                    photoDiv.appendChild(groupType)
                                    chatsDiv.appendChild(chatsP)

                                     // New messages
                                     const newMessagesPGroups = document.createElement("p")

                    db.collection("Chats").doc(doc1.id)
                    .collection("Messages")
                    .where("Status", "==", "New")
                    .get().then(querySnapshot => {
                        querySnapshot.forEach(doc3 => {

                            const authSender = doc3.data().Auth
                            const docLengt = [doc3]          
                            objectLength = Object.keys(docLengt).length
                            const readList = doc3.data().Read

                            if(!readList.includes(auth)){

                            const newMessagesDivGroups = document.createElement("div")
                                newMessagesDivGroups.setAttribute("class", "new-message-div")

                            newMessagesPGroups.innerText = objectLength
                
                                   
                                    chatsDiv.appendChild(newMessagesDivGroups)
                                    newMessagesDivGroups.appendChild(newMessagesPGroups)
                            };
                                });
                            });   
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