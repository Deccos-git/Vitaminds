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

function goalExample(a,b){

        setTimeout(() => {
                dynamicH2.innerHTML = a
                dynamicH2Dots.innerHTML = ""
                },b)
};

goalExample("Posiviteit", 0)
goalExample("Geluk", 3000)
goalExample("Je eigen leven leven", 6000)
goalExample("Los laten", 9000)
goalExample("Je eigen keuzes maken", 12000)
goalExample("Weten wat je wilt", 15000)
goalExample("Rust in je hoofd", 18000)
goalExample("Waar wil jij je op focussen?", 21000)
setTimeout(() => {
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

function start(elem){
        const goalSelect = elem.previousElementSibling
        const select = goalSelect.options
        const option = select[select.selectedIndex].innerHTML

        window.open(`../Artikelen/${option}.html`, "_self")
}


