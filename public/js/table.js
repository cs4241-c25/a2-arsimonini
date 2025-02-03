window.onload = async function() {
    const response = await fetch("/table", {
        method: 'GET',
    })

    const test = await response.json()
    console.log(test)

    const data = test
    //console.log( "cars:", text );
    const bod = document.getElementById("bigTableBody")
    for ( let i = 0; i < data.length; i++ ) {
        //console.log( "car:", cars[i]);
        const newRow = document.createElement("tr")
        const indexData = document.createElement("td")
        const nameData = document.createElement("td")
        const consoleData = document.createElement("td")
        const gameData = document.createElement("td")
        const completionData = document.createElement("td")
        const spentData = document.createElement("td")
        const hoursData = document.createElement("td")
        const sphrData = document.createElement("td")

        indexData.innerText = data[i].indexDisplay
        nameData.innerText = data[i].userName
        consoleData.innerText = data[i].favConsole
        gameData.innerText = data[i].favGame
        completionData.innerText = data[i].completed
        spentData.innerText = data[i].moneySpent
        hoursData.innerText = data[i].hoursPlayed
        sphrData.innerText = data[i].spentPlayer

        newRow.appendChild(indexData)
        newRow.appendChild(nameData)
        newRow.appendChild(consoleData)
        newRow.appendChild(gameData)
        newRow.appendChild(completionData)
        newRow.appendChild(spentData)
        newRow.appendChild(hoursData)
        newRow.appendChild(sphrData)

        bod.appendChild(newRow)
    }
}