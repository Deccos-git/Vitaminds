// Fetching title from url
function titleOfRoom(){
const titelhtmlCG = window.location.href.replace(/^.*[\\\/]/, '')
const titel1CG = titelhtmlCG.replace('.html', '')
const titel2CG = titel1CG.replace('%20',' ')
const titel3CG = titel2CG.replace('%20',' ')
const titel4CG = titel3CG.replace('%20',' ')
const titel5CG = titel4CG.replace('%20',' ')
const titel6CG = titel5CG.replace('%20',' ')
const titel7CG = titel6CG.replace('%20',' ')
const titel8CG = titel7CG.replace('%20',' ')
const titel9CG = titel8CG.replace('%20',' ')
const titel10CG = titel9CG.replace('%20',' ')
const titel11CG = titel10CG.replace('%20',' ')
const titel12CG = titel11CG.split("?fb")
const title = titel12CG[0]

return title

};

// !function updateMessagesWithMembers(){

//     db.collection("Coachgroups")
//     .where("Type", "==", "Coachgroup")
//     .get().then(querySnapshot => {
//         querySnapshot.forEach(doc => {

//             const room = doc.data().Room
//             const members = doc.data().Members

//             db.collectionGroup("Messages")
//             .where("Room", "==", room)
//             .get().then(querySnapshot => {
//                 querySnapshot.forEach(doc1 => {

//                     db.collection("Coachgroups")
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

function updateMessages(){

    db.collection("Coachgroups")
    .where("Room", "==", "io3rw9o6ixDe KOPP groep")
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {

     db.collectionGroup("Messages")
     .where("Room", "==", "io3rw9o6ixDe KOPP groep")
     .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc2 => {

    db.collection("Coachgroups")
     .doc(doc.id).collection("Messages")
     .doc(doc2.id)
     .update({
        ParentID: "none",
        Type: "Message",
        ID: "",
        Thread: []
     })
        });
    });
});
});
};


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
    
    db.collection("Coachgroups").where("Room", "==", titleOfRoom())
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

// Groups of auth in Chats&Groups

function setNameOfGroup(groupsP, roomClean){
    groupsP.innerText = roomClean
  };

function setImageGroup(photoImg){
    photoImg.src = "/images/groups-icon.jpg"
};

function newMessageInOverviewGroup(docID, groupsDivDOM, auth){

    const newMessageCount = []

    const newMessagesP = document.createElement("p")
    newMessagesP.setAttribute("class", "new-message-count-chats")

    db.collection("Coachgroups").doc(docID) 
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

function updateReadList(docID, authName, titleURL, messages){

    console.log("functie fired")

    if(messages != 0){
        db.collection("Coachgroups")
        .doc(docID)
        .collection("Messages")
        .where("Members", "array-contains", authName)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {

                console.log("auth in members of messages")

                const read = doc1.data().Read
                const message = doc1.data().Message

                console.log(read)

                if(!read.includes(authName)){

                    console.log(message)

                    console.log("auth in readlist")

                    db.collection("Coachgroups")
                    .doc(docID)
                    .collection("Messages")
                    .doc(doc1.id)
                    .update({
                        Read: firebase.firestore.FieldValue.arrayUnion(authName)
                    })
                    .then(() => {
                        console.log("Readlist geupdate met auth")
                        window.open(`../Group/${titleURL}.html`, "_self");
                    });
                } else {
                    console.log("Auth is already on readlist")
                    setTimeout(() => {
                        window.open(`../Group/${titleURL}.html`, "_self");
                     }, 1000);
                };
            });
        });
    }else{
        console.log("Geen berichten uberhaubt")
        window.open(`../Group/${titleURL}.html`, "_self");
    };
};

!function dataBaseQueryGroups(){
const DOMgroups = document.getElementById("overview-groups")

if (DOMgroups != null){

auth.onAuthStateChanged(User =>{
    if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {

        const auth = doc.data().Gebruikersnaam

            db.collection("Coachgroups")
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

                                newMessageInOverviewGroup(doc.id, groupsDiv, auth)
                                setNameOfGroup(groupsP, roomClean);
                                setImageGroup(photoImg)

                                // Open chat
                                groupsDiv.addEventListener("click", () => {

                                        // updateOnlineStatus(doc.id, auth)
                                        
                                        updateReadList(doc.id, auth, room, messages)
                                });
                        
                                // Update status of message
                                // updateNewStatusOfMessageChat(auth)

                                // Update online/offline when user leaves page
                                // updateOnlineStatusFromPagesLeaveChat(auth);

                                // Update status of message based on online/offline in room
                                // updateReadStatusBasedOnOnline(online, auth, doc.id)
                    
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
        const startdate = doc.data().StartDate

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

            groupCoverPhoto.src = coverPhoto
            groupTitleH2.innerText = titleClean

            openGroup(title, groupButton)

            hideVitamindsHuiskamer(title, groupInnerDiv)

            hideLeaveGroupButtonIfAuthIsNotMember(members, leaveGroup)
            showVisitGroupIfAuthIsMember(members, groupButton, title)

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

            numberParticipantsP.innerHTML = `<b>Aantal deelnemers:</b><br> ${numberParticipants}`
            memberCount.innerHTML = `<b>Aantal aanmeldingen:</b><br> ${members.length}`

            if( duration === "Doorlopend"){
                groupLenghtP.innerHTML = `<b>Duur van coachgroep:</b> ${duration}` 
            } else {
                groupLenghtP.innerHTML = `<b>Duur van coachgroep:</b> ${duration} maanden`
            };

            costsP.innerHTML = `<b>Kosten:</b><br> ${costs} euro`
            leaveGroup.innerHTML = "Aanmelding annuleren"

            changeFormatOfDate(startdate, startdateP)

            // // Coachgroup agreement
            // db.collection("Vitaminders").where("Gebruikersnaam", "==", auth).get().then(querySnapshot => {
            //     querySnapshot.forEach(doc1 => {

            //         const profilePic = doc1.data().Profielfoto
            //         const coachNameClean = doc1.data().GebruikersnaamClean

            //         coachGroupAgreementQuestions(profilePic, coachNameClean, auth)

            //     });
            // });   

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
            groupInnerDiv.appendChild(buttonDiv)
            buttonDiv.appendChild(groupButton)

            };

            if(members.includes(auth)){
                buttonDiv.appendChild(leaveGroup)
                };

              // Group is full message
              groupIsFull(members.length, groupButton, numberParticipants)

              //Already a member of the group
            // alreadyMember(members, groupButton)

             //Leave group
             leaveGroup.addEventListener("click", () => {

                leaveTheGroup(title)

            });

    });
});

function hideVitamindsHuiskamer(title, groupInnerDiv){

    if(title === "y5z53wcy0fhVitaminds huiskamer"){
        groupInnerDiv.style.display = "none"
    };
};

function changeFormatOfDate(date, startdateP){

    const splitDate = date.split("-")

    const formattedDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`

    startdateP.innerHTML = `<b>Startdatum:</b><br> ${formattedDate}`

}

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

                        if(coachGroupBuiderDiv != null){

                            if(userType === "Coach" ){
                                coachGroupBuiderDiv.style.display = "block"
                            };
                        };
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

function showVisitGroupIfAuthIsMember(membersOfGroup, button, title){
    auth.onAuthStateChanged(User =>{
        if (User){
    db.collection("Vitaminders").doc(User.uid).get().then(doc => {

        const auth = doc.data().Gebruikersnaam

        if(membersOfGroup.includes(auth)){
            button.innerHTML = `<a class="visit-group" href='../Group/${title}.html'>Ga naar groep</a>`
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

 // Already a member notice

//  function alreadyMember(a,b){

//     auth.onAuthStateChanged(User =>{
//         if(User){
//         const userRef = db.collection("Vitaminders").doc(User.uid);
//         userRef.get().then(function(doc) {
    
//             const auth = doc.data().Gebruikersnaam
//      if(a.includes(auth)){
//             b.innerText = "Je bent aangemeld"
//             b.setAttribute("onclick", "null()")

//                 };
//             });
//         };
//     });
// ;}

// Leave group
function leaveTheGroup(roomTitle){
    const button = document.getElementById("group-button")
    const buttonThemeGroup = document.getElementById("button-theme-group")

    button.innerText = "Aanmelding is geannuleerd"

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders")
        .doc(User.uid);
        userRef.get()
        .then(function(doc) {

            const auth = doc.data().Gebruikersnaam

            db.collection("Coachgroups")
            .where("Room", "==", roomTitle )
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {
        
                db.collection("Coachgroups")
                .doc(doc1.id)
                .update({
                    Members: firebase.firestore.FieldValue.arrayRemove(auth)
                            });
                    
                            db.collection("Coachgroups")
                            .doc(doc1.id)
                            .collection("Messages")
                            .where("Members", "array-contains", auth)
                            .get().then(querySnapshot => {
                                querySnapshot.forEach(doc2 => {

                                    db.collection("Coachgroups")
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

function changeFormatOfDateLanding(date, startdateP){

    const splitDate = date.split("-")

    const formattedDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`

    startdateP.innerHTML = `<b>Startdatum:</b> ${formattedDate}`

}

function groupFactsLanding(memberCount, totalCosts, maximumMembersCount, durationTime, startDate){

    const numberOfMembersLi = document.createElement("li")
    const maximumMembers = document.createElement("li")
    const costs = document.createElement("li")
    const duration = document.createElement("li")
    const start = document.createElement("li")

        numberOfMembersLi.innerHTML = `<b>Aantal aanmeldingen:</b> ${memberCount.length}`
        costs.innerHTML = `<b>Kosten:</b> ${totalCosts} euro`
        maximumMembers.innerHTML = `<b>Aantal deelnemers:</b> ${maximumMembersCount}`

        if(durationTime === "Doorlopend"){
            duration.innerHTML = `<b>Duur van coachgroep:</b> ${durationTime}` 
        } else {
            duration.innerHTML = `<b>Duur van coachgroep:</b> ${durationTime} maanden`
        }
        start.innerHTML = `<b>Start datum:</b> ${startDate}`

        changeFormatOfDateLanding(startDate, start)

        groupFactsUl.appendChild(maximumMembers)
        if(groupFactsUl != null){
            groupFactsUl.appendChild(numberOfMembersLi)
            };
        groupFactsUl.appendChild(duration)
        groupFactsUl.appendChild(costs)
        groupFactsUl.appendChild(start)
};

function groupDescriptionLanding(descriptionOfGroup){
    
    groupDescription.innerHTML = descriptionOfGroup
};

function groupLandingBanner(imagePhoto){

    const bannerImg = document.createElement("img")

    bannerImg.src = imagePhoto

    bannerDiv.appendChild(bannerImg)
};

function hideLandingModal(){
    const hideIcon = document.getElementById("hide-landing-modal")

    hideIcon.addEventListener("click", () => {
        window.open("../groups.html", "_self");
    });
};

!function editDescriptionEvent(){

    const editIcon = document.createElement("img")
        editIcon.setAttribute("id", "edit-icon-event-description")
    editIcon.src = "/images/edit-icon.png"

    const dom = document.getElementById("description-div")

    const tinyMCEDiv = document.getElementById("tiny-mce-div")

    displayEditIconIfAuthIsAdmin(editIcon)

    editIcon.addEventListener("click", () => {

        tinyMCEDiv.style.display = "flex"
        dom.style.display = "none"

        db.collection("Coachgroups").where("Room", "==", titleOfRoom())
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

            db.collection("Coachgroups").where("Room", "==", titleOfRoom())
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    db.collection("Coachgroups").doc(doc.id).update({
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

!function fillLandingWithGroupData(){
    db.collection("Coachgroups").where("Room", "==", titleOfRoom()).get().then(querySnapshot => {
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
            const start = doc1.data().StartDate

            const dateArray = start.split("-")

            const date = `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`

            groupLandingH1(roomClean)

            groupLandingCreatorInformation(creator, type1)

            groupFactsLanding(members, price, maxMembers, duration, date)
    
            hideLandingIfAuthIsMember(members, groupLandingPageOuterDiv)
    
            groupDescriptionLanding(groupDescription)

            hideLandingModal()

            groupLandingBanner(bannerImage)

        });
    });
}();

// Coachgroup individual page

    // Title

    const DOMtitle = document.getElementById("group-title")

    if(DOMtitle != null){

        db.collection("Coachgroups").where("Room", "==", titleOfRoom()).get().then(querySnapshot => {
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

!function displayMembersInOverview(){

    const listOfMembers = document.getElementById("list-of-members-inner-div")
    const membersDiv = document.getElementById("list-of-members")

    const roomName = titleOfRoom()

    db.collection("Coachgroups")
    .where("Room", "==", roomName)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const members = doc.data().Members

            members.forEach(member => {

            db.collection("Vitaminders")
            .where("Gebruikersnaam", "==", member)
            .get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {

                const gebruikersnaamClean = doc1.data().GebruikersnaamClean
                const photo = doc1.data().Profielfoto

                const memberPhoto = document.createElement("img")
                    memberPhoto.setAttribute("class", "group-member-photo")

                    if(photo == undefined){
                        memberPhoto.src = "https://firebasestorage.googleapis.com/v0/b/vitaminds-78cfa.appspot.com/o/dummy-profile-photo.jpeg?alt=media&token=229cf7eb-b7df-4815-9b33-ebcdc614bd25"
                    } else {
                        memberPhoto.src = photo
                    }; 

                memberPhoto.addEventListener("click", () => {

                    window.open("../Vitaminders/" + member, "_self");

                });

                listOfMembers.appendChild(memberPhoto)

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

        DOMchatScreen.prepend(moreDiv)
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
    
                    db.collection("Coachgroups")
                    .where("Room", "==", titleOfRoom())
                    .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
        
                        const members = doc.data().Members
    
                        console.log(members)
        
                    db.collection("Coachgroups")
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
                            db.collection("Coachgroups")
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
    
                db.collection("Coachgroups")
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
    
                    db.collection("Coachgroups")
                    .where("Room", "==", titleOfRoom())
                    .get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
        
                        const members = doc.data().Members
    
                        console.log(members)
        
                    db.collection("Coachgroups")
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
                            db.collection("Coachgroups")
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
        
        db.collection("Coachgroups")
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
    
        db.collection("Coachgroups")
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
                    
                    Ga naar je <a href="www.vitaminds.nu/Group/${titel}.html">groep</a> om het bericht te lezen en er op te reageren.<br><br>
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
    
            const first10 = db.collectionGroup("Messages")
            .where("Room", "==", titleOfRoom())
            .orderBy("Timestamp", "desc")
            .where("Type", "==", "Message")
            .limit(10)

            paginateMessages(first10)

            first10.onSnapshot(querySnapshot => {
    
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

    function paginateMessages(first10){

        setTimeout(() => {
            const bottomOfScreen = document.getElementById("end-of-screen")
            document.addEventListener("scroll", () => {
                const bottomDiv = bottomOfScreen.getBoundingClientRect()
    
                console.log(bottomDiv.bottom)
    
                if(bottomDiv.bottom < 670){
                    first10
                    .get().then((documentSnapshots) => {
                        var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
                        // loadNextMessageInRealtime(lastVisible)
                    });
                };
            });
        }, 3000);
    };

    function loadNextMessageInRealtime(lastVisible){
    
        db.collectionGroup("Messages")
        .where("Room", "==", titleOfRoom())
        .orderBy("Timestamp", "desc")
        .where("Type", "==", "Message")
        .startAfter(lastVisible)
        .limit(10)
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
        // senderName.style.color = `${colour} !important` 
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
    
    
    const messageIDList = localStorage.getItem("IDs")
    
    
    function showNewMessages(messageDiv, id){
    
        if(messageIDList != null){
            const messageIDArray = messageIDList.split(",")
    
            if(messageIDArray.includes(id)){
    
                messageDiv.style.borderColor = "#8e0000" 
                removeNewMessageBorderColorOnHover(messageDiv, id, messageIDArray)
    
            };
        };
    };
    
    function showNewReactions(reactionDiv, id){
    
        if(messageIDList != null){
            const messageIDArray = messageIDList.split(",")
    
            if(messageIDArray.includes(id)){
    
                reactionDiv.style.borderColor = "#8e0000" 
                removeNewMessageBorderColorOnHover(reactionDiv, id)
    
            }; 
        };
    };
    
    function removeNewMessageBorderColorOnHover(messageDiv, id){
    
        if(messageIDList != null){
            const messageIDArray = messageIDList.split(",")
    
            messageDiv.addEventListener("mouseenter", () => {
    
                messageDiv.style.borderColor = "white"
    
                const index = messageIDArray.indexOf(id)
    
                const newArray = messageIDArray.splice(index, 1)
    
                localStorage.setItem("IDs", newArray)
    
            });
        };
    };
    
    !function showNestedReactions(){
    
        if(messageIDList != null){
            const messageIDArray = messageIDList.split(",")
    
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
    
                            const divId = messageDiv.dataset.id
    
                            thread.forEach(thr => {
    
                                if (divId === thr){
    
                                    const button = messageDiv.getElementsByClassName("load-reactions")
    
                                    const buttonArray = Array.from(button)
    
                                    buttonArray.forEach(btn => {
                                        
                                            btn.click()
                                            btn.setAttribute("class", "clicked")
    
                                            setTimeout(() => {
                                            
                                                const nextDiv = btn.nextElementSibling
    
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
    
        text.replace(urlRegex, `<a href="${links}">${links}</a>`)
    
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
                DOMchatScreen.appendChild(messageDiv)
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
    
        db.collection("Coachgroups")
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
    
        db.collection("Coachgroups")
        .where("Room", "==", titleOfRoom())
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
                db.collection("Coachgroups")
                .doc(doc.id)
                .collection("Messages")
                .where("Room", "==", titleOfRoom())
                .where("Auth", "==", username)
                .where("Message", "==", message)
                .get().then(querySnapshot => {
                    querySnapshot.forEach(doc1 => {
    
                        db.collection("Coachgroups")
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
                    SourceType: "OpenUp",
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
    

// Groups of auth AND notifications

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


function groupsOverviewTitleGroup(title, group, photo, typeDescription){

    group.innerText = title
    photo.src = "/images/groups-icon.jpg"
    typeDescription.innerText = "Coachgroup"
};

// Coachgroup builder
function startCoachgroupBuilder(){

        const createCoachgroupButton = document.getElementById("create-coachgroep")
        const noticeP = document.createElement("p")
            noticeP.setAttribute("id", "upgrade-notice")
        const bottomDiv = document.getElementById("bottom-div-create-coachgroup")

        auth.onAuthStateChanged(User =>{
            if(User){
            const userRef = db.collection("Vitaminders").doc(User.uid);
            userRef.get().then(function(doc) {

                const coachType = doc.data().SubscriptionType

                if(coachType === "Premium"){
                    console.log("Premium")
                    window.open("coachgroup-builder.html", "_self");
                } else if (coachType === "Basic"){
                    console.log("Basic")
                    createCoachgroupButton.style.display = "none"
                    noticeP.innerHTML = '<u>Upgrade</u> naar een Premium account om een coachgroep te maken'
                    bottomDiv.appendChild(noticeP)

                    upgradeModal(noticeP)
                };
            });
        };
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

    let coverPhoto = ""

!function uploadCoverPhoto(){

    const uploadCoverPhotoButton = document.getElementById("upload-cover-photo-coachgroup")

    console.log(uploadCoverPhotoButton)

    if(uploadCoverPhotoButton != null){
    
        uploadCoverPhotoButton.addEventListener("click", () => {
    
            console.log("button clicked")
    
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
                  coverPhoto = downloadURL
    
                    });
                });
            });
        });
    };
}();


function saveCoachgroup(){

    auth.onAuthStateChanged(User =>{
        if(User){
        const userRef = db.collection("Vitaminders").doc(User.uid);
        userRef.get().then(function(doc) {
    
            const auth = doc.data().Gebruikersnaam
            const authClean = doc.data().GebruikersnaamClean
    
    const title = document.getElementById("coachgroup-title").value
    const description = document.getElementById("coachgroup-description").value
    const numberParticipants = document.getElementById("coachgroup-number-participants").value
    const costs = document.getElementById("coachgroup-costs").value
    const groupLength = document.getElementById("coachgroup-length").value
    const startdate = document.getElementById("coachgroup-start").value

    const dateArray = startdate.split("-")

    const day = dateArray[2]
    const month = dateArray[1]
    const year = dateArray[0]

    // Group goal
    const groupGoalSelect = document.getElementById("create-coachgroup-goal-select")

    const select = groupGoalSelect.options
    const option = select[select.selectedIndex].innerHTML

   db.collection("Coachgroups").doc().set({
        Eigenaar: "Vitaminds",
        Room: idClean + title,
        RoomClean: title,
        Creater: auth,
        Description: description,
        NumberParticipants: numberParticipants,
        Costs: costs,
        Messages: 0,
        GroupLength: groupLength,
        Members: firebase.firestore.FieldValue.arrayUnion(auth),
        Goal: option,
        StartDate: startdate,
        Online: [],
        Type: "Coachgroup", 
        CoverPhoto: coverPhoto
                }).then(() => {
                        const notice = document.createElement("p")

                        notice.innerHTML = "Je <u>groep</u> is aangemaakt!"

                        const buttonCoachGroup = document.getElementById("button-coachgroup")

                        buttonCoachGroup.appendChild(notice)

                        notice.style.cursor = "pointer"

                        notice.addEventListener("click", () => {
                            window.open(`../Group/${idClean + title}.html`, "_self");
                        });
                })
                .then(() => {
                    // sendMailToFollowers("Vitaminder", auth, authClean, title)
                    // sendMailToFollowers("Coach", auth, authClean, title)
                })
            });
        };
    });
};

function sendMailToFollowers(type, auth, authClean, title){

    db.collection("Vitaminders")
    .where("Usertype", "==", type)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const favoriteCoaches = doc.data().FavCoaches
            const gebruikersnaamClean = doc.data().GebruikersnaamClean
            const gebruikersnaam = doc.data().Gebruikersnaam
            const email = doc.data().Email

                if(favoriteCoaches != undefined){
        
                if(favoriteCoaches.includes(auth)){

                    db.collection("Mail").doc().set({
                        to: email,
                        cc: "info@vitaminds.nu",
                    message: {
                    subject: `Je favoriete coach ${authClean} is een nieuwe coachgroep gestart`,
                    html: `Hallo, ${gebruikersnaamClean}</br></br>
                    Je favoriete coach ${authClean} is een nieuwe coachgroep gestart op Vitaminds<br><br>
                        
                        Bekijk het artikel <a href="https://vitaminds.nu/Group/${title}.html"> hier </a>.<br><br> 
                    
                        Vriendelijke groet, </br></br>
                        Het Vitaminds Team </br></br>
                        <img src="https://vitaminds.nu/images/design/logo2021-red.png" width="100px" alt="Logo Vitaminds">`,
                    Type: "Vitaminders",
                    gebruikersnaam: gebruikersnaam
                    }
                            
                    }).catch((err) => {
                        console.log(err)
                    });
                };
            };
        });
    });
};



