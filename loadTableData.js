const tbody = document.getElementById("rates-body");

let json = null;

fetch("http://mattm.win:8080/api/v1/resources/rates/all").then(r => r.json()).then(json_ => {
    json = json_;
    loadTableData("AUD", false, 100);
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
        return {
            id: id++,
            name: v.shortName,
            rate,
            youGet: (rate * youHave).toFixed(2),
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
