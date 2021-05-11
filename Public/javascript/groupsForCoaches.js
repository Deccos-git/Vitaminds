    function titleOfRoom(){
    const titelhtmlCGC = window.location.href.replace(/^.*[\\\/]/, '')
    const titel1CGC = titelhtmlCGC.replace('.html', '')
    const titel2CGC = titel1CGC.replace('%20',' ')
    const titel3CGC = titel2CGC.replace('%20',' ')
    const titel4CGC = titel3CGC.replace('%20',' ')
    const titel5CGC = titel4CGC.replace('%20',' ')
    const titel6CGC = titel5CGC.replace('%20',' ')
    const titel7CGC = titel6CGC.replace('%20',' ')
    const titel8CGC = titel7CGC.replace('%20',' ')
    const titel9CGC = titel8CGC.replace('%20',' ')
    const titel10CGC = titel9CGC.replace('%20',' ')
    const titel11CGC = titel10CGC.replace('%20',' ')
    const titel12CGC = titel11CGC.split("?fb")
    const titelCGC = titel12CGC[0]

    return titelCGC
    };
    
    function groupsForCoachesMetaTags(descriptionGroup, titleGroup, bannerGroup){
        const keywords = document.getElementById("meta-keywords")
        const pageTitle = document.getElementById("page-title")
        const description = document.getElementById("meta-description")
        const facebookURL = document.getElementById("facebook-url")
        const facebookTitle = document.getElementById("facebook-title")
        const facebookDescription = document.getElementById("facebook-description")
        const facebookImage = document.getElementById("facebook-img")

        if(pageTitle != null){
        
        keywords.content = titleGroup
        description.content = descriptionGroup
        facebookURL.content = window.location.href
        facebookTitle.content = titleGroup
        pageTitle.innerText = titleGroup
        facebookDescription.content = descriptionGroup
        facebookImage.content = bannerGroup
        };
    };

  // GroupsForCoaches in Chats&Groups
    
  function setNameOfGroup(groupsP, roomClean){
    groupsP.innerText = roomClean
  };

function setImageGroup(photoImg){
    photoImg.src = "/images/groups-icon.jpg"
};

function displayGroupsForCoachesTitleInChatsAndGroups(){

    const title = document.getElementById("overview-groups-for-coaches-title")

    title.innerText = "Groepen voor coaches"
};

function newMessageInOverviewGroupCoach(docID, groupsDivDOM, auth){

    const newMessageCount = []

    const newMessagesP = document.createElement("p")
    newMessagesP.setAttribute("class", "new-message-count-chats")

    db.collection("GroupsForCoaches").doc(docID) 
    .collection("Messages")
    .where("Status", "==", "New")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const read = doc.data().Read

            if(!read.includes(auth)){
       
            newMessageCount.push(doc)

            };
           
            newMessagesP.innerText = newMessageCount.length

        })
    }).then(() => {

            groupsDivDOM.appendChild(newMessagesP)

            if(newMessageCount.length === 0){
                newMessagesP.style.display = "none"
            }

    });
};

// !function updateMessagesWithMembers(){

//     db.collection("GroupsForCoaches")
//     .where("Type", "==", "GroupsForCoaches")
//     .get().then(querySnapshot => {
//         querySnapshot.forEach(doc => {

//             const room = doc.data().Room
//             const members = doc.data().Members

//             db.collectionGroup("Messages")
//             .where("Room", "==", room)
//             .get().then(querySnapshot => {
//                 querySnapshot.forEach(doc1 => {

//                     db.collection("GroupsForCoaches")
//                     .doc(doc.id)
//                     .collection("Messages")
//                     .doc(doc1.id)
//                     .update({
//                         Members: members
//                     });
//                 });
//             });
//         });
//     });
// }();

function updateReadListGroup(docID, authName, titleURL, messages){

    const arrayOfID = []

    if(messages != 0){
        db.collection("GroupsForCoaches")
        .doc(docID)
        .collection("Messages")
        .where("Members", "array-contains", authName)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                const read = doc1.data().Read
                const id = doc1.data().ID

                console.log(id)

                arrayOfID.push(id)

                if(!read.includes(authName)){
                    db.collection("GroupsForCoaches")
                    .doc(docID)
                    .collection("Messages")
                    .doc(doc1.id)
                    .update({
                        Read: firebase.firestore.FieldValue.arrayUnion(authName)
                    })
                    .then(() => {
                        localStorage.setItem("IDs", arrayOfID)
                    })
                    .then(() => {
                        console.log("Readlist geupdate met auth")
                        window.open(`../groups-coaches/${titleURL}.html`, "_self");
                    });
                } else {
                    console.log("Auth is already on readlist")
                    setTimeout(() => {
                        window.open(`../groups-coaches/${titleURL}.html`, "_self");
                     }, 1000);
                };
            });
        });
    }else{
        console.log("Geen berichten uberhaubt")
        window.open(`../groups-coaches/${titleURL}.html`, "_self");
    };
};

function openGroupForCoaches(groupsDiv, docID, authName, titleURL, messages){

    groupsDiv.addEventListener("click", () => {
                                        
        updateReadListGroup(docID, authName, titleURL, messages)
    });
};

!function dataBaseQueryGroupsCoaches(){
const DOMgroups = document.getElementById("overview-groups-for-coaches")

if (DOMgroups != null){

auth.onAuthStateChanged(User =>{
    if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

        const auth = doc.data().Gebruikersnaam

            db.collection("GroupsForCoaches")
            .where("Members", "array-contains", auth)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    const roomClean = doc.data().RoomClean
                    const room = doc.data().Room
                    const messages = doc.data().Messages

                    const groupsDiv = document.createElement("div")
                        groupsDiv.setAttribute("class", "groups-div")
                    const groupsP = document.createElement("p")
                    const photoDiv = document.createElement("div")
                        photoDiv.setAttribute("class", "photo-div")
                    const photoImg = document.createElement("img")
                    const groupType = document.createElement("p")
                        groupType.setAttribute("class", "grouptype-description")    

                                newMessageInOverviewGroupCoach(doc.id, groupsDiv, auth)
                                setNameOfGroup(groupsP, roomClean);
                                setImageGroup(photoImg)
                                displayGroupsForCoachesTitleInChatsAndGroups()
                                openGroupForCoaches(groupsDiv, doc.id, auth, room, messages)

                                DOMgroups.appendChild(groupsDiv)
                                groupsDiv.appendChild(photoDiv)
                                photoDiv.appendChild(photoImg)
                                photoDiv.appendChild(groupType)
                                groupsDiv.appendChild(groupsP)
            
                        });
                    });
                });
            };
        });
    };
}();
    
    // Overviewpage

    function showNumberOfParticipants(numberParticipantsP, numberParticipants){

        numberParticipantsP.innerHTML = `<b>Max. aantal deelnemers:</b><br> ${numberParticipants}`

        if(numberParticipants === undefined){
            numberParticipantsP.style.display = "none"
        };
    };

    function showDurationOfGroup(duration, groupLenghtP){
        if( duration === "Doorlopend"){
            groupLenghtP.innerHTML = `<b>Duur van coachgroep:</b> ${duration}` 
        } else if (duration != undefined){
            groupLenghtP.innerHTML = `<b>Duur van coachgroep:</b> ${duration} maanden`
        } else if (duration === undefined){
            groupLenghtP.style.display = "none"
        };
    };

    function vitamindsLivingRoomExceptions(title, memberCount, costsP, leaveGroup){
        if (title === "54qd48ydediVitaminds huiskamer"){
            memberCount.style.display = "none"
            costsP.style.display = "none"
            leaveGroup.style.display = "none"

            console.log(leaveGroup)
        };
    };

    function organizerInfo(authImg, authName, authDiv, auth){
        
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
                });
            });
        });
    };

    function showLeaveGroupForMember(members, auth, buttonDiv, leaveGroup){
        if(members.includes(auth)){
            buttonDiv.appendChild(leaveGroup)
            };
    };

    function leaveGroupForCoaches(leaveGroup, title){
        leaveGroup.addEventListener("click", () => {
    
            leaveTheGroup(title)
        });
    };
    
    db.collection("GroupsForCoaches")
    .where("Type", "==", "GroupsForCoaches")
    .get().then(querySnapshot => {
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
            const startdate = doc.data().StartDate
    
            const DOM = document.getElementById("groups-for-coaches")
    
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
            const startdateP = document.createElement("p")
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
            const noticePremiumCoaches = document.createElement("p")
                noticePremiumCoaches.setAttribute("class", "notice-premium-coaches")
    
                groupCoverPhoto.src = coverPhoto
                groupTitleH2.innerText = titleClean
    
                linkNoticePremiumCoaches(noticePremiumCoaches)
                openGroup(title, groupButton)
                showDurationOfGroup(duration, groupLenghtP)
                hideLeaveGroupButtonIfAuthIsNotMember(members, leaveGroup)
                showVisitGroupIfAuthIsMember(members, groupButton, title)
                showNumberOfParticipants(numberParticipantsP, numberParticipants)
                organizerInfo(authImg, authName, authDiv, auth)
                groupsForCoachesMetaTags(description, titleClean, coverPhoto)
                showLeaveGroupForMember(members, auth, buttonDiv, leaveGroup)
                vitamindsLivingRoomExceptions(title, memberCount, costsP, leaveGroup)
                groupIsFull(members.length, groupButton, numberParticipants)
                leaveGroupForCoaches(leaveGroup, title)
    
                memberCount.innerHTML = `<b>Aantal leden:</b><br> ${members.length}`
                costsP.innerHTML = `<b>Kosten:</b><br> Eenmalig €${costs}`
                leaveGroup.innerHTML = "Aanmelding annuleren"
    
                if(DOM != null){
    
                DOM.appendChild(groupInnerDiv)
                groupInnerDiv.appendChild(groupHeader)
                groupHeader.appendChild(groupCoverPhoto)
                groupInnerDiv.appendChild(authDiv)
                groupInnerDiv.appendChild(bottomDiv)
                bottomDiv.appendChild(groupTitleH2)
                bottomDiv.appendChild(descriptionP)
                groupInnerDiv.appendChild(metaDiv)
                metaDiv.appendChild(numberParticipantsP)
                metaDiv.appendChild(memberCount)
                metaDiv.appendChild(groupLenghtP)
                metaDiv.appendChild(startdateP)
                metaDiv.appendChild(costsP)
                metaDiv.appendChild(noticePremiumCoaches)
                groupInnerDiv.appendChild(buttonDiv)
                buttonDiv.appendChild(groupButton)
    
                };
        });
    });

    function linkNoticePremiumCoaches(notice){

        notice.addEventListener("click", () => {
            window.open("aanmelden-coach.html", "_self");
        });
    };

    
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
    
    function showVisitGroupIfAuthIsMember(membersOfGroup, button, title){
        auth.onAuthStateChanged(User =>{
            if (User){
        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
    
            const auth = doc.data().Gebruikersnaam
    
            if(membersOfGroup.includes(auth)){
                button.innerHTML = `<a class="visit-group" href='../groups-coaches/${title}.html'>Ga naar groep</a>`
            }
    
                });
            };
        });
    }
    
     // Group is full message
    
     function groupIsFull(a,b,c){
    
        if (a === c){
            b.innerText = "Groep is vol"
            b.setAttribute("onclick", "null()")
        }; 
     };
    
    // Leave group
    function leaveTheGroup(roomTitle){
        const button = document.getElementById("group-button")

        if(button != null){
        button.innerText = "Aanmelding is geannuleerd"
        };
    
        auth.onAuthStateChanged(User =>{
            if(User){
            const userRef = db.collection("Vitaminders")
            .doc(User.uid);
            userRef.get()
            .then(function(doc) {
    
                const auth = doc.data().Gebruikersnaam
    
                db.collection("GroupsForCoaches")
                .where("Room", "==", roomTitle )
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {
            
                    db.collection("GroupsForCoaches")
                    .doc(doc1.id)
                    .update({
                        Members: firebase.firestore.FieldValue.arrayRemove(auth)
                                });
                        
                                db.collection("GroupsForCoaches")
                                .doc(doc1.id)
                                .collection("Messages")
                                .where("Members", "array-contains", auth)
                                .get().then(querySnapshot => {
                                    querySnapshot.forEach(doc2 => {
    
                                        db.collection("GroupsForCoaches")
                                        .doc(doc.id)
                                        .collection("Messages")
                                        .doc(doc2.id)
                                        .update({
                                            Members:firebase.firestore.FieldValue.arrayRemove(auth)
                                        });   
                                    });
                                });
                            });
                        });
                });
            };
        });
    };
    
    function openGroup(roomNameCoach, buttonName){
        buttonName.innerHTML = `<a href="../groups-coaches/${roomNameCoach}.html">Meer informatie</a>`
    
    };
    
    // Group landing
    
    const groupLandingPageOuterDivCoach = document.getElementById("group-landing-page")
    const groupLandingTitleCoach = document.getElementById("group-landing-title")
    const buttonGroupLandingCoach = document.getElementById("button-group-landing")
    const groupDescriptionCoach = document.getElementById("group-description")
    const groupFactsUlCoach = document.getElementById("group-facts")
    const bannerDivCoach = document.getElementById("banner-div")
    
    function groupLandingH1(roomNameClean){
    
        if(groupLandingTitleCoach != null){
    
                groupLandingTitleCoach.innerText = roomNameClean
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
    
    function hideLandingIfAuthIsMember(membersArray, groupLandingPageOuterDivCoach){
    
        auth.onAuthStateChanged(User =>{
            if(User){
              const userRef = db.collection("Vitaminders").doc(User.uid);
              userRef.get().then(function(doc) {
        
                    const auth = doc.data().Gebruikersnaam
    
                    if(membersArray.includes(auth)){

                        groupLandingPageOuterDivCoach.style.display = "none"
                    };
                });
            };
        });
    }; 
    
    function groupFactsLanding(memberCount, totalCosts, maximumMembersCount, durationTime, startDate){
    
        const numberOfMembersLi = document.createElement("li")
        const maximumMembers = document.createElement("li")
        const costs = document.createElement("li")
        const duration = document.createElement("li")
        const start = document.createElement("li")

        if(memberCount != undefined){
            numberOfMembersLi.innerHTML = `<b>Aantal leden:</b> ${memberCount.length}`
            groupFactsUlCoach.appendChild(numberOfMembersLi)
        } else {
            numberOfMembersLi.style.display = "none"
        };
    
        if(totalCosts != undefined){
            costs.innerHTML = `<b>Kosten:</b> ${totalCosts} euro`
            groupFactsUlCoach.appendChild(costs)
        } else {
            costs.style.display = "none"
        };

        if(maximumMembersCount != undefined){
            maximumMembers.innerHTML = `<b>Aantal deelnemers:</b> ${maximumMembersCount}`
            groupFactsUlCoach.appendChild(maximumMembers)
        } else {
            maximumMembers.style.display = "none"
        };
          
        if(durationTime != undefined){
            if(durationTime === "Doorlopend"){
                duration.innerHTML = `<b>Duur van coachgroep:</b> ${durationTime}` 
                groupFactsUlCoach.appendChild(duration)
            } else {
                duration.innerHTML = `<b>Duur van coachgroep:</b> ${durationTime} maanden`
                groupFactsUlCoach.appendChild(duration)
            }
        } else {
            duration.style.display = "none"
        };

        if(startDate != undefined){
            start.innerHTML = `<b>Start datum:</b> ${startDate}`
            groupFactsUlCoach.appendChild(start)
        } else {
            start.style.display = "none"
        };       
    };
    
    function groupDescriptionLanding(descriptionOfGroup){
        
    
        groupDescriptionCoach.innerHTML = descriptionOfGroup
    }
    
    function groupLandingBanner(imagePhoto){
    
        const bannerImg = document.createElement("img")
    
        bannerImg.src = imagePhoto
    
        bannerDivCoach.appendChild(bannerImg)
    }
    
    function hideLandingModal(){
        const hideIcon = document.getElementById("hide-landing-modal")
    
        hideIcon.addEventListener("click", () => {
            window.open("../groups-for-coaches.html", "_self");
        });
    };
    
    !function editDescriptionGroup(){
    
        const editIcon = document.createElement("img")
            editIcon.setAttribute("id", "edit-icon-event-description")
        editIcon.src = "/images/edit-icon.png"
    
        const dom = document.getElementById("description-div")
    
        const tinyMCEDiv = document.getElementById("tiny-mce-div")
    
        displayEditIconIfAuthIsAdmin(editIcon)
    
        editIcon.addEventListener("click", () => {
    
            tinyMCEDiv.style.display = "flex"
            dom.style.display = "none"
    
            db.collection("GroupsForCoaches").where("Room", "==", titleOfRoom())
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
    
                    const description = doc.data().Description
    
                        tinymce.get("tiny-mce").setContent(description);
    
                });
            });
        });
    }();
    
    function displayEditIconIfAuthIsAdmin(editIcon){
    
        const dom = document.getElementById("description-div")
    
        if(dom != null){
    
            auth.onAuthStateChanged(User =>{
                db.collection("Vitaminders").doc(User.uid)
                .get().then(doc => {
    
                    const admin = doc.data().Admin
    
                    if(admin === "Yes"){
    
                        dom.appendChild(editIcon)
    
                    };
                });
            });
        };
    };
    
    !function saveEditedDescription(){
    
        const button = document.getElementById("button-edit-group-description")
    
        if(button != null){
    
            button.addEventListener("click", () => {
    
                const description = tinymce.get("tiny-mce").getContent();
    
                button.innerText = "Opgeslagen"
                button.id = "Clicked"
    
                db.collection("GroupsforCoaches").where("Room", "==", titleOfRoom())
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
    
                        db.collection("GroupsForCoaches").doc(doc.id).update({
                            Description: description
                        })
                        .then(() => {
                            location.reload(); 
                        });
                    });
                });
            });
        };
    }();

    function formatDateLanding(start){

        if(start != undefined){

        const dateArray = start.split("-")
    
        const date = `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`
        };
    };

    function buyGroupsForCoach(docid){

        buttonGroupLandingCoach.addEventListener("click", () => {

            auth.onAuthStateChanged(User =>{
                db.collection("Vitaminders").doc(User.uid)
                .get().then(doc => {

                    const userName = doc.data().Gebruikersnaam

                    db.collection("GroupsForCoaches")
                    .doc(docid)
                    .update({
                        Members: firebase.firestore.FieldValue.arrayUnion(userName)
                    })
                    .then(() => {

                        db.collection("GroupsForCoaches")
                        .doc(docid)
                        .collection("Messages")
                        .where("Room", "==", titleOfRoom())
                        .get()
                        .then(querySnapshot => {
                          querySnapshot.forEach(doc1 => {

                            console.log("test")
                
                            db.collection("GroupsForCoaches").doc(docid)
                            .collection("Messages").doc(doc1.id)
                            .update({
                              Members: firebase.firestore.FieldValue.arrayUnion(userName)
                            });
                          });
                        });

                      })
                    .then(() => {
                        buttonGroupLandingCoach.innerText = "Aangemeld"
                        buttonGroupLandingCoach.setAttribute("class", "button-group-for-coaches-purchase")
                        groupLandingPageOuterDivCoach.style.display = "none"
                    })
                });
            });
        });
    };
    
    !function fillLandingWithGroupData(){
        db.collection("GroupsForCoaches")
        .where("Room", "==", titleOfRoom())
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc1 => {
    
                const members = doc1.data().Members
                const roomClean = doc1.data().RoomClean
                const type1 = doc1.data().Type
                const creator = doc1.data().Creater
                const bannerImage = doc1.data().CoverPhoto
                const price = doc1.data().Costs
                const maxMembers = doc1.data().NumberParticipants
                const groupDescriptionCoach = doc1.data().Description
                const duration = doc1.data().GroupLength
                const start = doc1.data().StartDate
    
                groupLandingH1(roomClean)
    
                groupLandingCreatorInformation(creator, type1)
    
                groupFactsLanding(members, price, maxMembers, duration)
        
                hideLandingIfAuthIsMember(members, groupLandingPageOuterDivCoach)
        
                groupDescriptionLanding(groupDescriptionCoach)
    
                hideLandingModal()
    
                groupLandingBanner(bannerImage)

                formatDateLanding(start)

                buyGroupsForCoach(doc1.id)
    
            });
        });
    }();
    
    // Coachgroup individual page
    
    function showMemberNameOnHover(memberPhoto, nameP){
        
        memberPhoto.addEventListener("mouseover", () => {
            nameP.style.display = "block"

        });
    };

    function showMemberPhoto(photo, memberPhoto){

        if(photo == undefined){
            memberPhoto.src = "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
        } else {
            memberPhoto.src = photo
        };    

    };
    
    function roomTitle(roomClean, room){
        const DOMtitleCoach = document.getElementById("group-title")
    
        if(DOMtitleCoach != null){

            if(roomClean == undefined){
                DOMtitleCoach.innerText = room
            } else {
                DOMtitleCoach.innerText = roomClean
            };
        };
    };

    function linkToAccountFromMemberPhoto(memberPhoto, member){

        memberPhoto.addEventListener("click", () => {

            window.open("../Vitaminders/" + member, "_self");

        });
    };
    
        const DOMchatScreenCoach = document.getElementById("chat-screen")

    
!function displayMembersOfgroup(){
    
    const listOfMembersCoach = document.getElementById("list-of-members-inner-div")
    const membersDiv = document.getElementById("list-of-members")

    const roomNameCoach = titleOfRoom()

    db.collection("GroupsForCoaches")
    .where("Room", "==", roomNameCoach)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const members = doc.data().Members
            const roomClean = doc.data().RoomClean
            const room = doc.data().Room

            members.forEach(member => {

        db.collection("Vitaminders")
        .where("Gebruikersnaam", "==", member)
        .get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

                const gebruikersnaamClean = doc1.data().GebruikersnaamClean
                const photo = doc1.data().Profielfoto

                const photoDiv = document.createElement("div")
                photoDiv.setAttribute("id", "member-photo-div")
                const memberPhoto = document.createElement("img")
                    memberPhoto.setAttribute("class", "group-member-photo")
                const nameP = document.createElement("p")
                    nameP.setAttribute("class", "member-name-p")

                nameP.innerText = gebruikersnaamClean

                // showMemberNameOnHover(memberPhoto, nameP)
                showMemberPhoto(photo, memberPhoto)
                roomTitle(roomClean, room)
                linkToAccountFromMemberPhoto(memberPhoto, member)

                listOfMembersCoach.appendChild(photoDiv)
                photoDiv.appendChild(memberPhoto)
                photoDiv.appendChild(nameP)

                    });
                });
            });
        });
    })
    .then(() => {
        toggleMaxHeightOfMembersListDiv(membersDiv)
    })
}();

function toggleMaxHeightOfMembersListDiv(membersDiv){

    setTimeout(() => {
        console.log(membersDiv.offsetHeight)
        if(membersDiv.offsetHeight > 70){

            membersDiv.style.maxHeight = "50px"
        membersDiv.style.paddingBottom = "13px"

        const moreDiv = document.createElement("div")
        const moreButton = document.createElement("p")

        moreButton.innerText = "Bekijk meer"

        DOMchatScreenCoach.prepend(moreDiv)
            moreDiv.setAttribute("id", "more-div")
        moreDiv.appendChild(moreButton)

        moreButton.addEventListener("click", () => {

        if(membersDiv.style.maxHeight === "max-content"){
            membersDiv.style.maxHeight = "50px"
            moreButton.innerText = "Bekijk meer"
        } else {
            membersDiv.style.maxHeight = "max-content"
            moreButton.innerText = "Bekijk minder"
        };
    });

        };
    }, 1500);
};
    
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
    
    function showGoalsAndInputOfAuth(){
    
        const authDiv = document.getElementById("auth-div")
        const CTA = document.getElementById("cta-lesson-coachgroup")
    
        if(authDiv != null || CTA != null){
    
            authDiv.style.display = "flex"
            CTA.style.display = "none"
        };
    }
    
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
    
                        if(selectGoals != null){
    
                        selectGoals.appendChild(option)
                        };
    
                        showGoalsAndInputOfAuth()
                    });
                });
            });
        };
    });
    
    !function showAddLearningDiv(){
    
        const learningTitleDiv = document.getElementById("learnings-title-div")
    
        const learningInnerDiv = document.getElementById("learning-inner-div")
    
        if(learningInnerDiv != null){
    
            learningTitleDiv.addEventListener("click", () => {
    
                if(learningInnerDiv.style.display === "none"){
                    learningInnerDiv.style.display = "flex"
                } else {
                    learningInnerDiv.style.display = "none"
                };
            });
        };
    }();
    
        
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
                Source: titeCGl,
                Levensvraag: levensvraagID,
                Status: "Approved"
                        })
           
                levensvraagRef = db.collectionGroup("Levensvragen").where("Levensvraag", "==", levensvraagID).where("Gebruikersnaam", "==", auth)
                levensvraagRef.get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc4 => {
                        
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

function randomID(){

    const id = Math.random() 
    const idAlpha = id.toString(36)
    const idMessage = idAlpha.replace("0.", "")

    return idMessage
};

function saveNewMessage(elem){

    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders")
        .doc(User.uid)
        .get().then(function(doc) {
    
                const auth = doc.data().Gebruikersnaam

                const input = elem.previousElementSibling.value
                const id = randomID()
                const parentID = elem.dataset.parentid

                console.log("saved message")

                db.collection("GroupsForCoaches")
                .where("Room", "==", titleOfRoom())
                .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
    
                    const members = doc.data().Members

                    console.log(members)
    
                db.collection("GroupsForCoaches")
                .doc(doc.id)
                .collection("Messages")
                .doc().set({
                    Auth: auth,
                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                    Message: input,
                    Room: titleOfRoom(),
                    Members: members,
                    Type: "Message",
                    Thread: [id],
                    ID: id,
                    Status: "New",
                    Read: [auth],
                    ParentID: parentID,
                    }).then(() => {
                        db.collection("GroupsForCoaches")
                        .doc(doc.id)
                        .update({
                            Messages: firebase.firestore.FieldValue.increment(1)
                        }).then(() => {

                            updateNumberOfReactionsInMessage(parentID, doc.id)
            
                        })
                        .then(() => {
                            const input = document.getElementById("chat-input")

                            input.value = ""
                        });
                    });  
                });
            });
        });
    });
};

function updateNumberOfReactionsInMessage(parentID, docid){

    db.collectionGroup("Messages")
    .where("ID", "==", parentID)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("GroupsForCoaches")
            .doc(docid)
            .collection("Messages")
            .doc(doc.id)
            .update({
                Messages: firebase.firestore.FieldValue.increment(1)
            });
        });
    });
};

function saveNewReaction(elem){

    emptyScreenByOnsnapshotReaction()

    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders")
        .doc(User.uid)
        .get().then(function(doc) {
    
                const auth = doc.data().Gebruikersnaam

                const input = elem.previousElementSibling.value
                const id = randomID()
                const parentID = elem.dataset.parentid

                const thread = [id]

                addIdToThread(parentID, thread)

                db.collection("GroupsForCoaches")
                .where("Room", "==", titleOfRoom())
                .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
    
                    const members = doc.data().Members

                    console.log(members)
    
                db.collection("GroupsForCoaches")
                .doc(doc.id)
                .collection("Messages")
                .doc().set({
                    Auth: auth,
                    Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                    Message: input,
                    Room: titleOfRoom(),
                    Members: members,
                    Thread: thread,
                    Type: "Reaction",
                    ID: id,
                    Status: "New",
                    Read: [auth],
                    ParentID: parentID,
                    }).then(() => {
                        db.collection("GroupsForCoaches")
                        .doc(doc.id)
                        .update({
                            Messages: firebase.firestore.FieldValue.increment(1)
                        })
                        .then(() => {
                            updateNumberOfReactionsInMessage(parentID, doc.id)
                        })
                        .then(() => {
                            const input = document.getElementById("chat-input")

                            input.value = ""
                        });
                    });  
                });
            });
        });
    });
};

function addIdToThread(parentID, thread){

    db.collectionGroup("Messages")
    .where("Room", "==", titleOfRoom())
    .where("ID", "==", parentID)
    .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {

            const threadParent = doc.data().Thread

            threadParent.forEach(thr => {
                thread.push(thr)
            });
        });
    });
};

function emptyScreenByOnsnapshotReaction(){

    console.log("empty reactions")

    const DOMchatScreenGroupChat = document.getElementById("chat-screen")

    const chatDivsUser = document.getElementsByClassName("reaction-div")

    const chatDivsArrayUser = Array.from(chatDivsUser)

    chatDivsArrayUser.forEach(divs => {

        console.log("empty reactions")
        
        divs.remove();
    });
};

function emptyScreenByOnsnapshotMessage(){

    console.log("empty messages")

    const DOMchatScreenGroupChat = document.getElementById("chat-screen")

    const chatDivsUser = document.getElementsByClassName("message-div")

    const chatDivsArrayUser = Array.from(chatDivsUser)

    chatDivsArrayUser.forEach(divs => {

        console.log("empty messages")
        
        DOMchatScreenGroupChat.removeChild(divs)
    });
};

function messageOptions(sender, chatMessage, authChatter){
    const options = document.createElement("img")
       options.setAttribute("class", "message-options")
    options.src = "../images/design/mail-icon2.jpg"

    const sendAsMailDiv = document.createElement("div")
       sendAsMailDiv.setAttribute("class", "send-chat-as-mail-div")
       sendAsMailDiv.setAttribute("data-message", chatMessage)
       sendAsMailDiv.setAttribute("data-room", titleOfRoom())
       sendAsMailDiv.setAttribute("data-auth", authChatter)

       sendChatAsMail(chatMessage, authChatter, sendAsMailDiv)

    sender.appendChild(options)
    sender.appendChild(sendAsMailDiv)
    chooseRecipientForMail(sendAsMailDiv)
    toggleSendAsMail(options, sendAsMailDiv)

};

function chooseRecipientForMail(sendAsMailDiv){
    
    const selectMember = document.createElement("select")
    selectMember.setAttribute("id", "select-member-to-send-mail")
    const optionAllMembers = document.createElement("option")
    optionAllMembers.innerText = "Iedereen"
    selectMember.appendChild(optionAllMembers)
    
    db.collection("GroupsForCoaches")
        .where("Room", "==", titleOfRoom())
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const members = doc.data().Members

                members.forEach(member => {

                    db.collection("Vitaminders")
                .where("Gebruikersnaam", "==", member)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {

                        const usernameClean = doc1.data().GebruikersnaamClean
                        const option = document.createElement("option")
                        option.innerText = usernameClean
                        selectMember.appendChild(option)
                });
            });

                sendAsMailDiv.appendChild(selectMember)

            });
        });
    });
}; 

function toggleSendAsMail(options, sendChatAsMailDiv){

    options.addEventListener("click", () => {
            if(sendChatAsMailDiv.style.display === "flex"){
                sendChatAsMailDiv.style.display = "none" 
            } else {
                sendChatAsMailDiv.style.display = "flex" 
            };
    });
};

function sendChatAsMail(message, coach, sendAsMailDiv){

const sendButton = document.createElement("button")
sendButton.setAttribute("id", "sendAsMailButton")
sendButton.innerText = "Verstuur bericht als mail"

sendAsMailDiv.appendChild(sendButton)

sendButton.addEventListener("click", () => {

    sendButton.innerText = "Verstuurd"

    const memberSelect = sendButton.nextSibling

    const option = memberSelect.options
    const selected = option[option.selectedIndex].innerHTML

    db.collection("Vitaminders").where("GebruikersnaamClean", "==", coach)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc2 => {

                const SenderNameClean = doc2.data().GebruikersnaamClean

    db.collection("GroupsForCoaches")
    .where("Room", "==", titleOfRoom()).get()
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

                        if(selected === naam){
                                console.log(email)
                                emailLayout(email, SenderNameClean, titelClean, message, titel, naam)
                        
                        } else if (selected === "Iedereen") {
                                console.log(email)
                                emailLayout(email, SenderNameClean, titelClean, message, titel, naam)
                        };
                        });
                    });
                });
            });
        });
    });
});
});
};

function emailLayout(emailAdress, SenderNameClean, titelClean, message, titel, naam){

        db.collection("Mail").doc().set({
                to: emailAdress,
                cc: "info@vitaminds.nu",
        message: {
        subject: `Je hebt een nieuw bericht ontvangen van ${SenderNameClean} in je groep ${titelClean}`,
        html: `Hallo ${naam}, <br><br>
                ${SenderNameClean} heeft je een bericht gestuurd in de groep ${titelClean} : <br><br>
                
                Ga naar je <a href="www.vitaminds.nu/groups-coaches/${titel}.html">groep</a> om het bericht te lezen en er op te reageren.<br><br>
                P.s. Om privacyredenen kun je groep alleen bekijken als je bent ingelogd in Vitaminds.<br><br>

                Vriendelijke groet, <br></br>
                Het Vitaminds Team <br></br>
                <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
        Gebruikersnaam: naam,
        Emailadres: emailAdress,
        Type: "New coachmessage in chat"
        }        
    });  
};

// Load messages in realtime
function loadMessageInRealtime(){

        db.collectionGroup("Messages")
        .where("Room", "==", titleOfRoom())
        .orderBy("Timestamp", "desc")
        .where("Type", "==", "Message")
        .limit(10)
        .onSnapshot(querySnapshot => {

            emptyScreenByOnsnapshotMessage()
            
            querySnapshot.forEach(doc2 => {

                const authMessage = doc2.data().Message
                const sender = doc2.data().Auth
                const members = doc2.data().Members
                const id = doc2.data().ID
                const timestamp = doc2.data().Timestamp
                const parentID = doc2.data().ParentID
                const messages = doc2.data().Messages
                const readlist = doc2.data().Read

                const messageDiv = document.createElement("div")
                    messageDiv.setAttribute("class", "message-div message-reaction")

                    messageDiv.setAttribute("data-id", id)
                    messageDiv.setAttribute("data-parentid", parentID)
                    messageDiv.setAttribute("data-timestamp", timestamp)

                    showNewMessages(messageDiv, id)
                    appendMessageToDOM(timestamp, sender, authMessage, id, messageDiv, parentID, messages)
        });
    });
};

function loadReactionsInRealtime(parentID){

    db.collectionGroup("Messages")
    .where("Room", "==", titleOfRoom())
    .orderBy("Timestamp", "asc")
    .where("Type", "==", "Reaction")
    .where("ParentID", "==", parentID)
    .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc2 => {

            const authMessage = doc2.data().Message
            const sender = doc2.data().Auth
            const members = doc2.data().Members
            const id = doc2.data().ID
            const timestamp = doc2.data().Timestamp
            const parentID = doc2.data().ParentID
            const messages = doc2.data().Messages
            const readlist = doc2.data().Read

            const messageDiv = document.createElement("div")
                messageDiv.setAttribute("class", "message-div message-reaction")
                messageDiv.setAttribute("data-id", id)
                messageDiv.setAttribute("data-parentid", parentID)
                messageDiv.setAttribute("data-timestamp", timestamp)

                showNewReactions(messageDiv, id)
                appendMessageToDOM(timestamp, sender, authMessage, id, messageDiv, parentID, messages)
        });
    });
};

loadMessageInRealtime()

function loadAllReactions(loadReactionsP, id){

    loadReactionsP.addEventListener("click", () => {
        loadReactionsInRealtime(id)
        // loadReactionsP.style.display = "none"
    });
};

messageDivArray = []

function appendMessageToDOM(timestamp, sender, authMessage, id, messageDiv, parentID, messages){

    const messageP = document.createElement("p")
    messageP.setAttribute("class", "auth-message-p")

    const senderName = document.createElement("p")
    senderName.setAttribute("class", "sender-name-message")

    const timestampP = document.createElement("p")
    timestampP.setAttribute("class", "message-timestamp")

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    timestampP.innerHTML = timestamp.toDate().toLocaleDateString("nl-NL", options);

    const loadReactions = document.createElement("p")
        loadReactions.setAttribute("class", "load-reactions")

    loadReactionsButton(loadReactions, messages)

    loadAllReactions(loadReactions, id)

    senderNameClean(sender, senderName, authMessage)   

    messageP.innerText = authMessage
    senderName.style.fontWeight = "bold"
    senderName.style.alignSelf = "flex-end"
    timestampP.style.alignSelf = "flex-start"
    senderName.style.color = colour

    messageDiv.appendChild(senderName)
    messageDiv.appendChild(timestampP)
    messageDiv.appendChild(messageP)
    appendReactionInputToMessage(messageDiv, id, sender, authMessage)
    messageDiv.appendChild(loadReactions)

    appendMessagesToMessageOrReaction(messageDiv, messageP, senderName, parentID)

    findLinkInText(messageP)

};

function loadReactionsButton(loadReactions, messages){

    if(messages === undefined){
        // loadReactions.style.display = "none"
    } else if (messages === 1){
        loadReactions.innerHTML = `Bekijk ${messages} reactie` 
    } else {
        loadReactions.innerHTML = `Bekijk ${messages} reacties`
    };
};


const messageIDListGC = localStorage.getItem("IDs")


function showNewMessages(messageDiv, id){

    if(messageIDListGC != null){
        const messageIDArray = messageIDListGC.split(",")

        if(messageIDArray.includes(id)){

            messageDiv.style.borderColor = "#8e0000" 
            removeNewMessageBorderColorOnHover(messageDiv, id, messageIDArray)

        };
    };
};

function showNewReactions(reactionDiv, id){

    if(messageIDListGC != null){
        const messageIDArray = messageIDListGC.split(",")

        if(messageIDArray.includes(id)){

            reactionDiv.style.borderColor = "#8e0000" 
            removeNewMessageBorderColorOnHover(reactionDiv, id)

        }; 
    };
};

function removeNewMessageBorderColorOnHover(messageDiv, id){

    if(messageIDListGC != null){
        const messageIDArray = messageIDListGC.split(",")

        messageDiv.addEventListener("mouseenter", () => {

            messageDiv.style.borderColor = "white"

            const index = messageIDArray.indexOf(id)

            const newArray = messageIDArray.splice(index, 1)

            localStorage.setItem("IDs", newArray)

        });
    };
};

!function showNestedReactions(){

    if(messageIDListGC != null){
        const messageIDArray = messageIDListGC.split(",")

        messageIDArray.forEach(ID => {

            db.collectionGroup("Messages")
            .where("Room", "==", titleOfRoom())
            .where("ID", "==", ID)
            .orderBy("Timestamp", "asc")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    const thread = doc.data().Thread

                    const allMessages = document.getElementsByClassName("message-reaction")

                    const allMessagesArray = Array.from(allMessages)

                    allMessagesArray.forEach(messageDiv => {

                        console.log(messageDiv)

                        const divId = messageDiv.dataset.id

                        thread.forEach(thr => {

                            if (divId === thr){

                                const button = messageDiv.getElementsByClassName("load-reactions")

                                const buttonArray = Array.from(button)

                                buttonArray.forEach(btn => {
                                    
                                        btn.click()
                                        btn.setAttribute("class", "clicked")

                                        console.log(btn)

                                        setTimeout(() => {
                                        
                                            const nextDiv = btn.nextElementSibling

                                            console.log(nextDiv)

                                            const nextBtn = nextDiv.getElementsByClassName("load-reactions")

                                            nextBtnArray = Array.from(nextBtn)

                                            nextBtnArray.forEach(nxtBtn => {
                                                nxtBtn.click()
                                                nxtBtn.setAttribute("class", "clicked")

                                                if(nextBtn != null){
                                        
                                                    loopNewMassageClick(nxtBtn)
                                                };
                                            });
                                        }, 1000);
                                });
                            };
                        })
                    });
                });
            });
        });
    };
}();

function loopNewMassageClick(nxtBtn){

        setTimeout(() => {
                                        
            const nextDiv = nxtBtn.nextElementSibling

            const nextBtn = nextDiv.getElementsByClassName("load-reactions")

            nextBtnArray = Array.from(nextBtn)

            nextBtnArray.forEach(nxtBtn => {
                nxtBtn.click()
                nxtBtn.setAttribute("class", "clicked")
            });

            loopNewMassageClick(nxtBtn)

        }, 1000);

        setTimeout(() => {

            loopNewMassageClick = (() => {

                console.log("Loop beindigd")

            });

        }, 10000);
};

function findLinkInText(messageP){

    const text = messageP.innerText

    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    const links = text.match(urlRegex)

    if(links != null){

    const newText = text.replace(links[0], `<a href="${links}", target="_blank">${links}</a>`)

    console.log(newText)

    messageP.innerHTML = newText

    };

};

function appendMessagesToMessageOrReaction(messageDiv, messageP, senderName, parentID){
    messageDivArray.push(messageDiv)

    messageDivArray.forEach(div => {

        const divID = div.dataset.id
        const timestamp = div.dataset.timestamp

        if(parentID === divID){
            div.appendChild(messageDiv)
            messageDiv.setAttribute("class", "reaction-div")
            messageP.setAttribute("class", "reaction-p")
            senderName.setAttribute("class", "reaction-sender")
        } else if (parentID === "none") {
            DOMchatScreenCoach.appendChild(messageDiv)
        };
    });
};

// !function scrollToBottomOnLoad(){

//     setTimeout(() =>{
//         const bottom = document.getElementById("top-layer")

//         bottom.scrollIntoView()
//     }, 2500);
// }();

function senderNameClean(sender, senderName, authMessage){
    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", sender)
    .get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const messageNameClean = doc.data().GebruikersnaamClean

            senderName.innerText = messageNameClean

            messageOptionsForAdmin(sender, senderName, authMessage, messageNameClean)

        });
    });
};

function messageOptionsForAdmin(sender, senderName, authMessage, messageNameClean){

    db.collection("GroupsForCoaches")
    .where("Room", "==", titleOfRoom())
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const admin = doc.data().Admin

             if(admin.includes(sender)){
            messageOptions(senderName, authMessage, messageNameClean)
            };

        });
    });
};

function appendReactionInputToMessage(messageDiv, id, sender, authMessage){

    const inputDiv = document.createElement("div")
        inputDiv.setAttribute("id", "input-div-reaction")

    const input = document.createElement("textarea")
        input.placeholder = "Schrijf hier je reactie"
        input.id = "reaction-input-id"
        input.setAttribute("rows", "1")
        input.setAttribute("class", "reaction-input")

    const sendImage = document.createElement("img")
        sendImage.setAttribute("onclick", "saveNewReaction(this)")
        sendImage.setAttribute("data-parentid", id)
    
    sendImage.src = "../images/send-icon.png"
    
    messageDiv.appendChild(inputDiv)
    inputDiv.appendChild(input)
    inputDiv.appendChild(sendImage)

    addSocialIconsToMessage(messageDiv, sender, authMessage, inputDiv)

};

function addDataToSocial(supportType, userName, message){
    
    supportType.setAttribute("data-username", userName)
    supportType.setAttribute("data-message", message)

};

function socialStartIcon(inputDiv, socialIconDiv){

    startIcon = document.createElement("img")
        startIcon.setAttribute("class", "socials-start-icon")

    startIcon.src = "../images/heart-icon.png"

    inputDiv.prepend(startIcon)

    startIcon.addEventListener("mouseover", () => {
        socialIconDiv.style.display = "flex"
    });

    socialIconDiv.addEventListener("mouseleave", () => {
        socialIconDiv.style.display = "none"
    });

};

function addSocialIconsToMessage(messageP, userName, message, inputDiv){

    const socialIconDiv = document.createElement("div")
    socialIconDiv.setAttribute("class", "social-div") 

    const IFeelForYouIconDiv = document.createElement("div")
    const IUnderstandIconDiv = document.createElement("div")
    const yourGoodTheWayYouAreDiv = document.createElement("div")
    const keepAtItDiv = document.createElement("div")
    const yourNotAloneDiv = document.createElement("div")

    const IFeelForYouIconP = document.createElement("p")
        IFeelForYouIconP.setAttribute("class", "social-icon-p")
    const IUnderstandIconP = document.createElement("p")
        IUnderstandIconP.setAttribute("class", "social-icon-p")
    const yourGoodTheWayYouAreP = document.createElement("p")
        yourGoodTheWayYouAreP.setAttribute("class", "social-icon-p")
    const keepAtItP = document.createElement("p")
        keepAtItP.setAttribute("class", "social-icon-p")
    const yourNotAloneP = document.createElement("p")
        yourNotAloneP.setAttribute("class", "social-icon-p")

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

    addDataToSocial(IFeelForYouIconDiv, userName, message)
    addDataToSocial(IUnderstandIconDiv, userName, message)
    addDataToSocial(yourGoodTheWayYouAreDiv, userName, message)
    addDataToSocial(keepAtItDiv, userName, message)
    addDataToSocial(yourNotAloneDiv, userName, message)

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

    messageP.appendChild(socialIconDiv)
    socialStartIcon(inputDiv, socialIconDiv)
}

function showSocialDescription(iconDiv, iconP){
    iconDiv.addEventListener("mouseover", () => {
        iconP.style.display = "block"
    });

    iconDiv.addEventListener("mouseout", () => {
        iconP.style.display = "none"
    });
};

function savebutton(supportType, support, auth, notice, socialTypeWritten){

    supportType.addEventListener("click", () => {

        const username = supportType.dataset.username
        const message = supportType.dataset.message

        // saveInMessage(support, username, message)
        saveInUser(username, auth, message, support, socialTypeWritten)

        notice.innerText = "Verstuurd"
        notice.style.color = "#8e0000"

    });
};

function saveInMessage(support, username, message){

    db.collection("GroupsForCoaches")
    .where("Room", "==", titleOfRoom())
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            db.collection("GroupsForCoaches")
            .doc(doc.id)
            .collection("Messages")
            .where("Room", "==", titleOfRoom())
            .where("Auth", "==", username)
            .where("Message", "==", message)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    db.collection("GroupsForCoaches")
                    .doc(doc.id)
                    .collection("Messages")
                    .doc(doc1.id)
                    .update({
                        Support: firebase.firestore.FieldValue.arrayUnion(support)
                    });
                });
            });
        });
    });
};

function saveInUser(username, giver, message, support, socialTypeWritten){

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
                Message: message,
                SourceType: "GroupsCoaches",
                Source: titleOfRoom(),
                Status: "New"
            });
        });
    });
};

function sendMailNewSocial(email, gebruikersnaamClean, socialTypeWritten){

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
 
    function upgradeModal(notice){
    
        const upgradeModal = document.getElementById("upgrade-account-modal")
    
        notice.addEventListener("click", () => {
    
            upgradeModal.style.display = "flex"
        });
    };
    
    !function upgradeMessage(){
    
        const title = document.getElementById("welcome-message-upgrade")
    
        auth.onAuthStateChanged(User =>{
            if(User){
            const userRef = db.collection("Vitaminders").doc(User.uid);
            userRef.get().then(function(doc) {
    
                const name = doc.data().GebruikersnaamClean
    
                    if(title != null){
    
                        title.innerHTML = `Wat leuk dat je wilt updragen naar een Premium abonnement, ${name}!`
                    };
                });
            };
        });
    }();
    
    !function sendUpgradeRequest(){
        const requestButton = document.getElementById("upgrade-button")
    
        if(requestButton != null){
    
            requestButton.addEventListener("click", () => {
    
                auth.onAuthStateChanged(User =>{
                    if(User){
                    const userRef = db.collection("Vitaminders").doc(User.uid);
                    userRef.get().then(function(doc) {
    
                        const email = doc.data().Email
                        const nameClean = doc.data().GebruikersnaamClean
    
                            db.collection("Mail").doc().set({
                                to: [email],
                                cc: "info@vitaminds.nu",
                                message: {
                                subject: `Upgrade naar Premium Vitaminds account`,
                                html: `Hallo ${nameClean}, </br></br>
                                        Wat leuk dat je een Premium-account hebt aangevraagd!<br><br> 
                                        
                                        We gaan je account direct upgraden. Je ontvangt een mailtje zodra je account is ge-upgrade.</br></br>
    
                                        Vriendelijke groet, </br></br>
                                        Het Vitaminds Team </br></br>
                                        <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                                Gebruikersnaam: nameClean,
                                Emailadres: email,
                                Type: "Upgrade request"
                                }        
                                })
                            .then(() => {
    
                                requestButton.innerText = "Je upgrade is aangevraagd!"
    
                            });
                        });
                    };
                });
            });
        };
    }();


// Message Options

!function showMessageOptions(){

    const button = document.getElementById("options-icon")
    const optionsDiv = document.getElementById("options-div")

    button.addEventListener("click", () => {

        if(optionsDiv.style.display === "flex"){
            optionsDiv.style.display = "none"
        } else {
            optionsDiv.style.display = "flex"
            optionsDiv.scrollIntoView()
        };

    });

}();

!function showUploadInput(){

    const button = document.getElementById("upload-div")
    const inputDiv = document.getElementById("upload-input-div")

    button.addEventListener("click", () => {

        if(inputDiv.style.display === "flex"){
            inputDiv.style.display = "none"
        } else {
            inputDiv.style.display = "flex"
        };

    });

}();

!function uploadFile(){

    const button = document.getElementById("file-upload-button")
    const input = document.getElementById("chat-input")

    button.addEventListener("click", () => {

        button.innerText = "Uploaden.."

        const selectedFile = document.getElementById('upload-file-input').files[0];
        const storageRef = firebase.storage().ref("/GroupFiles/" + selectedFile.name);

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
            bannerImage = downloadURL
            button.innerText = "Geupload"
            input.value = downloadURL
            input.style.borderColor = "green"
            console.log(downloadURL)
                });                                                
            });
        });
    });
}();