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

console.log(titel)

// Open make new event
!function makeNewEvent(){
    const makeNewEventButton = document.getElementById("create-new-coach-event")

    if(makeNewEventButton != null){

            auth.onAuthStateChanged(User =>{
                if(User){
                const userRef = db.collection("Vitaminders").doc(User.uid);
                userRef.get().then(function(doc) {

                    const admin = doc.data().Admin

                    if(admin === "Yes"){
                        makeNewEventButton.style.display = "block"
                    };
                });
            };
        });
    }; 
}();

// Make new event 

const saveNewEventButton = document.getElementById("button-save-new-event")

const titleEvent = document.getElementById("title-input")
const onlineOfflineSelect = document.getElementById("online-live-select")
const locationEvent = document.getElementById("location-event")
const descriptionEvent = document.getElementById("textarea-description")
const dateDay = document.getElementById("date-day")
const dateMonth = document.getElementById("date-month")
const dateYear = document.getElementById("date-year")
const maxParticipants = document.getElementById("max-participants")
const priceEvent = document.getElementById("price-event")

!function getLocation(){

    if(onlineOfflineSelect != null){

        const options = onlineOfflineSelect.options
        const option = options[options.selectedIndex].innerHTML;

        if (option === "Fysieke locatie"){

            locationEvent.style.display = "block"

        };
    };
}();

const uploadbutton = document.getElementById("upload-banner") 

if(uploadbutton != null){

uploadbutton.addEventListener("click", () => {

    uploadbutton.innerText = "Uploaden"

    const selectedFile = document.getElementById('foto-upload-new-event').files[0];

    const storageRef = firebase.storage().ref("/Event-banners/" + selectedFile.name);

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

    const selectedImage = document.getElementById("selected-header-img")

    selectedImage.src = downloadURL

    uploadbutton.innerText = "Geupload"

    });
    });
    });
});
};

if(saveNewEventButton != null){

saveNewEventButton.addEventListener("click", () => {

    saveNewEventButton.innerText = "Opgeslagen"
    saveNewEventButton.id = "Clicked"
    const options = onlineOfflineSelect.options
    const option = options[options.selectedIndex].innerHTML;
    const eventBanner = document.getElementById("selected-header-img").src

    const dateEvent = `${dateDay.value}-${dateMonth.value}-${dateYear.value}`

    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                const auth = doc.data().Gebruikersnaam
                const authClean = doc.data().GebruikersnaamClean

    db.collection("EventsCoaches").doc().set({
        Organizer: auth,
        OrganizerClean: authClean,
        Title: titleEvent.value,
        Description: descriptionEvent.value,
        Date: dateEvent,
        DateDay: dateDay.value,
        Participants: [],
        DateMonth: dateMonth.value,
        DateYear: dateYear.value,
        MaxParticipants: maxParticipants.value,
        Price: priceEvent.value,
        Location: locationEvent.value,
        Online: option,
        Banner: eventBanner,
        Type: "coachEvent",
        Owner: "Vitaminds"
                });
            });
        });
    });
};

// Events overview page

function organizerMeta(organizer, organiserEventPhoto, organiserEventP){
    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", organizer)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const gebruikersnaamClean = doc.data().GebruikersnaamClean
            const photo = doc.data().Profielfoto

            organiserEventPhoto.src = photo
            organiserEventP.innerText = gebruikersnaamClean

        });
    });
};

!function eventsOverview(){
const eventsOverview = document.getElementById("events-outer-div")

if (eventsOverview != null){

    db.collection("EventsCoaches")
    .where("Owner", "==", "Vitaminds")
    .orderBy("Date", "desc")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            console.log("test")

            const title = doc.data().Title
            const date = doc.data().Date
            const eventBanner = doc.data().Banner
            const organizer = doc.data().Organizer
            const titleID = doc.data().TitleID

            const outerDiv = document.createElement("div")
                outerDiv.setAttribute("class", "event-outer-div")
            const bannerImg = document.createElement("img")
            const organiserEventDiv = document.createElement("div")
                organiserEventDiv.setAttribute("class", "organizer-event-div")
            const organiserEventPhoto = document.createElement("img")
            const organiserEventP = document.createElement("p")
            const dateEvent = document.createElement("p")
                dateEvent.setAttribute("class", "date-event")
            const titleEvent = document.createElement("h2")
            const buttonEvent = document.createElement("button")
                buttonEvent.setAttribute("class", "button-algemeen")
                buttonEvent.setAttribute("id", "button-event-overview")

            dateEvent.innerText = date
            titleEvent.innerText = title
            bannerImg.src = eventBanner
            buttonEvent.innerHTML = `<a href="../eventCoaches/${title}.html">Meer informatie</a>`
            organiserEventDiv.addEventListener("click", () => {
                window.open("../Vitaminders/" + organizer, "_self");
            });

            organizerMeta(organizer, organiserEventPhoto, organiserEventP)

            eventsOverview.appendChild(outerDiv)
            outerDiv.appendChild(bannerImg)
            outerDiv.appendChild(organiserEventDiv)
            organiserEventDiv.appendChild(organiserEventPhoto)
            organiserEventDiv.appendChild(organiserEventP)
            outerDiv.appendChild(titleEvent)
            outerDiv.appendChild(dateEvent)
            outerDiv.appendChild(buttonEvent)

        });
    });
    };
}();

// Events detail page

function registerNoticeWhenNoAccount(registerEventButton, DOM){

    auth.onAuthStateChanged(User =>{
        if(User){
          
        } else {

            registerEventButton.addEventListener("click", () => {

                registerEventButton.style.display = "none"

                const registerNotice = document.createElement("p")
                    registerNotice.setAttribute("class", "event-notice")

                registerNotice.innerHTML = `Maak een gratis <a href="../aanmelden-coach.html">account</a> aan om je aanmelden voor dit event`

                DOM.appendChild(registerNotice)
            });
        };
    });
};

const eventOverview = document.getElementById("event-overview")

function registerForEvent(registerEventButton, titleEvent, organiserEvent, dateOfEvent, locationOfEvent, priceOfEvent, emailCoach){

    const confirmationNotice = document.getElementById("confirmation-message")

    registerEventButton.addEventListener("click", () => {

        registerEventButton.innerText = "Aangemeld"
        registerEventButton.setAttribute("class", "button-registered")

        db.collection("EventsCoaches").where("Title", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                auth.onAuthStateChanged(User =>{
                    if(User){
                db.collection("Vitaminders").doc(User.uid).get().then(doc1 => {

                    const auth = doc1.data().Gebruikersnaam
                    const naamClean = doc1.data().GebruikersnaamClean
                    const email = doc1.data().Email

                db.collection("EventsCoaches").doc(doc.id).update({
                    Participants: firebase.firestore.FieldValue.arrayUnion(auth)
                }).then(() => {

                    if(locationOfEvent === "Fysieke locatie"){

                        console.log("fysieke locatie")

                        db.collection("Mail").doc().set({
                            to: [email],
                            cc: [emailCoach],
                            bcc: "info@vitaminds.nu",
                      message: {
                      subject: `Aangemeld voor ${titleEvent}`,
                      html: `Hallo ${naamClean}, </br></br>
                            Leuk dat je je hebt aangemeld voor ${titleEvent}!<br><br> 
    
                            Ik zie je graag op ${dateOfEvent}. <br>
                            De locatie is: ${locationOfEvent}. </br></br>

                            Als je nog vragen hebt kun je mij altijd een berichtje sturen.</br></br>
                            
                            Vriendelijke groet, </br></br>
                            ${organiserEvent} </br></br>
                            <img src="../images/Logo2021-red" width="100px" alt="Logo Vitaminds">`,
                      Gebruikersnaam: naamClean,
                      Emailadres: email,
                      Type: "Event"
                      }
                                    });
                                } else {

                                    console.log("online")

                                    db.collection("Mail").doc().set({
                                        to: [email],
                                        cc: [emailCoach],
                                        bcc: "info@vitaminds.nu",
                                  message: {
                                  subject: `Aangemeld voor ${titleEvent}`,
                                  html: `Hallo ${naamClean}, </br></br>
                                        Leuk dat je je hebt aangemeld voor mijn evenement ${titleEvent}!<br><br> 
                
                                        In de loop naar ${dateOfEvent} ontvang je per mail een bevestiging en de link om deel te nemen.<br>

                                        Tot dan! <br><br>
                                    
                                        Als je nog vragen hebt kun je mij altijd een berichtje sturen.<br><br>

                                        Vriendelijke groet, </br></br>
                                        ${organiserEvent} </br></br>
                                        <img src="../images/Logo2021-red.png" width="100px" alt="Logo Vitaminds">`,
                                  Gebruikersnaam: naamClean,
                                  Emailadres: email,
                                  Type: "Event"
                                  }
                                    });
                                };
                            })
                            .then(() => {
                                confirmationNotice.style.display = "block"
                            });
                        });
                    };
                });
            });
        });
    });
};

function editDescriptionEvent(dom, descriptionDiv){

    const editIcon = document.createElement("img")
        editIcon.setAttribute("id", "edit-icon-event-description")
    editIcon.scr = "../images/edit-icon.png"

    const tinyMCEDiv = document.getElementById("tiny-mce-div")

    displayEditIconIfAuthIsAdmin(editIcon)

    dom.appendChild(editIcon)

    editIcon.addEventListener("click", () => {

        tinyMCEDiv.style.display = "block"
        descriptionDiv.style.display = "none"

        db.collection("EventsCoaches").where("Title", "==", titel)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const description = doc.data().Description

                    tinymce.get("tiny-mce").setContent(description);

            });
        });
    });
};

function displayEditIconIfAuthIsAdmin(editIcon){

    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders").doc(User.uid)
        .get().then(doc => {

            const admin = doc.data().Admin

            if(admin === "Yes"){

                editIcon.style.display = "block"

            };
        });
    });
};

!function saveEditedDescription(){

    const button = document.getElementById("button-edit-event-description")

    if(button != null){

        button.addEventListener("click", () => {

            const description = tinymce.get("tiny-mce").getContent();

            button.innerText = "Opgeslagen"
            button.id = "Clicked"

            db.collection("EventsCoaches").where("Title", "==", titel)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    db.collection("EventsCoaches").doc(doc.id).update({
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

function linkToOrganiser(organiserEventDiv, organizer){

    if(organiserEventDiv != null){

        organiserEventDiv.addEventListener("click", () => {
            window.open("../Vitaminders/" + organizer, "_self");
        });
    };
};

function locationOnlineOffline(online,locationEvent, location){

    if(online === "Fysieke locatie"){
        locationEvent.innerHTML = `<b>Locatie:</b> ${location}` 
        } else {
            locationEvent.innerHTML = `<b>Locatie:</b> Online` 
        };
};

function organizerMetaDetail(organizer, organiserEventPhoto, organiserEventP, buttonEvent, title, date, online, price){

    db.collection("Vitaminders")
    .where("Gebruikersnaam", "==", organizer)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc1 => {
            const gebruikersnaamClean = doc1.data().GebruikersnaamClean
            const photo = doc1.data().Profielfoto
            const email = doc1.data().Email

            organiserEventPhoto.src = photo
            organiserEventP.innerText = gebruikersnaamClean

            
        registerForEvent(buttonEvent, title, gebruikersnaamClean, date, online, `€${price}`, email)

        });
    });
};

// Meta tags
function setMetaAttributesArticle(description){
    const titleMeta = document.getElementById("page-title")
    const summaryMeta = document.getElementById("meta-description")
    const metaKeywords = document.getElementById("meta-keywords")
    const facebookDescription = document.getElementById("facebook-description")
    const facebookUrl = document.getElementById("facebook-url")
    const facebookTitle = document.getElementById("facebook-title")
    const facebookImg = document.getElementById("facebook-img")

    if(titleMeta != null || summaryMeta != null || metaKeywords != null || facebookDescription != null || facebookUrl != null || facebookTitle != null|| facebookImg != null){
       
        titleMeta.innerText = titel
        summaryMeta.content = description
        metaKeywords.content = titel
        facebookDescription.content = titel
        facebookUrl.content = window.location.href
        facebookTitle.content = titel
    
        db.collection("EventsCoaches").where("Title", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
    
                const headerImage = doc.data().Banner
    
                facebookImg.content = headerImage
            
            });
        });
    };
};

!function eventDetailQuery(){

    const outerDiv = document.getElementById("event-detail-outer-div")

    if(outerDiv != null){

        db.collection("EventsCoaches").where("Title", "==", titel)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                const title = doc.data().Title
                const description = doc.data().Description
                const date = doc.data().Date
                const maxParticipants = doc.data().MaxParticipants
                const price = doc.data().Price
                const location = doc.data().Location
                const online = doc.data().Online
                const eventBanner = doc.data().Banner
                const organizer = doc.data().Organizer
                const organiserClean = doc.data().OrganizerClean
                const participants = doc.data().Participants

                const organiserEventDiv = document.getElementById("organizer-event-detail-div")
                const organiserEventPhoto = document.createElement("img")
                const organiserEventP = document.createElement("p")
                const organiserEventMessage = document.createElement("p")
                    organiserEventMessage.setAttribute("class", "organiser-event-message")
                const bannerImg = document.createElement("img")
                    bannerImg.setAttribute("class", "event-banner")
                const dateEvent = document.createElement("p")
                    dateEvent.setAttribute("class", "date-event")
                const titleEvent = document.createElement("h2")
                const descriptionDiv = document.getElementById("event-description-div")
                const descriptionEvent = document.createElement("p")
                    descriptionEvent.setAttribute("id", "event-description")
                const metaDiv = document.getElementById("meta-div-event-detail")
                const locationEvent = document.createElement("p")
                const maxParticipantsEvent = document.createElement("p")
                const currentParticipants = document.createElement("p")
                const priceEvent = document.createElement("p")
                const buttonDiv = document.createElement("div")
                const buttonEvent = document.createElement("button")
                    buttonEvent.setAttribute("class", "button-algemeen")
                    buttonEvent.setAttribute("id", "register-event-button")

                registerNoticeWhenNoAccount(buttonEvent, buttonDiv)
                organizerMetaDetail(organizer, organiserEventPhoto, organiserEventP, buttonEvent, title, date, online)
                dateEvent.innerText = date
                titleEvent.innerText = title
                bannerImg.src = eventBanner
                buttonEvent.innerText = "Aanmelden"
                locationOnlineOffline(online,locationEvent, location)
                descriptionEvent.innerHTML = description
                linkToOrganiser(organiserEventDiv, organizer)
                maxParticipantsEvent.innerHTML = `<b>Maximale aantal deelnemers:</b> ${maxParticipants}`
                currentParticipants.innerHTML = `<b>Huidige aantal deelnemers:</b> ${participants.length}`
                priceEvent.innerHTML = `<b>Prijs:</b> €${price}`

                setMetaAttributesArticle(description)

                outerDiv.appendChild(titleEvent)
                outerDiv.appendChild(organiserEventDiv)
                organiserEventDiv.appendChild(organiserEventMessage)
                organiserEventDiv.appendChild(organiserEventPhoto)
                organiserEventDiv.appendChild(organiserEventP)
                outerDiv.appendChild(bannerImg)
                outerDiv.appendChild(dateEvent)
                outerDiv.appendChild(descriptionDiv)
                editDescriptionEvent(outerDiv, descriptionEvent)
                descriptionDiv.append(descriptionEvent)
                outerDiv.appendChild(metaDiv)
                metaDiv.appendChild(locationEvent)
                metaDiv.appendChild(maxParticipantsEvent)
                metaDiv.appendChild(currentParticipants)
                metaDiv.appendChild(priceEvent)
                metaDiv.appendChild(buttonDiv)
                buttonDiv.appendChild(buttonEvent)
                
            });
        });
    };
}();
