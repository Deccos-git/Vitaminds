function openTipsOverview(elem){

    const nextElement = elem.nextElementSibling
    
    if(nextElement.style.display === "block")
    nextElement.style.display = "none",
    elem.parentElement.style.width = "360px"
    else {
        nextElement.style.display = "block",
        elem.parentElement.style.width = "fit-content"
    };
};

function openTipDetails(elem){

    const nextElement = elem.parentElement.nextElementSibling

    if(nextElement.style.display === "block")
    nextElement.style.display = "none"
    else {
        nextElement.style.display = "block"
    };
};

function welcomeMessage(authUser){

    const welcomeMessageP = document.getElementById("auth-welcome")

    welcomeMessageP.innerHTML = `Hallo ${authUser},`

};

!function authQuery(){

    auth.onAuthStateChanged(User =>{
        if (User){
            const docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){

                    const auth = doc.data().GebruikersnaamClean

                    welcomeMessage(auth)

                });
            };
        });
}();

function newArticleSubmitButton(){

    const saveButton = document.getElementById("save-article-button")
    const title = document.getElementById("title-input").value
    const newBody = tinyMCE.get('tiny-mce').getContent()
    const domainSelectDiv = document.getElementById("theme-select")
    const inputs = domainSelectDiv.querySelectorAll("input")

    saveButton.innerText = "Opgeslagen"
    saveButton.setAttribute("onclick", "empty()")

    const inputsArray = Array.from(inputs)

    inputsArray.forEach(input => {

        if (input.checked) {
            const selectedInput = input.value    

            auth.onAuthStateChanged(User =>{
                if (User){
                    const docRef = db.collection("Vitaminders").doc(User.uid);
                        docRef.get().then(function(doc){

                            const auth = doc.data().Gebruikersnaam

                        db.collection("Articles").doc().set({
                            Author: auth,
                            Title: title,
                            Body: newBody,
                            Owner: "Vitaminds",
                            Status: "Draft",
                            Timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            Inspiratiepunten: 1,
                            Domain: selectedInput
                        });
                    });
                };
            });
        };
    });
};