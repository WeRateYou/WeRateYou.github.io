const API_URL = "https://rate-selector.herokuapp.com/api/v1/resources/rates/all";

const tbody = document.getElementById("rates-body");
const toElem = document.getElementById("to");
const fromElem = document.getElementById("from");

let json = null;

function fetchJsonFromApi() {
    return fetch(API_URL)
        .then(r => r.json())
        .then(json_ => { json = json_; })
        .then(() => loadProviderCards())
        .then(() => loadSupportedCurrencies());
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
    let filterSection = document.getElementsByClassName("sources")[0];
    let tableSection = document.getElementsByClassName("sources")[1];

    Object.entries(json.providers).forEach(([source, { logo }]) =>{
        // Sources on side bar for web
        sourceDiv1 = document.createElement("div");
        sourceSpan1 = document.createElement("span");
        sourceIMG1 = document.createElement("img");

        sourceDiv1.className = "data-source";
        sourceSpan1.className = "data-source-text";
        sourceIMG1.className = "source-img";

        sourceSpan1.innerHTML = source.toUpperCase();
        sourceIMG1.src = logo;

        // Sources under map for mobile
        sourceDiv2 = document.createElement("div");
        sourceSpan2 = document.createElement("span");
        sourceIMG2 = document.createElement("img");

        sourceDiv2.className = "data-source";
        sourceSpan2.className = "data-source-text";
        sourceIMG2.className = "source-img";

        sourceSpan2.innerHTML = source.toUpperCase();
        sourceIMG2.src = logo;

        // Add elements to DOM
        sourceDiv1.appendChild(sourceSpan1);
        sourceDiv1.appendChild(sourceIMG1);

        sourceDiv2.appendChild(sourceSpan2);
        sourceDiv2.appendChild(sourceIMG2);
        
        filterSection.appendChild(sourceDiv1);
        tableSection.appendChild(sourceDiv2);
    });
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
        loadTableData("AUD", false, 120);
        toElem.value = "AUD";
    });

// reload exchange rates every half hour
setInterval(() => fetchJsonFromApi().catch(), 30 * 60 * 1000);
