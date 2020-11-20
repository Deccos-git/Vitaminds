// Make new event 

const saveNewEventButton = document.getElementById("button-save-new-event")

const titleEvent = document.getElementById("title-input")
const onlineOfflineSelect = document.getElementById("online-live-select")
const locationEvent = document.getElementById("location-event")
const descriptionEvent = document.getElementById("textarea-description")
const dateEvent = document.getElementById("date-event")
const maxParticipants = document.getElementById("max-participants")
const priceEvent = document.getElementById("price-event")

function getLocation(){

    const options = onlineOfflineSelect.options
    const option = options[options.selectedIndex].innerHTML;

    if (option === "Fysieke locatie"){

        locationEvent.style.display = "block"

    };
};

saveNewEventButton.addEventListener("click", () => {

    saveNewEventButton.innerText = "Opgeslagen"
    const options = onlineOfflineSelect.options
    const option = options[options.selectedIndex].innerHTML;

    db.collection("Events").doc().set({
        Title: titleEvent.value,
        Description: descriptionEvent.value,
        Date: dateEvent.value,
        MaxParticipants: maxParticipants.value,
        Price: priceEvent.value,
        Location: locationEvent.value,
        Online: option,
        Owner: "Vitaminds"
    });
});

// Events overview page

const eventsOverview = document.getElementById("events-overview")

db.collection("Events").where("Owner", "==", "Vitaminds")
.orderBy("Date", "desc")
.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {

        const title = doc.data().Title
        const description = doc.data().Description
        const date = doc.data().Date
        const maxParticipants = doc.data().MaxParticipants
        const price = doc.data().Price
        const location = doc.data().Location
        const online = doc.data().Online

        
    });
});