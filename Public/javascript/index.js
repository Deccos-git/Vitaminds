var openen = document.getElementById("open-up");
var insp = document.getElementById("inspiratie");
// var act = document.getElementById("activiteiten");
var coach = document.getElementById("coaching");

window.onload = function(){
        openen.style.display = "block";
        insp.style.display = "none";
        // act.style.display = "none";
        coach.style.display = "none";   
}

function openup(){
        openen.style.display = "block";
        insp.style.display = "none";
        // act.style.display = "none";
        coach.style.display = "none";
}

function inspiratie(){
        insp.style.display = "block";
        openen.style.display = "none";
        // act.style.display = "none";
        coach.style.display = "none";
}

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
}

// Cookies notice

const cookieDiv = document.getElementById("cookie-notice")

function cookiesOK(){
      localStorage.setItem("Cookies", "OK")
        cookieDiv.style.display = "none"
}

const cookies = localStorage.getItem("Cookies")

if(cookies == "OK"){
        cookieDiv.style.display = "none"
}

// Main header select

const select = document.getElementById("main-header-select")

db.collection("Levensvragen").where("Eigenaar", "==", "Vitaminds").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
    
            const title = doc.data().Levensvraag

            const option = document.createElement("option")

            option.innerHTML = title

            select.appendChild(option)

        })
});

function start(){

        const select = document.getElementById("main-header-select")

        const selectOption = select.options
        const selectSelect = selectOption[selectOption.selectedIndex].innerHTML;

        window.open("../Artikelen/" + selectSelect + ".html", "_self")
}

