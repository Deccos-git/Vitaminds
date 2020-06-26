var openen = document.getElementById("open-up");
var insp = document.getElementById("inspiratie");
// var act = document.getElementById("activiteiten");
var coach = document.getElementById("coaching");

if(openen != null || insp != null || coach != null){

        window.onload = function(){
                openen.style.display = "block";
                insp.style.display = "none";
                // act.style.display = "none";
                coach.style.display = "none";   
        };

        function openup(){
                openen.style.display = "block";
                insp.style.display = "none";
                // act.style.display = "none";
                coach.style.display = "none";
        };

        function inspiratie(){
                insp.style.display = "block";
                openen.style.display = "none";
                // act.style.display = "none";
                coach.style.display = "none";
        };

        // function activiteiten(){
        //         act.style.display = "block";
        //         openen.style.display = "none";
        //         insp.style.display = "none";
        //         coach.style.display = "none";
        // }

        function coaching(){
                coach.style.display = "block";
                openen.style.display = "none";
                insp.style.display = "none";
                // act.style.display = "none";
        };
};

// Cookies notice

const cookieDiv = document.getElementById("cookie-notice")

function cookiesOK(){
      localStorage.setItem("Cookies", "OK")
        cookieDiv.style.display = "none"
}

const cookies = localStorage.getItem("Cookies")

if(cookies == "OK"){
        if(cookieDiv != null){
        cookieDiv.style.display = "none"
        };
}

// Main header CTA

      
        const startButton = document.getElementById("button-start")
        const select = document.getElementById("main-header-select")

        // Examples

        if(select != null || startButton != null){

                db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                
                        const title = doc.data().Levensvraag
                        const insights = doc.data().Insights

                        const option = document.createElement("option")

                        option.innerHTML = title

                        if (insights.length > 0){
                                select.appendChild(option)
                                };
                        })
                });
        };

// Goal in localstorage

const selectGoal = document.getElementById("main-header-select")

function start(){

        // Auth 
auth.onAuthStateChanged(User =>{
if(User){
        db.collection("Vitaminders").doc(User.uid).get().then(function(doc) {
        const auth = doc.data().Gebruikersnaam;

        const select = selectGoal.options
        const option = select[select.selectedIndex].innerHTML
        localStorage.setItem("Goal", option);
        window.open("../Vitaminders/" + auth + ".html", "_self");    

        });
} else {
        // No auth (visitor)
        const select = selectGoal.options
        const option = select[select.selectedIndex].innerHTML
        localStorage.setItem("Goal", option);
        window.open("../Inspiratie.html", "_self")
          };
      });
};


