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

function getLocation(){

    const options = onlineOfflineSelect.options
    const option = options[options.selectedIndex].innerHTML;

    if (option === "Fysieke locatie"){

        locationEvent.style.display = "block"

    };
};

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
    const options = onlineOfflineSelect.options
    const option = options[options.selectedIndex].innerHTML;
    const eventBanner = document.getElementById("selected-header-img").src

    const dateEvent = `${dateDay.value}-${dateMonth.value}-${dateYear.value}`

    auth.onAuthStateChanged(User =>{
        db.collection("Vitaminders").doc(User.uid).get().then(doc => {
                const auth = doc.data().Gebruikersnaam
                const authClean = doc.data().GebruikersnaamClean

    db.collection("Events").doc().set({
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
        Type: "customerEvent",
        Owner: "Vitaminds"
                });
            });
        });
    });
};

// Events overview page

const eventsOverview = document.getElementById("events-overview")

db.collection("Events").where("Owner", "==", "Vitaminds")
.orderBy("Date", "desc")
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Title
        const date = doc.data().Date
        const eventBanner = doc.data().Banner
        const organizer = doc.data().Organizer

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

        dateEvent.innerText = date
        titleEvent.innerText = title
        bannerImg.src = eventBanner
        buttonEvent.innerHTML = `<a href="../eventpage/${title}.html">Meer informatie</a>`
        organiserEventDiv.addEventListener("click", () => {
            window.open("../Vitaminders/" + organizer, "_self");
        })

        db.collection("Vitaminders")
        .where("Gebruikersnaam", "==", organizer)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {
                const gebruikersnaamClean = doc1.data().GebruikersnaamClean
                const photo = doc1.data().Profielfoto

                organiserEventPhoto.src = photo
                organiserEventP.innerText = gebruikersnaamClean

            });
        });

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

// Events detail page

const eventOverview = document.getElementById("event-overview")

function registerForEvent(registerEventButton, titleEvent, organiserEvent, dateOfEvent, locationOfEvent, priceOfEvent){

    registerEventButton.addEventListener("click", () => {

        registerEventButton.innerText = "Aangemeld"

        db.collection("Events").where("Title", "==", titel).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {

                auth.onAuthStateChanged(User =>{
                    if(User){
                db.collection("Vitaminders").doc(User.uid).get().then(doc1 => {

                    const auth = doc1.data().Gebruikersnaam
                    const naamClean = doc1.data().GebruikersnaamClean
                    const email = doc1.data().Email

                db.collection("Events").doc(doc.id).update({
                    Participants: firebase.firestore.FieldValue.arrayUnion(auth)
                }).then(() => {

                    if(locationOfEvent === "Fysieke locatie"){
                        db.collection("Mail").doc().set({
                            to: [email],
                            cc: "info@vitaminds.nu",
                      message: {
                      subject: `Aangemeld voor ${titleEvent}`,
                      html: `Hallo ${naamClean}, </br></br>
                            Wat geweldig dat je je hebt aangemeld voor mijn evenement ${titleEvent}!<br><br> 
    
                            Ik zie je graag op ${dateOfEvent}. <br>
                            De locatie is: ${locationOfEvent}. </br></br>

                            Als je nog vragen hebt kun je mij altijd een berichtje sturen.</br></br>
                            
                            Vriendelijke groet, </br></br>
                            ${organiserEvent} </br></br>
                            <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                      Gebruikersnaam: naamClean,
                      Emailadres: email,
                      Type: "Coach"
                      }
                                    });
                                } else {
                                    db.collection("Mail").doc().set({
                                        to: [email],
                                        cc: "info@vitaminds.nu",
                                  message: {
                                  subject: `Aangemeld voor ${titleEvent}`,
                                  html: `Hallo ${naamClean}, </br></br>
                                        Wat geweldig dat je je hebt aangemeld voor mijn evenement ${titleEvent}!<br><br> 
                
                                        Ik zal je de link voor het evenement binnenkort toe sturen.<br>
                                        Ik stuur je binnenkort een factuur van ${priceOfEvent} voor de deelnemerskosten. <br><br>

                                        Tot ${dateOfEvent}! <br><br>
                                    
                                        Als je nog vragen hebt kun je mij altijd een berichtje sturen.<br><br>

                                        Vriendelijke groet, </br></br>
                                        ${organiserEvent} </br></br>
                                        <img src="https://vitaminds.nu/images/logo.png" width="100px" alt="Logo Vitaminds">`,
                                  Gebruikersnaam: naamClean,
                                  Emailadres: email,
                                  Type: "Coach"
                                  }
                                                });
                                            };
                            });
                        });
                    };
                });
            });
        });
    });
};

db.collection("Events").where("Title", "==", titel)
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

        const outerDiv = document.createElement("div")
            outerDiv.setAttribute("class", "event-detail-outer-div")
        const bannerImg = document.createElement("img")
        const organiserEventDiv = document.createElement("div")
            organiserEventDiv.setAttribute("class", "organizer-event-detail-div")
        const organiserEventPhoto = document.createElement("img")
        const organiserEventP = document.createElement("p")
        const organiserEventMessage = document.createElement("p")
            organiserEventMessage.setAttribute("class", "organiser-event-message")
        const dateEvent = document.createElement("p")
            dateEvent.setAttribute("class", "date-event")
        const titleEvent = document.createElement("h2")
        const descriptionEvent = document.createElement("p")
        const metaDiv = document.createElement("div")
            metaDiv.setAttribute("class", "meta-div-event-detail")
        const locationEvent = document.createElement("p")
        const maxParticipantsEvent = document.createElement("p")
        const currentParticipants = document.createElement("p")
        const priceEvent = document.createElement("p")
        const buttonEvent = document.createElement("button")
            buttonEvent.setAttribute("class", "button-algemeen")
            buttonEvent.setAttribute("id", "register-event-button")

        dateEvent.innerText = date
        titleEvent.innerText = title
        bannerImg.src = eventBanner
        buttonEvent.innerText = "Aanmelden"
        organiserEventMessage.innerText = "Als je vraag hebt over dit event kun je die altijd aan mij stellen."
        organiserEventDiv.addEventListener("click", () => {
            window.open("../Vitaminders/" + organizer, "_self");
        });
        descriptionEvent.innerText = description
        if(online === "Fysieke locatie"){
        locationEvent.innerHTML = `<b>Locatie:</b> ${location}` 
        } else {
            locationEvent.innerHTML = `<b>Locatie:</b> Online` 
        };

        maxParticipantsEvent.innerHTML = `<b>Maximale aantal deelnemers:</b> ${maxParticipants}`
        currentParticipants.innerHTML = `<b>Huidige aantal deelnemers:</b> ${participants.length}`
        priceEvent.innerHTML = `<b>Prijs:</b> €${price}`

        registerForEvent(buttonEvent, title, organiserClean, date, online, `€${price}`)

        db.collection("Vitaminders")
        .where("Gebruikersnaam", "==", organizer)
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc1 => {
                const gebruikersnaamClean = doc1.data().GebruikersnaamClean
                const photo = doc1.data().Profielfoto
                const email = doc1.data().Email

                organiserEventPhoto.src = photo
                organiserEventP.innerText = gebruikersnaamClean

            });
        });

        eventOverview.appendChild(outerDiv)
        outerDiv.appendChild(titleEvent)
        outerDiv.appendChild(organiserEventDiv)
        organiserEventDiv.appendChild(organiserEventMessage)
        organiserEventDiv.appendChild(organiserEventPhoto)
        organiserEventDiv.appendChild(organiserEventP)
        outerDiv.appendChild(bannerImg)
        outerDiv.appendChild(dateEvent)
        outerDiv.append(descriptionEvent)
        outerDiv.appendChild(metaDiv)
        metaDiv.appendChild(locationEvent)
        metaDiv.appendChild(maxParticipantsEvent)
        metaDiv.appendChild(currentParticipants)
        metaDiv.appendChild(priceEvent)
        outerDiv.appendChild(buttonEvent)
        
    });
});

