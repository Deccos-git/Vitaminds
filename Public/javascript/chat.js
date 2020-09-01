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
        Status: "New", 
        Room: roomName
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


db.collection("Chats").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
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

                    chatsDiv.addEventListener("click", () => {
                        window.open(`../Chats/${user}.html`, "_self");
                    });

                    DOMchats.appendChild(chatsDiv)
                    chatsDiv.appendChild(photoDiv)
                    photoDiv.appendChild(photoImg)
                    photoDiv.appendChild(groupType)
                    chatsDiv.appendChild(chatsP)

                                    });
                                });
                            };    
                        });
                    };
                } else if(type === "Group" || type === "Practicegroup" || type === "Coachgroup"){
                
                  if (members.includes(auth)){
                
                                    const chatsDiv = document.createElement("div")
                                        chatsDiv.setAttribute("class", "chats-div")
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
                                    
                                    chatsDiv.addEventListener("click", () => {
                                        window.open(`../Group/${title}.html`, "_self");
                                    })
                
                                    DOMchats.appendChild(chatsDiv)
                                    chatsDiv.appendChild(photoDiv)
                                    photoDiv.appendChild(photoImg)
                                    photoDiv.appendChild(groupType)
                                    chatsDiv.appendChild(chatsP)
                                               
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