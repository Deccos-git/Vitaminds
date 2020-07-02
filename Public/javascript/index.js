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

// Dynamic call to action


const dynamicH2 = document.getElementById("dynamic-call-to-action")
const dynamicH2Dots = document.getElementById("dynamic-title-dots")

if(dynamicH2 != null && dynamicH2Dots != null){

setTimeout(() => {
dynamicH2.innerHTML = "Posiviteit"
},0)

        // Count down
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "."
        },500)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = ".."
        },1000)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "..."
        },2000)

setTimeout(() => {
        dynamicH2.innerHTML = "Geluk"
        dynamicH2Dots.innerHTML = ""
},3000)

        // Count down
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "."
        },3500)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = ".."
        },4000)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "..."
        },5000)

setTimeout(() => {
        dynamicH2.innerHTML = "Je eigen leven leven"
        dynamicH2Dots.innerHTML = ""
},6000)

        // Count down
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "."
        },6500)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = ".."
        },7000)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "..."
        },8000)

setTimeout(() => {
        dynamicH2.innerHTML = "Los laten"
        dynamicH2Dots.innerHTML = ""
},9000)

         // Count down
         setTimeout(() =>{
                dynamicH2Dots.innerHTML = "."
        },9500)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = ".."
        },10000)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "..."
        },11000)

setTimeout(() => {
        dynamicH2.innerHTML = "Je eigen keuzes maken"
        dynamicH2Dots.innerHTML = ""
},12000)

        // Count down
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "."
        },12500)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = ".."
        },13000)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "..."
        },14000)

setTimeout(() => {
        dynamicH2.innerHTML = "Weten wat je wilt"
        dynamicH2Dots.innerHTML = ""
},15000)

        // Count down
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "."
        },15500)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = ".."
        },16000)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "..."
        },17000)
        

setTimeout(() => {
        dynamicH2.innerHTML = "Rust in je hoofd"
        dynamicH2Dots.innerHTML = ""
},18000)

        // Count down
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "."
        },18500)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = ".."
        },19000)
        setTimeout(() =>{
                dynamicH2Dots.innerHTML = "..."
        },20000)
        

setTimeout(() => {
        dynamicH2.innerHTML = "Waar wil jij je op focusen?"
        dynamicH2Dots.innerHTML = ""

        const CTAsubHeader = document.getElementById("call-to-action-sub-header")
        CTAsubHeader.style.display = "none"
},21000)
};





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
        window.open("../inspiratie.html", "_self")
          };
      });
};


