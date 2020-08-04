let button = document.querySelector("#go-button");
let footer = document.querySelector("footer")
displayTime();
button.addEventListener("click", go, false);

function displayTime(){
    let time = new Date().toString();
    let footerText = `<h6 class="footer-text">Data valid at ${time}</h6>`;
    footer.innerHTML = footerText;
}

function go(){
    displayTime();
    let amount = document.querySelector("#amount").value;
    let from = document.querySelector("#from").value;
    let to = document.querySelector("#to").value;
    if (from === "NZD" && to !== "NZD"){
        loadTableData(to, false, amount);
    }else if (to === "NZD" && from !== "NZD"){
        loadTableData(from, true, amount);

    } else {
        let error = document.createElement("h4");
        error.innerHTML = "Please select NZD in either To or From";
        document.querySelector(".filter-form").appendChild(error);
    }
}

// automatically select NZD
let lastToValue = toElem.value;
let lastFromValue = fromElem.value;
toElem.addEventListener("change", () => {
    fromElem.value = toElem.value !== "NZD" ? "NZD" : lastToValue;
    lastToValue = toElem.value;
});
fromElem.addEventListener("change", () => {
    toElem.value = fromElem.value !== "NZD" ? "NZD" : lastFromValue;
    lastFromValue = fromElem.value;
});


// display currrently supported providers
function loadProviderCards(){
    let tbodyWeb = document.getElementsByClassName("sources-table-body")[0];
    let tbodyMobile = document.getElementsByClassName("sources-table-body")[1];
    let content = "";

    sources.sources.forEach(source =>{
        // Sources on side bar for web
        let name = source.toUpperCase();
        let logo = json[source].logo;
        tableRow = `<tr class="table-body-row">
        <td>${name} </td>
        <td class="source-logo-cell"><img src="${logo}" class="source-logo"></td>
        </tr>`;
        content += tableRow;
    });
    tbodyWeb.innerHTML = content;
    tbodyMobile.innerHTML = content;
}
