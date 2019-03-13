/* Värdeökning av Bostadskollen */

// Hämta nödvändiga element
const inputForm = document.querySelector('#input-form');
const inputPrice = document.querySelector('#input-price');
const inputSize = document.querySelector('#input-size');
const inputPlace = document.querySelector('#input-place');
const inputError = document.querySelector('#input-error');
const resultTable = document.querySelector('#result-table');
const resultHeader = document.querySelector('#result-box h3');
const resultChartWrapper = document.querySelector('#result-chart-wrapper');
const resultChart = document.querySelector('#result-chart');
const resultHouse = document.querySelector('#result-house');

// Eventlisteners
inputForm.addEventListener('submit',displayResults); // Triggar funktion för att visa resultat

// Arrayer för respektive område innehållande kvadratmeterpris för senaste 5 åren i ordningen [2014,2015,2016,2017,2018]
const place11122 = [74790,89261,94811,98494,93084];
const place22222 = [24361,27320,29922,35750,35920];
const place33333 = [3760,4465,4203,5247,6617];

// Funktion för att visa resultat på sidan
function displayResults(e) {
    e.preventDefault();
    if (checkErrors()) { return } // Kontrollera inmatning, finns fel så avbryts visning och felmeddelande visas
    else {
        // Hämta värden
        const price = parseInt(inputPrice.value);
        const size = parseFloat(inputSize.value);
        const place = getPercent(eval('place'+inputPlace.value));
        const year = (new Date).getFullYear();
        // Räkna ut värdeökning för kommande fem år
        const prices = calcIncrease(price,size,place);
        // Skapa tabell med data
        const table = document.createElement('table');
        for (let i=0; i<=5; i++) {
            const tr = document.createElement('tr');
            const tdYear = document.createElement('td');
            const tdPrice = document.createElement('td');
            tdYear.appendChild(document.createTextNode(year+i));
            tdPrice.appendChild(document.createTextNode(prices[i]));
            tr.appendChild(tdYear);
            tr.appendChild(tdPrice);
            table.appendChild(tr);
        }
        // Skriv ut tabell, visa resultatet och rita diagram
        resultTable.innerHTML = '';
        resultTable.appendChild(table);
        toggleResults();
        drawChart(prices);
        // Rensa formulär
        inputForm.reset();
    }
}

// Funktion som ritar ut diagram
function drawChart(prices) {
    const canvas = resultChart;
    // Ändra storlek och förbered canvas för att rita ut diagram
    canvas.width = resultChartWrapper.clientWidth;
    canvas.height = resultChartWrapper.clientHeight;
    const w = canvas.width;
    const h = canvas.height;
    const ctx = canvas.getContext('2d');
    // Rita ut bakgrund och vertikal/horizontal linje
    drawLine(2,((h-40)/2)+20,w,((h-40)/2)+20,'rgba(65, 179, 163,0.5)',h-40);
    drawLine(0,20,0,h-20,'#E27D60',2);
    drawLine(0,h-20,w,h-20,'#E27D60',2);
    // Rita ut streck, punkter, pris och årtal
    let posX = 15;
    let posY = h-20;
    let newX = 15;
    let newY = 0;
    let scale = (h-40) / (prices[prices.length-1] - prices[0]);
    let year = (new Date).getFullYear();
    for (let i=0; i <= 5; i++) {
        newX += (w-30)/5;
        newY = h-20-((prices[i+1]-prices[0]) * scale);
        if (newY !== posY) drawLine(posX,posY,newX,newY,'#E27D60',2);
        drawLine(posX,posY,posX,posY,'#E27D60',10);
        drawText(prices[i],posX+10,posY+10)
        drawText(year,posX-15,h);
        posX = newX;
        posY = newY;
        year++;
    }   
    // Funktion för att rita ut linjer
    function drawLine(startX,startY,endX,endY,color='#000',size=1) {
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
    }
    // Funktion för att skriva ut text
    function drawText(text,x,y) {
        ctx.fillStyle = '#E27D60';
        ctx.font = "10px Verdana";
        ctx.fillText(text,x,y);
    }
}

// Funktion för felkontroll av inmatad data skriver ut eventuella fel och returnerar true om fel finns, annars returneras false.
function checkErrors() {
    // Rensa eventuellt gammalt felmeddelande
    inputPrice.removeAttribute('style');
    inputSize.removeAttribute('style');
    inputError.innerHTML = '';
    // Om inköpspris är tomt eller inte består av siffror skriv ut felmeddelande
    if (!inputPrice.value || !parseInt(inputPrice.value)) {
        inputPrice.style.borderColor = '#F00';
        inputError.innerHTML = 'Inköpspris måste innehålla siffror.'
        return true;
    }
    // Annars om bostadsarea är tomt eller inte består av siffror skriv ut felmeddelande
    else if (!inputSize.value || !parseInt(inputSize.value)) {
        inputSize.style.borderColor = '#F00';
        inputError.innerHTML = 'Bostadsarea måste innehålla siffror.'
        return true;
    }
    // Annars returnera false (inga fel finns)
    else { return false; }
}

// Funktion för att gömma huset/visa resultat
function toggleResults() {
    resultHouse.classList.add('result-hide');
    resultHeader.classList.remove('result-hide');
    resultTable.classList.remove('result-hide');
    resultChartWrapper.classList.remove('result-hide');
}

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

// Funktion som räknar ut linjär årlig ökning för kommande 5 år baserat på medelvärdet för ökning i procent
function calcIncrease(price,area,percent) {
    let prices = [price];
    price /= area;                // Dela upp priset i kvadratmeterpris
    for (let i=0; i < 5; i++) {      
        price *= (1+percent);     // Räkna ut aktuellt års kvadratmeterpris
        prices.push(Math.round(price*area));  // Multiplicera kvadratmeterpris med area och lägg till fullständigt pris i array för kommade priser
    }
    return prices;
}