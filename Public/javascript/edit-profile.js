// Profiel aanpassen

    // Edit profile information
    auth.onAuthStateChanged(User =>{
        if (User){
            let docRef = db.collection("Vitaminders").doc(User.uid);
                docRef.get().then(function(doc){
                    const coachNaam = doc.data().Gebruikersnaam;
                    const website = doc.data().Website;
                    const phoneNumber = doc.data().PhoneNumber
                    const city = doc.data().City
                    const street = doc.data().Street
                    const targetgroup = doc.data().Targetgroup
                    const coachingstyle = doc.data().Coachingstyle
                    const yearsExperience = doc.data().YearsExperience
                    const abilities = doc.data().Abilities
                    const why = doc.data().Why;
                    const approach = doc.data().Approach;
                    const ecudation = doc.data().Ecudation;
                    const experience = doc.data().Experience;
                    const costs = doc.data().Costs;

                // H1 aanpassen
                    const h1 = document.getElementById("edit-profile-auth")
                    if(h1 == null){
                        console.log("Error")
                    } else {
                    h1.innerHTML = `Digimind van ${coachNaam} aanpassen`
                    }

                //  Current profile info
                function currentInfo(a,b,c){
                        const current = document.getElementById(a)
                        if(current == null){
                                console.log("Error")
                        } else {
                                if(b == undefined){
                                        current.innerHTML = `<h6 class="current-empty">${c}</h6>`
                                } else {
                                        current.innerHTML = `<h6>${b}</h6>`
                                }
                        }
                }          
                                // Webiste
                currentInfo("current-website", website, "Nog geen website")
                                // Phonenumber
                currentInfo("current-phonenumber", phoneNumber, "Nog geen telefoonnummer")
                                // City
                currentInfo("current-city", city, "Nog geen stad")
                                // Adress
                currentInfo("current-street", street, "Nog geen straat en huisnummer")                
                                // Doelgroep
                currentInfo("current-targetgroup", targetgroup, "Nog geen specialisatie")
                                // Coachstijl
                 currentInfo("current-coachingstyle", coachingstyle, "Nog geen coachstijl")
                                // Aantal jaren ervaring
                currentInfo("current-years-experience", yearsExperience, "Nog geen jaren ervaring")
                                // Waar ik mee kan helpen
                currentInfo("current-abilities", abilities, "Nog geen hulp")
                                // Waarom ik coach ben geworden
                currentInfo("current-why", why, "Nog geen missie")
                                // Werkwijze
                currentInfo("current-approach", approach, "Nog geen aanpak")
                                // Opleidingen & certificaten
                currentInfo("current-education", ecudation, "Nog geen opleidingen & certificaten")
                                // Relevante ervaringen
                currentInfo("current-experience", experience, "Nog geen relevante ervaringen")
                                // Kosten
                currentInfo("current-costs", costs, "Nog geen prijs")
                
                // Input verwerken in database en inladen in DOM
                        const save = document.getElementById("save-profile")
                        if(save == null){
                                console.log("Error")
                        } else {
                                save.addEventListener("click", () => {
                                        const inputWebsite = document.getElementById("coach-website-input").value
                                        const inputPhone = document.getElementById("coach-phone-input").value
                                        const inputCity = document.getElementById("coach-city-input").value
                                        const inputStreet = document.getElementById("coach-street-input").value
                                        const inputTargetgroup = document.getElementById("coach-targetgroup-input").value
                                        const inputCoachingstyle = document.getElementById("coach-coachingstyle-input").value
                                        const inputYearsExperience = document.getElementById("coach-years-experience-input").value
                                        const inputAbilities = document.getElementById("coach-abilities-input").value
                                        const inputWhy = document.getElementById("coach-why-input").value
                                        const inputApproach = document.getElementById("coach-approach-input").value
                                        const inputEducation = document.getElementById("coach-education-input").value
                                        const inputExperience = document.getElementById("coach-experience-input").value
                                        const inputCosts = document.getElementById("coach-costs-input").value

                                        if(inputWebsite == ""){
                                        console.log("Website is empty string")
                                        } else {
                                               docRef.update({
                                                Website: inputWebsite
                                               })
                                        }

                                        if(inputPhone == ""){
                                                console.log("Phone is empty string")
                                                } else {
                                                       docRef.update({
                                                        PhoneNumber: inputPhone
                                                       })
                                                }
                                        if(inputCity == ""){
                                                console.log("City is empty string")
                                                } else {
                                                        docRef.update({
                                                        City: inputCity
                                                        })
                                                }

                                        if(inputStreet == ""){
                                                console.log("Street is empty string")
                                                } else {
                                                        docRef.update({
                                                        Street: inputStreet
                                                        })
                                                }
                                        if(inputTargetgroup == ""){
                                                console.log("Targetgroup is empty string")
                                                } else {
                                                        docRef.update({
                                                        Targetgroup: inputTargetgroup
                                                        })
                                                }
                                        if(inputCoachingstyle == ""){
                                                console.log("Coachingstyle is empty string")
                                                } else {
                                                        docRef.update({
                                                        Coachingstyle: inputCoachingstyle
                                                        })
                                                }
                                        if(inputYearsExperience == ""){
                                                console.log("Years experience is empty string")
                                                } else {
                                                        docRef.update({
                                                        YearsExperience: inputYearsExperience
                                                        })
                                                }
                                        if(inputAbilities == ""){
                                                console.log("Abilities is empty string")
                                                } else {
                                                        docRef.update({
                                                        Abilities: inputAbilities
                                                        })
                                                }
                                        if(inputWhy == ""){
                                                console.log("Why is empty string")
                                                } else {
                                                        docRef.update({
                                                        Why: inputWhy
                                                        })
                                                }
                                        if(inputApproach == ""){
                                                console.log("Approach is empty string")
                                                } else {
                                                        docRef.update({
                                                        Approach: inputApproach
                                                        })
                                                }
                                        if(inputEducation == ""){
                                                console.log("Education is empty string")
                                                } else {
                                                        docRef.update({
                                                        Ecudation: inputEducation
                                                        })
                                                }
                                        if(inputExperience == ""){
                                                console.log("Experience is empty string")
                                                } else {
                                                        docRef.update({
                                                        Experience: inputExperience
                                                        })
                                                }
                                        if(inputCosts == ""){
                                                console.log("Costs is empty string")
                                                } else {
                                                        docRef.update({
                                                        Costs: inputCosts
                                                        })
                                                }
                                })
                        }
                })
        }
});

    // Profielfoto
    function showChangeProfilePicture(){
            const profielfotoAanpassenDiv = document.getElementById("profielfoto-aanpassen")
            profielfotoAanpassenDiv.style.display = "block"
    }

    function changeProfilePicture(){
            const uploadProfilePic = document.getElementById("foto-upload-div")
            uploadProfilePic.style.display = "flex"
    }

    function uploadFile(){

        auth.onAuthStateChanged(User =>{
                if (User){
                    db.collection("Vitaminders").doc(User.uid).get().then(doc =>{     
                                    const id = doc.id
    
                        const docRef = db.collection("Vitaminders").doc(id);
                           
    const selectedFile = document.getElementById('foto-upload').files[0];

    const storageRef = firebase.storage().ref("/Profielfotos/" + selectedFile.name);

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
        console.log('Upload is ' + progress + '% done');
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
          docRef.update({
                        Profielfoto: downloadURL
                                                        }) 
                                                })
                                                // .then(()=>{
                                                //         location.reload();
                                                // })       
                                        })
                                })
                        })
                }
        })    
};


