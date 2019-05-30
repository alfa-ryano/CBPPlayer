let eventNumber = -1

let graphs = new Map()
let previousChangeEvent = null

function main() {
    let bpmn2 = new Bpmn2()
    bpmn2.initialise(graphs)
    let ecore = new Ecore()
    ecore.initialise(graphs)
};


let timer = null

function play() {
    document.getElementById('buttonPlay').disabled = true
    if (eventNumber > cbpPlayer.resource.changeEvents.length) {
        stop()
        return
    }
    timer = setInterval(next, 200)
}

function stop() {
    clearTimeout(timer)
}


function next() {
    eventNumber = eventNumber + 1
    if (eventNumber == 0 || eventNumber < cbpPlayer.resource.changeEvents.length) {
        let changeEvent = cbpPlayer.resource.changeEvents[eventNumber]
        console.log("Replaying Event " + eventNumber + ": " + changeEvent.constructor.name)
        changeEvent.drawReplay(graphs)
        previousChangeEvent = changeEvent
    }
};