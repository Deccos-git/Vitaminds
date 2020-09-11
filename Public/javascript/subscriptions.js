// Fetching title from url
const titelhtml = window.location.href.replace(/^.*[\\\/]/, '')
const titel1 = titelhtml.replace('.html', '')
const titel2 = titel1.replace('%20',' ')
const titel3 = titel2.replace('%20',' ')
const titel4 = titel3.replace('%20',' ')
const titel5 = titel4.replace('%20',' ')
const titel6 = titel4.replace('%20',' ')
const titel7 = titel6.replace('%20',' ')
const titel8 = titel7.replace('%20',' ')
const titel9 = titel8.replace('%20',' ')
const titel10 = titel9.replace('%20',' ')
const titel11 = titel10.replace('%20',' ')
const titel12 = titel11.split("?fb")
const titel = titel12[0]

auth.onAuthStateChanged(User =>{
    if (User){
        let docRef = db.collection("Vitaminders").doc(User.uid);
            docRef.get().then(function(doc){
                const auth = doc.data().Gebruikersnaam;
                const type = doc.data().Usertype

                if(titel === auth){

                    if(type === "Coach"){

                    }
                    
                }

            });
    };
});

function getCoachSubscription(){
    db.collection("Vitaminders").where("Gebruikersnaam", "==", titel)
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const subscription = doc.data().Subscription

            console.log(subscription)
        });
    });
} getCoachSubscription()

function getCoachGroupSubscription(){
    db.collection("Chats").where("Type", "==", "Coachgroup").get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {

            const members = doc.data().members
            const titleClean = doc.data().RoomClean

        })
    })
}