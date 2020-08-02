const tbody = document.getElementById("rates-body");
const toElem = document.getElementById("to");
const fromElem = document.getElementById("from");

let json = null;

fetch("https://rate-selector.herokuapp.com/api/v1/resources/rates/all").then(r => r.json()).then(json_ => {
    json = json_;
    loadTableData("AUD", false, 1);
    const supportedCurrencies = [...new Set(Object.values(json).flatMap(v => Object.keys(v.rates)))];

    let html = '<option value="NZD" selected="selected">NZD (New Zealand Dollar)</option>';
    supportedCurrencies.sort().forEach(c => {
        const u = c.toUpperCase();
        if (currencies[u] != null) {
            html += `<option value="${u}">${u} (${currencies[u]})</option>`
        }
    });
    
    fromElem.innerHTML = html;
    toElem.innerHTML = html;
    toElem.value = "AUD";
});

function loadTableData(currency, bankIsBuying, youHave) {
    let id = 0;
    const displayData = Object.entries(json).map(([k, v]) => {
        if (v.rates[currency.toLowerCase()] == null) {
            return null;
        }
        const rate = v.rates[currency.toLowerCase()][bankIsBuying ? "buy" : "sell"];
        if (rate == null || rate === 0) {
            return null;
        }
        const youGet = bankIsBuying ? youHave / rate : youHave * rate;
        return {
            id: id++,
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
        content += `
            <tr class="table-body-row">
                <td class="name-cell">${img}${name}</td>
                <td>${data.rate}</td>
                <td>${data.youGet}</td>
            </tr>
        `;
    });
    tbody.innerHTML = content;
}
