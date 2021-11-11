const CURRENCY_INPUT = document.querySelector('#currency');
const FORM = document.querySelector('#form');
const API = 'https://api.coincap.io/v2/assets/';
let URI = '';
const ERROR_MSG = document.querySelector('.error');

const CURRENCY_NAME = document.querySelector('#data-currency');
const SYMBOL = document.querySelector('#data-symbol');
const VOLUMEN_24H = document.querySelector('#data-volumen24H');
const PRICE = document.querySelector('#data-price');
const VOLUMEN_PRICE_24H = document.querySelector('#data-columenPrice24H');

async function getCurrencyData(){
    await fetch(URI)
        .then(res => res.json())
        .then(res => {
            CURRENCY_NAME.innerHTML = res.data.name;
            SYMBOL.innerHTML = res.data.symbol;
            VOLUMEN_24H.innerHTML = parseFloat(res.data.volumeUsd24Hr).toFixed(2);
            PRICE.innerHTML = parseFloat(res.data.priceUsd).toFixed(2);
            VOLUMEN_PRICE_24H.innerHTML = parseFloat(res.data.vwap24Hr).toFixed(2);
            ERROR_MSG.classList.remove('error-active');
        })
        .catch(error => { ERROR_MSG.classList.add('error-active'); });
}

FORM.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const CURRENCY_READY = CURRENCY_INPUT.value.toLowerCase().replace(/ /g, "-");
    URI = API + CURRENCY_READY;
    await getCurrencyData();
});