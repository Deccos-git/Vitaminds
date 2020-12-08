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

function groupMetaTags(descriptionGroup, titleGroup, bannerGroup){
    const keywords = document.getElementById("meta-keywords")
    const pageTitle = document.getElementById("page-title")
    const description = document.getElementById("meta-description")
    const facebookURL = document.getElementById("facebook-url")
    const facebookTitle = document.getElementById("facebook-title")
    const facebookDescription = document.getElementById("facebook-description")
    const facebookImage = document.getElementById("facebook-img")
    
    keywords.content = titleGroup
    description.content = descriptionGroup
    facebookURL.content = window.location.href
    facebookTitle.content = titleGroup
    pageTitle.innerText = titleGroup
    facebookDescription.content = descriptionGroup
    facebookImage.content = bannerGroup
    };
    
    db.collection("Coachgroups").where("Room", "==", titel)
    .get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const groupTitleClean = doc.data().RoomClean
        const groupTitle = doc.data().Room
        const descriptionCoachGroup = doc.data().Description
        const coverPhotoCoachgroup = doc.data().CoverPhoto

        const type = doc.data().Type

        groupMetaTags(descriptionCoachGroup, groupTitleClean, coverPhotoCoachgroup)
    });
});

// Overviewpage

db.collection("Coachgroups").where("Type", "==", "Coachgroup").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Room
        const titleClean = doc.data().RoomClean
        const auth = doc.data().Creater
        const description = doc.data().Description
        const numberParticipants = doc.data().NumberParticipants
        const coverPhoto = doc.data().CoverPhoto
        const costs = doc.data().Costs
        const members = doc.data().Members
        const type = doc.data().Type
        const duration = doc.data().GroupLength

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
        const dataP = document.createElement("p")
        const groupLenghtP = document.createElement("p")
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
        const leaveGroup = document.createElement("p")
            leaveGroup.setAttribute("class", "leave-group-button")

            groupCoverPhoto.src = coverPhoto
            groupTitleH2.innerText = titleClean

            openGroup(title, groupButton)

            hideLeaveGroupButtonIfAuthIsNotMember(members, leaveGroup)

            // openCoachGroupAfterAgreement(title)

            db.collection("Vitaminders").where("Gebruikersnaam", "==", auth)
            .get().then(querySnapshot => {
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

            numberParticipantsP.innerHTML = `<b>Aantal deelnemers:</b> ${numberParticipants}`
            memberCount.innerHTML = `<b>Aantal aanmeldingen:</b> ${members.length}`
            groupLenghtP.innerHTML = `<b>Duur van de coachgroep:</b> ${duration} maanden`
            costsP.innerHTML = `<b>Kosten:</b> ${costs} euro`
            leaveGroup.innerHTML = "Aanmelding annuleren"

            // Coachgroup agreement
            db.collection("Vitaminders").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const profilePic = doc1.data().Profielfoto
                    const coachNameClean = doc1.data().GebruikersnaamClean

                    coachGroupAgreementQuestions(profilePic, coachNameClean, auth)

                });
            });   

            if(DOM != null){

            DOM.appendChild(groupInnerDiv)
            groupInnerDiv.appendChild(groupHeader)
            groupHeader.appendChild(groupCoverPhoto)
            groupInnerDiv.appendChild(authDiv)
            groupInnerDiv.appendChild(bottomDiv)
            bottomDiv.appendChild(groupTitleH2)
            bottomDiv.appendChild(descriptionP)
            groupInnerDiv.appendChild(metaDiv)
            metaDiv.appendChild(dataP)
            metaDiv.appendChild(numberParticipantsP)
            metaDiv.appendChild(startNumberP)
            metaDiv.appendChild(memberCount)
            metaDiv.appendChild(groupLenghtP)
            metaDiv.appendChild(costsP)
            groupInnerDiv.appendChild(buttonDiv)
            buttonDiv.appendChild(groupButton)

            };

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

function hideLeaveGroupButtonIfAuthIsNotMember(membersOfGroup, leaveGroupButton){

    auth.onAuthStateChanged(User =>{
        if (User){
    db.collection("Vitaminders").doc(User.uid).get().then(doc => {

        const auth = doc.data().Gebruikersnaam

        if(membersOfGroup.includes(auth)){
            leaveGroupButton.style.display = "block"
        }

            });
        };
    });
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
            b.innerText = "Je bent aangemeld"
            b.setAttribute("onclick", "null()")

                };
            });
        };
    });
;}

// Leave group
function leaveTheGroup(roomTitle){
    const button = document.getElementById("group-button")
    const buttonThemeGroup = document.getElementById("button-theme-group")

    button.innerText = "Aanmelding is geannuleerd"

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

            const auth = doc.data().Gebruikersnaam

            db.collection("Coachgroups").where("Room", "==", roomTitle ).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
        
                db.collection("Coachgroups").doc(doc.id).update({
                    Members: firebase.firestore.FieldValue.arrayRemove(auth)
                            });
                        });
                    });
            });
        };
    });
};

function openGroup(roomName, buttonName){
    buttonName.innerHTML = `<a href="../group/${roomName}.html">Meer informatie</a>`

};

// Group landing

const groupLandingPageOuterDiv = document.getElementById("group-landing-page")
const groupLandingTitle = document.getElementById("group-landing-title")
const buttonGroupLanding = document.getElementById("button-group-landing")
const groupDescription = document.getElementById("group-description")
const groupFactsUl = document.getElementById("group-facts")
const bannerDiv = document.getElementById("banner-div")
const agreementModal = document.getElementById("coachgroup-agreement")

function groupLandingH1(roomNameClean){

    if(groupLandingTitle != null){

            groupLandingTitle.innerText = roomNameClean
    };
};

function groupLandingCreatorInformation(creatorCoach, typeGroup){
    const creatorDiv = document.getElementById("creator-information-div")

    const creatorName = document.createElement("h2")
    const creatorProfilePicture = document.createElement("img")

    if(creatorCoach != undefined){

    db.collection("Vitaminders").where("Gebruikersnaam", "==", creatorCoach)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const gebruikersnaamClean = doc.data().GebruikersnaamClean
            const profilePicture = doc.data().Profielfoto

            creatorName.innerText = gebruikersnaamClean
            creatorProfilePicture.src = profilePicture

            creatorDiv.addEventListener("click", () => {
                window.open("../Vitaminders/" + [creatorCoach] + ".html", "_self");
            })

            creatorDiv.appendChild(creatorName)
            creatorDiv.appendChild(creatorProfilePicture)
            });
        });
    };
};

function hideLandingIfAuthIsMember(membersArray, groupLandingPageOuterDiv){

    auth.onAuthStateChanged(User =>{
        if(User){
          const userRef = db.collection("Vitaminders").doc(User.uid);
          userRef.get().then(function(doc) {
    
                const auth = doc.data().Gebruikersnaam

                if(membersArray.includes(auth)){
                    groupLandingPageOuterDiv.style.display = "none"
                    agreementModal.style.display = "none"
                };
            });
        };
    });
}; 

function groupFactsLanding(memberCount, totalCosts, maximumMembersCount, groupType, durationTime){

    const numberOfMembersLi = document.createElement("li")
    const maximumMembers = document.createElement("li")
    const costs = document.createElement("li")
    const duration = document.createElement("li")

        numberOfMembersLi.innerHTML = `<b>Aantal aanmeldingen:</b> ${memberCount.length}`
        costs.innerHTML = `<b>Kosten:</b> ${totalCosts} euro`
        maximumMembers.innerHTML = `<b>Aantal deelnemers:</b> ${maximumMembersCount}`
        duration.innerHTML = `<b>Duur van coachgroep:</b> ${durationTime} maanden`

        groupFactsUl.appendChild(maximumMembers)
        if(groupFactsUl != null){
            groupFactsUl.appendChild(numberOfMembersLi)
            };
        groupFactsUl.appendChild(duration)
        groupFactsUl.appendChild(costs)
};

function groupDescriptionLanding(descriptionOfGroup){
    

    groupDescription.innerText = descriptionOfGroup
}

function groupLandingBanner(imagePhoto){

    const bannerImg = document.createElement("img")

    bannerImg.src = imagePhoto

    bannerDiv.appendChild(bannerImg)
}

function hideLandingModal(){
    const hideIcon = document.getElementById("hide-landing-modal")

    hideIcon.addEventListener("click", () => {
        window.open("../groups.html", "_self");
    });
};

!function fillLandingWithGroupData(){
    db.collection("Coachgroups").where("Room", "==", titel).get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

            const members = doc1.data().Members
            const roomClean = doc1.data().RoomClean
            const type1 = doc1.data().Type
            const creator = doc1.data().Creater
            const bannerImage = doc1.data().CoverPhoto
            const price = doc1.data().Costs
            const maxMembers = doc1.data().NumberParticipants
            const groupDescription = doc1.data().Description
            const duration = doc1.data().GroupLength

            groupLandingH1(roomClean)

            groupLandingCreatorInformation(creator, type1)

            groupFactsLanding(members, price, maxMembers, type1, duration)
    
            hideLandingIfAuthIsMember(members, groupLandingPageOuterDiv)
    
            groupDescriptionLanding(groupDescription)

            hideLandingModal()

            groupLandingBanner(bannerImage)

        });
    });
}();

// Coachgroup agreement

    const agreementButton = document.getElementById("visitCoachgroup")

function coachgroupAgreementTitle(){
    const title = document.getElementById("coachgroup-member-agreement-title")
    
    if (title != null){
    
    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().GebruikersnaamClean
    
    title.innerText = `Welkom bij mijn coachgroep, ${auth}`
    
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

function openCoachGroupAfterAgreement(titleRoom){

    if(visitCoachgroup != null){

        visitCoachgroup.addEventListener("click", () => {
        agreementModal.style.display = "none"
    })
    };
}

// Coachgroup individual page

    // Title

    const DOMtitle = document.getElementById("group-title")

    if(DOMtitle != null){

        db.collection("Coachgroups").where("Room", "==", titel).get().then(querySnapshot => {
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

db.collection("Coachgroups").where("Room", "==", roomName).get().then(querySnapshot => {
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
                        memberPhoto.src = "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
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
            addLearningDiv.scrollIntoView();
    
        });
    };
    
        // Load goals of auth in select
        db.collection("Coachgroup").where("Room", "==", titel).get().then(querySnapshot => {
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
            Type: "Coachgroup-inzicht",
            Source: titel,
            Levensvraag: levensvraagID,
            Status: "Approved"
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

    db.collection("Coachgroups").where("Room", "==", roomName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const members = doc.data().Members

        db.collection("Coachgroups").doc(doc.id).collection("Messages").doc().set({
            Auth: auth,
            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            Message: message,
            Room: roomName,
            Members: members,
            Read: [],
            Status: "New"
            }).then(() => {
                db.collection("Coachgroups").doc(doc.id).update({
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

        // Variables

        const senderNameArray = []

        //Functions
        function emptyScreenByOnsnapshot(){
            const chatDivsUser = document.getElementsByClassName("auth-message-p")
        
            const chatDivsArrayUser = Array.from(chatDivsUser)
        
            chatDivsArrayUser.forEach(chatUser => {
                DOMchatScreenChat.removeChild(chatUser)
            });
        };

        function messageOptions(message, chatMessage, chatRoom, authChatter){
            const options = document.createElement("p")
               options.setAttribute("class", "message-options")
            options.innerText = "..."
       
            const sendAsMail = document.createElement("p")
               sendAsMail.setAttribute("class", "send-chat-as-mail")
               sendAsMail.setAttribute("data-message", chatMessage)
               sendAsMail.setAttribute("data-room", chatRoom)
               sendAsMail.setAttribute("data-auth", authChatter)
               sendAsMail.setAttribute("onclick", "sendChatAsMail(this)")
            sendAsMail.innerText = "Verstuur bericht als email"
       
            message.appendChild(options)
            options.appendChild(sendAsMail)
       
            options.addEventListener("click", () => {
                   sendAsMail.style.display = "block" 
            });
       };
       
       function sendChatAsMail(elem){
           const message = elem.dataset.message
           const room = elem.dataset.room
           const coach = elem.dataset.auth
       
           console.log(coach)
       
           elem.innerText = "Verstuurd"
       
           db.collection("Vitaminders").where("GebruikersnaamClean", "==", coach)
               .get().then(querySnapshot => {
                   querySnapshot.forEach(doc2 => {
       
                       const SenderNameClean = doc2.data().GebruikersnaamClean
       
           db.collection("Coachgroups")
           .where("Room", "==", room).get()
           .then(querySnapshot => {
               querySnapshot.forEach(doc => {
       
                   const members = doc.data().Members
                   const type = doc.data().Type
                   const titelClean = doc.data().RoomClean
                   const titel = doc.data().Room
       
                   members.forEach(member => {

                       db.collection("Vitaminders").where("Gebruikersnaam", "==", member)
                       .get().then(querySnapshot => {
                           querySnapshot.forEach(doc2 => {
       
                               const email = doc2.data().Email
                               const naam = doc2.data().GebruikersnaamClean
       
                               console.log(email)
       
                               db.collection("Mail").doc().set({
                                   to: email,
                                   cc: "info@vitaminds.nu",
                           message: {
                           subject: `Je hebt een nieuw coachbericht ontvangen van ${SenderNameClean} in je Coachgroep ${titelClean}`,
                           html: `Hallo ${naam}, </br></br>
                                   ${SenderNameClean} heeft je een bericht gestuurd in de Coachgroep ${titelClean} : <br><br>
       
                                   ${message}<br><br>
                                   
                                   Ga naar je <a href="www.vitaminds.nu/Group/${titel}.html">Coachgroep</a> om op het bericht te reageren.<br><br>
                                   P.s. Om privacyredenen kun je coachgroep alleen bekijken als je bent ingelogd in Vitaminds.<br><br>
                           
                                   Vriendelijke groet, </br></br>
                                   Het Vitaminds Team </br></br>
                                   <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                           Gebruikersnaam: naam,
                           Emailadres: email,
                           Type: "New coachmessage in chat"
                           }        
                           });  
                       });
                   });
                   
                   });
               });
           });
       });
    });
};

// Load massages in realtime
    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

                const auth = doc.data().Gebruikersnaam

                const roomName = titel

                db.collection("Coachgroups")
                .where("Room", "==", roomName)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc3 => {

                        const admin = doc3.data().Creater

                        console.log(admin)

                db.collectionGroup("Messages")
                .where("Room", "==", roomName)
                .orderBy("Timestamp", "asc")
                .onSnapshot(querySnapshot => {

                emptyScreenByOnsnapshot()
                    
                    querySnapshot.forEach(doc2 => {

                        const authMessage = doc2.data().Message
                        const sender = doc2.data().Auth
                        const members = doc2.data().Members

                        const messageP = document.createElement("p")
                        messageP.setAttribute("class", "auth-message-p")
    
                        const senderName = document.createElement("p")
                        senderName.setAttribute("class", "sender-name-message")
    
                db.collection("Vitaminders").where("Gebruikersnaam", "==", sender).get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const messageNameClean = doc1.data().GebruikersnaamClean
                        const colour = doc1.data().Color
                    
                        if (auth == sender){
    
                            senderName.innerText = messageNameClean
    
                            messageP.innerText = authMessage
    
                            messageP.style.alignSelf = "flex-end"
                            senderName.style.color = colour
                            senderName.style.fontWeight = "bold"
                            senderName.style.alignSelf = "flex-end"

                            console.log(admin)

                            if(admin.includes(sender)){

                            messageOptions(messageP, authMessage, roomName, messageNameClean)
                            };
    
                        } else {
    
                            senderName.innerText = messageNameClean
    
                            messageP.innerText = authMessage
    
                            messageP.style.alignSelf = "flex-start"
                            senderName.style.fontWeight = "bold"
                            senderName.style.alignSelf = "flex-start"
                            senderName.style.color = colour
                            
                            };
    
                            messageP.appendChild(senderName)

                        });
                    });

                    DOMchatScreen.appendChild(messageP)
                });
            });
        });
    });
        });
    };
});

// Chats and groups overview AND notifications

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

function updateOnlineStatus(docID, authName){
    db.collection("Coachgroups")
    .doc(docID)
    .update({
        Online: firebase.firestore.FieldValue.arrayUnion(authName)
    });
};

function updateReadList(docID, authName, titleURL){
    const chatRef = db.collection("Coachgroups")
    .doc(docID)

    chatRef.get().then(doc2 => {

        const messages = doc2.data().Messages

        if (messages != 0){

    chatRef.collection("Messages")
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc6 => {

            const status = doc6.data().Status
            const messages = doc6.data().Messages

            if(status === "New"){

        const messageRef = chatRef
    .collection("Messages").doc(doc6.id)
    
    messageRef.get().then(doc7 => {

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
        } else {
            window.open(`../Group/${titleURL}.html`, "_self");
        }
    });
}; 

function updateNewStatusOfMessageGroup(authName){
    db.collection("Coachgroups")
    .where("Members", "array-contains", authName)
    .get().then(querySnapshot => {
     querySnapshot.forEach(doc2 => {

     const docRef = db.collection("Coachgroups").doc(doc2.id).collection("Messages")
     docRef.where("Status", "==", "New")
     .get().then(querySnapshot => {
         querySnapshot.forEach(doc3 => {

             const members = doc3.data().Members
             const readlist = doc3.data().Read

             const readList = doc3.data().Read

             if(readList.includes(authName)){

                 if(members.lenght === readlist.lenght){
                     docRef.doc(doc3.id).update({
                         Status: "Read"
                         });
                     };
                    };
                 });
             });
     });
 });
};

function updateOnlineStatusFromPagesLeaveGroup(authName){

    const pageLeaves = localStorage.getItem("leftPages")

    db.collection("Coachgroups")
    .where("Members", "array-contains", authName)
    .where("Room", "==", pageLeaves)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc10 => {

    db.collection("Coachgroups").doc(doc10.id).update({
        Online: firebase.firestore.FieldValue.arrayRemove(authName)

            });
        });
    });
};

function updateReadStatusBasedOnOnline(onlineArray, authName, docID){
    if(onlineArray.includes(authName)){
       const docRefOnline = db.collection("Coachgroups").doc(docID)
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

function newMessageInOverview(docID, authName, chatsDivDOM, newMessage){

    const docRef = db.collection("Coachgroups").doc(docID) 

    const newMessageCount = []

    docRef.get().then(doc => {

        const type = doc.data().Type

    docRef.collection("Messages")
    .where("Status", "==", "New")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc2 => {

            const room = doc2.data().Room

            const authSender = doc2.data().Auth        
            newMessageCount.push(doc2)
           
            newMessage.innerText = newMessageCount.length

        })
    }).then(() => {
        if(newMessageCount.length != 0){
        chatsDivDOM.appendChild(newMessage)
        };
    })
});
};


        // Database query
const DOMchats = document.getElementById("overview-chats")

if (DOMchats != null){

auth.onAuthStateChanged(User =>{
    if(User){
      const userRef = db.collection("Vitaminders").doc(User.uid);
      userRef.get().then(function(doc) {

        const auth = doc.data().Gebruikersnaam

db.collection("Coachgroups").where("Eigenaar", "==", "Vitaminds").where("Members", "array-contains", auth).get().then(querySnapshot => {
    querySnapshot.forEach(doc1 => {

        const type = doc1.data().Type
        const title = doc1.data().Room
        const titleClean = doc1.data().RoomClean
        const members = doc1.data().Members
        const creator = doc1.data().Creater
        const online = doc1.data().Online
        const messages = doc1.data().Messages

        const chatsDiv = document.createElement("div")
            chatsDiv.setAttribute("class", "chats-div")
        const chatsP = document.createElement("p")
        const photoDiv = document.createElement("div")
            photoDiv.setAttribute("class", "photo-div")
        const photoImg = document.createElement("img")
        const groupType = document.createElement("p")
            groupType.setAttribute("class", "grouptype-description")
                
                  if (members.includes(auth)){
                
                    groupsOverviewTitle(type, title, titleClean, chatsP, photoImg, groupType)  
                                    
                    // Open group
                    chatsDiv.addEventListener("click", () => {

                        updateOnlineStatus(doc1.id, auth)
                    
                        updateReadList(doc1.id, auth, title)

                    });

                    // Update new status of message if all members have read the message
                    
                    updateNewStatusOfMessageGroup(auth)

                    // Update status of message based on online/offline in room
                    updateOnlineStatusFromPagesLeaveGroup(auth)

                    // Update status of message based on online/offline in room
                    updateReadStatusBasedOnOnline(online, auth, doc1.id)

                DOMchats.appendChild(chatsDiv)
                chatsDiv.appendChild(photoDiv)
                photoDiv.appendChild(photoImg)
                photoDiv.appendChild(groupType)
                chatsDiv.appendChild(chatsP)

                    // New messages
                    const newMessagesPGroups = document.createElement("p")
                        newMessagesPGroups.setAttribute("class", "new-message-count-chats")
                        
                    newMessageInOverview(doc1.id, auth, chatsDiv, newMessagesPGroups) 
                    };                
            });
        });
      });
    };
});
};

// Coachgroup builder
function startCoachgroupBuilder(){
    window.open("coachgroup-builder.html", "_self");
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
    const groupLength = document.getElementById("coachgroup-length").value

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
        GroupLength: groupLength,
        Members: firebase.firestore.FieldValue.arrayUnion(auth),
        Goal: option,
        Online: [],
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



