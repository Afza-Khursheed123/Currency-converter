let BASE_URL = 'https://latest.currency-api.pages.dev/v1/currencies'
const dropdowns = document.querySelectorAll('.dropdown select');
const button = document.querySelector('form button');
const fromcurr = document.querySelector('.from select');
const tocurr = document.querySelector('.to select');
const msgbox = document.querySelector('.msg');
const exchange = document.querySelector('.switch');

for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newoption = document.createElement('option');
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name == 'from' && currcode == 'USD') {
            newoption.selected = 'selected';
        }
        else if (select.name == 'to' && currcode == 'PKR') {
            newoption.selected = 'selected';

        }
        select.append(newoption);
    }
    select.addEventListener('change', (evt) => {
        updateflag(evt.target);
    })
}
const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newflag = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    image = element.parentElement.querySelector('img');
    image.src = newflag;

}
const updateexchangerate=async ()=>{
    amount = document.querySelector('form input');
    if (amount.value === '' || amount.value < 1) {
        amount.value = 1
    }
    from = fromcurr.value.toLowerCase();
    to = tocurr.value.toLowerCase();
    const URL = `${BASE_URL}/${from}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let exchangerate = data[from][to];
    finalamount = amount.value * exchangerate;

    msgbox.innerText = `${amount.value} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
}
button.addEventListener('click', async (evt) => {
    evt.preventDefault();
    updateexchangerate();
}
)
exchange.addEventListener('click',()=>{
 
    let updateto= fromcurr.value
    let updatefrom=tocurr.value
    fromcurr.value=updatefrom
    tocurr.value=updateto
    updateflag(fromcurr);
    updateflag(tocurr);
})

window.addEventListener('load',()=>{
    updateexchangerate();
})