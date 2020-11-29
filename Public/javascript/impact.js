// Hapiness chart added

const hapinessChart = document.getElementById('hapiness-chart-added').getContext('2d');
function hapinessChartAxis(dates, heightOfHapiness){

const myChart = new Chart(hapinessChart, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Geluksniveau',
                data: heightOfHapiness,
                backgroundColor: [
                        "rgba(18, 42, 69, 0.21)"
                ],
                borderColor: [
                        "#122b46"
                ],
                borderWidth: 1
            }]
        },
        options: {
                legend: {
                        display: false
                },   
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(label, index, labels) {
                                // when the floored value is the same as the value we have a whole number
                                if (Math.floor(label) === label) {
                                    return label;
                                }
                        }
                    }
                }]
            }
        }
    });
};

const dateArray = []
const heightArray = []


db.collectionGroup("HapinessScale")
.where("Eigenaar", "==", "Vitaminds")
.orderBy("Timestamp", "asc")
.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

        const height = doc.data().Height
        const date = doc.data().Timestamp

        console.log(height)

        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const dateLocale = date.toDate().toLocaleDateString("nl-NL", options);

        dateArray.push(dateLocale) 
        heightArray.push(height)

        hapinessChartAxis(dateArray, heightArray)

        });
});
