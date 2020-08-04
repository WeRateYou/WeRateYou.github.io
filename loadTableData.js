const API_URL = "https://rate-selector.herokuapp.com/api/v1/resources/rates/all";

const tbody = document.getElementById("rates-body");
const toElem = document.getElementById("to");
const fromElem = document.getElementById("from");

let json = null;

function fetchJsonFromApi() {
    return fetch(API_URL)
        .then(r => r.json())
        .then(json_ => {
            json = json_;
            loadProviderCards();
            loadSupportedCurrencies();
            displayTime();
        });
}

function loadSupportedCurrencies() {
    const supportedCurrencies = [...new Set(Object.values(json.providers).flatMap(v => Object.keys(v.rates)))];

    let html = '<option value="NZD" selected="selected">NZD (New Zealand Dollar)</option>';
    supportedCurrencies.sort().forEach(c => {
        const u = c.toUpperCase();
        if (currencies[u] != null) {
            html += `<option value="${u}">${u} (${currencies[u].name})</option>`
        }
    });

    fromElem.innerHTML = html;
    toElem.innerHTML = html;
}

function loadTableData(currency, bankIsBuying, youHave) {
    const displayData = Object.entries(json.providers).map(([k, v]) => {
        if (v.rates[currency.toLowerCase()] == null) {
            return null;
        }
        const rate = v.rates[currency.toLowerCase()][bankIsBuying ? "buy" : "sell"];
        if (rate == null || rate === 0) {
            return null;
        }
        const youGet = bankIsBuying ? youHave / rate : youHave * rate;
        return {
            name: v.shortName,
            rate,
            youGet: youGet.toFixed(2),
            logo: v.logo,
        }
    }).filter(x => x);

    let content = "";
    displayData.sort((a, b) => b.rate - a.rate).forEach(data => {
        const img = data.logo ? `<img class="provider-logo" src="${data.logo}"/>` : "";
        const name = `<span class="provider-name">${data.name}</span>`;
        const u = currency.toUpperCase();
        const symbol = currencies[u] == null ? "" : currencies[u].symbol;
        content += `
            <tr class="table-body-row">
                <td class="name-cell">${img}${name}</td>
                <td>${data.rate}</td>
                <td>${symbol}${data.youGet}</td>
            </tr>
        `;
    });
    tbody.innerHTML = content;
}

// display currrently supported providers
function loadProviderCards(){
    let tbodyWeb = document.getElementsByClassName("sources-table-body")[0];
    let tbodyMobile = document.getElementsByClassName("sources-table-body")[1];
    let content = "";

    Object.values(json.providers).forEach(({ shortName, logo }) => {
        // Sources on side bar for web
        tableRow = `
            <tr class="table-body-row">
                <td class="source-logo-cell"><img src="${logo}" class="source-logo"></td>
                <td><h7>${shortName}</h7></td>
            </tr>
        `;
        content += tableRow;
    });
    tbodyWeb.innerHTML = content;
    tbodyMobile.innerHTML = content;
}

// attempt to load live data, fallback to sample data
fetchJsonFromApi()
    .then(() => {
        loadTableData("AUD", false, 120);
        toElem.value = "AUD";
    })
    .catch(() => {
        json = SAMPLE_DATA;
        loadProviderCards();
        loadSupportedCurrencies();
        displayTime();
        loadTableData("AUD", false, 120);
        toElem.value = "AUD";
        console.warn("Failed retrieving live data. Using demo data instead.")
    });

// reload exchange rates every half hour
setInterval(() => fetchJsonFromApi().catch(), 30 * 60 * 1000);
