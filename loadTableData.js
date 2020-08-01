const tbody = document.getElementById("rates-body");

function loadTableData(currency, buy, youHave) {
    fetch("http://mattm.win:8080/api/v1/resources/rates/all").then(r => r.json()).then(json => {
        let id = 0;
        const displayData = Object.entries(json).map(([k, v]) => {
            if (v.rates[currency.toLowerCase()] == null) {
                return null;
            }
            const rate = v.rates[currency.toLowerCase()][buy ? "buy" : "sell"];
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
        displayData.forEach(data => {
            content += `
                <tr id="table-body-row">
                    <td>${data.name}</td>
                    <td>${data.rate}</td>
                    <td>${data.youGet}</td>
                </tr>
            `;
        });
        tbody.innerHTML = content;
    });
}
