let button = document.querySelector("#go-button");
console.log(button);
button.addEventListener("click", displayTime, false);

function displayTime(){
    let format = "LLLL"
    let date = moment().format(format);
    let timeZone = moment().format("z");
    console.log(new Date().toString());
}