let button = document.querySelector("#go-button");
let footer = document.querySelector("footer")
button.addEventListener("click", go, false);

function displayTime(){
    let time = new Date(json.updated * 1000).toString();
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


// display currrently supported providers
function loadProviderCards(){
    let filterSection = document.getElementsByClassName("sources")[0];
    let tableSection = document.getElementsByClassName("sources")[1];

    sources.sources.forEach(source =>{
        // Sources on side bar for web
        sourceDiv1 = document.createElement("div");
        sourceSpan1 = document.createElement("span");
        sourceIMG1 = document.createElement("img");

        sourceDiv1.className = "data-source";
        sourceSpan1.className = "data-source-text";
        sourceIMG1.className = "source-img";

        sourceSpan1.innerHTML = source.toUpperCase();
        sourceIMG1.src = json[source].logo;

        // Sources under map for mobile
        sourceDiv2 = document.createElement("div");
        sourceSpan2 = document.createElement("span");
        sourceIMG2 = document.createElement("img");

        sourceDiv2.className = "data-source";
        sourceSpan2.className = "data-source-text";
        sourceIMG2.className = "source-img";

        sourceSpan2.innerHTML = source.toUpperCase();
        sourceIMG2.src = json[source].logo;

        // Add elements to DOM
        sourceDiv1.appendChild(sourceSpan1);
        sourceDiv1.appendChild(sourceIMG1);

        sourceDiv2.appendChild(sourceSpan2);
        sourceDiv2.appendChild(sourceIMG2);
        
        filterSection.appendChild(sourceDiv1);
        tableSection.appendChild(sourceDiv2);
    });
}
