// Hämta nödvändiga element

// Arrayer för respektive område innehållande kvadratmeterpris för senaste 5 åren i ordningen [2014,2015,2016,2017,2018]
const Place11122 = [74790,89261,94811,98494,93084];
const Place22222 = [24361,27320,29922,35750,35920];
const Place33333 = [3760,4465,4203,5247,6617];

// Funktion som räknar ut procentuell ökning per år och returnerar ett medelvärde på årlig ökning i procent (decimalform)
function getPercent(prices) {
    let percents = [];
    for (let i=0; i < prices.length-1; i++) {
        let percent = prices[i+1] - prices[i]; // nästa års pris - gammalt pris = ökning
        percent /= prices[i];                  // ökning / gammalt pris = procentuell ökning
        percents.push(percent);
    }
    return percents.reduce((total,num) => total+num) / percents.length;
}

// Funktion som räknar ut årlig ökning för kommande 5 år baserat på medelvärdet för ökning i procent
function calcIncrease(price,area,percent) {
    return price/area;
}

console.log(calcIncrease(1000000,40,getPercent(Place11122)));




/*
// Temporärt script för att visa tabell och toggla table/chart
const table = document.querySelector('#result-table');
const chart = document.querySelector('#result-chart');
const resultHeader = document.querySelector('#result-box h3');
const resultSwitch = document.querySelector('#result-switch');
const house = document.querySelector('#result-house');

document.querySelector('form').addEventListener('submit',e => {
    e.preventDefault();
    house.classList.add('result-hide');
    resultHeader.classList.remove('result-hide');
    table.classList.remove('result-hide');
    if (window.innerWidth < 1000) 
    resultSwitch.classList.remove('result-hide');
    if (window.innerWidth >= 1000) chart.classList.remove('result-hide');
    
});

resultSwitch.addEventListener('click',e => {
    console.log(e.target.innerHTML)
    e.target.innerHTML = (e.target.innerHTML == '🗠') ? '&#9776;' : '&#128480;';
    table.classList.toggle('result-hide');
    chart.classList.toggle('result-hide');
});
*/