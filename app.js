let fromSelect = document.querySelector("#from");
let toSelect = document.querySelector("#to");
document.querySelector("#amount").value = 1;

fromSelect.addEventListener("change", fromChanged, false);
toSelect.addEventListener("change", toChanged, false);
fromChanged();
toChanged();

function fromChanged() {
    let selected = fromSelect.value;
    if (selected === ("NZD")) {
        toSelect[0].disabled=true;
    } else{
        toSelect[0].disabled=false;
    }
}

function toChanged() {
    let selected = toSelect.value;
    if (selected === ("NZD")) {
        fromSelect[0].disabled = true;
    } else{
        fromSelect[0].disabled = false;
    }
}