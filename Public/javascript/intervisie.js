const DOM = document.getElementById("casus-overview")

db.collection("Intervisie").where("Owner", "==", "Vitaminds").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        const titel = doc.data().Titel
        const coach = doc.data().CoachClean

        console.log(titel)
        console.log(coach)
    })
})