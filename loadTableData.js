const tbody = document.getElementById("rates-body");
const toElem = document.getElementById("to");
const fromElem = document.getElementById("from");

let json = null;

fetch("https://rate-selector.herokuapp.com/api/v1/resources/rates/all").then(r => r.json()).then(json_ => {
    json = json_;
    loadTableData("AUD", false, 1);
    const supportedCurrencies = [...new Set(Object.values(json).flatMap(v => Object.keys(v.rates)))];

    let html = "";
    supportedCurrencies.forEach(c => {
        if (currencies[c] != null) {
            html += `<option value="${c.toUpperCase()}">${c.toUpperCase()} (${currencies[c]})</option>`
        }
    });
    
    toElem.innerHTML = html;
    fromElem.innerHTML = '<option value="NZD" selected="selected">NZD (New Zealand Dollar)</option>' + html;
    toElem.value = "AUD";
});

function loadTableData(currency, bankIsBuying, youHave) {
    let id = 0;
    const displayData = Object.entries(json).map(([k, v]) => {
        if (v.rates[currency.toLowerCase()] == null) {
            return null;
        }
        const rate = v.rates[currency.toUpperCase()][bankIsBuying ? "buy" : "sell"];
        if (rate == null || rate === 0) {
            return null;
        }
        const youGet = bankIsBuying ? youHave / rate : youHave * rate;
        return {
            id: id++,
            name: v.shortName,
            rate,
            youGet: youGet.toFixed(2),
        }
    }).filter(x => x);

    let content = "";
    displayData.sort((a, b) => b.rate - a.rate).forEach(data => {
        content += `
            <tr id="table-body-row">
                <td>${data.name}</td>
                <td>${data.rate}</td>
                <td>${data.youGet}</td>
            </tr>
        `;
    });
    tbody.innerHTML = content;
}
