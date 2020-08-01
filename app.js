loadTableData("AUD", true, 1);

let fromSelect = document.querySelector("#from");
let toSelect = document.querySelector("#to");

fromSelect.addEventListener("change", fromChanged, false);
toSelect.addEventListener("change", toChanged, false);

function fromChanged() {
    let selected = fromSelect.value;
    if (selected === ("NZD")) {
        toSelect.remove(1);
    } else if (toSelect[1].value !== "NZD"){
        let NZD = document.createElement("option");
        NZD.value = "NZD";
        NZD.innerHTML = "NZD (New Zealand Dollar)"
        toSelect.add(NZD,1);
    }
}

function toChanged() {
    let selected = toSelect.value;
    if (selected === ("NZD")) {
        fromSelect.remove(1);
    } else if (fromSelect[1].value !== "NZD"){
        let NZD = document.createElement("option");
        NZD.value = "NZD";
        NZD.innerHTML = "NZD (New Zealand Dollar)"
        fromSelect.add(NZD,1);
    }
}