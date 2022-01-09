var scoket = io()

var input = document.getElementById("input")
var username = document.getElementById("name")

if (localStorage.getItem("username")) {
    username.value = localStorage.getItem("username")
}

function send() {
    if (input.value == "") return
    newMesage = document.createElement("P")
    newMesage.innerHTML = username.value + ": " + input.value
    newMesage.style.color = "blue"
    document.getElementById("history").appendChild(newMesage)
    scoket.emit("message", { "username": username.value, "message": input.value })
    input.value = ""
    localStorage.setItem("username", username.value)
    window.scrollTo(0, document.body.scrollHeight);
}

scoket.on("message", (message) => {
    newMesage = document.createElement("P")
    newMesage.innerHTML = message.username + ": " + message.message
    document.getElementById("history").appendChild(newMesage)

})

document.addEventListener("keydown", event => {
    if (event.key == "Enter") {
        send()
    }
});
