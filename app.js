var table = document.getElementById("rates").getElementsByTagName('tbody')[0];
var row = table.insertRow(2);
row.id="table-body-row";

table.rows[2].insertCell(0);
table.rows[2].cells[0].innerHTML = "WORK PLeASE";

var data = JSON.parse(`{
    "to": "jpy",
    "from": "nzd",
    "results": {
        "asb": 85.0469,
        "bnz": 71.28
    }
}`);


table.rows[2].insertCell(1);
table.rows[2].insertCell(2);
table.rows[2].cells[1].innerHTML = data.results.asb;
table.rows[2].cells[2].innerHTML = "Something";
