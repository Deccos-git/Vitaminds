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

 console.log(naam)

 const adminDiv = document.getElementById("admin-analytics")
 const earningsDiv = document.getElementById("earnings-analytics")
 const tractionDiv = document.getElementById("traction-analytics")

 function showAdminAnalyticsForAdmin(adminType){
     if(adminType === "Yes"){
         adminDiv.style.display = "flex"
     }
 }

 function numberOfWebsiteClicks(amountOfClicks){

    const websiteClicksCard = document.getElementById("website-clicks")

    const numberOfClicks = document.createElement("p")
        numberOfClicks.setAttribute("class", "numbers-analytics")

    numberOfClicks.innerText = amountOfClicks

    websiteClicksCard.appendChild(numberOfClicks)
 };

 function numberOfProfileViews(amountOfViews){

    const profileViewsCard = document.getElementById("profile-views")

        const numberOfViews = document.createElement("p")
            numberOfViews.setAttribute("class", "numbers-analytics")

        numberOfViews.innerText = amountOfViews

        profileViewsCard.appendChild(numberOfViews)
 };

 function numberOfArticleViews(authCreator){

    const articleViewCard = document.getElementById("article-views")

    const numberOfViews = document.createElement("p")
        numberOfViews.setAttribute("class", "numbers-analytics")

    db.collection("Insights").where("Type", "==", "Insight-levensvraag")
    .where("Auteur", "==", authCreator)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const article = doc.data().LevensvraagArtikel

            db.collection("Levensvragen").where("Levensvraag", "==", article)
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc1 => {

                    const views = doc1.data().Views

                    numberOfViews.innerText = views

                    articleViewCard.appendChild(numberOfViews)
                });
            });
        });
    });
 };

 function numberOfWorkshopViews(authCoach){

    const workshopViewsCard = document.getElementById("workshop-views")

    const numberOfWorkshopViews = document.createElement("p")
        numberOfWorkshopViews.setAttribute("class", "numbers-analytics")

    db.collection("Workshops").where("Coach", "==", authCoach)
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const views = doc.data().Views

            numberOfWorkshopViews.innerText = views

            workshopViewsCard.appendChild(numberOfWorkshopViews)
        });
    });
 };

 function earnings(docReference){

    const earningsDiv = document.getElementById("earnings-inner-div")
    const earningsTotal = document.getElementById("total-earnings")
    const earningsTotalUnbilled = document.getElementById("total-earnings-unbilled")

    const unbilledAmountArray = []
    const amountArray = []

    docReference.collection("Earnings")
    .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const amount = doc.data().Earning
            const source = doc.data().Source
            const date = doc.data().Timestamp
            const billed = doc.data().Billed
            const billingDate = doc.data().BillingDate

            const card = document.createElement("div")
                card.setAttribute("class", "analytics-card")
            const amountP = document.createElement("p")
                amountP.setAttribute("class", "numbers-analytics")
            const sourceP = document.createElement("p")
            const dateP = document.createElement("p")
                dateP.setAttribute("id", "date-p")
            const billedP = document.createElement("p")

            // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            //     billingDate.innerHTML = date.toDate().toLocaleDateString("nl-NL", options);

            if(billed === "No"){
                billedP.innerText = "Niet gefacturereerd"
            } else if (billed === "Yes"){
                billedP.innerText = `Gefactureerd op ${billingDate}`
            }

            amountP.innerText = `€${amount}`
            sourceP.innerHTML = source
            const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                dateP.innerHTML = date.toDate().toLocaleDateString("nl-NL", optionsDate);
            
            earningsDiv.appendChild(card)
            card.appendChild(amountP)
            card.appendChild(sourceP)
            card.appendChild(dateP)

            // Total earnings
            amountArray.push(amount)

            const sum = amountArray.reduce((pv, cv) => pv + cv, 0);

            earningsTotal.innerText = `€${sum}`

            // Total unbilled earnings 
            docReference.collection("Earnings")
            .where("Billed", "==", "No")
            .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {

                    const amountUnbilled = doc.data().Earning

            unbilledAmountArray.push(amountUnbilled)

            const sumUnbilled = unbilledAmountArray.reduce((pv, cv) => pv + cv, 0);

            earningsTotalUnbilled.innerText = `€${sumUnbilled}`

                });
            });
        });
    });
 }

 auth.onAuthStateChanged(User =>{
    if (User){
        const docRef = db.collection("Vitaminders").doc(User.uid);
            docRef.get().then(function(doc){

                const auth = doc.data().Gebruikersnaam
                const admin = doc.data().Admin
                const websiteClicks = doc.data().WebsiteClicks
                const profileViews = doc.data().ProfileViews

                if(auth === naam){

                    showAdminAnalyticsForAdmin(admin)
                    numberOfWebsiteClicks(websiteClicks)
                    numberOfProfileViews(profileViews)
                    numberOfArticleViews(auth)
                    numberOfWorkshopViews(auth)
                    earnings(docRef)

                }

            });
        };
    });
