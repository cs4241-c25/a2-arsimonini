// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()
    const gameInput0 = document.querySelector("#name")
    const gameInput1 = document.querySelector("#favCon")
    const gameInput2 = document.querySelector("#favGame")
    const gameInput3 = document.querySelector("#compl")

    //console.log(gameInput0.value)

    const json = {
        userName: gameInput0.value,
        favConsole: gameInput1.value,
        favGame: gameInput2.value,
        completed: gameInput3.value}

    console.log(json)

    const body = JSON.stringify( json )

    console.log( body );

    await fetch("/submit", {method: 'POST', body})




}

window.onload = function() {
    const button = document.querySelector("#submit");
    button.onclick = submit;
}
