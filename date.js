let button = document.querySelector("#go-button");
let footer = document.querySelector("footer")
displayTime();
button.addEventListener("click", displayTime, false);

function displayTime(){
    let time = new Date().toString();
    let footerText = "Data collected at " + time;
    document.createElement("h5");
    footer.innerHTML = footerText;
}