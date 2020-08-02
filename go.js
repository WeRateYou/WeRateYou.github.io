let button = document.querySelector("#go-button");
let footer = document.querySelector("footer")
displayTime();
button.addEventListener("click", go, false);

function displayTime(){
    let time = new Date().toString();
    let footerText = "Data valid at " + time;
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
