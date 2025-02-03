// FRONT-END (CLIENT) JAVASCRIPT HERE
let index = -1;
let currAllData = [];

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
    const gameInput4 = document.querySelector("#spent")
    const gameInput5 = document.querySelector("#hours")

    index = index + 1;

    //console.log(gameInput0.value)

    const json = {
        indexDisplay: index,
        userName: gameInput0.value,
        favConsole: gameInput1.value,
        favGame: gameInput2.value,
        completed: gameInput3.value,
        moneySpent: gameInput4.value,
        hoursPlayed: gameInput5.value,
        spentPlayer: parseFloat(gameInput4.value) / parseFloat(gameInput5.value)
    }

    //console.log(json)

    const body = JSON.stringify(json)

    //console.log(body);

    await fetch("/submit", {method: 'POST', body})
    loadData()

}

function addData() {
    // Get input values
    let inp0 = document.getElementById("name").value;
    let inp1 = document.getElementById("favCon").value;
    let inp2 = document.getElementById("favGame").value;
    let inp3 = document.getElementById("compl").value;

    // Get the table and insert a new row at the end
    let table = document.getElementById("dataTable");
    let newRow = table.insertRow(table.rows.length);

    // Insert data into cells of the new row
    newRow.insertCell(0).innerHTML = index;
    newRow.insertCell(1).innerHTML = inp0;
    newRow.insertCell(2).innerHTML = inp1;
    newRow.insertCell(3).innerHTML = inp2;
    newRow.insertCell(4).innerHTML = inp3;
    newRow.insertCell(5).innerHTML =
        '<button onclick="editData(this)">Edit</button>' +
        '<button onclick="deleteData(this)">Delete</button>';

    // Clear input fields
    clearInputs();
}

function clearInputs() {

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("favCon").value = "";
    document.getElementById("favGame").value = "";
    document.getElementById("compl").value = "";
    document.getElementById("spent").value = "";
    document.getElementById("hours").value = "";
}

function editData(button) {
    let row = button.parentNode.parentNode;
    let indexVal = row.cells[0].innerText;
    console.log(parseInt(indexVal));

    let col0 = row.cells[1];
    let col1 = row.cells[2];
    let col2 = row.cells[3];
    let col3 = row.cells[4];
    let col4 = row.cells[5];
    let col5 = row.cells[6];
    let col6 = row.cells[7];



    let nameInput = prompt("Update the Name Here", col0.innerHTML);
    let consoleInput = prompt("Update the Console Here", col1.innerHTML);
    let gameInput = prompt("Update the Game Here", col2.innerHTML);
    let completionInput = prompt("Update the Completion Here", col3.innerHTML);
    let spentInput = prompt("Update the Money Spent Here", col4.innerHTML);
    let hoursInput = prompt("Update the Hours Played Here", col5.innerHTML);


    //Update Table
    col0.innerText = nameInput;
    col1.innerText = consoleInput;
    col2.innerText = gameInput;
    col3.innerText = completionInput;
    col4.innerText = spentInput;
    col5.innerText = hoursInput;
    col6.innerText = parseFloat(spentInput) / parseFloat(hoursInput);

    currAllData[parseInt(indexVal)].userName = nameInput;
    currAllData[parseInt(indexVal)].favConsole = consoleInput;
    currAllData[parseInt(indexVal)].favGame = gameInput;
    currAllData[parseInt(indexVal)].completed = completionInput;
    currAllData[parseInt(indexVal)].moneySpent = spentInput;
    currAllData[parseInt(indexVal)].hoursPlayed = hoursInput;
    currAllData[parseInt(indexVal)].spentPlayer = parseFloat(spentInput) / parseFloat(hoursInput);




    console.log("New Edited Data:")
    console.log(currAllData)
    fetch("/update", {method: 'POST', body: JSON.stringify(currAllData)});
}

function deleteData(button) {
    let row = button.parentNode.parentNode;
    let indexVal = row.cells[0].innerText;
    let currIndex = 0;
    console.log(parseInt(indexVal));


    row.parentNode.removeChild(row);
    currAllData.splice(indexVal, 1);

    for ( let i = 0; i < currAllData.length; i++ ) {
        currAllData[i].indexDisplay = currIndex;
        currIndex = currIndex + 1;
    }

    fetch("/update", {method: 'POST', body: JSON.stringify(currAllData)});
    console.log(currAllData);

}

window.onload = function() {
    loadData()
    const button = document.querySelector("#submit");
    button.onclick = submit;
}

async function loadData() {
        const response = await fetch("/table", {
            method: 'GET',
        })

        const test = await response.json()
        console.log(test)
        currAllData = test

        const data = test

        const bod = document.getElementById("bigTableBody")
        bod.innerHTML = ""
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
        const buttonData = document.createElement("td")



        indexData.innerText = data[i].indexDisplay
        nameData.innerText = data[i].userName
        consoleData.innerText = data[i].favConsole
        gameData.innerText = data[i].favGame
        completionData.innerText = data[i].completed
        spentData.innerText = data[i].moneySpent
        hoursData.innerText = data[i].hoursPlayed
        sphrData.innerText = data[i].spentPlayer
        buttonData.innerHTML = '<button onclick="editData(this)">Edit</button>' + '<button onclick="deleteData(this)">Delete</button>';

        newRow.appendChild(indexData)
        newRow.appendChild(nameData)
        newRow.appendChild(consoleData)
        newRow.appendChild(gameData)
        newRow.appendChild(completionData)
        newRow.appendChild(spentData)
        newRow.appendChild(hoursData)
        newRow.appendChild(sphrData)
        newRow.appendChild(buttonData)

        bod.appendChild(newRow)

        index = data[i].indexDisplay
    }
}


