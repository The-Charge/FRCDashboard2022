// Define UI elements
let ui = {
    timer: document.getElementById('timer'),
    robotState: document.getElementById('robot-state'),
    camera1: document.getElementById('camera1'),
    gearText: document.getElementById('gear-state'),
    autoSelect: document.getElementById('auto-select'),
    climberState: document.getElementById('climb-state'),
    assistState: document.getElementById('assist-state'),
    armState: document.getElementById('arm-state')
};

// Update camera every second. This is necessary because if the camera disconnects during the match, it will not automatically reconnect
setInterval(() => {
    // TEST IMAGES:
    ui.camera1.style.backgroundImage = 'url("https://i.ytimg.com/vi/ekthcIHDt3I/maxresdefault.jpg")';
}, 500);


// Update match timer
NetworkTables.addKeyListener('/robot/time', (key, value) => {
    ui.timer.textContent = value < 0 ? '0:00' : Math.floor(value / 60) + ':' + (value % 60 < 10 ? '0' : '') + value % 60;
});

// Error handler
addEventListener('error',(ev)=>{
    ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
});

//Event Listeners:

NetworkTables.addKeyListener('/SmartDashboard/High Gear', (key, value) => { //FINAL NETWORKTABLE VALUE
    if(value == true) {
        ui.gearText.innerHTML = 'HIGH';
        ui.gearText.classList.add(on);
        ui.gearText.classList.remove(off);
    } else {
        ui.gearText.innerHTML = 'LOW';
        ui.gearText.classList.add(off);
        ui.gearText.classList.remove(on);
    }
});
NetworkTables.addKeyListener('/SmartDashboard/High Driver Assist', (key, value) => { //FINAL NETWORKTABLE VALUE
    if(value == true) {
        ui.gearText.innerHTML = 'HIGH';
        ui.gearText.classList.add(on);
        ui.gearText.classList.remove(off);
    } else {
        ui.gearText.innerHTML = 'LOW';
        ui.gearText.classList.add(off);
        ui.gearText.classList.remove(on);
    }
});
NetworkTables.addKeyListener('/SmartDashboard/High Auto Climb', (key, value) => { //FINAL NETWORKTABLE VALUE
    if(value == true) {
        ui.gearText.innerHTML = 'HIGH';
        ui.gearText.classList.add(on);
        ui.gearText.classList.remove(off);
    } else {
        ui.gearText.innerHTML = 'LOW';
        ui.gearText.classList.add(off);
        ui.gearText.classList.remove(on);
    }
});
NetworkTables.addKeyListener('/SmartDashboard/High Arm', (key, value) => { //FINAL NETWORKTABLE VALUE
    if(value == true) {
        ui.gearText.innerHTML = 'HIGH';
        ui.gearText.classList.add(on);
        ui.gearText.classList.remove(off);
    } else {
        ui.gearText.innerHTML = 'LOW';
        ui.gearText.classList.add(off);
        ui.gearText.classList.remove(on);
    }
});


// UNTESTED:
// Load list of prewritten autonomous modes
NetworkTables.addKeyListener('/SmartDashboard/AutoSelect', (key, value) => { //FINAL NETWORKTABLE VALUE
    // Clear previous list
    while (ui.input.autoSelect.firstChild) {
        ui.input.autoSelect.removeChild(ui.input.autoSelect.firstChild);
    }
    // Make an option for each autonomous mode and put it in the selector
    for (let i = 0; i < value.length; i++) {
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(value[i]));
        ui.input.autoSelect.appendChild(option);
    }
    // Set value to the already-selected mode. If there is none, nothing will happen.
    ui.input.autoSelect.value = NetworkTables.getValue('/SmartDashboard/currentlySelectedMode');
});
