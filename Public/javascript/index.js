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

