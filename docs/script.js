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