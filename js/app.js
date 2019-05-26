let eventNumber = -1
let MAIN_CONTAINER_WIDTH = 640
let MAIN_CONTAINER_HEIGHT = 480
let MAIN_CONTAINER_MARGIN = '-240px 0 0 -320px'

let graph = null
let layout = null

function main(container) {

    // let width = document.getElementById("mainContainer").style.width;
    // let height = document.getElementById("mainContainer").style.height;
    // container.style.width = width;
    // container.style.height = height;
    // container.style.margin = MAIN_CONTAINER_MARGIN

    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
        // Displays an error message if the browser is not supported.
        mxUtils.error('Browser is not supported!', 200, false);
    } else {
        // Disables the built-in context menu
        mxEvent.disableContextMenu(container);

        // Creates the graph inside the given container
        graph = new mxGraph(container);

        //create layout
        // layout = new mxHierarchicalLayout(graph, mxConstants.DIRECTION_SOUTH)
        // layout = new mxFastOrganicLayout(graph)
        // layout = new mxCircleLayout(graph)
        layout = new mxCompactTreeLayout(graph, false)
        // layout = new mxCompositeLayout(graph)
        // layout = new mxParallelEdgeLayout(graph)
        // layout = new mxPartitionLayout(graph)
        // layout = new mxStackLayout(graph)


        //get root (layer 0)
        let parent = graph.getDefaultParent();

        //execute layout
        layout.execute(parent)
    }
};


let timer = null

function play() {
    document.getElementById('buttonPlay').disabled = true
    if (eventNumber > cbpPlayer.resource.changeEvents.length) {
        stop()
        return
    }
    timer = setInterval(next, 500)
}

function stop() {
    clearTimeout(timer)
}


function next() {
    eventNumber = eventNumber + 1
    if (eventNumber == 0 || eventNumber < cbpPlayer.resource.changeEvents.length) {
        let changeEvent = cbpPlayer.resource.changeEvents[eventNumber]
        console.log(changeEvent.constructor.name)
        changeEvent.drawReplay(graph)
    }
};